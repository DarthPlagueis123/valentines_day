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

const cardCopy = {
  Classic: "Your full Valentine card content for this style will go here.",
  Sweet: "Your full Valentine card content for this style will go here.",
  Playful: "Your full Valentine card content for this style will go here.",
  Warm: "Your full Valentine card content for this style will go here.",
  Poetic: "Your full Valentine card content for this style will go here.",
  Forever: "Your full Valentine card content for this style will go here.",
};

const showCardDetail = (title) => {
  if (!cardsView || !detailTitle || !detailMessage || !cardDetail) {
    return;
  }

  detailTitle.textContent = title;
  detailMessage.textContent = cardCopy[title] || cardCopy.Classic;
  cardsView.classList.add("show-detail");
  cardDetail.setAttribute("aria-hidden", "false");
};

const showCardOptions = () => {
  if (!cardsView || !cardDetail) {
    return;
  }

  cardsView.classList.remove("show-detail");
  cardDetail.setAttribute("aria-hidden", "true");
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
    const cardTitle = button.dataset.cardTitle || "Classic";
    showCardDetail(cardTitle);
  });
});
