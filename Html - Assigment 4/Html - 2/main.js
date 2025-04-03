// Selects elements needed for image display and overlay functionality
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

// Declaring the array of image filenames 
const imageFilenames = [
  "pic1.jpg",
  "pic2.jpg",
  "pic3.jpg",
  "pic4.jpg",
  "pic5.jpg"
];

// Declaring the alternative text for each image file 
const imageAlts = {
  "pic1.jpg": "Closeup of a blue human eye",
  "pic2.jpg": "Closeup of a green plant",
  "pic3.jpg": "Bird in flight over a field",
  "pic4.jpg": "Mountain landscape with sunset",
  "pic5.jpg": "City skyline at night"
};

// Looping through images 
imageFilenames.forEach(filename => {
// Create a new thumbnail image element
  const newImage = document.createElement('img');
// Set the src and alt attributes based on the filename and corresponding alt text
  newImage.setAttribute('src', `images/${filename}`);
  newImage.setAttribute('alt', imageAlts[filename]);
// Append the thumbnail to the thumb-bar
  thumbBar.appendChild(newImage);

// Add a click event listener to update the main displayed image
  newImage.addEventListener('click', () => {
    displayedImage.setAttribute('src', `images/${filename}`);
    displayedImage.setAttribute('alt', imageAlts[filename]);
  });
});

// Wiring up the Darken/Lighten button 
btn.addEventListener('click', () => {
  if (btn.getAttribute('class') === 'dark') {
// Change to lighten state: update the button, its class and overlay style
    btn.setAttribute('class', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
// Change back to dark state: revert the changes made earlier
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});
