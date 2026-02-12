const replayButton = document.getElementById("replay");
const openCardsButton = document.getElementById("openCards");
const backHomeButton = document.getElementById("backHome");
const backToOptionsButton = document.getElementById("backToOptions");
const cardOptionButtons = document.querySelectorAll(".card-option");
const scene = document.getElementById("scene");
const cardsView = document.getElementById("cardsView");
const cardDetail = document.getElementById("cardDetail");
const detailTitle = document.getElementById("detailTitle");
const detailMessage = document.getElementById("detailMessage");
const vaderScene = document.getElementById("vaderScene");
const pickleballScene = document.getElementById("pickleballScene");
const gymScene = document.getElementById("gymScene");
const hottubScene = document.getElementById("hottubScene");
const paper = document.querySelector(".paper");
const stamp = document.querySelector(".stamp");
const orbit = document.querySelector(".orbit");

const restartAnimation = () => {
  const animatedElements = [paper, stamp, orbit].filter(Boolean);

  animatedElements.forEach((element) => {
    element.style.animation = "none";
  });

  // Force reflow so the browser treats the next animation assignment as fresh.
  void document.body.offsetWidth;

  animatedElements.forEach((element) => {
    element.style.animation = "";
  });
};

if (replayButton) {
  replayButton.addEventListener("click", restartAnimation);
}

const showCardsView = () => {
  if (!scene || !cardsView) {
    return;
  }

  scene.classList.add("show-cards");
  cardsView.classList.remove("show-detail");
  cardDetail?.setAttribute("aria-hidden", "true");
  cardsView.setAttribute("aria-hidden", "false");
};

const showMainView = () => {
  if (!scene || !cardsView) {
    return;
  }

  scene.classList.remove("show-cards");
  cardsView.classList.remove("show-detail");
  cardDetail?.setAttribute("aria-hidden", "true");
  cardsView.setAttribute("aria-hidden", "true");
};

const cardData = {
  starwars: {
    title: "Star Wars Valentine",
    message: "Together we can rule the galaxy!",
    theme: "theme-starwars",
  },
  pickleball: {
    title: "Pickleball Valentine",
    message: "I dink you're the best, Valentine!",
    theme: "theme-pickleball",
  },
  gym: {
    title: "Gym Valentine",
    message: "Happy Valentine's Day to my swolemate.",
    theme: "theme-gym",
  },
  hottub: {
    title: "Hot Tub Valentine",
    message: "Hot together.",
    theme: "theme-hottub",
  },
};

const showCardDetail = (cardKey) => {
  if (!cardsView || !detailTitle || !detailMessage || !cardDetail) {
    return;
  }

  const themeClasses = ["theme-starwars", "theme-pickleball", "theme-gym", "theme-hottub"];
  cardDetail.classList.remove(...themeClasses);

  const selectedCard = cardData[cardKey] || cardData.starwars;
  detailTitle.textContent = selectedCard.title;
  detailMessage.textContent = selectedCard.message;

  if (selectedCard.theme) {
    cardDetail.classList.add(selectedCard.theme);
  }

  const isStarwars = selectedCard.theme === "theme-starwars";
  const isPickleball = selectedCard.theme === "theme-pickleball";
  const isGym = selectedCard.theme === "theme-gym";
  const isHottub = selectedCard.theme === "theme-hottub";
  vaderScene?.setAttribute("aria-hidden", String(!isStarwars));
  pickleballScene?.setAttribute("aria-hidden", String(!isPickleball));
  gymScene?.setAttribute("aria-hidden", String(!isGym));
  hottubScene?.setAttribute("aria-hidden", String(!isHottub));

  cardsView.classList.add("show-detail");
  cardDetail.setAttribute("aria-hidden", "false");
};

const showCardOptions = () => {
  if (!cardsView || !cardDetail) {
    return;
  }

  cardsView.classList.remove("show-detail");
  cardDetail.setAttribute("aria-hidden", "true");
  vaderScene?.setAttribute("aria-hidden", "true");
  pickleballScene?.setAttribute("aria-hidden", "true");
  gymScene?.setAttribute("aria-hidden", "true");
  hottubScene?.setAttribute("aria-hidden", "true");
};

if (openCardsButton) {
  openCardsButton.addEventListener("click", showCardsView);
}

if (backHomeButton) {
  backHomeButton.addEventListener("click", showMainView);
}

if (backToOptionsButton) {
  backToOptionsButton.addEventListener("click", showCardOptions);
}

cardOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const cardKey = button.dataset.cardKey || "starwars";
    showCardDetail(cardKey);
  });
});
