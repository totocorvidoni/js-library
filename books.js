/* Set Up */

const booksTable = document.querySelector('tbody');
const formToggle = document.querySelector('#toggle-form');
const bookForm = document.querySelector('#book-form');
const myLibrary = [];

/* Logic */

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    const status = this.read
      ? 'You have read this book.'
      : "You haven't read this book yet.";
    return `${this.title} by ${this.author}. Pages: ${this.pages}. ${status}`;
  }

  readToggle() {
    this.read = !this.read;
  }
}

function saveLibrary() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Parses from local storage and makes build new Book objects.
function loadLibrary() {
  const books = JSON.parse(localStorage.getItem('myLibrary'));
  books.forEach(book => {
    myLibrary.push(new Book(...Object.values(book)));
  });
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
  saveLibrary();
  render();
}

function submitBook() {
  addBookToLibrary(
    bookForm.title.value,
    bookForm.author.value,
    bookForm.pages.value,
    bookForm.read.value,
  );
  bookForm.reset();
}

function removeBook() {
  const index = this.parentElement.dataset.bookId;
  myLibrary.splice(index, 1);
  saveLibrary();
  render();
}

function readBook() {
  const index = this.parentElement.dataset.bookId;
  const book = myLibrary[index];
  book.readToggle();
  saveLibrary();
  render();
}

/* Layout */

function clearTable() {
  booksTable.innerHTML = '';
}

function createBookCell(content) {
  const cell = document.createElement('td');
  const contentNode = document.createTextNode(content);
  cell.appendChild(contentNode);
  return cell;
}

function createRemoveButton() {
  const button = document.createElement('button');
  const text = document.createTextNode('X');
  button.classList.add('X');
  button.addEventListener('click', removeBook);
  button.appendChild(text);
  return button;
}

function createReadButton() {
  const button = document.createElement('button');
  const text = document.createTextNode('✓');
  button.classList.add('✓');
  button.addEventListener('click', readBook);
  button.appendChild(text);
  return button;
}

function createBookRow(book) {
  const row = document.createElement('tr');
  row.classList.add('book');
  row.setAttribute('data-book-id', myLibrary.indexOf(book));
  Object.values(book).forEach(property =>
    row.appendChild(createBookCell(property)),
  );
  row.appendChild(createRemoveButton());
  row.appendChild(createReadButton());
  return row;
}

function render() {
  clearTable();
  myLibrary.forEach(book => {
    const row = createBookRow(book);
    booksTable.appendChild(row);
  });
}

/* Form Validation */

/*  */

if (localStorage.getItem('myLibrary')) {
  loadLibrary();
} else {
  addBookToLibrary('Le Fantastique Totoret', 'Totoret', 5, true);
  addBookToLibrary('Voyage avec Pupe LéPu', 'Pupe', 784, false);
  addBookToLibrary('la conjura de los necios', 'toole', 500, true);
}

render();

formToggle.addEventListener('click', () => bookForm.classList.toggle('hidden'));
bookForm.addEventListener('submit', event => {
  event.preventDefault();
  if (bookForm.reportValidity()) submitBook();
});
