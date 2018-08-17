"use strict";

function Model() {
    this.getData = function(item, id) {
        return new Promise(function(resolve, reject){
            if (localStorage.getItem(item)) {
                let data = JSON.parse(localStorage.getItem(item));
                
                if (!id) {
                    resolve(data);
                } else {
                    for (let i = 0, len = data.length; i < len; i++) {
                        if (data[i]['id'] == id) resolve(data[i]);
                    }
                }
            } else {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', '../../data/'+item+'.json');
                xhr.responseType = 'json';
                xhr.send();
                
                xhr.addEventListener('load', function(){
                    if (xhr.status < 400) {
                        localStorage.setItem(item, JSON.stringify(xhr.response));
                        let data = resolve(xhr.response);
                        
                        if (!id) {
                            resolve(data);
                        } else {
                            for (let i = 0, len = data.length; i < len; i++) {
                                if (data[i]['id'] == id) resolve(data[i]);
                            }
                        }
                    } else {
                        reject(xhr.statusText);
                    }
                });
            }
        });
    }
    
    this.addBook = function(books) {
        let book = {};
        
        let id = new Date().getTime();
        let name = document.querySelector('.pages_table input[data-name="name"]').value;
        let author = document.querySelector('.pages_table input[data-name="author"]').value;
        let genre = document.querySelector('.pages_table input[data-name="genre"]').value;
        let pages = document.querySelector('.pages_table input[data-name="pages"]').value;
        let price = document.querySelector('.pages_table input[data-name="price"]').value;
        
        if (name == '' || author == '' || pages == '' || price == '') {
            alert('There are empty fields');
            return false;
        }
        
        book['id'] = id;
        book['name'] = name;
        book['author'] = author;
        book['genre'] = genre;
        book['pages'] = pages;
        book['price'] = price;
        
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
        return true;
    }
    
    this.editBook = function(books, id) {
        let name = document.querySelector('.pages_table input[data-name="name"]').value;
        let author = document.querySelector('.pages_table input[data-name="author"]').value;
        let genre = document.querySelector('.pages_table input[data-name="genre"]').value;
        let pages = document.querySelector('.pages_table input[data-name="pages"]').value;
        
        if (name == '' || author == '' || genre == '' || pages == '') {
            alert('There are empty fields');
            return false;
        }
        
        for (let i = 0, len = books.length; i < len; i++) {
            if (books[i]['id'] == id) {
                books[i]['name'] = name;
                books[i]['author'] = author;
                books[i]['genre'] = genre;
                books[i]['pages'] = pages;
                
                localStorage.setItem('books', JSON.stringify(books));
                return true;
            }
        }
    }
    
    this.delBook = function(books, id) {
        for (let i = 0, len = books.length; i < len; i++) {
            if (books[i]['id'] == id) {
                books.splice(i, 1);
                
                localStorage.setItem('books', JSON.stringify(books));
                return true;
            }
        }
    }
}