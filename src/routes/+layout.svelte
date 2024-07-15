<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, slide, scale } from 'svelte/transition';
	import { elasticOut, backOut } from 'svelte/easing';
	import { page } from '$app/stores';
	import 'bulma/bulma.scss';

	let isNavVisible = true;
	let activeSection: string | null = null;
	let activeCategory: string | null = null;
	let searchQuery = '';
	let isSearchOpen = false;
	let progressBar: HTMLElement | null = null;
	let notificationCount = 7;
	let isColorThemeLight = true;

	type NavItem = {
		name: string;
		icon: string;
		href: string;
		children?: NavItem[];
	};

	type Course = {
		name: string;
		href: string;
		icon: string;
		color: string;
	};

	type Category = {
		name: string;
		courses: Course[];
		color: string;
	};

	const categories: Category[] = [
		{
			name: 'MLExpert',
			color: '#FF6B6B',
			courses: [
				{
					name: 'ML Content Index',
					href: '/courses/mlexpert/ml-content-index',
					icon: '📚',
					color: '#FF9FF3'
				},
				{
					name: 'ML Crash Course',
					href: '/courses/mlexpert/ml-crash-course',
					icon: '🚀',
					color: '#54A0FF'
				},
				{
					name: 'ML Coding Questions',
					href: '/courses/mlexpert/ml-coding-questions',
					icon: '💻',
					color: '#5CD859'
				},
				{
					name: 'Large-Scale ML',
					href: '/courses/mlexpert/large-scale-ml',
					icon: '🌐',
					color: '#FFA502'
				},
				{
					name: 'ML Design Questions',
					href: '/courses/mlexpert/ml-design-questions',
					icon: '🎨',
					color: '#FF6B6B'
				},
				{ name: 'ML Quiz', href: '/courses/mlexpert/ml-quiz', icon: '❓', color: '#1DD1A1' },
				{
					name: 'ML Interview Tips',
					href: '/courses/mlexpert/ml-interview-tips',
					icon: '💼',
					color: '#5F27CD'
				}
			]
		},
		{
			name: 'AlgoExpert',
			color: '#54A0FF',
			courses: [
				{
					name: 'Data Structures',
					href: '/courses/algoexpert/data-structures',
					icon: '📊',
					color: '#FF6B6B'
				},
				{
					name: 'Sorting Algorithms',
					href: '/courses/algoexpert/sorting-algorithms',
					icon: '🔢',
					color: '#FF9FF3'
				},
				{
					name: 'Dynamic Programming',
					href: '/courses/algoexpert/dynamic-programming',
					icon: '🧠',
					color: '#54A0FF'
				}
			]
		},
		{
			name: 'SystemsExpert',
			color: '#5CD859',
			courses: [
				{
					name: 'Operating Systems',
					href: '/courses/systemsexpert/operating-systems',
					icon: '💾',
					color: '#FF6B6B'
				},
				{
					name: 'Networking',
					href: '/courses/systemsexpert/networking',
					icon: '🌐',
					color: '#54A0FF'
				},
				{
					name: 'Databases',
					href: '/courses/systemsexpert/databases',
					icon: '🗄️',
					color: '#5CD859'
				}
			]
		},
		{
			name: 'FrontendExpert',
			color: '#FF9FF3',
			courses: [
				{
					name: 'HTML & CSS',
					href: '/courses/frontendexpert/html-css',
					icon: '🎨',
					color: '#FF6B6B'
				},
				{
					name: 'JavaScript',
					href: '/courses/frontendexpert/javascript',
					icon: '🚀',
					color: '#FFA502'
				},
				{ name: 'React', href: '/courses/frontendexpert/react', icon: '⚛️', color: '#54A0FF' }
			]
		}
	];

	const navItems: NavItem[] = [
		{ name: 'Dashboard', icon: '📊', href: '/dashboard' },
		{ name: 'Collaborate', icon: '🎨', href: '/projects' },
		{ name: 'Courses', icon: '🎓', href: '/courses' },
		{ name: 'Playground', icon: '🛝', href: '/playground' },
		{ name: 'Blog', icon: '✍️', href: '/blog' },
		{
			name: 'About',
			icon: 'ℹ️',
			href: '/about',
			children: [
				{ name: 'Our Team', icon: '👥', href: '/about/meettheteam' },
				{ name: 'Our Story', icon: '📚', href: '/about/story' },
				{ name: 'Impact', icon: '🌟', href: '/about/impact' },
				{ name: 'Contact', icon: '📞', href: '/about/contact' }
			]
		}
	];

	let prevScrollPos = 0;
	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset;
		isNavVisible = prevScrollPos > currentScrollPos || currentScrollPos < 50;
		prevScrollPos = currentScrollPos;

		const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		const scrolled = (winScroll / height) * 100;
		if (progressBar) progressBar.style.width = scrolled + '%';
	};

	const toggleSearch = () => {
		isSearchOpen = !isSearchOpen;
		if (isSearchOpen) {
			setTimeout(() => {
				const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
				searchInput?.focus();
			}, 100);
		}
	};

	const toggleColorTheme = () => {
		isColorThemeLight = !isColorThemeLight;
		document.body.classList.toggle('dark-theme');
	};

	const handleSearch = () => {
		console.log('Searching for:', searchQuery);
	};

	onMount(() => {
		progressBar = document.querySelector('.progress-bar') as HTMLElement;
		activeCategory = categories[0].name; // Set the first category as active by default
	});

	let typingTimer: ReturnType<typeof setTimeout>;
	const doneTyping = () => {
		handleSearch();
	};

	$: {
		clearTimeout(typingTimer);
		if (searchQuery) {
			typingTimer = setTimeout(doneTyping, 1000);
		}
	}

	let hoveredCategory: string | null = null;
	let hoveredCourse: string | null = null;

	const handleCategoryHover = (category: string) => {
		hoveredCategory = category;
		activeCategory = category;
	};

	const handleCourseHover = (course: string) => {
		hoveredCourse = course;
	};

	const handleCourseLeave = () => {
		hoveredCourse = null;
	};
</script>

<svelte:window on:scroll={handleScroll} />

<header
	class:hidden={!isNavVisible}
	class:light={isColorThemeLight}
	class:dark={!isColorThemeLight}
>
	<div class="progress-container">
		<div class="progress-bar"></div>
	</div>
	<nav>
		<div class="logo" in:fly={{ y: -50, duration: 500, delay: 200 }}>
			<a href="/" aria-label="Home">
				<svg width="40" height="40" viewBox="0 0 100 100">
					<circle cx="50" cy="50" r="45" fill="#4CAF50" />
					<text x="50" y="65" font-size="50" text-anchor="middle" fill="white">B</text>
				</svg>
				<span>BrainBlox</span>
			</a>
		</div>
		<div class="nav-links">
			{#each navItems as item}
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					class="nav-item"
					class:active={$page.url.pathname.startsWith(item.href)}
					on:mouseenter={() => (activeSection = item.name)}
					on:mouseleave={() => (activeSection = null)}
				>
					<a href={item.href}>
						<span class="icon">{item.icon}</span>
						<span class="text">{item.name}</span>
					</a>
					{#if item.children && activeSection === item.name}
						<div
							class="submenu"
							in:scale={{ duration: 200, start: 0.95 }}
							out:scale={{ duration: 150, start: 0.95 }}
						>
							{#each item.children as child}
								<a href={child.href} class="submenu-item">
									<span class="icon">{child.icon}</span>
									<span class="text">{child.name}</span>
								</a>
							{/each}
						</div>
					{/if}
					{#if item.name === 'Courses' && activeSection === item.name}
						<div
							class="course-explorer"
							in:scale={{ duration: 200, start: 0.95, easing: backOut }}
							out:scale={{ duration: 150, start: 0.95 }}
						>
							<div class="categories">
								{#each categories as category}
									<div
										class="category-item"
										on:mouseenter={() => handleCategoryHover(category.name)}
										class:active={activeCategory === category.name}
										style="--category-color: {category.color}"
									>
										<span class="category-icon">{category.name[0]}</span>
										<span class="category-name">{category.name}</span>
									</div>
								{/each}
							</div>
							<div class="courses">
								{#if activeCategory}
									<div class="courses-grid">
										{#each categories.find((cat) => cat.name === activeCategory)?.courses || [] as course (course.name)}
											<a
												href={course.href}
												class="course"
												style="--course-color: {course.color}"
												on:mouseenter={() => handleCourseHover(course.name)}
												on:mouseleave={handleCourseLeave}
											>
												<span class="course-icon">{course.icon}</span>
												<span class="course-name">{course.name}</span>
												{#if hoveredCourse === course.name}
													<span class="course-details">Click to explore</span>
												{/if}
											</a>
										{/each}
									</div>
								{:else}
									<div class="course-placeholder">Hover over a category to see courses</div>
								{/if}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
		<div class="nav-controls">
			<button class="icon-btn search-btn" on:click={toggleSearch} aria-label="Search">
				<span class="icon">🔍</span>
			</button>
			<button
				class="icon-btn theme-btn"
				on:click={toggleColorTheme}
				aria-label="Toggle color theme"
			>
				<span class="icon">{isColorThemeLight ? '🌙' : '☀️'}</span>
			</button>
			<div class="notifications">
				<button class="icon-btn" aria-label="Notifications">
					<span class="icon">🔔</span>
					{#if notificationCount > 0}
						<span class="notification-badge">{notificationCount}</span>
					{/if}
				</button>
			</div>
			<a href="/auth" class="btn btn-primary">Sign Up</a>
		</div>
	</nav>
	{#if isSearchOpen}
		<div class="search-overlay" transition:fade={{ duration: 200 }}>
			<input
				type="search"
				placeholder="Search..."
				bind:value={searchQuery}
				on:keydown={(e) => e.key === 'Enter' && handleSearch()}
			/>
			<button class="close-search" on:click={toggleSearch}>✕</button>
		</div>
	{/if}
</header>

<main>
	<slot />
</main>

<style>
	:root {
		--primary-color: #4caf50;
		--secondary-color: #2196f3;
		--accent-color: #ffc107;
		--text-color: #333;
		--background-color: #ffffff;
		--nav-height: 70px;
	}

	.dark-theme {
		--primary-color: #66bb6a;
		--secondary-color: #42a5f5;
		--accent-color: #ffca28;
		--text-color: #e0e0e0;
		--background-color: #121212;
	}

	header {
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: var(--background-color);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	header.hidden {
		transform: translateY(-100%);
	}

	.progress-container {
		width: 100%;
		height: 4px;
		background: #ccc;
	}

	.progress-bar {
		height: 4px;
		background: var(--primary-color);
		width: 0%;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 2rem;
		height: var(--nav-height);
	}

	.logo a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: var(--primary-color);
		font-weight: bold;
		font-size: 1.5rem;
	}

	.logo svg {
		margin-right: 0.5rem;
	}

	.nav-links {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-grow: 1;
	}

	.nav-item {
		position: relative;
		margin: 0 0.5rem;
	}

	.nav-item a {
		text-decoration: none;
		color: var(--text-color);
		font-weight: 500;
		font-size: 1rem;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
	}

	.nav-item.active a {
		background-color: rgba(76, 175, 80, 0.1);
		color: var(--primary-color);
	}

	.nav-item a:hover {
		background-color: rgba(76, 175, 80, 0.1);
		color: var(--primary-color);
		transform: translateY(-2px);
	}

	.icon {
		margin-right: 0.5rem;
		font-size: 1.2rem;
	}

	.submenu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--background-color);
		border-radius: 10px;
		padding: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		z-index: 10;
		min-width: 200px;
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		gap: 0.5rem;
	}

	.submenu-item {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		color: var(--text-color);
		text-decoration: none;
		transition: all 0.2s ease;
		border-radius: 8px;
		white-space: nowrap;
	}

	.submenu-item:hover {
		background-color: rgba(76, 175, 80, 0.1);
		color: var(--primary-color);
		transform: translateX(5px);
	}

	.nav-controls {
		display: flex;
		align-items: center;
	}

	.icon-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.2rem;
		margin: 0 0.5rem;
		padding: 0.5rem;
		border-radius: 50%;
		transition: all 0.3s ease;
	}

	.icon-btn:hover {
		background-color: rgba(76, 175, 80, 0.1);
	}

	.notifications {
		position: relative;
	}

	.notification-badge {
		position: absolute;
		top: -5px;
		right: -5px;
		background-color: var(--accent-color);
		color: var(--text-color);
		font-size: 0.7rem;
		padding: 2px 5px;
		border-radius: 50%;
	}

	.btn {
		text-decoration: none;
		padding: 0.5rem 1rem;
		border-radius: 20px;
		font-weight: bold;
		transition: all 0.3s ease;
		white-space: nowrap;
	}

	.btn-primary {
		background-color: var(--primary-color);
		color: white;
	}

	.btn-primary:hover {
		background-color: #45a049;
		transform: translateY(-2px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.search-overlay {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: var(--background-color);
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.search-overlay input {
		width: 100%;
		max-width: 600px;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border: none;
		border-radius: 20px;
		background-color: rgba(76, 175, 80, 0.1);
	}

	.close-search {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		margin-left: 1rem;
	}

	.course-explorer {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--background-color);
		border-radius: 15px;
		padding: 1.5rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		z-index: 10;
		width: 800px;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
	}

	.categories {
		width: 30%;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.category-item {
		display: flex;
		align-items: center;
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: all 0.3s ease;
		border-radius: 10px;
		background-color: rgba(var(--category-color), 0.1);
	}

	.category-item:hover,
	.category-item.active {
		background-color: var(--category-color);
		color: white;
		transform: translateX(5px);
	}

	.category-icon {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		margin-right: 0.75rem;
		font-weight: bold;
	}

	.category-name {
		font-weight: 500;
	}

	.courses {
		width: 65%;
		display: flex;
		flex-direction: column;
	}

	.courses-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: 0.75rem;
	}

	.course {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.75rem;
		color: var(--text-color);
		text-decoration: none;
		transition: all 0.3s ease;
		border-radius: 10px;
		background-color: rgba(var(--course-color), 0.1);
		text-align: center;
		position: relative;
		overflow: hidden;
		height: 100px;
	}

	.course:hover {
		background-color: rgba(var(--course-color), 0.3);
		color: var(--text-color);
		transform: translateY(-3px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.course-icon {
		font-size: 1.8rem;
		margin-bottom: 0.3rem;
	}

	.course-name {
		font-weight: 500;
		font-size: 0.9rem;
		transition: all 0.3s ease;
	}

	.course-details {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 0.3rem;
		font-size: 0.8rem;
		transform: translateY(100%);
		transition: all 0.3s ease;
	}

	.course:hover .course-details {
		transform: translateY(0);
	}

	.course-placeholder {
		color: var(--text-color);
		opacity: 0.7;
		text-align: center;
		padding: 1rem;
		font-style: italic;
	}

	@media (max-width: 900px) {
		.course-explorer {
			width: 90vw;
			flex-direction: column;
		}

		.categories {
			width: 100%;
			flex-direction: row;
			overflow-x: auto;
			padding-bottom: 1rem;
			margin-bottom: 1rem;
		}

		.category-item {
			flex-shrink: 0;
		}

		.courses {
			width: 100%;
		}

		.courses-grid {
			grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		}
	}

	nav {
		justify-content: center;
	}

	.logo {
		margin-right: auto;
	}

	.nav-controls {
		margin-left: auto;
	}
</style>
