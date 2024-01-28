const myLibrary = [];
const booksSection = document.querySelector('.books-section');
const addBookBtn = document.querySelector('#add-book-btn');
const bookDialog = document.querySelector('#add-book-dialog');
const bookForm = document.querySelector('.add-book-form');
const submitBtn = document.getElementById('submit-btn');
const closeFormBtn = document.querySelector('.close-form-btn');
const notReadColor = getComputedStyle(document.documentElement).getPropertyValue('--not-read-color')

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

function removeBookFromLibrary(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
}

function resetBookSection() {
    booksSection.textContent = '';
}

function displayBooks() {
    resetBookSection();
    let index = 0;
    for (const book of myLibrary) {
        const bookCard = document.createElement('div');
        const titleParagraph = document.createElement('p');
        const authorParagraph = document.createElement('p');
        const pagesParagraph = document.createElement('p');
        const readBookBtn = document.createElement('button');
        const removeBookBtn = document.createElement('button');


        titleParagraph.textContent = `"${book.title}"`;
        authorParagraph.textContent = book.author;
        pagesParagraph.textContent = book.pages + ' pages';
        removeBookBtn.textContent = 'Remove';


        toggleReadBtn(readBookBtn, book);
        updateReadBookBtn(readBookBtn,book);
        
        
        bookCard.appendChild(titleParagraph);
        bookCard.appendChild(authorParagraph);
        bookCard.appendChild(pagesParagraph);
        bookCard.appendChild(readBookBtn);
        bookCard.appendChild(removeBookBtn)

        bookCard.classList.add('book-card');
        booksSection.appendChild(bookCard);

        //Give each book it's index in myLibrary to enable it's deletion
        book.libraryIndex = index;
        clickRemoveBook(removeBookBtn, book);

        index++;
    }
} 
// Add a toggle read function to book prototype
Book.prototype.toggleRead = function() {
    this.haveRead = !this.haveRead;
    displayBooks();
}

//Will check for an event listener on toggle read book button
function toggleReadBtn(button, book) {
    button.addEventListener('click', () => {
        book.toggleRead(book.haveRead);
    });
}

//Will check for an event listener on remove book button
function clickRemoveBook(button, book){
    button.addEventListener('click', () => {
        removeBookFromLibrary(book.libraryIndex);
    });
}

function updateReadBookBtn(button, book) {
    if(book.haveRead === true) {
        button.textContent = 'Read';
        button.style.backgroundColor = 'green';
    }

    else {
        button.textContent = 'Not Read';
        button.style.backgroundColor = notReadColor;
    }
}

//Display dialog
addBookBtn.addEventListener('click', () => {
    bookDialog.showModal();
});

//Fetch form data
bookForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const bookPages = document.querySelector('#pages').value;
    const readBookBtn = document.querySelector('#have-read-btn').checked;
    const newBook = new Book(bookTitle, bookAuthor, bookPages, readBookBtn);

    addBookToLibrary(newBook);
    displayBooks(myLibrary);
    bookDialog.close();
    bookForm.reset();
})

closeFormBtn.addEventListener('click', ()=> {
    bookDialog.close();
})