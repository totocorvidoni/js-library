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

const book1 = new Book('Le Fantastique Totoret', 'Totoret', 5, true);
const book2 = new Book('Voyage avec Pupe LéPu',   'Pupe',  784, false);

console.log(book1.info());
console.log(book2.info());
