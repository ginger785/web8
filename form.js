document.addEventListener('DOMContentLoaded', () => {
    const openPopupBtn = document.getElementById('openPopup');
    const popup = document.getElementById('popup');
    const contactForm = document.getElementById('contactForm');
    const closePopupBtn = document.getElementById('closePopup');
    const messageArea = document.getElementById('messageArea');

    // Открыть попап
    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        history.pushState({}, '', '#contact'); // Меняем URL
    });

    // Закрыть попап
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        history.pushState({}, '', location.pathname); // Возвращаем URL
    });

    // Закрытие попапа при нажатии "Назад"
    window.addEventListener('popstate', () => {
        popup.style.display = 'none';
    });

    // Отправка формы
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Проверка согласия с политикой
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            messageArea.textContent = 'Вы должны согласиться с политикой обработки данных.';
            return;
        }

        // Данные формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            organization: document.getElementById('organization').value,
            message: document.getElementById('message').value,
        };

        // Отправка данных
        try {
            const response = await fetch('https://formcarry.com/s/t5C3Z9nIbL-', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                messageArea.textContent = 'Форма успешно отправлена!';
                contactForm.reset();
            } else {
                messageArea.textContent = 'Ошибка при отправке формы.';
            }
        } catch (error) {
            messageArea.textContent = 'Ошибка сети. Проверьте подключение к интернету.';
        }
    });
});
