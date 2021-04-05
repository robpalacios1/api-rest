// HTML Injection
let cardContent = document.querySelector('.js-card-container');
let searchContent = document.querySelector('.js-search');
let searchButton = document.querySelector('.js-search-button');
let searchCounter = document.querySelector('.js-search-counter');
let article = document.querySelector('.js-article');
let myDictionary = {}
let cardsArray = '<div class="card__content">';


//
searchButton.addEventListener("click", ()=>{startScreen();});
article.addEventListener('click', (e) => {
  e.preventDefault();
  startScreen();
})

function startScreen() {

    // call an API within Json-server.
    const url = ('http://localhost:3000/cards');
    let counter = 0;
  
    fetch(url)
    .then(response => response.json() )
    .then(cards => {
  
      let allCards = '<div class="card__content">';
      cardsArray = allCards;
      cards.forEach(card => {
  
        // filter search.
        if(card.sipnosis.includes(searchContent.value)) {
  
          if(counter <= 5) {
            allCards += drawCard(card);
          }
  
          cardsArray += drawCard(card);
  
          myDictionary[`n${card.id}`] = card;
          counter += 1;
  
        } else {
          searchCounter.textContent = 'no results';
        };
      });
  
      //show card not-found.
      if(counter == 0) {
        cardContent.innerHTML = drawNotFound();
        return;
      }
  
      allCards += '</div>';
      cardsArray += '</div>';
  
      cardContent.innerHTML = allCards;
      searchCounter.textContent = `${counter} RESULTS`;
  
      // show button to load more.
      if(counter > 6) {
        allCards += showButton();
        cardContent.innerHTML = allCards;
        loadAll();
      }
  
      showBlog();
  
    })
    .catch(error => {
      console.log(error)
    })

}


// function to show another card when push the botton.
function loadAll() {
  let loadMore = document.querySelector('.js-load-more');

  loadMore.addEventListener('click', () => {
    cardContent.innerHTML = cardsArray;
    showBlog();
  });

}

// function lo load blog when click card.
function showBlog() {

  document.querySelectorAll('.js-card-desktop').forEach(card => {
    card.addEventListener('click', (e)=>{
      e.preventDefault();
      cardContent.innerHTML = drawBlog(myDictionary[`n${e.target.dataset.id}`]);
    })
  })
}

// function to draw the blog
function drawBlog({image, title, name, sipnosis, date}) {
  return `
  <div class="card__desktop">
  <div class="card__title-desktop">
    <h1>
      ${title}
    </h1>
  </div>

  <div class="card__sipnosis-desktop">
    <span
      >${sipnosis}</span
    >
  </div>

  <div class="card__footer-desktop">
    <div class="card__footer-info">
      <div class="card__avatar-desktop">
        <img src="${image}" alt="${image}" />
      </div>

      <div class="card__name-desktop">
        <h3>${name}</h3>
        <div class="card__published-desktop">
          <h4>Published on ${date}, 2019</h4>
        </div>
      </div>

      <div class="card__networks-desktop">
        <div class="card__link-desktop">
          <a href="#"><i class="fab fa-instagram card__link"></i></a>
        </div>

        <div class="card__link-desktop">
          <a href="#"><i class="fab fa-facebook card__link"></i></a>
        </div>

        <div class="card__link-desktop">
          <a href="#"><i class="fab fa-twitter card__link"></i></a>
        </div>
      </div>
    </div>

    <div class="card__image-desktop">
      <img class="card__image" src="${image}" alt="${image}" />
    </div>

    <div class="card__reference-desktop">
      <span>This is a caption on this photo for reference</span>
    </div>

    <div class="card__info-desktop">
      <span
        >Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?</span
      >
    </div>
  </div>
</div>
  `
}

//function to draw the card
function drawCard({id, price, image, title, sipnosis, avatar, name, date}) {
  return `
    <div class="card__main-card">
      <a class="card__link-wrap js-card-desktop" href="#" data-id="${id}"></a>
        <div class="card__main-image">
          <div class="card__image">
            <img src="${image}" alt="${image}"/>
              <div class="card__price">
                <a href="#" class="card__price-link"><button class="card__price-button">${price}</button></a>
                </div>
                <div class="card__favorite">
                  <a href="#"><i class="fas fa-star"></i></a>
                </div>
              </div>
          </div>

          <div class="card__bottom">
            <div class="card__title">
              <h2>${title}</h2>
            </div>

            <div class="card__sipnosis">
              <span>${sipnosis}...</span>
            </div>

            <hr class="card__hr" />

            <div class="card__main-footer">
              <div class="card__avatar">
                <img src="${avatar}" alt="${avatar}" />
              </div>

              <div class="card__name">
                <h3>${name}</h3>
              </div>

              <div class="card__date">
                <h3>${date}</h3>
              </div>
            </div>
          </div>

      </div>
  `
}

// function to draw the card not found
function drawNotFound() {
 return `
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
}

//function to show the button
function showButton() {
  return `
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

startScreen();
