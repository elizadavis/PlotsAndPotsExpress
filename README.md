# Plots & Pots - By Eliza Davis

## Description:
This application allows users to view a list of plants identified as being
either "Plots" (plants for their gardens) or "Pots" (houseplants). Users may
add to the list, and all plants are available for everyone to see so that users
may get some ideas and inspiration for how to build their own collections. Users
may also edit or remove any plants that they have added, but not those created
by others.

This is the second iteration of the back end, which was originally built with
Rails and PostgreSQL.

## Technologies used:
1. HTML
2. CSS, Sass, & Bootstrap
3. JavaScript & JQuery
4. MongoDB
5. Handlebars
6. Mongoose
7. Express.js
8. Node.js

## User Stories:
1. As a user, I want to sign up.
2. As a user, I want to sign in.
3. As a user, I want to change my password.
4. As a user, I want to sign out.
5. As a user, I want to view a list of plants.
6. As a user, I want to add plants to the list.
7. As a user, I want to edit plants that I have created.
8. As a user, I want to delete plants that I have created.

## Planning, Development Process, Problem-Solving:

My original plan was to focus only on houseplants and create watering schedules,
but I wanted to allow users to add to the list. I realized that could be a
challenge, as people may not necessarily know average watering cycles. I chose
to keep the required data simple and focus on creating a collaborative list. My
process was roughly as follows:

1. Build back end
  1. Create plants table
  2. Add editable to serializer
  3. Inherit Plant controller from OpenRead
2. Build front end
  1. Authorization: API routes, events, user interface
    1. Ensure user can sign up, sign in, change password, and sign out
  2. Add functionality for creating, reading, updating, and deleting plants
    1. Ensure users were appropriately authorized for actions
3. Create handlebars template
4. Add update and delete actions to individual plants, only available to the
user who created them.
5. Add messages to reflect user actions
6. Testing, polishing
7. Styling

## Entity Relationship Diagram:

![ERD](./public/images/ERD_P2.JPG)

## Future Goals:

1. Allow lists to be sortable.
2. Add images.

[Front-End Repository](https://github.com/elizadavis/PlotsAndPotsClient)
[1st Iteration Rails Back-End Repository](https://github.com/elizadavis/PlotsAndPots)
