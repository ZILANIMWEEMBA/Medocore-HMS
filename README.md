# MediCore HMS — Hospital Management System (MVP Frontend)

A production-grade hospital management system frontend built with React + Vite.

## Design Aesthetic
- **Typography**: Syne (display/headings) + DM Sans (body)
- **Theme**: Deep navy sidebar with ivory/white content area, electric teal accent
- **Style**: Clinical precision meets editorial luxury — clean, dense, professional

## Features

### 7 Fully Functional Modules

| Module | Features |
|--------|----------|
| **Dashboard** | Stats cards, revenue area chart, specialty bar chart, recent patients, today's schedule |
| **Patients** | Register new patients, filter by status, search, view profile modal, full patient table |
| **Appointments** | Book appointments, confirm/cancel, filter by status, full scheduling table |
| **Doctors** | Doctor cards + table, add new doctor, view profile modal with bio |
| **Wards & Beds** | Visual bed grid (Occupied/Available/Reserved), occupancy progress bars per ward |
| **Medical Records** | Patient selector, visit history tabs, clinical notes, prescriptions, test results |
| **Billing** | Invoice list, detail panel, line items, mark paid, create new invoice, export PDF (mock) |

### UI Components
- Animated stat cards with delta indicators
- Recharts AreaChart (revenue) + BarChart (specialty distribution)
- Reusable modal with ESC key support + backdrop click
- Toast notification system (success / error / info)
- Avatar component with color-coded initials
- Badge system (success/warning/danger/info/purple/teal/gray)
- Responsive table with hover states
- Progress bars
- Search input
- Form inputs with teal focus rings

## Stack
- **React 18** — UI
- **Vite 5** — Bundler
- **Recharts** — Charts
- **Google Fonts** — Syne + DM Sans
- **Pure CSS** — No UI library, fully custom design system

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
medicore-hms/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx          # Entry point
    ├── App.jsx           # Root component + page routing
    ├── index.css         # Global design system (CSS variables, components)
    ├── components/
    │   ├── Sidebar.jsx   # Navigation sidebar
    │   ├── Topbar.jsx    # Header with search + actions
    │   ├── Modal.jsx     # Reusable modal dialog
    │   ├── Avatar.jsx    # Initials avatar
    │   └── Toast.jsx     # Notification toasts
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Patients.jsx
    │   ├── Appointments.jsx
    │   ├── Doctors.jsx
    │   ├── Wards.jsx
    │   ├── MedicalRecords.jsx
    │   └── Billing.jsx
    ├── data/
    │   └── mockData.js   # All seed data (patients, doctors, appointments, etc.)
    └── hooks/
        └── useToast.js   # Toast notification hook
```

## Seed Data
- 10 patients with full profiles
- 6 doctors across 5 specialties
- 8 appointments across 2 dates
- 4 wards with individual bed grids
- 3 detailed medical records with visit history
- 6 invoices with line items
- 6 months of revenue data for charts

## Next Steps (Phase 2)
- Backend API (Node.js + Express or Django)
- PostgreSQL database
- JWT authentication
- Insurance claims module
- Lab & radiology module
- Pharmacy inventory
- Email/SMS notifications
- Mobile-responsive layout
- Dark mode toggle
- Role-based access (Doctor / Receptionist / Patient views)
