"use strict";

function Model() {
    this.sendRequest = function(url) {
        return new Promise(function(resolve, reject){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'json';
            xhr.send();
            xhr.addEventListener('load', function(){
                if (xhr.status < 400) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.statusText);
                }
            });
        });
    }
    
    this.getAuthors = function(books) {
        let authors = [];
        const booksCnt = books.length;
        
        for (let i = 0; i < booksCnt; i++) {
            if (authors.indexOf(books[i].author) === -1) {
                authors.push(books[i].author);
            }
        }
        
        return authors;
    }
    
    this.getGenres = function(books) {
        let genres = [];
        const booksCnt = books.length;
        
        for (let i = 0; i < booksCnt; i++) {
            if (genres.indexOf(books[i].genre) === -1) {
                genres.push(books[i].genre);
            }
        }
        
        return genres;
    }
    
    this.getFilterBooks = function(books, filter, name) {
        let booksFilter = [];
        const booksCnt = books.length;
        
        for (let i = 0; i < booksCnt; i++) {
            if (books[i][filter] === name) {
                booksFilter.push(books[i]);
            }
        }
        
        return booksFilter;
    }
    
    this.getBookOnId = function(books, bookId) {
        const booksCnt = books.length;
        
        for (let i = 0; i < booksCnt; i++) {
            if (books[i]['id'] == bookId) return books[i];
        }
    }
}