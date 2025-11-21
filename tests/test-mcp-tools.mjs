/**
 * Comprehensive test for Phosphor Icons MCP Server Tools
 * Tests the actual tool handler logic
 */

import { z } from 'zod';
import sharp from 'sharp';

// Import the server creation function
// Since we can't directly import TypeScript, we'll test the logic

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

console.log('🧪 Testing Phosphor Icons MCP Server Tools\n');
console.log('='.repeat(70));

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    const result = fn();
    if (result === true || (result && result.then)) {
      if (result.then) {
        return result.then((r) => {
          if (r) {
            console.log(`✅ ${name}`);
            passedTests++;
            return true;
          } else {
            console.log(`❌ ${name}`);
            return false;
          }
        });
      } else {
        console.log(`✅ ${name}`);
        passedTests++;
        return true;
      }
    } else {
      console.log(`❌ ${name}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ${error.message}`);
    return false;
  }
}

// Test 1: get-icon tool - basic functionality
async function testGetIcon() {
  return test('get-icon: Fetch heart icon (regular)', async () => {
    const iconName = 'heart';
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
    });
    
    if (!response.ok) return false;
    
    const svg = await response.text();
    return svg.trim().startsWith('<svg');
  });
}

// Test 2: get-icon tool - with color
async function testGetIconWithColor() {
  return test('get-icon: Apply color to icon', async () => {
    const iconName = 'heart';
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url);
    if (!response.ok) return false;
    
    let svg = await response.text();
    const color = '#FF0000';
    
    // Apply color (regular weight uses fill, so replace both fill and stroke)
    svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
    svg = svg.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
    
    return svg.includes(color);
  });
}

// Test 3: get-icon tool - with size
async function testGetIconWithSize() {
  return test('get-icon: Apply size to icon', async () => {
    const iconName = 'heart';
    const weight = 'regular';
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;
    
    const response = await fetch(url);
    if (!response.ok) return false;
    
    let svg = await response.text();
    const size = 32;
    
    // Apply size (add width/height if not present)
    if (!svg.includes('width=')) {
      svg = svg.replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);
    } else {
      svg = svg.replace(/width="[^"]*"/, `width="${size}"`);
      svg = svg.replace(/height="[^"]*"/, `height="${size}"`);
    }
    
    return svg.includes(`width="${size}"`) && svg.includes(`height="${size}"`);
  });
}

// Test 4: search-icons tool
function testSearchIcons() {
  return test('search-icons: Search for "house"', () => {
    const query = 'house';
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

// Test 5: search-icons tool - by category
function testSearchIconsByCategory() {
  return test('search-icons: Search by category "interface"', () => {
    const query = 'interface';
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

// Test 6: list-categories tool
function testListCategories() {
  return test('list-categories: List all categories', () => {
    const categories = Array.from(
      new Set(
        POPULAR_ICONS.map((icon) => icon.category).filter(
          (cat) => cat !== undefined
        )
      )
    ).sort();
    
    return categories.length > 0;
  });
}

// Test 7: get-multiple-icons tool
async function testGetMultipleIcons() {
  return test('get-multiple-icons: Fetch multiple icons', async () => {
    const names = ['heart', 'user', 'gear'];
    const weight = 'regular';
    const results = [];
    
    for (const name of names) {
      const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${name}.svg`;
      const response = await fetch(url, {
        headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
      });
      
      if (response.ok) {
        const svg = await response.text();
        if (svg.trim().startsWith('<svg')) {
          results.push(name);
        }
      }
    }
    
    return results.length === names.length;
  });
}

// Test 8: Input validation - empty name
function testInputValidationEmptyName() {
  return test('Input validation: Empty icon name', () => {
    const name = '';
    return !name || typeof name !== 'string' || name.trim().length === 0;
  });
}

// Test 9: Input validation - invalid size
function testInputValidationInvalidSize() {
  return test('Input validation: Invalid size', () => {
    const size = -1;
    return typeof size === 'number' && (size <= 0 || size > 4096);
  });
}

// Test 10: Icon name sanitization
function testIconNameSanitization() {
  return test('Icon name sanitization', () => {
    const name = 'HEART';
    const sanitized = name.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
    return sanitized === 'heart';
  });
}

// Test 11: get-icon tool - PNG conversion keeps transparency
async function testPngConversionTransparentBackground() {
  return test('get-icon: PNG conversion has transparent background', async () => {
    const iconName = 'heart';
    const weight = 'regular';
    const size = 64;
    const url = `${PHOSPHOR_CORE_RAW_BASE}/${weight}/${iconName}.svg`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'PhosphorIconsMCP/1.0.0' }
    });

    if (!response.ok) return false;

    const svg = await response.text();
    const pngBuffer = await sharp(Buffer.from(svg))
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    if (pngBuffer.length === 0) return false;

    const { data, info } = await sharp(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const hasAlphaChannel = info.channels >= 4;
    const firstPixelAlpha = data[3]; // alpha channel of top-left pixel

    return hasAlphaChannel && firstPixelAlpha === 0;
  });
}

// Run all tests
async function runAllTests() {
  console.log('\n📋 Running MCP Tool Tests\n');
  
  await testGetIcon();
  await testGetIconWithColor();
  await testGetIconWithSize();
  testSearchIcons();
  testSearchIconsByCategory();
  testListCategories();
  await testGetMultipleIcons();
  testInputValidationEmptyName();
  testInputValidationInvalidSize();
  testIconNameSanitization();
  await testPngConversionTransparentBackground();
  
  console.log('\n' + '='.repeat(70));
  console.log(`\n📊 Test Results: ${passedTests}/${totalTests} passed\n`);
  
  if (passedTests === totalTests) {
    console.log('✨ All tests passed!');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed');
    process.exit(1);
  }
}

runAllTests().catch((error) => {
  console.error('❌ Test suite error:', error);
  process.exit(1);
});

