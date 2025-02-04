<script lang="ts">
    export const features = [
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
  </script>
  
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
                    <span class="check-icon" style="color: #1565c0;">✓</span>
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
  
  <style>
  .features-section {
    padding: 8rem 0;
    background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
  }

  .features-section .title {
    margin-bottom: 1.5rem;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
  }

  .features-section .subtitle {
    margin-bottom: 4rem;
    font-size: 1.5rem;
    text-align: center;
    color: #4a5568;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 3rem;
    margin: 4rem 0;
    width: 100%;
    contain: layout;
  }

  .feature-card {
    background: white;
    border-radius: 1.5rem;
    padding: 3rem;
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
    margin-bottom: 2rem;
  }

  .feature-icon {
    font-size: 2.5rem;
    background: linear-gradient(135deg, var(--feature-color) 0%, rgba(255,255,255,0.2) 100%);
    -webkit-background-clip: text;
    background-clip: text;
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
    margin-bottom: 2rem;
  }

  .feature-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 1.5rem;
  }

  .feature-description {
    color: #606f7b;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-size: 1.1rem;
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
    margin: 0 0 2rem 0;
    padding: 0;
  }

  .feature-details li {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
    color: #4a5568;
  }

  .check-icon {
    color: #1565c0;
    margin-right: 0.75rem;
    font-weight: bold;
  }

  .feature-actions {
    display: flex;
    gap: 1.5rem;
    margin-top: 3rem;
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
  </style>