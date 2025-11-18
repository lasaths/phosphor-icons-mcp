import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const PHOSPHOR_CORE_RAW_BASE = "https://raw.githubusercontent.com/phosphor-icons/core/main/assets";

interface IconMetadata {
  name: string;
  category?: string;
  tags?: string[];
}

const POPULAR_ICONS: IconMetadata[] = [
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
  { name: "home", category: "interface", tags: ["house", "main", "dashboard"] },
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

export const configSchema = z.object({
  defaultWeight: z
    .enum(["thin", "light", "regular", "bold", "fill", "duotone"])
    .default("regular")
    .describe("Default icon weight/style"),
});

export default function createServer({
  config,
}: {
  config: z.infer<typeof configSchema>;
}) {
  const server = new McpServer({
    name: "Phosphor Icons",
    version: "1.0.0",
  });

  server.registerTool(
    "get-icon",
    {
      title: "Get Phosphor Icon",
      description:
        "Retrieve an SVG icon from Phosphor Icons library. Returns the SVG content with specified weight/style and optional color.",
      inputSchema: {
        name: z
          .string()
          .describe(
            "Icon name in kebab-case (e.g., 'arrow-left', 'magnifying-glass', 'user')"
          ),
        weight: z
          .enum(["thin", "light", "regular", "bold", "fill", "duotone"])
          .optional()
          .describe(
            `Icon weight/style. Defaults to ${config.defaultWeight}. Options: thin (delicate), light (subtle), regular (balanced), bold (strong), fill (solid), duotone (two-tone)`
          ),
        color: z
          .string()
          .optional()
          .describe(
            "Icon color. Accepts hex codes (#000000), RGB (rgb(0,0,0)), named colors (red, blue), or 'currentColor'. Default: currentColor"
          ),
        size: z
          .number()
          .optional()
          .describe("Icon size in pixels (sets both width and height). Default: 256"),
      },
    },
    async ({ name, weight, color, size }) => {
      try {
        const selectedWeight = weight || config.defaultWeight;
        const url = `${PHOSPHOR_CORE_RAW_BASE}/${selectedWeight}/${name}.svg`;

        const response = await fetch(url);
        
        if (!response.ok) {
          return {
            content: [
              {
                type: "text",
                text: `Error: Icon '${name}' not found with weight '${selectedWeight}'. Please check the icon name and weight. Icon names should be in kebab-case (e.g., 'arrow-left', 'user-circle').`,
              },
            ],
            isError: true,
          };
        }

        let svgContent = await response.text();

        // Apply color if specified
        if (color) {
          // For fill weight, replace fill attributes
          if (selectedWeight === "fill") {
            svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
          }
          // For other weights, replace stroke attributes
          else if (selectedWeight === "duotone") {
            // Duotone has both fill and stroke - replace both
            svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
            svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
          } else {
            svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
          }
        }

        // Apply size if specified
        if (size) {
          svgContent = svgContent.replace(/width="[^"]*"/, `width="${size}"`);
          svgContent = svgContent.replace(/height="[^"]*"/, `height="${size}"`);
        }

        const colorInfo = color ? ` with color '${color}'` : "";
        const sizeInfo = size ? ` at ${size}px` : "";

        return {
          content: [
            {
              type: "text",
              text: `# ${name} (${selectedWeight}${colorInfo}${sizeInfo})\n\n\`\`\`svg\n${svgContent}\n\`\`\`\n\nYou can use this SVG directly in your HTML or React components.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error fetching icon: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "search-icons",
    {
      title: "Search Phosphor Icons",
      description:
        "Search for icons by name, category, or tags. Returns a list of matching icons.",
      inputSchema: {
        query: z
          .string()
          .describe("Search query (searches icon names, categories, and tags)"),
        limit: z
          .number()
          .optional()
          .default(10)
          .describe("Maximum number of results to return"),
      },
    },
    async ({ query, limit = 10 }) => {
      const searchTerm = query.toLowerCase();
      
      const matches = POPULAR_ICONS.filter((icon) => {
        return (
          icon.name.toLowerCase().includes(searchTerm) ||
          icon.category?.toLowerCase().includes(searchTerm) ||
          icon.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
        );
      }).slice(0, limit);

      if (matches.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No icons found matching "${query}". Try different keywords or check the full catalog at https://phosphoricons.com`,
            },
          ],
        };
      }

      const resultText = matches
        .map((icon) => {
          const tags = icon.tags?.join(", ") || "none";
          return `- **${icon.name}** (${icon.category || "general"})\n  Tags: ${tags}`;
        })
        .join("\n\n");

      return {
        content: [
          {
            type: "text",
            text: `Found ${matches.length} icon(s) matching "${query}":\n\n${resultText}\n\nUse the 'get-icon' tool with the icon name to retrieve the SVG.`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "list-categories",
    {
      title: "List Icon Categories",
      description: "Get a list of all icon categories available in Phosphor Icons.",
      inputSchema: {},
    },
    async () => {
      const categories = Array.from(
        new Set(
          POPULAR_ICONS.map((icon) => icon.category).filter(
            (cat): cat is string => cat !== undefined
          )
        )
      ).sort();

      const categoryList = categories
        .map((cat) => {
          const count = POPULAR_ICONS.filter(
            (icon) => icon.category === cat
          ).length;
          return `- **${cat}**: ${count} icon(s)`;
        })
        .join("\n");

      return {
        content: [
          {
            type: "text",
            text: `# Phosphor Icons Categories\n\n${categoryList}\n\nUse 'search-icons' with a category name to find icons in that category.`,
          },
        ],
      };
    }
  );

  server.registerTool(
    "get-multiple-icons",
    {
      title: "Get Multiple Icons",
      description:
        "Retrieve multiple SVG icons at once. Useful for batch operations.",
      inputSchema: {
        names: z
          .array(z.string())
          .describe("Array of icon names in kebab-case"),
        weight: z
          .enum(["thin", "light", "regular", "bold", "fill", "duotone"])
          .optional()
          .describe(`Icon weight/style for all icons. Defaults to ${config.defaultWeight}`),
        color: z
          .string()
          .optional()
          .describe(
            "Icon color applied to all icons. Accepts hex codes, RGB, named colors, or 'currentColor'"
          ),
        size: z
          .number()
          .optional()
          .describe("Icon size in pixels applied to all icons"),
      },
    },
    async ({ names, weight, color, size }) => {
      const selectedWeight = weight || config.defaultWeight;
      const results: string[] = [];

      for (const name of names) {
        try {
          const url = `${PHOSPHOR_CORE_RAW_BASE}/${selectedWeight}/${name}.svg`;
          const response = await fetch(url);

          if (response.ok) {
            let svgContent = await response.text();

            // Apply color if specified
            if (color) {
              if (selectedWeight === "fill") {
                svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
              } else if (selectedWeight === "duotone") {
                svgContent = svgContent.replace(/fill="[^"]*"/g, `fill="${color}"`);
                svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
              } else {
                svgContent = svgContent.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
              }
            }

            // Apply size if specified
            if (size) {
              svgContent = svgContent.replace(/width="[^"]*"/, `width="${size}"`);
              svgContent = svgContent.replace(/height="[^"]*"/, `height="${size}"`);
            }

            results.push(`## ${name}\n\`\`\`svg\n${svgContent}\n\`\`\``);
          } else {
            results.push(`## ${name}\n❌ Not found`);
          }
        } catch (error) {
          results.push(
            `## ${name}\n❌ Error: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }

      const colorInfo = color ? ` • Color: ${color}` : "";
      const sizeInfo = size ? ` • Size: ${size}px` : "";

      return {
        content: [
          {
            type: "text",
            text: `# Batch Icon Results (${selectedWeight}${colorInfo}${sizeInfo})\n\n${results.join("\n\n")}`,
          },
        ],
      };
    }
  );

  server.registerResource(
    "icon-catalog",
    "phosphor://catalog",
    {
      title: "Phosphor Icons Catalog",
      description: "Complete catalog of popular Phosphor Icons with metadata",
    },
    async (uri) => {
      const catalogText = POPULAR_ICONS.map((icon) => {
        const tags = icon.tags?.join(", ") || "none";
        return `### ${icon.name}\n- **Category**: ${icon.category || "general"}\n- **Tags**: ${tags}\n- **Weights**: thin, light, regular, bold, fill, duotone`;
      }).join("\n\n");

      return {
        contents: [
          {
            uri: uri.href,
            text: `# Phosphor Icons Catalog\n\n${POPULAR_ICONS.length} Popular Icons\n\n${catalogText}\n\n---\n\nFull catalog: https://phosphoricons.com\nGitHub: https://github.com/phosphor-icons/core`,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  server.registerResource(
    "icon-weights-info",
    "phosphor://weights",
    {
      title: "Icon Weights Information",
      description: "Information about available icon weights/styles in Phosphor Icons",
    },
    async (uri) => {
      const weightsInfo = `# Phosphor Icon Weights

Phosphor Icons are available in 6 different weights/styles:

## 1. Thin
- Delicate, minimal strokes
- Best for: Large sizes, elegant interfaces

## 2. Light
- Subtle, refined appearance
- Best for: Modern, clean designs

## 3. Regular (Default)
- Balanced, versatile
- Best for: General use, body text sizes

## 4. Bold
- Strong, impactful presence
- Best for: Emphasis, small sizes

## 5. Fill
- Solid, filled shapes
- Best for: Strong emphasis, iconography

## 6. Duotone
- Two-tone design with depth
- Best for: Visual interest, brand identity

---

Configure your default weight in the server settings or specify per-request.`;

      return {
        contents: [
          {
            uri: uri.href,
            text: weightsInfo,
            mimeType: "text/markdown",
          },
        ],
      };
    }
  );

  server.registerPrompt(
    "implement-icon",
    {
      title: "Icon Implementation Guide",
      description: "Get guidance on implementing a Phosphor icon in your project",
      argsSchema: {
        iconName: z.string().describe("Name of the icon to implement"),
        framework: z
          .enum(["html", "react", "vue", "svelte", "angular"])
          .default("react")
          .describe("Frontend framework"),
      },
    },
    async ({ iconName, framework = "react" }) => {
      const guides: Record<string, string> = {
        html: `To use '${iconName}' in HTML:\n1. Get the SVG using the 'get-icon' tool\n2. Copy the SVG code directly into your HTML\n3. Customize with CSS classes`,
        react: `To use '${iconName}' in React:\n1. Get the SVG using the 'get-icon' tool\n2. Or install: npm install @phosphor-icons/react\n\nWith package:\nimport { ${iconName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")} } from '@phosphor-icons/react';\n<${iconName.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join("")} size={32} weight="bold" />`,
        vue: `To use '${iconName}' in Vue:\n1. Get the SVG using the 'get-icon' tool\n2. Or install: npm install @phosphor-icons/vue`,
        svelte: `To use '${iconName}' in Svelte:\n1. Get the SVG using the 'get-icon' tool\n2. Check https://phosphoricons.com for Svelte packages`,
        angular: `To use '${iconName}' in Angular:\n1. Get the SVG using the 'get-icon' tool\n2. Check https://phosphoricons.com for Angular packages`,
      };

      return {
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please help me implement the '${iconName}' Phosphor icon in my ${framework} project. ${guides[framework]}`,
            },
          },
        ],
      };
    }
  );

  return server.server;
}
