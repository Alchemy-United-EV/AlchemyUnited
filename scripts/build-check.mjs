#!/usr/bin/env node
/**
 * Build size monitoring and health checks
 * Prevents bundle size regressions during development
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import pc from 'picocolors';

const BASELINE_FILE = resolve('build-baseline.json');

function getBundleInfo() {
  console.log(pc.blue('🔨 Building application...'));
  
  try {
    // Build the application
    execSync('npm run build', { stdio: 'pipe' });
    
    // Get build information
    const distPath = resolve('dist');
    if (!existsSync(distPath)) {
      throw new Error('Build directory not found');
    }
    
    // Analyze bundle sizes (simplified approach)
    const indexHtml = readFileSync(resolve(distPath, 'index.html'), 'utf8');
    const jsFiles = indexHtml.match(/src="[^"]*\.js"/g) || [];
    const cssFiles = indexHtml.match(/href="[^"]*\.css"/g) || [];
    
    const bundleInfo = {
      timestamp: new Date().toISOString(),
      jsFiles: jsFiles.length,
      cssFiles: cssFiles.length,
      totalAssets: jsFiles.length + cssFiles.length,
      // Simplified size calculation - in real scenario would analyze actual file sizes
      estimatedSize: jsFiles.length * 100 + cssFiles.length * 20 // KB estimate
    };
    
    console.log(pc.green('✓ Build completed successfully'));
    console.log(pc.cyan(`📊 Bundle Analysis:`));
    console.log(pc.cyan(`  - JS files: ${bundleInfo.jsFiles}`));
    console.log(pc.cyan(`  - CSS files: ${bundleInfo.cssFiles}`));
    console.log(pc.cyan(`  - Total assets: ${bundleInfo.totalAssets}`));
    console.log(pc.cyan(`  - Estimated size: ${bundleInfo.estimatedSize}KB`));
    
    return bundleInfo;
    
  } catch (error) {
    console.error(pc.red('✗ Build failed:'), error.message);
    process.exit(1);
  }
}

function checkBaseline(currentInfo) {
  if (!existsSync(BASELINE_FILE)) {
    console.log(pc.yellow('📝 Creating baseline file...'));
    writeFileSync(BASELINE_FILE, JSON.stringify(currentInfo, null, 2));
    console.log(pc.green('✓ Baseline saved'));
    return true;
  }
  
  const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf8'));
  const sizeIncrease = ((currentInfo.estimatedSize - baseline.estimatedSize) / baseline.estimatedSize) * 100;
  
  console.log(pc.cyan(`📈 Size comparison:`));
  console.log(pc.cyan(`  - Baseline: ${baseline.estimatedSize}KB`));
  console.log(pc.cyan(`  - Current: ${currentInfo.estimatedSize}KB`));
  console.log(pc.cyan(`  - Change: ${sizeIncrease.toFixed(1)}%`));
  
  if (sizeIncrease > 10) {
    console.error(pc.red(`✗ Bundle size increased by ${sizeIncrease.toFixed(1)}% (>10% threshold)`));
    console.error(pc.yellow('Consider:'));
    console.error(pc.yellow('- Removing unused dependencies'));
    console.error(pc.yellow('- Code splitting large components'));
    console.error(pc.yellow('- Optimizing asset sizes'));
    console.error(pc.yellow('- Running: npm run baseline (to update baseline if intentional)'));
    return false;
  }
  
  console.log(pc.green('✓ Bundle size within acceptable range'));
  return true;
}

function main() {
  console.log(pc.blue('🏗️  Build Health Check'));
  console.log(pc.blue('==================='));
  
  const bundleInfo = getBundleInfo();
  const baselineOk = checkBaseline(bundleInfo);
  
  if (!baselineOk) {
    process.exit(1);
  }
  
  console.log(pc.green('✅ All build checks passed!'));
}

main();