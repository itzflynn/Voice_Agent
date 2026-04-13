# Use Node.js LTS
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build frontend
RUN npm run build

# Expose port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Start server
CMD ["npm", "run", "dev"]
