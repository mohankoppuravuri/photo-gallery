
# Photo gallery applcation

### Summary of this code base. (Frontend focused) gallery applcation.
1. Loads Photoes metada from server.
2. Frontend makes an REST API call to fetch photoes data.
3. Stores in localstorage.
4. User can reorder the image positions.
5. At every 5 seconds interval, our event listener check any update in reorder if yes it then saves it in localstorage. Just to mimic API makes an empty POST API call for ux (similar to msw.)
6. Last saved at is visible to the end user.

### Future Scope
1. Creating proper POST and PUT API call to create new images and save the ordering in postgresql.
####
2. API to add new image. 
   - A PUT REST API method that takes `image url, position, title and type of the image` in the request body.
   - Creating a new row in the postgres database.
   - Validaton on table level with unique position.
   - Position at the API payload is optional. Server calculates the default position.

4. API to delete an image
   - DELETE REST API
   - Request takes the image id.
   - Server makes database call to delete the row.
   - Using databse trigger on delete row in the table. Run a Reordering functions to fix the position.

5. API for updating an image
   - PATCH API call.
   - Takes the image unique in the URL along with updated positon and other fields in the request payload.
   - Server makes an update API call to the database using id.
   - Updating all positions greater than current image ids positon by one .
   - Update any other required fields.

### Prerequisites to run this application

Docker or Deno should be installed in laptop

### Using Docker

1. Clone the repository created to your local machine.
2. cd photo-gallery.
1. Run the command `docker build -t photo-gallery . && docker run -it -p 8000:8000 photo-gallery` which creates and run the server in 8000 port.

### Without using docker 
1. Install deno in machine
2. RUN `deno install`
3. RUN `deno task serve`


### Technologies used
React, deno, vite, html, css



