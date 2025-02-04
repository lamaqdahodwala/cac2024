<script lang="ts">
</script>

<div class="info-banner">
    <div class="banner-waves"></div>
    <div class="banner-content">
      <div class="banner-grid">
        <div class="banner-text">
          <h3 class="title is-4 mt-4">Empowering Young Minds with AI</h3>
          <p class="banner-description">Our interactive platform makes learning AI concepts fun and engaging for students of all ages.</p>
          <ul class="banner-features">
            <li><span class="feature-icon" style="background: #1565c0;">🎯</span> Personalized Learning Paths</li>
            <li><span class="feature-icon" style="background: #1565c0;">🏆</span> Progress Tracking</li>
            <li><span class="feature-icon" style="background: #1565c0;">👥</span> Community Support</li>
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

<style>
  .info-banner {
  width: 100%;
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  padding: 4rem 0;
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
  margin-bottom: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.banner-description {
  color: #2c3e50;
  font-size: 1.6rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
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
</style>
