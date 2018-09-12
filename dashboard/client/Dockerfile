# docker build -t build-dashboard-client .
# docker run -v $(dirname `pwd`)/of-cloud-dashboard/dist:/usr/src/app/dist --rm -it build-dashboard-client
FROM node:8.9.4-alpine
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn
RUN mkdir ./dist
COPY . .
CMD ["yarn", "build"]