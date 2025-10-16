# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the Next.js app (Turbopack)
RUN npm run build

# Production Stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the output from builder
COPY --from=builder /app ./

# Expose the frontend port
EXPOSE 3000

# Start Next.js in production
CMD ["npm", "run", "start"]
