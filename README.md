# GeoParcel Insights

BUILD COMPLETE FRONTEND — GEOPARCEL AI

Build the complete working frontend for GeoParcel AI, an AI-based urban parcel mapping and cadastral feature extraction platform using drone imagery.

🚨 CRITICAL BUILD RULES

- Complete the application in ONE implementation pass.
- Target maximum 5 Lovable credits.
- Do NOT repeatedly redesign, regenerate, refactor, or recreate existing components.
- Do NOT create unnecessary files or complex architecture.
- Reuse components and existing project structure whenever possible.
- Prioritize working functionality + attractive professional UI.
- Every visible button must perform a real frontend action.
- No dead pages.
- No "Coming Soon".
- No fake AI claims.
- No backend/API/database/authentication required.
- Use local seeded demo data and frontend state.
- Keep the code lightweight and hackathon-demo ready.

---

1. TECHNOLOGY

Use:

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Recharts
- Mapbox GL JS OR OpenLayers if already available

Do not add unnecessary libraries.

If a library already exists in the project, reuse it instead of installing another alternative.

---

2. DESIGN DIRECTION

Create a professional GIS / government engineering dashboard.

The interface should feel like a real modern geospatial application, not a generic admin template.

Visual style

- Light white / very light gray background
- Restrained professional blue accent
- Dark navy text
- Subtle borders
- Small shadows
- Rounded corners, but NOT excessive
- Clean cards
- Clear typography
- Good spacing
- Strong visual hierarchy
- GIS/engineering aesthetic

Avoid

- Excessive gradients
- Glassmorphism
- Neon colors
- Huge decorative illustrations
- Excessive animations
- Overloaded dashboards
- Giant text
- Clutter

Use subtle hover states and small transitions only where useful.

---

3. RESPONSIVENESS

Desktop-first but fully responsive.

Desktop:

- Fixed left sidebar
- Top navigation bar
- Main content area

Tablet/mobile:

- Collapsible sidebar
- Responsive cards
- Tables become scrollable/card-based
- Map remains usable
- No overlapping elements

---

4. APPLICATION STRUCTURE

Create these routes:

/login
/dashboard
/upload
/processing
/map
/review
/validation
/analytics
/export
/settings

Use React Router.

All navigation items must actually navigate to their pages.

---

5. CENTRALIZED FRONTEND STATE

Create one lightweight React Context/state provider.

Centralize:

- uploaded files
- processing progress
- processing status
- parcels
- selected parcel
- parcel review status
- validation results
- settings

Changes made on Map or Review pages must be reflected everywhere.

Use localStorage if convenient so demo state survives page refresh.

---

6. SEEDED DEMO DATA

The application must look populated immediately after opening.

Create realistic demo data for approximately:

- 20–30 parcels
- different confidence scores
- different areas
- accepted parcels
- review-required parcels
- flagged parcels
- valid geometries
- warning geometries
- failed geometries

Example:

Parcel IDs:

GP-001
GP-002
GP-003
GP-004
GP-005

Confidence:

98%
95%
91%
84%
68%

Areas:

1200 m²
1850 m²
920 m²
2450 m²
760 m²

Use deterministic data so the interface looks consistent every time.

---

7. GLOBAL LAYOUT

Create reusable:

- Sidebar
- TopBar
- StatCard
- StatusBadge
- PageHeader
- MapPanel
- ParcelTable
- UploadZone
- ProcessingTimeline
- ValidationCard
- ExportPanel

Do not duplicate UI unnecessarily.

---

8. LOGIN PAGE

Create a clean professional login screen.

Show:

GeoParcel AI

Subtitle:

"AI-powered urban parcel mapping & cadastral intelligence"

Fields:

- Email
- Password

Buttons:

- Login
- Demo Login

Demo Login

Clicking Demo Login must immediately navigate to:

/dashboard

No real authentication.

Add a small:

"Demo Environment"

label.

---

9. DASHBOARD

Create a polished GIS dashboard.

Top heading:

"Urban Parcel Intelligence"

Subtitle:

"Monitor mapping, extraction and validation activities."

Four main StatCards

1. Total Parcels Processed
   Example: 1,248

2. High Confidence
   Example: 1,036

3. Needs Review
   Example: 142

4. Validation Errors
   Example: 70

Include appropriate Lucide icons.

Main dashboard area

Left:

"Recent Processing Jobs"

Table showing:

- Job ID
- File
- Parcels
- Confidence
- Status
- Time

Right:

"Quick Actions"

Buttons:

- Upload Drone Imagery
- Open GIS Map
- Review Parcels
- Export Data

Each button must navigate to the correct page.

Add a compact overview chart

Use Recharts to show parcel processing activity over the last 7 days.

---

10. UPLOAD DATA

Create a polished upload workspace.

Heading:

"Upload Drone Data"

Upload zone must support:

- GeoTIFF
- TIFF
- JPG
- PNG
- GeoJSON
- Shapefile ZIP
- DSM
- DTM

UploadZone

Support:

- Drag & drop
- File picker
- File name
- File size
- File type
- Remove file

After files are selected, show a file list.

Add:

"Start Processing"

button.

Processing simulation

Do NOT claim real AI is running.

Use deterministic frontend simulation.

Stages:

1. UPLOAD
2. PREPROCESSING
3. AI SEGMENTATION
4. FEATURE EXTRACTION
5. PARCEL GENERATION
6. TOPOLOGY VALIDATION
7. COMPLETED

Show:

- progress percentage
- current stage
- progress bar
- status
- estimated demo processing time

After processing completes:

- update processing state
- update parcel statistics
- navigate/show Processing page

---

11. PROCESSING PAGE

Create a visually clear processing workflow.

Heading:

"AI Processing Pipeline"

Show a horizontal/vertical timeline:

UPLOAD
↓
PREPROCESSING
↓
AI SEGMENTATION
↓
FEATURE EXTRACTION
↓
PARCEL GENERATION
↓
TOPOLOGY VALIDATION
↓
COMPLETED

For each stage show:

- icon
- status
- short explanation
- progress

Also show:

Extraction Results

Building Detection
Road Detection
Parcel Boundary Extraction
Polygon Generation
Topology Validation

Use demo values.

IMPORTANT:

Clearly label this as:

"Prototype Simulation"

Do not imply that a real AI model is executing.

---

12. GIS MAP PAGE

This is the most important visual page.

Create a large interactive GIS workspace.

Layout

Left/main:

Large map

Right:

Parcel details panel

Top of map:

- Search location
- Zoom controls
- Layer controls

Map

If Mapbox token exists, use Mapbox.

If no token exists, DO NOT break.

Instead create an attractive fallback GIS visualization using:

- light map/grid background
- roads
- buildings
- parcel polygons
- labels

The fallback should still look like a GIS map.

Layers

Create toggles:

☑ Parcels
☑ Buildings
☑ Roads
☑ Review Required
☑ Confidence

Toggles must actually hide/show the corresponding frontend layers.

Parcel polygons

Display multiple parcel polygons.

Use confidence visualization:

High confidence → subtle green

Medium → amber

Low → red

Keep colors professional and accessible.

Parcel selection

Clicking a parcel must select it and open its details.

Details:

Parcel ID
Confidence Score
Area
Boundary Status
Validation Status
Review Status

Buttons:

Accept
Edit
Flag

These buttons must update centralized state.

---

13. PARCEL REVIEW

Create:

"Parcel Review Queue"

Top filter controls:

- All
- High Confidence
- Low Confidence
- Invalid Geometry
- Needs Review

Each parcel card/table row:

- Parcel ID
- Confidence
- Area
- Validation
- Review status

Actions:

Accept
Flag
Edit

Functional behavior

Accept:

→ status becomes Accepted

Flag:

→ status becomes Flagged

Edit:

→ open small edit panel/modal allowing status update.

Changes must immediately update:

- Dashboard
- Map
- Review
- Analytics
- Export

---

14. VALIDATION PAGE

Heading:

"Topology Validation"

Show summary cards:

Total Checks
Passed
Warnings
Errors

Create validation checks:

- Overlapping polygons
- Gaps
- Duplicate geometries
- Self-intersections
- Sliver polygons
- Invalid geometries

Each row should show:

Check
Count
Status

Statuses:

Passed
Warning
Failed

Use professional status badges.

Add a small explanation:

"Validation results are generated from deterministic prototype data."

---

15. ANALYTICS PAGE

Create:

"Mapping Analytics"

Use Recharts.

Show:

KPI cards

- Parcels Processed
- Average Processing Time
- Average Confidence
- Review Rate

Charts

1. Confidence Distribution
   Bar chart

2. Validation Status
   Pie/donut chart

3. Processing Activity
   Line chart

4. Review Statistics
   Bar chart

Use clean charts with restrained colors.

Do not overload the page.

---

16. EXPORT PAGE

Heading:

"Export Geospatial Data"

Create four export cards:

GeoJSON

"Current parcel dataset"

Button:

Download GeoJSON

This MUST actually generate and download a GeoJSON file using current parcel state.

Shapefile

Button:

Download Demo

Download a clearly labelled demo/sample file.

GeoPackage

Button:

Download Demo

Download a clearly labelled demo/sample file.

DXF

Button:

Download Demo

Download a clearly labelled demo/sample file.

Do NOT pretend the prototype generated real Shapefile/GPKG/DXF data.

For unsupported formats, use clear filenames such as:

GeoParcelAI_Demo_Shapefile.txt

GeoParcelAI_Demo_GeoPackage.txt

GeoParcelAI_Demo_DXF.txt

The GeoJSON download must contain the current parcel state.

---

17. SETTINGS

Create a simple professional settings page.

Sections:

Project

Project Name:

GeoParcel AI

Coordinate Reference System

Dropdown:

EPSG:4326 — WGS 84

EPSG:3857 — Web Mercator

Map Settings

- Show parcel labels
- Show confidence
- Show buildings
- Show roads

Confidence Threshold

Slider:

50–100%

Default:

80%

Changing this should update the frontend settings state.

Appearance

Light / Dark toggle.

The toggle should actually change the application theme.

Demo Data

Button:

"Reset Demo Data"

Reset all frontend state to the original seeded dataset.

---

18. SIDEBAR

Create a professional fixed sidebar.

Logo/icon:

GeoParcel AI

Navigation:

Dashboard
Upload Data
Processing
GIS Map
Parcel Review
Validation
Analytics
Export
Settings

Use Lucide icons.

Show active page clearly.

At bottom:

"Prototype Mode"

and:

"GeoSpatial Intelligence Platform"

---

19. TOP BAR

Top bar:

Left:

Current page title

Center/left:

Project selector:

GeoParcel AI

Right:

Notification icon

User menu:

Demo User

Keep it simple.

---

20. EMPTY STATES

If a page temporarily has no data, show a useful empty state with:

- icon
- explanation
- relevant action button

Never leave a completely blank page.

---

21. UX DETAILS

Make the interface extremely easy for a first-time user.

Use:

- clear labels
- tooltips for unfamiliar GIS icons
- obvious primary buttons
- consistent button styles
- readable tables
- status badges
- confirmation feedback after actions

Example toast messages:

"Parcel GP-014 accepted"

"Parcel GP-021 flagged for review"

"GeoJSON exported successfully"

"Demo data reset"

---

22. IMPORTANT DEMO FLOW

Make this complete flow work:

LOGIN
→ Demo Login
→ DASHBOARD
→ Upload Drone Imagery
→ Select demo image/file
→ Start Processing
→ Processing workflow
→ Completed
→ GIS Map
→ Click parcel
→ View parcel details
→ Accept/Edit/Flag
→ Parcel Review reflects change
→ Analytics reflects data
→ Export downloads current GeoJSON

This should work entirely on the frontend.

---

23. PERFORMANCE / CREDIT OPTIMIZATION

Because this must be completed within 5 Lovable credits:

- Implement everything in ONE pass.
- Do not generate separate redesign iterations.
- Do not rebuild components that already work.
- Keep components small and reusable.
- Avoid unnecessary dependencies.
- Avoid complex animations.
- Avoid unnecessary backend code.
- Avoid real AI integration.
- Avoid real authentication.
- Avoid database setup.
- Avoid 3D rendering.
- Avoid unnecessary API calls.
- Use deterministic local demo data.
- Use CSS/Tailwind for visual polish instead of large UI libraries.

---

24. FINAL QUALITY CHECK

Before finishing, verify:

- No TypeScript errors
- No broken imports
- No broken routes
- No blank pages
- Sidebar navigation works
- Demo Login works
- Upload works
- Remove file works
- Processing simulation works
- Map fallback works without API key
- Parcel selection works
- Accept works
- Flag works
- Edit works
- Filters work
- Validation page works
- Recharts render
- GeoJSON downloads
- Demo exports download
- Settings work
- Reset Demo Data works
- Light/dark mode works
- Responsive layout works
- No overlapping elements
- No fake buttons

FINAL INSTRUCTION

Build the entire GeoParcel AI frontend now in the current project in one implementation pass.

Do not ask questions.

Do not ask for approval.

Do not create a redesign plan.

Do not stop after creating only the dashboard.

Implement all routes, reusable components, state management, seeded data, interactions, processing simulation, GIS fallback, analytics, validation, review workflow and export functionality together.

Prioritize:

1. Functionality
2. Easy navigation
3. Professional GIS appearance
4. Responsive layout
5. Lightweight implementation

The final result should look like a real hackathon-ready geospatial software product while clearly remaining a frontend prototype.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/44e83dd3-26e3-40f3-88b7-f8ceef349d68).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
