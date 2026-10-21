# Altiora Business Advisory — MERN version

The static site (HTML/CSS/JS) rebuilt as a MERN app.

| Part | What it does |
|---|---|
| `client/` | React (Vite) + React Router. Same look as the original (`src/styles/style.css` is the original stylesheet). |
| `server/` | Express + Mongoose API: `GET /api/programs`, `POST /api/enquiries`, `GET /api/enquiries` (admin key). |
| MongoDB | Collections `programs` (training catalogue) and `enquiries` (form submissions). |

## Run it

1. Have MongoDB running locally, or create a free MongoDB Atlas cluster.
2. Create `server/.env` from `server/.env.example` and set `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
   Use a database that belongs to this project — `npm run seed` **wipes the `programs` collection** it connects to.
3. Install, seed, create the admin account, start:

```bash
npm run install:all
npm run seed
npm run create-admin --prefix server
npm run dev
```

Site: http://localhost:5173 · API: http://localhost:5000/api/health · Admin: http://localhost:5173/admin

## Admin dashboard (`/admin`)

Sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `server/.env` (re-run `create-admin` to change the password).

- **Dashboard:** new / last-7-days / total enquiries, program counts by category, recent enquiries.
- **Enquiries:** search, filter by status (new → contacted → closed), view details, reply by email, delete.
- **Program Categories:** add, rename, reorder and delete the categories that group the training programs (a category that still has programs can't be deleted). They become the filters on the public Training page.
- **Training Programs:** add, edit and delete; the category is picked from a dropdown of the categories above. Changes show on the public Training page immediately.

Login issues a 8-hour JWT stored in the browser; admin API routes (`/api/admin/*`, and writes to `/api/programs` and `/api/enquiries`) require it.

## Where the old files went

| Original | Now |
|---|---|
| `index.html`, `about.html`, `services.html`, `our-approach.html`, `contact.html`, `training-programs.html` | `client/src/pages/*.jsx` |
| 4 × `service-*.html` | one template, `client/src/pages/ServiceDetail.jsx`, fed by `client/src/data/services.jsx` |
| header / footer repeated on every page | `components/Header.jsx`, `components/Footer.jsx`, wrapped by `components/Layout.jsx` |
| `js/main.js` (slider, nav, reveal, count-up, modal, forms) | `Hero.jsx`, `ServicesSlider.jsx`, `Header.jsx`, `ConsultModal.jsx`, `EnquiryForm.jsx`, `hooks/useSiteEffects.js` |
| `js/training-data.js` + `training-render.js` | `server/seed/categories.data.js` + `programs.data.js` → MongoDB → `components/TrainingCatalogue.jsx` |

## Upgrading an existing database

If your programs were created before categories became their own collection, run `npm run migrate-categories` once from `server/`. It creates the categories and links every program to one; nothing is deleted.

## Notes

- Enquiries are stored in MongoDB and managed in the admin dashboard. Nothing emails you yet.
- "Why Us" had no page in the original (the link was broken); it points to About for now.
- The home-page services row had two duplicated cards to make the slider scroll; it now shows the four real services.
- WhatsApp number is still the placeholder in `client/src/config.js`.
- Deploy: client → Vercel/Netlify (set `VITE_API_URL`), API → Render/Railway (set `MONGODB_URI`, `CLIENT_URL`), DB → Atlas.
