# UI Freeze Protection System

This project has UI freeze protection enabled to prevent accidental changes to the approved visual design and user experience.

## 🔒 Protected Files

The following files are protected from changes:
- `/client/src/pages/**` - All page components
- `/client/src/components/**` - All UI components  
- `/client/src/index.css` - Main stylesheet
- `/public/**` - All public assets

## 🚫 What Happens When You Try to Change Protected Files

If you attempt to commit changes to protected files, the pre-commit guard will:
1. Block the commit
2. Show which files are protected
3. Provide instructions for temporary override

## 🔓 Temporarily Allowing UI Changes

**Only use this when absolutely necessary and with proper approval:**

### Step 1: Enable UI Changes
```bash
export ALLOW_UI_CHANGES=true
npm run unlock-ui
```

### Step 2: Make Your Changes
- Edit protected files as needed
- Test thoroughly

### Step 3: Commit with Required Prefix
```bash
git add .
git commit -m "UI-EDIT: Brief description of changes"
```
**Important:** Commit message MUST start with `UI-EDIT:` when `ALLOW_UI_CHANGES=true`

### Step 4: Update Build Baseline
```bash
npm run baseline
```
This updates the bundle size baseline if your changes affect build size.

### Step 5: Disable UI Changes
```bash
unset ALLOW_UI_CHANGES
```

## 🧪 Testing UI Changes

Before committing UI changes, run:
```bash
npm run check:ui
```

This will:
- Run smoke tests to ensure basic functionality
- Check build sizes against baseline
- Verify no regressions introduced

## 📊 Monitoring Build Size

The system tracks bundle size to prevent regressions:
- Builds are checked against `build-baseline.json`
- Increases >10% will fail the build
- Update baseline with `npm run baseline` if increases are intentional

## 🚨 Emergency Override

If the protection system is blocking critical fixes:

1. Contact the UI team lead
2. Create a branch: `git checkout -b emergency-ui-fix`
3. Follow the temporary override process above
4. Create a PR with detailed justification

## 🔧 System Files

- `.guardrails.json` - Protection configuration
- `scripts/precommit-guard.mjs` - Pre-commit enforcement
- `CODEOWNERS` - Review requirements
- `build-baseline.json` - Bundle size baseline

## 📋 Available Commands

- `npm run unlock-ui` - Show warning about UI changes
- `npm run baseline` - Update build size baseline  
- `npm run test:smoke` - Run basic functionality tests
- `npm run check:build` - Check build size and health
- `npm run check:ui` - Run all UI protection checks

## 🎯 Purpose

This system ensures:
- Visual design consistency
- Prevention of accidental regressions
- Controlled change process for UI updates
- Build size monitoring
- Team coordination on UI changes