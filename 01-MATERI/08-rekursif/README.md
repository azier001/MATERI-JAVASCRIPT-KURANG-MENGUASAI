# 🔄 Recursion — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Category](https://img.shields.io/badge/Category-Function-blue?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Intermediate-orange?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

> 📝 *Dokumentasi pribadi ini dibuat untuk membantu saya memahami dan mengingat
> kembali konsep Recursion dalam JavaScript — mulai dari apa itu, cara kerjanya,
> hingga kapan dan bagaimana menggunakannya dengan tepat.*

---

## 🧩 Apa Itu Recursion?

**Recursion (Rekursif)** adalah teknik di mana sebuah function memanggil dirinya sendiri secara berulang hingga mencapai kondisi tertentu (base case) untuk berhenti.

> 💡 **Analogi:** Bayangkan kamu sedang mencari sebuah buku di tumpukan kardus yang bertingkat-tingkat — setiap kardus besar bisa berisi kardus-kardus kecil lagi di dalamnya. Kamu akan terus membuka kardus demi kardus ke dalam, sampai akhirnya menemukan bukunya. Itulah rekursif: masuk ke dalam, masuk lagi, masuk lagi — sampai tujuan tercapai.

Konsep ini hadir untuk menyelesaikan masalah:

- ❌ **Tanpa Rekursif:** Untuk masalah dengan kedalaman yang tidak diketahui (misal: folder bertingkat), kita harus menulis `for loop` di dalam `for loop` berkali-kali — yang jumlahnya tidak bisa ditentukan di awal.
- ✅ **Dengan Rekursif:** Satu fungsi yang cukup "pintar" untuk menangani dirinya sendiri, tidak peduli seberapa dalam strukturnya.

---

## ▶️ Contoh Paling Sederhana

```js
// ❌ Tanpa Rekursif (Iterasi):
function countdown(n) {
  for (let i = n; i >= 1; i--) {
    console.log(i);
  }
  console.log("Selesai!");
}

// ✅ Dengan Rekursif:
function countdown(n) {
  if (n <= 0) {           // 🛑 Base Case — titik henti
    console.log("Selesai!");
    return;
  }
  console.log(n);
  countdown(n - 1);       // 🔁 Recursive Case — panggil diri sendiri
}

countdown(3);
// Output:
// 3
// 2
// 1
// Selesai!
```

---

## 🗺️ Peta Konsep

| # | Sub-Topik | File | Deskripsi Singkat |
|---|-----------|------|-------------------|
| 01 | Pengantar & Kenapa Ada | [01-pengantar-konsep](./docs/01-pengantar-konsep_rekursif.md) | Apa itu rekursif, kenapa ada, masalah yang diselesaikan |
| 02 | Cara Kerja Internal | [02-cara-kerja](./docs/02-cara-kerja_rekursif.md) | Call Stack, Stack Overflow, proses Unwinding |
| 03 | Sintaks & Penggunaan | [03-sintaks-penggunaan](./docs/03-sintaks-penggunaan_rekursif.md) | Base Case, Recursive Case, dan variasi kode |
| 04 | Contoh Nyata | [04-contoh-nyata](./docs/04-contoh-nyata_rekursif.md) | generateArray, countdown, dan folder tree |
| 05 | Perbandingan | [05-perbandingan-konsep](./docs/05-perbandingan-konsep_rekursif.md) | Rekursif vs Iterasi (Looping) |
| 06 | Latihan Pemahaman | [06-latihan-pemahaman](./docs/06-latihan-pemahaman_rekursif.md) | Kuis & verifikasi pemahaman |
| 07 | Insight Mendalam | [07-insight](./docs/07-insight_rekursif.md) | Rekursif dalam Functional Programming & Immutability |

---

## 💡 Konsep Kunci

- **Base Case** — Kondisi berhenti (rem) yang wajib ada agar rekursif tidak berjalan selamanya.
- **Recursive Case** — Bagian di mana fungsi memanggil dirinya sendiri dengan argumen yang semakin mendekati base case.
- **Call Stack** — Tumpukan "piring" di memori yang bertambah setiap kali fungsi dipanggil, dan berkurang saat fungsi selesai.
- **Stack Overflow** — Error `RangeError: Maximum call stack size exceeded` yang terjadi ketika Call Stack penuh akibat rekursif tanpa base case.
- **Unwinding** — Proses fungsi "naik kembali" ke atas sambil membawa nilai hasil, setelah base case tercapai.
- **Immutability** — Alasan mengapa rekursif lebih disukai dalam Functional Programming: tidak ada variabel yang diubah, hanya nilai baru yang diteruskan.

---

## 🎯 Kapan Digunakan

| ✅ Gunakan Ketika | ❌ Hindari Ketika |
|-------------------|------------------|
| Struktur data bertingkat dengan kedalaman tidak pasti (folder, tree, menu) | Iterasi sederhana yang bisa diselesaikan dengan `for`/`while` loop |
| Membangun solusi dari sub-masalah yang lebih kecil dan serupa | Performa kritis dan memori sangat terbatas (rekursif lebih boros memori) |
| Menulis kode bergaya Functional Programming (FP) yang mengutamakan immutability | Input `n` sangat besar yang berisiko menyebabkan Stack Overflow |

---

## 📂 Struktur Dokumentasi

| File | Topik |
|------|-------|
| 📋 [ringkasan-konsep](./ringkasan-konsep.md) | Cheat sheet konsep rekursif |
| 📄 [01-pengantar-konsep](./docs/01-pengantar-konsep_rekursif.md) | Apa & kenapa ada |
| 📄 [02-cara-kerja](./docs/02-cara-kerja_rekursif.md) | Call Stack & Unwinding |
| 📄 [03-sintaks-penggunaan](./docs/03-sintaks-penggunaan_rekursif.md) | Sintaks & variasi |
| 📄 [04-contoh-nyata](./docs/04-contoh-nyata_rekursif.md) | Studi kasus nyata |
| 📄 [05-perbandingan-konsep](./docs/05-perbandingan-konsep_rekursif.md) | Rekursif vs Iterasi |
| 📄 [06-latihan-pemahaman](./docs/06-latihan-pemahaman_rekursif.md) | Kuis & verifikasi |
| 📄 [07-insight](./docs/07-insight_rekursif.md) | FP & Immutability |

---

## 🏆 Learning Outcomes

Setelah mempelajari materi ini, kamu akan bisa:

- ✅ Menjelaskan apa itu rekursif dan perbedaannya dengan iterasi biasa.
- ✅ Mengidentifikasi **Base Case** dan **Recursive Case** dalam sebuah fungsi rekursif.
- ✅ Menggambarkan cara kerja **Call Stack** saat rekursif berjalan, termasuk proses Unwinding.
- ✅ Mengimplementasikan fungsi rekursif menggunakan berbagai pendekatan (`.concat()`, Spread `...`, Accumulator).
- ✅ Membedakan kapan harus menggunakan rekursif versus looping biasa.
- ✅ Memahami mengapa rekursif adalah inti dari paradigma **Functional Programming**.

---

<div align="center">

📚 [Mulai dari Part 1 — Pengantar Konsep →](./docs/01-pengantar-konsep_rekursif.md)

[01 Pengantar](./docs/01-pengantar-konsep_rekursif.md) • [02 Cara Kerja](./docs/02-cara-kerja_rekursif.md) • [03 Sintaks](./docs/03-sintaks-penggunaan_rekursif.md) • [04 Contoh Nyata](./docs/04-contoh-nyata_rekursif.md) • [05 Perbandingan](./docs/05-perbandingan-konsep_rekursif.md) • [06 Latihan](./docs/06-latihan-pemahaman_rekursif.md) • [07 Insight](./docs/07-insight_rekursif.md)

Made with ❤️ for learners — **Happy Learning! 🚀**

</div>
