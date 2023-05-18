<script>
  import Footer from "../../components/footer.svelte";

    let navbar;
    let navbarCollapse;
    let userScrolled = 0;
  
    const handleAnchorClick = (event) => {
      event.preventDefault();
      const link = event.currentTarget;
      const anchorId = new URL(link.href).hash.replace("#", "");
      const anchor = document.getElementById(anchorId);
      window.scrollTo({
        top: anchor.offsetTop,
        behavior: "smooth",
      });
      openNavbar();
    };
  
    const handleScroll = () => {
      navbarStick();
    };
  
    const handleLoad = () => {
      navbarStick();
    };
  
    const navbarStick = () => {
      const topPosition = navbar.getBoundingClientRect().top + userScrolled;
  
      if (topPosition > 60) {
        navbar.classList.add("top-nav-collapse");
      } else {
        navbar.classList.remove("top-nav-collapse");
      }
    };
  
    const openNavbar = () => {
      navbarCollapse.classList.toggle("open");
    };
  </script>
  
  <svelte:window
    on:scroll={handleScroll}
    on:load={handleLoad}
    bind:scrollY={userScrolled}
  />
  
  <!-- Navigation -->
  <nav class="navbar fixed-top" bind:this={navbar}>
    <div
      class="container sm:px-4 lg:px-8 flex flex-wrap items-center justify-between lg:flex-nowrap"
    >
  
      <!-- Image Logo -->
      <a
        class="inline-block mr-4 py-0.5 text-xl whitespace-nowrap hover:no-underline focus:no-underline"
        href="/"
      >
        <img
          src="images/navbar-logo.svg"
          alt="Главный логотип проекта"
          class="h-14"
        />
      </a>
  
      <button
        class="background-transparent rounded text-xl leading-none hover:no-underline focus:no-underline lg:hidden lg:text-gray-400"
        type="button"
        data-toggle="offcanvas"
        on:click={openNavbar}
      >
        <span class="navbar-toggler-icon inline-block w-8 h-8 align-middle" />
      </button>
  
      <div
        class="navbar-collapse offcanvas-collapse lg:flex lg:flex-grow lg:items-center"
        bind:this={navbarCollapse}
      >
        <ul
          class="pl-0 mt-3 mb-2 ml-auto flex flex-col list-none lg:mt-0 lg:mb-0 lg:flex-row"
        >
          <li>
            <a class="nav-link active" href="#header" on:click={handleAnchorClick}
              >Главная
            </a><span class="sr-only">(current)</span>
          </li>
          <li>
            <a class="nav-link" href="#features" on:click={handleAnchorClick}
              >Преимущества</a
            >
          </li>
          <li>
            <a class="nav-link" href="#details" on:click={handleAnchorClick}
              >Подробнее</a
            >
          </li>
          <li>
            <a class="nav-link" href="#faq" on:click={handleAnchorClick}>FAQ</a>
          </li>
          <li>
            <a class="nav-link" href="#pricing" on:click={handleAnchorClick}
              >Цены</a
            >
          </li>
          <li>
            <a class="nav-link" href="/login">Вход</a>
          </li>
        </ul>
      </div>
      <!-- end of navbar-collapse -->
    </div>
    <!-- end of container -->
  </nav>
  <!-- end of navbar -->
  <!-- end of navigation -->
<slot />
<Footer />