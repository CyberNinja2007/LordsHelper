<script>
  export let data;
</script>

<div class="h-screen w-full flex overflow-hidden">
  <nav class="profile-side-navbar flex flex-col w-64 px-8 pt-4 pb-6">
    <!-- SideNavBar -->

    <div class="flex flex-row border-b items-center justify-between pb-2">
      <!-- Hearder -->
      <span class="text-lg font-semibold capitalize"> Профиль </span>

      <span class="relative">
        <a
          class="ringbell
					text-gray-600"
          href="#"
        >
          <i class="fa-solid fa-bell fa-lg" />
        </a>
        <div
          class="absolute w-2 h-2 rounded-full bg-main
					right-0 mb-5 bottom-0"
        />
      </span>
    </div>

    <div class="flex flex-col text-center mt-8">
      <!-- User info -->
      <i class="fa-solid fa-user-large fa-2xl" />
      <h2 class="mt-4 text-xl font-medium">
        Привет, {data?.email}
      </h2>
    </div>

    <form method="POST" action="?/addBot">
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
    </form>

    <ul class="profile-list mt-2 text-gray-600">
      <!-- Links -->
      <li class="profile-link active">
        <a href="#home" class="flex pl-4">
          <i class="fa-solid fa-robot fill-current h-5 w-5" />
          <span class="ml-2 capitalize font-medium">Аккаунты</span>
        </a>
      </li>
    </ul>

    <form class="mt-auto text-red-600" method="POST" action="?/logout">
      <!-- important action -->
      <button class="flex items-center">
        <i class="fa-solid fa-right-from-bracket fill-current h-5 w-5" />
        <span class="ml-2 capitalize font-medium">Выйти</span>
      </button>
    </form>
  </nav>

  <slot />
</div>
