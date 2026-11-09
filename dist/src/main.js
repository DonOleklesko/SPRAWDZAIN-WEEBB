"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ShoppingList_js_1 = __importDefault(require("./ShoppingList.js"));
const validation_js_1 = require("./validation.js");
const list = new ShoppingList_js_1.default();
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
    const error = (0, validation_js_1.validateItem)(name, qText);
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
refreshView();
