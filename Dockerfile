# Base image with Java 21 already installed
FROM eclipse-temurin:21-jdk

# Install Node.js (needed for your Express backend)
RUN apt-get update \
 && apt-get install -y nodejs npm \
 && rm -rf /var/lib/apt/lists/*

# Create working directory
WORKDIR /app

# Copy project files
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Expose Express port
EXPOSE 10000

# Start backend
CMD ["node", "index.js"]