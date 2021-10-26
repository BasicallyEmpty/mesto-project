const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeImage = document.querySelector('.popup_type_image');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profName = profile.querySelector('.profile__name');
const profDesc = profile.querySelector('.profile__description');
const formEdit = document.querySelector('.form_type_edit');
const nameInput = formEdit.querySelector('#name');
const jobInput = formEdit.querySelector('#description');
const formAdd = document.querySelector('.form_type_add');
const cards = document.querySelector('.cards');

function openPopup(el) {
  el.classList.add('popup_active');
}

function closePopup(el) {
  el.classList.remove('popup_active');
}

function formEditSubmitHandler (evt) {
  evt.preventDefault();
  profName.textContent = nameInput.value;
  profDesc.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

function createCard(name, link) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDesc = cardElement.querySelector('.card__description-text');
  const likeButton = cardElement.querySelector('.card__like-button');
  const removeButton = cardElement.querySelector('.card__remove-button');

  cardImage.src = link;
  cardImage.alt = name;
  cardDesc.textContent = name;

  cardImage.addEventListener('click', function(evt) {
    const popupImage = document.querySelector('.popup__image');
    const popupCaption = document.querySelector('.popup__caption');

    popupImage.src = link;
    popupCaption.textContent = name;

    openPopup(popupTypeImage);
  });

  likeButton.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like-button_active');
  });

  removeButton.addEventListener('click', function(evt) {
    const eventTarget = evt.target;
    eventTarget.closest('.card').remove();
  })

  cards.append(cardElement);
}

function formAddSubmitListener(evt){
  evt.preventDefault();
  const placeName = formAdd.querySelector('#name');
  const placeLink = formAdd.querySelector('#link');

  createCard(placeName.value, placeLink.value);
  closePopup(popupTypeAdd);
  placeName.value = '';
  placeLink.value = '';
}

function initializeCards(list) {
  list.forEach((item) => {
    createCard(item.name, item.link);
  })
}

closeButtons.forEach((item) => {
  item.addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    closePopup(eventTarget.closest('.popup'));
  });
});

editButton.addEventListener('click', function() {
  openPopup(popupTypeEdit);
  nameInput.value = profName.textContent;
  jobInput.value = profDesc.textContent;
});

addButton.addEventListener('click', function() {
  openPopup(popupTypeAdd);
});

formEdit.addEventListener('submit', formEditSubmitHandler);

formAdd.addEventListener('submit', formAddSubmitListener);

initializeCards(initialCards);
