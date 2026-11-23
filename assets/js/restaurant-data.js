/* ============================================================
   ARUNACHALESHWARA PURE VEG RESTAURANT – DEFAULT MENU CATALOG
   Authentic South Indian & North Indian pure vegetarian dishes,
   temple bhojanam, breakfast tiffin, and Kumbakonam filter kaapi.
   ============================================================ */

const DEFAULT_RESTAURANT_CATEGORIES = [
  { id: 1, slug: 'breakfast', name: 'South Indian Breakfast & Tiffin', icon: 'bi-sun-fill', order_num: 1, is_active: true },
  { id: 2, slug: 'meals', name: 'Traditional Meals & Thali', icon: 'bi-circle-fill', order_num: 2, is_active: true },
  { id: 3, slug: 'north-indian', name: 'North Indian Specialties', icon: 'bi-fire', order_num: 3, is_active: true },
  { id: 4, slug: 'snacks', name: 'Evening Snacks & Quick Bites', icon: 'bi-cup-straw', order_num: 4, is_active: true },
  { id: 5, slug: 'beverages', name: 'Hot Kaapi & Refreshing Beverages', icon: 'bi-cup-hot-fill', order_num: 5, is_active: true },
  { id: 6, slug: 'desserts', name: 'Divine Sweets & Temple Prasadam', icon: 'bi-stars', order_num: 6, is_active: true }
];

const DEFAULT_MENU_ITEMS = [
  // --- South Indian Breakfast ---
  {
    id: 101,
    category_slug: 'breakfast',
    name: 'Ghee Podi Thatte Idli (2 Pcs)',
    regional_name: 'நெய் பொடி தட்டே இட்லி / నెయ్యి పొడి ఇడ్లీ',
    description: 'Thick, pillow-soft steamed rice cakes drenched in pure aromatic desi ghee and spicy house-ground gun powder (idli podi). Served with coconut chutney and piping hot sambar.',
    price: 60,
    image: 'assets/images/gallery/g4.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 1
  },
  {
    id: 102,
    category_slug: 'breakfast',
    name: 'Ghee Roast Masala Dosa',
    regional_name: 'நெய் ரோஸ்ட் மசாலா தோசை / నెయ్యి రోస్ట్ మసాలా దోశ',
    description: 'Crispy golden fermented rice crepe roasted generously in fresh cow ghee, filled with spiced mashed potato bhaji. Served with sambar, coconut chutney, and tomato onion chutney.',
    price: 85,
    image: 'assets/images/gallery/g5.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 2
  },
  {
    id: 103,
    category_slug: 'breakfast',
    name: 'Crispy Medu Vada (2 Pcs)',
    regional_name: 'மெது வடை / మేదు వడ',
    description: 'Golden fried savory lentil donuts infused with crushed peppercorns, curry leaves, and ginger. Perfectly crispy outside and fluffy inside.',
    price: 50,
    image: 'assets/images/gallery/g10.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 3
  },
  {
    id: 104,
    category_slug: 'breakfast',
    name: 'Ghee Ven Pongal with Cashews',
    regional_name: 'நெய் வெண் பொங்கல் / నెయ్యి వెన్ పొంగల్',
    description: 'Comforting sacred breakfast porridge prepared with short-grain raw rice and yellow moong dal, tempered in rich ghee with black pepper, cumin, ginger, and roasted cashews.',
    price: 70,
    image: 'assets/images/gallery/g7.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 4
  },
  {
    id: 105,
    category_slug: 'breakfast',
    name: 'Poori Masala (3 Pcs)',
    regional_name: 'பூரி கிழங்கு / పూరీ మసాలా',
    description: 'Puffy deep-fried whole wheat pooris served with mild South Indian potato-onion kurma gravy and spiced chutney.',
    price: 80,
    image: 'assets/images/gallery/g8.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 5
  },
  {
    id: 106,
    category_slug: 'breakfast',
    name: 'Special Mini Tiffin Platter',
    regional_name: 'ஸ்பெஷல் மினி டிபன் / స్పెషల్ మినీ టిఫిన్',
    description: 'All-in-one morning feast: 1 Thatte Idli, 1 Crispy Medu Vada, 1 Mini Masala Dosa, Ghee Kesari sweet, piping hot sambar, and 3 fresh chutneys.',
    price: 110,
    image: 'assets/images/services/restaurant.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 6
  },

  // --- Traditional Meals & Thali ---
  {
    id: 201,
    category_slug: 'meals',
    name: 'Special South Indian Bhojanam (Full Meals)',
    regional_name: 'அருணாசலேஸ்வரர் கோவில் ஸ்பெஷல் போஜனம் / స్పెషల్ దక్షిణ భారత భోజనం',
    description: 'Authentic pilgrimage feast served traditionally: Steamed Ponni Rice, Tiruvannamalai Temple Sambar, Tomato Pepper Rasam, Kara Kuzhambu, Poriyal (dry vegetable), Kootu (lentil stew), Crispy Appalam, Curd, Homemade Lemon Pickle, and Sweet Payasam.',
    price: 140,
    image: 'assets/images/services/restaurant.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 1
  },
  {
    id: 202,
    category_slug: 'meals',
    name: 'Executive Mini Meals Thali',
    regional_name: 'மினி மீல்ஸ் தாலி / మినీ మీల్స్',
    description: 'Quick nutritious lunch: Rice, Sambar, Rasam, Veg Poriyal, Curd, Appalam, and Pickle. Perfect for pilgrims on a tight schedule.',
    price: 100,
    image: 'assets/images/gallery/g3.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 2
  },
  {
    id: 203,
    category_slug: 'meals',
    name: 'Bisibelebath with Boondi & Ghee',
    regional_name: 'பிசிபேளேபாத் / బిసిబెలేబాత్',
    description: 'Rich Karnataka-style lentil and vegetable spiced rice simmered with ghee, garnished with fresh roasted cashews and crunchy salted boondi.',
    price: 85,
    image: 'assets/images/gallery/g2.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 3
  },
  {
    id: 204,
    category_slug: 'meals',
    name: 'Cooling Temple Curd Rice (Bagala Bath)',
    regional_name: 'தயிர் சாதம் / కమ్మని పెరుగు అన్నం',
    description: 'Tempered probiotic curd rice with mustard seeds, green chillies, ginger, and curry leaves, topped with sweet pomegranate pearls and tangy mango pickle. Deeply cooling after Girivalam walk.',
    price: 60,
    image: 'assets/images/gallery/g11.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 4
  },

  // --- North Indian Specialties ---
  {
    id: 301,
    category_slug: 'north-indian',
    name: 'Paneer Butter Masala',
    regional_name: 'பனீர் பட்டர் மசாலா / పన్నీర్ బటర్ మసాలా',
    description: 'Succulent cubes of fresh cottage cheese cooked in an aromatic, velvety makhani gravy infused with butter, cashew paste, and dried fenugreek leaves (kasuri methi).',
    price: 160,
    image: 'assets/images/gallery/g12.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 1
  },
  {
    id: 302,
    category_slug: 'north-indian',
    name: 'Dal Tadka with Ghee Cumin Tempering',
    regional_name: 'தால் தட்கா / దాల్ తడ్కా',
    description: 'Slow-cooked yellow toor & moong lentils tempered with pure ghee, cumin seeds, garlic, red chillies, and fresh coriander.',
    price: 120,
    image: 'assets/images/gallery/g1.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 2
  },
  {
    id: 303,
    category_slug: 'north-indian',
    name: 'Tawa Butter Roti / Phulka (Pack of 3)',
    regional_name: 'பட்டர் புல்கா / బటర్ రోటీ (3 pcs)',
    description: 'Soft puffed whole-wheat rotis cooked over open flame and brushed with creamy pure butter.',
    price: 45,
    image: 'assets/images/gallery/Accommodation1.jpeg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 3
  },
  {
    id: 304,
    category_slug: 'north-indian',
    name: 'Special Royal Veg Dum Biryani',
    regional_name: 'வெஜ் தம் பிரியாணி / వెజ్ దమ్ బిర్యానీ',
    description: 'Fragrant long-grain aged basmati rice layered with garden vegetables, mint, saffron milk, and aromatic whole spices. Served with cool mixed vegetable raita and spicy salan.',
    price: 140,
    image: 'assets/images/gallery/travel1.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 4
  },

  // --- Evening Snacks & Tiffin ---
  {
    id: 401,
    category_slug: 'snacks',
    name: 'Mysore Bonda (4 Pcs) with Chutney',
    regional_name: 'மைசூர் போண்டா / మైసూర్ బోండా',
    description: 'Fluffy golden fried fritters made with seasoned batter, crushed black pepper, and fresh coconut bits. Served with coconut chutney.',
    price: 55,
    image: 'assets/images/gallery/g6.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 1
  },
  {
    id: 402,
    category_slug: 'snacks',
    name: 'Masala Vada & Mirchi Bajji Platter',
    regional_name: 'மசால் வடை மற்றும் மிளகாய் பஜ்ஜி / మసాలా వడ & మిర్చి బజ్జీ',
    description: 'Crunchy chana dal masala vadas (2) and Andhra-style stuffed green chilli bajjis (2) served with onion salad and coconut chutney.',
    price: 60,
    image: 'assets/images/gallery/g9.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 2
  },

  // --- Beverages & Kaapi ---
  {
    id: 501,
    category_slug: 'beverages',
    name: 'Kumbakonam Degree Filter Coffee',
    regional_name: 'கும்பகோணம் டிகிரி பில்டர் காபி / కుంభకోణం డిగ్రీ ఫిల్టర్ కాఫీ',
    description: 'The soul of Tamil Nadu: First-decoction plantation coffee brewed fresh and frothed with thick full-cream milk in a traditional brass dabarah and tumbler.',
    price: 30,
    image: 'assets/images/gallery/Pilgrimage Experiences1.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 1
  },
  {
    id: 502,
    category_slug: 'beverages',
    name: 'Special Ginger Masala Tea',
    regional_name: 'இஞ்சி மசாலா டீ / అల్లం టీ',
    description: 'Strong milk tea simmered with fresh crushed ginger root, cardamom pods, and cloves. Warming and revitalizing.',
    price: 25,
    image: 'assets/images/gallery/Pilgrimage Experiences2.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 2
  },
  {
    id: 503,
    category_slug: 'beverages',
    name: 'Spiced Masala Buttermilk (Chaas)',
    regional_name: 'மோர் / మజ్జిగ',
    description: 'Freshly churned churned buttermilk seasoned with ginger, green chillies, asafoetida, curry leaves, and pink rock salt.',
    price: 30,
    image: 'assets/images/gallery/Accommodation2.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 3
  },

  // --- Desserts & Prasadam ---
  {
    id: 601,
    category_slug: 'desserts',
    name: 'Traditional Temple Sakkarai Pongal',
    regional_name: 'கோவில் சர்க்கரை பொங்கல் / తిరువణ్ణామలై చక్కెర పొంగలి',
    description: 'Sacred prasadam made with raw rice, moong dal, organic dark jaggery, pure cow ghee, edible camphor (pachai karpooram), green cardamom, and golden fried cashews.',
    price: 60,
    image: 'assets/images/gallery/g1.jpg',
    is_veg: true,
    is_special: true,
    is_available: true,
    order_num: 1
  },
  {
    id: 602,
    category_slug: 'desserts',
    name: 'Pineapple Ghee Rava Kesari',
    regional_name: 'நெய் ரவா கேசரி / నేతి రవ్వ కేసరి',
    description: 'Aromatic semolina pudding roasted in generous pure desi ghee, infused with saffron strands, pineapple essence, and toasted cashews.',
    price: 50,
    image: 'assets/images/gallery/g7.jpg',
    is_veg: true,
    is_special: false,
    is_available: true,
    order_num: 2
  }
];

// --- Certified Pure Vegetarian Restaurants in Tiruvannamalai ---
const RESTAURANTS_LIST = [
  {
    id: 'arn-inhouse',
    name: 'Arunachaleshwara Pure Veg Restaurant',
    tagline: 'In-House Sattvic & Temple Cuisine',
    badge: 'Our In-House Kitchen (Fastest)',
    cuisine: 'South Indian • Sattvic Temple Food • Desi Ghee • Unlimited Thali',
    location: 'Avulpet Bypass (Arunachaleshwara Sannidhi)',
    distance: 'In-House (Direct Room Service to all 17 Rooms)',
    timings: '06:30 AM – 10:30 PM',
    deliveryTime: '15 – 25 mins',
    rating: '4.9',
    ratingCount: '480+ Reviews',
    image: 'assets/images/services/restaurant.jpg',
    featured: true,
    minOrder: 100,
    deliveryFee: 0,
    is_open: true,
    description: 'Our dedicated in-house kitchen right at Arunachaleshwara Sannidhi. Serving steaming idlis, ghee roast dosas, traditional banana leaf thali meals, degree filter kaapi, and direct delivery to all 17 hotel rooms.'
  },
  {
    id: 'arunai-annamalaiyar',
    name: 'Arunai Annamalaiyar Pure Veg',
    tagline: 'Sacred Temple Facing Traditional Meals',
    badge: 'Temple Car Street Favorite',
    cuisine: 'South Indian Tiffin • Meals & Thali • Ghee Sweets',
    location: 'Sannathi Street, Near Eastern Raja Gopuram',
    distance: '0.8 km from Sannidhi',
    timings: '06:30 AM – 10:00 PM',
    deliveryTime: '25 – 35 mins',
    rating: '4.8',
    ratingCount: '340+ Reviews',
    image: 'assets/images/gallery/g4.jpg',
    featured: false,
    minOrder: 150,
    deliveryFee: 30,
    is_open: true,
    description: 'Popular temple-facing pure vegetarian dining destination renowned among girivalam devotees for podi thatte idlis, vadai sambar, and authentic chola-style thali.'
  },
  {
    id: 'aakash-pure-veg',
    name: 'Aakash Pure Veg Restaurant',
    tagline: 'Sattvic Delicacies & Multi-Cuisine Veg',
    badge: 'Near Sri Ramanasramam',
    cuisine: 'North & South Indian • Jain Sattvic • Degree Kaapi',
    location: 'Chengam Road, Near Sri Ramanasramam',
    distance: '1.4 km from Sannidhi',
    timings: '07:00 AM – 10:30 PM',
    deliveryTime: '30 – 40 mins',
    rating: '4.7',
    ratingCount: '290+ Reviews',
    image: 'assets/images/gallery/g5.jpg',
    featured: false,
    minOrder: 150,
    deliveryFee: 35,
    is_open: true,
    description: 'Wholesome sattvic, Jain-friendly, and North Indian specialties alongside South Indian tiffin, beloved by spiritual seekers and families visiting Ramanasramam.'
  },
  {
    id: 'sri-aariya-bhavan',
    name: 'Sri Aariya Bhavan Pure Veg',
    tagline: 'Crispy Dosas & Express Tiffin Service',
    badge: 'Bypass Road Express',
    cuisine: 'Crispy Dosas • Medu Vada • Pongal • Degree Kaapi',
    location: 'Bus Stand Bypass Road, Tiruvannamalai',
    distance: '1.2 km from Sannidhi',
    timings: '06:00 AM – 11:00 PM',
    deliveryTime: '20 – 30 mins',
    rating: '4.6',
    ratingCount: '210+ Reviews',
    image: 'assets/images/gallery/g10.jpg',
    featured: false,
    minOrder: 120,
    deliveryFee: 30,
    is_open: true,
    description: 'Celebrated for early-morning Girivalam breakfast packs, lightning-fast delivery, crispy golden medu vadas, and authentic Kumbakonam brass degree filter coffee.'
  }
];

// Immediate hydration from admin-saved localStorage if available
try {
  if (typeof localStorage !== 'undefined') {
    const rawSaved = localStorage.getItem('arn_restaurants_list');
    if (rawSaved) {
      const parsed = JSON.parse(rawSaved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        RESTAURANTS_LIST.length = 0;
        parsed.forEach(r => RESTAURANTS_LIST.push(r));
      }
    }
  }
} catch (e) {}

// Global exposure
if (typeof window !== 'undefined') {
  window.DEFAULT_RESTAURANT_CATEGORIES = DEFAULT_RESTAURANT_CATEGORIES;
  window.DEFAULT_MENU_ITEMS = DEFAULT_MENU_ITEMS;
  window.RESTAURANTS_LIST = RESTAURANTS_LIST;
}
