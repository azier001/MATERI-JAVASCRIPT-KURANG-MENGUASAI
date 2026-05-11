# ➕ Beginner Series #3 Sum of Numbers — `getSum`

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topics](https://img.shields.io/badge/Topics-Algorithm%20Logic%20|%20Math-blue?style=for-the-badge)

> 📝 *Dokumentasi pribadi ini dibuat untuk membantu saya memahami dan mengingat
> kembali konsep-konsep yang dipelajari saat mengerjakan challenge Sum of Numbers.*

---

## 🧩 Deskripsi Challenge

Diberikan dua bilangan bulat `a` dan `b` (bisa positif atau negatif), fungsi `getSum` harus mengembalikan **jumlah dari semua bilangan bulat di antara keduanya** (termasuk `a` dan `b` itu sendiri). Jika kedua angka sama, kembalikan salah satunya.

```
Input: getSum(-1, 2)
  → Tentukan deret: -1, 0, 1, 2
  → Jumlahkan: -1 + 0 + 1 + 2
Output: 2 ✅
```

> ⚠️ **Catatan penting:** Urutan `a` dan `b` tidak dijamin! `a` bisa lebih besar, lebih kecil, atau sama dengan `b`.

---

## 📤 Expected Output

| Input `(a, b)` | Deret Angka | Perhitungan | Output |
|:---:|:---|:---|:---:|
| `(1, 0)` | 0, 1 | 0 + 1 | `1` |
| `(1, 2)` | 1, 2 | 1 + 2 | `3` |
| `(1, 1)` | 1 | — | `1` |
| `(-1, 0)` | -1, 0 | -1 + 0 | `-1` |
| `(-1, 2)` | -1, 0, 1, 2 | -1 + 0 + 1 + 2 | `2` |
| `(5, 2)` | 2, 3, 4, 5 | 2 + 3 + 4 + 5 | `14` |

---

## ▶️ Coba Langsung

```js
console.log(getSum(1, 0));
// Output: 1
```

```js
console.log(getSum(-1, 2));
// Output: 2
```

```js
console.log(getSum(5, 2));
// Output: 14
```

```js
console.log(getSum(1, 1));
// Output: 1
```

---

## 💡 Konsep Kunci

- **Math.min() / Math.max()** — menentukan batas bawah dan atas tanpa `if-else`
- **Math.abs()** — mengambil nilai absolut sehingga tidak perlu tahu mana yang lebih besar
- **Rumus Gauss (Deret Aritmatika)** — menjumlahkan deret angka berurutan tanpa loop: `(count × pairValue) / 2`
- **Rekursi** — teknik fungsi memanggil dirinya sendiri sebagai alternatif dari loop
- **const vs let** — gunakan `const` untuk variabel yang tidak akan berubah nilainya

---

## 🏆 Solusi Rekomendasi

```js
function getSum(a, b) {
  return (Math.abs(a - b) + 1) * (a + b) / 2;
}
```

> ✅ Versi ini dipilih karena paling efisien (O(1) — tanpa loop), paling ringkas (1 baris inti), dan tidak membutuhkan variabel tambahan. `Math.abs` menghilangkan kebutuhan untuk menentukan min/max.

---

## 📊 Quick Comparison: Semua Versi

| Versi | Pendekatan | Keunggulan |
|:---|:---|:---|
| **V1 — If-Else Loop** | `if-else` manual + `for` loop | Paling mudah dipahami pemula |
| **V2 — Math.min/max Loop** | `Math.min/max` + `for` loop | Lebih ringkas, aman dengan `const` |
| **V3 — Gauss Min Max** | `Math.min/max` + Rumus Gauss | Cepat (O(1)) + readable |
| **V4 — Gauss Math.abs** ⭐ | `Math.abs` + Rumus Gauss | Paling efisien & ringkas |
| **V5 — Recursive** | Fungsi memanggil diri sendiri | Melatih konsep rekursi |

---

## 📂 Struktur Dokumentasi

| File | Topik |
|:---|:---|
| 📄 [01-challenge-overview](./docs/01-challenge-overview.md) | Gambaran challenge, aturan, contoh I/O |
| 📄 [02-problem-solving-approach](./docs/02-problem-solving-approach.md) | Alur berpikir & pseudocode |
| 📄 [03-version-v1-loop](./docs/03-version-v1-loop.md) | V1 — If-Else + For Loop |
| 📄 [04-version-v2-math-min-max](./docs/04-version-v2-math-min-max.md) | V2 — Math.min/max + Loop |
| 📄 [05-version-v3-gauss-min-max](./docs/05-version-v3-gauss-min-max.md) | V3 — Rumus Gauss + Min/Max |
| 📄 [06-version-v4-gauss-math-abs](./docs/06-version-v4-gauss-math-abs.md) | V4 — Rumus Gauss + Math.abs |
| 📄 [07-version-v5-recursive](./docs/07-version-v5-recursive.md) | V5 — Rekursif |
| 📄 [08-comparison](./docs/08-comparison.md) | Perbandingan semua versi |
| 📄 [09-insight](./docs/09-insight.md) | Insight: Loop vs Rumus vs Rekursi |

---

## 🎯 Learning Outcomes

Setelah selesai, kamu akan bisa:
- ✅ Menentukan batas bawah/atas dari dua angka yang urutannya tidak dijamin
- ✅ Menggunakan `Math.min()`, `Math.max()`, dan `Math.abs()` untuk manipulasi angka
- ✅ Menerapkan Rumus Gauss (Deret Aritmatika) untuk menghitung jumlah deret secara instan
- ✅ Memahami konsep rekursi: base case, recursive step, dan call stack
- ✅ Membedakan kapan harus pakai loop, rumus matematika, atau rekursi
- ✅ Menerapkan naming convention yang bersih (`const` vs `let`, camelCase vs PascalCase)

---

<div align="center">

📚 [Mulai dari Part 1 — Challenge Overview →](./docs/01-challenge-overview.md)

[Part 01](./docs/01-challenge-overview.md) • [Part 02](./docs/02-problem-solving-approach.md) • [Part 03](./docs/03-version-v1-loop.md) • [Part 04](./docs/04-version-v2-math-min-max.md) • [Part 05](./docs/05-version-v3-gauss-min-max.md) • [Part 06](./docs/06-version-v4-gauss-math-abs.md) • [Part 07](./docs/07-version-v5-recursive.md) • [Part 08](./docs/08-comparison.md) • [Part 09](./docs/09-insight.md)

Made with ❤️ for learners — **Happy Learning! 🚀**

</div>
