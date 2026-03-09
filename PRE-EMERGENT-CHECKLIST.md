# Pre-Emergent Validation

Run before each AI implementation batch.

## Environment validation

npm ci
npm run typecheck
npm run lint

## Registry validation

npm run validate:registry
npm run registry:audit

## Link integrity

npm run link-audit

## Build validation

npm run build
npm run build:static

## Dead code scan

npx knip --production

## Pass criteria

- All commands exit with code 0
- No registry validation errors
- build and build:static succeed
- knip findings reviewed and accepted