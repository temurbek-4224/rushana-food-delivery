export type Language = "en" | "uz" | "ru";

export type Translations = {
  // ── Auth / Navbar ─────────────────────────────────────────────────────────
  loginWithGoogle: string;
  logout: string;
  myOrders: string;
  admin: string;

  // ── Login page ────────────────────────────────────────────────────────────
  loginSubtitle: string;
  continueWithGoogle: string;
  loginTerms: string;

  // ── Homepage ──────────────────────────────────────────────────────────────
  heroTitle: string;
  heroSubtitle: string;
  orderNow: string;
  dbOffline: string;
  dbOfflineDesc: string;
  noRestaurantsYet: string;
  noRestaurantsDesc: string;
  restaurantsNearYou: string;

  // ── Restaurant card ───────────────────────────────────────────────────────
  openNow: string;
  closed: string;
  viewMenu: string;

  // ── Restaurant detail page ────────────────────────────────────────────────
  menuSidebarTitle: string;
  noMenuYet: string;
  noMenuDesc: string;
  categoriesUnit: string;
  itemsUnit: string;

  // ── Menu item card ────────────────────────────────────────────────────────
  addToCart: string;
  adding: string;
  unavailable: string;

  // ── Cart ──────────────────────────────────────────────────────────────────
  yourCart: string;
  cartEmpty: string;
  cartEmptyDesc: string;
  browseRestaurants: string;
  orderSummary: string;
  total: string;
  proceedToCheckout: string;
  continueShopping: string;

  // ── Checkout ──────────────────────────────────────────────────────────────
  backToCart: string;
  checkout: string;
  checkoutEmptyDesc: string;
  deliveryAddress: string;
  deliveryAddressPlaceholder: string;
  orderNotes: string;
  orderNotesPlaceholder: string;
  optional: string;
  placeOrder: string;
  placingOrder: string;
  multiRestaurantWarning: string;
  termsNote: string;

  // ── Order status badges ───────────────────────────────────────────────────
  pending: string;
  confirmed: string;
  preparing: string;
  onTheWay: string;
  delivered: string;
  cancelled: string;

  // ── Order detail (customer + admin shared) ────────────────────────────────
  backToOrders: string;
  orderDetailsTitle: string;
  restaurantLabel: string;
  customerLabel: string;
  placedOn: string;
  deliveryAddressLabel: string;
  notesLabel: string;
  orderedItems: string;
  eachUnit: string;
  orderAgain: string;
  allOrders: string;

  // ── Orders list page ──────────────────────────────────────────────────────
  myOrdersTitle: string;
  noOrdersYet: string;
  noOrdersDesc: string;

  // ── Admin sidebar ─────────────────────────────────────────────────────────
  dashboard: string;
  orders: string;
  restaurants: string;
  backToSite: string;

  // ── Admin dashboard ───────────────────────────────────────────────────────
  dashboardSubtitle: string;
  statTotalOrders: string;
  statPendingOrders: string;
  statDeliveredOrders: string;
  statCancelled: string;
  statCustomers: string;
  statRevenue: string;
  recentOrders: string;
  viewAll: string;
  noOrdersAdmin: string;
  colOrder: string;
  colCustomer: string;
  colRestaurant: string;
  colStatus: string;
  colTotal: string;
  colDate: string;

  // ── Admin orders list ─────────────────────────────────────────────────────
  allOrdersTitle: string;
  noAdminOrders: string;
  noAdminOrdersDesc: string;
  colOrderId: string;
  colItems: string;
  viewBtn: string;

  // ── Admin – status updater ────────────────────────────────────────────────
  updateStatus: string;
  updateStatusSection: string;
  updatingStatus: string;
  noChangesToSave: string;

  // ── Admin – restaurant list ───────────────────────────────────────────────
  noRestaurantsAdminDesc: string;
  editBtn: string;
  deleteBtn: string;
  colAddress: string;
  colPhone: string;
  colCategories: string;
  colOrders: string;

  // ── Admin – restaurant pages ──────────────────────────────────────────────
  backToRestaurants: string;
  addRestaurantDesc: string;
  manageRestaurantDesc: string;

  // ── Admin – restaurant form ───────────────────────────────────────────────
  restaurantInfo: string;
  nameLabel: string;
  phoneLabel: string;
  addressLabel: string;
  descriptionLabel: string;
  imageUrlLabel: string;
  statusLabel: string;
  openAccepting: string;
  closedNotAccepting: string;
  saveChanges: string;
  createRestaurant: string;
  saving: string;
  cancel: string;
  addRestaurant: string;

  // ── Admin – categories ────────────────────────────────────────────────────
  categories: string;
  noCategoriesYet: string;
  newCategoryPlaceholder: string;
  add: string;

  // ── Admin – menu items ────────────────────────────────────────────────────
  menuItems: string;
  addItem: string;
  updateItem: string;
  editMenuItem: string;
  addNewMenuItem: string;
  addCategoryFirst: string;
  noMenuItemsYet: string;
  categoryLabel: string;
  selectCategory: string;
  priceLabel: string;
  availability: string;
  availableToOrder: string;
  unavailableHidden: string;
  yes: string;
  no: string;

  // ── Footer ────────────────────────────────────────────────────────────────
  footerRights: string;
};
