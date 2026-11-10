const menuToggle = document.querySelector(".menu-toggle");
      const siteNav = document.querySelector("#site-nav");
const progressBar = document.querySelector(".page-progress");
const progressFill = document.querySelector(".page-progress-fill");
let progressFrame = 0;

function updatePageProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? Math.min(100, Math.max(0, (window.scrollY / scrollableHeight) * 100))
    : 0;
  progressFill.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuenow", String(Math.round(progress)));
  progressFrame = 0;
}

function scheduleProgressUpdate() {
  if (progressFrame) return;
  progressFrame = window.requestAnimationFrame(updatePageProgress);
}

window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
window.addEventListener("resize", scheduleProgressUpdate);
updatePageProgress();

const demoTimer = document.querySelector("#demo-timer");
let demoSecondsRemaining = 20 * 60;

function updateDemoTimer() {
  const minutes = Math.floor(demoSecondsRemaining / 60);
  const seconds = demoSecondsRemaining % 60;
  demoTimer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

updateDemoTimer();
const demoTimerInterval = window.setInterval(() => {
  demoSecondsRemaining = Math.max(0, demoSecondsRemaining - 1);
  updateDemoTimer();
  if (demoSecondsRemaining === 0) {
    window.clearInterval(demoTimerInterval);
    demoTimer.previousElementSibling.textContent = "Демо завершено · не срок акции";
  }
}, 1000);

const demoOrders = [
  "Иван Пример из Харькова заказал Keto Coffee.",
  "Анна Демонова из Львова заказала Keto Coffee.",
  "Олег Тестов из Киева заказал Keto Coffee.",
  "Мария Макетова из Одессы заказала Keto Coffee.",
  "Андрей Примерный из Днепра заказал Keto Coffee.",
  "Елена Тестова из Полтавы заказала Keto Coffee.",
  "Дмитрий Демов из Винницы заказал Keto Coffee.",
  "Наталья Примерова из Чернигова заказала Keto Coffee.",
  "Сергей Макетов из Черкасс заказал Keto Coffee.",
  "Ирина Демонова из Сум заказала Keto Coffee.",
  "Максим Тестов из Житомира заказал Keto Coffee.",
  "Ольга Примерова из Ужгорода заказала Keto Coffee.",
  "Артём Макетов из Ровно заказал Keto Coffee.",
  "Виктория Демова из Николаева заказала Keto Coffee.",
  "Павел Тестов из Луцка заказал Keto Coffee.",
  "Татьяна Примерова из Запорожья заказала Keto Coffee.",
  "Роман Демов из Тернополя заказал Keto Coffee.",
  "Светлана Макетова из Кропивницкого заказала Keto Coffee.",
  "Богдан Тестов из Ивано-Франковска заказал Keto Coffee.",
  "Юлия Демонова из Херсона заказала Keto Coffee."
];
const demoNotification = document.querySelector("#demo-notification");
const demoNotificationMessage = document.querySelector("#demo-notification-message");
let demoOrderIndex = 0;
let notificationTimeout = 0;

function hideDemoNotification() {
  demoNotification.hidden = true;
  demoNotification.classList.remove("is-visible");
}

function showNextDemoOrder() {
  if (demoOrderIndex >= demoOrders.length) return;
  if (document.hidden) {
    window.setTimeout(showNextDemoOrder, 5000);
    return;
  }

  demoNotificationMessage.textContent = demoOrders[demoOrderIndex];
  demoOrderIndex += 1;
  demoNotification.hidden = false;
  demoNotification.classList.remove("is-visible");
  window.requestAnimationFrame(() => demoNotification.classList.add("is-visible"));
  notificationTimeout = window.setTimeout(hideDemoNotification, 7000);
  if (demoOrderIndex < demoOrders.length) {
    window.setTimeout(showNextDemoOrder, 30000);
  }
}

demoNotification.querySelector(".demo-notification-close").addEventListener("click", () => {
  window.clearTimeout(notificationTimeout);
  hideDemoNotification();
});

window.setTimeout(showNextDemoOrder, 8000);

menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
        siteNav.classList.toggle("is-open", !isOpen);
      });

      siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          siteNav.classList.remove("is-open");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute("aria-label", "Открыть меню");
        });
      });

      const storySlides = Array.from(document.querySelectorAll(".story-slide"));
      const sliderDots = Array.from(document.querySelectorAll(".story-slider .slider-dot"));
      const currentSlide = document.querySelector("#current-slide");
      let activeSlide = 0;

      function showSlide(index) {
        activeSlide = (index + storySlides.length) % storySlides.length;
        storySlides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === activeSlide;
          slide.hidden = !isActive;
          slide.classList.toggle("is-active", isActive);
        });
        sliderDots.forEach((dot, dotIndex) => {
          dot.setAttribute("aria-current", String(dotIndex === activeSlide));
        });
        currentSlide.textContent = String(activeSlide + 1).padStart(2, "0");
      }

      document.querySelectorAll("[data-slide-step]").forEach((button) => {
        button.addEventListener("click", () => {
          showSlide(activeSlide + Number(button.dataset.slideStep));
        });
      });

      sliderDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          showSlide(Number(dot.dataset.slideTo));
        });
      });

      const orderSlides = Array.from(document.querySelectorAll(".order-slide"));
      const orderSliderDots = Array.from(document.querySelectorAll(".order-slider-dot"));
      const orderCurrentSlide = document.querySelector("#order-current-slide");
      let activeOrderSlide = 0;

      function showOrderSlide(index) {
        activeOrderSlide = (index + orderSlides.length) % orderSlides.length;
        orderSlides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === activeOrderSlide;
          slide.hidden = !isActive;
          slide.classList.toggle("is-active", isActive);
        });
        orderSliderDots.forEach((dot, dotIndex) => {
          dot.setAttribute("aria-current", String(dotIndex === activeOrderSlide));
        });
        orderCurrentSlide.textContent = String(activeOrderSlide + 1).padStart(2, "0");
      }

      document.querySelectorAll("[data-order-slide-step]").forEach((button) => {
        button.addEventListener("click", () => {
          showOrderSlide(activeOrderSlide + Number(button.dataset.orderSlideStep));
        });
      });

      orderSliderDots.forEach((dot) => {
        dot.addEventListener("click", () => {
          showOrderSlide(Number(dot.dataset.orderSlideTo));
        });
      });

      document.querySelectorAll(".faq-question").forEach((question) => {
        question.addEventListener("click", () => {
          const answer = document.getElementById(question.getAttribute("aria-controls"));
          const isExpanded = question.getAttribute("aria-expanded") === "true";
          question.setAttribute("aria-expanded", String(!isExpanded));
          answer.hidden = isExpanded;
        });
      });

      document.querySelector("#contact-form").addEventListener("submit", (event) => {
        event.preventDefault();
        if (!event.currentTarget.reportValidity()) return;

        const status = document.querySelector("#form-status");
        status.textContent = "Форма работает в демо-режиме: заявка не отправлена.";
        status.classList.add("is-visible");
      });
