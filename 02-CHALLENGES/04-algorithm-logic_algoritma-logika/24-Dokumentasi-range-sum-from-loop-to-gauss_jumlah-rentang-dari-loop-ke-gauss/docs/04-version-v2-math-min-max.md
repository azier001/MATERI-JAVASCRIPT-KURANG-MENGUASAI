# ⚡ V2 — Math.min/max Loop — Perulangan dengan Built-in

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Algorithm%20Logic-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V2-purple?style=for-the-badge)

---

## 📑 Daftar Isi

- 💻 [Kode Lengkap](#kode)
- 🔍 [Penjelasan Baris per Baris](#penjelasan)
- 🧠 [Konsep Kunci](#konsep)
- 🎞️ [Simulasi Langkah demi Langkah](#simulasi)
- 💡 [Insight Penting](#insight)
- ⚖️ [Evaluasi Versi Ini](#evaluasi)

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini adalah refactoring dari V1 — blok `if-else` yang panjang diganti dengan `Math.min()` dan `Math.max()` agar lebih ringkas.

```js
const getSum = (a, b) => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);

  let sum = 0;

  for (let i = min; i <= max; i++) {
    sum += i;
  }

  return sum;
};
```

### 🎨 Visualisasi ASCII

```text
Target: getSum(-1, 2)

[Start]
  |
  V
  a = -1, b = 2
  min = Math.min(-1, 2) = -1
  max = Math.max(-1, 2) =  2
  |
  V
  sum = 0
  |
  V
  i = -1 → (i <= 2? ✅) → sum = 0 + (-1) = -1
  i =  0 → (i <= 2? ✅) → sum = -1 + 0  = -1
  i =  1 → (i <= 2? ✅) → sum = -1 + 1  =  0
  i =  2 → (i <= 2? ✅) → sum =  0 + 2  =  2
  i =  3 → (i <= 2? ❌ STOP!)
  |
  V
  return 2 ✅
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

```js
const getSum = (a, b) => {
```
🏗️ Membuat fungsi `getSum` menggunakan Arrow Function.

---

```js
const min = Math.min(a, b);
const max = Math.max(a, b);
```
🔀 Menentukan batas bawah dan batas atas secara instan menggunakan built-in JavaScript. `Math.min()` otomatis memilih angka terkecil, `Math.max()` otomatis memilih angka terbesar. Menggunakan `const` karena nilai `min` dan `max` tidak akan berubah setelah dihitung.

---

```js
let sum = 0;
```
📦 Membuat variabel penampung hasil penjumlahan, dimulai dari nol.

---

```js
for (let i = min; i <= max; i++) {
  sum += i;
}
```
🔁 Perulangan dari angka terkecil sampai terbesar (inklusif). Setiap angka `i` ditambahkan ke `sum`.

---

```js
return sum;
```
📤 Mengembalikan total penjumlahan.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Kenapa pakai `Math.min()` / `Math.max()` dan bukan `if-else`?

Keduanya melakukan hal yang sama — menentukan mana angka terkecil dan terbesar. Tapi `Math.min/max` jauh lebih ringkas:

| Aspek | V1 (`if-else`) | V2 (`Math.min/max`) |
|:---:|:---:|:---:|
| Jumlah baris | 8 baris | 2 baris |
| Readability | Eksplisit tapi panjang | Singkat dan langsung jelas |
| Risiko bug | Bisa tertukar `start`/`end` | Hampir mustahil salah |

> 💡 **Analogi:** "Kalau disuruh cari buku paling tebal di rak, kamu bisa bandingkan satu-satu (if-else), atau langsung minta pustakawan (Math.max) yang sudah hafal rak bukunya."

### Kenapa `const` dan bukan `let`?

Nilai `min` dan `max` tidak akan pernah berubah setelah dihitung. Menggunakan `const` memberikan sinyal ke pembaca kode: *"Variabel ini suci, jangan sentuh!"* — dan JavaScript akan melempar error jika ada yang coba mengubahnya.

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi: getSum(5, 2)

  a = 5, b = 2
  min = Math.min(5, 2) = 2
  max = Math.max(5, 2) = 5

  sum = 0

  Iterasi 1: i = 2
    sum = 0 + 2 = 2
    State: sum = 2

  Iterasi 2: i = 3
    sum = 2 + 3 = 5
    State: sum = 5

  Iterasi 3: i = 4
    sum = 5 + 4 = 9
    State: sum = 9

  Iterasi 4: i = 5
    sum = 9 + 5 = 14
    State: sum = 14

  i = 6 → (6 <= 5?) ❌ STOP

  Output: 14
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Apa yang berubah dari V1 ke V2?**
> Hanya cara menentukan batas bawah dan atas. Logika penjumlahannya (loop) tetap persis sama. Ini adalah contoh **refactoring** — memperbaiki struktur kode tanpa mengubah perilakunya.

> **Apakah V2 lebih cepat dari V1?**
> Secara performa, hampir tidak ada bedanya. Keduanya tetap O(n) karena masih menggunakan `for` loop. Perbedaannya murni di **readability** dan **jumlah baris kode**.

---

<a name="evaluasi"></a>
## ⚖️ Evaluasi Versi Ini

| Kelebihan | Kekurangan |
|-----------|------------|
| Lebih ringkas dari V1 (tanpa `if-else`) | Masih lambat untuk rentang sangat besar (O(n)) |
| `const` mencegah perubahan variabel tak disengaja | Masih butuh loop untuk menjumlahkan |
| Hampir mustahil salah menentukan min/max | — |

> 💡 **Cocok digunakan ketika** kamu ingin kode yang bersih dan readable tanpa mengorbankan kejelasan logika. Ini adalah "sweet spot" antara eksplisit (V1) dan matematis (V3).

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03 — V1 If-Else Loop](./03-version-v1-loop.md)**
- **📖 [Lanjut ke Part 05 — V3 Gauss Min Max →](./05-version-v3-gauss-min-max.md)**
