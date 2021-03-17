# Ongoingness Webapp

Web application to upload images and register devices for the Ongoingness prototypes.

## Project Structure
### /src
#### /assets
Images and CSS files

#### /components
Individual components are found here, these present and collect data to the user.

#### /controllers
Handle user actions and interface with the store.



##### TODO
 - [ ] Move `src/api.js` to be a controller.
 - [ ] Set button handlers to use controllers only and move error handling and notifications there too.

#### /store
Global store for setting the state of the application, handles notifications, media, devices, user, and session
information.

## Install
```
npm install
```

## Run Locally
```
npm run serve
```

## Deploy
1. Add `dokku` as an ssh alias, see [openlab wiki](http://openlab.ncl.ac.uk/wiki) for instructions.
2. Add `dokku` as git remote:
```
git remote add dokku dokku@dig-civics.ncl.ac.uk:ongoingness-webapp
```
3. Then run
```
git push dokku master
```

## Test
1. Make sure a local version of the api is running first, you can use:
```
docker-compose up
```
2. Run: `npm run test`.


