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
- **Pages & SEO:** edit the wording of every page (Home, About, Why Altiora, Our Approach, Services, Training, Career Guidance, Contact) and the **Site settings** (phone, email, address, WhatsApp, social links, footer text, closing banner). Each page also has SEO fields: title, meta description, a share image (with alt text), a custom page address and a canonical address; services have their own optional SEO title and description. Leave a text unchanged (or use "Reset to original") and it keeps the original wording. The list of editable texts and their default wording is in `client/src/content/schema.js`.
- **Services:** add, edit and delete the services shown on the home slider, the Services page, each service's own page (title, description, consultation button and photo) and the contact form's service list. Each service has a title and a description (a blank line starts a new paragraph; the cards show the first paragraph). A service's web address comes from its title when created and stays fixed. Each service has a photo uploaded from the form (JPG, PNG or WebP up to 5 MB). Uploaded photos are resized to at most 1600px wide and stored on Cloudinary (set the three `CLOUDINARY_*` values in `server/.env` and on Render); without them they are kept in MongoDB and served from `/api/images/<id>`, because the free hosting disk is wiped on restart. A photo is deleted when it is replaced or its service is deleted. Pictures already stored in MongoDB are moved to Cloudinary once with `npm run migrate-images` (preview) and `npm run migrate-images -- --apply`. New services get a default icon.
- **Career Guidance:** add, edit and delete the cards in the "Practical Support for Your Next Step" section of the Career Guidance page (title, short description, display order). New cards get a default icon; existing ones keep theirs.
- **Program Categories:** add, rename, reorder and delete the categories that group the training programs (a category that still has programs can't be deleted). They become the filters on the public Training page.
- **Training Programs:** add, edit and delete; the category is picked from a dropdown of the categories above. Changes show on the public Training page immediately.

Login issues a 8-hour JWT stored in the browser; admin API routes (`/api/admin/*`, and writes to `/api/programs` and `/api/enquiries`) require it.

## Where the old files went

| Original | Now |
|---|---|
| `index.html`, `about.html`, `services.html`, `our-approach.html`, `contact.html`, `training-programs.html` | `client/src/pages/*.jsx` |
| 4 × `service-*.html` | one template, `client/src/pages/ServiceDetail.jsx`, fed by the `/api/services` data (starting services in `server/seed/services.data.js`) |
| header / footer repeated on every page | `components/Header.jsx`, `components/Footer.jsx`, wrapped by `components/Layout.jsx` |
| `js/main.js` (slider, nav, reveal, count-up, modal, forms) | `Hero.jsx`, `ServicesSlider.jsx`, `Header.jsx`, `ConsultModal.jsx`, `EnquiryForm.jsx`, `hooks/useSiteEffects.js` |
| `js/training-data.js` + `training-render.js` | `server/seed/categories.data.js` + `programs.data.js` → MongoDB → `components/TrainingCatalogue.jsx` |

## Upgrading an existing database

If your programs were created before categories became their own collection, run `npm run migrate-categories` once from `server/`. It creates the categories and links every program to one; nothing is deleted.

Services moved from a code file into the database too: run `npm run seed-services` once from `server/` to load the five starting services. If your database already holds services in the earlier, longer format (intro, three points, benefits), run `npm run migrate-services` once to turn each into a single description. It only adds services whose address does not exist yet, so it is safe to run again.

The Career Guidance cards are in the database too: run `npm run seed-career-services` once from `server/` to load the eight starting cards (safe to run again; it only adds cards whose title does not exist yet).

## Adding another editable text

Open `client/src/content/schema.js`, add a field to the page (key, label, default wording), and in the page component show it with `c('that.key')` (from `usePage('pagekey')`). No database change is needed: only texts the admin changes are stored, everything else uses the default in that file.

## SEO notes

The title, description, canonical link and social-share tags are written by the page in the browser (`client/src/content/seo.js`). Google reads them, but link-preview bots (WhatsApp, Facebook, LinkedIn) only read the original HTML, so shared links show the generic preview until the pages are pre-rendered. The `noindex` tag has been removed, so the site can be found by search engines. `robots.txt` and `sitemap.xml` are generated on every build by `client/scripts/seo-files.js` (service pages are read from the API; set `SITE_URL` to your own domain, otherwise Netlify's address is used). Admin pages are blocked in `robots.txt` and carry their own `noindex`. After deploying, submit `/sitemap.xml` in Google Search Console.

## Notes

- Enquiries are stored in MongoDB and managed in the admin dashboard. Nothing emails you yet.
- "Why Us" had no page in the original (the link was broken); it points to About for now.
- The home-page services row had two duplicated cards to make the slider scroll; it now shows the four real services.
- WhatsApp number is still the placeholder in `client/src/config.js`.
- Deploy: client → Vercel/Netlify (set `VITE_API_URL`), API → Render/Railway (set `MONGODB_URI`, `CLIENT_URL`), DB → Atlas.

## Speed and security (client/scripts/seo-files.js)

Every `npm run build` also writes `dist/_headers` for Netlify: security headers (a Content-Security-Policy that allows only the site's own files, Google Fonts, the Google map and the API at `VITE_API_URL`) and long caching for CSS, JS and images. Two things to remember:

- `VITE_API_URL` must be set when the site is built on Netlify, otherwise the policy blocks the API.
- If you add a new outside service (for example Google Analytics), add its addresses to the policy in `client/scripts/seo-files.js`, or the browser will block it.

Images in `client/public/assets` are kept small (about 100 KB each, at most 1600 px wide). The folders `client/_originals` and `client/_unused-assets` are local backups (not pushed to Git, not deployed).

## Enquiry emails (Brevo)

When someone sends the contact form or the consultation popup, the enquiry is saved and the team gets an email (Reply-To is the visitor, so pressing Reply answers them). Setup:

1. Create a Brevo account, verify a sender address (Senders) and create an API key (SMTP & API). Turn off "Authorised IPs" in Security, because Render's address changes.
2. Put these in `server/.env` (and in the Render environment): `BREVO_API_KEY`, `MAIL_FROM_EMAIL` (the verified sender), `MAIL_FROM_NAME`, `NOTIFY_EMAIL` (who receives enquiries).
3. Restart the server. In the dashboard open **Notifications**: the receiving address can be changed there (it overrides `NOTIFY_EMAIL`), and **Send test email** checks that it works.

The email is sent in the background: if it fails the visitor still sees "Thank you" and the enquiry is still saved; the enquiry's details show "Email sent" or "Email not sent" with the reason. Use a business address on your own domain as the sender before launch, and authenticate that domain in Brevo, so the emails do not land in spam.
