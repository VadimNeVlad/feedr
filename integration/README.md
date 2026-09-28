# Frontend ↔ backend integration checks

Run from the frontend checkout:

```sh
npm run test:integration
```

The default layout is two sibling checkouts, `feedr-frontend` and `feedr-backend`, with dependencies installed in both. To use another backend location, set `FEEDR_BACKEND_DIR` to its absolute path before running the command. Use the Node version supported by both projects; the backend currently documents Node 24.

If the local npm launcher is unavailable, run:

```sh
node node_modules/jest/bin/jest.js --config integration/jest.config.cjs --runInBand
```

The suite starts Nest on a dynamically allocated loopback port and sends real frontend RTK Query requests using native fetch. Controllers, application validation, multipart interceptors, file validation, services, password hashing, JWT signing and JWT guards are real. The transport changes only the test origin; it preserves methods, request headers, bodies and response parsing.

Prisma and Cloudinary are replaced with isolated fixtures. No production secrets, external uploads or database writes are required. The harness closes its server, restores fetch and clears query subscriptions after execution.

Coverage includes:

- Registration, login, expired access tokens, shared refresh, concurrent token rotation and logout revocation.
- Article lists and tag response normalization, multipart create/update with and without images, replacement/removal, ownership and deletion.
- Invalid multipart fields, spoofed image files and simultaneous image replacement/removal.
- Favorites, reading lists, comments, follows and pagination offsets.
- Profile name/avatar changes refreshing subscribed article, comment and follow caches.
- Password changes without the frontend-only confirmation field.
- Tag catalog pagination beyond the original 100-record limit.

These checks complement `npm test`; they do not replace a PostgreSQL-backed end-to-end suite. They do not verify migrations, database constraints/isolation, Cloudinary availability, browser CORS enforcement or the production deployment configuration. The harness mounts real controllers and services directly, so global infrastructure from AppModule, such as rate limiting, also needs separate coverage.
