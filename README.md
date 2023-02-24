# Furniture shop

## About app

This is fullstack web application, that can help for user to buy something.

Application uses nodeJs + express on backend side. Also, i created authorization through JWT Tokens (with access and
refresh tokens). I chose `MySql`as the database, but database side doesn't have models in application, therefore i'm
writing tables manually. Data of user
saving in the table `users`. Table `users` has that structure: `id (PK), name, login, email, password, roleId (FK)`
. `roleId` it's table for role system in application, that has that structure: `id (PK), role`.

On frontend side application uses ReactJs + Redux (RTK) and SCSS. For routing i'm used **react-router-dom**. I have **
Redux** responsible for getting the user authorization state. To notify the user of an error or other message, I use **
react-toastify**. To get data from the database, I use **axios**.

Default database values:

```dotenv
HOST=localhost
USER=root`
PASSWORD=root
DATABASE=furniture
```

## How to launch the app

1. Open the project in any code editor
2. Open the folder. `.env` that which is in the folder `backend`
3. In `.env` change `HOST, USER, PASSWORD, DATABASE`
4. To start server for working: open the **terminal** and write this: `cd backend`, then write `npm run dev` (to start
   server on dev mode) or `npm start` (to start server on prod. mode)
5. To start frontend you should open your **terminal**. If this path `\furniture_shop\backend>` is specified in the
   terminal, you need to write next commands: `cd ..` to go up to the top level in the folder, than `cd frontend`
   and `npm start` to run frontend application's side.
