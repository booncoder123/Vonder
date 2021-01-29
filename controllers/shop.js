const mongoose = require('mongoose');

const book = require('../models/book');
const Book = require('../models/book');
const Shelf = require('../models/shelf');

exports.fetchAllBooks = (req, res, next) => {
  Book.find()
    .then(objects => {
      res.status(200).json({
        message: 'fetch successfully.',
        books: objects
      });
      console.log(objects);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getAllShelter = (req, res, next) => {
  Shelf.find()
    .then(objects => {
      res.status(200).json({ message: 'get shelter successful', shelter: objects })
      console.log(objects);
    })
    .catch(err => {
      console.log(err);
    });
};


//AddShelter

exports.AddShelter = (req, res, next) => {
  const shelterNumber = req.body.shelterNumber;
  const shelf = new Shelf({
    books: [],
    qty: 0
  });


  Shelf
    .save()
    .then(result => {
      console.log('Created Product');
      res.status(200).json({
        message: 'Created Book successfully.',

      });
    })
    .catch(err => {
      console.log(err);
    });
};

//AddBook

exports.AddBook = (req, res, next) => {

  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const category = req.body.category;

  Book.findOne({ title: title }).then(book => {

    if (book !== null) {
      res.status(404).json({ error: 'this title is already used' })

    } else {
      Shelf.findOne({ qty: { $lt: 5 } }).then(
        shelf => {
          if (shelf) {
            console.log('shelf' + shelf)
            return shelf;
          }
          else {
            const newShelf = new Shelf({
              books: [null, null, null, null, null],
              qty: 0,
            })

            return newShelf;
          }
        }
      ).then(
        shelf => {

          const newBook = new Book({
            title: title,
            price: price,
            description: description,
            category: category,
            ShelfNumber: shelf
          });


          emptyArr = shelf.books.map((book, index) => { if (book === null) { return 1 } else { return -1 } })
          emptyIndex = emptyArr.indexOf(1)

          updatedBooks = shelf.books
          updatedBooks[emptyIndex] = newBook
          shelf.books = updatedBooks
          shelf.qty++;

          shelf.save()
          newBook.save()



          res.status(200).json({
            message: 'add book successful',
            book: newBook,
            shelfId: shelf._id
          })



        }
      ).catch(err => console.log(err));

    }
  })




};

//DeleteShelter
exports.DeleteShelter = (req, res, next) => {

  const shelfId = req.params.id;
  Shelf.findByIdAndRemove(shelfId)
    .then((shelf) => {
      return Book.deleteMany(
        {
          _id: {
            $in: shelf.books
          }
        })
    }).then(books => {
      console.log('DESTROYED Shelf')
      res.status(201).json({ message: 'delete Shelf succesfully', shelf: shelf })
    })
    .catch(err => console.log(err));

};

//DeleteBook
exports.DeleteBook = (req, res, next) => {
  const id = req.params.id;

  Book.findByIdAndDelete(id).then(
    item => {
      if (item !== null) {
        return Shelf.findById(item.ShelfNumber).then(shelf => {
          updatedBooks = shelf.books.map(bookId => {
            if (bookId == id) {
              return null
            }
            else { return bookId }
          })
          shelf.books = updatedBooks
          shelf.qty--;
          shelf.save()
          res.status(201).json({ message: 'delete succesfully', book: item })
        })
      } else {
        res.status(404).json({ message: 'not found' })
      }
    }
  )

};

//EditBook

exports.EditBook = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedCategory = req.body.category;
  const updatedDesc = req.body.description;
  const BookId = req.params.BookId;

  Book.findById({ _id: BookId })
    .then(book => {
      book.title = updatedTitle;
      book.price = updatedPrice;
      book.description = updatedDesc;
      book.category = updatedCategory;
      return book.save();
    })
    .then(result => {
      console.log('UPDATED PRODUCT!');
      res.status(201).json({ message: 'updated succesfully' })
    })
    .catch(err => console.log(err));
};



//search
exports.SearchByTitle = (req, res, next) => {
  const destinationbook = req.body.title;
  Book.findOne({ title: destinationbook })
    .then(book => {
      
     
      const shelterindex = book.ShelfNumber
     
      return Shelf.findById(shelterindex).then(
        shelf => {
          console.log(shelf)
          let BookPosition = shelf.books.indexOf(book._id)
          console.log('Find PRODUCT!');
          res.status(201).json({ message: 'find succesfully', book: book,position : BookPosition})

        })
    .catch(err => {
      console.log(err)
    })
      
    })
    
}

exports.SearchByCategory = (req, res, next) => {
  const list = []
  const CategoryName = req.params.CategoryName;
  console.log(CategoryName);
  Book.find({ category: CategoryName })
    .then(book => {

      book.forEach(element => {
        let shelfId = element.ShelfNumber
        let  bookId = element._id
        Shelf.findById(shelfId).then(shelf => {
    
          let BookPosition = shelf.books.indexOf(bookId)
          console.log("Position",BookPosition)
         
        })
      })
      return book
    })
    .then(
      book => {
        res.status(201).json({ message: 'find succesfully', book: book })
      }
      
    )
    
    .catch(err => {
      console.log(err)
    })

};

