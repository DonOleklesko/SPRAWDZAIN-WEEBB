"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (this.bought) {
            div.style.textDecoration = 'line-through';
        }
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
exports.default = ShoppingItem;
