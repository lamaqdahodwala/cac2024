<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { elasticOut } from 'svelte/easing';
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  import type { PageData } from "./$types";

  export let data: PageData;

  let showHero = false;
  let showFeatures = false;
  let showCourses = false;
  let showPlayground = false;
  let showCommunity = false;
  let showCTA = false;

  $: if ($page.data.authState) {
    goto('/dashboard');
  }
  
  const features = [
    { icon: '🧠', title: 'AI Concepts', description: 'Explore neural networks, machine learning, and more!' },
    { icon: '🧩', title: 'Block Coding', description: 'Build AI models using intuitive drag-and-drop blocks.' },
    { icon: '🚀', title: 'Custom Projects', description: 'Train your own AI with real-world datasets.' },
    { icon: '🌐', title: 'Share Projects', description: 'Show off your AI creations with friends and classmates.' },
  ];

  const courses = [
{ title: 'Intro to AI', level: 'Beginner', duration: '4 weeks', image: 'https://static.vecteezy.com/system/resources/previews/010/518/719/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg' },
{ title: 'Machine Learning Basics', level: 'Intermediate', duration: '6 weeks', image: 'https://datascientest.com/en/files/2023/10/svm-2.png' },
{ title: 'Neural Networks Deep Dive', level: 'Advanced', duration: '8 weeks', image: 'https://static.vecteezy.com/system/resources/previews/008/163/388/non_2x/neural-network-in-machine-learning-artificial-intelligence-concept-illustration-with-gradient-for-computer-science-poster-or-graphic-element-vector.jpg' },
{ title: 'Fashion MNIST Challenge', level: 'Intermediate', duration: '3 weeks', image: 'https://media.istockphoto.com/id/488441004/vector/mens-fashion-icon.jpg?s=612x612&w=0&k=20&c=8Pfp4Z6igtRNJtKPzbRXZMTHxlrpUXFAtGtW_5XWLcc=' }
];

const communityPosts = [
{ user: 'AIExplorer123', content: 'Just completed my first image recognition model!', avatar: 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg' },
{ user: 'MLEnthusiast', content: 'Looking for study buddies for the Advanced AI course.', avatar: 'https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-120.jpg?w=360' },
{ user: 'CodeNinja', content: 'Check out my new chatbot project!', avatar: 'https://heatsmartalliance.org/wp-content/uploads/2022/04/noun-person-2005122-71d358.png' },
];

  onMount(() => {
    setTimeout(() => showHero = true, 300);
    setTimeout(() => showFeatures = true, 600);
    setTimeout(() => showCourses = true, 900);
    setTimeout(() => showPlayground = true, 1200);
    setTimeout(() => showCommunity = true, 1500);
    setTimeout(() => showCTA = true, 1800);
  });
</script>

<svelte:head>
  <title>BrainBlox: Fun AI Learning for Young Minds</title>
</svelte:head>

<main class="dashboard-wrapper">
  {#if showHero}
  <section class="hero is-fullheight-with-navbar">
      <div class="hero-background">
        <div class="floating-element" style="--i:1;"></div>
        <div class="floating-element" style="--i:2;"></div>
        <div class="floating-element" style="--i:3;"></div>
      </div>
      <div class="hero-body">
        <div class="content-container">
          <h1 class="title is-1 glitch" data-text="Welcome to BrainBlox">Welcome to BrainBlox</h1>
          <h2 class="subtitle typewriter">Discover the Magic of Artificial Intelligence</h2>
          <div class="feature-highlights">
            <div class="feature-item">
              <i class="fas fa-brain"></i>
              <span>Learn AI Concepts</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-code"></i>
              <span>Build with Blocks</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-robot"></i>
              <span>Create AI Projects</span>
            </div>
          </div>
          <div class="buttons">
            <a href="#learn-more" class="button is-primary is-large pulse-animation">Start Your AI Adventure</a>
            <a href="#how-it-works" class="button is-info is-large">How It Works</a>
          </div>
        </div>
      </div>
    </section>
  {/if}

  {#if showFeatures}
    <section class="section features-section" in:fly="{{ y: 50, duration: 1000 }}">
      <div class="container">
        <h2 class="title is-2 has-text-centered">Unlock Your AI Superpowers</h2>
        <div class="features-grid">
          {#each features as feature}
            <div class="feature-card" in:scale="{{ duration: 500, easing: elasticOut }}">
              <p class="title is-4">
                <span class="icon-text">
                  <span class="icon is-large">{feature.icon}</span>
                  <span>{feature.title}</span>
                </span>
              </p>
              <p class="subtitle is-6">{feature.description}</p>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if showCourses}
    <section class="section courses-section" in:fade="{{ duration: 1000 }}">
      <div class="container">
        <h2 class="title is-2 has-text-centered">Exciting AI Courses</h2>
        <div class="courses-grid">
          {#each courses as course}
            <div class="course-card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img src={course.image} alt={course.title}>
                </figure>
              </div>
              <div class="card-content">
                <p class="title is-4">{course.title}</p>
                <p class="subtitle is-6">{course.level} | {course.duration}</p>
                <a href="#enroll" class="button is-primary is-fullwidth">Start Learning</a>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if showPlayground}
    <section class="section playground-section" in:fly="{{ y: 50, duration: 1000 }}">
      <div class="container">
        <h2 class="title is-2 has-text-centered">AI Playground</h2>
        <div class="playground-container">
          <div class="playground-area">
            <h3 class="title is-4">Block Coding Area</h3>
            <img src="/images/block-coding.png" alt="Block Coding Interface" class="playground-image">
          </div>
          <div class="playground-area">
            <h3 class="title is-4">AI Output</h3>
            <img src="/images/ai-output.png" alt="AI Output" class="playground-image">
          </div>
        </div>
        <div class="has-text-centered mt-6">
          <a href="#playground" class="button is-large is-info">Try the AI Playground</a>
        </div>
      </div>
    </section>
  {/if}

  {#if showCommunity}
    <section class="section community-section" in:fly="{{ y: 50, duration: 1000 }}">
      <div class="container">
        <h2 class="title is-2 has-text-centered">Join Our AI Community</h2>
        <div class="community-container">
          <div class="community-box">
            {#each communityPosts as post}
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img src={post.avatar} alt={post.user}>
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{post.user}</strong>
                      <br>
                      {post.content}
                    </p>
                  </div>
                </div>
              </article>
            {/each}
          </div>
          <div class="has-text-centered mt-4">
            <a href="#join-community" class="button is-info is-medium">Join the Discussion</a>
          </div>
        </div>
      </div>
    </section>
  {/if}

  {#if showCTA}
    <section class="section cta-section" in:fade="{{ duration: 1000 }}">
      <div class="container">
        <div class="cta-container">
          <h2 class="title is-2">Ready to Become an AI Whiz?</h2>
          <p class="subtitle">Join thousands of young learners and start your exciting AI journey today!</p>
          <a href="#sign-up" class="button is-primary is-large cta-button">Get Started for Free</a>
        </div>
      </div>
    </section>
  {/if}

</main>

<style>
  :global(body) {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background: #f5f7fa;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  .dashboard-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  .hero {
    background: linear-gradient(135deg, #20b2aa 0%, #3498db 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero-body {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .content-container {
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
  }

  .section {
    padding: 4rem 1.5rem;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .features-grid,
  .courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .feature-card,
  .course-card {
    background: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .feature-card:hover,
  .course-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  .playground-container {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-top: 2rem;
  }

  .playground-area {
    flex: 1 1 45%;
    min-width: 300px;
    background-color: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .community-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .community-box {
    background-color: white;
    border-radius: 15px;
    padding: 1.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  .cta-section {
    background: linear-gradient(135deg, #20b2aa 0%, #3498db 100%);
    color: white;
    padding: 4rem 0;
  }

  .cta-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 3rem 0;
  }

  .footer-content {
    text-align: center;
  }

  @media (max-width: 768px) {
    .hero-body {
      text-align: center;
    }

    .playground-container {
      flex-direction: column;
    }

    .playground-area {
      width: 100%;
    }
  }

  .playground-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .community-section {
    background-color: #f0f4f8;
  }

  .community-box .media {
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
  }

  .community-box .media:last-child {
    border-bottom: none;
  }

  .cta-button {
    background-color: #2ecc71;
    color: white;
    font-weight: bold;
    padding: 1rem 2rem;
    font-size: 1.2rem;
  }

  .cta-button:hover {
    background-color: #27ae60;
  }

  .footer a {
    color: #3498db;
  }

  .footer a:hover {
    color: #2980b9;
  }

  /* Animations */
  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  .title {
    font-weight: 700;
    letter-spacing: -1px;
  }

  .subtitle {
    font-weight: 300;
  }

  .icon-text {
    display: flex;
    align-items: center;
  }

  .icon-text .icon {
    margin-right: 0.5rem;
  }
  .visually-hidden {
    position: absolute;
    width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
a:focus,
button:focus {
  outline: 3px solid #3498db;
  outline-offset: 2px;
}
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #20b2aa;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3498db;
}
.button.is-primary {
  background-color: #20b2aa;
  color: white;
}

.button.is-primary:hover {
  background-color: #1c9b94;
}

.button.is-info {
  background-color: #3498db;
  color: white;
}

.button.is-info:hover {
  background-color: #2980b9;
}

.feature-card,
.course-card,
.community-box {
  border: 2px solid #e0f2f1;
}

.title {
  color: #2c3e50;
}

.subtitle {
  color: #34495e;
}

@media (max-width: 768px) {
  .hero-body {
    padding: 3rem 1.5rem;
  }

  .title.is-1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .features-grid,
  .courses-grid {
    grid-template-columns: 1fr;
  }
}
html {
  scroll-behavior: smooth;
}

.button {
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.feature-card,
.course-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.feature-card .icon-text,
.course-card .card-content {
  flex-grow: 1;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(46, 204, 113, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(46, 204, 113, 0);
  }
}

.cta-button {
  animation: pulse 2s infinite;
}
.hero .title,
.hero .subtitle,
.cta-section .title,
.cta-section .subtitle {
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}
.hero {
  background: linear-gradient(135deg, #20b2aa 0%, #3498db 100%);
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.floating-element {
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  animation: float 15s infinite;
  bottom: -150px;
}

.floating-element:nth-child(1) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.floating-element:nth-child(2) {
  left: 50%;
  width: 100px;
  height: 100px;
  animation-delay: 5s;
  animation-duration: 10s;
}

.floating-element:nth-child(3) {
  left: 70%;
  width: 60px;
  height: 60px;
  animation-delay: 7s;
  animation-duration: 12s;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
  }
}

.hero-body {
  z-index: 1;
}

.glitch {
  position: relative;
  color: white;
  font-weight: bold;
  text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
              -0.05em -0.025em 0 rgba(0,255,0,0.75),
              0.025em 0.05em 0 rgba(0,0,255,0.75);
  animation: glitch 500ms infinite;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
  animation: glitch-anim2 1s infinite linear alternate-reverse;
}

@keyframes glitch {
  0% {
    text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                -0.05em -0.025em 0 rgba(0,255,0,0.75),
                0.025em 0.05em 0 rgba(0,0,255,0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255,0,0,0.75),
                -0.05em -0.025em 0 rgba(0,255,0,0.75),
                0.025em 0.05em 0 rgba(0,0,255,0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                0.025em 0.025em 0 rgba(0,255,0,0.75),
                -0.05em -0.05em 0 rgba(0,0,255,0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255,0,0,0.75),
                0.025em 0.025em 0 rgba(0,255,0,0.75),
                -0.05em -0.05em 0 rgba(0,0,255,0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75),
                0.05em 0 0 rgba(0,255,0,0.75),
                0 -0.05em 0 rgba(0,0,255,0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255,0,0,0.75),
                0.05em 0 0 rgba(0,255,0,0.75),
                0 -0.05em 0 rgba(0,0,255,0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255,0,0,0.75),
                -0.025em -0.025em 0 rgba(0,255,0,0.75),
                -0.025em -0.05em 0 rgba(0,0,255,0.75);
  }
}

@keyframes glitch-anim {
  0% {
    clip: rect(72px, 9999px, 21px, 0);
  }
  20% {
    clip: rect(3px, 9999px, 59px, 0);
  }
  40% {
    clip: rect(24px, 9999px, 7px, 0);
  }
  60% {
    clip: rect(53px, 9999px, 86px, 0);
  }
  80% {
    clip: rect(57px, 9999px, 93px, 0);
  }
  100% {
    clip: rect(55px, 9999px, 40px, 0);
  }
}

.typewriter {
  overflow: hidden;
  border-right: .15em solid #20b2aa;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .15em;
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: #20b2aa; }
}

.feature-highlights {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.feature-item i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.parallax-bg {
  transform: translateZ(-1px) scale(2);
  z-index: -1;
}
</style>