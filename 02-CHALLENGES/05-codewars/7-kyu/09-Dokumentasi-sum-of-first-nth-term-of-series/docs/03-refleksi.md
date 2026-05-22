# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Berhasil mengidentifikasi pola penyebut (naik 3) sejak awal, bahkan sebelum mentoring.
- Kode awal (Attempt #1) sudah fungsional benar walau belum optimal.
- Setelah mentoring, berhasil menurunkan rumus penyebut `3i - 2` secara mandiri dari panduan bertahap.
- Memahami bahwa `.toFixed(2)` bisa melakukan pembulatan sekaligus konversi ke String.
- Solusi final berhasil dipangkas dari ~18 baris menjadi ~5 baris dengan efisiensi yang jauh lebih baik.

---

## ❌ Apa yang Salah di Awal?

| Kesalahan | Penyebab | Solusi |
|-----------|----------|--------|
| Membuat 2 array yang tidak perlu (`series`, `numSeries`) | Pola pikir "kumpulkan dulu semua data, baru proses" — padahal data tidak perlu disimpan | Langsung akumulasi ke variabel `total` di dalam 1 loop |
| Menggunakan 3 loop terpisah | Belum terbiasa menggabungkan beberapa operasi ke dalam 1 iterasi | Hitung penyebut, bagi, dan jumlahkan sekaligus di dalam 1 loop |
| Menulis `.slice(0, n)` yang redundan | Kurang teliti — tidak menyadari array sudah pasti panjang `n` | Hapus baris tersebut, atau lebih baik: jangan pakai array sama sekali |
| Belum bisa menurunkan rumus `3i - 2` sendiri | Belum terbiasa memformulasikan pola angka menjadi rumus aljabar | Latihan mengenali pola deret aritmatika: suku ke-i = `a + (i-1) × d` |

---

## 🌟 Best Practice dari Komunitas

### Solusi Komunitas #1 — Rekursi (Recursive)

```javascript
function SeriesSum(n, s = 0) {
    return n ? SeriesSum(n - 1, s + 1 / (3 * n - 2)) : s.toFixed(2)
}
```

#### 🔍 Penjelasan Detail

**Konsep utama:** Fungsi ini memanggil **dirinya sendiri** (rekursi) alih-alih menggunakan loop.

**Parameter:**
- `n` — jumlah suku yang tersisa untuk dijumlahkan.
- `s = 0` — **akumulator** (penampung total), menggunakan **default parameter** ES6 sehingga pemanggilan awal cukup `SeriesSum(5)` tanpa perlu mengisi `s`.

**Cara kerja baris per baris:**

```javascript
return n ? SeriesSum(n - 1, s + 1 / (3 * n - 2)) : s.toFixed(2)
//     ↑                                            ↑
//     |                                            |
//  Kondisi: apakah n masih > 0?              Basis: n = 0, stop!
//     |
//  Jika ya → panggil diri sendiri dengan:
//    - n dikurangi 1 (satu suku sudah diproses)
//    - s ditambah pecahan suku ke-n saat ini
```

**Menggunakan ternary operator** `kondisi ? nilaiJikaTrue : nilaiJikaFalse` sebagai pengganti `if/else`.

**Visualisasi pemanggilan `SeriesSum(3)`:**

```
SeriesSum(3, 0)
│  n = 3, truthy → panggil ulang
│  s baru = 0 + 1/(3×3 - 2) = 0 + 1/7
│
└── SeriesSum(2, 0.142857...)
    │  n = 2, truthy → panggil ulang
    │  s baru = 0.142857... + 1/(3×2 - 2) = 0.142857... + 1/4
    │
    └── SeriesSum(1, 0.392857...)
        │  n = 1, truthy → panggil ulang
        │  s baru = 0.392857... + 1/(3×1 - 2) = 0.392857... + 1/1
        │
        └── SeriesSum(0, 1.392857...)
            │  n = 0, falsy → STOP!
            └── return (1.392857...).toFixed(2) → "1.39"
```

> ⚠️ **Catatan penting:** Perhatikan bahwa rekursi ini memproses dari suku terakhir ke suku pertama (n → 1), bukan dari suku pertama ke terakhir (1 → n). Hasilnya tetap sama karena penjumlahan bersifat komutatif (urutan tidak mempengaruhi total).

**Kenapa menarik:**
- Seluruh logika ditulis dalam **1 baris** saja.
- Tidak ada variabel `let` yang bermutasi — semua state dilempar lewat parameter (gaya **functional programming**).
- Menggunakan **default parameter** (`s = 0`) agar pemanggilan awal tetap bersih.

**Kekurangan:**
- Jika `n` sangat besar (misal 100.000+), bisa menyebabkan **Stack Overflow** karena setiap pemanggilan rekursif menambah frame ke call stack.
- Lebih sulit dibaca bagi pemula dibanding `for` loop biasa.

---

### Solusi Komunitas #2 — For Loop Kompak

```javascript
function SeriesSum(n)
{
  for(a=0,i=1;i<=n*3;i+=3) a+=1/i;
  return a.toFixed(2);
}
```

#### 🔍 Penjelasan Detail

**Konsep utama:** Sama seperti solusi kita (for loop), tapi menggunakan pendekatan yang berbeda untuk menghitung penyebut — alih-alih menggunakan rumus `3*i - 2`, penyebut langsung dihasilkan oleh **step increment** di loop (`i += 3`).

**Cara kerja baris per baris:**

```javascript
for(a=0, i=1; i<=n*3; i+=3) a+=1/i;
//  ↑    ↑      ↑       ↑      ↑
//  |    |      |       |      └── Di setiap iterasi: tambahkan 1/i ke akumulator
//  |    |      |       └── Step: i naik 3 setiap kali (1 → 4 → 7 → 10 → ...)
//  |    |      └── Kondisi berhenti: i <= n * 3
//  |    └── i mulai dari 1 (penyebut pertama)
//  └── a = akumulator (total), dimulai dari 0
```

**Perbedaan kunci dengan solusi kita:**

| Aspek | Solusi Kita | Solusi Komunitas #2 |
|-------|------------|-------------------|
| Variabel loop `i` merepresentasikan | Urutan suku (1, 2, 3, 4, 5) | Penyebut langsung (1, 4, 7, 10, 13) |
| Cara dapat penyebut | Dihitung: `3 * i - 2` | Langsung dari `i` (karena `i += 3`) |
| Kondisi berhenti | `i <= n` | `i <= n * 3` |
| Step increment | `i++` (naik 1) | `i += 3` (naik 3) |

**Visualisasi untuk `SeriesSum(3)`:**

```
a = 0, i = 1

Iterasi 1 — i = 1 (≤ 3×3=9 ✅)
├── a += 1/1 = 1
└── i = 1 + 3 = 4

Iterasi 2 — i = 4 (≤ 9 ✅)
├── a += 1/4 = 1.25
└── i = 4 + 3 = 7

Iterasi 3 — i = 7 (≤ 9 ✅)
├── a += 1/7 = 1.392857...
└── i = 7 + 3 = 10

Iterasi 4 — i = 10 (≤ 9 ❌) → STOP

return (1.392857...).toFixed(2) → "1.39"
```

**Kenapa menarik:**
- Sangat ringkas — hanya **2 baris** kode efektif.
- Tidak perlu menghitung rumus penyebut — penyebut dihasilkan langsung oleh `i += 3`.
- Mirip dengan pendekatan kode awal kita (`i += 3`) tapi tanpa array.

**Kekurangan:**
- `a` dideklarasikan tanpa `let`/`const` — ini menciptakan **global variable** secara tidak sengaja (bad practice, bisa menyebabkan bug di kode yang lebih besar).
- Kondisi `i <= n * 3` kurang intuitif — pembaca harus berpikir keras kenapa batasnya `n * 3`.
- Penamaan variabel `a` dan `i` kurang deskriptif.

---

### Solusi Komunitas #3 — Functional Programming (Array + Map + Reduce)

```javascript
function SeriesSum(n) {
  return Array(n).fill(0).map((e, i) => 3 * i + 1).reduce((s, e) => s + 1 / e, 0).toFixed(2);
}
```

#### 🔍 Penjelasan Detail

**Konsep utama:** Menggunakan **method chaining** — merangkai beberapa method array secara berurutan dalam satu ekspresi, tanpa loop eksplisit.

**Membedah rantai method satu per satu:**

```javascript
Array(n)              // Langkah 1: Buat array kosong dengan panjang n
  .fill(0)            // Langkah 2: Isi semua slot dengan 0
  .map((e, i) =>      // Langkah 3: Ubah setiap elemen menjadi penyebutnya
    3 * i + 1          //            menggunakan index i (dimulai dari 0)
  )
  .reduce((s, e) =>   // Langkah 4: Reduksi/jumlahkan semua pecahan
    s + 1 / e,         //            s = akumulator, e = penyebut saat ini
    0                  //            nilai awal akumulator = 0
  )
  .toFixed(2)          // Langkah 5: Bulatkan ke 2 desimal, ubah ke string
```

**Visualisasi langkah-demi-langkah untuk `SeriesSum(5)`:**

```
Langkah 1: Array(5)
→ [ , , , , ]  (5 slot kosong / empty)

Langkah 2: .fill(0)
→ [0, 0, 0, 0, 0]  (semua slot diisi 0)

Langkah 3: .map((e, i) => 3 * i + 1)
│  i=0 → 3(0)+1 = 1
│  i=1 → 3(1)+1 = 4
│  i=2 → 3(2)+1 = 7
│  i=3 → 3(3)+1 = 10
│  i=4 → 3(4)+1 = 13
→ [1, 4, 7, 10, 13]  (array berisi penyebut-penyebut)

Langkah 4: .reduce((s, e) => s + 1/e, 0)
│  s=0,        e=1  → s = 0 + 1/1 = 1
│  s=1,        e=4  → s = 1 + 1/4 = 1.25
│  s=1.25,     e=7  → s = 1.25 + 1/7 = 1.392857...
│  s=1.392..., e=10 → s = 1.392... + 1/10 = 1.492857...
│  s=1.492..., e=13 → s = 1.492... + 1/13 = 1.569780...
→ 1.569780...

Langkah 5: .toFixed(2)
→ "1.57" ✅
```

**Catatan rumus:** Solusi ini menggunakan `3 * i + 1` (bukan `3 * i - 2` seperti solusi kita) karena index `.map()` dimulai dari **0**, bukan 1:

| Index `i` (mulai 0) | 3 × i + 1 | Penyebut |
|---------------------|-----------|----------|
| 0 | 3(0) + 1 = **1** | 1 ✅ |
| 1 | 3(1) + 1 = **4** | 4 ✅ |
| 2 | 3(2) + 1 = **7** | 7 ✅ |
| 3 | 3(3) + 1 = **10** | 10 ✅ |

> Rumus `3i + 1` (index dari 0) dan `3i - 2` (index dari 1) menghasilkan deret yang sama — hanya beda titik mulai index-nya.

**Kenapa menarik:**
- Gaya **deklaratif** — kode menjelaskan *"apa yang dilakukan"* (buat array → ubah jadi penyebut → jumlahkan), bukan *"bagaimana melakukannya"* step by step.
- Sangat idiomatik dalam JavaScript modern (functional programming style).
- **Tidak ada variabel bermutasi** (`let`) — semua transformasi mengalir lewat return value dari method ke method.

**Kekurangan:**
- Membuat **beberapa array perantara** di memori (hasil `fill()`, hasil `map()`), kurang efisien untuk `n` yang sangat besar.
- Butuh pemahaman 3 method sekaligus (`fill`, `map`, `reduce`) — bisa membingungkan pemula.
- `Array(n).fill(0)` diperlukan karena `Array(n)` saja menghasilkan *sparse array* yang tidak bisa di-`.map()`.

---

## 📊 Perbandingan Semua Solusi

| Aspek | Solusi Kita | #1 Rekursi | #2 Loop Kompak | #3 Functional |
|-------|------------|-----------|----------------|--------------|
| **Paradigma** | Imperatif | Rekursif | Imperatif | Functional |
| **Baris kode** | 5 | 1 | 2 | 1 |
| **Keterbacaan** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| **Space** | $O(1)$ | $O(n)$ call stack | $O(1)$ | $O(n)$ array |
| **Risiko** | Tidak ada | Stack overflow | Global var | Memori array |
| **Cocok untuk** | Pemula & produksi | Latihan rekursi | Code golf | Latihan FP |

---

## 📚 Konsep Baru yang Dipelajari

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| `Deret Aritmatika` | Pola angka yang selisih antar sukunya selalu tetap. Rumus suku ke-i: `a + (i-1) × d` |
| `.toFixed(n)` | Method bawaan Number di JS untuk membulatkan ke `n` desimal dan mengubah hasilnya menjadi String |
| `Akumulator` | Variabel penampung yang nilainya terus ditambahkan di setiap iterasi loop, sehingga di akhir berisi total keseluruhan |
| `Default Parameter` | Fitur ES6 (`function(x, y = 0)`) — parameter yang diberi nilai default jika tidak diisi saat pemanggilan |
| `Rekursi` | Teknik di mana fungsi memanggil dirinya sendiri dengan input yang semakin kecil sampai mencapai kondisi berhenti (basis) |
| `Method Chaining` | Merangkai beberapa method secara berurutan (`.fill().map().reduce()`) — output method sebelumnya menjadi input method berikutnya |
| `Array.reduce()` | Method yang "mereduksi" seluruh array menjadi satu nilai tunggal dengan menjalankan fungsi akumulator di setiap elemen |

---

## 🔗 Keterkaitan dengan Materi Lain

> *Apakah challenge ini berkaitan dengan materi yang sudah dipelajari sebelumnya?*

- Berkaitan dengan: **Loop / Perulangan** — konsep `for` loop yang sudah sering dipakai di challenge sebelumnya
- Berkaitan dengan: **Deret Aritmatika** — konsep matematika dasar tentang barisan angka dengan selisih tetap
- Berkaitan dengan: **Number Methods** — `.toFixed()` berguna untuk formatting angka di banyak konteks (harga, persentase, dll)

---

## 📝 Catatan untuk Masa Depan

> *Jika menghadapi soal serupa, apa yang akan kamu lakukan berbeda?*

- [x] Jika tujuan akhir hanya menghasilkan **satu nilai total**, jangan gunakan array — langsung akumulasi ke variabel
- [x] Selalu cari **rumus matematis** dari pola angka sebelum mulai coding, agar loop bisa ditulis lebih bersih
- [ ] Pelajari lebih dalam tentang **rekursi** dan kapan sebaiknya digunakan vs loop biasa
- [ ] Latihan menggunakan `.map()` dan `.reduce()` agar lebih nyaman dengan gaya functional programming
- [ ] Biasakan menulis kode yang ringkas tapi tetap **readable** — jangan mengorbankan keterbacaan demi singkatnya baris

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
