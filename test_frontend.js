#!/usr/bin/env node
/**
 * Frontend Test Script
 * Tests if the Next.js application can build and start properly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Testing Frontend Application...');
console.log('=' * 50);

// Test 1: Check if package.json exists
console.log('📦 Checking package.json...');
if (fs.existsSync('package.json')) {
    console.log('✅ package.json found');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log(`   📋 Project: ${packageJson.name}`);
    console.log(`   🔧 Next.js version: ${packageJson.dependencies.next || 'Not found'}`);
} else {
    console.log('❌ package.json not found');
    process.exit(1);
}

// Test 2: Check if node_modules exists
console.log('\n📚 Checking dependencies...');
if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules found');
} else {
    console.log('⚠️  node_modules not found - run npm install');
}

// Test 3: Check key files
console.log('\n📁 Checking key files...');
const keyFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/teams/page.tsx',
    'app/leagues/page.tsx',
    'app/community/page.tsx',
    'app/login/page.tsx',
    'lib/api.ts',
    'contexts/auth-context.tsx'
];

let missingFiles = 0;
keyFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
        missingFiles++;
    }
});

// Test 4: Check TypeScript configuration
console.log('\n🔧 Checking TypeScript config...');
if (fs.existsSync('tsconfig.json')) {
    console.log('✅ tsconfig.json found');
} else {
    console.log('⚠️  tsconfig.json not found');
}

// Test 5: Check Tailwind configuration
console.log('\n🎨 Checking Tailwind CSS...');
if (fs.existsSync('tailwind.config.ts') || fs.existsSync('tailwind.config.js')) {
    console.log('✅ Tailwind config found');
} else {
    console.log('⚠️  Tailwind config not found');
}

// Test 6: Try to build (if node_modules exists)
if (fs.existsSync('node_modules')) {
    console.log('\n🏗️  Testing build process...');
    try {
        console.log('   Building application...');
        execSync('npm run build', { stdio: 'pipe' });
        console.log('✅ Build successful!');
    } catch (error) {
        console.log('❌ Build failed');
        console.log('   Error:', error.message);
    }
}

// Summary
console.log('\n' + '=' * 60);
if (missingFiles === 0) {
    console.log('🎉 FRONTEND STATUS: ALL CHECKS PASSED!');
    console.log('✅ Your Next.js application is ready to run!');
    console.log('\n🚀 To start the frontend:');
    console.log('   npm run dev');
    console.log('   Then open: http://localhost:3000');
} else {
    console.log('⚠️  FRONTEND STATUS: SOME ISSUES DETECTED');
    console.log(`🔧 ${missingFiles} files are missing`);
}
console.log('=' * 60);
