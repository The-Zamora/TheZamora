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
