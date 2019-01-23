/* Set Up */

booksTable = document.querySelector('tbody');
formToggle = document.querySelector('#toggle-form');
bookForm   = document.querySelector('#book-form');

formToggle.addEventListener('click', () => bookForm.classList.toggle('hidden'));
bookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  submitBook();
});

let myLibrary = [];

addBookToLibrary('Le Fantastique Totoret', 'Totoret', 5, true);
addBookToLibrary('Voyage avec Pupe LéPu', 'Pupe',  784, false);
addBookToLibrary('la conjura de los necios', 'toole',  500, true);
console.table(myLibrary);

/* Logic */

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
  myLibrary.push(new Book(title, author, pages, read))
  render();
}

function submitBook() {
  addBookToLibrary(bookForm.title.value,
                   bookForm.author.value,
                   bookForm.pages.value,
                   bookForm.read.value);
  bookForm.reset();
}

/* Layout */

function render() {
  clearTable();
  myLibrary.forEach(function(book) {
    row = createBookRow(book);
    booksTable.appendChild(row);
  });
}

function createBookRow(book) {
  row = document.createElement('tr');
  row.classList.add('book');
  row.setAttribute('data-book-id', myLibrary.indexOf(book));
  for(let prop in book) {
    if (book.hasOwnProperty(prop)) {
      row.appendChild(createBookCell(book[prop]));  
    }
  }
  row.appendChild(createRemoveButton());
  row.appendChild(createTableButton('read'));
  return row;
}

function createBookCell(content) {
  cell = document.createElement('td');
  content = document.createTextNode(content);
  cell.appendChild(content);
  return cell;
}

function clearTable() {
  booksTable.innerHTML = '';
}

function createTableButton(action) {
  button = document.createElement('button');
  text = document.createTextNode(action);
  button.classList.add(action);
  button.appendChild(text);
  return button;
}

function createRemoveButton() {
  button = document.createElement('button');
  text = document.createTextNode('remove');
  button.classList.add('remove');
  button.addEventListener('click', removeBook);
  button.appendChild(text);
  return button; 
}

function removeBook() {
  index = this.parentElement.dataset.bookId;
  myLibrary.splice(index, 1);
  render();
}