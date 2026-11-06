# Arunachaleshwara Tours & Travels – Official Website

A professional, premium, fully responsive, semi-dynamic multi-page website for **ARUNACHALESHWARA TOURS & TRAVELS**, a premier pilgrimage tourism and travel service provider based in Tiruvannamalai, Tamil Nadu.

---

## Brand Identity & Design System

- **Brand Name**: ARUNACHALESHWARA TOURS & TRAVELS
- **Tagline**: All Travel & Pilgrimage Services Under One Roof!
- **Location**: Avulpet Bypass, Tiruvannamalai, Tamil Nadu, India
- **Hotline / WhatsApp**: +91 90105 15341
- **Email**: arunachalatoursandtravels@gmail.com

### Color Palette
- **Primary Maroon**: `#681D17`
- **Dark Maroon**: `#45120E`
- **Temple Gold**: `#C99535`
- **Premium Gold**: `#E8B957`
- **Warm Cream**: `#FFF9EF`
- **Light Beige**: `#F5EBDD`
- **Text**: `#35251F`
- **White**: `#FFFFFF`
- **Success Green**: `#168B55`

### Typography
- **Headings**: *Playfair Display*
- **Premium Subheadings**: *Cormorant Garamond*
- **Body Text**: *Poppins*
- **Spiritual & Editorial Content**: *Lora*

---

## Technology Stack

- **HTML5**: Semantic web architecture with Schema.org LocalBusiness structured data.
- **CSS3**: Custom design tokens, South Indian temple heritage styling, animations, and responsive media queries.
- **JavaScript (ES6+)**: Semi-dynamic client-side rendering for packages, services, gallery, filter/search logic, and validation.
- **Bootstrap 5.3**: Grid system, navbar responsiveness, utilities, and components.
- **Bootstrap Icons**: UI icons.
- **Google Fonts**: Web typography.
- **AOS (Animate On Scroll)**: Smooth viewport animations.
- **Swiper.js**: Responsive touch carousels for popular tour packages and gallery preview.
- **GLightbox**: Lightbox image modal previews.
- **Cloudinary MP4 Video Hero**: Hosted video showcase with responsive cover and mobile video optimization.

---

## Website Structure

```
arunachaleshwara/
├── index.html                   # Homepage with Video Hero, Trust Indicators, Services, Tours, Gallery, Testimonials
├── about.html                   # About Us, Our Story, Mission, Vision, Values, Why Choose Us
├── services.html                # Complete listing of 8 pilgrimage services
├── service-details.html         # Dynamic service detail page (?id=service-id)
├── tour-packages.html           # Searchable & filterable tour packages with Grid/List views
├── tour-details.html            # Dynamic tour details template with day-wise itinerary (?id=package-id)
├── gallery.html                 # Categorized photo & video gallery with Lightbox
├── contact.html                 # Contact details, Google Maps, validated enquiry form
├── enquiry.html                 # Multi-field booking form with WhatsApp generator
├── privacy-policy.html          # Privacy policy
├── terms-and-conditions.html    # Terms & conditions
├── 404.html                     # Custom 404 error page
├── sitemap.xml                  # SEO XML sitemap
├── robots.txt                   # Web crawler instructions
├── assets/
│   ├── css/
│   │   ├── style.css            # Core design system & component styles
│   │   ├── responsive.css       # Mobile, tablet, laptop & desktop breakpoints
│   │   └── animations.css       # Keyframes, transitions, and hover states
│   ├── js/
│   │   ├── main.js              # Global app initialization & preloader
│   │   ├── navigation.js        # Reusable sticky header, footer, and back-to-top
│   │   ├── services.js          # Services data store & dynamic rendering
│   │   ├── packages.js          # Tour packages data, client-side search & filtering
│   │   ├── gallery.js           # Gallery categories & masonry layout rendering
│   │   ├── forms.js             # Form validation & direct WhatsApp generator
│   │   └── animations.js        # AOS, Swiper, GLightbox & scroll helpers
│   ├── images/
│   │   ├── logo/                # Logo and favicon copies
│   │   ├── hero/
│   │   ├── temples/
│   │   ├── services/
│   │   ├── packages/
│   │   ├── gallery/
│   │   ├── vehicles/
│   │   └── accommodation/
│   ├── fevicon.png              # Business favicon
│   └── logo.png                 # Business logo
└── README.md
```

---

## 8 Core Pilgrimage Services

1. **Accommodation**: Room & hotel bookings close to Arunachaleswarar Temple.
2. **Temple Darshan Services**: Arunachaleswarar temple assistance, special darshan guidance, and Girivalam coordination.
3. **Bus Ticket Booking**: Reservations for all sleeper and seater routes.
4. **Train Ticket Booking**: Train reservation guidance and route planning.
5. **Taxi & Car Rentals**: Clean AC vehicles (Ertiga, Innova, sedans) for local and outstation trips.
6. **Auto Services**: Local auto rickshaw transport for temple visits and station drops.
7. **Bike Rentals**: Two-wheeler rentals for self-guided exploration.
8. **Temple Tour Packages**: Multi-temple yatras across Tamil Nadu.

---

## Tour Packages Included

1. **Tiruvannamalai Local Temples** (1 Day)
2. **Kanchipuram Temple Tour** (1–2 Days)
3. **Vellore Temple Tour** (1 Day)
4. **Pancha Bhootha Linga Yatra** (5–7 Days covering Earth, Water, Fire, Air, and Space temples)
5. **Tamil Nadu Temple Tours** (3–5 Days)
6. **Weekend Pilgrimage Special** (2 Days)
7. **Customized Pilgrimage** (Flexible)

---

## Responsive Breakpoints Tested

- **Desktop (1440px+)**: Spacious layout with typography scaling.
- **Laptop (1024px – 1439px)**: Balanced 3-column grids.
- **Tablet (768px – 1023px)**: 2-column service and package cards, collapsible navbar.
- **Mobile (320px – 767px)**: Full-width touch-friendly CTAs, stacked navigation, horizontally scrollable trust indicators, and video hero optimization.

---

## Running the Website Locally

You can preview the website using any standard web server:

```bash
# Using Python 3 built-in HTTP server:
python3 -m http.server 8000

# Open in browser:
http://localhost:8000
```

