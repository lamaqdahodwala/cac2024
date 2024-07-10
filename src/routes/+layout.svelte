<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, slide, scale } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';
	import { page } from '$app/stores';
  
	let isNavVisible = true;
	let activeSection: string | null = null;
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
  
	const navItems: NavItem[] = [
	  { name: 'Dashboard', icon: '📊', href: '/dashboard' },
	  { name: 'Projects', icon: '🎨', href: '/projects' },
	  { 
		name: 'Learn', 
		icon: '📚', 
		href: '/learn',
		children: [
		  { name: 'Quizzes', icon: '🧠', href: '/learn/quizzes' },
		  { name: 'Lessons', icon: '📖', href: '/learn/lessons' },
		  { name: 'Exercises', icon: '💪', href: '/learn/exercises' },
		  { name: 'Tutorials', icon: '🎮', href: '/learn/tutorials' }
		]
	  },
	  { name: 'Playground', icon: '🛝', href: '/playground' },
	  { 
		name: 'About', 
		icon: 'ℹ️', 
		href: '/about',
		children: [
		  { name: 'Our Team', icon: '👥', href: '/about/team' },
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
	  if (progressBar) progressBar.style.width = scrolled + "%";
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
  </script>
  
  <svelte:window on:scroll={handleScroll} />
  
  <header class:hidden={!isNavVisible} class:light={isColorThemeLight} class:dark={!isColorThemeLight}>
	<div class="progress-container">
	  <div class="progress-bar"></div>
	</div>
	<nav>
	  <div class="logo" in:fly="{{ y: -50, duration: 500, delay: 200 }}">
		<a href="/" aria-label="Home">
		  <svg width="40" height="40" viewBox="0 0 100 100">
			<circle cx="50" cy="50" r="45" fill="#4CAF50" />
			<text x="50" y="65" font-size="50" text-anchor="middle" fill="white">K</text>
		  </svg>
		  <span>DB</span>
		</a>
	  </div>
	  <div class="nav-links">
		{#each navItems as item}
		  <!-- svelte-ignore a11y-no-static-element-interactions -->
		  <div 
			class="nav-item" 
			class:active={$page.url.pathname.startsWith(item.href)}
			on:mouseenter={() => activeSection = item.name}
			on:mouseleave={() => activeSection = null}
		  >
			<a href={item.href}>
			  <span class="icon">{item.icon}</span>
			  <span class="text">{item.name}</span>
			</a>
			{#if item.children && activeSection === item.name}
			  <div class="submenu" in:scale={{duration: 200, start: 0.95}} out:scale={{duration: 150, start: 0.95}}>
				{#each item.children as child}
				  <a href={child.href} class="submenu-item">
					<span class="icon">{child.icon}</span>
					<span class="text">{child.name}</span>
				  </a>
				{/each}
			  </div>
			{/if}
		  </div>
		{/each}
	  </div>
	  <div class="nav-controls">
		<button class="icon-btn search-btn" on:click={toggleSearch} aria-label="Search">
		  <span class="icon">🔍</span>
		</button>
		<button class="icon-btn theme-btn" on:click={toggleColorTheme} aria-label="Toggle color theme">
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
	  <div class="search-overlay" transition:fade={{duration: 200}}>
		<input 
		  type="search" 
		  placeholder="Search..." 
		  bind:value={searchQuery}
		  on:keydown={(e) => e.key === 'Enter' && handleSearch()}
		>
		<button class="close-search" on:click={toggleSearch}>✕</button>
	  </div>
	{/if}
  </header>
  
  <main>
	<slot />
  </main>
  
  <style>
	:root {
	  --primary-color: #4CAF50;
	  --secondary-color: #2196F3;
	  --accent-color: #FFC107;
	  --text-color: #333;
	  --background-color: #FFFFFF;
	  --nav-height: 70px;
	}
  
	.dark-theme {
	  --primary-color: #66BB6A;
	  --secondary-color: #42A5F5;
	  --accent-color: #FFCA28;
	  --text-color: #E0E0E0;
	  --background-color: #121212;
	}
  
	header {
	  position: fixed;
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
  
	.nav-item:hover a,
	.nav-item.active a {
	  background-color: rgba(76, 175, 80, 0.1);
	  color: var(--primary-color);
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
	  padding: 0.5rem;
	  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	  z-index: 10;
	  min-width: 200px;
	}
  
	.submenu-item {
	  display: flex;
	  align-items: center;
	  padding: 0.5rem 1rem;
	  color: var(--text-color);
	  text-decoration: none;
	  transition: all 0.2s ease;
	}
  
	.submenu-item:hover {
	  background-color: rgba(76, 175, 80, 0.1);
	  color: var(--primary-color);
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
  
	@media (max-width: 768px) {
	  .nav-links {
		display: none;
	  }
  
	  .nav-controls {
		margin-left: auto;
	  }
  
	  .btn-primary {
		display: none;
	  }
	}
  </style>