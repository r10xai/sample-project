# Sample Project

A minimal Express API used as a sample project. It exposes a `/hello` JSON endpoint and a `/health` plain-text health check, and ships with Jest + Supertest tests.

## Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/r10xai/sample-project)

The repo includes a `render.yaml` Blueprint that provisions a free-tier Render web service (Node 20, `npm install` / `npm start`, health check on `/health`). Click the button above, sign in to Render, and approve the Blueprint to ship.

### Continuous deploy on push (optional)

A GitHub Actions workflow at `.github/workflows/deploy.yml` triggers a Render redeploy on every push to `main` once you wire up the deploy hook:

1. In Render, open your service → **Settings** → **Deploy Hook** → copy the URL.
2. In GitHub, open the repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret** named `RENDER_DEPLOY_HOOK` and paste the URL.

Until the secret is set, the workflow no-ops with a friendly message. CI tests run on every push regardless (`.github/workflows/ci.yml`).

## Requirements

- Node.js 23.x (the project was developed against Node 23; any recent LTS Node 18+ should also work)
- npm 9+ (bundled with Node)

## Setup

Clone the repo and install dependencies:

```bash
git clone <repo-url> sample-project
cd sample-project
npm install
```

That's it — there is no build step and no required environment configuration. The only env var the app reads is `PORT` (defaults to `3000`).

## Scripts

| Script      | What it does                                                        |
| ----------- | ------------------------------------------------------------------- |
| `npm start` | Runs the server with `node src/index.js`. Listens on `PORT` (3000). |
| `npm test`  | Runs the Jest suite in `tests/` against the exported app.           |

## Running the server

```bash
npm start
# Server listening on port 3000
```

To run on a different port:

```bash
PORT=4000 npm start
```

## Endpoints

### `GET /hello`

Returns a JSON greeting.

```bash
curl -s http://localhost:3000/hello
# {"message":"world"}
```

Response: `200 OK`, `Content-Type: application/json`, body `{ "message": "world" }`.

### `GET /health`

Lightweight liveness probe — returns plain text `ok`. Useful for load balancers and uptime checks.

```bash
curl -i http://localhost:3000/health
# HTTP/1.1 200 OK
# Content-Type: text/plain; charset=utf-8
# ...
# ok
```

Response: `200 OK`, `Content-Type: text/plain`, body `ok`.

## Testing

The test suite uses Jest and Supertest. `src/index.js` exports the Express `app` and only calls `app.listen` when run directly, so Supertest can drive it without binding to a port.

```bash
npm test
```

To run a single test file:

```bash
npx jest tests/app.test.js
```

To run with watch mode while developing:

```bash
npx jest --watch
```

## Project layout

```
sample_project/
├── src/
│   ├── index.js          # Express app — exports `app`, listens only when run directly
│   └── routes/
│       └── health.js     # /health router
├── tests/
│   └── app.test.js       # Jest + Supertest specs
├── package.json
└── .gitignore
```

## Adding a new route

1. Create a router in `src/routes/<name>.js`:

   ```js
   const express = require("express");
   const router = express.Router();

   router.get("/example", (req, res) => {
     res.json({ ok: true });
   });

   module.exports = router;
   ```

2. Mount it in `src/index.js`:

   ```js
   const exampleRouter = require("./routes/example");
   app.use(exampleRouter);
   ```

3. Add a spec in `tests/` that requires `../src/index` and uses Supertest to hit the route.
