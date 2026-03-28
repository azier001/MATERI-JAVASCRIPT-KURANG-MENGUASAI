# 📚 reverseString - PART 2: ANALISIS REKURSI & POLA BERPIKIR

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║          🔍 PART 2: ANALISIS REKURSI & POLA BERPIKIR 🔍                 ║
║                                                                          ║
║         Bagaimana Cara Berpikir Rekursi dan Mengapa Ia Bekerja           ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 🔁 Apa itu Rekursi | 📉 Fase Turun | 📈 Fase Naik | 🧠 Pola Berpikir |
|:-----------------:|:------------:|:------------:|:----------------:|
| [Jump](#-apa-itu-rekursi) | [Jump](#-fase-turun) | [Jump](#-fase-naik) | [Jump](#-pola-berpikir-rekursi) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami konsep rekursi secara visual dan intuitif
- ✅ Memahami perbedaan base case dan recursive case
- ✅ Memahami fase turun dan fase naik dalam rekursi
- ✅ Siap untuk melihat kode original dan evaluasinya di Part 3

---

## 🔁 Apa itu Rekursi?

Rekursi adalah teknik dimana **sebuah fungsi memanggil dirinya sendiri** dengan input yang lebih kecil, sampai mencapai kondisi berhenti.

```
Fungsi biasa:          Fungsi rekursi:
─────────────          ───────────────
masuk → proses         masuk → proses sebagian
      → keluar                → panggil diri sendiri (lebih kecil)
                                     → panggil diri sendiri (lebih kecil)
                                           → ... sampai BASE CASE
                                                 → kumpulkan hasil
```

---

### Dua Komponen Wajib Rekursi

Setiap fungsi rekursi selalu punya dua bagian:

```javascript
const reverseString = (str) => {
  if (!str) return ''               // 1️⃣ BASE CASE
                                    //    Kapan rekursi berhenti?
                                    //    → Ketika str sudah kosong

  return str.slice(-1) + reverseString(str.slice(0, -1))
  //                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //                     2️⃣ RECURSIVE CASE
  //                        Panggil diri sendiri dengan input lebih kecil
}
```

---

## 📉 Fase Turun

Fase turun adalah saat fungsi **terus memanggil dirinya sendiri** — setiap panggilan menerima string yang satu karakter lebih pendek.

```
reverseString("hello")   → belum selesai, nunggu reverseString("hell")
  reverseString("hell")  → belum selesai, nunggu reverseString("hel")
    reverseString("hel") → belum selesai, nunggu reverseString("he")
      reverseString("he")→ belum selesai, nunggu reverseString("h")
        reverseString("h")→ belum selesai, nunggu reverseString("")
          reverseString("")→ BASE CASE! langsung return ''
```

> 💡 Bayangkan seperti tumpukan piring — setiap panggilan "parkir" dulu
> sambil menunggu hasil dari panggilan berikutnya di bawahnya.

---

### Kenapa `str` Berbeda di Setiap Panggilan?

Bukan `str` yang berubah — melainkan setiap panggilan menerima **string baru** lewat argumen:

```javascript
reverseString("hello")
//            ↓
//            str.slice(0, -1) → menghasilkan string BARU "hell"
//            dikirim ke panggilan berikutnya
reverseString("hell")
//            ↓
//            str.slice(0, -1) → menghasilkan string BARU "hel"
//            dikirim ke panggilan berikutnya
reverseString("hel")
// ... dan seterusnya
```

Setiap panggilan punya variabel `str`-nya **sendiri di memory** — tidak saling mengubah.

---

## 📈 Fase Naik

Fase naik adalah saat base case tercapai dan hasil mulai **dikembalikan dari bawah ke atas**, mengumpulkan karakter satu per satu.

```
reverseString("") selesai → kembalikan '' ke atas

reverseString("h") terima ''
  → 'h' + '' = 'h' → kembalikan 'h' ke atas

reverseString("he") terima 'h'
  → 'e' + 'h' = 'eh' → kembalikan 'eh' ke atas

reverseString("hel") terima 'eh'
  → 'l' + 'eh' = 'leh' → kembalikan 'leh' ke atas

reverseString("hell") terima 'leh'
  → 'l' + 'leh' = 'lleh' → kembalikan 'lleh' ke atas

reverseString("hello") terima 'lleh'
  → 'o' + 'lleh' = 'olleh' ✅ SELESAI!
```

---

### Visualisasi Lengkap Fase Turun & Naik

```
FASE TURUN                              FASE NAIK
────────────────────────────────────────────────────
reverseString("hello")                  = 'olleh' ✅
  'o' + reverseString("hell")           = 'o' + 'lleh'
         'l' + reverseString("hel")     = 'l' + 'leh'
                'l' + reverseString("he")    = 'l' + 'eh'
                       'e' + reverseString("h")   = 'e' + 'h'
                              'h' + reverseString("") = 'h' + ''
                                     return ''  ← TITIK BALIK
```

---

## 🧠 Pola Berpikir Rekursi

Saat menghadapi soal rekursi, tanyakan 3 hal ini:

```
1. APA BASE CASE-nya?
   → Kondisi paling sederhana yang bisa langsung dijawab
   → Untuk reverseString: str kosong "" → return ''

2. BAGAIMANA MEMECAH MASALAH?
   → Masalah besar dipecah menjadi sub-masalah yang lebih kecil
   → Untuk reverseString: ambil 1 karakter + sisa string

3. BAGAIMANA MENGGABUNGKAN HASIL?
   → Hasil rekursi dikombinasikan dengan bagian yang sudah diambil
   → Untuk reverseString: karakter terakhir + hasil rekursi berikutnya
```

---

### Contoh Pola untuk `reverseString("hello")`

```
1. BASE CASE     → str === "" → return ''

2. PECAH MASALAH → "hello" = 'o' + "hell"
                   "hell"  = 'l' + "hel"
                   "hel"   = 'l' + "he"
                   "he"    = 'e' + "h"
                   "h"     = 'h' + ""

3. GABUNGKAN     → '' → 'h' → 'eh' → 'leh' → 'lleh' → 'olleh' ✅
```

---

## 📊 Ringkasan Konsep

| Konsep | Penjelasan | Contoh di reverseString |
|--------|-----------|------------------------|
| **Base Case** | Kondisi berhenti rekursi | `if (!str) return ''` |
| **Recursive Case** | Panggil diri sendiri dengan input lebih kecil | `reverseString(str.slice(0, -1))` |
| **Fase Turun** | Fungsi terus memanggil dirinya, belum ada hasil | `"hello"` → `"hell"` → `"hel"` → ... |
| **Fase Naik** | Hasil dikembalikan dari bawah ke atas | `''` → `'h'` → `'eh'` → ... → `'olleh'` |
| **Input Lebih Kecil** | Setiap panggilan mendapat string lebih pendek | `str.slice(0, -1)` membuang 1 karakter |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 1: Deskripsi Soal](01-deskripsi-soal.md)**
- **📖 [Lanjut ke Part 3: Kode Original →](03-kode-original.md)**

---

<div align="center">

Made with ❤️ for learners

</div>
