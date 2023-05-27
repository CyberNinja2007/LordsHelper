<script>
  let sections = [];
  let userScroll;

  const getMenuItems = () => {
    return sections.map((link) => link.getAttribute("id").substring(0));
  };

  function changeActive() {
    const menuItems = getMenuItems();

    menuItems.forEach((value) => {
      const offsetSection =
        document.getElementById(value).getBoundingClientRect().top +
        window.scrollY;
      const docScroll = window.scrollY;
      const docScroll1 = docScroll + 500;

      if (docScroll1 >= offsetSection) {
        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((navLink) => {
          navLink.classList.remove("active");
        });

        const activeNavLink = document.querySelector(
          `.nav-link[href$="#${value}"]`
        );
        if (activeNavLink) {
          activeNavLink.classList.add("active");
        }
      }
    });
  }

  const handleAnchorClick = (event) => {
    event.preventDefault();
    const link = event.currentTarget;
    const anchorId = new URL(link.href).hash.replace("#", "");
    const anchor = document.getElementById(anchorId);
    window.scrollTo({
      top: anchor.offsetTop,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    changeActive();
  };
</script>

<svelte:window on:scroll={handleScroll} bind:scrollY={userScroll} />

<svelte:head>
  <title>LordsHelper | Главная</title>
</svelte:head>

<!-- Header -->
<header
  id="header"
  class="header py-28 text-center md:pt-36 lg:text-left xl:pt-44 xl:pb-32"
  bind:this={sections[0]}
>
  <div class="container px-4 sm:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
    <div class="mb-16 lg:mt-32 xl:mt-40 xl:mr-12">
      <h1 class="h1-large mb-5">Lords Helper - премиум инструмент.</h1>
      <p class="p-large mb-8">
        Начните побеждать в битвах за титул, управляя сотнями учетных записей
        легко и без проблем.
      </p>
      <a class="btn-solid-lg" href="/login"
        ><i class="fa-solid fa-right-to-bracket" /> Вход</a
      >
      <a
        class="btn-solid-lg secondary"
        href="#pricing"
        on:click={handleAnchorClick}
        ><i class="fa-solid fa-tags" /> Планы и цены</a
      >
    </div>
    <!-- <div class="xl:text-right">
            <img class="inline" src="images/header-smartphone.png" alt="alternative" />
        </div> -->
  </div>
  <!-- end of container -->
</header>
<!-- end of header -->
<!-- end of header -->

<!-- Introduction -->
<div class="pt-4 pb-14 text-center">
  <div class="container px-4 sm:px-8 xl:px-4">
    <p class="mb-4 text-gray-800 text-3xl leading-10 lg:max-w-5xl lg:mx-auto">
      Максимизируйте ваше время и учетные записи, не зависимо от того, на какой
      платформе вы играете. Стоит только попровобовать и вы забудете про все
      другие приложения.
    </p>
  </div>
  <!-- end of container -->
</div>
<!-- end of introduction -->

<!-- Features -->
<div id="features" class="cards-1" bind:this={sections[1]}>
  <div class="container px-4 sm:px-8 xl:px-4">
    <!-- Card -->
    <div class="card">
      <div class="card-image">
        <i
          class="fa-solid fa-tower-broadcast"
          style="width: 5em; color: #2596be;height: 5em;"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">Постоянные обновления</h5>
        <p class="mb-4">
          Наш продукт постоянно обновляется и его функционал расширяется. Для
          вас все обновления бесплатны сразу же, после покупки лицензии.
        </p>
      </div>
    </div>
    <!-- end of card -->

    <!-- Card -->
    <div class="card">
      <div class="card-image">
        <i
          class="fa-solid fa-gears"
          style="width: 5em; color: #97c85b;height: 5em;"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">Огромная вариативность</h5>
        <p class="mb-4">
          Благодаря обширному функционалу вы с легкостью можете настраивать, как
          отдельные аккаунты, так и целые связки.
        </p>
      </div>
    </div>
    <!-- end of card -->

    <!-- Card -->
    <div class="card">
      <div class="card-image">
        <i
          class="fa-solid fa-business-time"
          style="width: 5em; color: #2596be;height: 5em;"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">Экономия времени</h5>
        <p class="mb-4">
          Не тратьте время на рутинные задачи. Позвольте нам управлять вашими
          аккаунтами за вас и уделите время более важным вещам.
        </p>
      </div>
    </div>
    <!-- end of card -->

    <!-- Card -->
    <div class="card">
      <div class="card-image">
        <i
          class="fa-solid fa-headset"
          style="width: 5em; color: #97c85b;height: 5em;"
        />
      </div>
      <div class="card-body">
        <h5 class="card-title">Круглосуточная поддержка</h5>
        <p class="mb-4">
          Мы обеспечиваем круглосуточную поддержку для каждого пользователя
          независимо от уровня подписки.
        </p>
      </div>
    </div>
    <!-- end of card -->
  </div>
  <!-- end of container -->
</div>
<!-- end of cards-1 -->
<!-- end of features -->

<!-- Details 1 -->
<div class="py-16" id="details" bind:this={sections[2]}>
  <div class="container px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
    <div class="lg:col-span-2 overflow-hidden" />
    <div class="lg:col-span-3">
      <img src="guild-image.svg" alt="Guild icon" style="width:20em;" />
    </div>
    <div class="lg:col-span-5">
      <div class="mb-16 lg:mb-0 xl:mt-16">
        <h2 id="details-title" class="mb-6">Полное управление гильдией</h2>
        <div id="details-body">
          <p class="mb-4">
            Основываясь на многочисленных пожеланиях игрового коммьюнити, мы
            реализовали расширенный функционал, который позволяет
            автоматизировать не только ваши аккаунты, но и вашу гильдию.
          </p>
          <p class="mb-4">
            Автоматизируйте учет ресурсов гильдии. Ваша гильдия может
            запрашивать ресурсы, когда это необходимо, запрашивать титулы и
            просматривать их статистику охоты.
          </p>
        </div>
      </div>
      <div class="lg:col-span-2 overflow-hidden" />
    </div>
  </div>
</div>
<!-- end of details 1 -->

<!-- Details 2 -->
<div class="py-24" id="statistics">
  <div class="container px-4 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
    <div class="lg:col-span-2 overflow-hidden" />
    <div class="lg:col-span-5">
      <div class="mb-16 lg:mb-0 xl:mt-16">
        <h2 id="details-title" class="mb-6">
          Настраиваемый уровень отчетности
        </h2>
        <div id="details-body">
          <p class="mb-4">
            Наш продукт всегда сообщит вам о том, что вы хотите знать, будь то
            логирование гильдии, её мероприятий или охотящихся согильдийцев или
            же действия самой учётной записи, обновление ресурсов и выполнение
            квестов.
          </p>
          <p class="mb-4">
            Благодаря нескольким уровням кастомизации, вы сможете получать
            минимум информации на легком уровне кастомизации, умеренное кол-во
            информации, если вы уже освоились с нашим приложением, на среднем
            уровне кастомизации и максимум возможной информации на высоком
            уровне кастомизации, если вы опытный пользователь. Так же по мимо
            этого имеется и пользовательный уровень кастомизации, дающий вам
            полную свободу действий.
          </p>
        </div>
      </div>
    </div>
    <div class="lg:col-span-3">
      <img
        src="statistics-image.svg"
        alt="Guild icon"
        style="width:20em;"
      />
    </div>
    <div class="lg:col-span-2 overflow-hidden" />
  </div>
</div>
<!-- end of details 2 -->

<!-- Details Lightbox -->
<!-- Lightbox -->
<div id="faq" class="lightbox-basic" bind:this={sections[3]}>
  <h2 id="details-title" class="mb-6 text-center">Часто задаваемые вопросы</h2>
  <div class="space-y-4">
    <details
      class="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
      open
    >
      <summary
        class="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      >
        <h2 class="font-medium">Как работает ваша лицензионная система?</h2>

        <span class="relative h-5 w-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-gray-700">
        Как только транзакция будет авторизована через нашу платежную систему, к
        вашей лицензии будет добавлено соответствующее время. Для любых
        дополнительных учетных записей они останутся привязанными на весь срок
        действия вашей лицензии, независимо от статуса истечения срока действия.
      </p>
    </details>

    <details
      class="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        class="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      >
        <h2 class="font-medium">
          Куда я могу обратиться, если у меня будет вопрос?
        </h2>

        <span class="relative h-5 w-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-gray-700">
        Вы можете получить всю необходимую помощь прямо в онлайн-чате сайта, в
        нашей группе вк или facebook. Если же ни один из этих видов связи вам
        недотупен, вы можете написать нам на почту -
        <a
          class="text-indigo-600 hover:text-gray-500"
          href="mailto:contact@lordshelper.com">help@lordshelper.com</a
        >
      </p>
    </details>

    <details
      class="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        class="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      >
        <h2 class="font-medium">Вы принимаете российские карты?</h2>

        <span class="relative h-5 w-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-gray-700">
        Да, мы принимаем все российские карты, включая Mastercard, Visa и МИР,
        поэтому вы сможете заплатить любым удобным для вас способом
      </p>
    </details>

    <details
      class="group rounded-lg bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden"
    >
      <summary
        class="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900"
      >
        <h2 class="font-medium">Есть ли у вас бесплатный пробный период?</h2>

        <span class="relative h-5 w-5 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 opacity-100 group-open:opacity-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 opacity-0 group-open:opacity-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </summary>

      <p class="mt-4 leading-relaxed text-gray-700">
        К сожалению, данной возможности в нашем сервисе не предусмотрено, ведь
        наша работа основанана доверии и репутации. Если же вам вдруг не
        понравились наши услуги, вы всегда сможете вернуть свои деньги, запросив
        данную операцию в личном кабинете. Наши специалисты тщательно рассмотрят
        вашу заявку и вернут вам ваши денежные средства в течении 10-ти дней.
      </p>
    </details>
  </div>
</div>
<!-- end of lightbox-basic -->
<!-- end of lightbox -->
<!-- end of details lightbox -->

<!-- Pricing -->
<div id="pricing" class="cards-2" bind:this={sections[4]}>
  <div class="absolute bottom-0 h-40 w-full bg-white" />
  <div class="container px-4 pb-px sm:px-8">
    <h2
      class="mb-2.5 text-white lg:max-w-xl lg:mx-auto lg:font-bold"
      style="font-size:xx-large;"
    >
      Выберите подходящий план для себя
    </h2>
    <p
      class="mb-16 text-white lg:max-w-3xl lg:mx-auto"
      style="font-size:large;"
    >
      Нигде более вы не получите большей эффективности от затраченных средств,
      чем с Lords Helper!
    </p>

    <!-- Card-->
    <div class="card">
      <div class="card-body">
        <div class="card-title">Минимальный</div>
        <div class="price">
          <span class="value">600</span><span class="currency">руб.</span>
        </div>
        <div class="frequency">ежемесячно</div>
        <p>Данный план подходит для начинающих игроков</p>
        <ul class="list mb-7 space-y-2 text-left">
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>5 возможных аккаунтов для управления</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Постоянные обновления</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Полная поддержка</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Автоматическое управление гильдией</div>
          </li>
        </ul>
        <div class="button-wrapper">
          <a class="btn-solid-reg page-scroll" href="/login">Получить</a>
        </div>
      </div>
    </div>
    <!-- end of card -->
    <!-- end of card -->

    <!-- Card-->
    <div class="card">
      <div class="card-body">
        <div class="card-title">Базовый</div>
        <div class="price">
          <span class="value">1800</span><span class="currency">руб.</span>
        </div>
        <div class="frequency">ежемесячно</div>
        <p>Базовый план больше соответсвует целям среднего игрока</p>
        <ul class="list mb-7 space-y-2 text-left">
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Всё, что входит в предыдущий план</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Расширение базовых аккаунтов до 7</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Возможность купить до 30 дополнительных аккаунтов</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Кастомизация настроек</div>
          </li>
        </ul>
        <div class="button-wrapper">
          <a class="btn-solid-reg page-scroll" href="/login">Получить</a>
        </div>
      </div>
    </div>
    <!-- end of card -->
    <!-- end of card -->

    <!-- Card-->
    <div class="card">
      <div class="card-body">
        <div class="card-title">Премиум</div>
        <div class="price">
          <span class="value">3000</span><span class="currency">руб.</span>
        </div>
        <div class="frequency">ежемесячно</div>
        <p>Этот план подходит только для тех, кто нацелен на место Лорда</p>
        <ul class="list mb-7 text-left space-y-2">
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Всё, что входит в предыдущий план</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Неограниченная возможность покупки аккаунтов</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Прмоакции</div>
          </li>
          <li class="flex">
            <i class="fas fa-chevron-right" />
            <div>Приоритетная поддержка</div>
          </li>
        </ul>
        <div class="button-wrapper">
          <a class="btn-solid-reg page-scroll" href="/login">Получить</a>
        </div>
      </div>
    </div>
    <!-- end of card -->
    <!-- end of card -->
  </div>
  <!-- end of container -->
</div>
<!-- end of cards-2 -->
<!-- end of pricing -->

<!-- Conclusion -->
<div id="conclusion" class="basic-5">
  <div class="container px-4 sm:px-8 lg:grid lg:grid-cols-2">
    <div class="mb-16 lg:mb-0">
      <img src="favicon.svg" alt="Главный логотип проекта" />
    </div>
    <div class="lg:mt-24 xl:mt-44 xl:ml-12">
      <p class="mb-9 text-gray-800 text-3xl leading-10">
        Lords Helper - #1 помощник в достижении звания Лорда. Присоединяйся к
        нам сегодня.
      </p>
      <a class="btn-solid-lg secondary" href="/login">
        <i class="fa-solid fa-right-to-bracket" /> Присоединиться
      </a>
    </div>
  </div>
  <!-- end of container -->
</div>
<!-- end of basic-5 -->
<!-- end of conclusion -->