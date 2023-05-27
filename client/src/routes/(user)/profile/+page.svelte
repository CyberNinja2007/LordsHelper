<script>
  import Bot from "../../../components/Bot.svelte";

  export let data;

  let showBot = false;
  let isReadonly = true;
  let currentBot = {};

  const botOnClick = (event) => {
    console.log(data.bots);
    event.preventDefault();
    const link = event.currentTarget;
    const anchorId = Number(link.href.split("?/")[1]);
    currentBot = data.bots.find((bot) => bot.id === anchorId);
    handleToggleBot();
  };

  const handleToggleBot = () => {
    showBot = !showBot;
    if (!isReadonly) isReadonly = !isReadonly;
  };

  const handleDeleting = async () => {
    console.log("DELETING");
    try {
      let form = await request.formData();
      let id = String(form.get("id"));
      console.log(id);
      const accessToken = cookies.get("access");
      await deleteOne(id, accessToken);

      return { success: true };
    } catch (e) {
      console.log(e);
      const refreshToken = cookies.get("refresh");
      let newTokens = await refresh(refreshToken);

      if (newTokens.message) {
        console.log(newTokens);
        throw error(401, newTokens.message);
      }

      cookies.set("access", newTokens.accessToken, {
        maxAge: 15 * 60,
        path: "/",
      });
      cookies.set("refresh", newTokens.refreshToken, {
        maxAge: 14 * 24 * 60 * 60,
        path: "/",
      });

      let deletedBot = await deleteOne(id, newTokens.accessToken);

      if (deletedBot.message) {
        console.log(e.message);
        throw error(404, e.message);
      }

      return { success: true };
    }
  };
</script>

<svelte:head>
  <title>LordsHelper | Профиль</title>
</svelte:head>

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
          class="hover:text-green-500
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
    <div class="pb-2 flex items-center justify-between text-gray-600 border-b">
      <!-- Header -->

      <div>
        <span>
          <span class="text-main"> {data.bots.length} </span>
          {data.bots.length >= 5 || data.bots.length === 0 ? "аккаунтов" : (data.bots.length === 1 ? "аккаунт" : "аккаунта") }
        </span>
      </div>
      <div>
        <span>
          Группа:
          <span class="text-main cursor-pointer"> Все </span>
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
    {#each data.bots as bot}
      <a href="?/{bot.id}" on:click={botOnClick}>
        <div
          class="mt-2 flex px-4 py-4 justify-between bg-white
                  shadow-xl rounded-lg cursor-pointer"
        >
          <!-- Card -->

          <div class="flex justify-between">
            <!-- Left side -->

            <i class="fa-solid fa-robot fill-current w-20 mx-5 h-20" />

            <div
              class="ml-4 flex flex-col capitalize text-gray-600 px-10 border-l"
            >
              <span>Название</span>
              <span class="mt-2 text-black">
                {bot.name === null ? bot.id : bot.name}
              </span>
            </div>
          </div>

          <div class="flex">
            <!-- Rigt side -->
            <div
              class="mr-16 flex flex-col capitalize text-gray-600 pr-5 border-r"
            >
              <span>группа</span>
              <span class="mt-2 text-black"> {bot.group} </span>
            </div>

            <div
              class="mr-16 flex flex-col capitalize text-gray-600 pr-5 border-r"
            >
              <span>уровень</span>
              <span class="mt-2 text-black"> {bot.level} </span>
            </div>

            <div
              class="mr-16 flex flex-col capitalize text-gray-600 pr-5 border-r"
            >
              <span>статус</span>
              <span class="mt-2 text-second"> {bot.status} </span>
            </div>

            <div class="mr-16 flex flex-col capitalize text-gray-600">
              <span>дата создания</span>
              <span class="mt-2 text-black">
                {bot.createdAt.split("T")[0]}
              </span>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>

  <Bot
    title="Полная информация о боте {currentBot.name === null
      ? '#' + currentBot.id
      : currentBot.name}"
    open={showBot}
    on:close={handleToggleBot}
  >
    <svelte:fragment slot="body">
      <form method="POST" action="?/editBot">
        <div id="input" class="flex flex-col w-full my-5">
          <label for="id" class="text-gray-500 mb-2">IGG ID</label>
          <input
            type="text"
            id="id"
            name="id"
            readonly={isReadonly}
            class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
            value={currentBot.id}
          />
        </div>
        <div id="input" class="flex flex-col w-full my-5">
          <label for="name" class="text-gray-500 mb-2">Название</label>
          <input
            type="text"
            id="name"
            name="name"
            readonly={isReadonly}
            class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
            value={currentBot.name === null ? "" : currentBot.name}
          />
        </div>
        <div id="input" class="flex flex-col w-full my-5">
          <label for="group" class="text-gray-500 mb-2">Группа</label>
          <input
            type="text"
            id="group"
            name="group"
            readonly={isReadonly}
            class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
            value={currentBot.group}
          />
        </div>
        <div class=" border-gray-300 border-2 rounded-lg p-10">
          <h2 class="text-center text-xl">Основная информация</h2>
          <hr class="m-10" />
          <div id="input" class="flex flex-col w-full my-5">
            <label for="status" class="text-gray-500 mb-2">Статус</label>
            <input
              type="text"
              id="status"
              name="status"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.status}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Уровень</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.level}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Кол-во алмазов</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.diamonds}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2"
              >Уровень выносливости</label
            >
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.stamina}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Уровень силы</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.power}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2"
              >Кол-во убитых врагов</label
            >
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.killedEnemies}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Гильдия</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly={isReadonly}
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.guild}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Кол-во дней щита</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.shiled}
            />
          </div>
        </div>
        <div class=" border-gray-300 border-2 rounded-lg p-10 my-5">
          <h2 class="text-center text-xl">Ресурсы</h2>
          <hr class="m-10" />
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Еда</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.resource.food}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Камень</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.resource.rock}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Дерево</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.resource.wood}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Руда</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.resource.ore}
            />
          </div>
          <div id="input" class="flex flex-col w-full my-5">
            <label for="id" class="text-gray-500 mb-2">Золото</label>
            <input
              type="text"
              id="id"
              name="id"
              readonly
              class="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-lg"
              value={currentBot.resource.gold}
            />
          </div>
        </div>
        <div class="w-full flex flex-row justify-around">
          <button class="rounded-lg btn-solid-lg secondary p-5 ml-20 text-xl">
            Изменить
          </button>
          <button
            class="rounded-lg btn-solid-lg danger p-5 mr-20 text-xl"
            formaction="?/deleteBot"
          >
            Удалить
          </button>
        </div>
      </form>
    </svelte:fragment>
  </Bot>
</main>
