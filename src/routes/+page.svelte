<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from "$app/stores";
  import { goto } from '$app/navigation';
  import type { PageData } from "./$types";

  export let data: PageData;
  let email = '';

  $: if ($page.data.authState) {
    goto('/dashboard');
  }

  const features = [
    { 
      icon: '🧠', 
      title: 'AI Concepts', 
      description: 'Explore neural networks, machine learning, and more!',
      details: [
        'Understanding Neural Networks',
        'Machine Learning Basics',
        'Deep Learning Fundamentals',
        'Computer Vision Concepts'
      ],
      color: '#4a90e2',
      progress: 85,
      difficulty: 'Intermediate'
    },
    { 
      icon: '🧩', 
      title: 'Block Coding', 
      description: 'Build AI models using intuitive drag-and-drop blocks.',
      details: [
        'Visual Programming Interface',
        'Drag-and-Drop Components',
        'Pre-built AI Blocks',
        'Custom Block Creation'
      ],
      color: '#2ecc71',
      progress: 92,
      difficulty: 'Beginner'
    },
    { 
      icon: '🚀', 
      title: 'Custom Projects', 
      description: 'Train your own AI with real-world datasets.',
      details: [
        'Dataset Management',
        'Model Training',
        'Performance Optimization',
        'Project Deployment'
      ],
      color: '#e74c3c',
      progress: 78,
      difficulty: 'Advanced'
    },
    { 
      icon: '🌐', 
      title: 'Share Projects', 
      description: 'Show off your AI creations with friends and classmates.',
      details: [
        'Project Showcase',
        'Community Feedback',
        'Collaboration Tools',
        'Version Control'
      ],
      color: '#9b59b6',
      progress: 88,
      difficulty: 'Intermediate'
    },
    { 
      icon: '📊', 
      title: 'Data Analysis', 
      description: 'Analyze and visualize AI model performance.',
      details: [
        'Performance Metrics',
        'Data Visualization',
        'Statistical Analysis',
        'Trend Identification'
      ],
      color: '#f1c40f',
      progress: 82,
      difficulty: 'Intermediate'
    },
    { 
      icon: '🤖', 
      title: 'AI Ethics', 
      description: 'Learn responsible AI development practices.',
      details: [
        'Ethical Guidelines',
        'Bias Detection',
        'Fair AI Principles',
        'Privacy Protection'
      ],
      color: '#1abc9c',
      progress: 90,
      difficulty: 'Advanced'
    }
  ];

  const courses = [
    { 
      title: 'Intro to AI',
      level: 'Beginner',
      duration: '4 weeks',
      image: 'https://static.vecteezy.com/system/resources/previews/010/518/719/non_2x/artificial-intelligence-ai-processor-chip-icon-symbol-for-graphic-design-logo-website-social-media-mobile-app-ui-illustration-vector.jpg',
      rating: 4.8,
      students: 1234,
      instructor: 'Dr. Sarah Chen',
      topics: ['AI Fundamentals', 'Machine Learning Basics', 'Neural Networks', 'Ethics in AI'],
      price: 49.99,
      discount: 20,
      nextStartDate: '2024-02-15'
    },
    { 
      title: 'Machine Learning Basics',
      level: 'Intermediate',
      duration: '6 weeks',
      image: 'https://datascientest.com/en/files/2023/10/svm-2.png',
      rating: 4.9,
      students: 892,
      instructor: 'Prof. James Wilson',
      topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
      price: 69.99,
      discount: 15,
      nextStartDate: '2024-02-20'
    },
    { 
      title: 'Neural Networks Deep Dive',
      level: 'Advanced',
      duration: '8 weeks',
      image: 'https://static.vecteezy.com/system/resources/previews/008/163/388/non_2x/neural-network-in-machine-learning-artificial-intelligence-concept-illustration-with-gradient-for-computer-science-poster-or-graphic-element-vector.jpg',
      rating: 4.7,
      students: 567,
      instructor: 'Dr. Michael Zhang',
      topics: ['Deep Learning', 'CNN', 'RNN', 'Transformers'],
      price: 89.99,
      discount: 10,
      nextStartDate: '2024-02-25'
    }
  ];

  const communityPosts = [
    { user: 'AIExplorer123', content: 'Just completed my first image recognition model!', avatar: 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg' },
    { user: 'MLEnthusiast', content: 'Looking for study buddies for the Advanced AI course.', avatar: 'https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-120.jpg?w=360' },
    { user: 'CodeNinja', content: 'Check out my new chatbot project!', avatar: 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg' },
  ];

  const testimonials = [
    { 
      name: 'Sarah Johnson',
      role: 'High School Student',
      content: 'BrainBlox transformed my understanding of AI! The interactive projects made complex concepts feel like a fun game. I especially loved building my own image recognition model.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      project: 'Image Recognition Model',
      location: 'New York, USA'
    },
    {
      name: 'Mike Chen',
      role: 'Computer Science Teacher',
      content: 'As an educator, I\'ve seen my students\' enthusiasm for AI skyrocket since using BrainBlox. The platform\'s block-based coding approach makes teaching neural networks and machine learning incredibly accessible.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 5,
      project: 'Classroom AI Projects',
      location: 'Toronto, Canada'
    },
    {
      name: 'Emily Davis',
      role: 'Parent & Tech Enthusiast',
      content: 'My daughter started with zero coding experience, but BrainBlox made her fall in love with AI. The step-by-step tutorials and visual learning approach are perfect for young minds.',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      project: 'Chatbot Creation',
      location: 'London, UK'
    },
    {
      name: 'Alex Martinez',
      role: 'Middle School Student',
      content: 'The AI projects are super cool! I built my first neural network in just a week. The community is also really helpful when you get stuck.',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      rating: 5,
      project: 'Neural Network Basics',
      location: 'Miami, USA'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students' },
    { number: '500+', label: 'AI Projects Created' },
    { number: '50+', label: 'Interactive Lessons' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  const howItWorks = [
    {
      step: 1,
      title: 'Create Your Account',
      description: 'Sign up in seconds and join our growing community of AI enthusiasts',
      icon: '🎯',
      details: [
        'Free account creation',
        'Personalized learning dashboard',
        'Achievement system',
        'Custom profile'
      ],
      color: '#4a90e2'
    },
    {
      step: 2,
      title: 'Choose Your Learning Path',
      description: 'Select from carefully crafted learning paths tailored to your experience level',
      icon: '🗺️',
      details: [
        'Beginner-friendly tracks',
        'Intermediate challenges',
        'Advanced AI projects',
        'Specialized topics'
      ],
      color: '#2ecc71'
    },
    {
      step: 3,
      title: 'Build Real AI Projects',
      description: 'Learn by doing with our interactive block-based coding platform',
      icon: '🛠️',
      details: [
        'Hands-on exercises',
        'Real-world datasets',
        'Visual programming',
        'Instant feedback'
      ],
      color: '#e74c3c'
    },
    {
      step: 4,
      title: 'Join the Community',
      description: 'Share your projects, get feedback, and learn from others',
      icon: '🌟',
      details: [
        'Project showcase',
        'Peer feedback',
        'Community challenges',
        'Collaboration opportunities'
      ],
      color: '#9b59b6'
    }
  ];

  onMount(() => {
    setTimeout(() => { }, 100);
  });
</script>

<svelte:head>
  <title>BrainBlox: Fun AI Learning for Young Minds</title>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Roboto:wght@300&display=swap" rel="stylesheet">
</svelte:head>

<main class="dashboard-wrapper">
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-background">
      <div class="floating-element" style="--i:1;"></div>
      <div class="floating-element" style="--i:2;"></div>
      <div class="floating-element" style="--i:3;"></div>
      <div class="decorative-circle" style="--i:4;"></div>
      <div class="decorative-triangle" style="--i:5;"></div>
      <div class="decorative-star" style="--i:6;"></div>
      <div class="decorative-square" style="--i:7;"></div>
      <div class="decorative-wave" style="--i:8;"></div>
      <!-- New decorative elements -->
      <div class="decorative-hexagon" style="--i:9;"></div>
      <div class="decorative-diamond" style="--i:10;"></div>
    </div>
    <div class="hero-body">
      <div class="content-container">
        <h1 class="title is-1">Welcome to BrainBlox</h1>
        <h2 class="subtitle typewriter">Discover the Magic of Artificial Intelligence</h2>
        <div class="feature-highlights">
          <div class="feature-item">
            <span class="feature-text">Learn AI Concepts</span>
          </div>
          <div class="feature-item">
            <span class="feature-text">Build with Blocks</span>
          </div>
          <div class="feature-item">
            <span class="feature-text">Create AI Projects</span>
          </div>
        </div>
        <div class="buttons">
          <a href="/signin" class="button is-primary is-large pulse-animation">Start Your Adventure</a>
          <a href="#how-it-works" class="button is-info is-large">How It Works</a>
        </div>
      </div>
    </div>
  </section>

  <div class="info-banner">
    <div class="banner-waves"></div>
    <div class="banner-content">
      <div class="banner-grid">
        <div class="banner-text">
          <h3>Empowering Young Minds with AI</h3>
          <p class="banner-description">Our interactive platform makes learning AI concepts fun and engaging for students of all ages.</p>
          <ul class="banner-features">
            <li><span class="feature-icon">🎯</span> Personalized Learning Paths</li>
            <li><span class="feature-icon">🏆</span> Achievement System</li>
            <li><span class="feature-icon">📊</span> Progress Tracking</li>
          </ul>
        </div>
        <div class="banner-stats">
          <div class="stat-item">
            <span class="stat-number">10k+</span>
            <span class="stat-label">Active Learners</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">95%</span>
            <span class="stat-label">Success Rate</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section features-section">
    <div class="container">
      <h2 class="title is-2 has-text-centered">Unlock Your AI Superpowers</h2>
      <p class="subtitle is-4 has-text-centered mb-6">Discover the tools and knowledge to become an AI master</p>
      <div class="features-grid">
        {#each features as feature}
          <div class="feature-card" 
               style="--feature-color: {feature.color}"
               >
            <div class="feature-header">
              <span class="feature-icon">{feature.icon}</span>
              <div class="difficulty-badge {feature.difficulty.toLowerCase()}">
                {feature.difficulty}
              </div>
            </div>
            
            <div class="feature-content">
              <h3 class="feature-title">{feature.title}</h3>
              <p class="feature-description">{feature.description}</p>
              
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: {feature.progress}%"></div>
                </div>
                <span class="progress-text">{feature.progress}% Success Rate</span>
              </div>
              
              <ul class="feature-details">
                {#each feature.details as detail}
                  <li>
                    <span class="check-icon">✓</span>
                    {detail}
                  </li>
                {/each}
              </ul>
              
              <div class="feature-actions">
                <button class="button is-primary is-outlined">
                  <span class="icon">📚</span>
                  <span>Learn More</span>
                </button>
                <button class="button is-info is-outlined">
                  <span class="icon">▶️</span>
                  <span>Try Demo</span>
                </button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <div class="info-banner">
    <div class="banner-waves"></div>
    <div class="banner-content">
      <div class="banner-grid">
        <div class="banner-text">
          <h3>Learn at Your Own Pace</h3>
          <p class="banner-description">From beginner-friendly tutorials to advanced projects, find the perfect learning path for your journey.</p>
          <ul class="banner-features">
            <li><span class="feature-icon">⚡</span> Adaptive Learning System</li>
            <li><span class="feature-icon">📚</span> Comprehensive Resources</li>
            <li><span class="feature-icon">🎮</span> Interactive Exercises</li>
          </ul>
        </div>
        <div class="banner-illustration">
          <div class="learning-path">
            <div class="path-node">Beginner</div>
            <div class="path-arrow">→</div>
            <div class="path-node">Intermediate</div>
            <div class="path-arrow">→</div>
            <div class="path-node">Advanced</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section courses-section">
    <div class="container">
      <h2 class="title is-2 has-text-centered">Exciting AI Courses</h2>
      <p class="subtitle is-4 has-text-centered mb-6">Start Your Journey in Artificial Intelligence</p>
      
      <div class="filter-container mb-5">
        <div class="field is-grouped is-grouped-multiline">
          <div class="control">
            <div class="select">
              <select>
                <option>All Levels</option>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
          </div>
          <div class="control">
            <div class="select">
              <select>
                <option>All Durations</option>
                <option>1-4 weeks</option>
                <option>5-8 weeks</option>
                <option>9+ weeks</option>
              </select>
            </div>
          </div>
          <div class="control">
            <div class="select">
              <select>
                <option>Sort by: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
          </div>
          <div class="control">
            <input class="input" type="text" placeholder="Search courses...">
          </div>
        </div>
      </div>

      <div class="courses-grid">
        {#each courses as course}
          <div class="course-card">
            <div class="card-ribbon" style="background: {course.level === 'Beginner' ? '#4CAF50' : course.level === 'Intermediate' ? '#2196F3' : '#9C27B0'}">
              {course.level}
            </div>
            <div class="card-image">
              <figure class="image is-4by3">
                <img src={course.image} alt={course.title}>
              </figure>
              <div class="image-overlay">
                <div class="overlay-content">
                  <h4 class="title is-5 has-text-white">What you'll learn:</h4>
                  <ul>
                    {#each course.topics as topic}
                      <li>{topic}</li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
            <div class="card-content">
              <div class="course-header">
                <p class="title is-4">{course.title}</p>
                <div class="course-meta">
                  <span class="tag is-light">
                    <span class="icon">⏱️</span>
                    {course.duration}
                  </span>
                  <span class="tag is-light">
                    <span class="icon">👥</span>
                    {course.students} students
                  </span>
                </div>
              </div>
              
              <div class="instructor-info">
                <span class="icon">👨‍🏫</span>
                <span>{course.instructor}</span>
              </div>

              <div class="rating-container">
                <div class="stars">
                  {#each Array(5) as _, i}
                    <span class="star">{i < Math.floor(course.rating) ? '★' : '☆'}</span>
                  {/each}
                  <span class="rating-number">{course.rating}</span>
                </div>
              </div>

              <div class="price-container">
                {#if course.discount}
                  <span class="original-price">${course.price}</span>
                  <span class="discounted-price">
                    ${(course.price * (1 - course.discount/100)).toFixed(2)}
                  </span>
                  <span class="discount-badge">-{course.discount}%</span>
                {:else}
                  <span class="price">${course.price}</span>
                {/if}
              </div>

              <div class="course-footer">
                <div class="next-date">
                  <span class="icon">📅</span>
                  <span>Starts {new Date(course.nextStartDate).toLocaleDateString()}</span>
                </div>
                <div class="buttons">
                  <button class="button is-primary">Enroll Now</button>
                  <button class="button is-light">
                    <span class="icon">📚</span>
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="courses-footer has-text-centered mt-6">
        <button class="button is-primary is-large">
          <span class="icon">🎓</span>
          <span>View All Courses</span>
        </button>
      </div>
    </div>
  </section>

  <div class="info-banner">
    <div class="banner-waves"></div>
    <div class="banner-content">
      <div class="banner-grid">
        <div class="banner-text">
          <h3>Hands-on Experience</h3>
          <p class="banner-description">Put your knowledge into practice with our interactive AI playground and real-world projects.</p>
          <ul class="banner-features">
            <li><span class="feature-icon">🤖</span> AI Model Building</li>
            <li><span class="feature-icon">🔬</span> Experimentation Tools</li>
            <li><span class="feature-icon">🎨</span> Creative Projects</li>
          </ul>
        </div>
        <div class="banner-tools">
          <div class="tool-item">Code</div>
          <div class="tool-item">Train</div>
          <div class="tool-item">Deploy</div>
        </div>
      </div>
    </div>
  </div>

  <section class="section playground-section">
    <div class="container">
      <h2 class="title is-2 has-text-centered">AI Playground</h2>
      <p class="subtitle is-4 has-text-centered mb-6">Experience the Power of AI with Our Interactive Tools</p>
      <div class="playground-grid">
        <div class="playground-card">
          <div class="playground-header">
            <span class="playground-icon">🎨</span>
            <h3 class="title is-4">Image Generation</h3>
          </div>
          <div class="playground-content">
            <div class="playground-demo">
              <div class="code-blocks">
                <div class="block">Generate Image</div>
                <div class="block">Set Style: Artistic</div>
                <div class="block">Add Elements</div>
              </div>
              <div class="output-preview">
                <div class="code-blocks">
                  <div class="block">Output</div>
                </div>
              </div>
            </div>
            <button class="button is-primary is-fullwidth">Try Image Generation</button>
          </div>
        </div>

        <div class="playground-card">
          <div class="playground-header">
            <span class="playground-icon">🤖</span>
            <h3 class="title is-4">Chatbot Creation</h3>
          </div>
          <div class="playground-content">
            <div class="playground-demo">
              <div class="code-blocks">
                <div class="block">Create Chatbot</div>
                <div class="block">Train Responses</div>
                <div class="block">Test Conversation</div>
              </div>
              <div class="chat-preview">
                <div class="chat-message">Hello! How can I help you?</div>
                <div class="chat-input">
                  <input type="text" placeholder="Type your message..." class="input">
                  <button class="button is-info">Send</button>
                </div>
              </div>
            </div>
            <button class="button is-primary is-fullwidth">Build Your Chatbot</button>
          </div>
        </div>
      </div>

      <div class="playground-features mt-6">
        <div class="feature">
          <span class="icon">🔒</span>
          <h4>Safe Environment</h4>
          <p>Practice AI concepts in a controlled space</p>
        </div>
        <div class="feature">
          <span class="icon">💡</span>
          <h4>Real-time Feedback</h4>
          <p>Get instant results as you experiment</p>
        </div>
      </div>

      <div class="has-text-centered mt-6">
        <a href="/playground" class="button is-large is-primary pulse-animation">
          <span class="icon">🎮</span>
          <span>Enter the AI Playground</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section community-section">
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

  <div class="info-banner">
    <div class="banner-waves"></div>
    <div class="banner-content">
      <div class="banner-grid">
        <div class="banner-text">
          <h3>Stay Connected with AI Enthusiasts</h3>
          <p class="banner-description">Join a vibrant community of learners, share your achievements, and collaborate on exciting AI projects together.</p>
          <ul class="banner-features">
            <li><span class="feature-icon">👥</span> Global Community</li>
            <li><span class="feature-icon">💬</span> Live Discussions</li>
            <li><span class="feature-icon">🤝</span> Collaborative Projects</li>
          </ul>
        </div>
        <div class="banner-community">
          <div class="community-avatars">
            <div class="avatar">👩‍💻</div>
            <div class="avatar">👨‍💻</div>
            <div class="avatar">👩‍🔬</div>
            <div class="avatar">👨‍🔬</div>
          </div>
          <div class="community-stats">
            <div class="stat">500+ Online</div>
            <div class="stat">1000+ Projects</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="section newsletter-section">
    <div class="container">
      <div class="newsletter-content">
        <div class="columns is-vcentered">
          <div class="column is-8">
            <div class="newsletter-header">
              <h2 class="title is-2">Stay Updated with AI Innovations</h2>
              <div class="title-underline"></div>
            </div>
            <div class="newsletter-features">
              <div class="feature">
                <span class="icon">📰</span>
                <span>Weekly AI News</span>
              </div>
              <div class="feature">
                <span class="icon">🎯</span>
                <span>Project Ideas</span>
              </div>
              <div class="feature">
                <span class="icon">💡</span>
                <span>Learning Tips</span>
              </div>
              <div class="feature">
                <span class="icon">🏆</span>
                <span>Success Stories</span>
              </div>
            </div>
          </div>
          <div class="column is-4">
            <div class="newsletter-form">
              <h3 class="title is-4">Subscribe Now</h3>
              <p class="subtitle is-6 mb-4">Join our community and stay ahead in AI education!</p>
              <div class="field">
                <div class="control">
                  <input 
                    class="input is-medium" 
                    type="email" 
                    bind:value={email}
                    placeholder="Enter your email"
                  >
                </div>
              </div>
              <button class="button is-primary is-medium is-fullwidth">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section cta-section">
    <div class="container">
      <div class="cta-container">
        <h2 class="title is-2">Ready to Become an AI Whiz?</h2>
        <p class="subtitle">Join thousands of young learners and start your exciting AI journey today!</p>
        <a href="/signin" class="button is-primary is-large cta-button">Get Started for Free</a>
      </div>
    </div>
  </section>
</main>

<style>
  :global(html) {
  overflow-y: scroll;
  scrollbar-gutter: stable;
  overflow-x: hidden;
  width: 100%;
}

:global(body) {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background: #f5f7fa;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
}

.dashboard-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section {
  padding: 4rem 0;
  position: relative;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #20b2aa 0%, #3498db 100%);
  color: white;
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - var(--navbar-height, 64px));
  contain: layout;
}

.hero-body {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 1.5rem;
  position: relative;
  z-index: 2;
  min-height: 500px;
}

.content-container {
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
  contain: layout;
}

.title.is-1 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
  letter-spacing: -1px;
  text-transform: uppercase;
  color: white;
}

.subtitle {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  letter-spacing: 1px;
  color: inherit;
  line-height: 1.6;
}

.feature-highlights {
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: 100%;
  contain: layout;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  flex: 1;
  margin: 0 1rem;
  min-width: 200px;
  text-align: center;
}

.feature-text {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5;
  margin-bottom: 0.5rem;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
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

/* Info Banner Section */
.info-banner {
  width: 100%;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 8rem 0;
  margin: 0;
  overflow: hidden;
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.banner-waves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 30% 20%, rgba(255,255,255,0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 50%);
  pointer-events: none;
  animation: pulse 8s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

.banner-content {
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 3rem;
}

.banner-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 5rem;
  align-items: center;
  width: 100%;
  contain: layout;
}

.banner-text h3 {
  color: #1565c0;
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-description {
  color: #2c3e50;
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 600px;
}

.banner-features li {
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #34495e;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.banner-features li:hover {
  transform: translateX(10px);
  background: rgba(255, 255, 255, 0.8);
}

.feature-icon {
  font-size: 1.8rem;
  margin-right: 1.5rem;
  background: #1565c0;
  color: white;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #1565c0, #64b5f6);
}

.stat-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.stat-number {
  display: block;
  font-size: 3.5rem;
  font-weight: 800;
  color: #1565c0;
  margin-bottom: 1rem;
  line-height: 1;
}

.stat-label {
  font-size: 1.3rem;
  color: #34495e;
  font-weight: 500;
}

.learning-path {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.path-node {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 0.8rem;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.path-node:hover {
  transform: scale(1.1);
}

.path-arrow {
  color: #1565c0;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.tool-item {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: white;
  padding: 2rem 3rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.tool-item::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  transform: rotate(45deg);
  transition: transform 0.6s ease;
}

.tool-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.tool-item:hover::after {
  transform: rotate(45deg) translate(50%, 50%);
}

.banner-community {
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.community-avatars {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.avatar {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: white;
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  position: relative;
}

.avatar:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.community-stats {
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
}

.community-stats .stat {
  background: linear-gradient(135deg, #1565c0, #1976d2);
  color: white;
  padding: 1rem 2rem;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.community-stats .stat:hover {
  transform: translateY(-5px);
}

/* Features Section */
.features-section {
  background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  width: 100%;
  contain: layout;
}

.feature-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-top: 4px solid var(--feature-color);
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  contain: layout;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.feature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.feature-icon {
  font-size: 2.5rem;
  background: linear-gradient(135deg, var(--feature-color) 0%, rgba(255,255,255,0.2) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.difficulty-badge {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.difficulty-badge.beginner {
  background: #e8f5e9;
  color: #2ecc71;
}

.difficulty-badge.intermediate {
  background: #fff3e0;
  color: #f39c12;
}

.difficulty-badge.advanced {
  background: #fde8e8;
  color: #e74c3c;
}

.feature-content {
  position: relative;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.feature-description {
  color: #606f7b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.progress-container {
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 8px;
  background: #f1f5f8;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--feature-color);
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

.progress-text {
  display: block;
  font-size: 0.85rem;
  color: #606f7b;
  margin-top: 0.5rem;
}

.feature-details {
  list-style: none;
  margin: 0 0 1.5rem 0;
  padding: 0;
}

.feature-details li {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #4a5568;
}

.check-icon {
  color: var(--feature-color);
  margin-right: 0.75rem;
  font-weight: bold;
}

.feature-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.feature-actions .button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.features-cta {
  background: white;
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  margin-top: 4rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.features-cta .title {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.features-cta .subtitle {
  color: #606f7b;
  margin-bottom: 2rem;
}

.features-cta .buttons {
  gap: 1rem;
}

/* Courses Section */
.courses-section {
  background: #f8f9fa;
  padding: 4rem 0;
}

.filter-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding: 1rem;
  width: 100%;
  contain: layout;
}

.course-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  contain: layout;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}

.card-ribbon {
  position: absolute;
  top: 20px;
  right: -30px;
  padding: 8px 30px;
  color: white;
  font-size: 0.9rem;
  transform: rotate(45deg);
  z-index: 1;
}

.card-image {
  position: relative;
  overflow: hidden;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.course-card:hover .image-overlay {
  opacity: 1;
}

.overlay-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
  color: white;
}

.overlay-content li {
  margin: 0.5rem 0;
  font-size: 0.9rem;
}

.overlay-content li:before {
  content: '✓';
  margin-right: 0.5rem;
  color: #4CAF50;
}

.course-header {
  margin-bottom: 1rem;
}

.course-meta {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.instructor-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  color: #666;
}

.rating-container {
  margin: 0.5rem 0;
}

.stars {
  color: #ffd700;
  font-size: 1.2rem;
}

.rating-number {
  color: #666;
  margin-left: 0.5rem;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
}

.original-price {
  text-decoration: line-through;
  color: #999;
}

.discounted-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2196F3;
}

.discount-badge {
  background: #ff4444;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.course-footer {
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
}

.next-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 1rem;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.button.is-primary {
  background: #2196F3;
  color: white;
  border: none;
  transition: background 0.3s ease;
}

.button.is-primary:hover {
  background: #1976D2;
}

.button.is-light {
  background: #f5f5f5;
  color: #333;
}

.button.is-light:hover {
  background: #e0e0e0;
}

/* Playground Section */
.playground-section {
  background: linear-gradient(135deg, #f6f8fa 0%, #e9ecef 100%);
  padding: 4rem 2rem;
}

.playground-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  width: 100%;
  contain: layout;
}

.playground-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  contain: layout;
}

.playground-card:hover {
  transform: translateY(-5px);
}

.playground-header {
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
  color: white;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.playground-icon {
  font-size: 2rem;
}

.playground-content {
  padding: 1.5rem;
}

.playground-demo {
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  min-height: 200px;
}

.code-blocks {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.code-blocks .block {
  background: #e9ecef;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  cursor: pointer;
  transition: background 0.2s ease;
}

.code-blocks .block:hover {
  background: #dee2e6;
}

.output-preview, .chat-preview, .vision-preview, .music-preview {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 0.25rem;
}

.chat-preview {
  flex-direction: column;
  justify-content: space-between;
}

.chat-message {
  background: #f1f3f5;
  padding: 0.75rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.chat-input {
  display: flex;
  gap: 0.5rem;
}

.upload-zone {
  border: 2px dashed #ced4da;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
}

.upload-zone:hover {
  border-color: #2193b0;
}

.music-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.music-wave {
  width: 100px;
  height: 40px;
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
  clip-path: polygon(0% 50%, 10% 40%, 20% 60%, 30% 30%, 40% 70%, 50% 20%, 60% 50%, 70% 40%, 80% 60%, 90% 30%, 100% 50%);
}

.playground-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  text-align: center;
  margin-top: 3rem;
  width: 100%;
  contain: layout;
}

.feature {
  padding: 1.5rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-3px);
}

.feature .icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  display: inline-block;
}

.feature h4 {
  margin-bottom: 0.5rem;
  color: #2193b0;
  font-weight: 600;
}

.feature p {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Community Section */
.community-section {
  background: linear-gradient(135deg, #b2ebf2 0%, #4dd0e1 100%);
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

.community-box .media {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.community-box .media:last-child {
  border-bottom: none;
}

/* Newsletter Section */
.newsletter-section {
  background: linear-gradient(135deg, #e0f2f1 0%, #80deea 100%);
}

.newsletter-content {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.newsletter-header {
  margin-bottom: 2rem;
}

.newsletter-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.newsletter-features .feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.newsletter-features .feature:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.newsletter-features .icon {
  font-size: 1.5rem;
}

.newsletter-form {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 0.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.newsletter-form .title {
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.newsletter-form .subtitle {
  color: #4a5568;
}

.newsletter-form .input {
  margin-bottom: 1rem;
  border: 2px solid #e2e8f0;
  transition: border-color 0.3s ease;
}

.newsletter-form .input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.newsletter-form .button {
  font-weight: 600;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.newsletter-form .button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button-icon {
  font-size: 1.25rem;
}

.newsletter-benefits {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
}

.benefit {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #718096;
}

.benefit .icon {
  font-size: 1.25rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #80cbc4 0%, #4db6ac 100%);
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
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

/* Footer Section */
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 0;
}

.footer-content {
  text-align: center;
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
    clip: rect(44px, 450px, 56px, 0);
  }
  20% {
    clip: rect(3px, 450px, 59px, 0);
  }
  40% {
    clip: rect(24px, 450px, 7px, 0);
  }
  60% {
    clip: rect(53px, 450px, 86px, 0);
  }
  80% {
    clip: rect(57px, 450px, 93px, 0);
  }
  100% {
    clip: rect(55px, 450px, 40px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(44px, 450px, 56px, 0);
  }
  20% {
    clip: rect(3px, 450px, 59px, 0);
  }
  40% {
    clip: rect(24px, 450px, 7px, 0);
  }
  60% {
    clip: rect(53px, 450px, 86px, 0);
  }
  80% {
    clip: rect(57px, 450px, 93px, 0);
  }
  100% {
    clip: rect(55px, 450px, 40px, 0);
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

/* Responsive Styles */
@media (max-width: 768px) {
  .hero-body {
    text-align: center;
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

  .info-banner {
    padding: 5rem 0;
  }

  .banner-content {
    padding: 0 1.5rem;
  }

  .banner-text h3 {
    font-size: 2rem;
  }

  .banner-description {
    font-size: 1.2rem;
  }

  .banner-features li {
    font-size: 1.1rem;
  }

    .feature-icon {
      font-size: 1.5rem;
      width: 3rem;
      height: 3rem;
    }

    .stat-number {
      font-size: 2.5rem;
    }

    .learning-path {
      flex-direction: column;
      gap: 1.5rem;
      padding: 2rem;
    }

    .path-arrow {
      transform: rotate(90deg);
    }

    .tool-item {
      padding: 1.5rem 2rem;
      font-size: 1.2rem;
    }

    .avatar {
      width: 4rem;
      height: 4rem;
      font-size: 2rem;
    }
  }
</style>
