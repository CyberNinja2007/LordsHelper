<script>
  import { enhance } from "$app/forms";

  export let form;
</script>

<svelte:head>
  <title>LordsHelper | Вход</title>
</svelte:head>

<div class="container px-6 mx-auto">
  <div
    class="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center"
  >
    <div class="flex flex-col w-full md:content-center">
      <a
        href="/"
        class="whitespace-nowrap hover:no-underline focus:no-underline w-20 md:m-0 m-auto"
      >
        <img src="images/favicon.svg" alt="Главный логотип проекта" />
      </a>
      <h1 class="text-5xl text-gray-800 font-bold">Lords Helper</h1>
      <p class="lg:w-5/12 mx-auto md:mx-0 text-gray-500">
        Автоматизируй управление аккаунтами и займи место Лорда.
      </p>
    </div>
    <div class="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
      <div class="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
        <h2 class="text-2xl font-bold text-gray-800 text-left mb-5">Вход</h2>
        <form action="?/login" class="w-full" method="POST" use:enhance>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="email" class="text-gray-500 mb-2">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Пожалуйста введите свой e-mail"
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              required
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="password" class="text-gray-500 mb-2">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Пожалуйста введите свой пароль"
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              required
            />
          </div>

          {#if form?.invalid}
            <p class="error">Введите email или пароль.</p>
          {/if}

          {#if form?.credentials}
            <p class="error">Вы ввели неверные данные.</p>
          {/if}

          <div class="flex flex-col w-full my-5">
            <button
              type="submit"
              class="w-full py-4 rounded-lg btn-solid-lg secondary"
            >
              <div class="flex flex-row items-center justify-center">
                <div class="mr-2">
                  <i class="fa-solid fa-right-to-bracket" />
                </div>
                <div class="font-bold">Войти</div>
              </div>
            </button>
            <p class="flex justify-evenly mt-5">
              <a
                href="/register"
                class="w-full text-center font-medium whitespace-nowrap"
                >Регистрация</a
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
