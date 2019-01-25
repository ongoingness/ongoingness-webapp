# Create application in alpine first
# This is to build the vue project through webpack in Alpine
FROM node:alpine as builder
RUN mkdir /app
WORKDIR /app

# Build the webapp
COPY ./webapp /app/web
RUN rm -r ./web/node_modules
RUN npm --prefix ./web install ./web
RUN npm --prefix ./web run build

# Get an nginx instance, and copy build folder from pervious Docker build
FROM nginx:alpine
COPY --from=builder /app/web/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/defualt.conf

# Expose same port as specified in default.conf
EXPOSE 3333
