<script>
  </script>
  
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
          <a href="/signin" class="button is-primary is-large">Start Your Adventure</a>
          <a href="#how-it-works" class="button is-info is-large">How It Works</a>
        </div>
      </div>
    </div>
  </section>
  
  <style>
  .hero {
    background: linear-gradient(135deg, #20b2aa 0%, #3498db 100%);
    color: white;
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - var(--navbar-height));
    contain: layout;
    transform-style: preserve-3d;
    perspective: 1000px;
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
    transform: translateZ(0);
  }
  
  .content-container {
    max-width: 900px;
    margin: 0 auto;
    width: 100%;
    contain: layout;
    transform: translateZ(0);
  }
  
  .title.is-1 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 800;
    letter-spacing: -1px;
    text-transform: uppercase;
    color: white;
    line-height: 1.2;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    letter-spacing: 1px;
    color: inherit;
    line-height: 4;
    margin-bottom: 1rem;
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
    gap: 1rem;
    margin-top: 2rem;
    transform: translateZ(0);
  }
  
  .button {
    position: relative;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    transition: background-color 0.3s ease;
    border: none;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
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
  </style>
  