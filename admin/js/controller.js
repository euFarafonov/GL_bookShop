"use strict";

function Controller() {
    let model = new Model();
    let view = new View();
    
    let books = [];
    let authors = [];
    let genres = [];
    
    let page = (sessionStorage.getItem('page')) ? sessionStorage.getItem('page') : 'books';
    getPage(page);
    
    function getPage(page) {
        switch (page) {
            case 'books':
                model.getData('books')
                    .then(function(res){
                        books = res;
                        view.renderBooks(books);
                    })
                    .catch(function(err){
                        console.log('Bad url or another server error - ' + err);
                    });
            break;
            
            case 'addBook':
                view.renderAddBook();
            break;
            
            case 'editBook':
                let id = (arguments[1]) ? arguments[1] : sessionStorage.getItem('edit_id');
                
                model.getData('books', id)
                    .then(function(res) {
                        view.renderEditBook(res);
                    })
                    .catch(function(err){
                        console.log('Error');
                    });
            break;
            
            case 'authors':
                model.getData('authors')
                    .then(function(res){
                        authors = res;
                        view.renderAuthors(authors);
                    })
                    .catch(function(err){
                        console.log('Bad url or another server error - ' + err);
                    });
            break;
            
            case 'genres':
                model.getData('genres')
                    .then(function(res){
                        genres = res;
                        view.renderGenres(genres);
                    })
                    .catch(function(err){
                        console.log('Bad url or another server error - ' + err);
                    });
            break;
        }
    }
    
    const aside = document.getElementById('aside');
    const content = document.getElementById('content');
    
    /* Click on aside */
    aside.addEventListener('click', function(event) {
        let target = event.target;
        
        if (target.classList.contains('js_aside')) {
            let page = target.dataset.page;
            
            if (sessionStorage.getItem('page') === page) return false;
            
            sessionStorage.setItem('page', page);
            getPage(page);
        }
    });
    
    /* Click on content */
    content.addEventListener('click', function(event) {
        let target = event.target;
        
        if (target.classList.contains('js_add_book')) {
            let page = 'addBook';
            sessionStorage.setItem('page', page);
            getPage(page);
        }
        
        if (target.classList.contains('js_add')) {
            model.getData('books')
                .then(function(res) {
                    books = res;
                    if (model.addBook(books)) {
                        let page = 'books';
                        sessionStorage.setItem('page', page);
                        getPage(page);
                    }
                })
                .catch(function(err){
                    console.log('Error adding book');
                });
        }
        
        if (target.classList.contains('js_edit_book')) {
            let page = 'editBook';
            let id = target.dataset.id;
            sessionStorage.setItem('page', page);
            sessionStorage.setItem('edit_id', id);
            getPage(page, id);
        }
        
        if (target.classList.contains('js_edit')) {
            let id = target.dataset.id;
            
            model.getData('books')
                .then(function(res) {
                    books = res;
                    if (model.editBook(books, id)) {
                        let page = 'books';
                        sessionStorage.setItem('page', page);
                        getPage(page);
                    }
                })
                .catch(function(err){
                    console.log('Error editing book');
                });
        }
        
        if (target.classList.contains('js_del_book')) {
            if(!confirm("Confirm removal")) return false;
            
            let id = target.dataset.id;
            
            model.getData('books')
                .then(function(res) {
                    books = res;
                    if (model.delBook(books, id)) {
                        getPage(page);
                    }
                })
                .catch(function(err){
                    console.log('Error delete book');
                });
        }
    });
}