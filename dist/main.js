import ShoppingList from './ShoppingList.js';
import { validateItem } from './validation.js';
const list = new ShoppingList();
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
    counter.textContent = `do kupienia: ${list.countRemaining()}`;
}
addButton.addEventListener('click', () => {
    const name = nameInput.value;
    const qText = quantityInput.value;
    const error = validateItem(name, qText);
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
    if (target.classList.contains('delete-button')) {
        list.remove(id);
        refreshView();
    }
    else if (target.classList.contains('toggle-buton')) {
        list.toggle(id);
        refreshView();
    }
});
refreshView();
