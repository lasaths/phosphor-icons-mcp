# Use Node.js LTS as base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./
COPY tsconfig.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# Copy source files
COPY src ./src

# Build TypeScript
RUN npm run build

# Remove dev dependencies, source files, and build tools to reduce image size
RUN rm -rf src tsconfig.json node_modules && \
    npm ci --only=production && \
    npm cache clean --force

# Create non-root user for security
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN chown -R appuser:appuser /app
USER appuser

# Run the server
CMD ["node", "dist/index.js"]

