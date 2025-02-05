<script>
</script>

<section class="section playground-section">
  <div class="container">
    <h2 class="title is-2 has-text-centered">AI Playground</h2>
    <p class="subtitle is-4 has-text-centered mb-6">Experience the Power of AI With Our Interactive Tools</p>
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

<style>
.playground-section {
  background: linear-gradient(135deg, #f6f8fa 0%, #e9ecef 100%);
  padding: 4rem 2rem;
}

.playground-section .title {
  margin-bottom: 1.5rem;
  font-size: 3rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}

.playground-section .subtitle {
  font-size: 1.5rem;
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 3rem;
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

.playground-header .title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  transform: translateY(7.5px);
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

.output-preview, .chat-preview {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
