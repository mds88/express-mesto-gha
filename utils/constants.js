const messages = {
  cardDeleted: 'Карточка удалена!',
  pageNotFound: 'Такой страницы не существует',
};

const regexp = {
  urlReg: /https?:\/{2}\b[^\\.][\w\-\\.]{1,}\.[a-z]{2,6}([\w\S]{1,})?/,
  emailReg: /^((([0-9A-Za-z]{1}[-0-9A-z\\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z0-9]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
};

module.exports = { messages, regexp };
