let currentSlide = 0; // Индекс текущей страницы
const totalSlides = 8; // Общее количество слайдов
const slidesToShow = window.innerWidth <= 768 ? 1 : 3; // Установка количества слайдов для показа
const totalPages = window.innerWidth <= 768 ? 8 : 6; // Общее количество страниц

document.getElementById('total-pages').textContent = totalPages;

function updatePager() {
    document.getElementById('current-page').textContent = currentSlide + 1;
}

function moveSlide(direction) {
  currentSlide += direction;

  // Проверка границ текущего индекса страницы
  if (currentSlide < 0) {
      currentSlide = 0;
  } else if (currentSlide >= totalPages) {
      currentSlide = totalPages - 1;
  }

  // Вычисляем смещение для слайдов
  const gallery = document.querySelector('.slides');
  const offset = window.innerWidth <= 768 ? -currentSlide * (100 / 1) : -currentSlide * (100 / 3);
  gallery.style.transform = `translateX(${offset}%)`;
  updatePager();
}