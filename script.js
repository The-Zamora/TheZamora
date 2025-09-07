function handleSubmit(e){
  e.preventDefault();
  const note = document.getElementById('form-note');
  note.textContent = 'Thanks! This demo form does not send emails yet.';
  e.target.reset();
  return false;
}

document.getElementById('year').textContent = new Date().getFullYear();

// Change header background on scroll for readability
const header = document.querySelector('.site-header');
const toggleHeader = () => {
  if(window.scrollY > 12){
    header.style.background = 'rgba(10,10,12,.85)';
  } else {
    header.style.background = 'linear-gradient(180deg, rgba(10,10,12,.75), rgba(10,10,12,.2))';
  }
};
document.addEventListener('scroll', toggleHeader);
toggleHeader();
