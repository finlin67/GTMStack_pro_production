# Gallery Command Quick Reference

Use this as the fastest "which repo, which command" reminder.

## 1) Pick the correct repo first

### Animations source repo

```powershell
cd C:\GitProd\GTMStack_Animations\gtmstack_animations
```

Use this repo for manifest generation and source-asset checks.

### Website/gallery repo

```powershell
cd C:\GitProd\GTMStack_pro_production
```

Use this repo for gallery sync, validation, and QA checks.

## 2) Most-used commands

### In `GTMStack_Animations\gtmstack_animations`

```powershell
npm run validate:missing
npm run manifest:gen
npm run move:missing:dry
```

### In `GTMStack_pro_production`

```powershell
npm run sync:gallery
npm run validate:gallery
npm run audit:gallery:phase2
```

## 3) Safe end-to-end sequence

```powershell
cd C:\GitProd\GTMStack_Animations\gtmstack_animations
npm run manifest:gen

cd C:\GitProd\GTMStack_pro_production
npm run sync:gallery
npm run validate:gallery
npm run audit:gallery:phase2
```

## 4) Common error and fix

If you see:

- `ENOENT ... could not read package.json`

You are in the wrong folder. `cd` to one of the two repo paths above and run again.
