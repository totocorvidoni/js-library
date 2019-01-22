function Book(title, author, pages, read) {
  this.title  = title,
  this.author = author,
  this.pages  = pages,
  this.read   = read
}

Book.prototype.info = function() {
  status = (this.read) ? "You have read this book.": "You haven't read this book yet."
  return `${this.title} by ${this.author}. Pages: ${this.pages}. ${status}`;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

/* Tool Code */

let myLibrary = [];

addBookToLibrary('Le Fantastique Totoret', 'Totoret', 5, true);
addBookToLibrary('Voyage avec Pupe LéPu',   'Pupe',  784, false);

console.table(myLibrary);
