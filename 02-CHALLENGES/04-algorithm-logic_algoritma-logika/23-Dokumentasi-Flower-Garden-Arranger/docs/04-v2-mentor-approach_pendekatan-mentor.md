# ⚡ V2 — Mentor Declarative Approach — Pendekatan Deklaratif Mentor

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array.from%20|%20Declarative%20Style-blue?style=for-the-badge)
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

Versi ini menggunakan gaya **declarative** — mendeskripsikan *"apa yang kita mau"* alih-alih *"bagaimana caranya step by step"*. Memanfaatkan `Array.from()` dan arrow function.

```javascript
const arrangeFlowerGarden = (flowerNames, gridSize) => {
  // 1. Sortir bunga tanpa merusak data asli
  const sorted = [...flowerNames].sort((a, b) => a.length - b.length);

  // 2. Balik bunga terpanjang jika ada
  if (sorted.length > 0) {
    const lastIdx = sorted.length - 1;
    sorted[lastIdx] = [...sorted[lastIdx]].reverse().join('');
  }

  // 3. Buat Grid menggunakan Array.from
  return Array.from({ length: gridSize }, (_, row) =>
    Array.from({ length: gridSize }, (_, col) => {
      const index = row * gridSize + col;
      return sorted[index] || 'Empty';
    })
  );
};
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

```javascript
const sorted = [...flowerNames].sort((a, b) => a.length - b.length);
```
📦 **Salin & urutkan.** Sama persis dengan V1 — spread operator untuk immutability, sort ascending berdasarkan panjang nama.

---

```javascript
if (sorted.length > 0) {
  const lastIdx = sorted.length - 1;
  sorted[lastIdx] = [...sorted[lastIdx]].reverse().join('');
}
```
🔄 **Balik bunga terpanjang.** Perbedaan kecil: menggunakan `[...string]` (spread string) alih-alih `.split('')` untuk memecah string menjadi array karakter. Keduanya menghasilkan output yang sama.

---

```javascript
return Array.from({ length: gridSize }, (_, row) =>
  Array.from({ length: gridSize }, (_, col) => {
    const index = row * gridSize + col;
    return sorted[index] || 'Empty';
  })
);
```
🏗️ **Buat grid sekaligus return.** `Array.from({ length: N }, callback)` membuat array berukuran N, di mana setiap elemen diisi oleh callback. Parameter `_` adalah elemen (tidak dipakai), dan `row`/`col` adalah index-nya.

---

```javascript
return sorted[index] || 'Empty';
```
🎯 **Short-circuit evaluation.** Jika `sorted[index]` ada (truthy), gunakan itu. Jika `undefined` (index sudah lewat), fallback ke `'Empty'`. Ini menggantikan `if...else` dalam satu baris.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### Apa itu `Array.from()`?

`Array.from()` membuat array baru dari objek "array-like". Ketika diberi `{ length: N }`, dia membuat array berukuran N. Callback di parameter kedua menentukan isi tiap elemen.

```javascript
// Contoh sederhana:
Array.from({ length: 3 }, (_, i) => i * 2);
// Hasil: [0, 2, 4]
```

> 💡 **Analogi:** "Kalau `for` loop itu seperti kamu memasang ubin satu per satu, `Array.from` itu seperti memesan cetakan ubin — kamu bilang ukurannya berapa dan bentuknya seperti apa, langsung jadi."

### Apa itu Short-Circuit `||`?

Operator `||` (OR) mengembalikan operand kiri jika truthy, atau operand kanan jika kiri falsy. `undefined` bersifat falsy, jadi `sorted[99] || 'Empty'` akan menghasilkan `'Empty'`.

```
sorted[0] || 'Empty'  →  "Rose"   (truthy, pakai kiri)
sorted[99] || 'Empty' →  "Empty"  (undefined = falsy, pakai kanan)
```

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi:
   Input: flowerNames = ["Rose", "Sunflower", "Lily", "Tulip"], gridSize = 3

   STEP 1 — Sort:
     sorted = ["Rose", "Lily", "Tulip", "Sunflower"]

   STEP 2 — Reverse index terakhir:
     sorted[3] = [...."Sunflower"].reverse().join('') = "rewoflnuS"
     sorted = ["Rose", "Lily", "Tulip", "rewoflnuS"]

   STEP 3 — Array.from membangun grid:

   Array.from (row=0):
     Array.from (col=0) → index=0 → sorted[0]="Rose"       || 'Empty' → "Rose"
     Array.from (col=1) → index=1 → sorted[1]="Lily"       || 'Empty' → "Lily"
     Array.from (col=2) → index=2 → sorted[2]="Tulip"      || 'Empty' → "Tulip"
     → ["Rose", "Lily", "Tulip"]

   Array.from (row=1):
     Array.from (col=0) → index=3 → sorted[3]="rewoflnuS"  || 'Empty' → "rewoflnuS"
     Array.from (col=1) → index=4 → sorted[4]=undefined     || 'Empty' → "Empty"
     Array.from (col=2) → index=5 → sorted[5]=undefined     || 'Empty' → "Empty"
     → ["rewoflnuS", "Empty", "Empty"]

   Array.from (row=2):
     Array.from (col=0) → index=6 → undefined || 'Empty' → "Empty"
     Array.from (col=1) → index=7 → undefined || 'Empty' → "Empty"
     Array.from (col=2) → index=8 → undefined || 'Empty' → "Empty"
     → ["Empty", "Empty", "Empty"]

   Output:
   [
     ["Rose", "Lily", "Tulip"],
     ["rewoflnuS", "Empty", "Empty"],
     ["Empty", "Empty", "Empty"]
   ] ✅
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Kenapa kode ini lebih pendek?**
> Karena `Array.from` menggabungkan pembuatan array + pengisian dalam satu ekspresi. Tidak perlu variabel `garden`, `row`, atau `.push()` manual. Ini mengurangi jumlah variabel yang harus dilacak di kepala.

> **Apakah `[...string]` dan `string.split('')` sama?**
> Untuk sebagian besar kasus — ya. Tapi `[...string]` lebih aman untuk Unicode (emoji, aksara non-Latin) karena menggunakan iterator, sedangkan `.split('')` memecah berdasarkan code unit yang bisa memotong karakter multi-byte.

---

<a name="evaluasi"></a>
## ⚖️ Evaluasi Versi Ini

| Kelebihan | Kekurangan |
|-----------|-----------|
| Kode lebih ringkas (tanpa variabel perantara) | Kurang familiar bagi pemula |
| Gaya modern & idiomatik JavaScript | `Array.from` butuh waktu untuk dipahami |
| Short-circuit `\|\|` menghilangkan `if...else` | Debug lebih sulit karena tidak ada step terpisah |

> 💡 **Cocok digunakan ketika** kamu sudah memahami `Array.from` dan ingin kode yang lebih ringkas serta mudah di-maintain.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03 — V1 User Approach](./03-v1-user-approach_pendekatan-user.md)**
- **📖 [Lanjut ke Part 05 — V3 Coddy Approach →](./05-v3-coddy-approach_pendekatan-coddy.md)**
