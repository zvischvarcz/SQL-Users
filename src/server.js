require("dotenv").config();
const cors = require('cors')

const express = require("express");

const userRouter = require("./users/routes")
const User = require("./users/model")
const booksRouter = require("./books/routes")
const Book = require("./books/model")

const port = process.env.PORT || 5002;

const app = express();
app.use(cors())
app.use(express.json());
app.use(userRouter)
app.use(booksRouter)



const syncTables = () => {
    User.hasMany(Book)
    Book.belongsTo(User)

    User.sync({ alter: true })
    Book.sync({ alter: true })
}


app.get("/health", (req, res) => {
    res.status(200).json({message: "API is working"});
})

app.listen(port, ()=> {
    syncTables()
    console.log(`Server is running on port ${port}`);
});