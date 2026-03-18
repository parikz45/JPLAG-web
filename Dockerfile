FROM node:22

# Install Java (OpenJDK 17)
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Create app directory
WORKDIR /app

# Copy project files
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm install

# Expose port used by Express
EXPOSE 10000

# Start backend
CMD ["node", "index.js"]