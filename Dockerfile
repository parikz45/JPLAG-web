# Use Node 22 base image
FROM node:22-bookworm

# Install Java 21 (required for latest JPlag)
RUN apt-get update && apt-get install -y openjdk-21-jdk-headless

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Expose backend port
EXPOSE 10000

# Start the backend server
CMD ["node", "index.js"]