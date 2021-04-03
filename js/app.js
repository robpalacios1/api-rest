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
let cardContent = document.querySelector('.js-card-container');
let searchContent = document.querySelector('.js-search');
let searchButton = document.querySelector('.js-search-button');
let searchCounter = document.querySelector('.js-search-counter');

searchButton.addEventListener("click", () => {

  const url = ('http://localhost:3000/cards');
  let counter = 0;

  fetch(url)
  .then(response => response.json() )
  .then(cards => {
    let allCards = '<div class="card__content">';
    console.log(searchContent.value);
    cards.forEach(card => {

      if(card.sipnosis.includes(searchContent.value)) {

        counter =  counter + 1;

      allCards += `
        <div class="card__main-card">
          <div class="card__main-image">
            <div class="card__image">
              <img src="${card.image}" alt="${card.image}"/>
              <div class="card__price">
                <a href="#" class="card__price-link"
                  ><button class="card__price-button">${card.price}</button></a
                >
              </div>
              <div class="card__favorite">
                <a href="#"><i class="fas fa-star"></i></a>
              </div>
            </div>
          </div>

          <div class="card__bottom">
            <div class="card__title">
              <h2>${card.title}</h2>
            </div>

            <div class="card__sipnosis">
              <span
                >${card.sipnosis}...</span
              >
            </div>

            <hr class="card__hr" />

            <div class="card__main-footer">
              <div class="card__avatar">
                <img src="${card.avatar}" alt="${card.avatar}" />
              </div>

              <div class="card__name">
                <h3>${card.name}</h3>
              </div>

              <div class="card__date">
                <h3>${card.date}</h3>
              </div>
            </div>
          </div>
        </div>
    `;
      };
    });
    cardContent.innerHTML = allCards + '</div>';
    searchCounter.textContent = `${counter} RESULTS`;
  })
  .catch(error => {
    console.log(error)
  })
})





