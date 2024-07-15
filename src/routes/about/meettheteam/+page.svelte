<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { backOut, elasticOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const dispatch = createEventDispatcher();

	interface Skill {
		name: string;
		level: number;
	}

	interface SocialLink {
		platform: string;
		url: string;
	}

	interface Achievement {
		title: string;
		description: string;
	}

	interface TeamMember {
		id: string;
		name: string;
		title: string;
		image: string;
		bio: string;
		skills: Skill[];
		socialLinks: SocialLink[];
		achievements: Achievement[];
		quote: string;
		funFact: string;
		favoriteColor: string;
		petName?: string;
		superpower: string;
		hobby: string;
	}

	const teamMembers: TeamMember[] = [
		{
			id: 'joel-raj',
			name: 'Joel Raj',
			title: 'Founder',
			image:
				'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
			bio: "Joel is our visionary founder with a passion for AI and education. He's dedicated to making complex concepts.",
			skills: [
				{ name: 'AI Development', level: 95 },
				{ name: 'Educational Design', level: 90 },
				{ name: 'Team Leadership', level: 88 },
				{ name: 'Creative Problem Solving', level: 92 }
			],
			socialLinks: [
				{ platform: 'linkedin', url: 'https://linkedin.com/in/joelraj' },
				{ platform: 'twitter', url: 'https://twitter.com/joelraj' },
				{ platform: 'github', url: 'https://github.com/joelraj' }
			],
			achievements: [
				{
					title: 'AI Educator of the Year',
					description: 'Recognized for innovative approaches in AI education'
				},
				{
					title: 'TechStart Mentorship Award',
					description: 'Mentored 50+ young tech entrepreneurs'
				}
			],
			quote: 'In the realm of AI, every challenge is an opportunity to innovate and educate.',
			funFact: 'Once debugged code while skydiving (safely on the ground, of course)!',
			favoriteColor: '#3498db',
			petName: 'Binary',
			superpower: 'Translating complex AI concepts into simple, fun ideas',
			hobby: 'Building mini-robots with upcycled materials'
		},
		{
			id: 'lamaq-dahodwala',
			name: 'Lamaq Dahodwala',
			title: 'Co-Founder & CTO',
			image:
				'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
			bio: 'Lamaq is our technical genius, turning innovative ideas into robust, scalable solutions. His coding prowess is matched only by his dedication to clean, efficient code.',
			skills: [
				{ name: 'Full-Stack Development', level: 98 },
				{ name: 'System Architecture', level: 95 },
				{ name: 'Performance Optimization', level: 92 },
				{ name: 'DevOps', level: 90 }
			],
			socialLinks: [
				{ platform: 'linkedin', url: 'https://linkedin.com/in/lamaqdahodwala' },
				{ platform: 'twitter', url: 'https://twitter.com/lamaqdahodwala' },
				{ platform: 'github', url: 'https://github.com/lamaqdahodwala' }
			],
			achievements: [
				{
					title: 'Open Source Contributor of the Year',
					description: 'Major contributions to key educational tech projects'
				},
				{
					title: 'Hackathon Champion',
					description: 'Led team to victory in the Global EdTech Hackathon'
				}
			],
			quote: "Code is poetry; let's write epics together.",
			funFact: 'Can type 150 words per minute... in binary!',
			favoriteColor: '#2ecc71',
			petName: 'Pixel',
			superpower: 'Turning coffee into code at superhuman speeds',
			hobby: 'Creating miniature digital art installations'
		},
		{
			id: 'sarah-chen',
			name: 'Sarah Chen',
			title: 'Creative Director & COO',
			image:
				'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg',
			bio: 'Sarah is the creative force behind our stunning visuals and intuitive user experiences. Her designs bring our educational content to life in vibrant, engaging ways.',
			skills: [
				{ name: 'UX/UI Design', level: 96 },
				{ name: 'Visual Storytelling', level: 94 },
				{ name: 'Prototyping', level: 92 },
				{ name: 'User Research', level: 90 }
			],
			socialLinks: [
				{ platform: 'linkedin', url: 'https://linkedin.com/in/sarahchen' },
				{ platform: 'behance', url: 'https://behance.net/sarahchen' },
				{ platform: 'dribbble', url: 'https://dribbble.com/sarahchen' }
			],
			achievements: [
				{
					title: 'Design Innovation Award',
					description: 'For groundbreaking work in educational app interfaces'
				},
				{
					title: 'Featured in UX Magazine',
					description: 'Spotlight on revolutionary learning experience design'
				}
			],
			quote:
				'Design is not just what it looks like and feels like. Design is how it works, especially in education.',
			funFact: 'Can sketch a perfect circle freehand!',
			favoriteColor: '#e74c3c',
			petName: 'Palette',
			superpower: 'Visualizing complex data in beautiful, understandable ways',
			hobby: 'Experimenting with AR in everyday objects'
		}
	];

	let activeTab = 'Core Team';
	let selectedMember: TeamMember | null = null;
	let isModalOpen = false;
	let searchQuery = '';
	let sortBy: 'name' | 'title' = 'name';
	let sortOrder: 'asc' | 'desc' = 'asc';
	let teamMemberOfTheMonth: TeamMember = teamMembers[0];
	let funMeterProgress = tweened(0, {
		duration: 2000,
		easing: cubicOut
	});

	$: filteredMembers = teamMembers
		.filter(
			(member) =>
				member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				member.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			const compareValue = sortOrder === 'asc' ? 1 : -1;
			return a[sortBy] > b[sortBy] ? compareValue : -compareValue;
		});

	function openModal(member: TeamMember) {
		selectedMember = member;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
		setTimeout(() => {
			selectedMember = null;
		}, 300);
	}

	function handleSort(key: 'name' | 'title') {
		if (sortBy === key) {
			sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = key;
			sortOrder = 'asc';
		}
	}

	function updateFunMeter() {
		const randomProgress = Math.floor(Math.random() * 101);
		funMeterProgress.set(randomProgress);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('.team-member').forEach((member) => {
			observer.observe(member);
		});

		// Initialize fun meter
		updateFunMeter();
		setInterval(updateFunMeter, 10000); // Update every 10 seconds

		// Add floating particles
		const particlesContainer = document.querySelector('.particles-container');
		for (let i = 0; i < 50; i++) {
			const particle = document.createElement('div');
			particle.classList.add('particle');
			particle.style.left = `${Math.random() * 100}vw`;
			particle.style.animationDuration = `${Math.random() * 20 + 10}s`;
			particlesContainer?.appendChild(particle);
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
	/>
</svelte:head>

<div class="page-container">
	<div class="navbar-placeholder">
		<div class="intro-text">
			<h1>Meet Our Extraordinary Team</h1>
			<p>
				Welcome to the brains behind BrainBlox! We're a passionate group of innovators, creators,
				and educators on a mission to make AI learning fun and accessible for everyone.
			</p>
			<p>Get ready to meet the wizards who bring the magic of technology to life!</p>
		</div>
	</div>

	<section class="meet-our-team">
		<div class="particles-container"></div>

		<div class="container">
			<div class="fun-fact-banner" in:fly={{ y: 20, duration: 500, delay: 600 }}>
				<p>
					Did You Know? Our team has collectively explained AI concepts to over 10,000 students!
				</p>
			</div>

			<div class="team-member-of-the-month">
				<h2 class="title is-2">Team Member of the Month</h2>
				<div class="member-spotlight">
					<img src={teamMemberOfTheMonth.image} alt={teamMemberOfTheMonth.name} />
					<div class="member-info">
						<h3>Lamaq Dahodwala</h3>
						<p>Co-Founder and CTO</p>
						<div class="achievement">
							<p>Achievement: {teamMemberOfTheMonth.achievements[1].title}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="fun-meter">
				<h3>Team Fun Meter</h3>
				<div class="fun-meter-bar">
					<div class="fun-meter-progress" style="width: {$funMeterProgress}%"></div>
				</div>
				<p class="fun-meter-label">Current Fun Level: {$funMeterProgress}%</p>
			</div>

			<div class="controls" in:fly={{ y: 20, duration: 300, easing: backOut }}>
				<input
					type="search"
					bind:value={searchQuery}
					placeholder="Search for a team member..."
					class="search-input"
				/>
				<div class="sort-controls">
					<button on:click={() => handleSort('name')} class:active={sortBy === 'name'}>
						Sort by Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
					</button>
					<button on:click={() => handleSort('title')} class:active={sortBy === 'title'}>
						Sort by Title {sortBy === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
					</button>
				</div>
			</div>

			<div class="team-grid">
				{#each filteredMembers as member (member.id)}
					<div
						class="team-member"
						style="--member-color: {member.favoriteColor}"
						in:scale={{ duration: 500, delay: 200, easing: elasticOut }}
					>
						<div class="floating-label">{member.superpower}</div>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<div class="member-image">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<img src={member.image} alt={member.name} on:click={() => openModal(member)} />
							<div class="member-emoji"></div>
						</div>
						<div class="member-content">
							<h3>{member.name}</h3>
							<p class="title">{member.title}</p>
							<p class="bio">{member.bio.slice(0, 100)}</p>
							<div class="skill-showcase">
								<h4>Top Skills</h4>
								{#each member.skills.slice(0, 3) as skill}
									<div class="skill">
										<span>{skill.name}</span>
										<div class="skill-bar">
											<div class="skill-level" style="width: {skill.level}%;"></div>
										</div>
									</div>
								{/each}
							</div>
							<div class="member-footer">
								<p class="fun-fact">Fun Fact: {member.funFact}</p>
								<button class="btn btn-primary" on:click={() => openModal(member)}
									>Learn More</button
								>
							</div>
							<div class="social-links">
								{#each member.socialLinks as { platform, url }}
									<a href={url} target="_blank" rel="noopener noreferrer">
										<i class="fab fa-{platform}"></i>
									</a>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<div class="team-stats" in:fly={{ y: 20, duration: 500, delay: 800 }}>
				<h2>Team Superpowers</h2>
				<div class="stats-grid">
					<div class="stat-item">
						<i class="fas fa-lightbulb"></i>
						<span>100+</span>
						<p>Innovative Ideas</p>
					</div>
					<div class="stat-item">
						<i class="fas fa-code"></i>
						<span>1M+</span>
						<p>Lines of Code</p>
					</div>
					<div class="stat-item">
						<i class="fas fa-coffee"></i>
						<span>5,000+</span>
						<p>Cups of Coffee</p>
					</div>
					<div class="stat-item">
						<i class="fas fa-users"></i>
						<span>10,000+</span>
						<p>Students Inspired</p>
					</div>
				</div>
			</div>

			<div class="join-team-cta">
				<h2>Join Our Team!</h2>
				<p>
					Are you passionate about AI and education? We're always looking for talented individuals
					to join our mission!
				</p>
				<a href="/careers" class="btn btn-secondary">Explore Opportunities</a>
			</div>
		</div>
	</section>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if isModalOpen && selectedMember}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="modal-overlay" on:click={closeModal} transition:fade={{ duration: 300 }}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="modal-content"
			on:click|stopPropagation
			in:scale={{ duration: 300, start: 0.95, easing: backOut }}
		>
			<button class="close-modal" on:click={closeModal}>&times;</button>
			<div class="modal-header" style="background-color: {selectedMember.favoriteColor}20">
				<img src={selectedMember.image} alt={selectedMember.name} />
				<div>
					<h2>{selectedMember.name}</h2>
					<p>{selectedMember.title}</p>
				</div>
			</div>
			<div class="modal-body">
				<div class="bio-section">
					<h3>About {selectedMember.name.split(' ')[0]}</h3>
					<p>{selectedMember.bio}</p>
				</div>
				<div class="quote-section">
					<blockquote>"{selectedMember.quote}"</blockquote>
				</div>
				<div class="skills-section">
					<h3>Superpowers</h3>
					<div class="skills-grid">
						{#each selectedMember.skills as skill}
							<div class="skill">
								<span>{skill.name}</span>
								<div class="skill-bar">
									<div
										class="skill-level"
										style="width: {skill.level}%; background-color: {selectedMember.favoriteColor}"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="achievements-section">
					<h3>Achievements</h3>
					<ul class="achievements-list">
						{#each selectedMember.achievements as achievement}
							<li>
								<strong>{achievement.title}</strong>
								<p>{achievement.description}</p>
							</li>
						{/each}
					</ul>
				</div>
				<div class="fun-facts-section">
					<h3>Fun Facts</h3>
					<ul class="fun-facts-list">
						<li><i></i> {selectedMember.funFact}</li>
						<li>
							<i></i> Favorite Color:
							<span class="color-swatch" style="background-color: {selectedMember.favoriteColor}"
							></span>
						</li>
						{#if selectedMember.petName}
							<li><i></i> Team Pet: {selectedMember.petName}</li>
						{/if}
						<li><i></i> Superpower: {selectedMember.superpower}</li>
						<li><i></i> Hobby: {selectedMember.hobby}</li>
					</ul>
				</div>
			</div>
			<div class="modal-footer">
				<h3>Connect with {selectedMember.name.split(' ')[0]}</h3>
				<div class="social-links">
					{#each selectedMember.socialLinks as { platform, url }}
						<a
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							class="social-button"
							style="background-color: {selectedMember.favoriteColor}"
						>
							<i class="fab fa-{platform}"></i>
							{platform}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		font-family:
			'BlinkMacSystemFont',
			-apple-system,
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
		margin: 0;
		padding: 0;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		background-attachment: fixed;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	* {
		font-family:
			'BlinkMacSystemFont',
			-apple-system,
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
	}

	.page-container {
		background-color: var(--background-color);
		color: var(--text-color);
	}

	.navbar-placeholder {
		height: 295.5px;
		background: linear-gradient(135deg, #20b2aa 0%, #00ced1 100%);
		border-radius: 0 0 50px 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.intro-text {
		text-align: center;
		color: white;
		max-width: 800px;
	}

	.intro-text h1 {
		font-size: 3.2rem;
		margin-bottom: 1rem;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		font-weight: 600;
	}

	.intro-text p {
		font-size: 1.2rem;
		line-height: 1.6;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	.meet-our-team {
		padding: 4rem 2rem;
		position: relative;
		overflow: hidden;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.fun-fact-banner {
		background-color: var(--accent-color);
		color: white;
		padding: 1.5rem;
		border-radius: 15px;
		text-align: center;
		font-size: 1.2rem;
		margin-bottom: 3rem;
		box-shadow: 0 5px 15px var(--shadow-color);
		animation: pulse 2s infinite;
		font-weight: 600;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.02);
		}
		100% {
			transform: scale(1);
		}
	}

	.team-member-of-the-month {
		background: linear-gradient(135deg, #d0f0fd, #e0f5d3);
		border-radius: 20px;
		padding: 2rem;
		margin-bottom: 3rem;
		box-shadow: 0 15px 30px var(--shadow-color);
	}

	.team-member-of-the-month h2 {
		color: #363636;
		font-size: 2.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.member-spotlight {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.member-spotlight img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
		border: 5px solid #3e8ed0;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
	}

	.member-info h3 {
		font-size: 2rem;
		color: #363636;
		margin-bottom: 0.5rem;
		font-weight: 450;
	}

	.member-info p {
		font-size: 1.2rem;
		color: var(--text-color);
		margin-bottom: 1rem;
		font-weight: 500;
	}

	.achievement {
		background-color: var(--accent-color);
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 10px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		height: auto;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: background-color 0.3s ease;
	}

	.achievement:hover {
		background-color: darken(var(--accent-color), 10%);
	}

	.fun-meter {
		background-color: var(--card-background);
		border-radius: 20px;
		padding: 2rem;
		margin-bottom: 3rem;
		text-align: center;
		box-shadow: 0 15px 30px var(--shadow-color);
		position: relative; /* Added for pseudo-element use */
		overflow: hidden; /* Added for pseudo-element use */
		background: linear-gradient(135deg, #e0f5d3, #d0f0fd, #48c78e);
	}

	.fun-meter h3 {
		color: #363636;
		font-size: 2rem;
		margin-bottom: 1.5rem;
		font-weight: 600;
	}

	.fun-meter-bar {
		height: 30px;
		background-color: #e0e0e0;
		border-radius: 15px;
		overflow: hidden;
		margin-bottom: 1rem;
		box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.fun-meter-progress {
		height: 100%;
		background: linear-gradient(90deg, #00d1b2, #4caf50);
		transition: width 0.5s ease-out;
		box-shadow: 0 0 10px rgba(76, 175, 80, 0.5);
		position: relative; /* Added for pseudo-element use */
		z-index: 1; /* Added for pseudo-element use */
	}

	/* Pseudo-element for the gradient effect */
	.fun-meter-progress::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, #00d1b2, #4caf50);
		opacity: 0.5; /* Adjust opacity for the gradient overlay effect */
		z-index: -1;
	}

	.fun-meter-label {
		font-size: 1.2rem;
		color: var(--text-color);
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		background-color: var(--card-background);
		padding: 1.5rem;
		border-radius: 15px;
		box-shadow: 0 5px 15px var(--shadow-color);
	}

	.search-input {
		padding: 0.75rem 1rem;
		border: 2px solid #3e8ed0;
		border-radius: 25px;
		font-size: 1rem;
		width: 300px;
		transition: all 0.3s ease;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.search-input:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
		width: 320px;
	}

	.sort-controls button {
		background-color: #48c78e;
		border: none;
		padding: 0.75rem 1rem;
		margin-left: 0.5rem;
		border-radius: 25px;
		cursor: pointer;
		transition: all 0.3s ease;
		color: white;
		font-weight: 600;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.sort-controls button.active {
		background-color: #3e8ed0;
		transform: scale(1.05);
	}

	.team-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.team-member {
		background-color: var(--card-background);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 15px 30px var(--shadow-color);
		transition: all 0.3s ease;
		position: relative;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.team-member:hover {
		transform: translateY(-10px) rotate(2deg);
		box-shadow: 0 20px 40px var(--shadow-color);
	}

	.team-member::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		background-color: var(--member-color);
	}

	.member-image {
		position: relative;
		height: 250px;
		overflow: hidden;
	}

	.member-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.team-member:hover .member-image img {
		transform: scale(1.1);
	}

	.member-emoji {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 2.5rem;
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
		animation: wave 2s infinite;
	}

	@keyframes wave {
		0%,
		100% {
			transform: rotate(0);
		}
		25% {
			transform: rotate(-15deg);
		}
		75% {
			transform: rotate(15deg);
		}
	}

	.member-content {
		padding: 1.5rem;
	}

	.team-member-of-the-month h2.title {
		font-style: normal;
		font-weight: 600;
	}

	.team-member h3 {
		text-align: center;
		margin: 1rem 0 0.5rem;
		color: var(--primary-color);
		font-weight: 700;
		font-size: 1.8rem;
	}

	.title {
		text-align: center;
		color: #3e8ed0;
		font-style: italic;
		margin-bottom: 1rem;
		font-weight: 500;
		font-size: 1.5rem;
	}

	.bio {
		text-align: center;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		line-height: 1.6;
		font-weight: 500;
	}

	.skill-showcase {
		margin-bottom: 1.5rem;
		font-weight: 500;
	}

	.skill-showcase h4 {
		text-align: center;
		color: #3e8ed0;
		margin-bottom: 1rem;
		font-weight: 700;
	}

	.skill {
		margin-bottom: 0.75rem;
	}

	.skill span {
		display: block;
		font-size: 0.9rem;
		margin-bottom: 0.3rem;
	}

	.skill-bar {
		background-color: #e0e0e0;
		height: 8px;
		border-radius: 4px;
		overflow: hidden;
	}

	.skill-level {
		height: 100%;
		background: linear-gradient(90deg, var(--accent-color), #3e8ed0);
		transition: width 1s ease-in-out;
		position: relative;
		overflow: hidden;
	}

	.skill-level::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
		transform: translateX(-100%);
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}
	.member-footer {
		margin-top: auto;
		padding: 1.5rem;
		background-color: rgba(0, 0, 0, 0.05);
	}

	.fun-fact {
		text-align: center;
		font-style: italic;
		margin-bottom: 1rem;
		font-size: 0.9rem;
	}

	.btn {
		display: block;
		width: 100%;
		padding: 0.75rem;
		border: none;
		border-radius: 25px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 600;
		text-transform: uppercase;
		font-size: 1rem;
	}

	.social-links {
		display: flex;
		justify-content: center;
		padding: 1rem;
	}

	.social-links a {
		color: var(--text-color);
		margin: 0 0.5rem;
		font-size: 1.5rem;
		transition: all 0.3s ease;
		font-weight: 500;
	}

	.social-links a:hover {
		color: var(--member-color);
		transform: scale(1.2) rotate(15deg);
	}

	.team-stats {
		background-color: var(--card-background);
		border-radius: 20px;
		padding: 2rem;
		margin-top: 3rem;
		box-shadow: 0 15px 30px var(--shadow-color);
	}

	.team-stats h2 {
		color: var(--primary-color);
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.stat-item {
		text-align: center;
		padding: 1.5rem;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 15px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.stat-item:hover {
		transform: translateY(-5px);
	}

	.stat-item i {
		font-size: 3rem;
		color: var(--secondary-color);
		margin-bottom: 1rem;
	}

	.stat-item span {
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--primary-color);
		display: block;
		margin-bottom: 0.5rem;
	}

	.stat-item p {
		font-size: 1rem;
		color: var(--text-color);
	}

	.join-team-cta {
		background: linear-gradient(135deg, var(--accent-color), #3e8ed0);
		color: white;
		text-align: center;
		padding: 3rem 2rem;
		border-radius: 20px;
		margin-top: 3rem;
		box-shadow: 0 15px 30px var(--shadow-color);
	}

	.join-team-cta h2 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		font-weight: 600;
	}

	.join-team-cta p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		font-weight: 500;
	}

	.btn-secondary {
		background-color: white;
		color: #3e8ed0;
	}

	.btn-secondary:hover {
		background-color: var(--accent-color);
		color: white;
	}

	.particles-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
	}

	.particle {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: var(--primary-color);
		border-radius: 50%;
		opacity: 0.3;
		animation: float linear infinite;
	}

	@keyframes float {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			transform: translateY(-100vh) rotate(360deg);
			opacity: 0;
		}
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: var(--card-background);
		border-radius: 20px;
		padding: 2rem;
		max-width: 800px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.close-modal {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 2.5rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	.close-modal:hover {
		color: var(--accent-color);
		transform: rotate(90deg);
	}

	.modal-header {
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
		padding: 1.5rem;
		border-radius: 15px;
		background-size: cover;
		background-position: center;
	}

	.modal-header img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		margin-right: 2rem;
		border: 5px solid white;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	.modal-header h2 {
		margin: 0;
		color: var(--primary-color);
		font-size: 2.5rem;
	}

	.modal-header p {
		margin: 0.5rem 0 0;
		color: var(--secondary-color);
		font-style: italic;
		font-size: 1.2rem;
	}

	.modal-body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.quote-section {
		grid-column: 1 / -1;
		text-align: center;
		font-style: italic;
		font-size: 1.5rem;
		color: var(--accent-color);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.achievements-list,
	.fun-facts-list {
		list-style-type: none;
		padding: 0;
	}

	.achievements-list li,
	.fun-facts-list li {
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	}

	.color-swatch {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		vertical-align: middle;
		margin-left: 5px;
		border: 2px solid white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.modal-footer {
		margin-top: 2rem;
		text-align: center;
	}

	.modal-footer h3 {
		color: var(--primary-color);
		margin-bottom: 1rem;
	}

	.modal-footer .social-links {
		justify-content: center;
	}

	.social-button {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 25px;
		color: white;
		text-decoration: none;
		margin: 0 0.5rem;
		transition: all 0.3s ease;
	}

	.social-button i {
		margin-right: 0.5rem;
	}

	.social-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 768px) {
		.controls {
			flex-direction: column;
		}

		.search-input {
			width: 100%;
			margin-bottom: 1rem;
		}

		.sort-controls {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}

		.sort-controls button {
			margin: 0.5rem;
		}

		.modal-body {
			grid-template-columns: 1fr;
		}

		.modal-header {
			flex-direction: column;
			text-align: center;
		}

		.modal-header img {
			margin-right: 0;
			margin-bottom: 1rem;
		}

		.team-member-of-the-month .member-spotlight {
			flex-direction: column;
			text-align: center;
		}

		.team-member-of-the-month .member-spotlight img {
			margin-bottom: 1rem;
		}
	}

	/* Additional modern and dynamic styles */
	.team-member {
		perspective: 1000px;
	}

	.team-member:hover {
		animation: cardHover 0.5s ease-in-out;
	}

	@keyframes cardHover {
		0% {
			transform: rotateY(0deg);
		}
		50% {
			transform: rotateY(10deg);
		}
		100% {
			transform: rotateY(0deg);
		}
	}

	.skill-level {
		animation: skillFill 1.5s ease-out forwards;
	}

	@keyframes skillFill {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}

	.fun-fact {
		position: relative;
		overflow: hidden;
	}

	.fun-fact::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			to bottom right,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0.2) 40%,
			rgba(255, 255, 255, 0.6) 50%,
			rgba(255, 255, 255, 0.2) 60%,
			rgba(255, 255, 255, 0.2) 100%
		);
		transform: rotate(45deg);
		animation: shimmer 3s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%) rotate(45deg);
		}
		100% {
			transform: translateX(100%) rotate(45deg);
		}
	}

	.btn {
		overflow: hidden;
		position: relative;
	}

	.btn::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			to bottom right,
			rgba(255, 255, 255, 0) 0%,
			rgba(255, 255, 255, 0.1) 50%,
			rgba(255, 255, 255, 0.3) 100%
		);
		transform: rotate(45deg);
		transition: all 0.3s ease;
	}

	.btn:hover::after {
		left: 100%;
	}

	/* Updated color scheme and modern styles */
	:root {
		--primary-color: #4caf50;
		--secondary-color: #4caf50;
		--accent-color: #48c78e;
		--text-color: #363636;
		--card-background: #ecf0f1;
		--shadow-color: rgba(44, 62, 80, 0.1);
		--background-color: #f5f7fa;
	}

	/* Navbar styles */
	.navbar {
		background-color: #4caf50;
		font-weight: 1000;
	}

	.navbar-brand,
	.nav-link {
		color: #4caf50 !important;
		font-family:
			BlinkMacSystemFont,
			-apple-system,
			'Segoe UI',
			'Roboto',
			'Oxygen',
			'Ubuntu',
			'Cantarell',
			'Fira Sans',
			'Droid Sans',
			'Helvetica Neue',
			sans-serif;
		font-weight: 1000;
	}

	/* Team member card styles */
	.team-member {
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.team-member:hover {
		transform: translateY(-10px) scale(1.02);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
	}

	.team-member::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 5px;
		background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
	}

	.member-image {
		position: relative;
		height: 250px;
		overflow: hidden;
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
	}

	.member-image::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to bottom, rgba(44, 62, 80, 0.2), rgba(44, 62, 80, 0.6));
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.team-member:hover .member-image::after {
		opacity: 1;
	}

	.member-emoji {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 2.5rem;
		filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
		animation: wave 2s infinite;
		z-index: 1;
	}

	.member-content {
		padding: 1.5rem;
		position: relative;
		z-index: 1;
	}

	.team-member h3 {
		text-align: center;
		margin: 1rem 0 0.5rem;
		color: #363636;
		font-weight: 700;
		font-size: 1.8rem;
	}

	.bio {
		text-align: center;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		line-height: 1.6;
	}

	.skill-showcase {
		margin-bottom: 1.5rem;
	}

	.skill {
		margin-bottom: 0.75rem;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 0.5rem;
		border-radius: 10px;
	}

	.skill span {
		display: block;
		font-size: 0.9rem;
		margin-bottom: 0.3rem;
		color: #363636;
	}

	.skill-bar {
		background-color: #e0e0e0;
		height: 8px;
		border-radius: 4px;
		overflow: hidden;
	}

	.member-footer {
		margin-top: auto;
		padding: 1.5rem;
		background-color: rgba(0, 0, 0, 0.05);
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}

	.fun-fact {
		text-align: center;
		font-style: italic;
		margin-bottom: 1rem;
		font-size: 0.9rem;
		color: #3e8ed0;
		background-color: rgba(255, 255, 255, 0.5);
		padding: 0.5rem;
		border-radius: 10px;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--accent-color), #3e8ed0);
		color: white;
		border: none;
	}

	.btn-primary:hover {
		background: linear-gradient(135deg, #3e8ed0, var(--accent-color));
		transform: translateY(-3px);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	}

	/* Team stats section */
	.team-stats {
		background-color: var(--card-background);
		border-radius: 20px;
		padding: 2rem;
		margin-top: 3rem;
		box-shadow: 0 15px 30px var(--shadow-color);
	}

	.team-stats h2 {
		color: #363636;
		text-align: center;
		margin-bottom: 2rem;
		font-size: 2.5rem;
		font-weight: 600;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.stat-item {
		text-align: center;
		padding: 1.5rem;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 15px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.stat-item:hover {
		transform: translateY(-5px);
	}

	.stat-item i {
		font-size: 3rem;
		color: var(--accent-color);
		margin-bottom: 1rem;
	}

	.stat-item span {
		font-size: 2.5rem;
		font-weight: 700;
		color: #363636;
		display: block;
		margin-bottom: 0.5rem;
	}

	.stat-item p {
		font-size: 1rem;
		color: var(--text-color);
	}

	/* Particle animation */
	.particles-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: -1;
	}

	.particle {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: var(--accent-color);
		border-radius: 50%;
		opacity: 0.3;
		animation: float linear infinite;
	}

	@keyframes float {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 0;
		}
		50% {
			opacity: 0.3;
		}
		100% {
			transform: translateY(-100vh) rotate(360deg);
			opacity: 0;
		}
	}

	/* Modal styles */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal-content {
		background-color: var(--card-background);
		border-radius: 20px;
		padding: 2rem;
		max-width: 800px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
	}

	.close-modal {
		position: absolute;
		top: 1rem;
		right: 1rem;
		font-size: 2.5rem;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--text-color);
		transition: all 0.3s ease;
	}

	.close-modal:hover {
		color: var(--accent-color);
		transform: rotate(90deg);
	}

	.modal-header {
		display: flex;
		align-items: center;
		margin-bottom: 2rem;
		padding: 1.5rem;
		border-radius: 15px;
		background-size: cover;
		background-position: center;
	}

	.modal-header img {
		width: 150px;
		height: 150px;
		border-radius: 50%;
		object-fit: cover;
		margin-right: 2rem;
		border: 5px solid white;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	}

	.modal-header h2 {
		margin: 0;
		color: #363636;
		font-size: 2.5rem;
	}

	.modal-header p {
		margin: 0.5rem 0 0;
		color: #363636;
		font-style: italic;
		font-size: 1.2rem;
	}

	.modal-body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.bio-section,
	.quote-section,
	.skills-section,
	.achievements-section,
	.fun-facts-section {
		background-color: rgba(255, 255, 255, 0.8);
		padding: 1.5rem;
		border-radius: 15px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
		font-weight: 500;
	}

	.bio-section h3,
	.skills-section h3,
	.achievements-section h3,
	.fun-facts-section h3 {
		color: #363636;
		margin-bottom: 1rem;
		font-size: 1.8rem;
		font-weight: 600;
	}

	.quote-section {
		grid-column: 1 / -1;
		text-align: center;
		font-style: italic;
		font-size: 1.5rem;
		color: var(--accent-color);
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 1rem;
	}

	.achievements-list,
	.fun-facts-list {
		list-style-type: none;
		padding: 0;
	}

	.achievements-list li,
	.fun-facts-list li {
		margin-bottom: 1rem;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	}

	.color-swatch {
		display: inline-block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		vertical-align: middle;
		margin-left: 5px;
		border: 2px solid white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.modal-footer {
		margin-top: 2rem;
		text-align: center;
	}

	.modal-footer h3 {
		color: #363636;
		margin-bottom: 1rem;
	}

	.modal-footer .social-links {
		justify-content: center;
	}

	.social-button {
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1rem;
		border-radius: 25px;
		color: white;
		text-decoration: none;
		margin: 0 0.5rem;
		transition: all 0.3s ease;
	}

	.social-button i {
		margin-right: 0.5rem;
	}

	.social-button:hover {
		transform: translateY(-3px);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
	}

	/* Responsive design */
	@media (max-width: 768px) {
		.controls {
			flex-direction: column;
		}

		.sort-controls {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}

		.sort-controls button {
			margin: 0.5rem;
		}

		.modal-body {
			grid-template-columns: 1fr;
		}

		.modal-header {
			flex-direction: column;
			text-align: center;
		}

		.modal-header img {
			margin-right: 0;
			margin-bottom: 1rem;
		}

		.team-member-of-the-month .member-spotlight {
			flex-direction: column;
			text-align: center;
		}

		.team-member-of-the-month .member-spotlight img {
			margin-bottom: 1rem;
		}
	}

	/* Additional modern and dynamic styles */
	.team-member {
		perspective: 1000px;
		transform-style: preserve-3d;
	}

	.team-member:hover {
		animation: cardHover 0.5s ease-in-out;
	}

	@keyframes cardHover {
		0% {
			transform: rotateY(0deg);
		}
		50% {
			transform: rotateY(5deg);
		}
		100% {
			transform: rotateY(0deg);
		}
	}

	.skill-level {
		animation: skillFill 1.5s ease-out forwards;
	}

	@keyframes skillFill {
		from {
			width: 0%;
		}
		to {
			width: 100%;
		}
	}

	.fun-fact {
		position: relative;
		overflow: hidden;
	}

	.fun-fact::after {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		background: linear-gradient(
			to bottom right,
			rgba(255, 255, 255, 0.2) 0%,
			rgba(255, 255, 255, 0.2) 40%,
			rgba(255, 255, 255, 0.6) 50%,
			rgba(255, 255, 255, 0.2) 60%,
			rgba(255, 255, 255, 0.2) 100%
		);
		transform: rotate(45deg);
		animation: shimmer 3s infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%) rotate(45deg);
		}
		100% {
			transform: translateX(100%) rotate(45deg);
		}
	}

	/* New modern elements */
	.team-member-backdrop {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(46, 204, 113, 0.2));
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.team-member:hover .team-member-backdrop {
		opacity: 1;
	}

	.team-member-content {
		position: relative;
		z-index: 2;
	}

	.skill-tag {
		display: inline-block;
		background-color: var(--accent-color);
		color: white;
		padding: 0.3rem 0.8rem;
		border-radius: 20px;
		font-size: 0.8rem;
		margin: 0.2rem;
		transition: all 0.3s ease;
	}

	.skill-tag:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	.achievement-icon {
		font-size: 1.2rem;
		color: var(--accent-color);
		margin-right: 0.5rem;
	}

	.team-member-quote {
		font-style: italic;
		color: var(--secondary-color);
		text-align: center;
		margin: 1rem 0;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.5);
		border-radius: 10px;
		position: relative;
	}

	.team-member-quote::before,
	.team-member-quote::after {
		content: '"';
		font-size: 2rem;
		color: var(--accent-color);
		position: absolute;
	}

	.team-member-quote::before {
		top: 0;
		left: 5px;
	}

	.team-member-quote::after {
		bottom: -10px;
		right: 5px;
	}

	.team-member-progress {
		height: 5px;
		background-color: #e0e0e0;
		margin: 1rem 0;
		border-radius: 5px;
		overflow: hidden;
	}

	.team-member-progress-bar {
		height: 100%;
		background: linear-gradient(90deg, var(--accent-color), var(--secondary-color));
		width: 0;
		transition: width 1s ease-in-out;
	}

	.team-member:hover .team-member-progress-bar {
		width: 100%;
	}

	.team-member-specialty {
		text-align: center;
		font-weight: bold;
		color: #363636;
		margin: 1rem 0;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.team-member-contact {
		display: flex;
		justify-content: center;
		margin-top: 1rem;
	}

	.contact-button {
		background-color: var(--accent-color);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 25px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.contact-button:hover {
		background-color: var(--secondary-color);
		transform: translateY(-2px);
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}

	/* Animated background for team stats */
	.team-stats {
		position: relative;
		overflow: hidden;
	}

	.stats-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(
			45deg,
			rgba(52, 152, 219, 0.1) 25%,
			transparent 25%,
			transparent 50%,
			rgba(46, 204, 113, 0.1) 50%,
			rgba(46, 204, 113, 0.1) 75%,
			transparent 75%,
			transparent
		);
		background-size: 60px 60px;
		animation: moveBackground 10s linear infinite;
		z-index: 0;
	}

	@keyframes moveBackground {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 60px 60px;
		}
	}

	.stats-content {
		position: relative;
		z-index: 1;
	}

	/* Interactive elements */
	.interactive-element {
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.interactive-element:hover {
		transform: scale(1.05);
	}

	/* Accessibility improvements */
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	/* Focus styles for keyboard navigation */
	:focus {
		outline: 2px solid var(--accent-color);
		outline-offset: 2px;
	}

	/* High contrast mode styles */
	@media (prefers-contrast: high) {
		:root {
			--primary-color: #000000;
			--secondary-color: #ffffff;
			--accent-color: #0000ff;
			--text-color: #000000;
			--card-background: #ffffff;
		}

		.team-member,
		.modal-content,
		.stat-item {
			border: 2px solid var(--primary-color);
		}
	}

	.fun-meter:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.fun-meter {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.team-member-of-the-month {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.team-member-of-the-month:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.join-team-cta {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.join-team-cta:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.controls {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.controls:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.team-stats:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.team-stats {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.animated-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.5;
	}

	@keyframes move {
		0% {
			transform: translateY(0) rotate(0deg);
			opacity: 1;
			border-radius: 0;
		}
		100% {
			transform: translateY(-1000px) rotate(720deg);
			opacity: 0;
			border-radius: 50%;
		}
	}

	.floating-label {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		background-color: var(--accent-color);
		color: white;
		padding: 5px 10px;
		border-radius: 15px;
		font-size: 0.8rem;
		font-weight: bold;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.team-member:hover .floating-label {
		opacity: 1;
	}
</style>
