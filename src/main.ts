import ShoppingList, { ItemFilter } from './ShoppingList.js';
import { validateItem } from './validation.js';

const list = new ShoppingList();

const nameInput = document.getElementById('nameInput') as HTMLInputElement;
const quantityInput = document.getElementById('quantityInput') as HTMLInputElement;
const addButton = document.getElementById('addButton') as HTMLButtonElement;
const errorMessage = document.getElementById('errorMessage') as HTMLElement;
const filterSelect = document.getElementById('filterSelect') as HTMLSelectElement;
const listContainer = document.getElementById('listContainer') as HTMLElement;
const counter = document.getElementById('counter') as HTMLElement;

function refreshView(): void {
    listContainer.innerHTML = '';

    const filter = filterSelect.value as ItemFilter;
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
    const target = e.target as HTMLElement;
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