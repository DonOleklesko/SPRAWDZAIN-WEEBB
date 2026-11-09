"use strict";
var Sklep;
(function (Sklep) {
    class ShoppingItem {
        constructor(id, name, quantity, bought = false) {
            this.id = id;
            this.name = name;
            this.quantity = quantity;
            this.bought = bought;
        }
        toggle() {
            this.bought = !this.bought;
        }
        render() {
            const div = document.createElement('div');
            div.className = 'item';
            if (this.bought)
                div.style.textDecoration = 'line-through';
            const span = document.createElement('span');
            span.textContent = `${this.name} - ilość: ${this.quantity}`;
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Zmień stan';
            toggleBtn.className = 'toggle-btn';
            toggleBtn.dataset.id = this.id.toString();
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Usuń';
            deleteBtn.className = 'delete-btn';
            deleteBtn.dataset.id = this.id.toString();
            div.append(span, toggleBtn, deleteBtn);
            return div;
        }
    }
    Sklep.ShoppingItem = ShoppingItem;
})(Sklep || (Sklep = {}));
var Sklep;
(function (Sklep) {
    class ShoppingList {
        constructor() {
            this.items = [];
            this.nextId = 1;
        }
        add(name, quantity) {
            const trimmedName = name.trim();
            const existing = this.items.find(item => item.name.toLowerCase() === trimmedName.toLowerCase());
            if (existing) {
                existing.quantity += quantity;
                return existing;
            }
            const newItem = new Sklep.ShoppingItem(this.nextId, trimmedName, quantity);
            this.nextId++;
            this.items.push(newItem);
            return newItem;
        }
        remove(id) {
            this.items = this.items.filter(item => item.id !== id);
        }
        getById(id) {
            return this.items.find(item => item.id === id);
        }
        toggle(id) {
            const item = this.getById(id);
            if (item)
                item.toggle();
        }
        countRemaining() {
            return this.items.filter(item => !item.bought).length;
        }
        getFiltered(filter) {
            if (filter === "toBuy")
                return this.items.filter(item => !item.bought);
            if (filter === "bought")
                return this.items.filter(item => item.bought);
            return [...this.items];
        }
    }
    Sklep.ShoppingList = ShoppingList;
})(Sklep || (Sklep = {}));
var Sklep;
(function (Sklep) {
    const list = new Sklep.ShoppingList();
    const nameInput = document.getElementById('nameInput');
    const quantityInput = document.getElementById('quantityInput');
    const addButton = document.getElementById('addButton');
    const errorMessage = document.getElementById('errorMessage');
    const filterSelect = document.getElementById('filterSelect');
    const listContainer = document.getElementById('listContainer');
    const counter = document.getElementById('counter');
    function refreshView() {
        listContainer.innerHTML = '';
        const filter = filterSelect.value;
        const filteredItems = list.getFiltered(filter);
        filteredItems.forEach(item => {
            listContainer.appendChild(item.render());
        });
        counter.textContent = `Do kupienia: ${list.countRemaining()}`;
    }
    addButton.addEventListener('click', () => {
        const name = nameInput.value;
        const qText = quantityInput.value;
        const error = Sklep.validateItem(name, qText);
        if (error) {
            errorMessage.textContent = error;
            return;
        }
        errorMessage.textContent = '';
        list.add(name, Number(qText));
        nameInput.value = '';
        quantityInput.value = '';
        refreshView();
    });
    filterSelect.addEventListener('change', () => {
        refreshView();
    });
    listContainer.addEventListener('click', (e) => {
        const target = e.target;
        const id = Number(target.dataset.id);
        if (target.classList.contains('delete-btn')) {
            list.remove(id);
            refreshView();
        }
        else if (target.classList.contains('toggle-btn')) {
            list.toggle(id);
            refreshView();
        }
    });
    // Inicjalizacja na starcie
    refreshView();
})(Sklep || (Sklep = {}));
var Sklep;
(function (Sklep) {
    function validateItem(name, quantityText) {
        const trimmedName = name.trim();
        if (trimmedName.length < 2 || trimmedName.length > 30) {
            return "Nazwa musi mieć od 2 do 30 znaków.";
        }
        if (quantityText.trim() === '') {
            return "Ilość nie może być pusta.";
        }
        const quantity = Number(quantityText);
        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            return "Ilość musi być liczbą całkowitą od 1 do 99.";
        }
        return null;
    }
    Sklep.validateItem = validateItem;
})(Sklep || (Sklep = {}));
