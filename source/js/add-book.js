const bookContainer = document.getElementById('book-store');
const form = document.getElementById('adding-book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const addBtn = document.getElementById('add-btn');
const bookList = [];

// Adding Books
function addBook(e) {
    const bookData = JSON.parse(localStorage.getItem('book'));
    bookData.forEach((item, index) => {
        const bookDiv = document.createElement('div');
        const bookItem = document.createElement('p');
        const removeButton = document.createElement('button');
        bookItem.appendChild(document.createTextNode(`${item.title} by ${item.author}`));
        removeButton.setAttribute('class','remove');
        removeButton.appendChild(document.createTextNode('remove'));
        bookDiv.append(bookItem, removeButton);
        bookContainer.appendChild(bookDiv);
    });
}

if (localStorage.getItem('book') !== null) {
    addBook();
}

// Add Button and create local storage
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const book = {
        title: bookTitle.value,
        author: bookAuthor.value,
    }
    bookList.push(book); 
    localStorage.setItem('book', JSON.stringify(bookList));
    bookContainer.innerHTML = '';
    addBook();
    bookTitle.value = '';
    bookAuthor.value = '';
});


