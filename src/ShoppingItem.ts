export default class ShoppingItem {
    constructor(
        public id: number,
        public name: string,
        public quantity: number,
        public bought: boolean = false
    ) {}

    toggle(): void {
        this.bought = !this.bought;
    }

    render(): HTMLElement {
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