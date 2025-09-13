// Handle Action Buttons (Hiring, Help, Offers)
const hiringButton = document.getElementById('hiringButton');
const hiringPopover = document.getElementById('hiringPopover');
const closeHiring = document.getElementById('closeHiring');

const helpButton = document.getElementById('helpButton');
const helpPopover = document.getElementById('helpPopover');
const closeHelp = document.getElementById('closeHelp');

const offersButton = document.getElementById('offersButton');
const offersPopover = document.getElementById('offersPopover');
const closeOffers = document.getElementById('closeOffers');

// Array of Instagram post URLs to display
const postUrls = [
  'https://www.instagram.com/p/DOYvDFPj-dc/',
  "https://www.instagram.com/reel/DOiYZthj7eE/",
  "https://www.instagram.com/reel/DOfeY04j6ih/",
  'https://www.instagram.com/reel/DOWDyfdD1QQ/',
  'https://www.instagram.com/p/DOYsVVPDwEU/',
  // Add more post URLs as needed
];

// Toggle popover visibility functions
function toggleHiringPopover() {
  // Close other popovers first
  helpPopover.classList.remove('visible');
  offersPopover.classList.remove('visible');
  
  hiringPopover.classList.toggle('visible');
  
  // Add/remove event listener for clicking outside
  if (hiringPopover.classList.contains('visible')) {
    setTimeout(() => document.addEventListener('click', handleHiringClickOutside), 0);
  } else {
    document.removeEventListener('click', handleHiringClickOutside);
  }
}

function toggleHelpPopover() {
  // Close other popovers first
  hiringPopover.classList.remove('visible');
  offersPopover.classList.remove('visible');
  
  helpPopover.classList.toggle('visible');
  
  // Add/remove event listener for clicking outside
  if (helpPopover.classList.contains('visible')) {
    setTimeout(() => document.addEventListener('click', handleHelpClickOutside), 0);
  } else {
    document.removeEventListener('click', handleHelpClickOutside);
  }
}

function toggleOffersPopover() {
  // Close other popovers first
  hiringPopover.classList.remove('visible');
  helpPopover.classList.remove('visible');
  
  offersPopover.classList.toggle('visible');
  
  // Add/remove event listener for clicking outside
  if (offersPopover.classList.contains('visible')) {
    setTimeout(() => document.addEventListener('click', handleOffersClickOutside), 0);
  } else {
    document.removeEventListener('click', handleOffersClickOutside);
  }
}

// Close popover when clicking outside
function handleHiringClickOutside(event) {
  if (!hiringPopover.contains(event.target) && event.target !== hiringButton) {
    toggleHiringPopover();
  }
}

function handleHelpClickOutside(event) {
  if (!helpPopover.contains(event.target) && event.target !== helpButton) {
    toggleHelpPopover();
  }
}

function handleOffersClickOutside(event) {
  if (!offersPopover.contains(event.target) && event.target !== offersButton) {
    toggleOffersPopover();
  }
}

// Event listeners
hiringButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleHiringPopover();
});

closeHiring.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleHiringPopover();
});

helpButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleHelpPopover();
});

closeHelp.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleHelpPopover();
});

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
  if (e.key === 'Escape') {
    if (hiringPopover.classList.contains('visible')) {
      toggleHiringPopover();
    } else if (helpPopover.classList.contains('visible')) {
      toggleHelpPopover();
    } else if (offersPopover.classList.contains('visible')) {
      toggleOffersPopover();
    }
  }
});

// Instagram Feed
function loadInstagramFeed() {
  const instagramFeed = document.getElementById('instagramFeed');
  if (!instagramFeed) return;

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
window.addEventListener('DOMContentLoaded', function() {
  loadInstagramFeed();

  // Mobile scroll down button functionality
  const mobileScrollDown = document.getElementById('mobileScrollDown');
  
  if (mobileScrollDown) {
    mobileScrollDown.addEventListener('click', function(e) {
      e.preventDefault();
      const instagramSection = document.querySelector('.instagram-feed');
      if (instagramSection) {
        window.scrollTo({
          top: instagramSection.offsetTop - 20,
          behavior: 'smooth'
        });
      } else {
        // Fallback to scrolling to bottom of hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
          });
        }
      }
    });
    
    // Show/hide button based on scroll position
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Fade out when scrolling down, fade in when at top
      if (scrollTop > lastScrollTop && scrollTop > 50) {
        // Scrolling down
        mobileScrollDown.style.opacity = '0';
        mobileScrollDown.style.visibility = 'hidden';
      } else {
        // At top or scrolling up
        if (scrollTop < 50) {
          mobileScrollDown.style.opacity = '1';
          mobileScrollDown.style.visibility = 'visible';
        }
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }
});

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

// First Time Visitor Popup Logic
function initFirstTimePopup() {
  const popup = document.getElementById('firstTimePopup');
  const popupClose = document.getElementById('popupClose');
  const popupDismiss = document.getElementById('popupDismiss');
  const popupOverlay = document.querySelector('.popup-overlay');
  
  // Check if user has visited before
  const hasVisited = localStorage.getItem('thezamora_visited');
  
  // Show popup only for first-time visitors
  if (!hasVisited) {
    // Add a delay to let users explore the site first
    setTimeout(() => {
      popup.classList.add('show');
      // Prevent body scroll when popup is open
      document.body.style.overflow = 'hidden';
    }, 5000); // 5 seconds delay
  }
  
  // Close popup function
  function closePopup() {
    popup.classList.remove('show');
    // Restore body scroll
    document.body.style.overflow = '';
    // Mark user as visited
    localStorage.setItem('thezamora_visited', 'true');
  }
  
  // Event listeners for closing popup
  if (popupClose) {
    popupClose.addEventListener('click', closePopup);
  }
  
  if (popupDismiss) {
    popupDismiss.addEventListener('click', closePopup);
  }
  
  if (popupOverlay) {
    popupOverlay.addEventListener('click', closePopup);
  }
  
  // Close popup when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('show')) {
      closePopup();
    }
  });
  
  // Track CTA click for analytics (optional)
  const popupCta = document.querySelector('.popup-cta');
  if (popupCta) {
    popupCta.addEventListener('click', () => {
      // Mark as visited when user clicks CTA
      localStorage.setItem('thezamora_visited', 'true');
      // You can add analytics tracking here if needed
      console.log('First time visitor clicked CTA');
    });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initFirstTimePopup();
});
