// Handle Offers Button
const offersButton = document.getElementById('offersButton');
const offersPopover = document.getElementById('offersPopover');
const closeOffers = document.getElementById('closeOffers');

// Toggle popover visibility
function toggleOffersPopover() {
  offersPopover.classList.toggle('visible');
  
  // Hide the button when popover is visible
  if (offersPopover.classList.contains('visible')) {
    offersButton.style.opacity = '0';
    offersButton.style.visibility = 'hidden';
    // Add event listener to close when clicking outside
    setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
  } else {
    offersButton.style.opacity = '1';
    offersButton.style.visibility = 'visible';
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
