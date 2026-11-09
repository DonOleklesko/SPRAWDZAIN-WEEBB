export function validateItem(name, quantityText) {
    const trimmedName = name.trim();
    if (trimmedName.length < 2 || trimmedName.length > 30) {
        return "Nazwa musi mieć od 2 do 30 literek.";
    }
    if (quantityText.trim() === '') {
        return "nie może być pusta.";
    }
    const quantity = Number(quantityText);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        return "musi być liczbą całkowitą od 1 do 99.";
    }
    return null;
}
