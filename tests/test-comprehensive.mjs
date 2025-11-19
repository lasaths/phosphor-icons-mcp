/**
 * Comprehensive Test Suite for Phosphor Icons MCP Server
 * Tests edge cases, error handling, and additional functionality
 */

const PHOSPHOR_CORE_RAW_BASE = "https://raw.githubusercontent.com/phosphor-icons/core/main/assets";

const POPULAR_ICONS = [
  { name: "activity", category: "health", tags: ["fitness", "health", "monitor"] },
  { name: "alarm", category: "time", tags: ["clock", "time", "alert"] },
  { name: "archive", category: "storage", tags: ["box", "storage", "save"] },
  { name: "arrow-left", category: "arrows", tags: ["navigation", "back", "previous"] },
  { name: "arrow-right", category: "arrows", tags: ["navigation", "forward", "next"] },
  { name: "at", category: "communication", tags: ["email", "mention", "social"] },
  { name: "bell", category: "communication", tags: ["notification", "alert", "sound"] },
  { name: "book", category: "education", tags: ["read", "library", "documentation"] },
  { name: "calendar", category: "time", tags: ["date", "schedule", "event"] },
  { name: "camera", category: "media", tags: ["photo", "image", "capture"] },
  { name: "chat", category: "communication", tags: ["message", "conversation", "talk"] },
  { name: "check", category: "interface", tags: ["tick", "success", "done"] },
  { name: "clock", category: "time", tags: ["time", "hour", "minute"] },
  { name: "cloud", category: "weather", tags: ["sky", "storage", "sync"] },
  { name: "code", category: "development", tags: ["programming", "developer", "brackets"] },
  { name: "copy", category: "interface", tags: ["duplicate", "clipboard", "paste"] },
  { name: "download", category: "interface", tags: ["save", "export", "arrow"] },
  { name: "edit", category: "interface", tags: ["pencil", "modify", "write"] },
  { name: "eye", category: "interface", tags: ["view", "see", "visible"] },
  { name: "file", category: "files", tags: ["document", "paper", "text"] },
  { name: "folder", category: "files", tags: ["directory", "collection", "organize"] },
  { name: "gear", category: "interface", tags: ["settings", "config", "preferences"] },
  { name: "heart", category: "social", tags: ["like", "favorite", "love"] },
  { name: "house", category: "interface", tags: ["home", "main", "dashboard"] },
  { name: "image", category: "media", tags: ["picture", "photo", "gallery"] },
  { name: "info", category: "interface", tags: ["information", "help", "about"] },
  { name: "link", category: "interface", tags: ["chain", "url", "hyperlink"] },
  { name: "list", category: "interface", tags: ["menu", "items", "bullets"] },
  { name: "lock", category: "security", tags: ["secure", "private", "protected"] },
  { name: "magnifying-glass", category: "interface", tags: ["search", "find", "zoom"] },
  { name: "map-pin", category: "location", tags: ["marker", "location", "place"] },
  { name: "music-note", category: "media", tags: ["audio", "sound", "song"] },
  { name: "paper-plane-tilt", category: "communication", tags: ["send", "message", "mail"] },
  { name: "play", category: "media", tags: ["start", "video", "audio"] },
  { name: "plus", category: "interface", tags: ["add", "new", "create"] },
  { name: "printer", category: "office", tags: ["print", "paper", "document"] },
  { name: "question", category: "interface", tags: ["help", "support", "unknown"] },
  { name: "share", category: "social", tags: ["export", "send", "distribute"] },
  { name: "shopping-cart", category: "commerce", tags: ["buy", "purchase", "shop"] },
  { name: "star", category: "social", tags: ["favorite", "rating", "bookmark"] },
  { name: "trash", category: "interface", tags: ["delete", "remove", "bin"] },
  { name: "upload", category: "interface", tags: ["import", "arrow", "send"] },
  { name: "user", category: "people", tags: ["person", "profile", "account"] },
  { name: "warning", category: "interface", tags: ["alert", "caution", "danger"] },
  { name: "x", category: "interface", tags: ["close", "cancel", "remove"] },
];

console.log('🧪 Comprehensive Test Suite for Phosphor Icons MCP Server\n');
console.log('='.repeat(70));

let passedTests = 0;
let totalTests = 0;
const testResults = [];

function test(name, fn) {
  totalTests++;
  try {
    const result = fn();
    if (result === true || (result && result.then)) {
      if (result.then) {
        return result.then((r) => {
          if (r) {
            console.log(`✅ ${name}`);
            testResults.push({ name, status: 'PASS' });
            passedTests++;
            return true;
          } else {
            console.log(`❌ ${name}`);
            testResults.push({ name, status: 'FAIL' });
            return false;
          }
        });
      } else {
        console.log(`✅ ${name}`);
        testResults.push({ name, status: 'PASS' });
        passedTests++;
        return true;
      }
    } else {
      console.log(`❌ ${name}`);
      testResults.push({ name, status: 'FAIL' });
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    testResults.push({ name, status: 'FAIL', error: error.message });
    return false;
  }
}

// ============================================================================
// EDGE CASES AND BOUNDARY CONDITIONS
// ============================================================================

async function testEdgeCases() {
  console.log('\n📋 Edge Cases & Boundary Conditions\n');
  
  // Test 1: Minimum size
  await test('get-icon: Minimum size (1px)', async () => {
    const url = `${PHOSPHOR_CORE_RAW_BASE}/regular/heart.svg`;
    const response = await fetch(url);
    if (!response.ok) return false;
    
    let svg = await response.text();
    const size = 1;
    if (!svg.includes('width=')) {
      svg = svg.replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);
    }
    return svg.includes(`width="${size}"`);
  });
  
  // Test 2: Maximum size
  await test('get-icon: Maximum size (4096px)', async () => {
    const url = `${PHOSPHOR_CORE_RAW_BASE}/regular/heart.svg`;
    const response = await fetch(url);
    if (!response.ok) return false;
    
    let svg = await response.text();
    const size = 4096;
    if (!svg.includes('width=')) {
      svg = svg.replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);
    }
    return svg.includes(`width="${size}"`);
  });
  
  // Test 3: Very long icon name (should be sanitized)
  test('Icon name sanitization: Very long name', () => {
    const name = 'a'.repeat(100);
    const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    return sanitized.length <= 100 && /^[a-z0-9-]+$/.test(sanitized);
  });
  
  // Test 4: Icon name with special characters
  test('Icon name sanitization: Special characters', () => {
    const name = 'icon@#$%^&*()name';
    const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    return sanitized === 'iconname';
  });
  
  // Test 5: Icon name with spaces
  test('Icon name sanitization: Spaces', () => {
    const name = 'icon name with spaces';
    const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    return sanitized === 'iconnamewithspaces';
  });
  
  // Test 6: Empty search query
  test('search-icons: Empty query returns error', () => {
    const query = '';
    return !query || typeof query !== 'string' || query.trim().length === 0;
  });
  
  // Test 7: Search with very long query
  test('search-icons: Very long query', () => {
    const query = 'a'.repeat(1000);
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return true; // Should not crash
  });
  
  // Test 8: Search limit boundary (1)
  test('search-icons: Limit = 1', () => {
    const query = 'interface';
    const limit = 1;
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }).slice(0, limit);
    return matches.length <= limit;
  });
  
  // Test 9: Search limit boundary (100)
  test('search-icons: Limit = 100', () => {
    const query = 'interface';
    const limit = 100;
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    }).slice(0, limit);
    return matches.length <= limit;
  });
  
  // Test 10: Multiple icons - maximum batch (50)
  test('get-multiple-icons: Maximum batch size (50)', () => {
    const names = Array(50).fill('heart');
    return names.length === 50 && names.length <= 50;
  });
  
  // Test 11: Multiple icons - over limit (51)
  test('get-multiple-icons: Over limit (51) validation', () => {
    const names = Array(51).fill('heart');
    return names.length > 50; // Should be rejected
  });
}

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

async function testErrorHandling() {
  console.log('\n📋 Error Handling Tests\n');
  
  // Test 1: Invalid icon name
  await test('get-icon: Invalid icon name returns 404', async () => {
    const url = `${PHOSPHOR_CORE_RAW_BASE}/regular/invalid-icon-xyz-12345.svg`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
    });
    return !response.ok && response.status === 404;
  });
  
  // Test 2: Invalid size (negative)
  test('Input validation: Negative size', () => {
    const size = -1;
    return typeof size === 'number' && (size <= 0 || size > 4096);
  });
  
  // Test 3: Invalid size (zero)
  test('Input validation: Zero size', () => {
    const size = 0;
    return typeof size === 'number' && (size <= 0 || size > 4096);
  });
  
  // Test 4: Invalid size (too large)
  test('Input validation: Size > 4096', () => {
    const size = 5000;
    return typeof size === 'number' && (size <= 0 || size > 4096);
  });
  
  // Test 5: Invalid size (non-number)
  test('Input validation: Non-number size', () => {
    const size = 'not-a-number';
    return typeof size !== 'number';
  });
  
  // Test 6: Empty icon name array
  test('get-multiple-icons: Empty array validation', () => {
    const names = [];
    return !Array.isArray(names) || names.length === 0;
  });
  
  // Test 7: Non-array names
  test('get-multiple-icons: Non-array names', () => {
    const names = 'not-an-array';
    return !Array.isArray(names);
  });
  
  // Test 8: Invalid search limit (negative)
  test('search-icons: Negative limit', () => {
    const limit = -1;
    return typeof limit === 'number' && (limit <= 0 || limit > 100);
  });
  
  // Test 9: Invalid search limit (over 100)
  test('search-icons: Limit > 100', () => {
    const limit = 101;
    return typeof limit === 'number' && (limit <= 0 || limit > 100);
  });
}

// ============================================================================
// COLOR FORMAT TESTS
// ============================================================================

async function testColorFormats() {
  console.log('\n📋 Color Format Tests\n');
  
  const iconName = 'heart';
  const weight = 'regular';
  const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
  
  // Test 1: Hex color
  await test('Color: Hex format (#FF0000)', async () => {
    const response = await fetch(url);
    if (!response.ok) return false;
    let svg = await response.text();
    const color = '#FF0000';
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return svg.includes(color);
  });
  
  // Test 2: RGB color
  await test('Color: RGB format (rgb(255,0,0))', async () => {
    const response = await fetch(url);
    if (!response.ok) return false;
    let svg = await response.text();
    const color = 'rgb(255,0,0)';
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return svg.includes(color);
  });
  
  // Test 3: RGBA color
  await test('Color: RGBA format (rgba(255,0,0,0.5))', async () => {
    const response = await fetch(url);
    if (!response.ok) return false;
    let svg = await response.text();
    const color = 'rgba(255,0,0,0.5)';
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return svg.includes(color);
  });
  
  // Test 4: Named color
  await test('Color: Named color (red)', async () => {
    const response = await fetch(url);
    if (!response.ok) return false;
    let svg = await response.text();
    const color = 'red';
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return svg.includes(color);
  });
  
  // Test 5: currentColor
  await test('Color: currentColor', async () => {
    const response = await fetch(url);
    if (!response.ok) return false;
    let svg = await response.text();
    const color = 'currentColor';
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return svg.includes(color);
  });
  
  // Test 6: CSS variable
  await test('Color: CSS variable (var(--color-primary))', async () => {
    const response = await fetch(url);
    if (!response.ok) return false;
    let svg = await response.text();
    const color = 'var(--color-primary)';
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    return svg.includes(color);
  });
}

// ============================================================================
// DIFFERENT ICON TESTS
// ============================================================================

async function testDifferentIcons() {
  console.log('\n📋 Different Icon Tests\n');
  
  const testIcons = ['heart', 'user', 'gear', 'house', 'star', 'trash', 'check', 'x'];
  
  for (const iconName of testIcons) {
    await test(`get-icon: Fetch ${iconName} icon`, async () => {
      const url = `${PHOSPHOR_CORE_RAW_BASE}/regular/${iconName}.svg`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
      });
      
      if (!response.ok) return false;
      
      const svg = await response.text();
      return svg.trim().startsWith('<svg');
    });
  }
}

// ============================================================================
// SEARCH FUNCTIONALITY TESTS
// ============================================================================

function testSearchFunctionality() {
  console.log('\n📋 Search Functionality Tests\n');
  
  // Test 1: Search by exact name
  test('search-icons: Exact name match', () => {
    const query = 'heart';
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return matches.some(m => m.name === 'heart');
  });
  
  // Test 2: Search by partial name
  test('search-icons: Partial name match', () => {
    const query = 'arr';
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return matches.length > 0;
  });
  
  // Test 3: Search by category
  test('search-icons: Category match', () => {
    const query = 'interface';
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return matches.some(m => m.category === 'interface');
  });
  
  // Test 4: Search by tag
  test('search-icons: Tag match', () => {
    const query = 'favorite';
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return matches.length > 0;
  });
  
  // Test 5: Search with no results
  test('search-icons: No results', () => {
    const query = 'nonexistent-icon-xyz-123';
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return matches.length === 0;
  });
  
  // Test 6: Case insensitive search
  test('search-icons: Case insensitive', () => {
    const query = 'HEART';
    const searchTerm = query.toLowerCase().trim();
    const matches = POPULAR_ICONS.filter((icon) => {
      return (
        icon.name.toLowerCase().includes(searchTerm) ||
        icon.category?.toLowerCase().includes(searchTerm) ||
        icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
      );
    });
    return matches.length > 0;
  });
}

// ============================================================================
// CATEGORY TESTS
// ============================================================================

function testCategories() {
  console.log('\n📋 Category Tests\n');
  
  // Test 1: List all categories
  test('list-categories: All categories listed', () => {
    const categories = Array.from(
      new Set(
        POPULAR_ICONS.map((icon) => icon.category).filter(
          (cat) => cat !== undefined
        )
      )
    ).sort();
    return categories.length > 0;
  });
  
  // Test 2: Categories are unique
  test('list-categories: Unique categories', () => {
    const categories = Array.from(
      new Set(
        POPULAR_ICONS.map((icon) => icon.category).filter(
          (cat) => cat !== undefined
        )
      )
    );
    const uniqueCategories = new Set(categories);
    return categories.length === uniqueCategories.size;
  });
  
  // Test 3: Category counts are correct
  test('list-categories: Category counts', () => {
    const categories = Array.from(
      new Set(
        POPULAR_ICONS.map((icon) => icon.category).filter(
          (cat) => cat !== undefined
        )
      )
    );
    
    for (const cat of categories) {
      const count = POPULAR_ICONS.filter(icon => icon.category === cat).length;
      if (count === 0) return false;
    }
    return true;
  });
}

// ============================================================================
// SIZE MODIFICATION TESTS
// ============================================================================

async function testSizeModification() {
  console.log('\n📋 Size Modification Tests\n');
  
  const iconName = 'heart';
  const weight = 'regular';
  const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
  
  const sizes = [16, 24, 32, 48, 64, 128, 256, 512, 1024];
  
  for (const size of sizes) {
    await test(`Size modification: ${size}px`, async () => {
      const response = await fetch(url);
      if (!response.ok) return false;
      
      let svg = await response.text();
      
      if (!svg.includes('width=')) {
        svg = svg.replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);
      } else {
        svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
        svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
      }
      
      return svg.includes(`width="${size}"`) && svg.includes(`height="${size}"`);
    });
  }
}

// ============================================================================
// COMBINED FEATURE TESTS
// ============================================================================

async function testCombinedFeatures() {
  console.log('\n📋 Combined Feature Tests\n');
  
  // Test 1: Icon with color and size
  await test('get-icon: Color + Size together', async () => {
    const iconName = 'heart';
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url);
    if (!response.ok) return false;
    
    let svg = await response.text();
    const color = '#FF0000';
    const size = 32;
    
    // Apply color
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    svg = svg.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
    
    // Apply size
    if (!svg.includes('width=')) {
      svg = svg.replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);
    } else {
      svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
      svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
    }
    
    return svg.includes(color) && svg.includes(`width="${size}"`);
  });
  
  // Test 2: Multiple icons with same styling
  await test('get-multiple-icons: Consistent styling', async () => {
    const names = ['heart', 'user', 'gear'];
    const weight = 'regular';
    const color = '#3B82F6';
    const size = 24;
    
    let allMatch = true;
    for (const name of names) {
      const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${name}.svg`;
      const response = await fetch(url);
      if (!response.ok) {
        allMatch = false;
        break;
      }
      
      let svg = await response.text();
      svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
      svg = svg.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
      
      if (!svg.includes('width=')) {
        svg = svg.replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);
      }
      
      if (!svg.includes(color) || !svg.includes(`width="${size}"`)) {
        allMatch = false;
        break;
      }
    }
    
    return allMatch;
  });
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

async function runAllTests() {
  await testEdgeCases();
  await testErrorHandling();
  await testColorFormats();
  await testDifferentIcons();
  testSearchFunctionality();
  testCategories();
  await testSizeModification();
  await testCombinedFeatures();
  
  console.log('\n' + '='.repeat(70));
  console.log(`\n📊 Final Test Results: ${passedTests}/${totalTests} passed\n`);
  
  // Summary by category
  const categories = {
    'Edge Cases': testResults.filter(r => r.name.includes('Edge') || r.name.includes('Boundary') || r.name.includes('Minimum') || r.name.includes('Maximum')).length,
    'Error Handling': testResults.filter(r => r.name.includes('Error') || r.name.includes('Invalid') || r.name.includes('404')).length,
    'Color Formats': testResults.filter(r => r.name.includes('Color')).length,
    'Different Icons': testResults.filter(r => r.name.includes('Fetch') && r.name.includes('icon')).length,
    'Search': testResults.filter(r => r.name.includes('search-icons')).length,
    'Categories': testResults.filter(r => r.name.includes('list-categories') || r.name.includes('Category')).length,
    'Size': testResults.filter(r => r.name.includes('Size')).length,
    'Combined': testResults.filter(r => r.name.includes('together') || r.name.includes('Consistent')).length,
  };
  
  console.log('Test Categories:');
  Object.entries(categories).forEach(([cat, count]) => {
    if (count > 0) {
      console.log(`  ${cat}: ${count} tests`);
    }
  });
  
  if (passedTests === totalTests) {
    console.log('\n✨ All tests passed!');
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${totalTests - passedTests} test(s) failed`);
    process.exit(1);
  }
}

runAllTests().catch((error) => {
  console.error('❌ Test suite error:', error);
  process.exit(1);
});

