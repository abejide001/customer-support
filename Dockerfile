FROM node:alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
# Install dev dependencies only
RUN npm i typescript@4.1.3 && \
      npm install
# Copy app source code
COPY . .
RUN ./node_modules/typescript/bin/tsc --build
#Expose port and start application
EXPOSE 9000
CMD [ "npm", "start" ]
