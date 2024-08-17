$(document).ready(function () {
  $(".last-content-left__slider").owlCarousel({
    items: 1, // Показывать по 1 слайду
    loop: true, // Бесконечная прокрутка
    autoplay: true, // Автоматическая прокрутка
    autoplayTimeout: 3000, // Время до автоматической прокрутки (в миллисекундах)
    autoplayHoverPause: true, // Остановка прокрутки при наведении
    smartSpeed: 500, // Скорость анимации в миллисекундах
  });
  $(".last-content-slider").owlCarousel({
    items: 2, // Показывать по 2 слайда по умолчанию
    smartSpeed: 500, // Скорость анимации в миллисекундах
    slideBy: 1, // Прокручивать по 1 слайду
    nav: true, // Навигационные стрелки
    responsive: {
      0: {
        items: 1, // Показывать 1 слайд на экранах меньше 576px
      },
      576: {
        items: 2, // Показывать 2 слайда на экранах от 576px и больше
      },
    },
  });
  $(".header-lang__top").on("click", function () {
    $(".header-lang").toggleClass("active");
  });

  $(".rating-tabs-top-list-item").click(function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки

    var index = $(this).index();

    // Убираем класс active у всех табов
    $(".rating-tabs-top-list-item").removeClass("active");
    $(this).addClass("active");

    // Плавно скрываем все элементы контента
    $(".rating-tabs-content__item.active").fadeOut(200, function () {
      $(this).removeClass("active");

      // После того как элемент скрыт, показываем выбранный контент
      $(".rating-tabs-content__item").eq(index).fadeIn(200).addClass("active");
    });
  });
  $(".server-content-left__item").click(function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение ссылки

    var index = $(this).index();

    // Убираем класс active у всех табов
    $(".server-content-left__item").removeClass("active");
    $(this).addClass("active");

    // Плавно скрываем все элементы контента
    $(".server-content-right__item.active").fadeOut(200, function () {
      $(this).removeClass("active");

      // После того как элемент скрыт, показываем выбранный контент
      $(".server-content-right__item").eq(index).fadeIn(200).addClass("active");
    });
  });
  function updateHeaderBackHeight() {
    var $header = $(".header");
    var $headerMobile = $(".header-mobile");
    var $headerBack = $(".header__back");

    // Получаем высоту header и header-mobile
    var headerHeight = $header.outerHeight();
    var headerMobileHeight = $headerMobile.length
      ? $headerMobile.outerHeight()
      : 0;

    // Получаем текущую ширину окна
    var windowWidth = $(window).width();

    // Устанавливаем значение высоты в зависимости от ширины окна
    var extraHeight;
    if (windowWidth <= 1200) {
      extraHeight = 90; // 90px для экранов 1200px и больше
    } else if (windowWidth <= 992) {
      extraHeight = 80; // 70px для экранов от 992px до 1199px
    } else if (windowWidth <= 768) {
      extraHeight = 90; // 60px для экранов от 768px до 991px
    } else if (windowWidth <= 576) {
      extraHeight = 10; // 60px для экранов от 768px до 991px
    }

    // Рассчитываем новую высоту
    var newHeight = headerHeight + headerMobileHeight + extraHeight;

    // Устанавливаем высоту header__back
    $headerBack.height(newHeight);
  }

  $(".last-btn-box").on("click", function () {
    $(this).toggleClass("active");

    // Находим текущий активный элемент (тот, который видим)
    var $activeContent = $(".last-content:visible");

    // Находим следующий элемент (если текущий первый, то следующий второй, и наоборот)
    var $nextContent = $activeContent.siblings(".last-content").first();

    // Плавно скрываем текущий элемент
    $activeContent.fadeOut(200, function () {
      // После скрытия текущего элемента устанавливаем у следующего display: flex и плавно показываем его
      $nextContent.css("display", "flex").hide().fadeIn(200);
    });

    // Меняем текст в элементе .title-line
    var $titleLine = $(".title-line");
    var currentText = $titleLine.text().trim();

    // Переключаем текст между "последние новости" и "стримы"
    if (currentText === "последние новости") {
      $titleLine.text("стримы");
    } else {
      $titleLine.text("последние новости");
    }
  });
  // Вызываем функцию при загрузке страницы
  updateHeaderBackHeight();
  $(".header-burger").on("click", function () {
    // Добавляем или удаляем класс active
    $(this).toggleClass("active");
    $("header").toggleClass("active");
  });

  // Проверяем ширину окна и вызываем функцию только один раз
  if ($(window).width() < 1200) {
    updateHeaderBackHeight();
  }
  $(document).on("click", function (e) {
    // Проверяем, находится ли клик вне header и header-burger
    if (!$(e.target).closest(".header, .header-burger").length) {
      $(".header").removeClass("active");
      $(".header-burger").removeClass("active");
      $(".header-lang").removeClass("active");
    }
  });
  function wrapHeaderBlocks() {
    var width = $(window).width();

    if (width < 1200) {
      if (!$(".header-mobile").length) {
        // Создаем блок header-mobile
        $('<div class="header-mobile"></div>')
          .appendTo(".header")
          .append($(".header-center"))
          .append($(".header-right"));
      }
    } else {
      if ($(".header-mobile").length) {
        // Восстанавливаем исходное состояние
        var $headerMobile = $(".header-mobile");
        $(".header-center").appendTo(".header");
        $(".header-right").appendTo(".header");
        $headerMobile.remove();
      }
    }
  }

  // Initial call
  wrapHeaderBlocks();

  // Listen for window resize
  $(window).on("resize", wrapHeaderBlocks);
  class gw_timeUpdate {
    constructor(el, date, startIn, lifeTime, tz) {
      this.el = el;
      this.startTime = luxon.DateTime.fromSQL(date, { zone: tz });
      this.tz = tz;
      this.startIn = startIn || "Start in";
      this.lifeTime = lifeTime || "Life time";
    }

    update() {
      let dateNow = luxon.DateTime.now().setZone(this.tz);
      let comming = this.startTime < dateNow;

      let obj = this.startTime
        .diff(dateNow, ["days", "hours", "minutes", "seconds"])
        .toObject();
      let days = Math.abs(Math.floor(obj.days));
      let hours = Math.abs(Math.floor(obj.hours));
      let minutes = Math.abs(Math.floor(obj.minutes));
      let seconds = Math.abs(Math.floor(obj.seconds));
      let title = comming ? this.lifeTime : this.startIn;

      let html = `
        <div class="countdown">
            <div class="countdown__counter">
                <div class="gw-timer">
                    <div class="gw-timer__item">
                        <div class="gw-timer__amount">${days}</div>
                        <div class="gw-timer__desc">${numDecline(
                          days,
                          __config.timer.dd[0]
                        )}</div>
                    </div>
										
                    <div class="gw-timer__item">
                        <div class="gw-timer__amount">${String(hours).padStart(
                          2,
                          "0"
                        )}</div>
                        <div class="gw-timer__desc">${numDecline(
                          hours,
                          __config.timer.dd[1]
                        )}</div>
                    </div>
										
                    <div class="gw-timer__item">
                        <div class="gw-timer__amount">${String(
                          minutes
                        ).padStart(2, "0")}</div>
                        <div class="gw-timer__desc">${numDecline(
                          minutes,
                          __config.timer.dd[2]
                        )}</div>
                    </div>
											
											<div class="gw-timer__item">
                        <div class="gw-timer__amount">${String(
                          seconds
                        ).padStart(2, "0")}</div>
                        <div class="gw-timer__desc">${numDecline(
                          seconds,
                          __config.timer.dd[2]
                        )}</div>
                    </div>
                </div>
            </div>
        </div>
        `;
      this.el.html(html);
    }
  }

  function numDecline(n, titles) {
    return titles[
      1 === n % 10 && 11 !== n % 100
        ? 0
        : 2 <= n % 10 && 4 >= n % 10 && (10 > n % 100 || 20 <= n % 100)
        ? 1
        : 2
    ];
  }

  $("[data-timer-start-time]").each(function (index, element) {
    const __this = $(this);
    console.log("Initializing timer for element:", __this);
    let timeREnder = new gw_timeUpdate(
      __this,
      __this.attr("data-timer-start-time"),
      __this.attr("data-timer-before"),
      __this.attr("data-timer-after"),
      __this.attr("data-timer-time-zone")
    );
    let update = function () {
      timeREnder.update();
      setTimeout(() => {
        update();
      }, 1000);
    };
    update();
  });
});
