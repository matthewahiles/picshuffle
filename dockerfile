FROM node:12-alpine 
COPY . .
USER node
EXPOSE 3000
RUN npm install --frozen-lockfile --production
CMD node app.js
