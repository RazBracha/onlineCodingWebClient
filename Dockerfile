# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the React app using a lightweight server
FROM node:14-alpine

WORKDIR /app

COPY --from=build /app/build ./build

# Install a simple web server to serve the React app
RUN npm install -g serve

# Set the command to run the app
CMD ["serve", "-s", "build"]

# Expose the port that the app will run on
EXPOSE 5000
