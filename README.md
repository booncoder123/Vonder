# Vonder-Assigment
=======
## API
- /add_shelter post 

- /delete_shelter/:id delete

- /shelters get

- /books get

- /books/:keyword get

- /add_book post

- /delete_book delete

- /edit_book put 


```Javascript
router.get('/books',shopController.fetchAllBooks);
router.get('/books/:keyword',shopController.fetchSomeBooks);
router.get('/shelters',shopController.getAllShelter);

router.post('/add_shelter',shopController.AddShelter);
router.post('/add_book',shopController.AddBook);


router.delete('/delete_shelter/:id',shopController.DeleteShelter);
router.post('/delete_book/:id',shopController.DeleteBook);

router.put('/edit_book/:BookId',shopController.EditBook);

router.get('/findByName',shopController.SearchByTitle);

router.get('/SearchByCategory/:CategoryName',shopController.SearchByCategory);




```
>>>>>>> 08ebaa97dc2a4353fa87ee6a629cf408a407ca99
