class Book {
    constructor(data) {
        const {id, title, author, available} = data
        this.id = id;
        this.title = title
        this.author = author
        this.available = available
 }
}

class User {
    constructor ({id, name, borrowedBooks}) {
        this.id = id;
        this.name = name;
        this.borrowedBooks = borrowedBooks;
    }

    addBorrowedBook(bookId) {
        this.borrowedBooks.push(bookId)
    }

    returnBook(bookId) {
        this.borrowedBooks = this.borrowedBooks.filter(borrowedBook => borrowedBook !== bookId)
        return "Libro devuelto"
    }
}

class Library {
    constructor (books, users) {
        this.books = books;
        this.users = users;
    }

    findBooks () {
        return this.books
    }

    findBook (title) {
        const book = this.books.find(book => book.title.toLowerCase() === title)
        if(!book) {
            return "Libro no encontrado"
        }

        return book
    }

    lendBook(bookTitle, userId) {
        const book = this.findBook(bookTitle)
        const user = this.users.find (user => user.id === userId)

        if(!book || user) {
            return "Libro o usuario no encontrado"
        }

        if(user.borrowedBooks.include(book.id)) {
            return "El libro ya esta prestado"
        }

        if(!book.available) {
            return "El libro no esta disponible"
        }

        user.addBorrowedBook (book.id)
        book.available = false
    }
}

const initialBooks = [
    new Book ({ id: 1, title: "1984", author: "George Orwell", available: true }),
    new Book ({ id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", available: true }),
    new Book ({ id: 3, title: "Pride and Prejudice", author: "Jane Austen", available: false })
  ];
  
  const initialUsers = [
    new User ({ id: 1, name: "Alice Johnson", borrowedBooks: [] }),
    new User ({ id: 2, name: "Bob Smith", borrowedBooks: [3] })
  ];

  const library = new library(initialBooks, initialUsers)

  console.log(library.lendBook("1984", 1))
  console.log(initialUsers)