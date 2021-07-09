FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Open port 3000 from container to host
EXPOSE 3000

# Run app
CMD [ "node", "index.js" ]