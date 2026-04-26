# 🎯 Pengantar Konsep — REGEX — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- ❓ [Apa Itu REGEX?](#apa-itu)
- 🔍 [Kenapa REGEX Ada?](#kenapa-ada)
- 💥 [Masalah yang Diselesaikan](#masalah)
- 🌍 [Analogi Dunia Nyata](#analogi)
- 🗺️ [Gambaran Besar](#gambaran-besar)
- 🔗 [Navigation](#navigation)

---

<a name="apa-itu"></a>
## ❓ Apa Itu REGEX?

**REGEX (Regular Expression / Ekspresi Reguler)** adalah pola pencarian yang digunakan untuk mencocokkan, mencari, dan memanipulasi teks. Di JavaScript, REGEX adalah **objek bawaan (built-in)** yang sudah tersedia tanpa perlu install library apapun.

Kalau kamu pernah menggunakan Ctrl+F di browser atau teks editor, kamu sedang menggunakan pencarian biasa. REGEX adalah versi **supercharged** dari pencarian itu — kamu tidak hanya bisa mencari kata tertentu, tapi juga mencari pola seperti "semua kata yang diawali huruf kapital" atau "semua angka 4 digit".

Dalam JavaScript, REGEX ditulis dengan format dasar seperti ini:

```
/pola/flags
```

Contoh sederhana — mencari kata "hello" tanpa peduli huruf besar/kecil:

```javascript
const regex = /hello/i;
const text = "Hello World";

console.log(regex.test(text)); // Output: true
```

---

<a name="kenapa-ada"></a>
## 🔍 Kenapa REGEX Ada?

Sebelum REGEX populer, developer harus menangani teks secara manual — karakter per karakter — menggunakan `indexOf()`, `slice()`, dan loop. Ini melelahkan dan rawan error untuk kasus-kasus seperti:

- Validasi format email yang rumit
- Mencari semua nomor telepon dalam dokumen panjang
- Mengganti semua format tanggal sekaligus
- Mengekstrak URL dari paragraf teks

REGEX lahir sebagai solusi: **"Deskripsikan polanya, dan biarkan mesin yang mencari."**

Di JavaScript modern, REGEX sangat sering digunakan untuk:

| Kegunaan | Contoh |
|---|---|
| **Validasi Form** | Email, nomor telepon, password |
| **Manipulasi String** | Bersihkan, ganti, atau ekstrak teks |
| **Parsing Data** | Ambil info dari respons API atau log |
| **Routing (Express.js)** | Cocokkan URL dengan pattern |
| **Search & Highlight** | Fitur pencarian di aplikasi web |

---

<a name="masalah"></a>
## 💥 Masalah yang Diselesaikan

Bayangkan kamu punya string berisi ribuan email, dan ingin mengambil hanya yang valid. Tanpa REGEX:

```javascript
// ❌ Tanpa REGEX — susah, panjang, dan mudah salah
function isValidEmail(email) {
  // Harus cek satu per satu:
  // - Ada karakter @?
  // - Sebelum @ bukan kosong?
  // - Setelah @ ada titik?
  // - Format domain benar?
  // Ini akan jadi ratusan baris kode...
}
```

Dengan REGEX, masalah yang sama diselesaikan dalam satu baris:

```javascript
// ✅ Dengan REGEX — ringkas, powerful, dan mudah dibaca
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

console.log(isValidEmail("user@example.com")); // true
console.log(isValidEmail("bukan-email"));      // false
```

> 💡 **Intinya:** REGEX adalah "bahasa pencarian" yang memungkinkan kamu mendeskripsikan pola teks yang kompleks secara ringkas dan efisien.

---

<a name="analogi"></a>
## 🌍 Analogi Dunia Nyata

Bayangkan kamu punya tumpukan ribuan amplop surat di meja, dan tugasmu adalah menemukan semua amplop yang dikirim dari kota "Jakarta".

**Tanpa REGEX (manual):**
Kamu buka satu per satu, baca alamatnya, cari tulisan "Jakarta". Lama dan melelahkan.

**Dengan REGEX (filter cerdas):**
Kamu punya stempel khusus — siapapun yang menyentuh stempel itu ke amplop, amplop yang cocok langsung tersortir otomatis. Stempel itu adalah REGEX-mu!

```
┌──────────────────────────────────────────┐
│  📮 Ribuan Amplop (String Teks)          │
│                                          │
│  Amplop 1: "Dari Jakarta, 12345"  ←──┐  │
│  Amplop 2: "Dari Bandung, 40123"     │  │
│  Amplop 3: "Dari Jakarta, 10110"  ←──┤  │
│  Amplop 4: "Dari Surabaya, 60000"    │  │
│  Amplop 5: "Dari Jakarta, 13210"  ←──┘  │
│                                          │
│  🔍 REGEX: /Jakarta/g                   │
│  ↓                                       │
│  Hasil: [Amplop 1, Amplop 3, Amplop 5]  │
└──────────────────────────────────────────┘
```

| Analogi Amplop | JavaScript |
|---|---|
| Tumpukan amplop | String teks |
| Stempel/filter | REGEX pattern |
| Amplop yang cocok | Match result |
| Kriteria "dari Jakarta" | Pattern `/Jakarta/` |
| Semua amplop yang cocok | Flag `g` (global) |

---

<a name="gambaran-besar"></a>
## 🗺️ Gambaran Besar

**Posisi REGEX dalam Ekosistem JavaScript:**

```
JavaScript
  │
  ├── 📝 String Methods
  │     ├── indexOf(), includes(), startsWith()
  │     ├── slice(), substring()
  │     └── 🔍 match(), replace(), search(), split() ← REGEX berperan di sini
  │
  ├── 🔍 RegExp Object
  │     ├── Literal: /pattern/flags       ← KITA DI SINI
  │     ├── Constructor: new RegExp(...)
  │     └── Methods: .test(), .exec()
  │
  └── 🌐 Penggunaan Nyata
        ├── Form Validation
        ├── Data Parsing
        ├── String Manipulation
        └── URL Routing
```

**Hubungan dengan konsep lain:**

Untuk memahami REGEX dengan baik, kamu juga perlu tahu:
- **String** — REGEX selalu bekerja pada string; pahami string methods dulu
- **Boolean** — `.test()` mengembalikan `true`/`false`
- **Array** — `.match()` dengan flag `g` mengembalikan array

REGEX juga menjadi fondasi untuk:
- **Form Validation** — validasi input dari pengguna
- **Data Cleaning** — membersihkan data dari sumber eksternal
- **Text Processing** — parsing log, CSV, atau format teks lainnya

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [Lanjut ke Part 02 — Cara Membuat REGEX →](./02-cara-membuat_regex.md)**
