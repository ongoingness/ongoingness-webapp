# Create application in alpine first
# This is to build the vue project through webpack in Alpine
FROM node:alpine as builder
RUN mkdir /app
WORKDIR /app

# Build the webapp
COPY . /app
RUN rm -r ./node_modules
RUN npm install
RUN npm run build

# Get an nginx instance, and copy build folder from pervious Docker build
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/defualt.conf

# Expose same port as specified in default.conf
EXPOSE 3333
