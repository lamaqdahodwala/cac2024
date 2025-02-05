<script lang="ts">
  import { fade, fly, scale } from 'svelte/transition';
  import { onMount } from 'svelte';

  let isVisible = false;
  let email = '';
  let name = '';
  let interests: string[] = [];
  let message = '';
  let agreeToTerms = false;

  const interestOptions = [
    'AI Learning',
    'Coding Basics',
    'Data Science',
    'Web Development',
    'Machine Learning',
    'Robotics'
  ];

  const impactStats = [
    { number: '10K+', label: 'Students Helped' },
    { number: '50+', label: 'Free Courses' },
    { number: '100%', label: 'Free Forever' }
  ];

  onMount(() => {
    isVisible = true;
  });

  function handleSubmit() {
    if (!agreeToTerms) {
      alert('Please agree to our terms and community guidelines');
      return;
    }
    console.log('Form submitted:', { email, name, interests, message });
    // Add your form submission logic here
  }
</script>

<section class="cta-section" in:fade="{{ duration: 1000 }}">
  <div class="container">
    <div class="cta-content">
      <h2 class="title">Join Our Learning Community</h2>
      <p class="subtitle">Empowering Everyone with Free AI Education</p>

      <div class="impact-stats">
        {#each impactStats as stat}
          <div class="stat-card" in:scale="{{ duration: 800, delay: 200 }}">
            <span class="stat-number">{stat.number}</span>
            <span class="stat-label">{stat.label}</span>
          </div>
        {/each}
      </div>

      <form class="signup-form" on:submit|preventDefault={handleSubmit}>
        <div class="form-grid">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              bind:value={name}
              placeholder="Enter your name"
              required
              class="input"
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              bind:value={email}
              placeholder="Enter your email"
              required
              class="input"
            />
          </div>
        </div>

        <div class="interests-section">
          <label class="section-label">What interests you? (Select all that apply)</label>
          <div class="interests-grid">
            {#each interestOptions as option}
              <label class="interest-option">
                <input
                  type="checkbox"
                  bind:group={interests}
                  value={option}
                />
                <span class="interest-text">{option}</span>
              </label>
            {/each}
          </div>
        </div>

        <div class="form-group">
          <label for="message">Tell us about your learning goals</label>
          <textarea
            id="message"
            bind:value={message}
            placeholder="Share your aspirations with us..."
            rows="4"
            class="textarea"
          ></textarea>
        </div>

        <div class="terms-section">
          <label class="terms-checkbox">
            <input
              type="checkbox"
              bind:checked={agreeToTerms}
            />
            <span class="terms-text">I agree to the community guidelines and terms of service</span>
          </label>
        </div>

        <button type="submit" class="button">Start Your Learning Journey</button>
      </form>

      <div class="trust-badges">
        <div class="badge">
          <span class="icon">🔒</span>
          <span>100% Free Forever</span>
        </div>
        <div class="badge">
          <span class="icon">📚</span>
          <span>Quality Education</span>
        </div>
        <div class="badge">
          <span class="icon">🤝</span>
          <span>Supportive Community</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .cta-section {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .cta-content {
    text-align: center;
    padding: 2rem;
  }

  .title {
    font-size: 3rem;
    background: linear-gradient(135deg, #2c5282 0%, #3182ce 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .subtitle {
    font-size: 1.5rem;
    color: #4a5568;
    margin-bottom: 3rem;
    line-height: 1.6;
    font-weight: 400;
  }

  .impact-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 2rem;
    margin: 4rem 0;
  }

  .stat-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }

  .stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #3182ce 0%, #4299e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.75rem;
    line-height: 1;
  }

  .stat-label {
    color: #4a5568;
    font-size: 1.125rem;
    font-weight: 500;
  }

  .signup-form {
    background: white;
    padding: 3.5rem;
    border-radius: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
    margin: 4rem auto;
    max-width: 800px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 2.5rem;
  }

  .form-group {
    text-align: left;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    margin-bottom: 0.75rem;
    color: #2d3748;
    font-weight: 600;
    font-size: 1.05rem;
  }

  .section-label {
    font-size: 1.125rem;
    margin-bottom: 1rem;
  }

  .input, .textarea {
    width: 100%;
    padding: 1rem 1.25rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 1rem;
    transition: all 0.3s ease;
    color: #2d3748;
    background: #f8fafc;
  }

  .input:focus, .textarea:focus {
    border-color: #4299e1;
    background: white;
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }

  .textarea {
    resize: vertical;
    min-height: 120px;
  }

  .interests-section {
    margin: 2.5rem 0;
    text-align: left;
  }

  .interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1.25rem;
    margin-top: 1rem;
  }

  .interest-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: 0.5rem;
    transition: background 0.2s ease;
  }

  .interest-option:hover {
    background: #f7fafc;
  }

  .interest-text {
    color: #4a5568;
    font-weight: 500;
  }

  .terms-section {
    margin: 2.5rem 0;
  }

  .terms-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    justify-content: center;
  }

  .terms-text {
    color: #4a5568;
    font-size: 0.95rem;
  }

  .button {
    background: linear-gradient(135deg, #3182ce 0%, #4299e1 100%);
    color: white;
    border: none;
    padding: 1.25rem 2.5rem;
    border-radius: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);
  }

  .button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(66, 153, 225, 0.4);
  }

  .trust-badges {
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
    margin-top: 4rem;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #4a5568;
    font-weight: 500;
    font-size: 1.125rem;
  }

  .icon {
    font-size: 1.75rem;
  }

  @media (max-width: 768px) {
    .cta-section {
      padding: 4rem 1.5rem;
    }

    .title {
      font-size: 2.5rem;
    }

    .subtitle {
      font-size: 1.25rem;
    }

    .signup-form {
      padding: 2.5rem 1.5rem;
      margin: 3rem auto;
    }

    .trust-badges {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .stat-card {
      padding: 1.5rem;
    }
  }
</style>