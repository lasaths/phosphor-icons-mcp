# Color Customization Guide

The Phosphor Icons MCP server supports comprehensive color customization for all icons.

## Color Formats Supported

### 1. Hex Colors
```javascript
get-icon({ name: "heart", color: "#FF0000" })        // Red
get-icon({ name: "star", color: "#FFD700" })         // Gold
get-icon({ name: "check", color: "#10B981" })        // Green
get-icon({ name: "bell", color: "#3B82F6" })         // Blue
```

### 2. RGB/RGBA Colors
```javascript
get-icon({ name: "heart", color: "rgb(255, 0, 0)" })              // Red
get-icon({ name: "star", color: "rgba(59, 130, 246, 0.8)" })      // Blue with 80% opacity
get-icon({ name: "warning", color: "rgb(245, 158, 11)" })         // Amber
```

### 3. Named Colors
```javascript
get-icon({ name: "heart", color: "red" })
get-icon({ name: "star", color: "gold" })
get-icon({ name: "check", color: "green" })
get-icon({ name: "info", color: "blue" })
get-icon({ name: "warning", color: "orange" })
```

### 4. currentColor (CSS Inheritance)
```javascript
// Icon will inherit color from parent element
get-icon({ name: "user", color: "currentColor" })
```

### 5. HSL Colors
```javascript
get-icon({ name: "heart", color: "hsl(0, 100%, 50%)" })        // Red
get-icon({ name: "star", color: "hsl(220, 90%, 56%)" })        // Blue
```

## Weight-Specific Color Behavior

Different icon weights apply color differently:

### Fill Weight
- Color applies to the fill attribute
- Creates solid colored icons
```javascript
get-icon({ name: "heart", weight: "fill", color: "#FF0000" })
```

### Stroke Weights (thin, light, regular, bold)
- Color applies to the stroke attribute
- Creates outlined colored icons
```javascript
get-icon({ name: "heart", weight: "bold", color: "#3B82F6" })
```

### Duotone Weight
- Color applies to both fill and stroke
- Creates two-tone colored icons
```javascript
get-icon({ name: "heart", weight: "duotone", color: "#8B5CF6" })
```

## Common Use Cases

### Brand Colors
```javascript
// Primary brand color
get-icon({ name: "logo", color: "#6366F1", size: 32 })

// Accent colors for different states
get-icon({ name: "check", color: "#10B981" })   // Success - Green
get-icon({ name: "x", color: "#EF4444" })       // Error - Red
get-icon({ name: "warning", color: "#F59E0B" }) // Warning - Amber
get-icon({ name: "info", color: "#3B82F6" })    // Info - Blue
```

### Theme Colors
```javascript
// Light mode
get-icon({ name: "sun", color: "#F59E0B", weight: "fill" })

// Dark mode
get-icon({ name: "moon", color: "#8B5CF6", weight: "fill" })
```

### Status Indicators
```javascript
// Online status
get-icon({ name: "circle", weight: "fill", color: "#10B981", size: 12 })

// Offline status
get-icon({ name: "circle", weight: "fill", color: "#6B7280", size: 12 })

// Away status
get-icon({ name: "circle", weight: "fill", color: "#F59E0B", size: 12 })
```

### Social Media
```javascript
get-icon({ name: "heart", weight: "fill", color: "#E11D48" })     // Like
get-icon({ name: "twitter-logo", color: "#1DA1F2" })              // Twitter
get-icon({ name: "github-logo", color: "#181717" })               // GitHub
get-icon({ name: "linkedin-logo", color: "#0A66C2" })             // LinkedIn
```

## Batch Coloring

Apply the same color to multiple icons:

```javascript
// Blue navigation icons
get-multiple-icons({ 
  names: ["house", "magnifying-glass", "user", "gear"],
  weight: "regular",
  color: "#3B82F6",
  size: 24
})

// Green success icons
get-multiple-icons({ 
  names: ["check", "check-circle", "shield-check"],
  weight: "fill",
  color: "#10B981",
  size: 32
})
```

## Tips & Best Practices

1. **Use currentColor for Dynamic Theming**
   - Allows icons to inherit color from CSS
   - Best for themeable applications

2. **Match Weight to Use Case**
   - Fill weight: Best for solid colored icons
   - Stroke weights: Best for outlined colored icons
   - Duotone: Best for multi-tone effects

3. **Consider Accessibility**
   - Ensure sufficient contrast ratios
   - Don't rely solely on color to convey information

4. **Brand Consistency**
   - Use hex codes for exact brand colors
   - Define color constants for consistency

5. **Performance**
   - Color is applied at request time
   - No additional rendering overhead

## Integration Examples

### React with Tailwind
```jsx
// Using hex colors from your design system
<Icon name="heart" weight="fill" color="#EF4444" size={24} />

// Using CSS variables
<Icon name="star" color="var(--color-primary)" size={20} />

// Inheriting from parent
<div className="text-blue-500">
  <Icon name="check" color="currentColor" size={16} />
</div>
```

### CSS Custom Properties
```javascript
// Define colors in CSS
:root {
  --icon-primary: #3B82F6;
  --icon-success: #10B981;
  --icon-error: #EF4444;
}

// Use in MCP calls
get-icon({ name: "bell", color: "var(--icon-primary)" })
```

## Need Help?

- See full icon catalog: Use `phosphor://catalog` resource
- Browse weights: Use `phosphor://weights` resource
- Search icons: Use `search-icons` tool
