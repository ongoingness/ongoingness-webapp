# Ongoingness Webapp

Web application to upload and tag media, manage devices and access logs for the Ongoingness pieces.
This application was built using Vue in multi-page mode.

There are a total of 5 pages in this application:

- **Ivvor** - Used with the Ivvor piece, this page allows the user to manage collections of media associated with specific dates. The user can add a new media item by either inserting a day and a month or by allowcating with to a permanent collection. The page also allows to remove media items, manage devices and delete the user account. Accessed at `/ivvor`.

- **Anew** - Used with the Anew piece, this page allows the user to manage two distinct collections of media: temporary collection and permanent collection. Both collections have a cap on the number of media, the permanent collection allows a maximum of 7 media items, while the temporary allows for a total of 13 media items. In the temporary collection the user allowed to add and remove existing media items, while in the permanent collection only adding is allowed. Accessed at `/anew`.

- **Locket** - Used as the admin page for the Anew piece, this page presents the same features as the one described above, with an exception that the user can remove media items from the permanent collection. This page also allows the user to manage the devices associated to their account and delete their account. Accessed at `/locket`.

- **Refind** - Used in with the Refind piece, this page allows the user to manage two distinct collections of media: past collection and present collection. The user can add media to both collections and provide tags. The user can also remove media items, manage devices and delete thier account. Accessed at `/refind.`

- **Logs** - Used as an admin page for all the other pages, this page allows to check the logs and search through the logs of the user interactions with the the webapage and the devices. Accessed at `/logs`.


## Project Structure
### /src

#### /assets
Images and CSS files

#### /components
Individual components are found here, these present and collect data to the user.

#### /controllers
Handle user actions and interface with the store.

#### /pages
Individual folders for each of the pages and their unique components.

#### /store
Global store for setting the state of the application, handles notifications, media, devices, user, session information, logs and tags.

## Install
```
npm install
```

## Run Locally
```
npm run serve
```

## Deploy

1. Deploy the Ongoingness API found [here](https://github.com/ongoingness/ongoingness-api).
2. Clone this project:
   ```
   git clone https://github.com/ongoingness/ongoingness-api.git
   ```
3. Install it:
   ```
   npm install
   ```
4. Build the project:
   ```
   npm run build
   ```
5. Copy the content built in the folder `/dist` into the folder `/webapp` of the Ongoingness API.
6. Done! The API is set to automatically serve the website. 

## Test
1. Make sure a local version of the api is running first, you can use:
```
docker-compose up
```
2. Run: `npm run test`.


