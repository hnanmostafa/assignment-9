var mySubmitBtn = document.getElementById('mySubmit');
var siteName = document.getElementById('siteName');
var webAddress = document.getElementById('webAddress');
var mySpecialSection = document.querySelector('.my-special-section');
var myWarning1 = document.querySelector('.my-warning1');
var myWarning2 = document.querySelector('.my-warning2');
var allBooks = [];
if (localStorage.getItem('allBooks') !== null) {
  allBooks = JSON.parse(localStorage.getItem('allBooks'));
  displayElement();
}
// Any Url must start with http://www.low-level-domin(3 to 63 char alphapet or num or -).high-level-domin(3 or 4 char(a-z))
var myRegex = /^(http|https):\/\/[a-z]{3,63}.[a-z-0-9]{3,63}.[a-z]{3,4}/;

mySubmitBtn.addEventListener('click', function () {
  var myBook = {
    name: siteName.value,
    myURL: webAddress.value,
  };
  if (myBook.name && myBook.myURL) {
    if (myRegex.test(myBook.myURL)) {
      allBooks.push(myBook);
      myWarning1.style.display = 'none';
      myWarning2.style.display = 'none';
      clear();
    } else if (!myRegex.test(myBook.myURL)) {
      myWarning1.style.display = 'block';
      myWarning1.style.backgroundColor = '#4BB543';
      myWarning1.style.color = '#fff';
      myWarning1.style.border = 'none';
      myWarning1.textContent = 'You fill this field correctly';
      myWarning2.style.display = 'block';
      myWarning2.textContent =
        'Please Enter a valid url. ex: http://low-level-domin(website name).high-level-domin(.com)';
      myWarning2.style.backgroundColor = '#ffb2b2';
      myWarning2.style.color = '#6d0000';
      myWarning2.style.border = '1px solid #6d0000';
    }
  } else if (myBook.name && myBook.myURL == false) {
    myWarning1.style.display = 'block';
    myWarning2.style.display = 'block';
    myWarning1.style.backgroundColor = '#4BB543';
    myWarning1.style.color = '#fff';
    myWarning1.style.border = 'none';
    myWarning1.textContent = 'You fill this field Correctly';
    myWarning2.style.backgroundColor = '#ffb2b2';
    myWarning2.style.color = '#6d0000';
    myWarning2.style.border = '1px solid #6d0000';
    myWarning2.textContent = 'URL Field is required';
  } else if (myBook.name == false && myBook.myURL) {
    myWarning1.style.display = 'block';
    myWarning2.style.display = 'block';
    myWarning2.style.backgroundColor = '#4BB543';
    myWarning2.style.color = '#fff';
    myWarning2.style.border = 'none';
    myWarning2.textContent = 'You fill this field';
    myWarning1.style.display = 'block';
    myWarning1.textContent = 'Book Name Field is required';
    myWarning1.style.backgroundColor = '#ffb2b2';
    myWarning1.style.color = '#6d0000';
    myWarning1.style.border = '1px solid #6d0000';
  } else if (myBook.name == false && myBook.myURL == false) {
    myWarning2.style.display = 'block';
    myWarning1.style.display = 'block';
    myWarning1.textContent = 'Book Name Field is required';
    myWarning1.style.backgroundColor = '#ffb2b2';
    myWarning1.style.color = '#6d0000';
    myWarning1.style.border = '1px solid #6d0000';
    myWarning2.style.backgroundColor = '#ffb2b2';
    myWarning2.style.color = '#6d0000';
    myWarning2.style.border = '1px solid #6d0000';
  }
  localStorage.setItem('allBooks', JSON.stringify(allBooks));

  displayElement();
});

function clear() {
  siteName.value = '';
  webAddress.value = '';
}

function displayElement() {
  var cartona = '';
  for (var i = 0; i < allBooks.length; i++) {
    cartona += ` <div
    class="my-card py-5 my-3 my-sec-words bg-danger d-flex justify-content-between align-items-center"
  >
    <p class="m-0">${allBooks[i].name}</p>
    <div class="d-flex justify-content-center gap-3">
      <button class="btn my-btn my-blu-btn">
        <a href="${allBooks[i].myURL}" target="_blank"> Visit</a>
      </button>
      <button class="btn my-btn my-red-btn"  onclick="deleteElement(${i})" >Delete</button>  
    </div>
  </div>`;
  }
  mySpecialSection.innerHTML = cartona;
}

function deleteElement(index) {
  allBooks.splice(index, 1);
  displayElement();
  localStorage.setItem('allBooks', JSON.stringify(allBooks));
}
