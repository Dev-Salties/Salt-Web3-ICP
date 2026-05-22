 # Salt Essential CMS

Content Management System for the Salt Essential IT website. Manage news articles, products, job vacancies, team member profiles, and CATS (Cybersecurity Awareness Training Sessions) links secured with Internet Identity authentication and built on the Internet Computer.

---

## Running on Windows (Recommended)

DFX (the official Dfinity SDK) does not support Windows. However, the **ICP CLI** (`@dfinity/icp`) is a Node.js-based alternative that deploys Motoko canisters and asset canisters natively on Windows no WSL required for day-to-day work.

This project ships `icp.yaml` (Windows) alongside `dfx.json` (Linux/WSL/CI). Both deploy the exact same canisters.

### Prerequisites (Windows)

| Tool | Install |
|------|---------|
| **Node.js 20** | https://nodejs.org (LTS) |
| **pnpm** | `npm install -g pnpm` |
| **ICP CLI** | Installed automatically via `pnpm install` (listed in devDependencies) |

### Setup

```powershell
# In PowerShell (or Windows Terminal), inside the project folder:
pnpm install
```

### Running Locally

**Terminal 1 :start the local ICP replica:**

```powershell
pnpm icp:local
# or directly:
npx icp network start -d
```

**Terminal 2 : deploy the backend canister:**

```powershell
pnpm icp:deploy
# or deploy just the backend:
pnpm icp:deploy:be
```

After deploy, note the **backend** canister ID:

```powershell
pnpm icp:id:backend
# or:
npx icp canister id backend
```

**Terminal 3: start the frontend dev server:**

```powershell
cd src/frontend

# Set canister IDs as environment variables (PowerShell):
$env:CANISTER_ID_BACKEND  = $(npx icp canister id backend)
$env:CANISTER_ID_UPLOADS  = $(npx icp canister id uploads)
$env:CANISTER_ID_FRONTEND = $(npx icp canister id frontend)
$env:DFX_NETWORK          = "local"

pnpm dev
```

Open **http://localhost:5173** in your browser.

### Deploying to IC Mainnet (Windows)

```powershell
# Build the frontend first
pnpm build

# Deploy all canisters to the live Internet Computer
pnpm icp:deploy:ic
# or:
npx icp deploy --network ic
```

---

## Running on Linux / WSL / macOS

Use DFX for the full feature set (including `dfx generate` for TypeScript bindings).

### Prerequisites (inside WSL)

```bash
# Open WSL from PowerShell:
wsl

# Install fnm + Node 20
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install 20 && fnm use 20

# Install pnpm
npm install -g pnpm

# Install DFX
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# Install Mops (Motoko package manager)
npm install -g ic-mops
```

### Sync project from Windows to WSL

DFX has permission issues with files on `/mnt/c/…`. Sync to your WSL home first:

```bash
rsync -av --exclude='node_modules' --exclude='.dfx' \
  "/mnt/c/Users/<your-username>/Documents/Management-System/salt-essential-cms/" \
  ~/salt-essential-cms/
cd ~/salt-essential-cms
```

> Add this as a shell alias so you can sync with one command:
> ```bash
> alias cms-sync='rsync -av --exclude=node_modules --exclude=.dfx \
>   "/mnt/c/Users/<your-username>/Documents/Management-System/salt-essential-cms/" \
>   ~/salt-essential-cms/'
> ```

### Running Locally (WSL/Linux)

```bash
# Terminal 1 — replica + deploy
mops install
pnpm install
dfx start --background --clean
dfx deploy

# Terminal 2 — generate TypeScript bindings
dfx generate backend

# Terminal 3 — frontend
cd src/frontend
export CANISTER_ID_BACKEND=$(dfx canister id backend)
export CANISTER_ID_UPLOADS=$(dfx canister id uploads)
export CANISTER_ID_FRONTEND=$(dfx canister id frontend)
export DFX_NETWORK=local
pnpm dev
```

---

## First-Time Admin Setup

After the first deploy (Windows or WSL):

1. Open **http://localhost:5173** and sign in with Internet Identity.
2. Call `bootstrapAdmin()` from the Candid UI:
   - Local: `http://127.0.0.1:4943/?canisterId=<candid-ui-id>&id=<backend-id>`
   - Call **bootstrapAdmin**  registers your II principal as the first admin.
3. Refresh the CMS  you have full admin access.

> `bootstrapAdmin` only works once (when no admins exist). After that, add users through **Settings → Team Access** in the CMS UI.

---

## Project Structure

```
salt-essential-cms/
├── icp.yaml                    # Windows deploy config (ICP CLI / npx icp)
├── dfx.json                    # Linux/WSL/CI deploy config (DFX)
├── mops.toml                   # Motoko package manager
├── package.json                # pnpm workspace + deploy scripts
└── src/
    ├── backend/
    │   ├── main.mo             # Main actor — composes all modules
    │   ├── types/Types.mo      # All shared Motoko types
    │   └── lib/
    │       ├── Access.mo       # Admin/Editor roles
    │       ├── Articles.mo     # Articles (draft/publish/schedule)
    │       ├── Products.mo     # Shop products
    │       ├── Vacancies.mo    # Job listings
    │       ├── Team.mo         # Team profiles
    │       ├── Cats.mo         # CATS sessions + archive strategy
    │       └── Categories.mo   # Product categories
    ├── frontend/               # React + Vite CMS dashboard
    │   └── src/
    │       ├── context/        # AuthContext (Internet Identity)
    │       ├── components/     # Layout, shared UI
    │       ├── pages/          # One file per CMS section
    │       └── lib/            # Canister client factory
    ├── uploads/                # ICP asset canister for file uploads
    ├── website-sdk/            # Typed SDK for the public Salt-Web3 site
    │   └── src/index.ts        # createCmsClient() + all types
    └── declarations/           # Auto-generated by `dfx generate` (gitignored)
```

---

## Content Types

### News Articles
- Fields: `title`, `slug`, `description`, `body` (HTML), `date`, `tags`, `imageUrl`, `metaDesc`, `ogImage`, `status`
- Scheduled publishing: set `scheduledAt`; heartbeat auto-publishes every ~5 min
- Roles: Editors can save drafts; only Admins can publish

### Products
- Fields: `name`, `price`, `description`, `imageUrl`, `category`, `enquiryUrl`
- Categories managed under Settings

### Job Vacancies
- Fields: `title`, `department`, `summary`, `location`, `employmentType`, `description`, `applyUrl`, `closingDate`, `active`

### Team Members
- Fields: `name`, `role`, `bio`, `photoUrl`, `order`

### CATS Links
- Fields: `year`, `week`, `weekLabel`, `title`, `topic`, `date`, `imageUrl`, `youtubeUrl`, `archived`
- **Archive strategy**: Old years are archived (hidden from the public site) rather than deleted. Full history is preserved in stable memory and viewable in the admin panel at any time.
- Upsert by `id = "{year}-week{week}"` — resubmitting the same pair updates the YouTube URL.

---

## Roles & Permissions

| Action | Admin | Editor |
|--------|-------|--------|
| Create / update draft articles | ✓ | ✓ |
| Publish / unpublish articles | ✓ | ✗ |
| Schedule article publishing | ✓ | ✗ |
| Manage products, vacancies, team | ✓ | ✗ |
| Manage CATS links | ✓ | ✗ |
| Add / remove categories | ✓ | ✗ |
| Add / remove editors | ✓ | ✗ |
| Add / remove admins | ✓ | ✗ |

---

## Website SDK

Use this on the public Salt-Web3 site to read content from the CMS:

```typescript
import { createCmsClient } from "@salt-essential/cms-sdk"

const cms = createCmsClient({
  canisterId: "your-backend-canister-id",  // npx icp canister id backend --network ic
})

const articles  = await cms.getPublishedArticles()
const article   = await cms.getArticleBySlug("my-post")
const products  = await cms.getProducts()
const vacancies = await cms.getActiveVacancies()
const team      = await cms.getTeamMembers()
const cats      = await cms.getCatsLinks()
const cats2025  = await cms.getCatsLinksByYear("2025")
```

---

## Storage and Archive Strategy

ICP stable memory holds gigabytes far more than this CMS will ever need. A `CatSession` record is ~500 bytes; 10 years × 16 sessions ≈ 80 KB total.

The **archive flag** solves hiding old content without data loss:
- **Archive** a CAT year → hidden from `getCatsLinks()` on the public site, but still in stable memory and visible in the admin panel.
- **Unarchive** anytime to restore it.
- **Hard delete** is available but discouraged  keeping history is free.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Blockchain | Internet Computer (ICP) |
| Backend | Motoko with Enhanced Orthogonal Persistence |
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS |
| Data fetching | TanStack React Query |
| Auth | Internet Identity |
| Package manager | pnpm |
| Windows deploy | ICP CLI (`@dfinity/icp`) via `icp.yaml` |
| Linux/CI deploy | DFX 0.31 via `dfx.json` |
| Motoko packages | Mops |
