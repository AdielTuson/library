const myLibrary = [];
const booksSection = document.querySelector('.books-section');
const addBookBtn = document.querySelector('#add-book-btn');
const bookDialog = document.querySelector('#add-book-dialog');
const bookForm = document.querySelector('.add-book-form');
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

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function resetBookSection() {
    booksSection.textContent = '';
}

function displayBooks(bookLibrary) {
    resetBookSection();
    for (const book of bookLibrary) {
        console.log(book);
        const bookCard = document.createElement('div');
        const titleParagraph = document.createElement('p');
        const authorParagraph = document.createElement('p');
        const pagesParagraph = document.createElement('p');

        titleParagraph.textContent = book.title;
        authorParagraph.textContent = book.author;
        pagesParagraph.textContent = book.pages;

        bookCard.appendChild(titleParagraph);
        bookCard.appendChild(authorParagraph);
        bookCard.appendChild(pagesParagraph);

        bookCard.classList.add('book-card');
        booksSection.appendChild(bookCard);
    }
} 

//Display dialog
addBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

//Fetch form data
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const bookPages = document.querySelector('#pages').value;
    const readBookBtn = document.querySelector('#have-read-btn').value;

    const newBook = new Book(bookTitle, bookAuthor, bookPages, readBookBtn);
    addBookToLibrary(newBook);
    displayBooks(myLibrary);
    bookDialog.close();
})