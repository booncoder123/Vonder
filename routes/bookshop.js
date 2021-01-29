const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/books',shopController.fetchAllBooks);
router.get('/shelters',shopController.getAllShelter);

router.post('/add_shelter',shopController.AddShelter);
router.post('/add_book',shopController.AddBook); 


router.delete('/delete_shelter/:id',shopController.DeleteShelter);
router.post('/delete_book/:id',shopController.DeleteBook);

router.put('/edit_book/:BookId',shopController.EditBook);

router.get('/findByName',shopController.SearchByTitle);

router.get('/SearchByCategory/:CategoryName',shopController.SearchByCategory);

module.exports = router;
