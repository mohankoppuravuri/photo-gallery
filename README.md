
# Photo gallery applcation

### Summary of this code base. (Frontend focused) gallery applcation.
1. Loads Photoes metada from server.
2. Frontend makes an REST API call to fetch photoes data.
3. Stores in localstorage.
4. User can reorder the image positions.
5. At every 5 seconds interval, our event listener check any update in reorder if yes it then saves it in localstorage. Just to mimic API makes an empty POST API call for ux (similar to msw.)
6. Last saved at is visible to the end user.

### Future Scope
1. Creating proper POST and PUT API call to create new images and save the ordering in postgresql

### Prerequisites to run this application

Docker or Deno should be installed in laptop

### Using Docker

1. Clone the repository created to your local machine.
2. cd photo-gallery.
1. Run the command `docker build -t photo-gallery . && docker run -it -p 8000:8000 photo-gallery` which creates and run the server in 8000 port.

### Without using docker 
1. Install deno in machine
2. RUN `deno install`
3. deno task serve


### Technologies used
React, deno, vite, html, css

