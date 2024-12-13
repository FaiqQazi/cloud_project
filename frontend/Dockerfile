# Use Node.js for building the app
FROM node:16 as build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the app code
COPY . ./

# Build the React app
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
