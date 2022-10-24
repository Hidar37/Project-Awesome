/* eslint-disable no-trailing-spaces */

const bookContainer = document.getElementById('book-store');
const form = document.getElementById('adding-book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
// const addBtn = document.getElementById('add-btn');
let bookList = [];

// Adding Books
function addBook() {
  const bookData = JSON.parse(localStorage.getItem('book'));
  bookData.forEach((item, index) => {
    const bookDiv = document.createElement('div');
    const bookItem = document.createElement('p');
    const removeButton = document.createElement('button');
    bookItem.appendChild(document.createTextNode(`${item.title} by ${item.author}`));
    removeButton.setAttribute('class', 'remove');
    removeButton.appendChild(document.createTextNode('remove'));
    // Remove Button Logic
    removeButton.addEventListener('click', () => {
      bookData.splice(index, 1);
      localStorage.setItem('book', JSON.stringify(bookData));
      bookDiv.remove();
      window.location.reload();
    });
    
    bookDiv.append(bookItem, removeButton);
    bookContainer.appendChild(bookDiv);
  });
}

if (localStorage.getItem('book') !== null) {
  bookList = JSON.parse(localStorage.getItem('book'));
  addBook();
}

// Add Button and create local storage
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = {
    title: bookTitle.value,
    author: bookAuthor.value,
  };
  bookList.push(book);
  localStorage.setItem('book', JSON.stringify(bookList));
  bookContainer.innerHTML = '';
  addBook();
  bookTitle.value = '';
  bookAuthor.value = '';
});
