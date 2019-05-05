FROM node:12-alpine
WORKDIR /home/docker/projects/random-image-site
COPY . .
EXPOSE 3000
RUN npm install --frozen-lockfile --production
CMD node index.js
