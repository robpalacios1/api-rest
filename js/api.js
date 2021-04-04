// HTML Injection
let cardContent = document.querySelector('.js-card-container');
let searchContent = document.querySelector('.js-search');
let searchButton = document.querySelector('.js-search-button');
let searchCounter = document.querySelector('.js-search-counter');
let cardsArray = '<div class="card__content">';

searchButton.addEventListener("click", () => {

  const url = ('http://localhost:3000/cards');
  let counter = 0;

  fetch(url)
  .then(response => response.json() )
  .then(cards => {

    let allCards = '<div class="card__content">';
    cardsArray = allCards;
    console.log(searchContent.value);
    cards.forEach(card => {

      if(card.sipnosis.includes(searchContent.value)) {

        if(counter <= 5) {
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
        }

        cardsArray += `
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

        counter += 1;
      } else {
        searchCounter.textContent = 'Do Not Find Any result';
      };
    });

    if(counter == 0) {
      cardContent.innerHTML = `
      <div class="card__not-found">
      <div class="card__left">
        <div class="card__title-image">
          <h2>Uh oh.</h2>
        </div>
    
        <div class="card__subtitle">
          <span
            >We ran into an issue, but don't worry, <br />
            we'll take care of it for sure</span
          >
        </div>
        <div class="card__button-align">
          <button class="card__button-safety">Back to safety</button>
        </div>
      </div>
    
      <div class="card__right">
        <div class="card__image-not">
          <img src="./assets/not-found.png" alt="not found" />
        </div>
      </div>
    </div>
      `;
      return 0;
    }

    allCards += '</div>';

    cardsArray += '</div>';

    if(counter > 6) {
      allCards += `
        <div class="card__load">
        <button class="card__load-more js-load-more">
          Load More
          <svg
            class="card__arrow"
            width="12"
            height="12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.526.22a.75.75 0 10-1.06 1.06l3.97 3.97H.75a.75.75 0 000 1.5h8.685l-3.97 3.97a.75.75 0 101.061 1.06l5.207-5.206a.748.748 0 000-1.148L6.526.22z"
              fill="#335EEA"
            />
          </svg>
        </button>
      </div>
      `;
    }

    cardContent.innerHTML = allCards
    searchCounter.textContent = `${counter} RESULTS`;

    if (counter > 6) {
      loadAll();
    }
  })
  .catch(error => {
    console.log(error)
  })
})

function loadAll() {
  let loadMore = document.querySelector('.js-load-more');

  loadMore.addEventListener('click', () => {
    cardContent.innerHTML = cardsArray;
  });
}