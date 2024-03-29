FROM node:16-alpine

# create destination directory
RUN mkdir -p /usr/src/prototipo-ods
WORKDIR /usr/src/prototipo-ods

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/prototipo-ods/
RUN yarn install

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build

# expose 5000 on container
EXPOSE 5000

# set app serving to permissive / assigned
ENV NUXT_HOST=0.0.0.0
# set app port
ENV NUXT_PORT=5000

# start the app
CMD [ "yarn", "start" ]
