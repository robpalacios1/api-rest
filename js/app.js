const burger = document.querySelector(".js-burger-button")
const burgerClose = document.querySelector(".js-burger-close")
const header = document.querySelector(".js-header")
const stickyHeader = document.querySelector(".js-sticky")

//function for burger button click
burger.addEventListener('click', () => {
  header.classList.toggle("header--active");
})

burgerClose.addEventListener('click', () => {
  header.classList.toggle("header--active");
})

function headerResize() {

  if (screen.width >= 1024) {
    const headerActiveElements = document.getElementsByClassName('header--active');
    if (headerActiveElements.length > 0) {
      header.classList.remove("header--active");
    }
  }
}

window.addEventListener('resize',headerResize);


// function for header sticky

window.onscroll = function() {myFunction()};

const sticky = stickyHeader.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    stickyHeader.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// HTML Injection

const url = ('http://localhost:3000/card');
fetch(url)
.then(response => response.json() )
.then(card => {

  let cardContent = document.querySelector('.js-card-container');
  cardContent.innerHTML = `
  <div class="card__content">
    <div class="card__main-card">
      <div class="card__main-image">
        <div class="card__image">
          <img src="${card[0].image}" alt="${card[0].image}"/>
          <div class="card__price">
            <a href="#" class="card__price-link"
              ><button class="card__price-button">${card[0].price}</button></a
            >
          </div>
          <div class="card__favorite">
            <a href="#"><i class="fas fa-star"></i></a>
          </div>
        </div>
      </div>

      <div class="card__bottom">
        <div class="card__title">
          <h2>${card[0].title}</h2>
        </div>

        <div class="card__sipnosis">
          <span
            >${card[0].sipnosis}...</span
          >
        </div>

        <hr class="card__hr" />

        <div class="card__main-footer">
          <div class="card__avatar">
            <img src="${card[0].avatar}" alt="${card[0].avatar}" />
          </div>

          <div class="card__name">
            <h3>${card[0].name}</h3>
          </div>

          <div class="card__date">
            <h3>${card[0].date}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  console.log(card)

})
.catch(error => {
  console.log(error)
})


