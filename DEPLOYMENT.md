# TravelMate deployment and local runbook

TravelMate is a Vite/React frontend at the repository root and an Express/Mongoose/Socket.IO backend in `backend/`. The frontend's Vercel deployment and the backend's Render deployment are separate services.

## Local development without Docker

1. Install Node.js 22 or newer.
2. Install frontend dependencies from the repository root:

   ```powershell
   npm ci
   ```

3. Configure the backend without committing credentials:

   ```powershell
   Copy-Item backend/.env.example backend/.env
   ```

   Edit `backend/.env` and set `MONGO_URI` to the MongoDB URI for your local MongoDB or Atlas database and `JWT_SECRET` to a private random value. `PORT=5000` and `FRONTEND_URL=http://localhost:5173` are suitable local defaults. `backend/.env` is ignored by Git and excluded from the backend image.

4. Start the backend in one terminal:

   ```powershell
   cd backend
   npm ci
   npm run dev
   ```

   The backend must report a successful MongoDB connection and listen on port 5000. Its readiness endpoint is `http://localhost:5000/health`.

5. Start the frontend in another terminal from the repository root:

   ```powershell
   npm run dev
   ```

   Open the Vite URL, normally `http://localhost:5173`. In development, API and Socket.IO connections default to `http://localhost:5000`. To use another backend, set `VITE_API_URL` and, if needed, `VITE_SOCKET_URL` in a local Vite environment file such as `.env.local`.

6. Run the frontend production build and backend syntax checks:

   ```powershell
   npm run build
   cd backend
   npm run check
   ```

## Docker Compose

The frontend container serves the production Vite build through Nginx. Nginx serves SPA routes and proxies `/api` and `/socket.io` to the `backend` Compose service, so container-to-container traffic uses the service name rather than `localhost`. Browser traffic uses the frontend origin.

### Existing MongoDB deployment (Atlas or other reachable MongoDB)

Create the root Compose environment file and edit the values locally:

```powershell
Copy-Item .env.example .env
notepad .env
```

Set `MONGO_URI`, `JWT_SECRET`, and `FRONTEND_URL`. Keep the URI and secret private. If you change `FRONTEND_PORT`, set `FRONTEND_URL` to the matching browser origin.

```powershell
docker compose up --build -d
docker compose ps
docker compose logs -f backend
```

Open `http://localhost:5173`; the backend health endpoint is `http://localhost:5000/health`.

### Optional local MongoDB container

For an isolated local database, leave the root `.env` in place for `JWT_SECRET` and run the additional Compose file:

```powershell
docker compose -f docker-compose.yml -f docker-compose.local-mongo.yml up --build -d
docker compose -f docker-compose.yml -f docker-compose.local-mongo.yml ps
docker compose -f docker-compose.yml -f docker-compose.local-mongo.yml logs -f backend mongodb
```

The local database uses the named volume `travelmate-mongo-data`, so its contents survive container restarts and `docker compose down`. To remove the local database permanently, explicitly use `docker compose -f docker-compose.yml -f docker-compose.local-mongo.yml down -v`.

Stop either configuration with the matching `docker compose ... down` command. Rebuild after code/config changes with `up --build -d`. `docker compose logs -f frontend backend` follows service logs.

## GitHub Actions

The `TravelMate Full Stack CI` workflow runs on pushes and pull requests targeting `main`. It installs root and backend dependencies from their lockfiles, builds the frontend, and runs the backend syntax check. It does not deploy and requires no repository secrets.

To check the latest workflow in GitHub, open the repository's **Actions** tab, select **TravelMate Full Stack CI**, and verify the run for the commit has both `frontend-build` and `backend-check` jobs green. A pull request targeting `main` also triggers the checks.

## Render backend

Use the existing repository and set the Render service's **Root Directory** to `backend`.

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Build command | `npm ci` |
| Start command | `npm start` |
| Health-check path | `/health` |

Set these Render environment variables:

| Variable | Value |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection URI (or another reachable MongoDB URI) |
| `JWT_SECRET` | Private, high-entropy signing secret; do not prefix with `VITE_` |
| `FRONTEND_URL` | Exact Vercel production origin, e.g. `https://your-project.vercel.app`; comma-separate any additional approved origins |
| `TRUST_PROXY` | `1`; Render terminates one reverse-proxy hop, so Express can safely use the forwarded client IP for rate limits |

`PORT` is supplied by Render and is read by the server. The server binds to `0.0.0.0`, validates required settings, and does not start until MongoDB connects. `/health` returns HTTP 200 only when MongoDB is connected. `render.yaml` contains the corresponding Blueprint settings; create/configure the service and provide the secret values in Render.

After deployment, verify `https://<render-service>.onrender.com/health` returns `{"status":"ok","database":"connected"}` and `https://<render-service>.onrender.com/` returns the API status text. This does not by itself verify authenticated API operations or live chat.

## Vercel frontend

Import the same GitHub repository; do not create a separate frontend project. Use the repository root as **Root Directory**.

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

Set the following Vercel **Production** environment variables (and Preview if the preview frontend should call the backend):

| Variable | Value |
| --- | --- |
| `VITE_API_URL` | Full Render backend origin, e.g. `https://<render-service>.onrender.com` |
| `VITE_SOCKET_URL` | Same Render backend origin; optional because it defaults to `VITE_API_URL` |

These `VITE_` values are public frontend configuration, not secrets. Never put `MONGO_URI` or `JWT_SECRET` in Vercel frontend variables. `vercel.json` sets the build/output values and rewrites SPA routes to `index.html`, allowing direct links and refreshes.

After deploying the frontend, set the matching Vercel production origin in Render's `FRONTEND_URL`. If the backend CORS allowlist changes, redeploy/restart the Render backend.

## GitHub commit and push

Review the working tree first; this checkout already contains pre-existing integration changes. `git add -A` stages those along with this deployment work; if they should remain separate, replace that command with the specific paths you intend to include.

```powershell
git status --short
git add -A
git diff --cached --check
git diff --cached
git commit -m "Prepare TravelMate for deployment" -m "Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>"
git push origin main
```

Only push from `main` if that is the intended destination branch and the reviewed changes are ready. CI runs after the push. Do not commit `.env`, `backend/.env`, or any credentials.

## Redeploy and smoke-test checklist

- Backend code/configuration changes: deploy/restart the Render service.
- Frontend code or Vite environment changes: deploy the Vercel project again; Vite environment variables are embedded during build.
- Changes to backend CORS origins: update `FRONTEND_URL` in Render and restart/redeploy the backend.
- Confirm register/login, then refresh a protected route and confirm the signed-in session remains valid.
- Open a destination detail URL directly and refresh it; confirm the detail page loads and planning prefill is correct.
- Create a trip, confirm it appears in **My Trips**, refresh, and delete it; confirm it remains absent after refresh.
- Open the community chat in two separate browser sessions, send a message from one, and confirm it arrives in the other.
- Check browser developer tools for failed API requests, CORS errors, and failed Socket.IO connection attempts.
- Verify the Render `/health` endpoint and inspect Render/Vercel deployment logs. Do not treat a successful build or health response as proof of the end-to-end flows above.
