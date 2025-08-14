#!/usr/bin/env node
/**
 * Pre-commit guard for UI freeze protection
 * Prevents commits touching forbidden UI files unless explicitly allowed
 */

import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import pc from 'picocolors';

const GUARDRAILS_FILE = resolve('.guardrails.json');

function main() {
  try {
    // Load guardrails configuration
    const guardrails = JSON.parse(readFileSync(GUARDRAILS_FILE, 'utf8'));
    const forbiddenGlobs = guardrails.policy.forbiddenGlobs || [];
    
    // Check if UI changes are explicitly allowed
    const allowUIChanges = process.env.ALLOW_UI_CHANGES === 'true';
    
    // Get staged files
    const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .split('\n')
      .filter(Boolean);
    
    // Check for forbidden file changes
    const forbiddenChanges = stagedFiles.filter(file => 
      forbiddenGlobs.some(glob => {
        const pattern = glob.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*');
        return new RegExp(`^${pattern}$`).test(file);
      })
    );
    
    if (forbiddenChanges.length === 0) {
      console.log(pc.green('✓ Pre-commit check passed - no UI files modified'));
      process.exit(0);
    }
    
    if (allowUIChanges) {
      // Check commit message requires UI-EDIT prefix
      const commitMsg = execSync('git log --format=%B -n 1 HEAD', { encoding: 'utf8' }).trim();
      if (!commitMsg.startsWith('UI-EDIT:')) {
        console.error(pc.red('✗ UI changes require commit message to start with "UI-EDIT:"'));
        console.error(pc.yellow('Example: "UI-EDIT: Update button color for accessibility"'));
        process.exit(1);
      }
      
      console.log(pc.yellow('⚠ UI changes detected but explicitly allowed:'));
      forbiddenChanges.forEach(file => console.log(pc.yellow(`  - ${file}`)));
      console.log(pc.green('✓ Pre-commit check passed with ALLOW_UI_CHANGES=true'));
      process.exit(0);
    }
    
    // Block the commit
    console.error(pc.red('✗ Pre-commit check failed!'));
    console.error(pc.red('The following UI files are protected from changes:'));
    forbiddenChanges.forEach(file => console.error(pc.red(`  - ${file}`)));
    console.error('');
    console.error(pc.yellow('To allow UI changes temporarily:'));
    console.error(pc.yellow('1. Set ALLOW_UI_CHANGES=true in your environment'));
    console.error(pc.yellow('2. Run: npm run unlock-ui'));
    console.error(pc.yellow('3. Prefix commit message with "UI-EDIT:"'));
    console.error(pc.yellow('4. After changes, run: npm run baseline'));
    console.error('');
    console.error(pc.cyan('See README-LOCK.md for detailed instructions'));
    
    process.exit(1);
    
  } catch (error) {
    console.error(pc.red('Error in pre-commit guard:'), error.message);
    process.exit(1);
  }
}

main();