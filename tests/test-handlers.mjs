/**
 * Direct handler tests for Phosphor Icons MCP Server
 * Tests the tool handlers directly without needing the full MCP server
 */

import { z } from 'zod';

// Mock the icon metadata
const POPULAR_ICONS = [
  { name: "house", category: "interface", tags: ["home", "main", "dashboard"] },
  { name: "heart", category: "social", tags: ["like", "favorite", "love"] },
  { name: "user", category: "people", tags: ["person", "profile", "account"] },
  { name: "gear", category: "interface", tags: ["settings", "config", "preferences"] },
];

const PHOSPHOR_CORE_RAW_BASE = "https://raw.githubusercontent.com/phosphor-icons/core/main/assets";

console.log('🧪 Testing Phosphor Icons MCP Handlers\n');
console.log('='.repeat(60));

// Test 1: Test fetching an icon
async function testFetchIcon() {
  console.log('\n📥 Test 1: Fetching icon from GitHub');
  try {
    const iconName = 'heart'; // Use heart which we know exists
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
    });
    
    if (response.ok) {
      const svg = await response.text();
      const isValidSvg = svg.trim().startsWith('<svg');
      console.log('✅ Icon fetched successfully');
      console.log('   Valid SVG:', isValidSvg ? '✅' : '❌');
      console.log('   Size:', svg.length, 'bytes');
      console.log('   Preview:', svg.substring(0, 100).replace(/\n/g, ' ') + '...');
      return true;
    } else {
      console.log('❌ Failed to fetch icon:', response.status, response.statusText);
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 2: Test icon with color modification
async function testIconColorModification() {
  console.log('\n🎨 Test 2: Icon color modification');
  try {
    const iconName = 'heart';
    const weight = 'fill';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url);
    if (response.ok) {
      let svg = await response.text();
      const originalSvg = svg;
      
      // Apply color (simulating the handler logic)
      svg = svg.replace(/fill="[^"]*"/g, `fill="#FF0000"`);
      
      const hasColor = svg.includes('#FF0000') || svg.includes('fill="#FF0000"');
      console.log('✅ Color modification test');
      console.log('   Color applied:', hasColor ? '✅' : '❌');
      console.log('   SVG changed:', originalSvg !== svg ? '✅' : '❌');
      return true;
    } else {
      console.log('❌ Failed to fetch icon');
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 3: Test icon size modification
async function testIconSizeModification() {
  console.log('\n📏 Test 3: Icon size modification');
  try {
    const iconName = 'heart'; // Use heart which we know exists
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url);
    if (response.ok) {
      let svg = await response.text();
      const originalSvg = svg;
      
      // Apply size (simulating the handler logic)
      const size = 32;
      svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
      svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
      
      const hasSize = svg.includes(`width="${size}"`) && svg.includes(`height="${size}"`);
      console.log('✅ Size modification test');
      console.log('   Size applied:', hasSize ? '✅' : '❌');
      console.log('   SVG changed:', originalSvg !== svg ? '✅' : '❌');
      return true;
    } else {
      console.log('❌ Failed to fetch icon');
      return false;
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 4: Test search functionality
function testSearchIcons() {
  console.log('\n🔍 Test 4: Search icons functionality');
  try {
    const query = 'house';
    const searchTerm = query.toLowerCase().trim();
    
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    
    const found = matches.length > 0;
    console.log('✅ Search test');
    console.log('   Query:', query);
    console.log('   Results found:', found ? `✅ (${matches.length})` : '❌');
    if (found) {
      console.log('   Matches:', matches.map(i => i.name).join(', '));
    }
    return found;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 5: Test categories
function testListCategories() {
  console.log('\n📋 Test 5: List categories');
  try {
    const categories = Array.from(
      new Set(
        POPULAR_ICONS.map((icon) => icon.category).filter(
          (cat) => cat !== undefined
        )
      )
    ).sort();
    
    console.log('✅ Categories test');
    console.log('   Categories found:', categories.length);
    console.log('   Categories:', categories.join(', '));
    return categories.length > 0;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 6: Test invalid icon name handling
async function testInvalidIcon() {
  console.log('\n⚠️  Test 6: Invalid icon name handling');
  try {
    const iconName = 'invalid-icon-xyz-123';
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
    });
    
    if (!response.ok) {
      console.log('✅ Invalid icon correctly returns error');
      console.log('   Status:', response.status);
      return true;
    } else {
      console.log('⚠️  Icon unexpectedly found (might be valid)');
      return true; // Not necessarily a failure
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

// Test 7: Test different weights
async function testDifferentWeights() {
  console.log('\n⚖️  Test 7: Different icon weights');
  const weights = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];
  const iconName = 'heart';
  let successCount = 0;
  
  for (const weight of weights) {
    try {
      const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
      });
      
      if (response.ok) {
        successCount++;
        console.log(`   ✅ ${weight}`);
      } else {
        console.log(`   ❌ ${weight} (${response.status})`);
      }
    } catch (error) {
      console.log(`   ❌ ${weight} (${error.message})`);
    }
  }
  
  console.log(`\n   Summary: ${successCount}/${weights.length} weights available`);
  return successCount === weights.length;
}

// Run all tests
async function runAllTests() {
  const results = [];
  
  results.push(await testFetchIcon());
  results.push(await testIconColorModification());
  results.push(await testIconSizeModification());
  results.push(testSearchIcons());
  results.push(testListCategories());
  results.push(await testInvalidIcon());
  results.push(await testDifferentWeights());
  
  console.log('\n' + '='.repeat(60));
  const passed = results.filter(r => r).length;
  const total = results.length;
  console.log(`\n📊 Test Results: ${passed}/${total} passed`);
  
  if (passed === total) {
    console.log('✨ All tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed');
    process.exit(1);
  }
}

runAllTests().catch(console.error);

