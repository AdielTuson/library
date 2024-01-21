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
        console.log(book);
        const bookCard = document.createElement('div');
        const titleParagraph = document.createElement('p');
        const authorParagraph = document.createElement('p');
        const pagesParagraph = document.createElement('p');
        const readBookBtn = document.createElement('button');
        const removeBookBtn = document.createElement('button');


        titleParagraph.textContent = book.title;
        authorParagraph.textContent = book.author;
        pagesParagraph.textContent = book.pages;
        removeBookBtn.textContent = 'Remove';
            console.log(book.haveRead)


        readBookBtn.addEventListener('click', () => {
            book.toggleRead(book.haveRead);
        })

        if(book.haveRead === true) {
            readBookBtn.textContent = 'Read';
            readBookBtn.style.backgroundColor = 'green';
        }

        else {
            readBookBtn.textContent = 'Not Read';
            readBookBtn.style.backgroundColor = 'red';
        }

        
        bookCard.appendChild(titleParagraph);
        bookCard.appendChild(authorParagraph);
        bookCard.appendChild(pagesParagraph);
        bookCard.appendChild(readBookBtn);
        bookCard.appendChild(removeBookBtn)

        bookCard.classList.add('book-card');
        booksSection.appendChild(bookCard);

        //Give each book it's index in myLibrary to enable it's deletion
        book.libraryIndex = index;
        removeBookBtn.addEventListener('click', () => {
            removeBookFromLibrary(book.libraryIndex);
        });

        index++;
    }
} 

Book.prototype.toggleRead = function() {
    if (this.haveRead === true) {
        this.haveRead = false;
    }

    else {
        this.haveRead = true;
    }
    console.log(this.haveRead);
    displayBooks();
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
        console.log(readBookBtn);
    const newBook = new Book(bookTitle, bookAuthor, bookPages, readBookBtn);

    addBookToLibrary(newBook);
    displayBooks(myLibrary);
    bookDialog.close();
})