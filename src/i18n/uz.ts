import type { Translations } from "./types";

const uz: Translations = {
  // ── Auth / Navbar ─────────────────────────────────────────────────────────
  loginWithGoogle:    "Google orqali kirish",
  logout:             "Chiqish",
  myOrders:           "Buyurtmalarim",
  admin:              "Admin",

  // ── Login page ────────────────────────────────────────────────────────────
  loginSubtitle:      "Sevimli restoranlaringizdan buyurtma berish uchun kiring",
  continueWithGoogle: "Google orqali davom etish",
  loginTerms:         "Tizimga kirib, xizmat shartlarimizga rozilik bildirasiz.",

  // ── Homepage ──────────────────────────────────────────────────────────────
  heroTitle:          "Mazali taomlar, eshigingizga yetkazib beriladi",
  heroSubtitle:       "Mahalliy restoranlarni ko'rib chiqing va sevimli taomlaringizni tez yetkazib oling.",
  orderNow:           "Hozir buyurtma bering",
  dbOffline:          "Ma'lumotlar bazasi ulanmagan",
  dbOfflineDesc:      "PostgreSQL ma'lumotlar bazasini ulang va npx prisma db push ni ishga tushiring.",
  noRestaurantsYet:   "Hozircha restoranlar yo'q",
  noRestaurantsDesc:  "Tez orada qaytib keling — yangi restoranlar yo'lda.",
  restaurantsNearYou: "Yaqinidagi restoranlar",

  // ── Restaurant card ───────────────────────────────────────────────────────
  openNow:            "Ochiq",
  closed:             "Yopiq",
  viewMenu:           "Menyuni ko'rish",

  // ── Restaurant detail page ────────────────────────────────────────────────
  menuSidebarTitle:   "Menyu",
  noMenuYet:          "Hozircha menyu yo'q",
  noMenuDesc:         "Bu restoran hali hech qanday taom qo'shmagan.",
  categoriesUnit:     "kategoriya",
  itemsUnit:          "taom",

  // ── Menu item card ────────────────────────────────────────────────────────
  addToCart:          "Savatga qo'shish",
  adding:             "Qo'shilmoqda…",
  unavailable:        "Mavjud emas",

  // ── Cart ──────────────────────────────────────────────────────────────────
  yourCart:           "Savatingiz",
  cartEmpty:          "Savat bo'sh",
  cartEmptyDesc:      "Boshlash uchun restoranlardan mazali taomlar qo'shing.",
  browseRestaurants:  "Restoranlarni ko'rish",
  orderSummary:       "Buyurtma xulosasi",
  total:              "Jami",
  proceedToCheckout:  "Buyurtma berish",
  continueShopping:   "← Xaridni davom ettirish",

  // ── Checkout ──────────────────────────────────────────────────────────────
  backToCart:         "Savatga qaytish",
  checkout:           "Rasmiylashtirish",
  checkoutEmptyDesc:  "Rasmiylashtirish uchun avval savatga taomlar qo'shing.",
  deliveryAddress:    "Yetkazib berish manzili",
  deliveryAddressPlaceholder: "To'liq manzilni kiriting",
  orderNotes:         "Buyurtma izohlari",
  orderNotesPlaceholder: "Maxsus ko'rsatmalar? (masalan: piyozsiz, qo'shimcha sous…)",
  optional:           "(ixtiyoriy)",
  placeOrder:         "Buyurtma berish",
  placingOrder:       "Buyurtma berilmoqda…",
  multiRestaurantWarning:
    "⚠ Savatda bir nechta restorandan mahsulotlar mavjud. Buyurtma berishdan oldin faqat bitta restoran mahsulotlarini qoldiring.",
  termsNote:          "Buyurtma berganda siz bizning foydalanish shartlarimizga rozilik bildirasiz.",

  // ── Order status badges ───────────────────────────────────────────────────
  pending:            "Kutilmoqda",
  confirmed:          "Tasdiqlangan",
  preparing:          "Tayyorlanmoqda",
  onTheWay:           "Yo'lda",
  delivered:          "Yetkazildi",
  cancelled:          "Bekor qilindi",

  // ── Order detail (customer + admin shared) ────────────────────────────────
  backToOrders:         "Buyurtmalarga qaytish",
  orderDetailsTitle:    "Buyurtma ma'lumotlari",
  restaurantLabel:      "Restoran",
  customerLabel:        "Mijoz",
  placedOn:             "Buyurtma sanasi",
  deliveryAddressLabel: "Yetkazib berish manzili",
  notesLabel:           "Izohlar",
  orderedItems:         "Buyurtma qilingan taomlar",
  eachUnit:             "ta",
  orderAgain:           "Qayta buyurtma berish",
  allOrders:            "Barcha buyurtmalar",

  // ── Orders list page ──────────────────────────────────────────────────────
  myOrdersTitle:      "Buyurtmalarim",
  noOrdersYet:        "Hali buyurtmalar yo'q",
  noOrdersDesc:       "Buyurtma berganingizdan so'ng buyurtma tarixi shu yerda ko'rinadi.",

  // ── Admin sidebar ─────────────────────────────────────────────────────────
  dashboard:          "Boshqaruv paneli",
  orders:             "Buyurtmalar",
  restaurants:        "Restoranlar",
  backToSite:         "← Saytga qaytish",

  // ── Admin dashboard ───────────────────────────────────────────────────────
  dashboardSubtitle:    "Platforma faoliyatiga umumiy ko'rinish",
  statTotalOrders:      "Jami buyurtmalar",
  statPendingOrders:    "Kutilayotgan buyurtmalar",
  statDeliveredOrders:  "Yetkazilgan buyurtmalar",
  statCancelled:        "Bekor qilingan",
  statCustomers:        "Mijozlar",
  statRevenue:          "Jami daromad",
  recentOrders:         "So'nggi buyurtmalar",
  viewAll:              "Barchasini ko'rish",
  noOrdersAdmin:        "Hozircha buyurtmalar yo'q.",
  colOrder:             "Buyurtma",
  colCustomer:          "Mijoz",
  colRestaurant:        "Restoran",
  colStatus:            "Holat",
  colTotal:             "Jami",
  colDate:              "Sana",

  // ── Admin orders list ─────────────────────────────────────────────────────
  allOrdersTitle:       "Barcha buyurtmalar",
  noAdminOrders:        "Hozircha buyurtmalar yo'q",
  noAdminOrdersDesc:    "Mijozlar tomonidan berilgan buyurtmalar bu yerda ko'rinadi.",
  colOrderId:           "Buyurtma ID",
  colItems:             "Taomlar",
  viewBtn:              "Ko'rish",

  // ── Admin – status updater ────────────────────────────────────────────────
  updateStatus:         "Holatni yangilash",
  updateStatusSection:  "Holatni yangilash",
  updatingStatus:       "Yangilanmoqda…",
  noChangesToSave:      "Saqlanadigan o'zgarishlar yo'q",

  // ── Admin – restaurant list ───────────────────────────────────────────────
  noRestaurantsAdminDesc: "Boshlash uchun birinchi restoran qo'shing.",
  editBtn:              "Tahrirlash",
  deleteBtn:            "O'chirish",
  colAddress:           "Manzil",
  colPhone:             "Telefon",
  colCategories:        "Kategoriyalar",
  colOrders:            "Buyurtmalar",

  // ── Admin – restaurant pages ──────────────────────────────────────────────
  backToRestaurants:    "Restoranlarga qaytish",
  addRestaurantDesc:    "Restoran yaratilgandan so'ng kategoriyalar va menyu elementlarini qo'shish mumkin.",
  manageRestaurantDesc: "Restoran ma'lumotlari, kategoriyalar va menyu elementlarini boshqaring.",

  // ── Admin – restaurant form ───────────────────────────────────────────────
  restaurantInfo:     "Restoran ma'lumotlari",
  nameLabel:          "Nomi",
  phoneLabel:         "Telefon",
  addressLabel:       "Manzil",
  descriptionLabel:   "Tavsif",
  imageUrlLabel:      "Rasm URL",
  statusLabel:        "Holat",
  openAccepting:      "Ochiq — buyurtmalar qabul qilinadi",
  closedNotAccepting: "Yopiq — buyurtmalar qabul qilinmaydi",
  saveChanges:        "O'zgarishlarni saqlash",
  createRestaurant:   "Restoran yaratish",
  saving:             "Saqlanmoqda…",
  cancel:             "Bekor qilish",
  addRestaurant:      "Restoran qo'shish",

  // ── Admin – categories ────────────────────────────────────────────────────
  categories:               "Kategoriyalar",
  noCategoriesYet:          "Hali kategoriyalar yo'q. Quyida birini qo'shing.",
  newCategoryPlaceholder:   "Yangi kategoriya nomi",
  add:                      "Qo'shish",

  // ── Admin – menu items ────────────────────────────────────────────────────
  menuItems:          "Menyu elementlari",
  addItem:            "Element qo'shish",
  updateItem:         "Elementni yangilash",
  editMenuItem:       "Menyu elementini tahrirlash",
  addNewMenuItem:     "Yangi menyu elementi qo'shish",
  addCategoryFirst:   "⚠ Menyu elementlari qo'shishdan oldin kamida bitta kategoriya yarating.",
  noMenuItemsYet:     "Hali menyu elementlari yo'q. Boshlash uchun \"Element qo'shish\"ni bosing.",
  categoryLabel:      "Kategoriya",
  selectCategory:     "Kategoriyani tanlang…",
  priceLabel:         "Narx ($)",
  availability:       "Mavjudligi",
  availableToOrder:   "Buyurtma uchun mavjud",
  unavailableHidden:  "Mavjud emas (menyudan yashirilgan)",
  yes:                "Ha",
  no:                 "Yo'q",

  // ── Footer ────────────────────────────────────────────────────────────────
  footerRights:       "Barcha huquqlar himoyalangan.",
};

export default uz;
