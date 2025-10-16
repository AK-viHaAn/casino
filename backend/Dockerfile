# Use Node.js 20 for compatibility with TypeScript and modern dependencies
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose backend port (change if your backend uses a different port)
EXPOSE 7070

# Start the server
CMD ["npm", "run", "start"]
