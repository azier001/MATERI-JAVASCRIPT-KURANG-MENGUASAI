# 🧩 Latihan Pemahaman — Recursion — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Recursion-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Quiz%20%26%20Practice-yellow?style=for-the-badge)

---

## 📑 Daftar Isi

- 🤔 [Quiz: Tebak Output](#quiz-output)
- 💡 [Quiz: Apa yang Salah?](#quiz-salah)
- ✍️ [Tantangan Kode](#tantangan)
- 💭 [Pertanyaan Refleksi](#refleksi)
- ✅ [Jawaban & Penjelasan](#jawaban)
- 🔗 [Navigation](#navigation)

---

<a name="quiz-output"></a>
## 🤔 Quiz: Tebak Output

> **Petunjuk:** Pikirkan dulu jawabannya sebelum melihat bagian Jawaban di bawah!

### Soal 1

```js
function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1);
}

countdown(3);
```

Output-nya apa? Dalam urutan apa angkanya muncul, dan kenapa?

---

### Soal 2

```js
function mystery(n) {
  if (n <= 0) return;
  mystery(n - 1);
  console.log(n);
}

mystery(3);
```

Output-nya apa? Perhatikan bahwa `console.log` diletakkan **setelah** pemanggilan rekursif — apa bedanya dengan Soal 1?

---

### Soal 3

```js
function total(n) {
  if (n === 1) return 1;
  return n + total(n - 1);
}

console.log(total(4));
```

Output-nya apa? Coba uraikan proses penghitungannya langkah demi langkah.

---

### Soal 4

```js
function generateArray(n) {
  if (n < 0) return [];
  return [...generateArray(n - 1), n];
}

console.log(generateArray(0));
console.log(generateArray(-1));
```

Apa output dari masing-masing pemanggilan? Kenapa `generateArray(0)` tidak menghasilkan `[]`?

---

### Soal 5

```js
function countDown(n) {
  if (n === 0) return;
  console.log(n);
  countDown(n - 1);
}

countDown(-3);
```

Output-nya apa? Apakah kode ini aman?

---

<a name="quiz-salah"></a>
## 💡 Quiz: Apa yang Salah?

### Soal 1

Kode berikut tidak berjalan sesuai harapan. Apa yang salah?

```js
// ❌ Kode bermasalah
function hitung(n) {
  return n + hitung(n - 1);
}

console.log(hitung(5));

// Harapan developer: menghitung 5 + 4 + 3 + 2 + 1 = 15
// Yang sebenarnya terjadi: ???
```

Apa masalahnya? Bagaimana cara memperbaikinya?

---

### Soal 2

Kode berikut kadang bekerja, kadang crash. Kenapa?

```js
// ❌ Kode bermasalah
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));   // Bekerja ✅
console.log(factorial(-1));  // ???

// Harapan developer: -1 tidak perlu dihitung, cukup return 1
// Yang sebenarnya terjadi: ???
```

Apa masalahnya? Bagaimana memperbaiki base case-nya?

---

### Soal 3

Developer menulis fungsi ini untuk membalik string. Apa yang salah?

```js
// ❌ Kode bermasalah
function reverseString(str) {
  if (str === "") return "";
  return reverseString(str.slice(1)) + str;  // str atau str[0]?
}

console.log(reverseString("abc"));

// Harapan developer: "cba"
// Yang sebenarnya terjadi: ???
```

Apa yang salah pada baris `return`? Coba telusuri manual untuk `"abc"`.

---

<a name="tantangan"></a>
## ✍️ Tantangan Kode

### Tantangan 1 — Jumlah Digit (⭐ Mudah)

**Instruksi:**
Buat fungsi rekursif `sumDigits(n)` yang menerima sebuah bilangan bulat positif dan mengembalikan jumlah semua digit-nya. Misalnya, `sumDigits(123)` mengembalikan `6` karena `1 + 2 + 3 = 6`.

**Requirement:**
- Harus menggunakan rekursif, bukan loop
- Base case: ketika `n` sudah satu digit (kurang dari 10)
- Boleh asumsikan input selalu bilangan bulat positif

**Contoh hasil yang diharapkan:**
```js
console.log(sumDigits(123));  // → 6
console.log(sumDigits(9));    // → 9
console.log(sumDigits(456));  // → 15
```

<details>
<summary>💡 Hint (klik untuk lihat)</summary>

Bagaimana cara memisahkan digit terakhir dari sebuah angka? Coba pikir tentang operator `%` (modulo) dan `Math.floor()`. Digit terakhir dari `123` adalah `123 % 10 = 3`, dan sisanya adalah `Math.floor(123 / 10) = 12`.

</details>

---

### Tantangan 2 — Power (⭐⭐ Menengah)

**Instruksi:**
Buat fungsi rekursif `power(base, exp)` yang menghitung hasil perpangkatan tanpa menggunakan `Math.pow()` atau operator `**`. Fungsi harus menggunakan rekursif murni.

**Requirement:**
- Harus menggunakan rekursif
- Base case: `exp === 0` mengembalikan `1` (apapun dipangkatkan 0 adalah 1)
- Recursive case: `base^exp = base × base^(exp-1)`

**Contoh hasil yang diharapkan:**
```js
console.log(power(2, 0));  // → 1
console.log(power(2, 3));  // → 8  (2 × 2 × 2)
console.log(power(3, 4));  // → 81 (3 × 3 × 3 × 3)
```

<details>
<summary>💡 Hint (klik untuk lihat)</summary>

Definisi matematika perpangkatan sudah rekursif: `base^exp = base × base^(exp-1)`. Terjemahkan definisi itu langsung ke kode! Ingat juga bahwa `base^0 = 1` untuk semua nilai `base` — itulah base case-mu.

</details>

---

### Tantangan 3 — Flatten Nested Array (⭐⭐⭐ Menantang)

**Instruksi:**
Buat fungsi rekursif `flattenArray(arr)` yang meratakan (flatten) sebuah array bersarang menjadi array satu dimensi. Kedalaman sarangnya tidak diketahui — bisa satu level, bisa lebih.

**Requirement:**
- Harus menggunakan rekursif
- Jika elemen adalah array, telusuri isinya secara rekursif
- Jika elemen bukan array, langsung masukkan ke hasil
- Tidak boleh menggunakan `.flat()` bawaan JavaScript

**Contoh hasil yang diharapkan:**
```js
console.log(flattenArray([1, [2, 3], [4, [5, 6]]]));
// → [1, 2, 3, 4, 5, 6]

console.log(flattenArray([1, [2, [3, [4, [5]]]]]));
// → [1, 2, 3, 4, 5]

console.log(flattenArray([1, 2, 3]));
// → [1, 2, 3]
```

<details>
<summary>💡 Hint (klik untuk lihat)</summary>

Iterasi setiap elemen array. Untuk setiap elemen, tanyakan: "Apakah ini array?" (`Array.isArray(elemen)`). Jika ya, panggil `flattenArray` secara rekursif untuk elemen itu dan gabungkan hasilnya. Jika tidak, langsung tambahkan ke hasil. Kamu bisa menggunakan `.concat()` atau spread `[...]` untuk menggabungkan.

</details>

---

<a name="refleksi"></a>
## 💭 Pertanyaan Refleksi

Jawab pertanyaan-pertanyaan ini dalam pikiranmu (atau tuliskan!):

1. **Kenapa sebuah fungsi rekursif tanpa base case jauh lebih berbahaya daripada sebuah `for` loop tanpa kondisi berhenti?**
   *Hint: Pikirkan tentang sumber daya apa yang dikonsumsi oleh masing-masing — memori? waktu? Mana yang "meledak" lebih cepat?*

2. **Dalam Soal 1 dan Soal 2 di Quiz Tebak Output, fungsinya hampir identik — hanya posisi `console.log` yang berbeda. Tapi outputnya terbalik. Apa yang sebenarnya terjadi di Call Stack yang menyebabkan perbedaan ini?**
   *Hint: Pikirkan tentang kapan sebuah baris kode dieksekusi — saat "turun" ke dalam rekursif, atau saat "naik" kembali (unwinding)?*

3. **Kalau kamu menemukan sebuah bug di kode rekursifmu dan hasilnya tidak sesuai harapan, apa langkah pertama yang akan kamu lakukan untuk debugging?**
   *Hint: Pikirkan tentang cara menelusuri alur eksekusi satu langkah per satu langkah — ada alat atau teknik apa yang bisa membantu?*

4. **Kapan kamu akan memilih untuk TIDAK menggunakan rekursif, meskipun masalahnya secara konseptual bersifat rekursif?**
   *Hint: Pertimbangkan ukuran input, performa, dan batasan teknis runtime JavaScript.*

5. **Di dunia Functional Programming (FP), rekursif adalah "pengganti" loop. Menurutmu, apa trade-off terbesar dari pendekatan ini dibandingkan dengan menulis loop biasa?**
   *Hint: Tidak ada jawaban benar/salah — pertimbangkan keterbacaan, performa, risiko error, dan kemudahan debugging.*

---

<a name="jawaban"></a>
## ✅ Jawaban & Penjelasan

### 🤔 Quiz Tebak Output

**Soal 1:**
```js
function countdown(n) {
  if (n <= 0) return;
  console.log(n);
  countdown(n - 1);
}
countdown(3);
```
**Jawaban:** `3`, `2`, `1`

**Penjelasan:**
`console.log(n)` dijalankan **sebelum** pemanggilan rekursif. Artinya setiap kali fungsi dipanggil, angka langsung dicetak, baru kemudian masuk lebih dalam. Hasilnya urutan dari besar ke kecil: `3 → 2 → 1`.

---

**Soal 2:**
```js
function mystery(n) {
  if (n <= 0) return;
  mystery(n - 1);
  console.log(n);
}
mystery(3);
```
**Jawaban:** `1`, `2`, `3`

**Penjelasan:**
`console.log(n)` dijalankan **setelah** pemanggilan rekursif. Fungsi terus masuk ke dalam sampai base case (`n <= 0`), baru saat **unwinding** (naik kembali) angka mulai dicetak. Yang pertama selesai adalah `mystery(1)` → cetak `1`, lalu `mystery(2)` → cetak `2`, dst. Hasilnya terbalik: `1 → 2 → 3`.

---

**Soal 3:**
```js
function total(n) {
  if (n === 1) return 1;
  return n + total(n - 1);
}
console.log(total(4));
```
**Jawaban:** `10`

**Penjelasan:**
Proses: `total(4)` = `4 + total(3)` = `4 + 3 + total(2)` = `4 + 3 + 2 + total(1)` = `4 + 3 + 2 + 1` = `10`. Fungsi ini menjumlahkan semua angka dari `n` sampai `1`.

---

**Soal 4:**
```js
console.log(generateArray(0));   // → [0]
console.log(generateArray(-1));  // → []
```
**Jawaban:** `[0]` dan `[]`

**Penjelasan:**
`generateArray(0)`: `0 < 0` adalah `false`, jadi masuk ke recursive case: `[...generateArray(-1), 0]` = `[...[], 0]` = `[0]`. `generateArray(-1)`: `-1 < 0` adalah `true`, langsung return `[]`.

---

**Soal 5:**
```js
countDown(-3);
```
**Jawaban:** Tidak ada output, tapi **kode ini TIDAK aman**!

**Penjelasan:**
`-3 === 0` adalah `false`, jadi tidak masuk base case. Tapi setiap rekursif, `n` makin kecil (`-4`, `-5`, `-6`...) — semakin menjauh dari `0`, bukan mendekati. Ini akan menyebabkan **Stack Overflow**! Base case `n === 0` tidak aman untuk input negatif — seharusnya `n <= 0`.

---

### 💡 Quiz Apa yang Salah?

**Soal 1:**
**Masalahnya:** Tidak ada base case sama sekali! Fungsi `hitung` akan terus memanggil dirinya sendiri selamanya.
**Perbaikan:**
```js
// ✅ Kode yang benar
function hitung(n) {
  if (n <= 0) return 0; // 🛑 Base case wajib ada!
  return n + hitung(n - 1);
}
console.log(hitung(5)); // → 15
```
**Kenapa:** Tanpa base case, Call Stack terus terisi sampai meledak dengan `RangeError: Maximum call stack size exceeded`.

---

**Soal 2:**
**Masalahnya:** Base case `n === 0` menggunakan persamaan ketat (`===`). Input `-1` tidak pernah sama dengan `0`, sehingga rekursif berjalan terus ke arah negatif tanpa henti.
**Perbaikan:**
```js
// ✅ Kode yang benar
function factorial(n) {
  if (n <= 0) return 1; // Gunakan <= bukan ===
  return n * factorial(n - 1);
}
console.log(factorial(-1)); // → 1, aman!
```
**Kenapa:** `<=` menangkap `0` DAN semua angka negatif — tidak ada celah yang bisa "lolos" melewati base case.

---

**Soal 3:**
**Masalahnya:** `return reverseString(str.slice(1)) + str` menggabungkan sisa string (setelah karakter pertama) dengan **seluruh string `str`**, bukan hanya karakter pertamanya `str[0]`.
**Perbaikan:**
```js
// ✅ Kode yang benar
function reverseString(str) {
  if (str === "") return "";
  return reverseString(str.slice(1)) + str[0]; // Ambil hanya karakter pertama!
}
console.log(reverseString("abc")); // → "cba"
```
**Kenapa:** Untuk membalik string, kita ambil karakter pertama (`str[0]`) dan taruh di akhir hasil rekursif dari sisa string (`str.slice(1)`). Jika `str` digunakan, seluruh string yang terus bertambah panjang akan digabungkan — menghasilkan output yang salah.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 05 — Perbandingan Konsep](./05-perbandingan-konsep_rekursif.md)**
- **📋 [Lihat Ringkasan Konsep →](../ringkasan-konsep.md)**
