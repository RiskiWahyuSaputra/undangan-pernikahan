# Undangan Pernikahan Digital 💍

Aplikasi undangan pernikahan digital yang interaktif dan responsif, dibangun dengan Next.js, React, dan Tailwind CSS.

## Fitur Utama

- **Countdown Timer**: Penghitung mundur menuju hari pernikahan
- **Animated Navbar**: Navigasi yang halus dan modern
- **RSVP Form**: Form untuk menyetujui kehadiran dengan integrasi email
- **Wishes Section**: Koleksi ucapan dan doa dari tamu undangan
- **Story Timeline**: Cerita kisah cinta dalam bentuk timeline
- **Smooth Scrolling**: Pengalaman scrolling yang mulus dan responsif
- **Preloader**: Animasi loading yang menarik
- **Save the Date**: Halaman khusus untuk save the date
- **Sequence Animation**: Animasi sequence untuk visual yang memukau

## Tech Stack

- **Framework**: Next.js 14+
- **UI**: React 18+
- **Styling**: Tailwind CSS + PostCSS
- **Language**: TypeScript
- **Build Tool**: Node.js

## Struktur Project

```
undangan-pernikahan/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/              # React components
│   ├── Countdown.tsx        # Countdown timer
│   ├── Footer.tsx           # Footer component
│   ├── Navbar.tsx           # Navigation bar
│   ├── Preloader.tsx        # Loading animation
│   ├── RSVP.tsx             # RSVP form
│   ├── SaveTheDate.tsx      # Save the date section
│   ├── SequenceScroll.tsx   # Sequence animation
│   ├── SmoothScroll.tsx     # Smooth scroll effect
│   ├── Story.tsx            # Love story timeline
│   └── Wishes.tsx           # Wishes section
├── public/
│   └── sequence/            # Sequence animation assets
├── docs/
│   ├── plans/               # Project planning documents
│   └── specs/               # Design specifications
├── package.json             # Dependencies
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── postcss.config.js        # PostCSS configuration
```

## Instalasi

1. Clone repository:

```bash
git clone https://github.com/RiskiWahyuSaputra/undangan-pernikahan.git
cd undangan-pernikahan
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan development server:

```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:3000`

## Pengembangan

### Build untuk production:

```bash
npm run build
npm start
```

### Lint code:

```bash
npm run lint
```

## Dokumentasi

Dokumentasi lebih lengkap tersedia di folder `docs/`:

- **Plans**: Roadmap dan perencanaan pengembangan
- **Specs**: Spesifikasi desain dan fitur

## Author

Riski Wahyu Saputra

## License

MIT License

---

**Catatan**: Ini adalah project undangan pernikahan digital yang dapat disesuaikan sesuai dengan kebutuhan Anda. Silakan ubah konten, warna, dan konfigurasi sesuai dengan tema pernikahan Anda.
