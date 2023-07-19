// book class: represents a book
class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CLASS: HANDLE UI Tasks
class UI{
    static displayBooks(){
        const books = store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class ="btn btn-danger btn-sm 
        delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // vanish in 3 seconds
        setTimeout(() =>  document.querySelector('.alert').remove(), 3000);

    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// STORE CLASS: HANDLES STORAGE
class store {
   static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [] ;
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books)); 
    }

}


// EVENT: DISPLAY BOOKS
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//EVENT: ADD A BOOK
document.querySelector('#book-form').addEventListener('submit', (e)=> {
    // prevent actual submit
    e.preventDefault();
    // Get FORM VALUES
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const isbn = document.querySelector('#isbn').value;

    // VAlidate 
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('please fill in all fields', 'danger');
    }else{

    //Instatiate book
    const book = new Book(title, author, isbn);
    
    // Add Book to UI 
    UI.addBookToList(book);

    // Add book to store
    store.addBook(book);

    // show success message 
    UI.showAlert('Book Added', 'success');

    // clear fields 
    UI.clearFields();

    }
});

// EVENT: REMOVE A  BOOK 
document.querySelector('#book-list').addEventListener('click', (e) => {

    // remove book from UI
    UI.deleteBook(e.target);

    // remove book from store 
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    
    // show success message 
    UI.showAlert('Book Removed', 'success');
})






























