# 📐 Pascal Triangle Pattern — `pascalTriangle`

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topics](https://img.shields.io/badge/Topics-Nested%20Loop%20|%20Array%20|%20Math-blue?style=for-the-badge)
![Versions](https://img.shields.io/badge/Versions-3-orange?style=for-the-badge)

> 📝 *Dokumentasi pribadi ini dibuat untuk membantu saya memahami dan mengingat
> kembali konsep-konsep yang dipelajari saat mengerjakan challenge Pola Segitiga Pascal.*

---

## 🧩 Deskripsi Challenge

Buat fungsi `pascalTriangle(num)` yang menerima satu parameter integer dan mengembalikan string pola piramida Segitiga Pascal. Setiap angka di tengah baris adalah penjumlahan dari dua angka di atasnya, dan piramida diratakan ke tengah menggunakan spasi pendorong.

```
Input: pascalTriangle(5)

Output:
    1
   1 1
  1 2 1
 1 3 3 1
1 4 6 4 1
```

> ⚠️ **Catatan penting:** Challenge ini menguji kemampuan **nested loop**, pemahaman **Array** sebagai penampung data sementara, dan opsional **rumus Matematika Kombinatorial** (Binomial Coefficient).

---

## 📤 Expected Output

```javascript
console.log(pascalTriangle(1));
// Output:
// 1

console.log(pascalTriangle(3));
// Output:
//   1
//  1 1
// 1 2 1

console.log(pascalTriangle(5));
// Output:
//     1
//    1 1
//   1 2 1
//  1 3 3 1
// 1 4 6 4 1
```

---

## 📚 Dokumentasi

### 📑 Daftar Isi

| No | File | Deskripsi |
|----|------|-----------| 
| 📋 | [01 — Challenge Overview](./docs/01-challenge-overview_gambaran-challenge.md) | Deskripsi soal, aturan, contoh I/O, pemahaman awal |
| 🧠 | [02 — Problem Solving Approach](./docs/02-problem-solving-approach_alur-berpikir.md) | Tabel breakdown pola, penemuan rumus, kamus variabel, blueprint |
| 🔧 | [03 — V1 Nested Loop Array](./docs/03-v1-nested-loop-array_pendekatan-array-loop-bersarang.md) | Solusi pertama: step-by-step building + simulasi + gotchas |
| ✨ | [04 — V2 Declarative Array](./docs/04-v2-declarative-array-repeat_pendekatan-array-deklaratif.md) | Refactoring: `.repeat()` + mental model Imperative vs Declarative |
| 🪄 | [05 — V3 Math Combinatorial](./docs/05-v3-math-combinatorial_pendekatan-matematika-kombinatorial.md) | Pendekatan tanpa Array: mantra "Kali Sisa, Bagi Maju" |
| 📊 | [06 — All Versions Comparison](./docs/06-all-versions-comparison_perbandingan-semua-versi.md) | Perbandingan 3 versi + kode side-by-side + rekomendasi |
| 💡 | [07 — Insight: Array vs Combinatorial](./docs/07-insight-array-vs-combinatorial_wawasan-array-vs-kombinatorial.md) | Deep dive filosofi Simpan vs Hitung + aplikasi dunia nyata |
| 📋 | [Ringkasan Algoritma](./ringkasan-algoritma-semua-versi.md) | Cheat sheet semua versi untuk copy-paste cepat |

---

## ⭐ Versi Rekomendasi

```javascript
// ✨ V2 — Declarative Array + .repeat() (RECOMMENDED)
const pascalTriangle = (num) => {
  let pattern = '';
  let prevRow = [];

  for (let row = 1; row <= num; row++) {
    pattern += ' '.repeat(num - row);

    let currRow = [];
    if (row === 1) {
      currRow.push(1);
    } else {
      currRow.push(1);
      for (let col = 0; col < prevRow.length - 1; col++) {
        currRow.push(prevRow[col] + prevRow[col + 1]);
      }
      currRow.push(1);
    }

    pattern += currRow.join(' ') + '\n';
    prevRow = currRow;
  }

  return pattern;
};
```

---

<div align="center">
Made with ❤️ for learning JavaScript
</div>
