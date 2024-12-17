document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const productTypeSelect = document.getElementById('productType');
    const optionsGroup = document.getElementById('optionsGroup');
    const propertyGroup = document.getElementById('propertyGroup');
    const propertyCheckbox = document.getElementById('property');
    const resultDiv = document.getElementById('result');
    const optionRadios = document.querySelectorAll('input[name="option"]');
    
    function updateVisibility() {
        const selectedType = productTypeSelect.selectedOptions[0];
        const options = selectedType.getAttribute('data-options');
        const property = selectedType.getAttribute('data-property');

        optionsGroup.style.display = options === "options" ? "block" : "none";
        propertyGroup.style.display = property === "property" ? "block" : "none";
    }

    function calculateCost() {
        const quantity = parseInt(quantityInput.value);
        if (quantity <= 0) {
            resultDiv.textContent = "Количество не может быть отрицательным или равным нулю.";
            resultDiv.style.color = "red";
            return;
        }

        const basePrice = parseInt(productTypeSelect.value);
        let totalPrice = basePrice * quantity;

        if (optionsGroup.style.display === "block") {
            optionRadios.forEach(radio => {
                if (radio.checked) {
                    totalPrice += parseInt(radio.value) * quantity;
                }
            });
        }

        if (propertyGroup.style.display === "block" && propertyCheckbox.checked) {
            totalPrice += parseInt(propertyCheckbox.value) * quantity;
        }

        resultDiv.textContent = `Стоимость заказа: ${totalPrice.toLocaleString()} руб.`;
        resultDiv.style.color = "black";
    }

    quantityInput.addEventListener('input', calculateCost);
    productTypeSelect.addEventListener('change', () => {
        updateVisibility();
        calculateCost();
    });
    propertyCheckbox.addEventListener('change', calculateCost);
    optionRadios.forEach(radio => radio.addEventListener('change', calculateCost));

    updateVisibility();
    calculateCost();
  });