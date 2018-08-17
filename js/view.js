"use strict";

function View() {
    this.renderContent = function(books, filter, name) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        let headerText = 'Books catalog';
        if (arguments.length === 3) headerText += ' (' + filter + ' - ' + name + ')';
        contentHeader.innerText = headerText;
        content.appendChild(contentHeader);
        
        let booksCnt = books.length;
        
        if (!booksCnt) {
            const booksNotFound = document.createElement('div');
            booksNotFound.innerText = 'Books not found!';
            booksNotFound.className = 'not_info';
            content.appendChild(booksNotFound);
        } else {
            const booksTable = document.createElement('table');
            booksTable.className = 'books_table';
            
            /* tr Head */
            let trHead = document.createElement('tr');
            
            let thNumb = document.createElement('th');
            thNumb.innerText = '№';
            trHead.appendChild(thNumb);
            
            let booksProp = Object.keys(books[0]);
            for (let i = 0; i < booksProp.length; i++) {
                if (booksProp[i] === 'id') continue; 
                
                let th = document.createElement('th');
                let thText = '';
                
                switch(booksProp[i]) {
                    case "name":
                        thText = 'Book title';
                    break;
                    case "author":
                        thText = 'Book author';
                    break;
                    case "genre":
                        thText = 'Book genre';
                    break;
                    case "pages":
                        thText = 'Number of pages';
                    break;
                    case "price":
                        thText = 'Price, $';
                    break;
                }
                
                th.innerText = thText;
                trHead.appendChild(th);
            }
            
            let thDetails = document.createElement('th');
            thDetails.innerText = '';
            trHead.appendChild(thDetails);
            
            booksTable.appendChild(trHead);
            /* end tr Head */
            
            for (let i = 0; i < booksCnt; i++) {
                let tr = document.createElement('tr');
                
                let tdNumb = document.createElement('td');
                tdNumb.innerText = i + 1;
                tr.appendChild(tdNumb);
                
                for (let prop in books[i]) {
                    if (prop === 'id') continue;
                    let td = document.createElement('td');
                    td.innerText = books[i][prop];
                    tr.appendChild(td);
                }
                
                let tdDetail = document.createElement('td');
                tdDetail.innerText = 'Details';
                tdDetail.className = 'link js_details';
                tdDetail.dataset.id = books[i]['id'];
                tr.appendChild(tdDetail);
                
                booksTable.appendChild(tr);
            }
            
            content.appendChild(booksTable);
        }
    }
    
    this.renderAside = function(authors, genres) {
        const listAuthors = document.getElementById('authors');
        const listGenres = document.getElementById('genres');
        
        /* List Authors */
        const divAuthor = document.createElement('div');
        divAuthor.className = 'nav_header js_nav';
        divAuthor.innerText = 'Authors';
        listAuthors.appendChild(divAuthor);
        
        const ulAuthor = document.createElement('ul');
        ulAuthor.className = 'nav_inner';
        
        for (let i = 0; i < authors.length; i++) {
            const li = document.createElement('li');
            li.innerText = authors[i];
            li.className = 'js_inner_li';
            li.dataset.name = 'author';
            ulAuthor.appendChild(li);
        }
        
        listAuthors.appendChild(ulAuthor);
        
        /* List Genres */
        const divGenres = document.createElement('div');
        divGenres.className = 'nav_header js_nav';
        divGenres.innerText = 'Genres';
        listGenres.appendChild(divGenres);
        
        const ulGenres = document.createElement('ul');
        ulGenres.className = 'nav_inner';
        
        for (let i = 0; i < genres.length; i++) {
            const li = document.createElement('li');
            li.innerText = genres[i];
            li.className = 'js_inner_li';
            li.dataset.name = 'genre';
            ulGenres.appendChild(li);
        }
        
        listGenres.appendChild(ulGenres);
    }
    
    this.renderContentOne = function(book) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        contentHeader.innerText = book['name'];
        content.appendChild(contentHeader);
        
        const bookWrap = document.createElement('div');
        bookWrap.className = 'book_wrap';
        
        const bookAuthor = document.createElement('div');
        bookAuthor.innerText = 'Author: ' + book['author'];
        bookWrap.appendChild(bookAuthor);
        
        const bookGenre = document.createElement('div');
        bookGenre.innerText = 'Genre: ' + book['genre'];
        bookWrap.appendChild(bookGenre);
        
        const bookPages = document.createElement('div');
        bookPages.innerText = 'Number of pages: ' + book['pages'];
        bookWrap.appendChild(bookPages);
        
        const bookPrice = document.createElement('div');
        bookPrice.innerText = 'Price: ' + book['price'] + '$';
        bookWrap.appendChild(bookPrice);
        
        content.appendChild(bookWrap);
        
        const bookOrder = document.createElement('button');
        bookOrder.type = 'button';
        bookOrder.innerText = 'Order book';
        bookOrder.className = 'book_order js_order';
        content.appendChild(bookOrder);
    }
} 