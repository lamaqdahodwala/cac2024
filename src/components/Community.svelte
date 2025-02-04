<script>
  export const communityPosts = [
    { user: 'AIExplorer123', content: 'Just completed my first image recognition model!', avatar: 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg' },
    { user: 'MLEnthusiast', content: 'Looking for study buddies for the Advanced AI course.', avatar: 'https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-120.jpg?w=360' },
    { user: 'CodeNinja', content: 'Check out my new chatbot project!', avatar: 'https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg' },
  ];
</script>

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

<style>
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
</style>
