/* ============================================================
   ARUNACHALESHWARA – Tour Packages Data & Rendering
   ============================================================ */

let PACKAGES_DATA = [
  {
    id: 'saptha-shiva-kshetra-yatra',
    title: '1 Day Saptha Shiva Kshetra Yatra',
    teluguTitle: 'సప్త శివక్షేత్ర యాత్ర (ఒకే రోజు.. ఏడు పవిత్ర క్షేత్రాలు..)',
    badge: '1 Day Temple Tour',
    category: 'Tamil Nadu Temple Tours',
    duration: '1 Day (04:00 AM – Night)',
    durationDays: 1,
    departureTime: '04:00 AM from Tiruvannamalai',
    returnTime: 'Return to Tiruvannamalai (రాత్రి తిరుగు ప్రయాణం)',
    image: 'assets/images/packages/saptha-shiva-kshetra-yatra.jpg',
    shortDesc: 'One Day – Seven Sacred Kshetras: Chidambaram, Vaitheeswaran Koil, Kumbakonam, Swamimalai, Thanjavur, Srirangam & Jambukeshwaram. Starts 04:00 AM from Tiruvannamalai.',
    overview: 'Embark on the divine Saptha Shiva Kshetra Yatra (సప్త శివక్షేత్ర యాత్ర), an extraordinary one-day pilgrimage connecting seven of South India\'s holiest shrines in a single day. Starting at 04:00 AM from Tiruvannamalai, this journey covers the Cosmic Dance hall at Chidambaram (Akasha Sthalam), the divine healing shrine of Vaitheeswaran Koil (Angaraka Sthalam), the temple capital Kumbakonam, Lord Murugan\'s 4th Arupadaiveedu at Swamimalai, the UNESCO World Heritage Brihadeeswarar Big Temple in Thanjavur, the foremost Divya Desam at Srirangam, and the sanctified water element temple Jambukeshwaram in Thiruvanaikaval before returning to Tiruvannamalai.',
    routeFlow: [
      'Chidambaram',
      'Vaitheeswaran Koil',
      'Kumbakonam',
      'Swamimalai',
      'Thanjavur',
      'Srirangam',
      'Jambukeshwaram'
    ],
    posterHighlights: [
      'Comfortable Journey (సౌకర్యవంతమైన ప్రయాణం)',
      'Complete Darshans (పూర్తి దర్శనాలు)',
      'Experienced Pilgrimage Drivers (అనుభవజ్ఞులైన డ్రైవర్స్)',
      'Strict Punctuality & Timing (సమయపాలన)',
      'Doorstep Pickup & Return in Tiruvannamalai',
      'Spiritual Guidance for Queue & Darshan Timings'
    ],
    places: [
      'Chidambaram (చిదంబరం) – Sri Nataraja Temple (Akasha Lingam)',
      'Vaitheeswaran Koil (వైటీశ్వరన్ కోయిల్) – Sri Vaithiyanathar & Angaraka Sthalam',
      'Kumbakonam (కుంభకోణం) – Sri Adi Kumbeswarar Temple & Mahamaham Tank',
      'Swamimalai (స్వామిమలై) – Swaminatha Swamy Temple (4th Arupadaiveedu of Murugan)',
      'Thanjavur (తంజావూరు) – Brihadeeswarar Temple (UNESCO Big Temple)',
      'Srirangam (శ్రీరంగం) – Sri Ranganathaswamy Temple (Foremost Divya Desam)',
      'Jambukeshwaram (జంబుకేశ్వరం) – Thiruvanaikaval (Appu / Water Lingam)'
    ],
    itinerary: [
      {
        day: '04:00 AM',
        title: 'Departure from Tiruvannamalai',
        description: 'Early morning departure from your hotel/ashram in Tiruvannamalai. Smooth highway drive in a comfortable sanitized A/C vehicle.'
      },
      {
        day: '06:30 AM – 08:30 AM',
        title: 'Chidambaram – Sri Nataraja Temple',
        description: 'First sacred stop: Lord Nataraja Temple representing the Space element (Akasha Lingam). Darshan of the Kanaka Sabha and Chidambara Rahasyam.'
      },
      {
        day: '09:15 AM – 10:30 AM',
        title: 'Vaitheeswaran Koil – Healing Sthalam',
        description: 'Darshan of Lord Shiva as Vaidyanathar (the divine doctor) and Goddess Thaiyalnayaki Ambal. Visit the sacred Angaraka (Mars) shrine and holy Siddhamirtham tank.'
      },
      {
        day: '11:30 AM – 01:00 PM',
        title: 'Kumbakonam – Adi Kumbeswarar Temple',
        description: 'Worship at the ancient Sri Adi Kumbeswarar Temple, the spiritual epicenter of the Kumbakonam temple circuit. Brief view of the historic Mahamaham sacred tank.'
      },
      {
        day: '01:30 PM – 02:45 PM',
        title: 'Swamimalai – 4th Abode of Lord Murugan',
        description: 'Ascend the 60 steps representing the 60 Tamil years to worship Sri Swaminatha Swamy, where Murugan initiated his father Lord Shiva into the Pranava Mantra.'
      },
      {
        day: '03:45 PM – 05:15 PM',
        title: 'Thanjavur – Brihadeeswarar Big Temple',
        description: 'Marvel at the 1,000-year-old architectural marvel built by Raja Raja Chola I. Darshan of the massive monolithic Shivalinga and Nandi.'
      },
      {
        day: '06:15 PM – 07:45 PM',
        title: 'Srirangam – Sri Ranganathaswamy Temple',
        description: 'Evening darshan of Lord Ranganatha reclining upon Adisesha inside the world\'s largest active Hindu temple complex on the banks of the Cauvery.'
      },
      {
        day: '08:00 PM – 09:15 PM',
        title: 'Jambukeshwaram – Water Element Shrine',
        description: 'Final kshetra darshan at Thiruvanaikaval Jambukeswarar Temple (Water element) where natural spring waters continually bubble around the Lingam.'
      },
      {
        day: '09:30 PM – Night',
        title: 'Return Journey to Tiruvannamalai',
        description: 'Relax in the A/C cab during the smooth return drive back to Tiruvannamalai with divine memories and blessings.'
      }
    ],
    inclusions: [
      'Comfortable A/C vehicle (Sedan / Ertiga / Innova / Tempo Traveler)',
      'Experienced and courteous devotee driver',
      'Doorstep pickup and return drop in Tiruvannamalai',
      'All toll charges, fuel, parking fees, and driver allowances',
      'Route management ensuring all 7 temples are covered in 1 day'
    ],
    exclusions: [
      'Special darshan tickets or VIP entry passes',
      'Meals, breakfast, and refreshments',
      'Pooja materials, archana, and priest dakshina',
      'Personal expenses'
    ],
    importantInfo: [
      'Journey strictly begins at 04:00 AM from Tiruvannamalai to maintain the temple schedule.',
      'Modest traditional South Indian temple attire is mandatory (Dhoti/Kurta for men, Saree/Churidar for women).',
      'Mobile phones and cameras must be deposited at designated temple counters.',
      'Advance booking recommended for weekend and festival dates.'
    ],
    featured: true
  },
  {
    id: 'kamakshi-package',
    title: '1 Day Kamakshi Package',
    teluguTitle: 'కామాక్షి ప్యాకేజీ (కాంచీపురం, విష్ణు కంచి, శివ కంచి & శ్రీపురం గోల్డెన్ టెంపుల్)',
    badge: '1 Day Package',
    category: 'Tamil Nadu Temple Tours',
    duration: '1 Day (05:00 AM – 09:30 PM)',
    durationDays: 1,
    departureTime: '05:00 AM from Tiruvannamalai',
    returnTime: 'Return to Tiruvannamalai (రాత్రి తిరుగు ప్రయాణం)',
    image: 'assets/images/packages/kamakshi-package.jpg',
    shortDesc: 'Divine 1-Day Package to Kanchipuram, Vishnu Kanchi, Shiva Kanchi & Sripuram Golden Temple (Vellore). Starts 05:00 AM from Tiruvannamalai.',
    overview: 'Experience profound spiritual bliss with our signature 1 Day Kamakshi Package (కామాక్షి ప్యాకేజీ). Departing at 05:00 AM from Tiruvannamalai, this sacred tour unites the divine mother Goddess Sri Kamakshi Amman at her supreme Shakti Peetham, the magnificent Shaivite heritage of Shiva Kanchi (Ekambareswarar & Kailasanathar), the celestial Divya Desam majesty of Vishnu Kanchi (Varadaraja Perumal), and the glittering spiritual beauty of Sri Lakshmi Narayani Sripuram Golden Temple in Vellore before returning comfortably by night.',
    routeFlow: [
      'Kanchipuram (Sri Kamakshi Amman)',
      'Vishnu Kanchi (Varadaraja Perumal)',
      'Shiva Kanchi (Ekambareswarar & Kailasanathar)',
      'Sri Puram Golden Temple (Vellore)'
    ],
    posterHighlights: [
      'Comfortable Journey (Dedicated A/C Cab)',
      'Experienced Pilgrimage Driver',
      'Well Planned Itinerary (No Rushing)',
      'Book Now... Darshan Made Easy...',
      'Doorstep Pickup & Return in Tiruvannamalai',
      'Optimal Timing for Morning & Evening Aarti'
    ],
    places: [
      'Kanchipuram (కాంచీపురం) – Sri Kamakshi Amman Temple (Supreme Shakti Peetham)',
      'Vishnu Kanchi (విష్ణు కంచి) – Sri Varadaraja Perumal Temple (Divya Desam)',
      'Shiva Kanchi (శివ కంచి) – Sri Ekambareswarar (Earth Lingam) & Kailasanathar Temple',
      'Sri Puram Golden Temple (శ్రీపురం గోల్డెన్ టెంపుల్) – Vellore Mahalakshmi Swarna Mandir'
    ],
    itinerary: [
      {
        day: '05:00 AM',
        title: 'Departure from Tiruvannamalai',
        description: 'Early morning pickup from your hotel or ashram in Tiruvannamalai. Direct comfortable drive to the City of Thousand Temples, Kanchipuram.'
      },
      {
        day: '07:30 AM – 09:30 AM',
        title: 'Sri Kamakshi Amman Temple – Kanchipuram',
        description: 'Darshan of the Universal Mother Sri Kamakshi Amman seated in Padmasana posture. Worship at the sanctified Sri Chakra established by Sri Adi Shankaracharya.'
      },
      {
        day: '09:45 AM – 11:30 AM',
        title: 'Shiva Kanchi – Ekambareswarar & Kailasanathar',
        description: 'Visit Sri Ekambareswarar Temple representing the Earth element (Prithvi Lingam) with its 3,500-year-old sacred mango tree, followed by the 8th-century Pallava architectural jewel Kailasanathar Temple.'
      },
      {
        day: '11:45 AM – 01:15 PM',
        title: 'Vishnu Kanchi – Sri Varadaraja Perumal',
        description: 'Darshan at Sri Varadaraja Perumal Temple. View the golden and silver lizard shrines, holy temple tank, and the celebrated 100-pillar stone mandapam.'
      },
      {
        day: '01:30 PM – 02:45 PM',
        title: 'Lunch Break & Authentic Kanchi Silk Center',
        description: 'Traditional South Indian lunch break. Optional quick visit to traditional handloom Kanchipuram silk weavers.'
      },
      {
        day: '04:00 PM – 07:00 PM',
        title: 'Sripuram Sri Lakshmi Narayani Golden Temple (Vellore)',
        description: 'Walk the serene star-shaped walkway (Sri Chakra path) to witness the breathtaking golden temple covered with over 1,500 kg of pure gold foil, radiating divine energy.'
      },
      {
        day: '07:30 PM – 09:30 PM',
        title: 'Return to Tiruvannamalai',
        description: 'Comfortable return highway trip to Tiruvannamalai. Drop off at your doorstep by 09:30 PM.'
      }
    ],
    inclusions: [
      'Private air-conditioned vehicle for the entire circuit',
      'Experienced devotee driver well-versed with temple timings',
      'Pickup and drop from hotel / residence in Tiruvannamalai',
      'All toll fees, fuel charges, and parking taxes',
      'Well-organized schedule for peaceful darshan'
    ],
    exclusions: [
      'Special darshan tickets or pooja fees',
      'Meals, breakfast, and beverages',
      'Personal shopping and silk saree purchases',
      'Temple priest offerings'
    ],
    importantInfo: [
      'Departure at 05:00 AM ensures you reach Kanchi before midday temple closure (12:30 PM).',
      'Traditional dress code is required at all temples (Dhoti/Shirt for men, Saree/Salwar for women).',
      'Mobile phones and leather items are strictly prohibited inside Sripuram Golden Temple (free lockers available).',
      'Ideal for families, senior citizens, and devotees of Ambal, Shiva, and Perumal.'
    ],
    featured: true
  },
  {
    id: 'ranganatha-package',
    title: '1 Day Ranganatha Package',
    teluguTitle: 'రంగనాథ ప్యాకేజీ (తిరుకోయిలూరు, ఆది తిరువరంగం, వరాహీవరతేడేశ్వరం, అరకండనల్లూరు & తుపవనం)',
    badge: '1 Day Package',
    category: 'Local Temple Tours',
    duration: '1 Day (06:00 AM – 07:30 PM)',
    durationDays: 1,
    departureTime: '06:00 AM from Tiruvannamalai',
    returnTime: 'Return to Tiruvannamalai (సాయంత్రం తిరుగు ప్రయాణం)',
    image: 'assets/images/packages/ranganatha-package.jpg',
    shortDesc: 'Sacred 1-Day Heritage Tour: Tirukoiluru, Adhitiruvarangam (Ancient Ranganatha), Varahiveretedhwaram, Arakondanallur & Thupavanam. Starts 06:00 AM from Tiruvannamalai.',
    overview: 'Seek the divine grace of Lord Sri Ranganatha Swamy and discover the sacred soul of the Pennai river basin with our exclusive 1 Day Ranganatha Package (1 Day Raganatha Package / రంగనాథ ప్యాకేజీ). Situated within easy driving distance from Tiruvannamalai, this tour features Adi Thiruvarangam—the primeval Ranganatha temple older than Srirangam, where the magnificent reclining Lord stretches nearly 29 feet. Visit the celebrated Divya Desam at Tirukoiluru (Sri Trivikrama / Ulagalantha Perumal), the sacred hilltop rock at Arakondanallur where young Bhagavan Ramana Maharshi had his divine vision of Arunachala, the ancient shrine of Varahiveretedhwaram, and Thupavanam (Krupapureeswarar Temple in Thiruvennainallur).',
    routeFlow: [
      'Tirukoiluru',
      'Adhitiruvarangam',
      'Varahiveretedhwaram',
      'Arakondanallur',
      'Thupavanam'
    ],
    posterHighlights: [
      'Comfortable Journey (Doorstep A/C Cab)',
      'Experienced Driver with Local Heritage Knowledge',
      'Well Planned Itinerary (Peaceful Darshan)',
      'Convenient Return by Sunset (07:30 PM)',
      'Visit Primeval Ranganatha Temple (Older than Srirangam)',
      'Ramana Maharshi Sacred Cave & Divya Desam'
    ],
    places: [
      'Tirukoiluru (తిరుకోయిలూరు) – Sri Ulagalantha Perumal (Divya Desam) & Veerattareshwarar',
      'Adhitiruvarangam (ఆది తిరువరంగం) – Ancient Sri Ranganatha Swamy Temple (29-Foot Reclining Perumal)',
      'Varahiveretedhwaram (వరాహీవరతేడేశ్వరం) – Sri Varahishwarar Temple',
      'Arakondanallur (అరకండనల్లూరు) – Oppillamani Eswarar Temple & Ramana Maharshi Darshan Rock',
      'Thupavanam (తుపవనం) – Sri Krupapureeswarar Temple, Thiruvennainallur (Sundarar Sthalam)'
    ],
    itinerary: [
      {
        day: '06:00 AM',
        title: 'Departure from Tiruvannamalai',
        description: 'Morning pickup from your ashram/hotel in Tiruvannamalai. Enjoy a pleasant morning drive through the quiet countryside roads.'
      },
      {
        day: '07:15 AM – 08:45 AM',
        title: 'Tirukoiluru – Sri Ulagalantha Perumal & Veerattareshwarar',
        description: 'Darshan of the massive Lord Trivikrama (Vamana avatar with one foot raised to measure the heavens) at the Divya Desam where the Mudhal Alwars sang the first Divya Prabandham verses. Also visit Sri Veerattareshwarar Temple.'
      },
      {
        day: '09:15 AM – 11:30 AM',
        title: 'Adhitiruvarangam – Primeval Sri Ranganatha Swamy Temple',
        description: 'Worship the gigantic 29-foot reclining Lord Ranganatha (Periya Perumal) on Adisesha along the Thenpennai river banks. Historically recognized as older than Srirangam (Krita Yuga shrine).'
      },
      {
        day: '12:00 PM – 01:15 PM',
        title: 'Varahiveretedhwaram – Sri Varahishwarar Temple',
        description: 'Visit the sacred and serene sanctum of Lord Varahishwarar, an ancient shrine rich in sthala purana and peace.'
      },
      {
        day: '01:30 PM – 02:30 PM',
        title: 'Lunch Break',
        description: 'Relaxed traditional vegetarian lunch break at Tirukoilur.'
      },
      {
        day: '03:00 PM – 04:30 PM',
        title: 'Arakondanallur – Oppillamani Eswarar & Ramana Vision Rock',
        description: 'Climb the sacred granite rock hill to worship Lord Oppillamani Eswarar. Meditate inside the Pandava rock caves where 16-year-old Sri Ramana Maharshi had a divine vision of radiant Arunachala light while traveling to Tiruvannamalai.'
      },
      {
        day: '05:00 PM – 06:15 PM',
        title: 'Thupavanam – Sri Krupapureeswarar Temple, Thiruvennainallur',
        description: 'Visit the historic temple where Lord Shiva in the guise of an old Brahmin stopped Saint Sundaramurthy Nayanar\'s wedding to claim him as his eternal servitor.'
      },
      {
        day: '06:30 PM – 07:30 PM',
        title: 'Return to Tiruvannamalai',
        description: 'Smooth evening drive returning to Tiruvannamalai by 07:30 PM, giving you time for night temple darshan or Girivalam.'
      }
    ],
    inclusions: [
      'Private air-conditioned vehicle (Sedan / Innova / Tempo Traveler)',
      'Courteous, soft-spoken local driver familiar with all 5 temples',
      'Doorstep pickup and return in Tiruvannamalai',
      'Fuel, tolls, and parking included',
      'Comfortable and relaxed schedule suited for all age groups'
    ],
    exclusions: [
      'Archana, pooja, and temple priest dakshina',
      'Meals and personal refreshments',
      'Personal expenses'
    ],
    importantInfo: [
      'Convenient distance (35–50 km from Tiruvannamalai), making it ideal for a relaxed 1-day pilgrimage.',
      'Adi Thiruvarangam is considered the primeval Ranganatha kshetra and is very peaceful.',
      'Modest temple dress code recommended.',
      'Comfortable walking footwear advised for rock steps at Arakondanallur.'
    ],
    featured: true
  },
  {
    id: 'tiruvannamalai-local',
    title: 'Tiruvannamalai Local Temples',
    category: 'Local Temple Tours',
    duration: '1 Day',
    durationDays: 1,
    image: 'assets/images/popup.png',
    shortDesc: 'Visit the sacred Arunachaleswarar Temple and other prominent temples in and around Tiruvannamalai.',
    overview: 'Explore the spiritual heart of Tiruvannamalai with our local temple tour. Visit the magnificent Arunachaleswarar Temple, one of the Pancha Bhootha Sthalams, along with other ancient and revered temples in the area. Experience the divine atmosphere and rich heritage of this holy city.',
    places: [
      'Arunachaleswarar Temple',
      'Ramana Maharshi Ashram',
      'Seshadri Swamigal Ashram',
      'Skandashramam',
      'Virupaksha Cave',
      'Sathanur Dam (Optional)',
      'Girivalam Path'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Tiruvannamalai Temple Tour',
        description: 'Morning visit to Arunachaleswarar Temple for darshan. Proceed to Ramana Maharshi Ashram and Seshadri Swamigal Ashram. After lunch, visit Skandashramam and Virupaksha Cave on Arunachala Hill. Evening Girivalam (optional) or visit to nearby attractions.'
      }
    ],
    inclusions: [
      'Local transportation (Auto/Car)',
      'Temple visit guidance',
      'Pickup and drop from your accommodation',
      'Route planning and scheduling'
    ],
    exclusions: [
      'Accommodation',
      'Meals and refreshments',
      'Temple donation and pooja charges',
      'Personal expenses',
      'Special darshan tickets (if applicable)'
    ],
    importantInfo: [
      'Temple timings may vary on festival days',
      'Dress code applies at temples – modest traditional attire recommended',
      'Photography may be restricted inside temple sanctums',
      'Comfortable walking shoes recommended for hill visits'
    ],
    featured: true
  },
  {
    id: 'kanchipuram-temple-tour',
    title: 'Kanchipuram Temple Tour',
    category: 'Tamil Nadu Temple Tours',
    duration: '1–2 Days',
    durationDays: 2,
    image: 'assets/images/gallery/g8.jpg',
    shortDesc: 'Explore the ancient temples of Kanchipuram, the City of Thousand Temples and one of India\'s seven sacred cities.',
    overview: 'Kanchipuram, known as the City of Thousand Temples, is one of the seven sacred cities of India. This tour takes you through the magnificent Pallava and Chola-era temples, including the famous Ekambareswarar Temple and Kailasanathar Temple. Experience the architectural grandeur and spiritual significance of this ancient city.',
    places: [
      'Ekambareswarar Temple',
      'Kailasanathar Temple',
      'Kamakshi Amman Temple',
      'Varadharaja Perumal Temple',
      'Devarajaswami Temple',
      'Kanchi Kudil Heritage House'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Kanchipuram Temples',
        description: 'Depart from Tiruvannamalai early morning. Visit Ekambareswarar Temple (Pancha Bhootha Sthalam – Earth element). Proceed to Kailasanathar Temple and Kamakshi Amman Temple. After lunch, visit Varadharaja Perumal Temple and explore the silk weaving heritage.'
      },
      {
        day: 'Day 2',
        title: 'Extended Exploration (Optional)',
        description: 'Visit remaining temples and explore the city at a leisurely pace. Visit Kanchi Kudil heritage house. Shop for the famous Kanchipuram silk sarees. Return to Tiruvannamalai.'
      }
    ],
    inclusions: [
      'Comfortable vehicle (Ertiga/Innova)',
      'Experienced driver',
      'Pickup and drop from Tiruvannamalai',
      'Route planning and temple visit schedule'
    ],
    exclusions: [
      'Accommodation in Kanchipuram',
      'Meals and refreshments',
      'Temple donations and pooja charges',
      'Shopping expenses',
      'Personal expenses'
    ],
    importantInfo: [
      'Distance from Tiruvannamalai: Approximately 140 km',
      'Travel time: About 3–3.5 hours one way',
      'Early morning departure recommended',
      'Comfortable walking shoes advised'
    ],
    featured: true
  },
  {
    id: 'vellore-temple-tour',
    title: 'Vellore Temple Tour',
    category: 'Tamil Nadu Temple Tours',
    duration: '1 Day',
    durationDays: 1,
    image: 'assets/images/gallery/g11.jpg',
    shortDesc: 'Visit the stunning Golden Temple (Sripuram) and the historic Jalakandeswarar Temple in Vellore.',
    overview: 'Discover the spiritual splendor of Vellore with visits to the world-famous Sripuram Golden Temple, one of the most magnificent temples in India, and the historic Jalakandeswarar Temple inside Vellore Fort. This day trip offers a perfect blend of modern grandeur and ancient heritage.',
    places: [
      'Sripuram Golden Temple',
      'Jalakandeswarar Temple (Vellore Fort)',
      'Vellore Fort & Museum',
      'Assumption Cathedral Church'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Vellore Sightseeing',
        description: 'Morning departure from Tiruvannamalai. Visit the magnificent Sripuram Golden Temple – walk through the beautifully landscaped pathway to the golden-covered shrine. After lunch, visit Vellore Fort and the ancient Jalakandeswarar Temple inside the fort complex. Return to Tiruvannamalai by evening.'
      }
    ],
    inclusions: [
      'Comfortable vehicle for the trip',
      'Experienced driver',
      'Pickup and drop from your location in Tiruvannamalai',
      'Route guidance'
    ],
    exclusions: [
      'Meals and refreshments',
      'Temple donations',
      'Entry fees (if any)',
      'Personal expenses'
    ],
    importantInfo: [
      'Distance from Tiruvannamalai: Approximately 80 km',
      'Travel time: About 2 hours one way',
      'Sripuram Golden Temple has specific visiting hours – check before visit',
      'Mobile phones and cameras may be restricted inside some temple areas'
    ],
    featured: true
  },
  {
    id: 'pancha-bhootha-linga-yatra',
    title: 'Pancha Bhootha Linga Yatra',
    category: 'Pancha Bhootha Linga Yatra',
    duration: '5–7 Days',
    durationDays: 7,
    image: 'assets/images/gallery/g2.jpg',
    shortDesc: 'The sacred pilgrimage to all five Pancha Bhootha Sthalams representing the five elements of nature.',
    overview: 'Embark on one of the most sacred Shaivite pilgrimages – the Pancha Bhootha Linga Yatra. Visit all five ancient temples representing the five elements of nature: Earth, Water, Fire, Air, and Space. This comprehensive tour covers temples across Tamil Nadu and Andhra Pradesh, offering a deeply spiritual and transformative experience.',
    places: [
      'Ekambareswarar Temple, Kanchipuram (Earth – Prithvi)',
      'Jambukeswarar Temple, Thiruvanaikaval (Water – Appu)',
      'Arunachaleswarar Temple, Tiruvannamalai (Fire – Agni)',
      'Srikalahasti Temple, Srikalahasti (Air – Vayu)',
      'Chidambaram Nataraja Temple, Chidambaram (Space – Akasha)'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Tiruvannamalai – Fire Element',
        description: 'Begin the yatra at Arunachaleswarar Temple in Tiruvannamalai, representing the Fire element (Agni Lingam). Special darshan and pooja. Evening Girivalam (optional).'
      },
      {
        day: 'Day 2',
        title: 'Kanchipuram – Earth Element',
        description: 'Travel to Kanchipuram. Visit Ekambareswarar Temple representing the Earth element (Prithvi Lingam). Explore other temples in Kanchipuram.'
      },
      {
        day: 'Day 3',
        title: 'Thiruvanaikaval – Water Element',
        description: 'Travel to Thiruvanaikaval near Trichy. Visit Jambukeswarar Temple representing the Water element (Appu Lingam). The natural spring inside the sanctum is a unique sight.'
      },
      {
        day: 'Day 4',
        title: 'Chidambaram – Space Element',
        description: 'Travel to Chidambaram. Visit the Nataraja Temple representing the Space element (Akasha Lingam). Witness the famous Chidambaram Rahasyam.'
      },
      {
        day: 'Day 5',
        title: 'Srikalahasti – Air Element',
        description: 'Travel to Srikalahasti in Andhra Pradesh. Visit the Srikalahasti Temple representing the Air element (Vayu Lingam). The flickering lamp inside the sanctum, unaffected by wind, is the evidence of the Air element. Return journey.'
      }
    ],
    inclusions: [
      'Comfortable A/C vehicle throughout the tour',
      'Experienced driver familiar with temple routes',
      'Pickup and drop from Tiruvannamalai',
      'Tour planning and scheduling assistance',
      'Basic travel guidance at each temple'
    ],
    exclusions: [
      'Accommodation at each destination',
      'Meals and refreshments',
      'Temple donations and special pooja charges',
      'Entry fees or special darshan tickets',
      'Personal expenses and shopping',
      'Interstate toll charges (shared or additional)'
    ],
    importantInfo: [
      'This is a multi-day pilgrimage covering approximately 1200+ km',
      'Accommodation can be arranged at each stop upon request',
      'Flexible itinerary – can be customized based on your schedule',
      'Early morning departures recommended for temple timings',
      'Modest traditional attire required at all temples',
      'The yatra can be completed in 5–7 days depending on pace'
    ],
    featured: true
  },
  {
    id: 'tamil-nadu-temple-tours',
    title: 'Tamil Nadu Temple Tours',
    category: 'Tamil Nadu Temple Tours',
    duration: '3–5 Days',
    durationDays: 5,
    image: 'assets/images/gallery/g5.jpg',
    shortDesc: 'Comprehensive temple tours across Tamil Nadu covering major pilgrim centers and heritage sites.',
    overview: 'Explore the magnificent temple heritage of Tamil Nadu with our comprehensive temple tours. Visit iconic temples in Madurai, Rameswaram, Thanjavur, Trichy, and more. Each tour can be customized based on your interests, time, and the temples you wish to visit.',
    places: [
      'Meenakshi Amman Temple, Madurai',
      'Ramanathaswamy Temple, Rameswaram',
      'Brihadeeswarar Temple, Thanjavur',
      'Ranganathaswamy Temple, Srirangam',
      'Rock Fort Temple, Trichy',
      'Shore Temple, Mahabalipuram',
      'And many more sacred sites'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Departure & First Destination',
        description: 'Depart from Tiruvannamalai. The itinerary will be customized based on the selected temples and route. Our team will help plan the optimal route for your pilgrimage.'
      },
      {
        day: 'Day 2–4',
        title: 'Temple Visits',
        description: 'Visit temples as per the customized schedule. Each day planned with comfortable travel, temple darshan time, and rest. Accommodation arranged at each stopover.'
      },
      {
        day: 'Day 5',
        title: 'Return Journey',
        description: 'Final temple visits and return journey to Tiruvannamalai. The tour can be extended or shortened based on your requirements.'
      }
    ],
    inclusions: [
      'Comfortable A/C vehicle for the entire tour',
      'Professional and experienced driver',
      'Pickup and drop from Tiruvannamalai',
      'Customized route planning',
      'Travel guidance and temple information'
    ],
    exclusions: [
      'Accommodation',
      'Meals and refreshments',
      'Temple donations and pooja charges',
      'Special darshan tickets',
      'Toll charges and parking fees',
      'Personal expenses'
    ],
    importantInfo: [
      'Tour duration and route are fully customizable',
      'Contact us to discuss your preferred temples and schedule',
      'Accommodation can be arranged at each destination',
      'Group discounts available for larger parties',
      'Comfortable vehicles with experienced drivers provided'
    ],
    featured: true
  },
  {
    id: 'weekend-pilgrimage',
    title: 'Weekend Pilgrimage Special',
    category: 'Weekend Pilgrimage',
    duration: '2 Days',
    durationDays: 2,
    image: 'assets/images/gallery/g4.jpg',
    shortDesc: 'A short weekend pilgrimage covering Tiruvannamalai and nearby sacred temples.',
    overview: 'Perfect for those with limited time, our weekend pilgrimage package covers the most important temples in and around Tiruvannamalai. Spend a spiritually enriching weekend visiting ancient temples, performing Girivalam, and soaking in the divine atmosphere of this holy town.',
    places: [
      'Arunachaleswarar Temple',
      'Girivalam Path',
      'Ramana Maharshi Ashram',
      'Sathanur Dam',
      'Nearby Temples'
    ],
    itinerary: [
      {
        day: 'Day 1',
        title: 'Arrival & Temple Darshan',
        description: 'Arrive in Tiruvannamalai. Visit Arunachaleswarar Temple for darshan. Explore the ashrams. Evening – Girivalam (circumambulation of Arunachala Hill).'
      },
      {
        day: 'Day 2',
        title: 'Exploration & Departure',
        description: 'Morning temple visit. Explore nearby attractions like Sathanur Dam. Visit additional temples as per interest. Departure by evening.'
      }
    ],
    inclusions: [
      'Local transportation',
      'Temple visit guidance',
      'Pickup from bus stand/railway station',
      'Sightseeing arrangements'
    ],
    exclusions: [
      'Accommodation',
      'Meals',
      'Temple donations',
      'Personal expenses'
    ],
    importantInfo: [
      'Ideal for Friday evening to Sunday evening trips',
      'Accommodation can be arranged separately',
      'Best during Pournami (Full Moon) for Girivalam',
      'Customizable based on interests'
    ],
    featured: false
  },
  {
    id: 'customized-pilgrimage',
    title: 'Customized Pilgrimage',
    category: 'Customized Pilgrimage',
    duration: 'Flexible',
    durationDays: 0,
    image: 'assets/images/gallery/g6.jpg',
    shortDesc: 'Create your own personalized pilgrimage itinerary. We plan everything according to your preferences.',
    overview: 'Every pilgrim\'s journey is unique. Our customized pilgrimage service lets you design your own spiritual tour. Tell us which temples you want to visit, your preferred dates, group size, and budget, and we will create a tailor-made itinerary with all travel and accommodation arrangements.',
    places: [
      'Any temples of your choice across South India',
      'Jyotirlinga temples',
      'Divya Desam temples',
      'Shakti Peetha temples',
      'Navagraha temples',
      'And any other sacred destinations'
    ],
    itinerary: [
      {
        day: 'Step 1',
        title: 'Share Your Requirements',
        description: 'Tell us your preferred temples, travel dates, group size, and any special requirements. We will create a customized itinerary for you.'
      },
      {
        day: 'Step 2',
        title: 'Review & Confirm',
        description: 'Review the proposed itinerary, travel arrangements, and accommodation options. Suggest any changes until you are satisfied.'
      },
      {
        day: 'Step 3',
        title: 'Enjoy Your Pilgrimage',
        description: 'Sit back and enjoy a hassle-free spiritual journey while we take care of all the logistics.'
      }
    ],
    inclusions: [
      'Customized route planning',
      'Vehicle as per group size and preference',
      'Experienced driver',
      'Pickup and drop service',
      'Travel assistance throughout the trip'
    ],
    exclusions: [
      'Accommodation (can be arranged on request)',
      'Meals',
      'Temple donations and pooja expenses',
      'Personal expenses',
      'Entry fees and special darshan charges'
    ],
    importantInfo: [
      'Contact us at least 3–5 days before your planned travel date',
      'Share your complete requirements for the best itinerary',
      'Flexible pricing based on destinations and duration',
      'Special arrangements for elderly and differently-abled pilgrims',
      'Group packages available with discounted rates'
    ],
    featured: false
  }
];

const PACKAGE_CATEGORIES = [
  'All',
  '1 Day Temple Tours',
  'Local Temple Tours',
  'Tamil Nadu Temple Tours',
  'Pancha Bhootha Linga Yatra',
  'Weekend Pilgrimage',
  'Customized Pilgrimage'
];

/**
 * Render a single tour card (grid view)
 */
function renderTourCard(pkg, index) {
  const delay = (index % 4) * 100;
  const imageMarkup = pkg.image
    ? `<img src="${pkg.image}" alt="${pkg.title}" style="height: 230px; width: 100%; object-fit: cover;">`
    : `<div class="placeholder-img" style="height: 230px; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
         <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.3;"></i>
       </div>`;

  const departurePill = pkg.departureTime
    ? `<span class="badge bg-gold text-dark fw-bold me-1"><i class="bi bi-alarm-fill me-1"></i>${pkg.departureTime.split(' from')[0]}</span>`
    : '';

  const teluguSub = pkg.teluguTitle
    ? `<div class="text-maroon small fw-semibold mb-1" style="font-size: 0.85rem; line-height: 1.35;">${pkg.teluguTitle}</div>`
    : '';

  return `
  <div class="col-lg-4 col-md-6 mb-4 tour-card-wrapper" data-category="${pkg.category}" data-duration="${pkg.durationDays}" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="tour-card h-100 d-flex flex-column">
      <div class="tour-card-img position-relative">
        ${imageMarkup}
        <span class="tour-card-badge">${pkg.badge || pkg.category}</span>
      </div>
      <div class="tour-card-body d-flex flex-column flex-grow-1">
        <h5>${pkg.title}</h5>
        ${teluguSub}
        <p class="flex-grow-1">${pkg.shortDesc}</p>
        <div class="tour-card-meta mb-2">
          ${departurePill}
          <span><i class="bi bi-clock"></i> ${pkg.duration}</span>
          <span><i class="bi bi-geo-alt"></i> ${pkg.places.length} Places</span>
        </div>
        <div class="tour-card-footer mt-auto pt-2 border-top">
          <span class="tour-card-price">
            <small>Contact for pricing</small>
          </span>
          <a href="tour-details.html?id=${pkg.id}" class="btn btn-primary-custom btn-sm">
            View Details <i class="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Render tour list item (list view)
 */
function renderTourListItem(pkg, index) {
  const imageMarkup = pkg.image
    ? `<img src="${pkg.image}" alt="${pkg.title}" style="height: 100%; min-height: 220px; width: 100%; object-fit: cover;">`
    : `<div class="placeholder-img" style="height: 100%; min-height: 220px; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
        <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.3;"></i>
      </div>`;

  const departurePill = pkg.departureTime
    ? `<span class="badge bg-gold text-dark fw-bold me-2"><i class="bi bi-alarm-fill me-1"></i>${pkg.departureTime}</span>`
    : '';

  const teluguSub = pkg.teluguTitle
    ? `<div class="text-maroon small fw-semibold mb-2" style="font-size: 0.9rem;">${pkg.teluguTitle}</div>`
    : '';

  return `
  <div class="tour-list-item tour-card-wrapper" data-category="${pkg.category}" data-duration="${pkg.durationDays}" data-aos="fade-up">
    <div class="tour-list-item-img">
      ${imageMarkup}
    </div>
    <div class="tour-list-item-body">
      <div class="d-flex flex-wrap gap-2 mb-2">
        <span class="tour-card-badge d-inline-block" style="position: static;">${pkg.badge || pkg.category}</span>
        ${departurePill}
      </div>
      <h5>${pkg.title}</h5>
      ${teluguSub}
      <p>${pkg.shortDesc}</p>
      <div class="tour-card-meta mb-3">
        <span><i class="bi bi-clock"></i> ${pkg.duration}</span>
        <span><i class="bi bi-geo-alt"></i> ${pkg.places.length} Places</span>
      </div>
      <a href="tour-details.html?id=${pkg.id}" class="btn btn-primary-custom btn-sm">
        View Details <i class="bi bi-arrow-right"></i>
      </a>
    </div>
  </div>`;
}

/**
 * Render all packages with filtering
 */
function renderPackagesPage() {
  const gridContainer = document.getElementById('packagesGrid');
  const listContainer = document.getElementById('packagesList');
  if (!gridContainer) return;

  // Render grid view immediately from local cache
  gridContainer.innerHTML = `<div class="row">${PACKAGES_DATA.map((p, i) => renderTourCard(p, i)).join('')}</div>`;

  // Render list view
  if (listContainer) {
    listContainer.innerHTML = PACKAGES_DATA.map((p, i) => renderTourListItem(p, i)).join('');
  }

  // Initialize filters
  initPackageFilters();

  // Silently hydrate with dynamic data from Supabase if available
  if (typeof fetchPackagesFromSupabase === 'function') {
    fetchPackagesFromSupabase().then(dbPackages => {
      if (dbPackages && dbPackages.length > 0) {
        PACKAGES_DATA = dbPackages;
        window.PACKAGES_DATA = PACKAGES_DATA;
        gridContainer.innerHTML = `<div class="row">${PACKAGES_DATA.map((p, i) => renderTourCard(p, i)).join('')}</div>`;
        if (listContainer) {
          listContainer.innerHTML = PACKAGES_DATA.map((p, i) => renderTourListItem(p, i)).join('');
        }
        filterPackages();
        if (typeof AOS !== 'undefined') AOS.refresh();
      }
    }).catch(err => {
      console.warn('Supabase dynamic packages fetch error:', err);
    });
  }
}

/**
 * Initialize package filtering
 */
function initPackageFilters() {
  // Category filter buttons
  const filterBtns = document.querySelectorAll('.pkg-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPackages();
    });
  });

  // Search input
  const searchInput = document.getElementById('packageSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => filterPackages());
  }

  // Duration filter
  const durationFilter = document.getElementById('durationFilter');
  if (durationFilter) {
    durationFilter.addEventListener('change', () => filterPackages());
  }

  // View toggle
  const gridViewBtn = document.getElementById('gridViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const gridContainer = document.getElementById('packagesGrid');
  const listContainer = document.getElementById('packagesList');

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener('click', () => {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      if (gridContainer) gridContainer.style.display = 'block';
      if (listContainer) listContainer.style.display = 'none';
    });

    listViewBtn.addEventListener('click', () => {
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      if (gridContainer) gridContainer.style.display = 'none';
      if (listContainer) listContainer.style.display = 'block';
    });
  }
}

/**
 * Filter packages based on current selections
 */
function filterPackages() {
  const activeFilter = document.querySelector('.pkg-filter-btn.active');
  const category = activeFilter ? activeFilter.dataset.category : 'All';
  const searchTerm = (document.getElementById('packageSearch')?.value || '').toLowerCase();
  const durationValue = document.getElementById('durationFilter')?.value || 'all';

  const allCards = document.querySelectorAll('.tour-card-wrapper');
  let visibleCount = 0;

  allCards.forEach(card => {
    const cardCategory = card.dataset.category;
    const cardDuration = parseInt(card.dataset.duration) || 0;
    const cardText = card.textContent.toLowerCase();

    let show = true;

    // Category filter
    if (category !== 'All') {
      if (category === '1 Day Temple Tours') {
        if (cardDuration !== 1 && !cardCategory.toLowerCase().includes('1 day')) {
          show = false;
        }
      } else if (cardCategory !== category) {
        show = false;
      }
    }

    // Search filter
    if (searchTerm && !cardText.includes(searchTerm)) show = false;

    // Duration filter
    if (durationValue !== 'all') {
      if (durationValue === '1' && cardDuration !== 1) show = false;
      if (durationValue === '2-3' && (cardDuration < 2 || cardDuration > 3)) show = false;
      if (durationValue === '5+' && cardDuration < 5) show = false;
    }

    card.style.display = show ? '' : 'none';
    if (show) visibleCount++;
  });

  // Show no results message
  const noResults = document.getElementById('noResultsMsg');
  if (noResults) {
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
  }
}

/**
 * Helper to populate tour details DOM
 */
function populateTourDetailsDOM(tour, container) {
  // Update page title
  document.title = `${tour.title} – Arunachaleshwara Tours & Travels`;

  // Update hero
  const heroTitle = document.getElementById('tourHeroTitle');
  const heroBreadcrumb = document.getElementById('tourBreadcrumb');
  if (heroTitle) heroTitle.textContent = tour.title;
  if (heroBreadcrumb) heroBreadcrumb.textContent = tour.title;

  const departureBadge = tour.departureTime
    ? `<span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;"><i class="bi bi-alarm-fill text-gold me-1"></i> Starts: ${tour.departureTime}</span>`
    : '';

  const returnBadge = tour.returnTime
    ? `<span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;"><i class="bi bi-arrow-return-left text-gold me-1"></i> ${tour.returnTime}</span>`
    : '';

  const teluguHeader = tour.teluguTitle
    ? `<h5 class="text-maroon fw-bold mb-2">${tour.teluguTitle}</h5>`
    : '';

  const routeFlowHTML = tour.routeFlow && tour.routeFlow.length > 0
    ? `
    <div class="route-flow-box p-3 bg-cream rounded-4 border border-gold mb-4" data-aos="fade-up">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <h5 class="text-maroon mb-0 fw-bold"><i class="bi bi-signpost-2-fill text-gold me-2"></i>Pilgrimage Route Sequence</h5>
        <span class="badge bg-gold text-dark fw-bold px-2 py-1">${(tour.places || []).length} Sacred Stops</span>
      </div>
      <div class="route-flow-steps d-flex flex-wrap align-items-center gap-2 pt-2">
        ${tour.routeFlow.map((stop, sIdx) => `
          <div class="px-3 py-1 bg-white rounded-pill border border-gold-2 shadow-xs d-flex align-items-center gap-2">
            <span class="badge rounded-circle" style="background: #45120E; color: #FFC908; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem;">${sIdx + 1}</span>
            <span class="fw-semibold text-dark small">${stop}</span>
          </div>
          ${sIdx < tour.routeFlow.length - 1 ? '<i class="bi bi-arrow-right text-gold fw-bold"></i>' : ''}
        `).join('')}
      </div>
    </div>`
    : '';

  const posterHighlightsHTML = tour.posterHighlights && tour.posterHighlights.length > 0
    ? `
    <div class="p-3 bg-cream rounded-4 border border-gold mb-4" data-aos="fade-up">
      <h5 class="text-maroon fw-bold mb-3"><i class="bi bi-stars text-gold me-2"></i>Key Tour Highlights</h5>
      <div class="row g-2">
        ${tour.posterHighlights.map(h => `
          <div class="col-sm-6">
            <div class="d-flex align-items-center gap-2 p-2 bg-white rounded-3 border border-gold-2">
              <i class="bi bi-check-circle-fill text-success fs-5"></i>
              <span class="fw-semibold text-dark small">${h}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`
    : '';

  container.innerHTML = `
  <div class="row g-4">
    <div class="col-lg-8">
      <!-- Tour Image / Promotional Poster -->
      <div class="img-overlay-zoom detail-hero-media mb-4" style="background: #FFF9EF; text-align: center;">
        ${tour.image
          ? `<img src="${tour.image}" alt="${tour.title}" class="detail-hero-img" style="max-height: 480px; width: 100%; object-fit: contain; background: #FFF9EF; padding: 6px;">`
          : `<div class="placeholder-img" style="height: 400px; border-radius: var(--border-radius-lg); background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
              <i class="bi bi-geo-alt-fill" style="font-size: 5rem; color: var(--clr-primary); opacity: 0.3;"></i>
            </div>`
        }
      </div>

      <!-- Tour Meta -->
      <div class="d-flex flex-wrap gap-2 mb-4" data-aos="fade-up">
        <span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;">
          <i class="bi bi-clock text-gold me-1"></i> ${tour.duration}
        </span>
        ${departureBadge}
        ${returnBadge}
        <span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;">
          <i class="bi bi-geo-alt text-gold me-1"></i> ${(tour.places || []).length} Places
        </span>
        <span class="badge bg-cream text-maroon px-3 py-2 rounded-pill" style="font-size: 0.85rem;">
          <i class="bi bi-tag text-gold me-1"></i> ${tour.category}
        </span>
      </div>

      <!-- Overview -->
      <div class="mb-4" data-aos="fade-up">
        <h3 class="mb-2">Overview</h3>
        ${teluguHeader}
        <div class="gold-divider gold-divider-left"></div>
        <p class="lead-text mt-3">${tour.overview}</p>
      </div>

      <!-- Route Flow Sequence if present -->
      ${routeFlowHTML}

      <!-- Poster Highlights if present -->
      ${posterHighlightsHTML}

      <!-- Places Covered -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="100">
        <h4 class="mb-3"><i class="bi bi-geo-alt text-gold me-2"></i>Places Covered</h4>
        <div class="row g-2">
          ${(tour.places || []).map(place => `
          <div class="col-md-6">
            <div class="d-flex align-items-start gap-2 p-2 bg-cream rounded">
              <i class="bi bi-check-circle-fill text-gold mt-1"></i>
              <span>${place}</span>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Itinerary -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="200">
        <h4 class="mb-3"><i class="bi bi-calendar-event text-gold me-2"></i>Detailed Itinerary</h4>
        <div class="ps-2">
          ${(tour.itinerary || []).map(day => `
          <div class="itinerary-day">
            <h6>${day.day}: ${day.title}</h6>
            <p>${day.description}</p>
          </div>`).join('')}
        </div>
      </div>

      <!-- Inclusions & Exclusions -->
      <div class="row g-4 mb-4" data-aos="fade-up" data-aos-delay="300">
        <div class="col-md-6">
          <div class="p-3 bg-cream rounded-3">
            <h5 class="text-success mb-3"><i class="bi bi-check-circle me-2"></i>Inclusions</h5>
            <ul class="inclusion-list list-unstyled mb-0">
              ${(tour.inclusions || []).map(item => `
              <li><i class="bi bi-check-circle-fill"></i> ${item}</li>`).join('')}
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="p-3 bg-cream rounded-3">
            <h5 class="text-maroon mb-3"><i class="bi bi-x-circle me-2"></i>Exclusions</h5>
            <ul class="exclusion-list list-unstyled mb-0">
              ${(tour.exclusions || []).map(item => `
              <li><i class="bi bi-x-circle-fill"></i> ${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Important Info -->
      <div class="mb-4" data-aos="fade-up" data-aos-delay="400">
        <h4 class="mb-3"><i class="bi bi-info-circle text-gold me-2"></i>Important Information</h4>
        <div class="alert" style="background: var(--clr-cream); border: 1px solid var(--clr-gold); border-radius: var(--border-radius-lg);">
          <ul class="mb-0 ps-3">
            ${(tour.importantInfo || []).map(info => `<li class="mb-1">${info}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <div class="detail-sidebar">
        <!-- Booking CTA -->
        <div class="info-card" data-aos="fade-up">
          <div class="info-card-icon">
            <i class="bi bi-send-fill"></i>
          </div>
          <h5>Book This Tour</h5>
          <p>Interested in the <strong>${tour.title}</strong>? Send us an enquiry for pricing and availability.</p>
          <div class="d-grid gap-2">
            <a href="enquiry.html?destination=${encodeURIComponent(tour.title)}" class="btn btn-primary-custom justify-content-center">
              <i class="bi bi-pencil-square"></i> Send Enquiry
            </a>
            <a href="https://wa.me/${NAV_CONFIG.whatsapp}?text=Hello!%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20package.%20Please%20share%20pricing%20and%20details." class="btn btn-whatsapp justify-content-center" target="_blank" rel="noopener">
              <i class="bi bi-whatsapp"></i> WhatsApp Enquiry
            </a>
            <a href="tel:+91${NAV_CONFIG.phone}" class="btn btn-outline-maroon justify-content-center">
              <i class="bi bi-telephone-fill"></i> Call Now
            </a>
          </div>
        </div>

        <!-- Other Packages -->
        <div class="info-card text-start" data-aos="fade-up" data-aos-delay="100">
          <h5 class="mb-3">Other Packages</h5>
          <ul class="list-unstyled text-start mb-3">
            ${PACKAGES_DATA.filter(p => p.id !== tour.id).slice(0, 5).map(p => `
            <li class="mb-2">
              <a href="tour-details.html?id=${p.id}" class="d-flex align-items-center gap-2" style="color: var(--clr-text); font-size: 0.9rem;">
                <i class="bi bi-geo-alt text-gold"></i>
                ${p.title}
              </a>
            </li>`).join('')}
          </ul>
          <a href="tour-packages.html" class="btn btn-outline-gold btn-sm w-100 justify-content-center">View All Packages</a>
        </div>
      </div>
    </div>
  </div>`;

  if (typeof AOS !== 'undefined') {
    setTimeout(() => AOS.refresh(), 80);
  }
}

/**
 * Render tour details page
 */
function renderTourDetails() {
  const container = document.getElementById('tourDetailContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const tourId = urlParams.get('id');

  const tour = PACKAGES_DATA.find(p => p.id === tourId);

  if (tour) {
    populateTourDetailsDOM(tour, container);
  } else {
    container.innerHTML = `
    <div class="text-center py-5">
      <div class="mb-4">
        <i class="bi bi-exclamation-circle" style="font-size: 4rem; color: var(--clr-gold);"></i>
      </div>
      <h2>Tour Package Not Found</h2>
      <p class="lead-text">The tour package you are looking for does not exist or the link may be incorrect.</p>
      <a href="tour-packages.html" class="btn btn-primary-custom mt-3">
        <i class="bi bi-arrow-left"></i> View All Packages
      </a>
    </div>`;
    document.title = 'Package Not Found – Arunachaleshwara Tours & Travels';
  }

  // Hydrate from Supabase if available
  if (typeof fetchPackagesFromSupabase === 'function') {
    fetchPackagesFromSupabase().then(dbPackages => {
      if (dbPackages && dbPackages.length > 0) {
        PACKAGES_DATA = dbPackages;
        window.PACKAGES_DATA = PACKAGES_DATA;
        const freshTour = PACKAGES_DATA.find(p => p.id === tourId);
        if (freshTour) {
          populateTourDetailsDOM(freshTour, container);
        }
      }
    }).catch(err => {
      console.warn('Supabase dynamic tour detail load error:', err);
    });
  }
}

/**
 * Render featured packages for homepage (Swiper)
 */
function renderFeaturedPackages(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buildCardsHTML = (items) => items.map(pkg => {
    const imageMarkup = pkg.image
      ? `<img src="${pkg.image}" alt="${pkg.title}" style="height: 220px; width: 100%; object-fit: cover;">`
      : `<div class="placeholder-img" style="height: 220px; background: linear-gradient(135deg, #F5EBDD 0%, #FFF9EF 50%, #F5EBDD 100%);">
           <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--clr-primary); opacity: 0.3;"></i>
         </div>`;

    const departureBadge = pkg.departureTime
      ? `<span class="badge bg-gold text-dark fw-bold ms-2"><i class="bi bi-alarm-fill me-1"></i>${pkg.departureTime.split(' from')[0]}</span>`
      : '';

    return `
    <div class="swiper-slide">
      <div class="tour-card h-100 d-flex flex-column">
        <div class="tour-card-img">
          ${imageMarkup}
          <span class="tour-card-badge">${pkg.badge || pkg.category}</span>
        </div>
        <div class="tour-card-body d-flex flex-column flex-grow-1">
          <h5>${pkg.title}</h5>
          ${pkg.teluguTitle ? `<div class="text-maroon small fw-semibold mb-1" style="font-size: 0.85rem; line-height: 1.35;">${pkg.teluguTitle}</div>` : ''}
          <p class="flex-grow-1">${pkg.shortDesc}</p>
          <div class="tour-card-meta mb-2">
            ${departureBadge}
            <span><i class="bi bi-clock"></i> ${pkg.duration}</span>
            <span><i class="bi bi-geo-alt"></i> ${(pkg.places || []).length} Places</span>
          </div>
          <div class="tour-card-footer mt-auto pt-2 border-top">
            <span class="tour-card-price"><small>Contact for pricing</small></span>
            <a href="tour-details.html?id=${pkg.id}" class="btn btn-primary-custom btn-sm">
              View Details <i class="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  // Initial immediate render
  const featured = PACKAGES_DATA.filter(p => p.featured);
  container.innerHTML = buildCardsHTML(featured);

  // Silently hydrate from Supabase
  if (typeof fetchPackagesFromSupabase === 'function') {
    fetchPackagesFromSupabase().then(dbPackages => {
      if (dbPackages && dbPackages.length > 0) {
        PACKAGES_DATA = dbPackages;
        window.PACKAGES_DATA = PACKAGES_DATA;
        const freshFeatured = PACKAGES_DATA.filter(p => p.featured);
        container.innerHTML = buildCardsHTML(freshFeatured);
        if (window.packagesSwiper && typeof window.packagesSwiper.update === 'function') {
          window.packagesSwiper.update();
        }
      }
    }).catch(err => {
      console.warn('Supabase dynamic featured packages fetch error:', err);
    });
  }
}

// Make functions globally accessible
window.PACKAGES_DATA = PACKAGES_DATA;
window.PACKAGE_CATEGORIES = PACKAGE_CATEGORIES;
window.renderPackagesPage = renderPackagesPage;
window.renderTourDetails = renderTourDetails;
window.renderFeaturedPackages = renderFeaturedPackages;

