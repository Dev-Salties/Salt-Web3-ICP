#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

dfx stop || true
dfx start --clean --background
dfx identity use default

# Motoko deps
( cd cms && mops install )

# Deploy backend and generate declarations
dfx deploy backend
dfx generate backend

# Update CMS frontend env with backend ID (optional automation)
BACKEND_ID=$(dfx canister id backend)
echo "Backend ID: $BACKEND_ID"
if [ -f cms/src/frontend/.env ]; then
  sed -i "s/^VITE_CANISTER_ID_BACKEND=.*/VITE_CANISTER_ID_BACKEND=$BACKEND_ID/" cms/src/frontend/.env || true
fi

# Build CMS frontend
( cd cms/src/frontend && pnpm install && pnpm build )

# Ensure uploads folder exists
mkdir -p cms/src/uploads/assets
touch cms/src/uploads/assets/.keep

# Build website
( cd website && npm install && npm run build )

# Deploy assets canisters
dfx deploy frontend
dfx deploy uploads
dfx deploy salt_frontend

echo "Website: http://127.0.0.1:4943/?canisterId=$(dfx canister id salt_frontend)"
echo "CMS:     http://127.0.0.1:4943/?canisterId=$(dfx canister id frontend)"