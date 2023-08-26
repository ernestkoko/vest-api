# # NODE image
# FROM node:16

# # Directory we are using
# WORKDIR /usr/src/app

# # Copy the code to the dir
# COPY . .

# # Install the app
# RUN npm install

# # RUN npm run build
# # Port to expose
# EXPOSE 3000 29092

# # Commands to run -executables
# CMD [ "npm", "run", "debug" ]

FROM node:16
# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
# Bundle app source

# npm install
RUN npm install

COPY . .
# Run npm install --global grpc --unsafe-perm
EXPOSE 3000 9204
CMD [ "npm", "run", "start:dev" ]