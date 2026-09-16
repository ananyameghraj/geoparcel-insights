import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  seedParcels,
  SEED_JOBS,
  type Job,
  type Parcel,
  type ReviewStatus,
  type UploadedFile,
  type ValidationStatus,
} from "./geo-data";

export interface Settings {
  projectName: string;
  crs: string;
  showLabels: boolean;
  showConfidence: boolean;
  showBuildings: boolean;
  showRoads: boolean;
  threshold: number;
  dark: boolean;
}

const DEFAULT_SETTINGS: Settings = {
  projectName: "GeoParcel AI",
  crs: "EPSG:4326",
  showLabels: true,
  showConfidence: true,
  showBuildings: true,
  showRoads: true,
  threshold: 80,
  dark: false,
};

interface State {
  files: UploadedFile[];
  parcels: Parcel[];
  jobs: Job[];
  selectedId: string | null;
  progress: number;
  stageIndex: number;
  running: boolean;
  settings: Settings;
}

interface Ctx extends State {
  addFiles: (f: UploadedFile[]) => void;
  removeFile: (id: string) => void;
  startProcessing: () => void;
  select: (id: string | null) => void;
  setReview: (id: string, review: ReviewStatus) => void;
  setValidation: (id: string, v: ValidationStatus) => void;
  updateSettings: (s: Partial<Settings>) => void;
  reset: () => void;
}

const KEY = "geoparcel-state-v1";
const AppCtx = createContext<Ctx | null>(null);

function initial(): State {
  return {
    files: [],
    parcels: seedParcels(),
    jobs: SEED_JOBS,
    selectedId: null,
    progress: 100,
    stageIndex: 6,
    running: false,
    settings: DEFAULT_SETTINGS,
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);

  // hydrate from localStorage after mount (SSR safe)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<State>;
        setState((s) => ({ ...s, ...saved, running: false }));
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, running: false }));
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", state.settings.dark);
  }, [state]);

  // deterministic processing simulation
  useEffect(() => {
    if (!state.running) return;
    const t = setInterval(() => {
      setState((s) => {
        if (!s.running) return s;
        const progress = Math.min(100, s.progress + 4);
        const stageIndex = Math.min(6, Math.floor((progress / 100) * 6.999));
        return { ...s, progress, stageIndex, running: progress < 100 };
      });
    }, 220);
    return () => clearInterval(t);
  }, [state.running]);

  const api = useMemo<Ctx>(
    () => ({
      ...state,
      addFiles: (f) => setState((s) => ({ ...s, files: [...s.files, ...f] })),
      removeFile: (id) => setState((s) => ({ ...s, files: s.files.filter((x) => x.id !== id) })),
      startProcessing: () => setState((s) => ({ ...s, running: true, progress: 0, stageIndex: 0 })),
      select: (id) => setState((s) => ({ ...s, selectedId: id })),
      setReview: (id, review) =>
        setState((s) => ({ ...s, parcels: s.parcels.map((p) => (p.id === id ? { ...p, review } : p)) })),
      setValidation: (id, validation) =>
        setState((s) => ({
          ...s,
          parcels: s.parcels.map((p) => (p.id === id ? { ...p, validation } : p)),
        })),
      updateSettings: (patch) => setState((s) => ({ ...s, settings: { ...s.settings, ...patch } })),
      reset: () => setState(initial()),
    }),
    [state],
  );

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used inside AppStateProvider");
  return ctx;
}

export const useStats = () => {
  const { parcels } = useApp();
  return useMemo(() => {
    const high = parcels.filter((p) => p.confidence >= 90).length;
    const review = parcels.filter((p) => p.review === "pending").length;
    const errors = parcels.filter((p) => p.validation === "failed").length;
    const avg = parcels.reduce((a, p) => a + p.confidence, 0) / (parcels.length || 1);
    return { total: parcels.length, high, review, errors, avg };
  }, [parcels]);
};
