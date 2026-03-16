import type { Translations } from "./types";

const ru: Translations = {
  // ── Auth / Navbar ─────────────────────────────────────────────────────────
  loginWithGoogle:    "Войти через Google",
  logout:             "Выйти",
  myOrders:           "Мои заказы",
  admin:              "Админ",

  // ── Login page ────────────────────────────────────────────────────────────
  loginSubtitle:      "Войдите, чтобы заказывать из любимых ресторанов",
  continueWithGoogle: "Продолжить с Google",
  loginTerms:         "Входя в систему, вы соглашаетесь с условиями обслуживания.",

  // ── Homepage ──────────────────────────────────────────────────────────────
  heroTitle:          "Вкусная еда, доставленная к вашей двери",
  heroSubtitle:       "Просматривайте местные рестораны и получайте любимые блюда быстро.",
  orderNow:           "Заказать сейчас",
  dbOffline:          "База данных не подключена",
  dbOfflineDesc:      "Подключите базу данных PostgreSQL и запустите npx prisma db push.",
  noRestaurantsYet:   "Ресторанов пока нет",
  noRestaurantsDesc:  "Заходите позже — новые рестораны уже на подходе.",
  restaurantsNearYou: "Рестораны рядом",

  // ── Restaurant card ───────────────────────────────────────────────────────
  openNow:            "Открыто",
  closed:             "Закрыто",
  viewMenu:           "Смотреть меню",

  // ── Restaurant detail page ────────────────────────────────────────────────
  menuSidebarTitle:   "Меню",
  noMenuYet:          "Меню пока нет",
  noMenuDesc:         "Этот ресторан ещё не добавил блюда.",
  categoriesUnit:     "категории",
  itemsUnit:          "блюда",

  // ── Menu item card ────────────────────────────────────────────────────────
  addToCart:          "В корзину",
  adding:             "Добавляется…",
  unavailable:        "Недоступно",

  // ── Cart ──────────────────────────────────────────────────────────────────
  yourCart:           "Ваша корзина",
  cartEmpty:          "Корзина пуста",
  cartEmptyDesc:      "Добавьте блюда из ресторанов, чтобы начать заказ.",
  browseRestaurants:  "Смотреть рестораны",
  orderSummary:       "Сводка заказа",
  total:              "Итого",
  proceedToCheckout:  "Перейти к оформлению",
  continueShopping:   "← Продолжить покупки",

  // ── Checkout ──────────────────────────────────────────────────────────────
  backToCart:         "Вернуться в корзину",
  checkout:           "Оформление заказа",
  checkoutEmptyDesc:  "Добавьте блюда в корзину перед оформлением.",
  deliveryAddress:    "Адрес доставки",
  deliveryAddressPlaceholder: "Введите полный адрес доставки",
  orderNotes:         "Примечания к заказу",
  orderNotesPlaceholder: "Особые пожелания? (например: без лука, дополнительный соус…)",
  optional:           "(необязательно)",
  placeOrder:         "Оформить заказ",
  placingOrder:       "Оформляется…",
  multiRestaurantWarning:
    "⚠ В корзине есть товары из нескольких ресторанов. Оставьте товары только из одного ресторана перед оформлением.",
  termsNote:          "Оформляя заказ, вы соглашаетесь с условиями обслуживания.",

  // ── Order status badges ───────────────────────────────────────────────────
  pending:            "В ожидании",
  confirmed:          "Подтверждён",
  preparing:          "Готовится",
  onTheWay:           "В пути",
  delivered:          "Доставлен",
  cancelled:          "Отменён",

  // ── Order detail (customer + admin shared) ────────────────────────────────
  backToOrders:         "Назад к заказам",
  orderDetailsTitle:    "Детали заказа",
  restaurantLabel:      "Ресторан",
  customerLabel:        "Клиент",
  placedOn:             "Дата заказа",
  deliveryAddressLabel: "Адрес доставки",
  notesLabel:           "Примечания",
  orderedItems:         "Заказанные блюда",
  eachUnit:             "за шт.",
  orderAgain:           "Заказать снова",
  allOrders:            "Все заказы",

  // ── Orders list page ──────────────────────────────────────────────────────
  myOrdersTitle:      "Мои заказы",
  noOrdersYet:        "Заказов пока нет",
  noOrdersDesc:       "История заказов появится здесь после оформления первого заказа.",

  // ── Admin sidebar ─────────────────────────────────────────────────────────
  dashboard:          "Панель управления",
  orders:             "Заказы",
  restaurants:        "Рестораны",
  backToSite:         "← На сайт",

  // ── Admin dashboard ───────────────────────────────────────────────────────
  dashboardSubtitle:    "Обзор активности платформы",
  statTotalOrders:      "Всего заказов",
  statPendingOrders:    "Ожидающих заказов",
  statDeliveredOrders:  "Доставленных заказов",
  statCancelled:        "Отменённых",
  statCustomers:        "Клиентов",
  statRevenue:          "Общая выручка",
  recentOrders:         "Последние заказы",
  viewAll:              "Смотреть все",
  noOrdersAdmin:        "Заказов пока нет.",
  colOrder:             "Заказ",
  colCustomer:          "Клиент",
  colRestaurant:        "Ресторан",
  colStatus:            "Статус",
  colTotal:             "Итого",
  colDate:              "Дата",

  // ── Admin orders list ─────────────────────────────────────────────────────
  allOrdersTitle:       "Все заказы",
  noAdminOrders:        "Заказов пока нет",
  noAdminOrdersDesc:    "Заказы от клиентов появятся здесь.",
  colOrderId:           "ID заказа",
  colItems:             "Блюда",
  viewBtn:              "Просмотр",

  // ── Admin – status updater ────────────────────────────────────────────────
  updateStatus:         "Обновить статус",
  updateStatusSection:  "Обновить статус",
  updatingStatus:       "Обновляется…",
  noChangesToSave:      "Нет изменений для сохранения",

  // ── Admin – restaurant list ───────────────────────────────────────────────
  noRestaurantsAdminDesc: "Добавьте первый ресторан для начала работы.",
  editBtn:              "Изменить",
  deleteBtn:            "Удалить",
  colAddress:           "Адрес",
  colPhone:             "Телефон",
  colCategories:        "Категории",
  colOrders:            "Заказы",

  // ── Admin – restaurant pages ──────────────────────────────────────────────
  backToRestaurants:    "К ресторанам",
  addRestaurantDesc:    "После создания ресторана можно добавить категории и позиции меню.",
  manageRestaurantDesc: "Управляйте информацией о ресторане, категориями и меню.",

  // ── Admin – restaurant form ───────────────────────────────────────────────
  restaurantInfo:     "Данные ресторана",
  nameLabel:          "Название",
  phoneLabel:         "Телефон",
  addressLabel:       "Адрес",
  descriptionLabel:   "Описание",
  imageUrlLabel:      "URL изображения",
  statusLabel:        "Статус",
  openAccepting:      "Открыто — принимает заказы",
  closedNotAccepting: "Закрыто — не принимает заказы",
  saveChanges:        "Сохранить изменения",
  createRestaurant:   "Создать ресторан",
  saving:             "Сохранение…",
  cancel:             "Отмена",
  addRestaurant:      "Добавить ресторан",

  // ── Admin – categories ────────────────────────────────────────────────────
  categories:               "Категории",
  noCategoriesYet:          "Категорий пока нет. Добавьте ниже.",
  newCategoryPlaceholder:   "Название новой категории",
  add:                      "Добавить",

  // ── Admin – menu items ────────────────────────────────────────────────────
  menuItems:          "Позиции меню",
  addItem:            "Добавить позицию",
  updateItem:         "Обновить позицию",
  editMenuItem:       "Редактировать позицию",
  addNewMenuItem:     "Добавить новую позицию",
  addCategoryFirst:   "⚠ Создайте хотя бы одну категорию выше, прежде чем добавлять позиции.",
  noMenuItemsYet:     "Позиций меню пока нет. Нажмите «Добавить позицию» для начала.",
  categoryLabel:      "Категория",
  selectCategory:     "Выберите категорию…",
  priceLabel:         "Цена ($)",
  availability:       "Доступность",
  availableToOrder:   "Доступно для заказа",
  unavailableHidden:  "Недоступно (скрыто из меню)",
  yes:                "Да",
  no:                 "Нет",

  // ── Footer ────────────────────────────────────────────────────────────────
  footerRights:       "Все права защищены.",
};

export default ru;
