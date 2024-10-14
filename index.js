class Book {
    constructor(id, title, author, available) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.available = available;
    }
  }
  
  class User {
    constructor(id, name) {
      this.id = id;
      this.name = name;
      this.borrowedBooks = [];
    }
  
    borrowBook(book) {
      if (book.available) {
        book.available = false;
        this.borrowedBooks.push(book.id);
        console.log(`${this.name} ha prestado "${book.title}".`);
      } else {
        console.log(`El libro "${book.title}" no está disponible.`);
      }
    }
  
    returnBook(book) {
      const index = this.borrowedBooks.indexOf(book.id);
      if (index > -1) {
        book.available = true;
        this.borrowedBooks.splice(index, 1);
        console.log(`${this.name} ha devuelto "${book.title}".`);
      } else {
        console.log(`${this.name} no ha prestado el libro "${book.title}".`);
      }
    }
  }
  
  class Library {
    constructor(books, users) {
      this.books = books;
      this.users = users;
    }
  
    findBook(title) {
      const book = this.books.find(b => b.title.toLowerCase() === title.toLowerCase());
      return book ? book : null;
    }
  
    findUser(name) {
      const user = this.users.find(u => u.name.toLowerCase() === name.toLowerCase());
      return user ? user : null;
    }
  }
  
  // Datos iniciales con nombres de libros cambiados
  const initialBooks = [
    new Book(1, "El Hobbit", "J.R.R. Tolkien", true),
    new Book(2, "Cien años de soledad", "Gabriel García Márquez", true),
    new Book(3, "La sombra del viento", "Carlos Ruiz Zafón", false)
  ];
  
  const initialUsers = [
    new User(1, "Alice Johnson"),
    new User(2, "Bob Smith")
  ];
  
  // Crear la biblioteca
  const library = new Library(initialBooks, initialUsers);
  
  // Ejemplo de uso
  const bookToBorrow = library.findBook("El Hobbit");
  const userAlice = library.findUser("Alice Johnson");
  
  if (bookToBorrow && userAlice) {
    userAlice.borrowBook(bookToBorrow); // Alice borra "El Hobbit"
  }
  
  const bookToReturn = library.findBook("El Hobbit");
  if (bookToReturn) {
    userAlice.returnBook(bookToReturn); // Alice devuelve "El Hobbit"
  }