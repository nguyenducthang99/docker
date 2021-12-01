# Dockerfile

# Use node alpine as it's a small node image
FROM node:16-alpine

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /backend

# Set /app as the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json /backend/

RUN apk update && apk add bash

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY . /backend/

# Ensure port 4000 is accessible to our system
EXPOSE 4000

# Run yarn dev, as we would via the command line 
CMD ["npm", "start"]
