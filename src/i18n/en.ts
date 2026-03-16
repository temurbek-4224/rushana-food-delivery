import type { Translations } from "./types";

const en: Translations = {
  // ── Auth / Navbar ─────────────────────────────────────────────────────────
  loginWithGoogle:    "Login with Google",
  logout:             "Logout",
  myOrders:           "My Orders",
  admin:              "Admin",

  // ── Login page ────────────────────────────────────────────────────────────
  loginSubtitle:      "Sign in to order from your favourite restaurants",
  continueWithGoogle: "Continue with Google",
  loginTerms:         "By signing in you agree to our terms of service.",

  // ── Homepage ──────────────────────────────────────────────────────────────
  heroTitle:          "Delicious food, delivered to your door",
  heroSubtitle:       "Browse local restaurants and get your favourite meals delivered fast.",
  orderNow:           "Order Now",
  dbOffline:          "Database not connected",
  dbOfflineDesc:      "Connect a PostgreSQL database and run npx prisma db push to get started.",
  noRestaurantsYet:   "No restaurants yet",
  noRestaurantsDesc:  "Check back soon — new restaurants are on the way.",
  restaurantsNearYou: "Restaurants Near You",

  // ── Restaurant card ───────────────────────────────────────────────────────
  openNow:            "Open",
  closed:             "Closed",
  viewMenu:           "View Menu",

  // ── Restaurant detail page ────────────────────────────────────────────────
  menuSidebarTitle:   "Menu",
  noMenuYet:          "No menu yet",
  noMenuDesc:         "This restaurant hasn't added any items yet.",
  categoriesUnit:     "categories",
  itemsUnit:          "items",

  // ── Menu item card ────────────────────────────────────────────────────────
  addToCart:          "Add to Cart",
  adding:             "Adding…",
  unavailable:        "Unavailable",

  // ── Cart ──────────────────────────────────────────────────────────────────
  yourCart:           "Your Cart",
  cartEmpty:          "Your cart is empty",
  cartEmptyDesc:      "Add some delicious items from a restaurant to get started.",
  browseRestaurants:  "Browse Restaurants",
  orderSummary:       "Order Summary",
  total:              "Total",
  proceedToCheckout:  "Proceed to Checkout",
  continueShopping:   "← Continue Shopping",

  // ── Checkout ──────────────────────────────────────────────────────────────
  backToCart:         "Back to Cart",
  checkout:           "Checkout",
  checkoutEmptyDesc:  "Add items to your cart before checking out.",
  deliveryAddress:    "Delivery Address",
  deliveryAddressPlaceholder: "Enter your full delivery address",
  orderNotes:         "Order Notes",
  orderNotesPlaceholder: "Any special instructions? (e.g. no onions, extra sauce…)",
  optional:           "(optional)",
  placeOrder:         "Place Order",
  placingOrder:       "Placing Order…",
  multiRestaurantWarning:
    "⚠ Your cart contains items from multiple restaurants. Please keep items from one restaurant only before placing an order.",
  termsNote:          "By placing your order you agree to our terms of service.",

  // ── Order status badges ───────────────────────────────────────────────────
  pending:            "Pending",
  confirmed:          "Confirmed",
  preparing:          "Preparing",
  onTheWay:           "On the Way",
  delivered:          "Delivered",
  cancelled:          "Cancelled",

  // ── Order detail (customer + admin shared) ────────────────────────────────
  backToOrders:         "Back to Orders",
  orderDetailsTitle:    "Order Details",
  restaurantLabel:      "Restaurant",
  customerLabel:        "Customer",
  placedOn:             "Placed on",
  deliveryAddressLabel: "Delivery address",
  notesLabel:           "Notes",
  orderedItems:         "Items",
  eachUnit:             "each",
  orderAgain:           "Order Again",
  allOrders:            "All Orders",

  // ── Orders list page ──────────────────────────────────────────────────────
  myOrdersTitle:      "My Orders",
  noOrdersYet:        "No orders yet",
  noOrdersDesc:       "Your order history will appear here once you place an order.",

  // ── Admin sidebar ─────────────────────────────────────────────────────────
  dashboard:          "Dashboard",
  orders:             "Orders",
  restaurants:        "Restaurants",
  backToSite:         "← Back to site",

  // ── Admin dashboard ───────────────────────────────────────────────────────
  dashboardSubtitle:    "Overview of your platform activity",
  statTotalOrders:      "Total Orders",
  statPendingOrders:    "Pending Orders",
  statDeliveredOrders:  "Delivered Orders",
  statCancelled:        "Cancelled",
  statCustomers:        "Customers",
  statRevenue:          "Total Revenue",
  recentOrders:         "Recent Orders",
  viewAll:              "View all",
  noOrdersAdmin:        "No orders yet.",
  colOrder:             "Order",
  colCustomer:          "Customer",
  colRestaurant:        "Restaurant",
  colStatus:            "Status",
  colTotal:             "Total",
  colDate:              "Date",

  // ── Admin orders list ─────────────────────────────────────────────────────
  allOrdersTitle:       "All Orders",
  noAdminOrders:        "No orders yet",
  noAdminOrdersDesc:    "Orders placed by customers will appear here.",
  colOrderId:           "Order ID",
  colItems:             "Items",
  viewBtn:              "View",

  // ── Admin – status updater ────────────────────────────────────────────────
  updateStatus:         "Update Status",
  updateStatusSection:  "Update Status",
  updatingStatus:       "Updating…",
  noChangesToSave:      "No changes to save",

  // ── Admin – restaurant list ───────────────────────────────────────────────
  noRestaurantsAdminDesc: "Add your first restaurant to get started.",
  editBtn:              "Edit",
  deleteBtn:            "Delete",
  colAddress:           "Address",
  colPhone:             "Phone",
  colCategories:        "Categories",
  colOrders:            "Orders",

  // ── Admin – restaurant pages ──────────────────────────────────────────────
  backToRestaurants:    "Back to Restaurants",
  addRestaurantDesc:    "After creating the restaurant you can add categories and menu items.",
  manageRestaurantDesc: "Manage restaurant info, categories, and menu items.",

  // ── Admin – restaurant form ───────────────────────────────────────────────
  restaurantInfo:     "Restaurant Info",
  nameLabel:          "Name",
  phoneLabel:         "Phone",
  addressLabel:       "Address",
  descriptionLabel:   "Description",
  imageUrlLabel:      "Image URL",
  statusLabel:        "Status",
  openAccepting:      "Open — accepting orders",
  closedNotAccepting: "Closed — not accepting orders",
  saveChanges:        "Save Changes",
  createRestaurant:   "Create Restaurant",
  saving:             "Saving…",
  cancel:             "Cancel",
  addRestaurant:      "Add Restaurant",

  // ── Admin – categories ────────────────────────────────────────────────────
  categories:               "Categories",
  noCategoriesYet:          "No categories yet. Add one below.",
  newCategoryPlaceholder:   "New category name",
  add:                      "Add",

  // ── Admin – menu items ────────────────────────────────────────────────────
  menuItems:          "Menu Items",
  addItem:            "Add Item",
  updateItem:         "Update Item",
  editMenuItem:       "Edit Menu Item",
  addNewMenuItem:     "Add New Menu Item",
  addCategoryFirst:   "⚠ Create at least one category above before adding menu items.",
  noMenuItemsYet:     "No menu items yet. Click \"Add Item\" to get started.",
  categoryLabel:      "Category",
  selectCategory:     "Select category…",
  priceLabel:         "Price ($)",
  availability:       "Availability",
  availableToOrder:   "Available to order",
  unavailableHidden:  "Unavailable (hidden from menu)",
  yes:                "Yes",
  no:                 "No",

  // ── Footer ────────────────────────────────────────────────────────────────
  footerRights:       "All rights reserved.",
};

export default en;
