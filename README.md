# Furniture shop

## About app

This is fullstack web application, with the help of which I try to understand the principle of uploading files to the
server and importing goods into the database.

Application uses nodeJs + express on backend side. Also, i created authorization through JWT Tokens (with access and
refresh tokens). I chose `MySql`as the database, but database side doesn't have models in application, therefore i'm
writing tables manually. Data of user
saving in the table `users`. Table `users` has that structure: `id (PK), name, login, email, password, roleId (FK)`
. `roleId` it's table for role system in application, that has that structure: `id (PK), role`.

On frontend side application uses ReactJs + Redux (RTK) and SCSS. For routing i'm used **react-router-dom**. I have **
Redux** responsible for getting the user authorization state. To notify the user of an error or other message, I use **
react-toastify**. To get data from the database, I use **axios**.

### Default database values:

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

# Comments

In that app I'm learned how **Refresh tokens** and uploading files on backend works. Also, I have any moments which I
want to describe:

- I'm created super simply **admin page** whose route name is **/admin.php**, because that project is my practice task.
- After uploading file on database, I have code that checked product category in database:

```javascript
// some array of products is arrayOfResult
for (let obj of arrayOfResult) {
    let categories;
    await Q.query(`SELECT * FROM CATEGORY WHERE category = ?`, [
        obj.category,
    ]).then(async (data) => {
        if (data.length !== 0) {
            categories = data[0].id;
        } else {
            await Q.query("INSERT INTO category (category) VALUES (?)", [
                obj.category,
            ])
                .then(async () => {
                    await Q.query(`SELECT * FROM CATEGORY WHERE category = ?`, [
                        obj.category,
                    ]).then((response) => {
                        if (response) {
                            categories = response[0].id;
                        } else {
                            return res.status(500).json({
                                message: "Произошла ошибка с импортом категорий в базу данных",
                            });
                        }
                    });
                })
                .catch((e) => {
                    return res.status(500).json({
                        message: "Произошла ошибка с импортом категорий в базу данных",
                        e,
                    });
                });
        }
    });

    arrOfValues.push([
        obj.title,
        parseFloat(obj.price),
        obj.description,
        obj.specifications,
        categories,
        obj.url,
    ]);
}
```

I have one point that I did not add to the code, but I know that this should not be in this project. Before checking the
category from the database, the category that the user (in my case, the administrator) specified should undergo some
formatting in the imported file in order to prevent the repetition of entries in the database.

- I also have indicated that the characteristics should be specified in this format: <Name | Characteristic>. I know
  that this should be formatted on the server side and distributed to separate tables in the database, but
  unfortunately, I don't have enough time for this physically.

- Often there should be structured management in the admin panel. But I had to deviate from this because, according to
  the task, I need to display all received orders on the admin panel and the ability to import goods through a file.
