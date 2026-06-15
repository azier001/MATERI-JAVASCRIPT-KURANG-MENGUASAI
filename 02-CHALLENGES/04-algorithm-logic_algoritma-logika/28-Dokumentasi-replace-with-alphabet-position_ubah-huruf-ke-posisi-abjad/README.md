# 🔤 Replace With Alphabet Position — Konversi Huruf ke Posisi Abjad

### ✨ _Mengubah setiap huruf dalam teks menjadi angka posisi alfabetnya, mengabaikan karakter non-huruf_

> 🎯 **Tujuan:** Memahami cara mengonversi string teks biasa menjadi string angka yang merepresentasikan posisi alfabet setiap huruf — lengkap dengan penemuan rumus ASCII, pendekatan imperatif vs deklaratif, dan optimasi naming convention.

---

<a name="daftar-isi"></a>

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 📖 | [Deskripsi Soal](#deskripsi-soal) | Apa yang diminta challenge ini |
| 🔍 | [Visualisasi & Analisis Pola](#visualisasi-analisis) | Penemuan rumus ASCII & rencana logika (Pilar 1) |
| 🗺️ | [Peta Pembelajaran](#peta-pembelajaran) | Navigasi ke dokumentasi tiap fase |
| 📝 | [Catatan Akhir](#catatan-akhir) | Konteks pembuatan dokumentasi |

---

<a name="deskripsi-soal"></a>

## 📖 Deskripsi Soal

Diberikan sebuah function `alphabetPosition(text)` yang menerima **satu parameter** berupa string teks biasa.

**Aturan:**

```
Input  → String teks biasa (bisa mengandung huruf, angka, spasi, tanda baca)
Output → String berisi angka-angka posisi alfabet, dipisahkan spasi
Ignore → Semua karakter yang BUKAN huruf abjad (spasi, angka, simbol) diabaikan total
```

**Contoh:**

```javascript
alphabetPosition("The sunset sets at twelve o' clock.");
// → "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"

alphabetPosition("The narwhal bacons at midnight.");
// → "20 8 5 14 1 18 23 8 1 12 2 1 3 15 14 19 1 20 13 9 4 14 9 7 8 20"
```

> [!IMPORTANT]
> 🔔 **Perhatikan tiga hal krusial:**
> 1. Huruf besar dan kecil memiliki **nilai yang sama** (`'T'` dan `'t'` sama-sama `20`)
> 2. Karakter non-abjad (spasi, titik, apostrof, angka) harus **diabaikan sepenuhnya**
> 3. Output adalah **satu string tunggal** dengan angka-angka dipisahkan oleh **satu spasi**

---

<a name="visualisasi-analisis"></a>

## 🔍 Visualisasi & Analisis Pola

> **Pilar 1 dari 7 Pilar Kualitas** — Memahami masalah secara visual SEBELUM menulis kode.

### 1️⃣ Penemuan Rumus Inti (ASCII Code)

Setiap karakter dalam JavaScript memiliki kode angka di belakang layar yang disebut **ASCII Code**:

| Huruf | ASCII Code | Posisi Alfabet | Rumus |
|:-----:|:----------:|:--------------:|:-----:|
| `'a'` | `97` | `1` | `97 - 96 = 1` |
| `'b'` | `98` | `2` | `98 - 96 = 2` |
| `'c'` | `99` | `3` | `99 - 96 = 3` |
| `'z'` | `122` | `26` | `122 - 96 = 26` |

> **Rumus Inti:** `Kode ASCII - 96 = Posisi Abjad`

> [!NOTE]
> 💡 **Prasyarat Penting:** Rumus di atas hanya berlaku untuk huruf kecil (`a-z`, ASCII 97-122). Huruf kapital (`A-Z`) memiliki ASCII Code berbeda (65-90). Solusi: seragamkan semua teks ke huruf kecil dulu dengan `.toLowerCase()`.

### 2️⃣ Rencana Logika (Step-by-Step)

```
Langkah 1  →  Ubah seluruh teks menjadi huruf kecil (.toLowerCase())
Langkah 2  →  Siapkan penampung kosong untuk menyimpan angka hasil
Langkah 3  →  Iterasi setiap karakter dalam string
Langkah 4  →  Validasi: pastikan karakter adalah huruf abjad ('a' - 'z')
Langkah 5  →  Jika valid: terapkan rumus (charCodeAt(0) - 96), simpan hasil
Langkah 6  →  Gabungkan isi penampung menjadi string dipisahkan spasi
```

### 3️⃣ Validasi Karakter — Siapa yang Lolos?

| Karakter | `>= 'a'` ? | `<= 'z'` ? | Lolos? | Aksi |
|:--------:|:----------:|:----------:|:------:|:----:|
| `'t'` | ✅ Ya | ✅ Ya | ✅ | Konversi ke angka |
| `' '` (spasi) | ❌ Tidak | ✅ Ya | ❌ | Diabaikan |
| `'.'` (titik) | ❌ Tidak | ✅ Ya | ❌ | Diabaikan |
| `'5'` (angka) | ❌ Tidak | ✅ Ya | ❌ | Diabaikan |

> [!TIP]
> 💡 **Insight:** Perbandingan `char >= 'a' && char <= 'z'` bekerja karena JavaScript membandingkan karakter berdasarkan nilai ASCII-nya. Spasi (ASCII 32), titik (46), dan angka (48-57) semuanya bernilai kurang dari `'a'` (97), jadi otomatis gagal di kondisi pertama.

---

<a name="peta-pembelajaran"></a>

## 🗺️ Peta Pembelajaran

Dokumentasi ini dipecah menjadi **3 file detail** di folder `docs/` dan **1 file ringkasan** di root:

| No | File | Isi | Pilar yang Dicakup |
|----|------|-----|:------------------:|
| 📘 | [`01-solusi-bertahap.md`](docs/01-solusi-bertahap.md) | Pendekatan step-by-step, kode V1 imperatif (`for...of`) | Pilar 2, 3, 4 |
| 📗 | [`02-evolusi-dan-clean-code.md`](docs/02-evolusi-dan-clean-code.md) | Refactoring ke Regex + `.map()`, naming convention, perbandingan paradigma | Pilar 5, 6 |
| 📙 | [`03-insight-trial-error.md`](docs/03-insight-trial-error.md) | Eksperimen mandiri, gotchas String vs Array, redundansi filter | Pilar 7, Refleksi |
| 📋 | [`semua-versi.md`](semua-versi.md) | Kompilasi lengkap semua versi kode + perbandingan head-to-head | Semua |

```
📂 dokumentasi-Replace-With-Alphabet-Position/
├── 📄 README.md                               ← 📍 Kamu di sini
├── 📋 semua-versi.md
└── 📂 docs/
    ├── 📘 01-solusi-bertahap.md
    ├── 📗 02-evolusi-dan-clean-code.md
    └── 📙 03-insight-trial-error.md
```

---

<a name="catatan-akhir"></a>

> 📝 **Catatan Akhir:**
> Dokumentasi ini dibuat pada **15 Juni 2026** berdasarkan catatan mentoring langsung di **Google Antigravity** menggunakan JavaScript. Dokumentasi mengikuti standar **7 Pilar Kualitas** dari workflow `/challenge-dokumentasi` dengan format visual `/setup-doc`.

---

[➡️ Mulai ke 01 — Solusi Bertahap](docs/01-solusi-bertahap.md)
