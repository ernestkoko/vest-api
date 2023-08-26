# NODE image
FROM node:16

# Directory we are using
WORKDIR /usr/src/app

# Copy the code to the dir
COPY . .

# Install the app
RUN npm install

# RUN npm run build
# Port to expose
EXPOSE 3000 29092

# Commands to run -executables
CMD [ "npm", "run", "debug" ]