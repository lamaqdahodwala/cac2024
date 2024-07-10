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
    let quizQuestion = '';
    let quizOptions: string[] = [];
    let quizAnswer = '';
    let userAnswer = '';
    let quizResult = '';
    let showCommunity = false;
    let communityPosts: { user: string; content: string; likes: number }[] = [];
    let newCommunityPost = '';

    const notifications = writable<string[]>([]);

    onMount(() => {
        fetchCourses();
        initializeUserData();
        initializeCommunityPosts();
    });

    function fetchCourses() {
        setTimeout(() => {
            activeCourses = [
                { id: 1, title: "Introduction to Machine Learning", progress: 65, lastAccessed: "2023-07-03", imageUrl: "https://datascientest.com/en/wp-content/uploads/sites/9/2021/01/Machine-learning-def-.png" },
                { id: 2, title: "Neural Networks Fundamentals", progress: 30, lastAccessed: "2023-07-01", imageUrl: "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230602113310/Neural-Networks-Architecture.png" },
                { id: 3, title: "Deep Learning with PyTorch", progress: 85, lastAccessed: "2023-07-04", imageUrl: "https://miro.medium.com/v2/resize:fit:691/1*TmPTEZkQ4kBiQqZlwVH0MQ.png" },
            ];
            availableCourses = [
                { id: 4, title: "Computer Vision Basics", difficulty: "Intermediate", duration: "6 weeks", description: "Learn the fundamentals of computer vision and image processing.", tags: ["CV", "OpenCV", "Image Processing"], imageUrl: "https://images.ctfassets.net/3viuren4us1n/1Ghw96A2tcYRfRezOwtmjx/04efa17f5d5beb042bbb7f8dc18764e2/Computer_vision.jpg?fm=webp&w=1920", rating: 4.5 },
                { id: 5, title: "Natural Language Processing", difficulty: "Advanced", duration: "8 weeks", description: "Dive into NLP techniques and build language models.", tags: ["NLP", "NLTK", "Transformers"], imageUrl: "https://codesrevolvewordpress.s3.us-west-2.amazonaws.com/revolveai/2022/05/15110810/natural-language-processing-techniques.png", rating: 4.8 },
                { id: 6, title: "Reinforcement Learning", difficulty: "Advanced", duration: "10 weeks", description: "Master the concepts of RL and build game-playing agents.", tags: ["RL", "Q-Learning", "Policy Gradients"], imageUrl: "https://miro.medium.com/v2/resize:fit:4918/1*Y0TDuXNyywjqqr5l5GkMQQ.png", rating: 4.7 },
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
            { user: "AIEnthusiast", content: "Just completed the Neural Networks course. Mind-blowing!", likes: 15 },
            { user: "DataScientist42", content: "Anyone want to form a study group for the RL course?", likes: 8 },
            { user: "MLNewbie", content: "Struggling with backpropagation. Any tips?", likes: 3 },
        ];
    }

    function addActiveCourse() {
        if (selectedCourseId) {
            const courseToAdd = availableCourses.find(c => c.id === selectedCourseId);
            if (courseToAdd) {
                activeCourses = [...activeCourses, { ...courseToAdd, progress: 0, lastAccessed: new Date().toISOString().split('T')[0] }];
                availableCourses = availableCourses.filter(c => c.id !== selectedCourseId);
                selectedCourseId = null;
                showConfetti = true;
                setTimeout(() => showConfetti = false, 3000);
                notifications.update(n => [...n, `Added ${courseToAdd.title} to your active courses!`]);
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
        return courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }

    function removeActiveCourse(courseId: number) {
        const courseToRemove = activeCourses.find(c => c.id === courseId);
        if (courseToRemove) {
            activeCourses = activeCourses.filter(c => c.id !== courseId);
            availableCourses = [...availableCourses, { ...courseToRemove, difficulty: "Intermediate", duration: "6 weeks", description: "Course description", tags: [], rating: 4.0 }];
            notifications.update(n => [...n, `Removed ${courseToRemove.title} from your active courses.`]);
        }
    }

    function checkAchievements() {
        if (activeCourses.length === 5) {
            showAchievement = true;
            achievementMessage = "Achievement Unlocked: Course Collector - Enrolled in 5 courses!";
            setTimeout(() => showAchievement = false, 5000);
        }
    }

    function startQuiz() {
        showQuiz = true;
        quizQuestion = "What is the primary goal of supervised learning?";
        quizOptions = [
            "To cluster data points",
            "To predict labels for new, unseen data",
            "To reduce the dimensionality of data",
            "To generate new data samples"
        ];
        quizAnswer = "To predict labels for new, unseen data";
        userAnswer = '';
        quizResult = '';
    }

    function submitQuiz() {
        if (userAnswer === quizAnswer) {
            quizResult = "Correct! Well done!";
            userXP += 50;
            checkLevelUp();
        } else {
            quizResult = "Incorrect. The correct answer is: " + quizAnswer;
        }
    }

    function checkLevelUp() {
        const newLevel = Math.floor(userXP / 100) + 1;
        if (newLevel > userLevel) {
            userLevel = newLevel;
            showAchievement = true;
            achievementMessage = `Level Up! You are now level ${userLevel}!`;
            setTimeout(() => showAchievement = false, 5000);
        }
    }

    function toggleCommunity() {
        showCommunity = !showCommunity;
    }

    function addCommunityPost(content: string) {
        communityPosts = [{ user: "You", content, likes: 0 }, ...communityPosts];
        newCommunityPost = '';
    }

    function likeCommunityPost(index: number) {
        communityPosts[index].likes += 1;
        communityPosts = [...communityPosts];
    }
</script>

<svelte:head>
    <title>AI Blocks Clone - Learning Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
</svelte:head>

{#if isLoading}
    <div class="pageloader is-active"><span class="title">Loading your AI adventure...</span></div>
{:else}
    <div class="container">
        <!-- svelte-ignore a11y-no-redundant-roles -->
        <nav class="navbar is-light" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="https://via.placeholder.com/112x28?text=AI+Blocks" alt="AI Blocks Logo" width="112" height="28">
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-end">
                    <a class="navbar-item" href="/profile">
                        <span class="icon"><i class="fas fa-user"></i></span>
                        <span>Profile</span>
                    </a>
                    <a class="navbar-item" href="/settings">
                        <span class="icon"><i class="fas fa-cog"></i></span>
                        <span>Settings</span>
                    </a>
                </div>
            </div>
        </nav>

        <section class="hero is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Welcome to BrainBlox
                    </h1>
                    <h2 class="subtitle">
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

        <div class="tabs is-centered mt-4">
            <ul>
                <li class:is-active={activeTab === 'learning'}>
                    <button 
                        type="button"
                        class="tab-button"
                        on:click={() => activeTab = 'learning'}
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
                        on:click={() => activeTab = 'discover'}
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
            <section class="section" in:fade>
                <h2 class="title is-2">Your Learning Journey</h2>
                <div class="columns is-multiline">
                    {#each activeCourses as course}
                        <div class="column is-one-third" in:fly="{{ y: 200, duration: 1000, easing: quintOut }}">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src={course.imageUrl} alt={course.title}>
                                    </figure>
                                </div>
                                <header class="card-header">
                                    <p class="card-header-title">{course.title}</p>
                                    <button class="card-header-icon" aria-label="remove course" on:click={() => removeActiveCourse(course.id)}>
                                        <span class="icon">
                                            <i class="fas fa-times"></i>
                                        </span>
                                    </button>
                                </header>
                                <div class="card-content">
                                    <progress class="progress {getProgressColor(course.progress)}" value={course.progress} max="100">{course.progress}%</progress>
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
                    <button class="button is-info is-large" on:click={startQuiz}>
                        <span class="icon">
                            <i class="fas fa-question-circle"></i>
                        </span>
                        <span>Take a Quick Quiz</span>
                    </button>
                    <button class="button is-success is-large" on:click={toggleCommunity}>
                        <span class="icon">
                            <i class="fas fa-users"></i>
                        </span>
                        <span>Community Hub</span>
                    </button>
                </div>
            </section>
        {:else if activeTab === 'discover'}
            <section class="section" in:fade>
                <h2 class="title is-2">Discover New Horizons</h2>
                <div class="field">
                    <div class="control has-icons-left">
                        <input class="input" type="text" placeholder="Search courses or tags" bind:value={searchTerm}>
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div class="columns is-multiline">
                    {#each filterCourses(availableCourses) as course}
                        <div class="column is-one-third" in:scale="{{ duration: 300, start: 0.8 }}">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img src={course.imageUrl} alt={course.title}>
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <p class="title is-4">{course.title}</p>
                                    <p class="subtitle is-6">
                                        <span class="tag is-info">{course.difficulty}</span>
                                        <span class="tag is-warning">{course.duration}</span>
                                    </p>
                                    <p class="content">{course.description}</p>
                                    <div class="tags">
                                        {#each course.tags as tag}
                                            <span class="tag is-primary is-light">{tag}</span>
                                        {/each}
                                    </div>
                                    <div class="level">
                                        <div class="level-left">
                                            <div class="level-item">
                                                <p class="subtitle is-6">
                                                    <span class="icon has-text-warning">
                                                        <i class="fas fa-star"></i>
                                                    </span>
                                                    {course.rating.toFixed(1)}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="level-right">
                                            <div class="level-item">
                                                <button class="button is-info is-fullwidth" on:click={() => { selectedCourseId = course.id; addActiveCourse(); }}>
                                                    <span class="icon">
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

    {#if showConfetti}
        <div class="confetti-container" transition:fade>
            {#each Array(50) as _}
                <div class="confetti" style="left: {Math.random() * 100}%; animation-delay: {Math.random() * 3}s;"></div>
            {/each}
        </div>
    {/if}

    {#if showAchievement}
        <div class="achievement" transition:fly="{{ y: -50, duration: 500 }}">
            <div class="notification is-success">
                <button class="delete" on:click={() => showAchievement = false}></button>
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
                    <button class="delete" aria-label="close" on:click={() => showQuiz = false}></button>
                </header>
                <section class="modal-card-body">
                    <p class="subtitle">{quizQuestion}</p>
                    {#each quizOptions as option}
                        <label class="radio">
                            <input type="radio" bind:group={userAnswer} value={option}>
                            {option}
                        </label>
                    {/each}
                    {#if quizResult}
                        <p class="has-text-weight-bold mt-4" class:has-text-success={quizResult.startsWith('Correct')} class:has-text-danger={quizResult.startsWith('Incorrect')}>
                            {quizResult}
                        </p>
                    {/if}
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" on:click={submitQuiz} disabled={!userAnswer}>Submit Answer</button>
                    <button class="button" on:click={() => showQuiz = false}>Close</button>
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
                    <button class="delete" aria-label="close" on:click={() => showCommunity = false}></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label class="label">Share your thoughts</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="What's on your mind?" bind:value={newCommunityPost}></textarea>
                        </div>
                    </div>
                    <button class="button is-primary" on:click={() => addCommunityPost(newCommunityPost)}>Post</button>
                    <hr>
                    <div class="community-posts">
                        {#each communityPosts as post, index}
                            <div class="box">
                                <article class="media">
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                <strong>{post.user}</strong>
                                                <br>
                                                {post.content}
                                            </p>
                                        </div>
                                        <nav class="level is-mobile">
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <div class="level-left">
                                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                <!-- svelte-ignore a11y-missing-attribute -->
                                                <a class="level-item" aria-label="like" on:click={() => likeCommunityPost(index)}>
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
            <div class="notification is-info" transition:fly="{{ y: 50, duration: 300 }}">
                <button class="delete" on:click={() => notifications.update(n => n.filter(item => item !== notification))}></button>
                {notification}
            </div>
        {/each}
    </div>
{/if}

<style>
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
    }

    .card-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
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
</style>
