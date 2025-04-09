// Show/hide comments functionality
const showHideBtn = document.querySelector('.show-hide');
const commentWrapper = document.querySelector('.comment-wrapper');

commentWrapper.style.display = 'none';

showHideBtn.addEventListener('click', () => {
  const isHidden = commentWrapper.style.display === 'none';
  commentWrapper.style.display = isHidden ? 'block' : 'none';
  showHideBtn.textContent = isHidden ? 'Hide comments' : 'Show comments';
});

// Comment submission
const form = document.querySelector('.comment-form');
const nameField = document.querySelector('#name');
const commentField = document.querySelector('#comment');
const list = document.querySelector('.comment-container');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const listItem = document.createElement('li');
  const namePara = document.createElement('p');
  const commentPara = document.createElement('p');
  
  namePara.innerHTML = `<strong>${nameField.value}</strong>`;
  commentPara.textContent = commentField.value;
  
  listItem.append(namePara, commentPara);
  list.appendChild(listItem);
  
  nameField.value = '';
  commentField.value = '';
});
