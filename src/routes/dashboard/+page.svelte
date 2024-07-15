<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { quintOut, elasticOut } from 'svelte/easing';
	import { writable } from 'svelte/store';

	interface ActiveCourse {
		id: number;
		title: string;
		progress: number;
		lastAccessed: string;
		imageUrl: string;
	}

	interface AvailableCourse {
		id: number;
		title: string;
		difficulty: string;
		duration: string;
		description: string;
		tags: string[];
		imageUrl: string;
		rating: number;
	}

	interface QuizQuestion {
		question: string;
		options: string[];
		answer: string;
	}

	let activeCourses: ActiveCourse[] = [];
	let availableCourses: AvailableCourse[] = [];
	let selectedCourseId: number | null = null;
	let isLoading = true;
	let showConfetti = false;
	let searchTerm = '';
	let activeTab = 'learning';
	let userXP = 0;
	let userLevel = 1;
	let dailyStreak = 0;
	let showAchievement = false;
	let achievementMessage = '';
	let showQuiz = false;
	let currentQuizQuestion: QuizQuestion | null = null;
	let userAnswer = '';
	let quizResult = '';
	let showCommunity = false;
	let communityPosts: { user: string; content: string; likes: number; avatar: string }[] = [];
	let newCommunityPost = '';

	const notifications = writable<string[]>([]);

	let quizQuestions: QuizQuestion[] = [
		{
			question: 'What is the primary goal of supervised learning?',
			options: [
				'To cluster data points',
				'To predict labels for new, unseen data',
				'To reduce the dimensionality of data',
				'To generate new data samples'
			],
			answer: 'To predict labels for new, unseen data'
		},
		{
			question: 'Which of the following is NOT a type of neural network?',
			options: [
				'Convolutional Neural Network (CNN)',
				'Recurrent Neural Network (RNN)',
				'Exponential Neural Network (ENN)',
				'Generative Adversarial Network (GAN)'
			],
			answer: 'Exponential Neural Network (ENN)'
		},
		{
			question: "What does the term 'epoch' mean in machine learning?",
			options: [
				'A type of neural network',
				'The accuracy of a model',
				'One complete pass through the entire training dataset',
				'The learning rate of an algorithm'
			],
			answer: 'One complete pass through the entire training dataset'
		},
		{
			question: 'Which of the following is an unsupervised learning algorithm?',
			options: [
				'Linear Regression',
				'Random Forest',
				'K-means Clustering',
				'Support Vector Machine'
			],
			answer: 'K-means Clustering'
		},
		{
			question: 'What is the purpose of activation functions in neural networks?',
			options: [
				'To initialize weights',
				'To introduce non-linearity',
				'To normalize input data',
				'To reduce overfitting'
			],
			answer: 'To introduce non-linearity'
		},
		{
			question: 'Which of the following is NOT a common loss function?',
			options: ['Mean Squared Error', 'Cross-Entropy', 'Hinge Loss', 'Gaussian Loss'],
			answer: 'Gaussian Loss'
		},
		{
			question: 'What does LSTM stand for in the context of neural networks?',
			options: [
				'Long Short-Term Memory',
				'Linear System Transition Model',
				'Logarithmic Soft Threshold Method',
				'Least Squares Training Method'
			],
			answer: 'Long Short-Term Memory'
		},
		{
			question: 'Which of the following is a valid activation function?',
			options: ['ReLU', 'JPEG', 'HTTP', 'SQL'],
			answer: 'ReLU'
		},
		{
			question: 'What is the purpose of dropout in neural networks?',
			options: [
				'To increase model complexity',
				'To speed up training',
				'To reduce overfitting',
				'To initialize weights'
			],
			answer: 'To reduce overfitting'
		},
		{
			question: 'Which of the following is NOT a type of gradient descent optimization algorithm?',
			options: ['Stochastic Gradient Descent', 'Adam', 'RMSprop', 'K-Nearest Neighbors'],
			answer: 'K-Nearest Neighbors'
		},
		{
			question: 'What does CNN stand for in the context of deep learning?',
			options: [
				'Convolutional Neural Network',
				'Complex Number Network',
				'Continuous Node Network',
				'Computational Neuron Network'
			],
			answer: 'Convolutional Neural Network'
		},
		{
			question: 'Which of the following is a type of ensemble learning method?',
			options: ['K-means', 'PCA', 'Random Forest', 'Gradient Descent'],
			answer: 'Random Forest'
		},
		{
			question: 'What is the purpose of regularization in machine learning?',
			options: [
				'To increase model complexity',
				'To reduce overfitting',
				'To speed up training',
				'To increase the learning rate'
			],
			answer: 'To reduce overfitting'
		},
		{
			question: 'Which of the following is NOT a common activation function?',
			options: ['Sigmoid', 'Tanh', 'ReLU', 'Cosine'],
			answer: 'Cosine'
		},
		{
			question: 'What is the main advantage of using mini-batch gradient descent?',
			options: [
				'It always converges to the global minimum',
				"It's faster than stochastic gradient descent",
				'It requires less memory than batch gradient descent',
				"It's more computationally efficient and provides a balance between the other methods"
			],
			answer: "It's more computationally efficient and provides a balance between the other methods"
		},
		{
			question: "What does the term 'vanishing gradient problem' refer to?",
			options: [
				'When gradients become too large during backpropagation',
				'When gradients become very small and effectively prevent the network from learning',
				'When the learning rate is set too high',
				'When the network has too many layers'
			],
			answer: 'When gradients become very small and effectively prevent the network from learning'
		},
		{
			question: 'Which of the following is NOT a type of data preprocessing technique?',
			options: ['Normalization', 'Feature scaling', 'One-hot encoding', 'Backpropagation'],
			answer: 'Backpropagation'
		},
		{
			question: 'What is transfer learning in the context of machine learning?',
			options: [
				'Transferring data between different machine learning models',
				'Using a pre-trained model as a starting point for a new task',
				'Transferring learning rates between epochs',
				'Moving a trained model from one computer to another'
			],
			answer: 'Using a pre-trained model as a starting point for a new task'
		},
		{
			question: 'Which of the following is a valid hyperparameter for a neural network?',
			options: [
				'Number of hidden layers',
				'Value of the weights',
				'Gradient of the loss function',
				'Output of the activation function'
			],
			answer: 'Number of hidden layers'
		},
		{
			question: 'What is the purpose of the softmax function in neural networks?',
			options: [
				'To introduce non-linearity',
				'To normalize the input data',
				'To convert the output to a probability distribution',
				'To reduce overfitting'
			],
			answer: 'To convert the output to a probability distribution'
		}
	];

	onMount(() => {
		fetchCourses();
		initializeUserData();
		initializeCommunityPosts();
	});

	function fetchCourses() {
		setTimeout(() => {
			activeCourses = [
				{
					id: 1,
					title: 'Introduction to Machine Learning',
					progress: 65,
					lastAccessed: '2023-07-03',
					imageUrl:
						'https://datascientest.com/en/wp-content/uploads/sites/9/2021/01/Machine-learning-def-.png'
				},
				{
					id: 2,
					title: 'Neural Networks Fundamentals',
					progress: 30,
					lastAccessed: '2023-07-01',
					imageUrl:
						'https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230602113310/Neural-Networks-Architecture.png'
				},
				{
					id: 3,
					title: 'Deep Learning with PyTorch',
					progress: 85,
					lastAccessed: '2023-07-04',
					imageUrl: 'https://miro.medium.com/v2/resize:fit:691/1*TmPTEZkQ4kBiQqZlwVH0MQ.png'
				}
			];
			availableCourses = [
				{
					id: 4,
					title: 'Computer Vision Basics',
					difficulty: 'Intermediate',
					duration: '6 weeks',
					description: 'Learn the fundamentals of computer vision and image processing.',
					tags: ['CV', 'OpenCV', 'Image Processing'],
					imageUrl:
						'https://images.ctfassets.net/3viuren4us1n/1Ghw96A2tcYRfRezOwtmjx/04efa17f5d5beb042bbb7f8dc18764e2/Computer_vision.jpg?fm=webp&w=1920',
					rating: 4.5
				},
				{
					id: 5,
					title: 'Natural Language Processing',
					difficulty: 'Advanced',
					duration: '8 weeks',
					description: 'Dive into NLP techniques and build language models.',
					tags: ['NLP', 'NLTK', 'Transformers'],
					imageUrl:
						'https://codesrevolvewordpress.s3.us-west-2.amazonaws.com/revolveai/2022/05/15110810/natural-language-processing-techniques.png',
					rating: 4.8
				},
				{
					id: 6,
					title: 'Reinforcement Learning',
					difficulty: 'Advanced',
					duration: '10 weeks',
					description: 'Master the concepts of RL and build game-playing agents.',
					tags: ['RL', 'Q-Learning', 'Policy Gradients'],
					imageUrl: 'https://miro.medium.com/v2/resize:fit:4918/1*Y0TDuXNyywjqqr5l5GkMQQ.png',
					rating: 4.7
				}
			];
			isLoading = false;
		}, 1000);
	}

	function initializeUserData() {
		userXP = Math.floor(Math.random() * 1000);
		userLevel = Math.floor(userXP / 100) + 1;
		dailyStreak = Math.floor(Math.random() * 30);
	}

	function initializeCommunityPosts() {
		communityPosts = [
			{
				user: 'AIEnthusiast',
				content: 'Just completed the Neural Networks course. Mind-blowing!',
				likes: 15,
				avatar: 'https://i.pravatar.cc/150?img=1'
			},
			{
				user: 'DataScientist42',
				content: 'Anyone want to form a study group for the RL course?',
				likes: 8,
				avatar: 'https://i.pravatar.cc/150?img=2'
			},
			{
				user: 'MLNewbie',
				content: 'Struggling with backpropagation. Any tips?',
				likes: 3,
				avatar: 'https://i.pravatar.cc/150?img=3'
			}
		];
	}

	function addActiveCourse() {
		if (selectedCourseId) {
			const courseToAdd = availableCourses.find((c) => c.id === selectedCourseId);
			if (courseToAdd) {
				activeCourses = [
					...activeCourses,
					{ ...courseToAdd, progress: 0, lastAccessed: new Date().toISOString().split('T')[0] }
				];
				availableCourses = availableCourses.filter((c) => c.id !== selectedCourseId);
				selectedCourseId = null;
				showConfetti = true;
				setTimeout(() => (showConfetti = false), 3000);
				addNotification(`Added ${courseToAdd.title} to your active courses!`);
				checkAchievements();
			}
		}
	}

	function getProgressColor(progress: number) {
		if (progress < 30) return 'is-danger';
		if (progress < 70) return 'is-warning';
		return 'is-success';
	}

	function filterCourses(courses: AvailableCourse[]) {
		return courses.filter(
			(course) =>
				course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				course.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
		);
	}

	function removeActiveCourse(courseId: number) {
		const courseToRemove = activeCourses.find((c) => c.id === courseId);
		if (courseToRemove) {
			activeCourses = activeCourses.filter((c) => c.id !== courseId);
			availableCourses = [
				...availableCourses,
				{
					...courseToRemove,
					difficulty: 'Intermediate',
					duration: '6 weeks',
					description: 'Course description',
					tags: [],
					rating: 4.0
				}
			];
			addNotification(`Removed ${courseToRemove.title} from your active courses.`);
		}
	}

	function checkAchievements() {
		if (activeCourses.length === 5) {
			showAchievement = true;
			achievementMessage = 'Achievement Unlocked: Course Collector - Enrolled in 5 courses!';
			setTimeout(() => (showAchievement = false), 5000);
		}
	}

	function startQuiz() {
		showQuiz = true;
		currentQuizQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
		userAnswer = '';
		quizResult = '';
	}

	function submitQuiz() {
		if (currentQuizQuestion && userAnswer === currentQuizQuestion.answer) {
			quizResult = 'Correct! Well done!';
			userXP += 50;
			checkLevelUp();
		} else {
			quizResult = 'Incorrect. The correct answer is: ' + currentQuizQuestion?.answer;
		}
	}

	function checkLevelUp() {
		const newLevel = Math.floor(userXP / 100) + 1;
		if (newLevel > userLevel) {
			userLevel = newLevel;
			showAchievement = true;
			achievementMessage = `Level Up! You are now level ${userLevel}!`;
			setTimeout(() => (showAchievement = false), 5000);
		}
	}

	function toggleCommunity() {
		showCommunity = !showCommunity;
	}

	function addCommunityPost(content: string) {
		communityPosts = [
			{ user: 'You', content, likes: 0, avatar: 'https://i.pravatar.cc/150?img=4' },
			...communityPosts
		];
		newCommunityPost = '';
	}

	function likeCommunityPost(index: number) {
		communityPosts[index].likes += 1;
		communityPosts = [...communityPosts];
	}

	function addNotification(message: string) {
		notifications.update((n) => [...n, message]);
		setTimeout(() => {
			notifications.update((n) => n.filter((item) => item !== message));
		}, 3000);
	}
</script>

<svelte:head>
	<title>BrainBlox - AI Learning Dashboard</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if isLoading}
	<div class="pageloader is-active"><span class="title">Loading your AI adventure...</span></div>
{:else}
	<div class="dashboard-wrapper">
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<section class="hero is-primary is-bold is-fullwidth">
			<div class="hero-body">
				<div class="container">
					<h1 class="title is-3 mb-6">Welcome to BrainBlox</h1>
					<h2 class="subtitle is-4 mb-6">
						Your journey into the world of Artificial Intelligence starts here!
					</h2>
					<div class="level">
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">XP</p>
								<p class="title">{userXP}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Level</p>
								<p class="title">{userLevel}</p>
							</div>
						</div>
						<div class="level-item has-text-centered">
							<div>
								<p class="heading">Daily Streak</p>
								<p class="title">{dailyStreak} days</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<div class="dashboard-container">
			<div class="tabs is-centered mt-4">
				<ul>
					<li class:is-active={activeTab === 'learning'}>
						<button
							type="button"
							class="tab-button"
							on:click={() => (activeTab = 'learning')}
							on:keydown={(e) => e.key === 'Enter' && (activeTab = 'learning')}
							aria-selected={activeTab === 'learning'}
							role="tab"
						>
							<span class="icon is-small"><i class="fas fa-book" aria-hidden="true"></i></span>
							<span>Learning Journey</span>
						</button>
					</li>
					<li class:is-active={activeTab === 'discover'}>
						<button
							type="button"
							class="tab-button"
							on:click={() => (activeTab = 'discover')}
							on:keydown={(e) => e.key === 'Enter' && (activeTab = 'discover')}
							aria-selected={activeTab === 'discover'}
							role="tab"
						>
							<span class="icon is-small"><i class="fas fa-search" aria-hidden="true"></i></span>
							<span>Discover Courses</span>
						</button>
					</li>
				</ul>
			</div>

			{#if activeTab === 'learning'}
				<section class="section learning-journey" in:fade>
					<h2 class="title is-2">Your Learning Journey</h2>
					<div class="columns is-multiline fixed-height-container">
						{#each activeCourses as course}
							<div
								class="column is-one-third"
								in:fly={{ y: 200, duration: 1000, easing: quintOut }}
							>
								<div class="card">
									<div class="card-image">
										<figure class="image is-4by3">
											<img src={course.imageUrl} alt={course.title} />
										</figure>
									</div>
									<header class="card-header">
										<p class="card-header-title">{course.title}</p>
										<button
											class="card-header-icon"
											aria-label="remove course"
											on:click={() => removeActiveCourse(course.id)}
										>
											<span class="icon">
												<i class="fas fa-times"></i>
											</span>
										</button>
									</header>
									<div class="card-content">
										<progress
											class="progress {getProgressColor(course.progress)}"
											value={course.progress}
											max="100">{course.progress}%</progress
										>
										<p class="subtitle is-6">Progress: {course.progress}%</p>
										<p>Last accessed: {course.lastAccessed}</p>
										<a href={`/course/${course.id}`} class="button is-primary is-fullwidth mt-4">
											<span class="icon">
												<i class="fas fa-play"></i>
											</span>
											<span>Continue Learning</span>
										</a>
									</div>
								</div>
							</div>
						{/each}
					</div>
					<div class="buttons is-centered mt-6">
						<button class="button is-info is-large animated-button" on:click={startQuiz}>
							<span class="icon">
								<i class="fas fa-question-circle"></i>
							</span>
							<span>Take a Quick Quiz</span>
						</button>
						<button class="button is-success is-large animated-button" on:click={toggleCommunity}>
							<span class="icon">
								<i class="fas fa-users"></i>
							</span>
							<span>Community Hub</span>
						</button>
					</div>
				</section>
			{:else if activeTab === 'discover'}
				<section class="section discover-courses" in:fade>
					<h2 class="title is-2">Discover New Horizons</h2>
					<div class="field">
						<div class="control has-icons-left">
							<input
								class="input is-rounded"
								type="text"
								placeholder="Search courses or tags"
								bind:value={searchTerm}
							/>
							<span class="icon is-small is-left">
								<i class="fas fa-search"></i>
							</span>
						</div>
					</div>
					<div class="columns is-multiline fixed-height-container">
						{#each filterCourses(availableCourses) as course}
							<div class="column is-one-third" in:scale={{ duration: 300, start: 0.8 }}>
								<div class="card">
									<div class="card-image">
										<figure class="image is-4by3">
											<img src={course.imageUrl} alt={course.title} />
										</figure>
									</div>
									<div class="card-content">
										<p class="title is-4 mb-3">{course.title}</p>
										<div class="tags mb-3">
											<span class="tag is-info is-light mr-2">{course.difficulty}</span>
											<span class="tag is-warning is-light">{course.duration}</span>
										</div>
										<p class="content mb-4">{course.description}</p>
										<div class="tags mb-4">
											{#each course.tags as tag}
												<span class="tag is-primary is-light mr-2 mb-2">{tag}</span>
											{/each}
										</div>
										<div class="level is-mobile">
											<div class="level-left">
												<div class="level-item">
													<p class="subtitle is-6">
														<span class="icon has-text-warning mr-1">
															<i class="fas fa-star"></i>
														</span>
														{course.rating.toFixed(1)}
													</p>
												</div>
											</div>
											<div class="level-right">
												<div class="level-item">
													<button
														class="button is-primary is-rounded animated-button"
														on:click={() => {
															selectedCourseId = course.id;
															addActiveCourse();
														}}
													>
														<span class="icon mr-1">
															<i class="fas fa-plus"></i>
														</span>
														<span>Add to My Courses</span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</div>

	{#if showConfetti}
		<div class="confetti-container" transition:fade>
			{#each Array(50) as _}
				<div
					class="confetti"
					style="left: {Math.random() * 100}%; animation-delay: {Math.random() * 3}s;"
				></div>
			{/each}
		</div>
	{/if}

	{#if showAchievement}
		<div class="achievement" transition:fly={{ y: -50, duration: 500 }}>
			<div class="notification is-success">
				<button class="delete" on:click={() => (showAchievement = false)}></button>
				{achievementMessage}
			</div>
		</div>
	{/if}

	{#if showQuiz}
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Quick Quiz</p>
					<button class="delete" aria-label="close" on:click={() => (showQuiz = false)}></button>
				</header>
				<section class="modal-card-body">
					{#if currentQuizQuestion}
						<div class="quiz-question">
							<h3 class="title is-4">{currentQuizQuestion.question}</h3>
							<div class="options">
								{#each currentQuizQuestion.options as option}
									<label class="radio option-button">
										<input type="radio" bind:group={userAnswer} value={option} />
										<span class="option-text">{option}</span>
									</label>
								{/each}
							</div>
						</div>
						{#if quizResult}
							<div
								class="quiz-result"
								class:is-correct={quizResult.startsWith('Correct')}
								class:is-incorrect={quizResult.startsWith('Incorrect')}
							>
								<p>{quizResult}</p>
							</div>
						{/if}
					{/if}
				</section>
				<footer class="modal-card-foot">
					<button class="button is-primary is-rounded" on:click={submitQuiz} disabled={!userAnswer}
						>Submit Answer</button
					>
					<button
						class="button is-info is-rounded"
						on:click={() => {
							showQuiz = false;
							startQuiz();
						}}>New Question</button
					>
					<button class="button is-rounded" on:click={() => (showQuiz = false)}>Close</button>
				</footer>
			</div>
		</div>
	{/if}

	{#if showCommunity}
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Community Hub</p>
					<button class="delete" aria-label="close" on:click={() => (showCommunity = false)}
					></button>
				</header>
				<section class="modal-card-body">
					<div class="field">
						<!-- svelte-ignore a11y-label-has-associated-control -->
						<label class="label">Share your thoughts</label>
						<div class="control">
							<textarea
								class="textarea is-primary"
								placeholder="What's on your mind?"
								bind:value={newCommunityPost}
							></textarea>
						</div>
					</div>
					<button
						class="button is-primary is-rounded"
						on:click={() => addCommunityPost(newCommunityPost)}>Post</button
					>
					<hr />
					<div class="community-posts">
						{#each communityPosts as post, index}
							<div class="box community-post">
								<article class="media">
									<figure class="media-left">
										<p class="image is-64x64">
											<img src={post.avatar} alt="User avatar" class="is-rounded" />
										</p>
									</figure>
									<div class="media-content">
										<div class="content">
											<p>
												<strong>{post.user}</strong>
												<br />
												{post.content}
											</p>
										</div>
										<nav class="level is-mobile">
											<!-- svelte-ignore a11y-click-events-have-key-events -->
											<!-- svelte-ignore a11y-no-static-element-interactions -->
											<!-- svelte-ignore a11y-no-static-element-interactions -->
											<!-- svelte-ignore a11y-missing-attribute -->
											<!-- svelte-ignore a11y-missing-attribute -->
											<div class="level-left">
												<!-- svelte-ignore a11y-click-events-have-key-events -->
												<a
													class="level-item"
													aria-label="like"
													on:click={() => likeCommunityPost(index)}
												>
													<span class="icon is-small">
														<i class="fas fa-heart"></i>
													</span>
													<span>{post.likes}</span>
												</a>
											</div>
										</nav>
									</div>
								</article>
							</div>
						{/each}
					</div>
				</section>
			</div>
		</div>
	{/if}

	<div class="notification-container">
		{#each $notifications as notification}
			<div
				class="notification is-info"
				in:fly={{ y: 50, duration: 300, delay: 0 }}
				out:fly={{ y: 50, duration: 300 }}
			>
				<button
					class="delete"
					on:click={() => notifications.update((n) => n.filter((item) => item !== notification))}
				></button>
				{notification}
			</div>
		{/each}
	</div>
{/if}

<style>
	:global(body) {
		font-family: 'Poppins', sans-serif;
		margin: 0;
		padding: 0;
		background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
		background-attachment: fixed;
		min-height: 100vh;
		position: relative;
		overflow-x: hidden;
	}

	:global(body::before) {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('https://www.transparenttextures.com/patterns/cubes.png');
		opacity: 0.1;
		z-index: -1;
		pointer-events: none;
	}

	.dashboard-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.dashboard-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		flex-grow: 1;
	}

	.pageloader {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.8);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.confetti-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 1000;
	}

	.confetti {
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #f0f0f0;
		animation: fall 3s linear infinite;
	}

	@keyframes fall {
		to {
			transform: translateY(100vh) rotate(720deg);
		}
	}

	.card {
		height: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		background-color: white;
	}

	.card:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
	}

	.card-image {
		height: 200px;
		overflow: hidden;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.card-content {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}

	.card-content .button {
		margin-top: auto;
	}

	.notification-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		max-width: 300px;
	}

	.tab-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5em 1em;
		color: #4a4a4a;
		display: flex;
		align-items: center;
		font-family: 'Poppins', sans-serif;
		font-weight: 500;
		transition: all 0.3s ease;
	}

	.tab-button:hover {
		color: #3273dc;
	}

	.is-active .tab-button {
		border-bottom: 2px solid #3273dc;
		color: #3273dc;
	}

	.achievement {
		position: fixed;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1000;
	}

	.community-posts {
		max-height: 400px;
		overflow-y: auto;
	}

	.hero {
		background: linear-gradient(135deg, #20b2aa 0%, #00ced1 100%);
		color: white;
		margin-bottom: 2rem;
		position: relative;
		overflow: hidden;
		border-radius: 0 0 30px 30px;
	}

	.hero::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: url('https://www.transparenttextures.com/patterns/dark-geometric.png');
		opacity: 0.1;
		z-index: 1;
		pointer-events: none;
	}

	.hero .title,
	.hero .subtitle {
		color: white;
		position: relative;
		z-index: 2;
	}

	.learning-journey,
	.discover-courses {
		padding: 2rem;
		background-color: rgba(255, 255, 255, 0.9);
		border-radius: 20px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		margin-top: 2rem;
		backdrop-filter: blur(10px);
		height: 4100%;
		width: 1160px;
		max-width: 1160px;
		margin-left: auto;
		margin-right: auto;
	}

	.learning-journey,
	.discover-courses {
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
	}

	.learning-journey:hover,
	.discover-courses:hover {
		transform: translateY(-10px);
		box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
	}

	.title.is-2 {
		font-weight: 600;
		color: #363636;
		margin-bottom: 1.5rem;
	}

	.progress {
		height: 0.75rem;
		border-radius: 0.375rem;
	}

	.tag {
		font-weight: 500;
		border-radius: 20px;
		padding: 0.5em 1em;
	}

	.button {
		font-weight: 500;
		transition: all 0.3s ease;
		border-radius: 25px;
	}

	.button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.modal-card-title {
		font-weight: 600;
	}

	.input,
	.textarea {
		font-family: 'Poppins', sans-serif;
		border-radius: 20px;
	}

	.notification {
		border-radius: 15px;
	}

	.columns {
		margin-top: -0.75rem;
		margin-bottom: -0.75rem;
		margin-left: -0.75rem;
		margin-right: -0.75rem;
	}

	.column {
		padding: 0.75rem;
		height: 500%px;
		width: 33.33%;
	}

	.navbar {
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		border-radius: 0 0 20px 20px;
	}

	.animated-button {
		position: relative;
		overflow: hidden;
		transition: all 0.3s ease;
	}

	.animated-button::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 5px;
		height: 5px;
		background: rgba(255, 255, 255, 0.5);
		opacity: 0;
		border-radius: 100%;
		transform: scale(1, 1) translate(-50%);
		transform-origin: 50% 50%;
	}

	@keyframes ripple {
		0% {
			transform: scale(0, 0);
			opacity: 1;
		}
		20% {
			transform: scale(25, 25);
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(40, 40);
		}
	}

	.animated-button:focus:not(:active)::after {
		animation: ripple 1s ease-out;
	}

	.modal-card {
		max-width: 90%;
		width: 600px;
		border-radius: 20px;
		overflow: hidden;
	}

	.modal-card-body {
		max-height: 70vh;
		overflow-y: auto;
	}

	.community-posts .box {
		transition: all 0.3s ease;
		border-radius: 15px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	.community-posts .box:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	@media (max-width: 768px) {
		.column {
			flex-basis: 100%;
		}
	}

	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0px);
		}
	}

	.card {
		height: 100%;
		width: 1101.72px;
		display: block;
		flex-direction: column;
		border-radius: 15px;
		overflow: hidden;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		background-color: white;
	}

	.notification {
		animation: slideIn 0.5s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	.hero::before {
		content: '';
		position: absolute;
		top: -50%;
		left: -50%;
		width: 200%;
		height: 200%;
		animation: pulse 15s linear infinite;
	}

	@keyframes pulse {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(-50%, -50%);
		}
	}

	.quiz-question {
		background-color: #f5f7fa;
		padding: 2rem;
		border-radius: 15px;
		margin-bottom: 1rem;
	}

	.quiz-question .title {
		margin-bottom: 1.5rem;
	}

	.options {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.option-button {
		display: flex;
		align-items: center;
		padding: 1rem;
		background-color: white;
		border: 2px solid #dbdbdb;
		border-radius: 10px;
		transition: all 0.3s ease;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		margin-bottom: 0.5rem;
	}

	.option-button:hover {
		background-color: #d7ffea;
		transform: translateY(-2px);
	}

	.option-button input[type='radio'] {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	.option-text {
		display: flex;
		align-items: center;
		padding-left: 35px;
		position: relative;
		width: 100%;
	}

	.option-text::before {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		border: 2px solid #dbdbdb;
		border-radius: 50%;
		background-color: #fff;
		transition: all 0.3s ease;
	}

	.option-button input[type='radio']:checked + .option-text {
		font-weight: bold;
		color: #3273dc;
	}

	.option-button input[type='radio']:checked + .option-text::before {
		background-color: #3273dc;
		border-color: #3273dc;
	}

	.option-button input[type='radio']:checked + .option-text::after {
		content: '';
		position: absolute;
		left: 7px;
		top: 50%;
		transform: translateY(-50%);
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background-color: #fff;
	}
	.quiz-result {
		padding: 1rem;
		border-radius: 10px;
		margin-top: 1rem;
		font-weight: bold;
		text-align: center;
	}

	.quiz-result.is-correct {
		background-color: #48c774;
		color: white;
	}

	.quiz-result.is-incorrect {
		background-color: #f14668;
		color: white;
	}

	.community-post {
		background-color: white;
		border-radius: 15px;
		padding: 1.5rem;
		margin-bottom: 1rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.community-post:hover {
		transform: translateY(-5px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}

	.community-post .media-content {
		overflow: hidden;
	}

	.community-post .content p {
		margin-bottom: 0.5rem;
	}

	.community-post .level-item {
		cursor: pointer;
	}

	.community-post .level-item:hover .icon {
		color: #f14668;
	}

	.fixed-height-container {
		height: 600px;
		width: 100%;
		overflow-y: auto;
		padding: 0.75rem;
	}
</style>
