# Stage 1: Build stage
FROM oven/bun:1 AS build

# Set working directory
WORKDIR /app

# Copy package.json and bun.lockb (if you use it)
COPY package.json bun.lockb ./
COPY prisma ./prisma/ 

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Stage 2: Deployment stage
FROM --platform=linux/amd64 oven/bun:1 AS deploy

# Set working directory
WORKDIR /app

# Copy the build artifacts from the build stage
COPY --from=build /app /app

# Generate Prisma client
RUN bun prisma generate

# Expose the application port
EXPOSE 8080

# Start the deployment web service
CMD ["bun", "production"]