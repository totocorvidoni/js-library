/* Set Up */

booksTable = document.querySelector('tbody');
formToggle = document.querySelector('#toggle-form');
bookForm   = document.querySelector('#book-form');

formToggle.addEventListener('click', () => bookForm.classList.toggle('hidden'));
bookForm.addEventListener('submit', function(event) {
  event.preventDefault();
  submitBook();
});

myLibrary = [];
if (localStorage.getItem('myLibrary')) {
  loadLibrary();
} else {
  addBookToLibrary('Le Fantastique Totoret', 'Totoret', 5, true);
  addBookToLibrary('Voyage avec Pupe LéPu', 'Pupe',  784, false);
  addBookToLibrary('la conjura de los necios', 'toole',  500, true);
}
render()

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

Book.prototype.readToggle = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read))
  saveLibrary();
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
  row.appendChild(createReadButton());
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

function createRemoveButton() {
  button = document.createElement('button');
  text = document.createTextNode('remove');
  button.classList.add('remove');
  button.addEventListener('click', removeBook);
  button.appendChild(text);
  return button; 
}

function createReadButton() {
  button = document.createElement('button');
  text = document.createTextNode('read');
  button.classList.add('read');
  button.addEventListener('click', readBook);
  button.appendChild(text);
  return button;
}

function removeBook() {
  index = this.parentElement.dataset.bookId;
  myLibrary.splice(index, 1);
  saveLibrary();
  render();
}

function readBook() {
  index = this.parentElement.dataset.bookId;
  book = myLibrary[index];
  book.readToggle();
  saveLibrary();
  render();
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Parses from local storage and makes build new Book objects.
function loadLibrary() {
  books = JSON.parse(localStorage.getItem('myLibrary'));
  books.forEach(function(book) {
    myLibrary.push(new Book(...Object.values(book)));
  }) 
}