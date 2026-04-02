# Stage 1: Build stage
FROM node:25-alpine3.22 AS builder

# Application directory
WORKDIR /app

# Copy package files
COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:25-alpine3.22

# Application directory
WORKDIR /app

# Install only serve (lightweight production server)
RUN npm install -g serve

# Copy only the built dist folder from builder stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "8080"]
