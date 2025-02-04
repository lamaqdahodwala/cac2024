<script>
    export let email = '';
  </script>
  
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
  
  <style>
  .newsletter-section {
  background: linear-gradient(135deg, #e0f2f1 0%, #80deea 100%);
  padding: 8rem 0;
}

.newsletter-section .title {
  margin-bottom: 1.5rem;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
}

.newsletter-section .subtitle {
  margin-bottom: 4rem;
  font-size: 1.5rem;
  text-align: center;
  color: #4a5568;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.newsletter-content {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 4rem;
  margin-bottom: 3rem;
}

.newsletter-header {
  margin-bottom: 2rem;
}

.newsletter-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.newsletter-features .feature {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.1rem;
  background: #f8f9fa;
  padding: 2rem;
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
  padding: 3rem;
  border-radius: 0.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-top: 3rem;
}

.newsletter-form .title {
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.newsletter-form .subtitle {
  color: #4a5568;
  margin-bottom: 2rem;
}

.newsletter-form .input {
  margin-bottom: 2rem;
  border: 2px solid #e2e8f0;
  transition: border-color 0.3s ease;
  padding: 1.25rem;
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
  </style>