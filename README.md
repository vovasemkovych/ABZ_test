ABZ Test — Frontend Project Documentation

Overview
- Purpose: Single-page app to display users from the ABZ API and allow registration.
- Architecture: Vite + React with component-scoped SCSS and a small API layer.
- Main features:
  - Hero/Greeting section with CTA
  - Users list with pagination ("Show more")
  - Sign-up form with client-side validation and image upload

Tech Stack
- Build tool: Vite
- Framework: React 18
- Language: JavaScript (ESM)
- Styling: SCSS modules per component + shared mixins/variables in src/styles
- HTTP client: axios

Project Structure (key parts)
- src/main.jsx — App entry; mounts React to #root and imports global styles.
- src/App.jsx — Minimal wrapper rendering Home.
- src/styles/
  - base.scss — Variables (fonts, colors, sizes) and mixins.
  - mixins.scss — Shared SCSS variables and mixins (re-exported by index.scss).
  - index.scss — Global resets and forwards mixins.
- src/pages/Home/Home.jsx — Page composition and data flow:
  - Orchestrates Header, Greeting, UsersBlock, and Form
  - Manages users pagination and refresh on successful registration
- src/components/
  - Header/ — App header with logo and nav buttons
  - Greeting/ — Hero section with background image and CTA
  - UsersBlock/ — Users grid with loader/error and "Show more"
  - UserCard/ — Individual user card with avatar fallback
  - Button/ — Reusable button with base and modifier styles
  - Form/ — Sign-up form with validation and POST to API
  - Popup/ — Reusable popup modal for transient success/info messages
- src/api/
  - client.js — axios instance and response interceptor
  - userApi.js — API helpers: getUsers, getPositions, getToken, createUser

Data Flow
- Home.jsx holds pagination state: page, totalPages, users, loading, error.
- fetchPage(page, append) requests users and sets state. Users are sorted by registration_timestamp to keep newest first.
- Show more increments page and appends users.
- After successful registration (Form), Home resets to page 1 and refetches to ensure the new user is visible first.

Validation Rules (Form)
- name: 2..60 characters
- email: valid email format
- phone: "+380" followed by 9 digits (e.g. +380501234567)
- position_id: required (radio selection)
- photo: JPEG/JPG only, max 5 MB

API Endpoints (ABZ)
- GET /users?page={page}&count={count} → returns paginated users
- GET /positions → radio options
- GET /token → CSRF token for creating users
- POST /users (multipart/form-data) with fields: name, email, phone, position_id, photo

Styling Guidelines
- Use variables and mixins from src/styles/mixins.scss via @use '../../styles/index' as *;
- Button styles via @include button(); modifiers .btn--pill, .btn--ghost.
- Card layout via @include card();
- Global typography and box-sizing set in styles/index.scss.

Accessibility & UX
- Semantic elements: header, section, main, article, h1/h2.
- Buttons use explicit type; form submission uses type="submit".
- Images have alt text; avatar errors fall back to a default image.
- Scroll navigation uses smooth scrolling to anchors.

Conventions
- Components: PascalCase, one folder per component with .jsx and .scss.
- Keep App.jsx minimal; page-level logic lives in pages/Home.
- Avoid inline styles except for simple one-offs (e.g., width in Show more button); prefer SCSS classes.

Local Development
- Install: npm install
- Run dev server: npm run dev
- Build: npm run build
- Preview build: npm run preview

Possible Improvements
- Add React Router if more pages are needed.
- Add testing (Jest + React Testing Library).
- Extract inline style values into SCSS classes for consistency.
- Persist pagination/loading state with URL query params.
- Improve a11y (focus states, aria-live for loading/errors).
- Add debounce to inputs and better phone mask/formatting.

Release Notes (current clean-up)
- Removed unused imports and console logs.
- Added comments to clarify component purposes.
- Normalized button type handling and submit button type.
- Minor style tweaks for buttons, grids, and overall consistency.
