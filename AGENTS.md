# Phosphor Icons MCP Server

A Model Context Protocol (MCP) server that provides seamless access to [Phosphor Icons](https://phosphoricons.com) - a flexible icon family with 6 different weights and 1,400+ beautiful icons.

## Overview

This MCP server enables AI applications to retrieve and customize Phosphor Icons with multiple weights, colors, and sizes. Perfect for developers building UI components, design systems, or any application requiring high-quality iconography.

## Features

- 🎨 **6 Icon Weights**: thin, light, regular, bold, fill, and duotone
- 🌈 **Color Customization**: Apply colors using hex, RGB, named colors, or CSS variables
- 📏 **Size Control**: Specify custom sizes in pixels
- 🔍 **Smart Search**: Find icons by name, category, or tags
- 📦 **Batch Operations**: Retrieve multiple icons at once
- 📚 **Comprehensive Catalog**: Browse all available icons with metadata
- 🛠️ **Framework Guides**: Get implementation help for React, Vue, HTML, and more

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The server starts on `http://localhost:8081` with the Smithery playground.

### Production

Deploy to Smithery:
1. Push code to GitHub
2. Visit https://smithery.ai/new
3. Connect your repository
4. Automatic deployments on push to main

## Tools

### get-icon

Retrieve a single SVG icon with customization options.

**Parameters:**
- `name` (string, required): Icon name in kebab-case (e.g., 'arrow-left', 'heart')
- `weight` (optional): Icon weight - thin, light, regular (default), bold, fill, duotone
- `color` (optional): Icon color - hex (#FF0000), RGB, named colors, or currentColor
- `size` (optional): Icon size in pixels (default: 256)

**Example:**
```javascript
get-icon({ 
  name: "heart", 
  weight: "bold", 
  color: "#FF0000",
  size: 32
})
```

### search-icons

Search for icons by name, category, or tags.

**Parameters:**
- `query` (string, required): Search term
- `limit` (optional): Maximum results (default: 10)

**Example:**
```javascript
search-icons({ query: "arrow", limit: 5 })
```

### list-categories

Get a list of all available icon categories.

**Example:**
```javascript
list-categories()
```

### get-multiple-icons

Retrieve multiple icons at once with consistent styling.

**Parameters:**
- `names` (array, required): Array of icon names in kebab-case
- `weight` (optional): Weight applied to all icons
- `color` (optional): Color applied to all icons
- `size` (optional): Size applied to all icons

**Example:**
```javascript
get-multiple-icons({ 
  names: ["home", "user", "gear"],
  weight: "regular",
  color: "#3B82F6",
  size: 24
})
```

## Resources

### phosphor://catalog

Complete catalog of popular Phosphor Icons including:
- Icon names and metadata
- Available categories
- Associated tags
- All supported weights

**Usage:**
```javascript
// Access via MCP resource URI
resource: "phosphor://catalog"
```

### phosphor://weights

Detailed information about the 6 available icon weights:
- Thin: Delicate, minimal strokes
- Light: Subtle, refined appearance
- Regular: Balanced, versatile (default)
- Bold: Strong, impactful presence
- Fill: Solid, filled shapes
- Duotone: Two-tone design with depth

**Usage:**
```javascript
// Access via MCP resource URI
resource: "phosphor://weights"
```

## Prompts

### implement-icon

Get framework-specific guidance for implementing a Phosphor icon in your project.

**Parameters:**
- `iconName` (string, required): Name of the icon
- `framework` (optional): Target framework - html, react (default), vue, svelte, angular

**Example:**
```javascript
implement-icon({ 
  iconName: "heart",
  framework: "react"
})
```

## Configuration

The server supports optional configuration:

- **defaultWeight**: Set the default icon weight (default: "regular")

Configure via URL parameters when connecting:
```
http://localhost:8081/mcp?defaultWeight=bold
```

## Color Customization

Icons support multiple color formats:

### Hex Colors
```javascript
color: "#FF0000"      // Red
color: "#3B82F6"      // Blue
color: "#10B981"      // Green
```

### RGB/RGBA
```javascript
color: "rgb(255, 0, 0)"
color: "rgba(59, 130, 246, 0.8)"   // With opacity
```

### Named Colors
```javascript
color: "red"
color: "blue"
color: "currentColor"  // Inherits from CSS
```

### Weight-Specific Behavior
- **Fill weight**: Color applies to fill attribute
- **Stroke weights** (thin, light, regular, bold): Color applies to stroke
- **Duotone**: Color applies to both fill and stroke

See `COLOR_GUIDE.md` for comprehensive color examples.

## Use Cases

### Brand Identity
```javascript
// Apply exact brand colors
get-icon({ name: "logo", color: "#6366F1", size: 32 })
```

### UI States
```javascript
// Success state
get-icon({ name: "check", weight: "fill", color: "#10B981" })

// Error state
get-icon({ name: "x", weight: "fill", color: "#EF4444" })

// Warning state
get-icon({ name: "warning", weight: "fill", color: "#F59E0B" })
```

### Navigation
```javascript
// Consistent navigation icons
get-multiple-icons({ 
  names: ["house", "magnifying-glass", "user", "gear"],
  weight: "regular",
  color: "#3B82F6",
  size: 24
})
```

### Social Media
```javascript
// Brand-colored social icons
get-icon({ name: "github-logo", color: "#181717" })
get-icon({ name: "twitter-logo", color: "#1DA1F2" })
get-icon({ name: "linkedin-logo", color: "#0A66C2" })
```

## Project Structure

```
phosphor-icons-mcp/
├── src/
│   └── index.ts          # Main server implementation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── smithery.yaml         # Smithery runtime config
├── README.md             # Main documentation
├── COLOR_GUIDE.md        # Color customization guide
└── .gitignore           # Git ignore rules
```

## Technical Details

### Architecture
- **Runtime**: TypeScript with ESM modules
- **Target**: Remote (Smithery-hosted)
- **State**: Stateless for optimal performance
- **Protocol**: MCP (Model Context Protocol)

### Icon Source
Icons are fetched from the official Phosphor Icons GitHub repository:
```
https://github.com/phosphor-icons/core
```

SVG files are retrieved directly from:
```
https://raw.githubusercontent.com/phosphor-icons/core/main/assets/{weight}/{name}.svg
```

### Icon Catalog
The server includes metadata for 45+ popular icons with categories and tags for easy discovery. The full Phosphor Icons library contains 1,400+ icons.

## Best Practices

### 1. Use Semantic Names
```javascript
// Good
get-icon({ name: "trash" })
get-icon({ name: "magnifying-glass" })

// Icon names are in kebab-case
```

### 2. Choose Appropriate Weights
- **UI elements**: regular, light
- **Emphasis**: bold
- **Large displays**: thin
- **Solid fills**: fill
- **Visual interest**: duotone

### 3. Color for Meaning
```javascript
// Use colors semantically
success: "#10B981"  // Green
error: "#EF4444"    // Red
warning: "#F59E0B"  // Amber
info: "#3B82F6"     // Blue
```

### 4. Consistent Sizing
```javascript
// Define size standards
small: 16
medium: 24
large: 32
xl: 48
```

### 5. Batch When Possible
```javascript
// More efficient than individual calls
get-multiple-icons({ 
  names: ["icon1", "icon2", "icon3"],
  weight: "regular",
  color: "#3B82F6"
})
```

## Troubleshooting

### Icon Not Found
- Verify icon name is in kebab-case
- Check the catalog: `phosphor://catalog`
- Search for alternatives: `search-icons({ query: "your-term" })`

### Color Not Applied
- Check weight-specific behavior (fill vs stroke)
- Verify color format is valid
- Try currentColor for CSS inheritance

### Size Issues
- Size applies to both width and height
- Default is 256px (original SVG size)
- Use powers of 2 for crisp rendering: 16, 24, 32, 48, 64

## Contributing

This is an MCP server wrapper for Phosphor Icons. For:
- **Icon requests**: Visit https://github.com/phosphor-icons/core
- **Server issues**: Create issue in this repository
- **Feature requests**: Welcome via pull requests

## License

This MCP server is MIT licensed.

Phosphor Icons are also MIT licensed by Tobias Fried.

## Resources & Links

- 🌐 **Phosphor Icons Website**: https://phosphoricons.com
- 💻 **Phosphor Core GitHub**: https://github.com/phosphor-icons/core
- 📖 **Smithery Documentation**: https://smithery.ai/docs
- 🔧 **MCP Protocol**: https://modelcontextprotocol.io
- 🎨 **Color Guide**: See `COLOR_GUIDE.md` in this repository

## Credits

**Phosphor Icons** created by Tobias Fried and contributors.

**MCP Server** built with the Smithery SDK.

---

**Version**: 1.0.0  
**Last Updated**: November 2024  
**MCP Protocol**: 2024-11-05
