#!/usr/bin/env node

/**
 * X402 Implementation Verification Script
 * Verifies that all required components for the x402 payment flow are in place
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'lib/x402-axios.ts',
  'lib/wagmi-config.ts', 
  'lib/hooks/useX402Payment.ts',
  'components/features/X402TestSuite.tsx',
  'docs/X402_IMPLEMENTATION.md'
];

const REQUIRED_DEPENDENCIES = [
  'wagmi',
  'viem',
  '@wagmi/core',
  'axios',
  'ethers',
  '@tanstack/react-query'
];

function checkFiles() {
  console.log('🔍 Checking required files...\n');
  
  let allFilesExist = true;
  
  for (const file of REQUIRED_FILES) {
    const filePath = path.join(__dirname, '..', file);
    const exists = fs.existsSync(filePath);
    
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    
    if (!exists) {
      allFilesExist = false;
    }
  }
  
  return allFilesExist;
}

function checkDependencies() {
  console.log('\n📦 Checking required dependencies...\n');
  
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ package.json not found');
    return false;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  let allDepsInstalled = true;
  
  for (const dep of REQUIRED_DEPENDENCIES) {
    const installed = dependencies[dep] !== undefined;
    console.log(`${installed ? '✅' : '❌'} ${dep} ${installed ? `(${dependencies[dep]})` : ''}`);
    
    if (!installed) {
      allDepsInstalled = false;
    }
  }
  
  return allDepsInstalled;
}

function checkImplementation() {
  console.log('\n⚙️ Checking implementation details...\n');
  
  const checks = [
    {
      name: 'X402Axios class implementation',
      file: 'lib/x402-axios.ts',
      check: (content) => content.includes('class X402Axios') && content.includes('processPayment')
    },
    {
      name: 'Wagmi configuration',
      file: 'lib/wagmi-config.ts',
      check: (content) => content.includes('createConfig') && content.includes('base')
    },
    {
      name: 'useX402Payment hook',
      file: 'lib/hooks/useX402Payment.ts',
      check: (content) => content.includes('useWalletClient') && content.includes('sendUSDCPayment')
    },
    {
      name: 'USDC Base address',
      file: 'lib/wagmi-config.ts',
      check: (content) => content.includes('0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913')
    },
    {
      name: 'WalletConnection integration',
      file: 'components/features/WalletConnection.tsx',
      check: (content) => content.includes('useWalletClient') && content.includes('x402Client')
    }
  ];
  
  let allChecksPass = true;
  
  for (const check of checks) {
    const filePath = path.join(__dirname, '..', check.file);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const passes = check.check(content);
      console.log(`${passes ? '✅' : '❌'} ${check.name}`);
      
      if (!passes) {
        allChecksPass = false;
      }
    } else {
      console.log(`❌ ${check.name} (file not found)`);
      allChecksPass = false;
    }
  }
  
  return allChecksPass;
}

function main() {
  console.log('🚀 X402 Payment Flow Implementation Verification\n');
  console.log('=' .repeat(50));
  
  const filesOk = checkFiles();
  const depsOk = checkDependencies();
  const implOk = checkImplementation();
  
  console.log('\n' + '=' .repeat(50));
  console.log('\n📋 VERIFICATION SUMMARY\n');
  
  console.log(`Files: ${filesOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Dependencies: ${depsOk ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Implementation: ${implOk ? '✅ PASS' : '❌ FAIL'}`);
  
  const overallPass = filesOk && depsOk && implOk;
  console.log(`\nOverall: ${overallPass ? '✅ PASS' : '❌ FAIL'}`);
  
  if (overallPass) {
    console.log('\n🎉 X402 payment flow implementation is complete and ready for testing!');
    console.log('\nNext steps:');
    console.log('1. Start the development server: npm run dev');
    console.log('2. Navigate to the X402 Test tab');
    console.log('3. Connect your wallet and run tests');
  } else {
    console.log('\n⚠️  Some requirements are missing. Please review the failed checks above.');
  }
  
  process.exit(overallPass ? 0 : 1);
}

if (require.main === module) {
  main();
}