const Book = require("./model");
const User = require("../users/model");



const addBook = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            user: req.body.username,
            UserId: user.id
        });

        
        res.status(200).json({ message: "success", book: newBook});
    } catch(error) {
        res.status(501).json({ message: error.message, error: error});
        console.log(error);
    }
};

const getUserAndBooks = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.params["user"]
            },
            include: Book
        })
        res.status(201).json({ message: "success", usersBooks: user});
    } catch(error) {
        res.status(501).json({ message: error.message, error: error});
        console.log(error);
    }
};


module.exports = {
    addBook,
    getUserAndBooks
}