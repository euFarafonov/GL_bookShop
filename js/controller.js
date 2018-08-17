"use strict";

function Controller() {
    let model = new Model();
    let view = new View();
    
    let books = [];
    let authors = [];
    let genres = [];
    
    model.sendRequest('/data/books.json')
        .then(function(res){
            books = res;
        })
        .then(function(res){
            authors = model.getAuthors(books);
            genres = model.getGenres(books);
            view.renderAside(authors, genres);
        })
        .then(function(res){
            let filterStorage = sessionStorage.getItem('filter');
            let valueStorage = sessionStorage.getItem('value');
            
            if (filterStorage && valueStorage) {
                if (filterStorage === 'book') {
                    let book = model.getBookOnId(books, valueStorage);
                    view.renderContentOne(book);
                } else {
                    let booksFilter = model.getFilterBooks(books, filterStorage, valueStorage);
                    view.renderContent(booksFilter, filterStorage, valueStorage);
                    
                    let navLiArr = document.querySelectorAll('[data-name="'+filterStorage+'"]');
                    for (let i = 0; i < navLiArr.length; i++) {
                        if (navLiArr[i].textContent === valueStorage) {
                            navLiArr[i].classList.add('nav_active');
                            navLiArr[i].parentElement.classList.add('nav_inner_active');
                        }
                    }
                }
            } else {
                view.renderContent(books);
            }
        })
        .catch(function(err){
            console.log('Bad url or another server error - ' + err);
        });
    
    const aside = document.getElementById('aside');
    const content = document.getElementById('content');
    
    /* Click on aside */
    aside.addEventListener('click', function(event) {
        let target = event.target;
        
        if (target.classList.contains('js_nav')) {
            let navInner = target.nextElementSibling;
            let itemOpen = navInner.classList.contains('nav_inner_active');
            
            closeAllInner();
            
            if (!itemOpen) {
                navInner.classList.add('nav_inner_active');
            }
        }
        
        if (target.classList.contains('js_inner_li')) {
            if (target.classList.contains('nav_active')) return false;
            
            let filter = target.dataset.name;
            let name = target.textContent;
            
            sessionStorage.setItem('filter', filter);
            sessionStorage.setItem('value', name);
            
            let booksFilter = model.getFilterBooks(books, filter, name);
            view.renderContent(booksFilter, filter, name);
            
            let oldActiveLi = this.querySelector('.nav_active');
            if (oldActiveLi) oldActiveLi.classList.remove('nav_active');
            target.classList.add('nav_active');
        }
        
        if (target.classList.contains('js_home')) {
            clearAside();
            view.renderContent(books);
        }
    });
    
    /* Click on content */
    content.addEventListener('click', function(event) {
        let target = event.target;
        
        if (target.classList.contains('js_details')) {
            let bookId = target.dataset.id;
            let book = model.getBookOnId(books, bookId);
            
            clearAside();
            
            sessionStorage.setItem('filter', 'book');
            sessionStorage.setItem('value', bookId);
            
            view.renderContentOne(book);
        }
        
        if (target.classList.contains('js_order')) {
            alert('Тут должна быть функция заказа книги');
        }
    });
    
    function closeAllInner() {
        var arrInner = document.querySelectorAll('.nav_inner_active');
        
        if (arrInner) {
            for (let i = 0; i < arrInner.length; i++) {
                arrInner[i].classList.remove('nav_inner_active');
            }
        }
    }
    
    function hideAllActive() {
        var arrActive = document.querySelectorAll('.nav_active');
        
        if (arrActive) {
            for (let i = 0; i < arrActive.length; i++) {
                arrActive[i].classList.remove('nav_active');
            }
        }
    }
    
    function clearAside() {
        closeAllInner();
        hideAllActive();
        sessionStorage.clear();
    }
}