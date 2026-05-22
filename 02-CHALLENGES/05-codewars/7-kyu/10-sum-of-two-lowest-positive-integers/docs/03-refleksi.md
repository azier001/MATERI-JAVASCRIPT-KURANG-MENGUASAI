# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Berhasil menemukan logika inti bahwa masalah ini bisa diselesaikan dengan sangat mudah dan cepat melalui cara pengurutan (sorting) terlebih dahulu.
- Mengimplementasikan callback `.sort((a, b) => a - b)` dengan benar untuk memastikan JavaScript mengurutkan angka secara numerik, bukan urutan abjad.
- Menggunakan pola *best practice* dari ES6 yaitu menyalin array dengan spread operator `[...numbers]` untuk mencegah termodifikasinya parameter asli.

---

## ❌ Apa yang Salah di Awal?

| Kesalahan | Penyebab | Solusi |
|-----------|----------|--------|
| Sempat bingung (belum ada bayangan) untuk memecahkan masalah ini. | Belum terbiasa memecah masalah besar menjadi langkah-langkah algoritmik kecil. | Membayangkan masalah di dunia nyata (seperti menyortir setumpuk kartu acak) sangat membantu menemukan kerangka logika awal. |

---

## 🌟 Best Practice dari Komunitas

Dari halaman solusi, kita menemukan 3 pendekatan menarik yang sering digunakan oleh programmer lain:

### Solusi Komunitas #1 — Functional Programming (Method Chaining)

```javascript
const sumTwoSmallestNumbers = numbers => numbers.sort((x, y) => x - y).slice(0, 2).reduce((x, y) => x + y);
```

#### 🔍 Penjelasan Detail

**Konsep utama:** Pendekatan ini merangkai beberapa fungsi array bawaan (*built-in methods*) secara berurutan dalam satu baris (method chaining). Ini adalah gaya *Functional Programming*.

**Cara kerja baris per baris:**

```javascript
numbers
  .sort((x, y) => x - y)  // 1. Urutkan array asli dari kecil ke besar
  .slice(0, 2)            // 2. Potong array, ambil hanya 2 elemen pertama
  .reduce((x, y) => x + y)// 3. Jumlahkan kedua elemen tersebut
```

**Visualisasi untuk input `[19, 5, 42, 2, 77]`:**

```
Input awal: [19, 5, 42, 2, 77]

Langkah 1: .sort((x, y) => x - y)
→ Mengurutkan. Hasilnya: [2, 5, 19, 42, 77]

Langkah 2: .slice(0, 2)
→ Memotong dari indeks 0 sampai sebelum indeks 2. Hasilnya: [2, 5]

Langkah 3: .reduce((x, y) => x + y)
→ Menjumlahkan isi array. x=2, y=5. Hasilnya: 7
```

**Kenapa menarik:**
- Sangat konsisten secara paradigma (functional). Alur datanya jelas: urutkan → potong → jumlahkan.
- Kode terlihat sangat bersih tanpa deklarasi variabel sementara atau pengambilan elemen secara manual dengan indeks `[0]` dan `[1]`.

**Kekurangan:**
- Merubah (mutating) array asli `numbers` karena `sort()` dijalankan langsung pada parameter tanpa disalin terlebih dahulu.
- Menggunakan `reduce()` untuk menjumlahkan hanya 2 angka bisa dianggap memakan waktu *overhead* sedikit lebih banyak ketimbang sekadar `a + b`, namun performa di level ini biasanya bisa diabaikan.

---

### Solusi Komunitas #2 — Defensive & Modern ES6

```javascript
function sumTwoSmallestNumbers(numbers) {  
  const [a, b] = [...numbers].filter(e => e >= 0).sort((a,b) => a - b);
  return a + b;
};
```

#### 🔍 Penjelasan Detail

**Konsep utama:** Ini adalah solusi yang sangat memperhatikan standar industri nyata (*defensive programming*). Ia juga memanfaatkan fitur *Destructuring* dari JavaScript ES6 agar kodenya mudah dibaca.

**Cara kerja baris per baris:**

```javascript
const [a, b] =             // 4. "Tangkap" elemen pertama jadi `a`, elemen kedua jadi `b`
  [...numbers]             // 1. Buat salinan array agar data asli aman (Immutability)
    .filter(e => e >= 0)   // 2. Buang angka negatif jika ada (Defensive Programming)
    .sort((a,b) => a - b); // 3. Urutkan angka dari terkecil ke terbesar
```

**Perbedaan kunci dengan solusi kita:**

| Aspek | Solusi Kita | Solusi Komunitas #2 |
|-------|------------|-------------------|
| Penyalinan Data | `[...numbers]` | `[...numbers]` |
| Pengambilan Nilai | Manual via Indeks: `sorted[0]` | ES6 Destructuring: `const [a, b] = ...` |
| Proteksi Ekstra | Tidak ada | Punya `.filter(e => e >= 0)` |

**Kenapa menarik:**
- **Paling aman!** Meskipun soal Codewars secara eksplisit menyebut *"No floats or non-positive integers will be passed"*, programmer ini berjaga-jaga. Di proyek aslinya, data dari API bisa saja kotor dan berisi angka negatif.
- Penggunaan `const [a, b]` (Destructuring) membuat deklarasi variabel terasa sangat intuitif bagaikan membaca kalimat biasa.

**Kekurangan:**
- Melakukan `.filter()` berarti JavaScript harus melakukan satu perulangan iterasi penuh $O(n)$ di awal, yang mana sebenarnya tidak diwajibkan oleh soal Codewars, membuat kode sedikit lebih lambat dari yang diperlukan.

---

### Solusi Komunitas #3 — Code Golf (Pendekatan Ekstrim)

```javascript
sumTwoSmallestNumbers = a => (a = a.sort((x, y) => x - y))[0] + a[1];
```

#### 🔍 Penjelasan Detail

**Konsep utama:** Menulis kode sependek mungkin (sering disebut gaya *Code Golf*). Memanfaatkan fakta bahwa *assignment* (pengisian variabel) di JavaScript me-return nilai yang baru diisi.

**Cara kerja baris per baris:**

```javascript
a => (                      // Fungsi panah menerima array `a`
  a = a.sort((x, y) => x - y) // Mengurutkan `a` dan MENIMPA variabel `a` itu sendiri
)[0]                        // Mengambil nilai indeks ke-0 dari array hasil urutan
+ a[1]                      // Menambahkan dengan array indeks ke-1
```

**Visualisasi proses eksekusi:**
1. Variabel `a` masuk sebagai `[19, 5, 42, 2, 77]`.
2. Ekspresi `a.sort((x, y) => x - y)` dipanggil dan me-return `[2, 5, 19, 42, 77]`.
3. Hasil itu ditimpa (di-*assign*) kembali ke variabel `a` aslinya.
4. Seluruh ekspresi di dalam kurung kurawal `(a = ...)` sekarang bernilai array terurut tersebut.
5. `[0]` digunakan untuk mengambil `2`.
6. JavaScript membaca `+ a[1]`, karena `a` sudah berhasil ditimpa oleh sort, `a[1]` nilainya adalah `5`.
7. Mengembalikan nilai `7`.

**Kenapa menarik:**
- Benar-benar sangat pendek! Memangkas waktu ketik dan membuat ukuran file sangat kecil.

**Kekurangan:**
- Mengorbankan *readability* (kemudahan dibaca) demi kode pendek. Programmer junior bisa sangat kebingungan melihat struktur `(a = a.sort...)[0]`.
- Merubah variabel secara paksa, sehingga tidak mematuhi kaidah fungsional yang bersih (Clean Code).

---

## 📊 Perbandingan Semua Solusi

| Aspek | Solusi Kita | #1 Functional (Chaining) | #2 Defensive & Modern | #3 Code Golf |
|-------|------------|--------------------------|-----------------------|--------------|
| **Paradigma** | Imperatif Bersih | Functional | Functional + Defensive | Code Golf |
| **Keterbacaan** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Immutability (Keamanan Data)**| ✅ (Pakai Spread) | ❌ (Mutasi Data) | ✅ (Pakai Spread) | ❌ (Mutasi Ekstrim) |
| **Kompleksitas Waktu** | $O(n \log n)$ | $O(n \log n) + O(n)$ | $O(n) + O(n \log n)$ | $O(n \log n)$ |
| **Cocok untuk** | Produksi & Pemula | Latihan Method | Produksi Skala Besar | Ajang Pamer Saja |

---

## 📚 Konsep Baru yang Dipelajari

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| `Destructuring Array` | Fitur ES6 untuk "membongkar" isi array dan memasukkannya ke variabel individual sekaligus. Contoh: `const [satu, dua] = [10, 20]`. Variabel `satu` jadi `10`, `dua` jadi `20`. |
| `Method Chaining` | Menempelkan pemanggilan fungsi satu setelah fungsi lainnya dalam satu baris (contoh: `array.sort().slice().reduce()`). Output method pertama akan otomatis dilempar menjadi input method kedua. |
| `Defensive Programming` | Praktik pemrograman yang mengasumsikan hal terburuk bisa terjadi, sehingga pengembang membuat perlindungan ekstra (seperti `.filter(e >= 0)`) walau spesifikasi sistem berkata data dijamin bersih. |
| `Mutating vs Non-Mutating` | `sort()` adalah fungsi yang *mutating* (merubah array asal yang ada di memori aslinya). Kita menggunakan penyalinan dengan Spread Syntax `[...arr]` agar membuat kloning baru (Non-Mutating) yang aman dimanipulasi tanpa menyentuh aslinya. |

---

## 🔗 Keterkaitan dengan Materi Lain

- Berkaitan dengan: **Array Methods** — `sort()`, `slice()`, `filter()`, `reduce()` adalah kumpulan alat utama di JavaScript untuk menangani struktur data *Array*.
- Berkaitan dengan: **Immutability & Pure Functions** — Membangun fungsi yang tidak merusak data yang diberikan dari luar (Side Effects).

---

## 📝 Catatan untuk Masa Depan

- [x] Ingat: Array `.sort()` di JavaScript, secara default, mengurutkan berdasarkan string/abjad. Jadi `[10, 2]` kalau di `.sort()` biasa akan menjadi `[10, 2]`. Selalu berikan callback `(a, b) => a - b` jika ingin urutan numerik.
- [x] Membiasakan diri memakai `[...array]` sebelum melakukan pengurutan agar original data aman.
- [x] ES6 *Destructuring* membuat baris yang mengambil indeks array terlihat jauh lebih profesional dan humanis. Cobalah membiasakan menggunakannya dibanding menulis `.slice()` lalu `reduce()` kalau datanya hanya dua atau tiga angka.
- [ ] Belajar lebih dalam tentang fungsi `.reduce()` karena ini adalah senjata *Functional Programming* paling kuat di JavaScript.

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
