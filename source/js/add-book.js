/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-trailing-spaces */

const bookContainer = document.getElementById('book-store');
const form = document.getElementById('adding-book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookNav = document.getElementById('booklist');
const addBookNav = document.getElementById('addbook');
const contactNav = document.getElementById('contact');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateDisplay = document.getElementById('date');

let bookList = [];

class AwesomeBook {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  // Remove Button
  removeBook(btnAdderss, bookArray, btnIndex, parentDiv) {
    btnAdderss.addEventListener('click', () => {
      bookArray.splice(btnIndex, 1);
      localStorage.setItem('book', JSON.stringify(bookArray));
      parentDiv.remove();
      window.location.reload();
    });
  }

  // Adding Books
  addBook() {
    const bookData = JSON.parse(localStorage.getItem('book'));
    bookData.forEach((item, index) => {
      const bookDiv = document.createElement('div');
      const bookItem = document.createElement('p');
      const removeButton = document.createElement('button');
      bookItem.appendChild(document.createTextNode(`${item.title} by ${item.author}`));
      removeButton.setAttribute('class', 'remove');
      bookItem.setAttribute('class', 'book');
      bookDiv.setAttribute('class', 'book-card');
      removeButton.appendChild(document.createTextNode('Remove'));
      // Remove Button Logic
      this.removeBook(removeButton, bookData, index, bookDiv);
      bookDiv.append(bookItem, removeButton);
      bookContainer.appendChild(bookDiv);
    });
  }

  // Displaying Books
  displayBooks() {
    const book = {
      title: this.title.value,
      author: this.author.value,
    };
    bookList.push(book);
    localStorage.setItem('book', JSON.stringify(bookList));
    bookContainer.innerHTML = '';
    this.addBook();
    bookTitle.value = '';
    bookAuthor.value = '';
  }
}

function showDate() {
  const dateObj = new Date();
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDay();
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const secnod = dateObj.getSeconds();
  let amPM = null;
  if (hour >= 12) {
    amPM = 'PM';
  } else {
    amPM = 'AM';
  }
  dateDisplay.innerText = `${month} ${day}th ${year}, ${hour}:${minutes}:${secnod}${amPM}`;
}

const bookObj = new AwesomeBook(bookTitle, bookAuthor);

if (localStorage.getItem('book') !== null) {
  bookList = JSON.parse(localStorage.getItem('book'));
  bookObj.addBook();
}

setInterval(showDate, 1000);
// Add Button and create local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  bookObj.displayBooks();
});

// Navigation
bookNav.addEventListener('click', () => {
  document.getElementById('book-list').style.display = 'block';
  document.getElementById('add-book').style.display = 'none';
  document.getElementById('contact-section').style.display = 'none';
});

addBookNav.addEventListener('click', () => {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-book').style.display = 'block';
  document.getElementById('contact-section').style.display = 'none';
});

contactNav.addEventListener('click', () => {
  document.getElementById('book-list').style.display = 'none';
  document.getElementById('add-book').style.display = 'none';
  document.getElementById('contact-section').style.display = 'block';
});
