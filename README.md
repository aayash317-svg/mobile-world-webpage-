# Mobile World Sales & Service — Premium Business Landing Page

A client-ready business introduction landing page designed and built for **Mobile World Sales & Service** (Gandhipuram, Coimbatore, Tamil Nadu).

---

## 1. Safety & Architecture Summary

* **Preservation of Existing Ecommerce App**:
  * The existing Flask backend, MySQL database, customer storefront (`/`), checkout (`/checkout`), and owner admin portal (`/admin/login`) in `D:\mobile world` remain **100% untouched and protected**.
  * This landing page is built as an **independent frontend** inside `D:\mobile world landing page`, eliminating any risk of breaking routes, auth sessions, or order workflows.
* **Connected Stores**:
  * Customer Storefront: [`https://mobile-world-5p9j.onrender.com/signin`](https://mobile-world-5p9j.onrender.com/signin)
  * Owner Portal: [`https://mobile-world-5p9j.onrender.com/admin/login`](https://mobile-world-5p9j.onrender.com/admin/login)

---

## 2. Creative Direction & Design System

* **Design Style**: Premium Editorial Design (Modern, Minimal, Trustworthy, Technology-focused).
* **Color Tokens**:
  * **Forest Green (`#123F35`)**: Main brand and primary CTA color.
  * **Warm Cream (`#F5F1E8`)**: Primary page background.
  * **Pure White (`#FFFFFF`)**: Clean product cards and content surfaces.
  * **Sage Green (`#9DC9AE`)**: Subtle accents, icons, and decorative shapes.
  * **Primary Text (`#202822`)**: High-contrast, readable charcoal.
  * **Secondary Text (`#626B65`)**: Muted olive-gray.
  * **Subtle Borders (`#E2E5DF`)**: Clean architectural dividers.
  * **Dark Section (`#102A25`)**: Visually distinct forest-night green for Services and Footer.

---

## 3. Verified Store Assets & Details

* **Authentic Physical Store Photography**:
  * `assets/images/shop/storefront_night.jpg`: Real illuminated night showroom with neon board and fairy lights.
  * `assets/images/shop/showroom_customers.jpg`: Real customer counter with brand showcases.
  * `assets/images/shop/service_desk.jpg`: Fast premium service reception with PhonePe integration.
  * `assets/images/shop/outdoor_kiosk.jpg`: Outdoor quick-service display kiosk.
  * `assets/images/shop/emblem_logo.png`: Official circular emblem with *"Stay Connected"*.
* **Verified Contact Details (From Physical Signboard)**:
  * **Phone**: `+91 94453 03696`
  * **Showroom**: Gandhipuram, Coimbatore, Tamil Nadu
  * **Hours**: 9:30 AM – 9:30 PM (All 7 Days)
  * **Confirmed Brands**: Realme, OPPO, Vivo, Mi (Xiaomi), OnePlus, boAt, Mivi, Lava
  * **Services**: 1-Hour Spot Diagnostics, Broken Display Replacement, Smartphone Sales, Certified Accessories

---

## 4. Animation System (180ms – 350ms)

* **Hero Headline**: Smooth staggered reveal using CSS keyframes and cubic-bezier easing.
* **Main Shop Image**: Gentle zoom-in on load and subtle scale on hover.
* **Category Cards**: Small vertical lift on hover (`-6px`), image zoom (`1.035x`), and directional arrow glide.
* **Section Transitions**: Smooth scroll fade-up triggered via `IntersectionObserver`.
* **Navigation**: Animated underline that expands on hover and active section scroll.
* **Buttons**: Smooth color and scale transitions (`scale(1.02)`).
* **Accessibility**: Full respect for `prefers-reduced-motion: reduce`.

---

## 5. How to Run Locally

```bash
# In directory: d:\mobile world landing page
python -m http.server 8000
```
Open in browser:
**`http://localhost:8000/`**

---

## 6. Interactive Owner Customizer

A floating **"Customize Store Info"** button in the bottom right allows the shop owner or reviewer to test updating the physical shop address, phone number, and operating hours live in the browser with persistence via `localStorage`.
