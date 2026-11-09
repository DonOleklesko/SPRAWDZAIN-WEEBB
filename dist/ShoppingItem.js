export default class ShoppingItem {
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
        if (this.bought) {
            div.style.textDecoration = 'line-through';
            div.style.opacity = '0.6';
        }
        const span = document.createElement('span');
        span.textContent = `${this.name} - ilość: ${this.quantity}`;
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Zmień';
        toggleBtn.className = 'toggle-button';
        toggleBtn.dataset.id = this.id.toString();
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń';
        deleteBtn.className = 'delete-button';
        deleteBtn.dataset.id = this.id.toString();
        div.append(span, toggleBtn, deleteBtn);
        return div;
    }
}
