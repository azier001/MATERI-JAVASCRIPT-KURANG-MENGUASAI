# 💡 Insight — Recursion & Functional Thinking — Rekursif & Pola Pikir Fungsional

![Topic](https://img.shields.io/badge/Topic-Mental%20Model-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Insight-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🌟 [Insight Utama](#insight-utama)
- 🧠 [Mental Model Baru](#mental-model)
- ⚠️ [Jebakan Paling Umum](#jebakan-umum)
- 🏆 [Best Practice Mendalam](#best-practice)
- 🔮 [Perspektif Lanjutan](#perspektif)
- 🔗 [Navigation](#navigation)

---

<a name="insight-utama"></a>
## 🌟 Insight Utama

Dari sesi mempelajari rekursif, pelajaran paling berharga yang saya dapatkan adalah: **rekursif bukan sekadar teknik menulis loop dengan cara yang berbeda — ia adalah cara berpikir yang berbeda tentang masalah itu sendiri.**

Ketika saya belajar rekursif dari sudut pandang "cara membuat loop tanpa `for`", saya selalu bingung kenapa harus repot. Tapi begitu saya memahaminya dari sudut pandang **Functional Programming** — bahwa rekursif lahir dari kebutuhan untuk menjaga *immutability* (data tidak boleh berubah) — semuanya menjadi masuk akal.

Di bahasa seperti Haskell, rekursif bukan pilihan — ia adalah satu-satunya cara melakukan perulangan, karena `for` dan `while` loop membutuhkan variabel `counter` yang nilainya berubah-ubah, melanggar prinsip inti FP. JavaScript tidak memaksa kita ke arah itu, tapi memahami "kenapa rekursif ada" dari perspektif FP mengubah cara saya memandang kode yang lebih bersih dan lebih dapat diprediksi.

---

<a name="mental-model"></a>
## 🧠 Mental Model Baru

### Cara Berpikir Lama ❌

*"Rekursif itu loop yang memanggil dirinya sendiri. Bisa dipakai untuk iterasi seperti `for` loop, hanya cara penulisannya berbeda."*

Dengan cara berpikir ini, saya selalu bertanya: *"Kenapa harus pakai rekursif kalau bisa pakai loop?"* — dan tidak pernah menemukan jawaban yang memuaskan.

```js
// Akibat cara berpikir lama: "Sama saja dengan loop, tapi lebih rumit"
function generateArray(n) {
  const result = [];
  for (let i = 0; i <= n; i++) {
    result.push(i); // Variabel result DAN i terus berubah
  }
  return result;
}
```

### Cara Berpikir Baru ✅

*"Rekursif bukan pengganti loop — ia adalah cara menyelesaikan masalah tanpa mengubah data yang sudah ada. Setiap langkah menghasilkan nilai baru, bukan memodifikasi yang lama."*

Dengan cara berpikir ini, pertanyaannya berubah menjadi: *"Bagaimana saya bisa menyelesaikan masalah ini dengan hanya menciptakan nilai baru, bukan mengubah yang ada?"* — dan rekursif menjadi jawaban yang natural.

```js
// Cara berpikir baru: setiap langkah hanya menciptakan nilai baru
const generateArray = (n) => n < 0 ? [] : [...generateArray(n - 1), n];
// n tidak pernah diubah — kita hanya meneruskan nilai baru (n-1) ke panggilan berikutnya
```

> 💡 **Analogi yang membantu saya:**
> Bayangkan kamu membuat dokumen. Cara lama (loop) seperti mengedit satu dokumen yang sama berkali-kali — menambah, mengubah, menghapus. Cara baru (rekursif/FP) seperti membuat salinan dokumen baru setiap kali ada perubahan — dokumen lama tidak pernah disentuh. Memori lebih boros, tapi kamu selalu punya riwayat yang bersih dan tidak ada efek samping tersembunyi.

---

<a name="jebakan-umum"></a>
## ⚠️ Jebakan Paling Umum

### Jebakan #1 — Base Case yang Terlalu Ketat (`===` vs `<=`)

**Yang diasumsikan:** *"Base case `n === 0` sudah cukup untuk menghentikan rekursif."*

```js
function countdown(n) {
  if (n === 0) return; // Terlihat benar...
  console.log(n);
  countdown(n - 1);
}

countdown(3);  // Output yang diharapkan: 3, 2, 1 ✅
countdown(-1); // Output yang diharapkan: tidak ada output ❌
               // Output sebenarnya:      Stack Overflow! 💥
```

**Kenapa terjadi?**
`-1 === 0` adalah `false`. Rekursif terus berjalan: `-1`, `-2`, `-3`... semakin menjauh dari `0`, bukan mendekati. Call Stack terus terisi tanpa pernah mencapai base case.

**Cara menghindari:**
```js
// ✅ Gunakan operator perbandingan, bukan kesamaan ketat
function countdown(n) {
  if (n <= 0) return; // Menangkap 0 DAN semua angka negatif
  console.log(n);
  countdown(n - 1);
}

countdown(-1); // ✅ Tidak ada output, tidak crash
```

> 💡 **Aturan jempol:** Lebih aman menggunakan `<=` atau `>=` daripada `===` untuk base case numerik — beri "jaring pengaman" yang menangkap semua nilai di sisi yang aman.

---

### Jebakan #2 — Posisi Aksi Menentukan Urutan Output

**Yang diasumsikan:** *"Letak `console.log` tidak mempengaruhi urutan output — yang penting fungsinya benar."*

```js
// Kode A — aksi SEBELUM rekursif
function countA(n) {
  if (n <= 0) return;
  console.log(n); // ← Di sini
  countA(n - 1);
}

// Kode B — aksi SESUDAH rekursif
function countB(n) {
  if (n <= 0) return;
  countB(n - 1);
  console.log(n); // ← Di sini
}

countA(3); // Output yang diharapkan: 3, 2, 1
           // Output sebenarnya:      3, 2, 1 ✅ (kebetulan benar)

countB(3); // Output yang diharapkan: 3, 2, 1 (sama?)
           // Output sebenarnya:      1, 2, 3 ❌ (TERBALIK!)
```

**Kenapa terjadi?**
- **Sebelum rekursif** → aksi dijalankan saat fungsi pertama kali dipanggil (fase "turun") → urutan besar ke kecil.
- **Sesudah rekursif** → aksi dijalankan saat fungsi selesai dan naik kembali (fase "unwinding") → urutan kecil ke besar.

**Cara menghindari:**
```js
// ✅ Pahami "kapan" baris kode dieksekusi relatif terhadap rekursif
// Sebelum rekursif = saat masuk ke dalam (besar → kecil)
// Sesudah rekursif = saat keluar/unwinding (kecil → besar)
```

> 💡 **Aturan jempol:** Tanya dirimu sendiri: "Apakah aksi ini harus terjadi saat saya masuk ke dalam masalah, atau saat saya keluar dari masalah?" Jawabannya menentukan di mana menaruh kode.

---

<a name="best-practice"></a>
## 🏆 Best Practice Mendalam

### BP #1 — Selalu Buat Base Case yang "Defensif"

**Practice:** Tulis base case yang menangkap rentang nilai, bukan hanya satu nilai titik.

**Kenapa:** Di dunia nyata, kamu tidak selalu bisa mengontrol input yang diterima fungsimu. Kalau base case hanya menangkap satu nilai titik (`=== 0`), setiap input "tak terduga" (negatif, desimal, dll.) bisa lolos dan menyebabkan Stack Overflow.

```js
// ❌ Tanpa BP ini: rentan terhadap input tak terduga
function sumTo(n) {
  if (n === 0) return 0;
  return n + sumTo(n - 1);
}
sumTo(-1); // 💥 Stack Overflow

// ✅ Dengan best practice: base case yang defensif
function sumTo(n) {
  if (n <= 0) return 0; // Tangkap semua nilai "di bawah batas"
  return n + sumTo(n - 1);
}
sumTo(-1); // ✅ return 0, aman
```

**Trade-off:** Untuk masalah matematis tertentu (misal: `n` memang harus tepat `0`), base case dengan `===` lebih akurat secara semantik. Pilih berdasarkan konteks — tapi kalau ragu, `<=` lebih aman.

---

### BP #2 — Pilih Metode Penggabungan Array yang Sesuai Konteks

**Practice:** Ketahui perbedaan `.push()`, `.concat()`, dan spread `...` dan pilih yang sesuai dengan prinsip yang diutamakan.

**Kenapa:** Ketiganya menghasilkan output yang sama, tapi memiliki karakteristik yang berbeda soal *immutability* dan keterbacaan:

```js
// ❌ Tanpa BP ini: memakai .push() di semua situasi (mutable)
function buildArr(n) {
  if (n < 0) return [];
  const arr = buildArr(n - 1);
  arr.push(n); // ← Mengubah array yang sudah ada (mutation!)
  return arr;
}

// ✅ Opsi 1: .concat() — immutable, lebih FP-friendly
function buildArr(n) {
  if (n < 0) return [];
  return buildArr(n - 1).concat(n); // Array baru dibuat setiap kali
}

// ✅ Opsi 2: Spread — immutable, sintaks paling ekspresif
const buildArr = (n) => n < 0 ? [] : [...buildArr(n - 1), n];
```

**Trade-off:** `.push()` lebih hemat memori karena tidak membuat array baru. `.concat()` dan spread lebih "murni" dari perspektif FP tapi menggunakan lebih banyak memori untuk `n` yang besar. Untuk `n` kecil sampai menengah, perbedaannya tidak signifikan.

---

### BP #3 — Gunakan Rekursif Hanya Ketika Masalahnya "Naturally Recursive"

**Practice:** Sebelum menulis rekursif, tanyakan: "Apakah definisi masalah ini sendiri bersifat rekursif?"

**Kenapa:** Rekursif paling kuat dan paling elegan ketika struktur masalah dan struktur solusinya sejajar. Memaksa rekursif ke masalah yang lebih cocok dengan loop hanya menambah kompleksitas tanpa keuntungan.

```js
// ❌ Tanpa BP ini: memaksa rekursif ke masalah linear sederhana
function sumArray(arr, index = 0) {
  if (index === arr.length) return 0;
  return arr[index] + sumArray(arr, index + 1); // Berhasil, tapi kenapa?
}

// ✅ Dengan BP ini: pakai loop untuk masalah linear, rekursif untuk masalah nested
function sumArray(arr) {
  return arr.reduce((acc, n) => acc + n, 0); // Jauh lebih jelas maksudnya
}

// ✅ Rekursif untuk masalah yang MEMANG nested
function sumNestedArray(arr) {
  return arr.reduce((acc, item) => {
    return Array.isArray(item) 
      ? acc + sumNestedArray(item) // Rekursif untuk nested array
      : acc + item;
  }, 0);
}
```

**Trade-off:** Terkadang kamu perlu latihan menulis rekursif untuk masalah sederhana — ini valid sebagai latihan. Tapi di kode produksi, pilih yang paling mudah dibaca dan dipelihara.

---

<a name="perspektif"></a>
## 🔮 Perspektif Lanjutan

### Rekursif dalam Bahasa Pemrograman Fungsional

Di bahasa seperti Haskell atau Erlang, rekursif bukan hanya gaya penulisan — ia adalah satu-satunya mekanisme perulangan. Tidak ada `for`, tidak ada `while`. Memahami rekursif dari perspektif ini membuka pintu ke pemahaman yang lebih dalam tentang **paradigma pemrograman** dan kenapa JavaScript pun mendukung gaya FP melalui metode seperti `.map()`, `.filter()`, dan `.reduce()`.

### Tail Call Optimization (TCO)

Rekursif tradisional menyimpan setiap panggilan di Call Stack. Ada teknik bernama **Tail Call Optimization (TCO)** di mana JavaScript Engine secara teoritis bisa mengoptimalkan rekursif sehingga tidak menumpuk Stack — jika pemanggilan rekursif adalah **operasi terakhir** dalam fungsi. Sayangnya, dukungan TCO di browser masih sangat terbatas per hari ini.

### Apa yang Perlu Dipelajari Selanjutnya?

- **Tree Traversal** — menerapkan rekursif ke struktur data Tree (Binary Tree, DOM).
- **Dynamic Programming** — mengoptimalkan rekursif dengan teknik *memoization* (menyimpan hasil sebelumnya agar tidak dihitung ulang).
- **Array.prototype.flat()** — versi bawaan JavaScript untuk meratakan array bertingkat (versi "teroptimasi" dari rekursif flatten yang kita pelajari).

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](./README.md)**
- **📖 [← Latihan Pemahaman](./docs/06-latihan-pemahaman_rekursif.md)**
- **📋 [Cheat Sheet — Ringkasan Konsep →](./ringkasan-konsep.md)**
