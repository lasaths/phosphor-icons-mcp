# Phosphor Icons MCP Server

A Model Context Protocol (MCP) server that provides access to [Phosphor Icons](https://phosphoricons.com) - a flexible icon family with 6 different weights and over 1,000+ icons.

> **Important**: This is a **community-driven, AI-assisted** MCP server and is **not an official repository** or affiliated with the Phosphor Icons project. This project was created with AI assistance and is maintained by the community. The original Phosphor Icons project can be found at [https://github.com/phosphor-icons](https://github.com/phosphor-icons).

## Features

- 🎨 **6 Icon Weights**: thin, light, regular, bold, fill, and duotone
- 🌈 **Color Customization**: Apply any color (hex, RGB, named colors, or currentColor)
- 📏 **Size Control**: Specify custom sizes in pixels
- 🔍 **Search Icons**: Find icons by name, category, or tags
- 📦 **Batch Operations**: Get multiple icons at once
- 📚 **Catalog Access**: Browse all available icons with metadata
- 🛠️ **Implementation Guides**: Get framework-specific integration help

## Installation

```bash
npm install
```

## Development

Run the development server:

```bash
npm run dev
```

This will start the server on port 8081 and open the Smithery playground for testing.

## Configuration

The server supports an optional configuration parameter:

- **defaultWeight**: Set the default icon weight (thin, light, regular, bold, fill, duotone). Default: `regular`

## Tools

### get-icon
Retrieve a single SVG icon with specified weight, color, and size.

**Parameters:**
- `name` (string): Icon name in kebab-case (e.g., 'arrow-left', 'user')
- `weight` (optional): Icon weight/style
- `color` (optional): Icon color - accepts hex (#FF0000), RGB (rgb(255,0,0)), named colors (red), or 'currentColor'
- `size` (optional): Icon size in pixels (sets both width and height)

**Examples:**
```
get-icon name="heart" weight="bold" color="#FF0000"
get-icon name="star" weight="fill" color="gold" size=48
get-icon name="user" color="currentColor"
```

### search-icons
Search for icons by name, category, or tags.

**Parameters:**
- `query` (string): Search term
- `limit` (optional): Maximum results to return (default: 10)

**Example:**
```
search-icons query="arrow" limit=5
```

### list-categories
Get a list of all available icon categories.

### get-multiple-icons
Retrieve multiple icons at once with optional color and size.

**Parameters:**
- `names` (array): Array of icon names
- `weight` (optional): Weight to apply to all icons
- `color` (optional): Color to apply to all icons
- `size` (optional): Size in pixels to apply to all icons

**Examples:**
```
get-multiple-icons names=["heart", "star", "user"] weight="fill" color="#3B82F6"
get-multiple-icons names=["home", "gear", "bell"] weight="regular" size=32
```

## Resources

### phosphor://catalog
Complete catalog of popular Phosphor Icons with metadata including categories, tags, and available weights.

### phosphor://weights
Detailed information about the 6 available icon weights/styles and their best use cases.

## Prompts

### implement-icon
Get guidance on implementing a Phosphor icon in your project.

**Parameters:**
- `iconName` (string): Name of the icon
- `framework` (string): Frontend framework (html, react, vue, svelte, angular)

## Publishing to Smithery

1. Push your code to GitHub
2. Visit [smithery.ai/new](https://smithery.ai/new)
3. Connect your GitHub repository
4. Configure automatic deployments

## Icon Weights

- **Thin**: Delicate, minimal strokes - best for large sizes
- **Light**: Subtle, refined appearance - modern designs
- **Regular**: Balanced, versatile - general use (default)
- **Bold**: Strong, impactful - emphasis and small sizes
- **Fill**: Solid, filled shapes - strong emphasis
- **Duotone**: Two-tone design - visual interest

## Examples

Get a red heart icon in bold:
```typescript
// Returns SVG content for a bold red heart icon
get-icon({ name: "heart", weight: "bold", color: "#FF0000" })
```

Get a blue star icon at custom size:
```typescript
// Returns a 48px blue filled star icon
get-icon({ name: "star", weight: "fill", color: "#3B82F6", size: 48 })
```

Search for navigation icons:
```typescript
// Returns list of icons related to navigation
search-icons({ query: "navigation", limit: 10 })
```

Get multiple colored icons for a UI:
```typescript
// Get home, user, and settings icons all in blue
get-multiple-icons({ 
  names: ["home", "user", "gear"],
  weight: "regular",
  color: "#3B82F6",
  size: 24
})
```

## Disclaimer

**NO WARRANTY OR LIABILITY**

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**USE AT YOUR OWN RISK**

- This is an **unofficial, community-driven project** created with AI assistance
- The software is provided without any guarantees or support
- Users are responsible for testing and validating the software for their use cases
- The maintainers are not responsible for any damages, data loss, or issues arising from the use of this software
- This project is not endorsed by or affiliated with the official Phosphor Icons project

## License

This MCP server is MIT licensed. Phosphor Icons are also MIT licensed.

## Links

- 🌐 [Phosphor Icons Website](https://phosphoricons.com)
- 💻 [Original Phosphor Icons Repository](https://github.com/phosphor-icons) (Official)
- 📦 [Phosphor Icons Core](https://github.com/phosphor-icons/core)
- 📖 [Smithery Documentation](https://smithery.ai/docs)
- 🔧 [MCP Protocol](https://modelcontextprotocol.io)

## Credits

- **Icons**: Provided by [Phosphor Icons](https://phosphoricons.com) - created by Tobias Fried
- **MCP Server**: Community-driven project created with AI assistance
- **Maintainers**: Community contributors (not affiliated with Phosphor Icons)
