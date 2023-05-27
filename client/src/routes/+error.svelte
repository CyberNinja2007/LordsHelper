<script>
    import { page } from '$app/stores';
</script>

<section class="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
	<div class="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div class="max-w-md text-center">
			<h2 class="mb-8 font-extrabold text-9xl dark:text-gray-600">
				<span class="sr-only">Ошибка</span>{$page.status}
			</h2>
			<p class="text-2xl font-semibold md:text-3xl">{$page.error?.message}</p>
			<p class="mt-4 mb-8 dark:text-gray-400">Но не волнуйтесь, вы всегда можете вернуться на главную страницу</p>
			<a rel="noopener noreferrer" href="/" class="w-full py-4 rounded-lg btn-solid-lg secondary">Вернуться на главную</a>
		</div>
	</div>
</section>