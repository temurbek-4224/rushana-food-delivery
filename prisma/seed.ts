import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Safe to re-run — wipes in dependency order
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.user.deleteMany();

  // ── Burger House ────────────────────────────────────────────────────────────
  const burger = await prisma.restaurant.create({
    data: {
      name: "Burger House",
      description:
        "Juicy smash burgers, crispy fries, and thick milkshakes. The best burger joint in town.",
      address: "12 Main Street, Downtown",
      phone: "+1 555-100-2001",
      imageUrl:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop",
      isOpen: true,
      categories: {
        create: [
          {
            name: "Burgers",
            menuItems: {
              create: [
                {
                  name: "Classic Smash Burger",
                  description: "Double smash patty, cheddar, pickles, special sauce",
                  price: 9.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "BBQ Bacon Burger",
                  description: "Beef patty, crispy bacon, BBQ sauce, onion rings",
                  price: 12.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Mushroom Swiss Burger",
                  description: "Beef patty, sautéed mushrooms, Swiss cheese, garlic aioli",
                  price: 11.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Spicy Crispy Chicken Burger",
                  description: "Fried chicken fillet, sriracha mayo, coleslaw, pickles",
                  price: 10.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Sides & Drinks",
            menuItems: {
              create: [
                {
                  name: "Loaded Fries",
                  description: "Crispy fries topped with cheese sauce and jalapeños",
                  price: 5.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Onion Rings",
                  description: "Thick-cut beer-battered onion rings with dipping sauce",
                  price: 4.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Vanilla Milkshake",
                  description: "Thick and creamy hand-spun vanilla shake",
                  price: 4.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1568901839119-631418a3910d?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Chocolate Milkshake",
                  description: "Rich dark chocolate hand-spun milkshake",
                  price: 4.99,
                  isAvailable: false,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ── Pizza Palace ─────────────────────────────────────────────────────────────
  const pizza = await prisma.restaurant.create({
    data: {
      name: "Pizza Palace",
      description:
        "Authentic Neapolitan-style pizzas baked in a wood-fired oven. Fresh ingredients, bold flavors.",
      address: "48 Oak Avenue, Midtown",
      phone: "+1 555-200-3002",
      imageUrl:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop",
      isOpen: true,
      categories: {
        create: [
          {
            name: "Pizzas",
            menuItems: {
              create: [
                {
                  name: "Margherita",
                  description: "San Marzano tomato, fresh mozzarella, basil, olive oil",
                  price: 13.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Pepperoni Feast",
                  description: "Double pepperoni, mozzarella, tomato sauce",
                  price: 15.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Quattro Formaggi",
                  description: "Mozzarella, gorgonzola, parmesan, ricotta",
                  price: 16.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Veggie Supreme",
                  description: "Roasted peppers, mushrooms, olives, red onion, feta",
                  price: 14.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Starters & Desserts",
            menuItems: {
              create: [
                {
                  name: "Garlic Bread",
                  description: "Toasted focaccia with garlic butter and herbs",
                  price: 4.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Burrata Salad",
                  description: "Creamy burrata, cherry tomatoes, basil oil, sea salt",
                  price: 8.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Tiramisu",
                  description: "Classic Italian tiramisu with mascarpone and espresso",
                  price: 6.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ── Sushi Zen ─────────────────────────────────────────────────────────────────
  const sushi = await prisma.restaurant.create({
    data: {
      name: "Sushi Zen",
      description:
        "Premium sushi and Japanese cuisine. Fresh fish, hand-rolled daily by our expert chefs.",
      address: "7 Cherry Blossom Lane, Eastside",
      phone: "+1 555-300-4003",
      imageUrl:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop",
      isOpen: true,
      categories: {
        create: [
          {
            name: "Rolls",
            menuItems: {
              create: [
                {
                  name: "Spicy Tuna Roll",
                  description: "Fresh tuna, spicy mayo, cucumber, sesame seeds (8 pcs)",
                  price: 14.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Dragon Roll",
                  description: "Shrimp tempura, avocado on top, eel sauce (8 pcs)",
                  price: 16.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1617196034099-e96b1174de9b?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Rainbow Roll",
                  description: "California roll topped with assorted sashimi (8 pcs)",
                  price: 17.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1562802378-063ec186a863?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Crunchy Roll",
                  description: "Shrimp, cucumber, topped with crunchy tempura flakes (8 pcs)",
                  price: 13.99,
                  isAvailable: false,
                },
              ],
            },
          },
          {
            name: "Nigiri & Sashimi",
            menuItems: {
              create: [
                {
                  name: "Salmon Nigiri",
                  description: "Hand-pressed sushi rice topped with fresh Atlantic salmon (2 pcs)",
                  price: 7.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Tuna Nigiri",
                  description: "Hand-pressed sushi rice topped with bluefin tuna (2 pcs)",
                  price: 8.99,
                  isAvailable: true,
                },
                {
                  name: "Sashimi Platter",
                  description: "Chef's selection of 12 premium sashimi slices",
                  price: 24.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Sides & Drinks",
            menuItems: {
              create: [
                {
                  name: "Miso Soup",
                  description: "Traditional dashi broth with tofu and wakame",
                  price: 2.99,
                  isAvailable: true,
                },
                {
                  name: "Edamame",
                  description: "Steamed salted soybean pods",
                  price: 3.49,
                  isAvailable: true,
                },
                {
                  name: "Japanese Green Tea",
                  description: "Authentic hot or cold sencha green tea",
                  price: 2.49,
                  isAvailable: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ── Toshkent Oshxonasi ────────────────────────────────────────────────────────
  const uzbek = await prisma.restaurant.create({
    data: {
      name: "Toshkent Oshxonasi",
      description:
        "Authentic Uzbek cuisine made with family recipes passed down for generations. Slow-cooked plov, tender shashlik, and hearty soups.",
      address: "3 Navoi Street, Uzbek Quarter",
      phone: "+998 71 200-5005",
      imageUrl:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop",
      isOpen: true,
      categories: {
        create: [
          {
            name: "Asosiy Taomlar",
            menuItems: {
              create: [
                {
                  name: "Fergana Plov",
                  description:
                    "Slow-cooked rice with lamb, caramelised carrots, raisins and chickpeas — the crown jewel of Uzbek cuisine",
                  price: 12.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Shashlik (4 skewers)",
                  description:
                    "Marinated lamb cubes grilled over charcoal, served with raw onion rings and flatbread",
                  price: 14.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Lagman",
                  description:
                    "Hand-pulled noodles in a rich lamb and vegetable broth with bell peppers, tomatoes and spices",
                  price: 10.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Dimlama",
                  description:
                    "Slow-braised lamb with potatoes, cabbage, onions and seasonal vegetables in a sealed pot",
                  price: 13.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Sho'rvalar & Ishtaha Ochuvchilar",
            menuItems: {
              create: [
                {
                  name: "Mastava",
                  description:
                    "Hearty Uzbek rice soup with lamb, tomatoes, carrots and fresh herbs — a warming everyday classic",
                  price: 7.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Samsa (3 pcs)",
                  description:
                    "Flaky baked pastry pockets filled with spiced minced lamb and onion, fresh from the tandoor",
                  price: 6.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1620921568790-c1cf8cd2c680?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Non (Uzbek Flatbread)",
                  description:
                    "Traditional round tandoor-baked bread with sesame seeds — perfect with any dish",
                  price: 2.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Ayran",
                  description: "Chilled salted yoghurt drink — refreshing and traditional",
                  price: 2.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ── Sweet Corner Café ─────────────────────────────────────────────────────────
  const cafe = await prisma.restaurant.create({
    data: {
      name: "Sweet Corner Café",
      description:
        "A cosy neighbourhood café serving artisan coffee, freshly baked pastries and indulgent desserts. Your perfect daily treat.",
      address: "9 Blossom Street, West End",
      phone: "+1 555-400-6006",
      imageUrl:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
      isOpen: true,
      categories: {
        create: [
          {
            name: "Pastries & Cakes",
            menuItems: {
              create: [
                {
                  name: "Chocolate Lava Cake",
                  description:
                    "Warm dark chocolate fondant with a molten centre, served with vanilla ice cream",
                  price: 7.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "New York Cheesecake",
                  description:
                    "Dense and creamy classic cheesecake on a buttery biscuit base with a berry compote",
                  price: 6.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Butter Croissant",
                  description:
                    "Freshly baked all-butter croissant, perfectly flaky and golden — plain or with jam",
                  price: 3.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Cinnamon Roll",
                  description:
                    "Soft brioche roll swirled with cinnamon sugar, topped with cream cheese glaze",
                  price: 4.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Coffee & Drinks",
            menuItems: {
              create: [
                {
                  name: "Cappuccino",
                  description:
                    "Double espresso with steamed micro-foam milk — classic Italian style",
                  price: 4.29,
                  imageUrl:
                    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Iced Matcha Latte",
                  description:
                    "Ceremonial-grade matcha blended with oat milk over ice — earthy and refreshing",
                  price: 5.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Berry Smoothie",
                  description:
                    "Blended strawberry, blueberry and raspberry with banana and almond milk",
                  price: 5.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1570696516188-ade861b84a49?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Hot Chocolate",
                  description:
                    "Rich Belgian chocolate melted into steamed milk, topped with whipped cream",
                  price: 4.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1542990253-a781e3be6590?w=400&auto=format&fit=crop",
                  isAvailable: false,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ── Crispy Wings ──────────────────────────────────────────────────────────────
  const wings = await prisma.restaurant.create({
    data: {
      name: "Crispy Wings",
      description:
        "Next-level fried chicken and wings. Double-fried for maximum crunch, tossed in bold sauces. Comfort food done right.",
      address: "77 Stadium Road, Sports District",
      phone: "+1 555-500-7007",
      imageUrl:
        "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop",
      isOpen: false,
      categories: {
        create: [
          {
            name: "Chicken & Wings",
            menuItems: {
              create: [
                {
                  name: "Buffalo Wings (10 pcs)",
                  description:
                    "Double-fried chicken wings tossed in classic tangy buffalo sauce, served with blue cheese dip",
                  price: 13.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Honey Garlic Wings (10 pcs)",
                  description:
                    "Sticky honey and roasted garlic glazed wings with sesame seeds and spring onion",
                  price: 14.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Crispy Chicken Box",
                  description:
                    "3 pieces of bone-in fried chicken with fries and your choice of dipping sauce",
                  price: 12.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Chicken Strips (5 pcs)",
                  description:
                    "Tender chicken breast strips in a seasoned panko crust, golden and juicy inside",
                  price: 10.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1612392062631-94b93b8f9c79?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Sides & Dips",
            menuItems: {
              create: [
                {
                  name: "Waffle Fries",
                  description:
                    "Thick-cut waffle-pattern fries, seasoned with smoked paprika and garlic salt",
                  price: 4.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Mac & Cheese",
                  description:
                    "Creamy four-cheese macaroni baked with a golden breadcrumb crust",
                  price: 5.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1543339520-23e8fde83e99?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Coleslaw",
                  description:
                    "House-made creamy coleslaw with shredded cabbage, carrot and apple cider vinegar dressing",
                  price: 2.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1607116359760-e66883f07175?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Dip Trio",
                  description:
                    "Choose any three: buffalo, honey mustard, blue cheese, ranch or sriracha mayo",
                  price: 2.49,
                  isAvailable: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // ── The Green Bowl ────────────────────────────────────────────────────────────
  const green = await prisma.restaurant.create({
    data: {
      name: "The Green Bowl",
      description:
        "Wholesome salads, grain bowls and handmade pastas made with seasonal, locally sourced ingredients. Eat well, feel great.",
      address: "22 Orchard Lane, Health Hub",
      phone: "+1 555-600-8008",
      imageUrl:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
      isOpen: true,
      categories: {
        create: [
          {
            name: "Salads & Bowls",
            menuItems: {
              create: [
                {
                  name: "Classic Caesar Salad",
                  description:
                    "Crisp romaine, house Caesar dressing, shaved parmesan, sourdough croutons and anchovies",
                  price: 11.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Salmon Poke Bowl",
                  description:
                    "Sushi rice, fresh salmon, edamame, avocado, cucumber, pickled ginger and ponzu drizzle",
                  price: 15.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Greek Salad",
                  description:
                    "Ripe tomatoes, cucumber, Kalamata olives, red onion, peppers and creamy feta with oregano dressing",
                  price: 10.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Avocado & Quinoa Bowl",
                  description:
                    "Tri-colour quinoa, roasted sweet potato, sliced avocado, kale, pumpkin seeds and tahini lemon dressing",
                  price: 13.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
              ],
            },
          },
          {
            name: "Pasta & Hot Mains",
            menuItems: {
              create: [
                {
                  name: "Pesto Pasta",
                  description:
                    "Al dente fusilli with house-made basil pesto, toasted pine nuts, cherry tomatoes and grana padano",
                  price: 13.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Spaghetti Carbonara",
                  description:
                    "Classic Roman-style with guanciale, pecorino romano and a silky egg yolk sauce — no cream",
                  price: 14.99,
                  imageUrl:
                    "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Arrabbiata Rigatoni",
                  description:
                    "Rigatoni in a spicy San Marzano tomato and chilli sauce with garlic and fresh parsley",
                  price: 12.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&auto=format&fit=crop",
                  isAvailable: true,
                },
                {
                  name: "Grilled Chicken & Veggies",
                  description:
                    "Herb-marinated grilled chicken breast with seasonal roasted vegetables and lemon yoghurt sauce",
                  price: 15.49,
                  imageUrl:
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop",
                  isAvailable: false,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✅ Created: ${burger.name}`);
  console.log(`✅ Created: ${pizza.name}`);
  console.log(`✅ Created: ${sushi.name}`);
  console.log(`✅ Created: ${uzbek.name}`);
  console.log(`✅ Created: ${cafe.name}`);
  console.log(`✅ Created: ${wings.name}`);
  console.log(`✅ Created: ${green.name}`);
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
