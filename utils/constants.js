const messages = {
  cardDeleted: 'Карточка удалена!',
  pageNotFound: 'Такой страницы не существует',
};

const regexp = { url: /https?:\/{2}\b[^\.][\w\-\.]{1,}\.[a-z]{2,6}([\w\S]{1,})?/ };

module.exports = { messages, regexp };
