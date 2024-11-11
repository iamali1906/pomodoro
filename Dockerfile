# Use the official Node.js image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 5173 (default Vite port)
EXPOSE 5173

# Command to run the Vite development server
CMD ["npm", "run", "dev"]
