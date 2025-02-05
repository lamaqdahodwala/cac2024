<script>
    export const courses = [
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
        title: 'Neural Networks',
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
  </script>
  
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
  
  <style>
  .courses-section {
  background: #f8f9fa;
  padding: 8rem 0;
}

.courses-section .title {
  margin-bottom: 1.5rem;
  font-size: 3rem;
  font-weight: 700;
  text-align: center;
}

.course-card .title.is-4 {
  font-size: 2.5rem;
}


.courses-section .subtitle {
  margin-bottom: 4rem;
  font-size: 1.5rem;
  text-align: center;
  color: #4a5568;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.filter-container {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin: 4rem 0;
  padding: 1.5rem;
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
  padding: 3rem;
  margin-bottom: 2rem;
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
  margin-bottom: 2rem;
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
  border-radius: 16px;
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
  margin-bottom: 2rem;
}

.course-meta {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
}

.instructor-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  color: #666;
}

.rating-container {
  margin: 1.5rem 0;
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
  gap: 1.5rem;
  margin: 2rem 0;
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
  padding-top: 2rem;
  margin-top: 2.5rem;
}

.next-date {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

.buttons {
  display: flex;
  gap: 0.5rem;
}

.button.is-primary {
  background-color: #2196F3;
  color: white;
  border: none;
  transition: background 0.3s ease;
}

.button.is-primary:hover {
  background-color: #1976D2;
}

.button.is-light {
  background: #f5f5f5;
  color: #333;
}

.button.is-light:hover {
  background: #e0e0e0;
}

.image-overlay .title.is-5 {
  font-size: 2rem;
  margin-bottom: 1rem;
}
  </style>