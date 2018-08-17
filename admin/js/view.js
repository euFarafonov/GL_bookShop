"use strict";

function View() {
    this.renderBooks = function(books) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        contentHeader.innerText = 'Books catalog';
        content.appendChild(contentHeader);
        
        const addBtn = document.createElement('span');
        addBtn.className = 'button js_add_book';
        addBtn.innerText = 'Add book';
        content.appendChild(addBtn);
        
        // table
        const booksTable = document.createElement('table');
        booksTable.className = 'pages_table';
        
        // tr head
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
        
        // tr body
        let booksCnt = books.length;
        
        if (booksCnt) {
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
                
                let btnEdit = document.createElement('span');
                btnEdit.innerText = 'Edit';
                btnEdit.className = 'button edit js_edit_book';
                btnEdit.dataset.id = books[i]['id'];
                tdDetail.appendChild(btnEdit);
                
                let btnDel = document.createElement('span');
                btnDel.innerText = 'Delete';
                btnDel.className = 'button del js_del_book';
                btnDel.dataset.id = books[i]['id'];
                tdDetail.appendChild(btnDel);
                
                tr.appendChild(tdDetail);
                booksTable.appendChild(tr);
            }
        }
        
        content.appendChild(booksTable);
    }
    
    this.renderAuthors = function(authors) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        contentHeader.innerText = 'Book authors';
        content.appendChild(contentHeader);
        
        // table
        const authorsTable = document.createElement('table');
        authorsTable.className = 'pages_table';
        
        // tr head
        let trHead = document.createElement('tr');
        
        let thNumb = document.createElement('th');
        thNumb.innerText = '№';
        trHead.appendChild(thNumb);
        
        let thAuthor = document.createElement('th');
        thAuthor.innerText = 'Author';
        trHead.appendChild(thAuthor);
        
        authorsTable.appendChild(trHead);
        
        // tr body
        let authorsCnt = authors.length;
        
        if (authorsCnt) {
            for (let i = 0; i < authorsCnt; i++) {
                let tr = document.createElement('tr');
                
                let tdNumb = document.createElement('td');
                tdNumb.innerText = i + 1;
                tr.appendChild(tdNumb);
                
                let td = document.createElement('td');
                td.innerText = authors[i]['author'];
                tr.appendChild(td);
                
                authorsTable.appendChild(tr);
            }
        }
        
        content.appendChild(authorsTable);
    }
    
    this.renderGenres = function(genres) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        contentHeader.innerText = 'Book genre';
        content.appendChild(contentHeader);
        
        // table
        const genresTable = document.createElement('table');
        genresTable.className = 'pages_table';
        
        // tr head
        let trHead = document.createElement('tr');
        
        let thNumb = document.createElement('th');
        thNumb.innerText = '№';
        trHead.appendChild(thNumb);
        
        let thGenre = document.createElement('th');
        thGenre.innerText = 'Genre';
        trHead.appendChild(thGenre);
        
        genresTable.appendChild(trHead);
        
        // tr body
        let genresCnt = genres.length;
        
        if (genresCnt) {
            for (let i = 0; i < genresCnt; i++) {
                let tr = document.createElement('tr');
                
                let tdNumb = document.createElement('td');
                tdNumb.innerText = i + 1;
                tr.appendChild(tdNumb);
                
                let td = document.createElement('td');
                td.innerText = genres[i]['genre'];
                tr.appendChild(td);
                
                genresTable.appendChild(tr);
            }
        }
        
        content.appendChild(genresTable);
    }
    
    this.renderAddBook = function() {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        contentHeader.innerText = 'New book';
        content.appendChild(contentHeader);
        
        // table
        const table = document.createElement('table');
        table.className = 'pages_table';
        
        let template = ["name", "author", "genre", "pages", "price"];
        let len = template.length;
        
        for (let i = 0; i < len; i++) {
            let tr = document.createElement('tr');
            
            let tdName = document.createElement('td');
            let text = template[i][0].toUpperCase() + template[i].slice(1);
            tdName.innerText = text;
            tr.appendChild(tdName);
            
            let tdValue = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'text';
            input.dataset.name = template[i];
            tdValue.appendChild(input);
            tr.appendChild(tdValue);
            
            table.appendChild(tr);
        }
        
        content.appendChild(table);
        
        let addBtn = document.createElement('span');
        addBtn.className = 'button js_add';
        addBtn.innerText = 'Add book';
        content.appendChild(addBtn);
    }
    
    this.renderEditBook = function(book) {
        const content = document.getElementById('content');
        content.innerHTML = '';
        
        const contentHeader = document.createElement('h1');
        contentHeader.innerText = 'Edit book';
        content.appendChild(contentHeader);
        
        // table
        const table = document.createElement('table');
        table.className = 'pages_table';
        
        for (let prop in book) {
            if (prop != 'id') {
                let tr = document.createElement('tr');
                
                let tdName = document.createElement('td');
                let text = prop[0].toUpperCase() + prop.slice(1);
                tdName.innerText = text;
                tr.appendChild(tdName);
                
                let tdValue = document.createElement('td');
                let input = document.createElement('input');
                input.type = 'text';
                input.dataset.name = prop;
                input.value = book[prop];
                if (prop == 'price') input.setAttribute('readonly', 'readonly') 
                tdValue.appendChild(input);
                tr.appendChild(tdValue);
                
                table.appendChild(tr);
            }
        }
        
        content.appendChild(table);
        
        let editBtn = document.createElement('span');
        editBtn.className = 'button js_edit';
        editBtn.innerText = 'Edit book';
        editBtn.dataset.id = book['id'];
        content.appendChild(editBtn);
    }
}