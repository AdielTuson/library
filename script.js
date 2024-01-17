const myLibrary = [];
const booksSection = document.querySelector('.books-section');
const addBookBtn = document.querySelector('#add-book-btn');
const bookDialog = document.querySelector('#add-book-dialog');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const readBookBtn = document.querySelector('#have-read-btn');
const submitBtn = document.getElementById('submit-btn');


function Book(title, author, pages, haveRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function (){
        return (title + ', ' + author + ', ' + pages + ', ' + haveRead)
    }
}

//Code for visualizing
const firstBook = new Book('Lord of the rings', 'J.R.R Martin', 900, 'Have read');
const secondBook = new Book('Aragorn', 'Some kid', 500, 'Have read');

addBookToLibrary(firstBook);
addBookToLibrary(secondBook);
console.log(myLibrary)


function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks(bookLibrary) {
    for (const book of bookLibrary) {
        console.log(book);
        const bookCard = document.createElement('div');
        bookCard.textContent = book.info();
        bookCard.classList.add('book-card');
        booksSection.appendChild(bookCard);
    }
} 
displayBooks(myLibrary);

//Display dialog
addBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});