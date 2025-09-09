// Handle Offers Button
const offersButton = document.getElementById('offersButton');
const offersPopover = document.getElementById('offersPopover');
const closeOffers = document.getElementById('closeOffers');

// Toggle popover visibility
function toggleOffersPopover() {
  offersPopover.classList.toggle('visible');
  
  // Add/remove event listener for clicking outside
  if (offersPopover.classList.contains('visible')) {
    setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
}

// Close popover when clicking outside
function handleClickOutside(event) {
  if (!offersPopover.contains(event.target) && event.target !== offersButton) {
    toggleOffersPopover();
  }
}

// Event listeners
offersButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleOffersPopover();
});

closeOffers.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleOffersPopover();
});

// Close popover when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && offersPopover.classList.contains('visible')) {
    toggleOffersPopover();
  }
});

// Instagram Feed
function loadInstagramFeed() {
  const instagramFeed = document.getElementById('instagramFeed');
  if (!instagramFeed) return;

  // Array of Instagram post URLs to display
  const postUrls = [
    'https://www.instagram.com/reel/DOWDyfdD1QQ/',
    'https://www.instagram.com/p/DOSLfDGD0NK/',
    'https://www.instagram.com/p/DOQ-Jaaj1Q5/'
    // Add more post URLs as needed
  ];

  // Create post elements
  postUrls.forEach(postUrl => {
    const postContainer = document.createElement('div');
    postContainer.className = 'instagram-post';
    
    // Create the Instagram embed iframe
    const iframe = document.createElement('iframe');
    iframe.src = `${postUrl}embed`;
    iframe.allow = 'encrypted-media';
    iframe.loading = 'lazy';
    
    postContainer.appendChild(iframe);
    instagramFeed.appendChild(postContainer);
  });

  // Initialize Instagram embeds
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
}

// Load Instagram feed when the page loads
window.addEventListener('DOMContentLoaded', loadInstagramFeed);

// Re-process Instagram embeds when they become visible (for lazy loading)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  });
}, {
  rootMargin: '200px',
  threshold: 0.1
});

document.querySelectorAll('.instagram-post').forEach(post => {
  observer.observe(post);
});
