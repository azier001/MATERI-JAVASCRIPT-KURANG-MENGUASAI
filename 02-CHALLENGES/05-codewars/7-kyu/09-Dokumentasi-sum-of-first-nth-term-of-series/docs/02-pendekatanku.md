# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

> _Apa yang pertama kali terlintas di pikiran saat membaca soal ini?_

Deret yang diberikan adalah `1 + 1/4 + 1/7 + 1/10 + 1/13 + ...`. Hal pertama yang terlintas adalah mencari **pola penyebutnya**: 1, 4, 7, 10, 13, ... — setiap penyebut naik **3**. Ini adalah deret aritmatika dengan suku pertama = 1 dan beda = 3. Setelah pola ditemukan, tinggal menjumlahkan `n` suku pertama dari deret pecahan tersebut, bulatkan ke 2 desimal, dan kembalikan sebagai String.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Buat variabel `total` bernilai awal 0 untuk menampung jumlah deret
2. Gunakan `for` loop dari suku ke-1 (i = 1) sampai suku ke-n (i <= n)
3. Di dalam loop, hitung penyebut menggunakan rumus: 3 * i - 2
4. Tambahkan 1 / penyebut ke total
5. Setelah loop selesai, kembalikan total dengan format 2 desimal (.toFixed(2))
```

---

## 🔄 Percobaan Pertama (Sebelum Mentoring)

```javascript
// Attempt #1 — Menggunakan array penampung & multiple loops
function SeriesSum(n) {
  const series = [];

  for (let i = 1; i < n * 3; i += 3) {
    series.push(i);
  }

  const numSeries = [];

  for (let i = 0; i < n; i++) {
    numSeries.push(1 / series[i]);
  }

  const numbers = numSeries.slice(0, n);

  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total.toFixed(2);
}
```

**Hasil:** ✅ Lulus (Fungsional Benar)  
**Apa yang bisa diperbaiki:**

- **Boros Memori** — Membuat 2 array (`series` dan `numSeries`) untuk menyimpan data sementara yang sebenarnya tidak perlu disimpan. Jika `n = 1.000.000`, JavaScript harus memesan memori untuk jutaan elemen di masing-masing array.
- **Terlalu Banyak Loop (3x)** — Loop pertama mengisi `series`, loop kedua mengisi `numSeries`, loop ketiga menjumlahkan. Padahal ketiga proses ini bisa dilakukan dalam **1 loop tunggal**.
- **Redundansi `.slice()`** — Baris `const numbers = numSeries.slice(0, n)` tidak melakukan apa-apa, karena `numSeries` sudah pasti memiliki panjang `n` dari loop sebelumnya. Ini hanya menduplikasi array yang sudah pas ukurannya.

---

## 🔄 Percobaan Kedua (Proses Mentoring Socratic — Bertahap)

### Tahap 1: Menemukan Pola Penyebut

Mentor bertanya:  
> *"Perhatikan penyebutnya: 1, 4, 7, 10, 13, ... — Apa pola yang kamu lihat? Setiap angka naik berapa?"*

**Jawaban:** Naik **3**. ✅ Benar!

Pola ini sudah dikenali dari percobaan pertama (menggunakan `i += 3` di loop), namun belum diformulasikan menjadi rumus matematis.

---

### Tahap 2: Menurunkan Rumus Penyebut

Mentor bertanya:  
> *"Kalau kamu tahu polanya, rumus apa yang bisa menghasilkan penyebut untuk suku ke-`i`?"*

**Jawaban awal:** Kurang tahu.

Kemudian mentor membimbing dengan cara membedah pola secara bertahap:

```
Suku ke-1 (i = 1) → Penyebut: 1
Suku ke-2 (i = 2) → Penyebut: 4  (didapat dari 1 + 3)
Suku ke-3 (i = 3) → Penyebut: 7  (didapat dari 1 + 3 + 3, atau 1 + 2 × 3)
Suku ke-4 (i = 4) → Penyebut: 10 (didapat dari 1 + 3 + 3 + 3, atau 1 + 3 × 3)
```

Dari pola di atas, perkalian dengan angka 3 selalu menggunakan `(i - 1)`:

```
i = 2 → 3 dikali 1 (2 - 1)
i = 3 → 3 dikali 2 (3 - 1)
i = 4 → 3 dikali 3 (4 - 1)
```

Sehingga rumus penyebut suku ke-`i` adalah:

$$\text{Penyebut} = 1 + (i - 1) \times 3$$

Disederhanakan secara aljabar menjadi:

$$\text{Penyebut} = 3i - 2$$

**Verifikasi rumus:**

| i | 3i - 2 | Penyebut Sebenarnya | Cocok? |
|---|--------|---------------------|--------|
| 1 | 3(1) - 2 = **1** | 1 | ✅ |
| 2 | 3(2) - 2 = **4** | 4 | ✅ |
| 3 | 3(3) - 2 = **7** | 7 | ✅ |
| 4 | 3(4) - 2 = **10** | 10 | ✅ |
| 5 | 3(5) - 2 = **13** | 13 | ✅ |

---

### Tahap 3: Memilih Mekanisme Perulangan

Mentor bertanya:  
> *"Mekanisme apa yang bisa kamu pakai di JavaScript untuk menjumlahkan semua suku dari 1 sampai n?"*

**Jawaban awal:** Kurang tahu.

Setelah diberi petunjuk tentang keyword perulangan di JavaScript:

**Jawaban:** Bisa pakai `for` dan `while`! ✅

Mentor menjelaskan bahwa karena jumlah iterasi sudah pasti (`n` kali), maka **`for` loop** lebih ideal karena penulisan kondisi start, stop, dan step-nya lebih ringkas dalam satu baris.

Kemudian mentor memberikan panduan menyusun kode:

```
1. Buat variabel penampung total, isi awal = 0
2. Buat for loop dari i = 1 sampai i = n
3. Di dalam loop, hitung penyebut dengan rumus 3 * i - 2
4. Tambahkan 1 / penyebut ke total
```

---

### Tahap 4: Menulis Kode (Belum Lengkap)

Berdasarkan panduan di atas, kode pertama yang ditulis:

```javascript
// Attempt #2a — Logika loop benar, tapi belum ada pembulatan
const SeriesSum = (n) => {
  let total = 0;

  for (let i = 1; i <= n; i++) {
    total += 1 / (3 * i - 2);
  }

  return total;
};
```

**Hasil:** ❌ Belum lengkap  
**Apa yang kurang:**

- Return value masih berupa **Number**, bukan **String**.
- Belum dibulatkan ke **2 angka desimal**.
- Soal mensyaratkan output bertipe `string` dengan format `"X.XX"`.

---

### Tahap 5: Menambahkan `.toFixed(2)`

Mentor menjelaskan method `.toFixed()` yang bisa menyelesaikan 2 masalah sekaligus:

```javascript
let angka = 1.5698;
let hasil = angka.toFixed(2); // → string "1.57"

let angkaNol = 0;
let hasilNol = angkaNol.toFixed(2); // → string "0.00"
```

`.toFixed(2)` melakukan dua hal sekaligus:
1. **Pembulatan** ke 2 angka di belakang koma.
2. **Konversi** dari `number` ke `string`.

Maka bagian `return total;` diubah menjadi `return total.toFixed(2);`:

```javascript
// Attempt #2b — Versi lengkap dengan pembulatan
const SeriesSum = (n) => {
  let total = 0;

  for (let i = 1; i <= n; i++) {
    total += 1 / (3 * i - 2);
  }

  return total.toFixed(2);
};
```

**Hasil:** ✅ Lulus!

---

## ✅ Solusi Final

```javascript
// Solusi Final — Single loop + akumulasi langsung + toFixed(2)
const SeriesSum = (n) => {
  let total = 0;

  for (let i = 1; i <= n; i++) {
    total += 1 / (3 * i - 2);
  }

  return total.toFixed(2);
};
```

---

## 🔍 Penjelasan Baris per Baris

```javascript
const SeriesSum = (n) => {
  // ⬆️ Membuat fungsi arrow yang menerima parameter `n` (jumlah suku yang dijumlahkan).

  let total = 0;
  // ⬆️ Inisialisasi variabel akumulator bernilai 0.
  //    Variabel ini akan menampung hasil penjumlahan semua suku.

  for (let i = 1; i <= n; i++) {
    // ⬆️ Loop dari i = 1 sampai i = n.
    //    Setiap iterasi merepresentasikan satu suku dalam deret.

    total += 1 / (3 * i - 2);
    // ⬆️ Hitung penyebut suku ke-i menggunakan rumus deret aritmatika: 3i - 2.
    //    Lalu bagi 1 dengan penyebut tersebut dan tambahkan ke total.
    //
    //    Contoh per iterasi:
    //    i = 1 → penyebut = 3(1) - 2 = 1  → total += 1/1
    //    i = 2 → penyebut = 3(2) - 2 = 4  → total += 1/4
    //    i = 3 → penyebut = 3(3) - 2 = 7  → total += 1/7
  }

  return total.toFixed(2);
  // ⬆️ Bulatkan total ke 2 angka di belakang koma dan ubah ke String.
  //    .toFixed(2) melakukan dua hal sekaligus:
  //    1. Pembulatan (misal 1.5698... → 1.57)
  //    2. Konversi ke String (misal number 1.57 → string "1.57")
  //
  //    Edge case: Jika n = 0, loop tidak berjalan, total tetap 0,
  //    dan (0).toFixed(2) menghasilkan "0.00". Tidak perlu pengecekan khusus.
};
```

---

## 🎬 Visualisasi: `SeriesSum(5)` → `"1.57"`

```
total = 0  (awal)

Iterasi 1 — i = 1
├── Penyebut = 3(1) - 2 = 1
├── Suku = 1 / 1 = 1
├── total = 0 + 1 = 1
└── total = 1

Iterasi 2 — i = 2
├── Penyebut = 3(2) - 2 = 4
├── Suku = 1 / 4 = 0.25
├── total = 1 + 0.25 = 1.25
└── total = 1.25

Iterasi 3 — i = 3
├── Penyebut = 3(3) - 2 = 7
├── Suku = 1 / 7 = 0.142857...
├── total = 1.25 + 0.142857... = 1.392857...
└── total = 1.392857...

Iterasi 4 — i = 4
├── Penyebut = 3(4) - 2 = 10
├── Suku = 1 / 10 = 0.1
├── total = 1.392857... + 0.1 = 1.492857...
└── total = 1.492857...

Iterasi 5 — i = 5
├── Penyebut = 3(5) - 2 = 13
├── Suku = 1 / 13 = 0.076923...
├── total = 1.492857... + 0.076923... = 1.569780...
└── total = 1.569780...

return (1.569780...).toFixed(2) → "1.57" ✅
```

---

## 📊 Perbandingan: Sebelum vs Sesudah Mentoring

| Aspek | Attempt #1 (Sebelum) | Solusi Final (Sesudah) |
|-------|---------------------|----------------------|
| **Jumlah Loop** | 3 loop | 1 loop |
| **Array Dibuat** | 2 array (`series`, `numSeries`) + 1 salinan (`numbers`) | 0 array |
| **Space Complexity** | $O(n)$ | $O(1)$ |
| **Time Complexity** | $O(n)$ (3 pass) | $O(n)$ (1 pass) |
| **Redundansi** | Ada (`.slice()` tidak berguna) | Tidak ada |
| **Baris Kode** | ~18 baris | ~5 baris |
| **Keterbacaan** | Perlu membaca 3 blok terpisah | Langsung terlihat alur utamanya |

---

## 🧪 Verifikasi Manual

```javascript
console.log(SeriesSum(0)); // → "0.00" ✅ (edge case: n = 0, loop tidak jalan)
console.log(SeriesSum(1)); // → "1.00" ✅ (hanya 1/1 = 1)
console.log(SeriesSum(2)); // → "1.25" ✅ (1 + 1/4 = 1.25)
console.log(SeriesSum(5)); // → "1.57" ✅ (1 + 1/4 + 1/7 + 1/10 + 1/13)
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
