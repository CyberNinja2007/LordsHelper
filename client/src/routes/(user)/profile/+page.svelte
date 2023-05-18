<script>
  import Page from "../login/+page.svelte";
</script>

<svelte:head>
  <title>LordsHelper | Профиль</title>
</svelte:head>

<div class="h-screen w-full flex overflow-hidden">
  <nav class="profile-side-navbar flex flex-col w-64 px-8 pt-4 pb-6">
    <!-- SideNavBar -->

    <div class="flex flex-row border-b items-center justify-between pb-2">
      <!-- Hearder -->
      <span class="text-lg font-semibold capitalize dark:text-gray-300">
        Профиль
      </span>

      <span class="relative">
        <a
          class="hover:text-green-500 dark-hover:text-green-300
					text-gray-600 dark:text-gray-300"
          href="#"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </a>
        <div
          class="absolute w-2 h-2 rounded-full bg-green-500
					dark-hover:bg-green-300 right-0 mb-5 bottom-0"
        />
      </span>
    </div>

    <div class="flex flex-col text-center mt-8">
      <!-- User info -->
      <i class="fa-solid fa-user-large fa-2xl" />
      <h2 class="mt-4 text-xl dark:text-gray-300 font-medium capitalize">
        Привет, %Username%
      </h2>
    </div>

    <button
      type="submit"
      class="w-full mt-8 py-4 rounded-lg btn-solid-lg secondary"
    >
      <div class="flex flex-row items-center justify-center">
        <div class="mr-4">
          <i class="fa-solid fa-plus" />
        </div>
        <div class="font-bold">Добавить</div>
      </div>
    </button>

    <ul class="profile-list mt-2 text-gray-600">
      <!-- Links -->
      <li class="profile-link active">
        <a href="#home" class="flex pl-4">
          <i class="fa-solid fa-robot fill-current h-5 w-5" />
          <span class="ml-2 capitalize font-medium">Аккаунты</span>
        </a>
      </li>
    </ul>

    <div class="mt-auto flex items-center text-red-700 dark:text-red-400">
      <!-- important action -->
      <a href="#home" class="flex items-center">
        <i class="fa-solid fa-right-from-bracket fill-current h-5 w-5" />
        <span class="ml-2 capitalize font-medium">Выйти</span>
      </a>
    </div>
  </nav>
  <main
    class="flex-1 flex flex-col transition
		duration-500 ease-in-out overflow-y-auto"
  >
    <div class="mx-10 my-2">
      <nav
        class="flex flex-row justify-between border-b
				  transition duration-500 md:w-60
				ease-in-out"
      >
        <div class="flex items-center select-none">
          <span
            class="hover:text-green-500 dark-hover:text-green-300
						cursor-pointer mr-3 transition duration-500 ease-in-out"
          >
            <i class="fa-solid fa-magnifying-glass h-5 w-5 fill-current" />
          </span>

          <input
            class="w-12 bg-transparent focus:outline-none"
            placeholder="Найти"
          />
        </div>
      </nav>
      <h2 class="my-4 text-4xl font-semibold">Аккаунты</h2>
      <div
        class="pb-2 flex items-center justify-between text-gray-600 border-b"
      >
        <!-- Header -->

        <div>
          <span>
            <span class="text-main"> 0 </span>
            аккаунтов
          </span>
        </div>
        <div>
          <span>
            Группа:
            <span class="text-main cursor-pointer"> Все </span>
          </span>
          <span class="ml-12">
            Дата добавления:
            <span class="text-main cursor-pointer"> За всё время </span>
          </span>
          <span class="ml-12">
            Уровень
            <span class="text-main cursor-pointer"> Все </span>
          </span>
        </div>
      </div>
      <div class="mt-6 flex justify-between text-gray-600">
        <!-- List sorting -->

        <div class="ml-10 pl-2 flex capitalize">
          <!-- Left side -->
          <p class="ml-8 flex items-center">
            Название
            <i class="fa-solid fa-arrow-down-short-wide ml-1" />
          </p>
        </div>

        <div class="mr-12 flex capitalize">
          <!-- Right side -->

          <p class="mr-20 flex items-center">
            Группа
            <i class="fa-solid fa-arrow-down-short-wide ml-1" />
          </p>

          <p class="mr-16 pr-2 flex items-center">
            Уровень
            <i class="fa-solid fa-arrow-down-short-wide ml-1" />
          </p>

          <p class="mr-24 flex items-center">
            Статус
            <i class="fa-solid fa-arrow-down-short-wide ml-1" />
          </p>
          <p class="mr-20 flex items-center">
            Дата
            <i class="fa-solid fa-arrow-down-short-wide ml-1" />
          </p>
        </div>
      </div>
      <div
        class="mt-2 flex px-4 py-4 justify-between bg-white
				dark:bg-gray-600 shadow-xl rounded-lg cursor-pointer"
      >
        <!-- Card -->

        <div class="flex justify-between">
          <!-- Left side -->

          <i class="fa-solid fa-robot fill-current w-20 mx-5 h-20" />

          <div
            class="ml-4 flex flex-col capitalize text-gray-600 px-10 border-l"
          >
            <span>Название</span>
            <span class="mt-2 text-black dark:text-gray-200">
              carmen beltran
            </span>
          </div>
        </div>

        <div class="flex">
          <!-- Rigt side -->
          <div class="mr-16 flex flex-col capitalize text-gray-600 pr-5 border-r">
            <span>группа</span>
            <span class="mt-2 text-black dark:text-gray-200"> Aero treck </span>
          </div>

          <div class="mr-16 flex flex-col capitalize text-gray-600 pr-5 border-r">
            <span>уровень</span>
            <span class="mt-2 text-black dark:text-gray-200"> 12 </span>
          </div>

          <div class="mr-16 flex flex-col capitalize text-gray-600 pr-5 border-r">
            <span>статус</span>
            <span class="mt-2 text-black dark:text-gray-200"> Онлайн </span>
          </div>

          <div class="mr-16 flex flex-col capitalize text-gray-600">
            <span>дата создания</span>
            <span class="mt-2 text-green-400"> 20.02.2020 </span>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
