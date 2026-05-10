# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Langsung menyadari bahwa langkah pertama adalah **menjumlahkan** dulu, baru **mengonversi** — tidak terjebak untuk mengonversi ke biner terlebih dahulu
- Langsung memanfaatkan method bawaan JavaScript `.toString(2)` — tidak membuang waktu membuat logika konversi biner secara manual (membagi 2 berulang kali)
- Mampu menyederhanakan dari function declaration (4 baris) ke arrow function one-liner (1 baris)

---

## ❌ Apa yang Salah di Awal?

Tidak ada error — kode langsung lulus sejak percobaan pertama. Namun ada poin menarik yang perlu diperhatikan:

| Hal | Pendekatan Awal | Yang Lebih Baik |
|-----|----------------|-----------------|
| Variabel `sum` | Menyimpan `a + b` di variabel terpisah | Bisa langsung di-chain: `(a + b).toString(2)` |
| Proteksi float | Tidak ada penanganan angka pecahan | Bisa tambahkan `Math.trunc()` untuk keamanan |

> ⚠️ **Insight penting**: Meskipun soal ini hanya menggunakan bilangan bulat, selalu pikirkan: "Bagaimana jika inputnya tidak sesuai ekspektasi?" Kebiasaan berpikir *defensif* ini sangat berharga di dunia nyata.

---

## 🌟 Best Practice dari Komunitas

### Solusi 1 — Identik dengan solusi kita (paling populer)

```javascript
function addBinary(a, b) {
  return (a + b).toString(2);
}
```

### Solusi 2 — Arrow function one-liner (sama dengan solusi final kita)

```javascript
const addBinary = (a, b) => (a + b).toString(2);
```

### Solusi 3 — Dengan `Math.trunc()` (paling defensif)

```javascript
const addBinary = (a, b) => Math.trunc(a + b).toString(2);
```

**Perbandingan ketiga solusi:**

| Aspek | Solusi 1 & 2 | Solusi 3 (`Math.trunc`) |
|-------|:-----------:|:-----:|
| Gaya | Function declaration / Arrow | Arrow one-liner |
| Proteksi float | ❌ Tidak ada | ✅ Membuang desimal |
| Keringkasan | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ (sedikit lebih panjang) |
| Keamanan | Cukup untuk soal ini | Lebih robust untuk kasus nyata |

---

## 🔬 Bedah Perbedaan Kunci

### 1️⃣ `toString(2)` vs konversi manual — Kenapa pakai built-in?

```javascript
// ✅ Menggunakan built-in (1 baris)
(14).toString(2) // → "1110"

// ❌ Konversi manual (banyak baris, rentan error)
function toBinary(n) {
  if (n === 0) return "0";
  let result = "";
  while (n > 0) {
    result = (n % 2) + result;
    n = Math.floor(n / 2);
  }
  return result;
}
```

> 💡 **Kesimpulan**: Jangan *reinvent the wheel* — jika JavaScript sudah menyediakan tool yang tepat, gunakanlah. Kecuali soal secara eksplisit meminta implementasi manual.

### 2️⃣ `Math.trunc()` vs `Math.floor()` — Apa bedanya?

```javascript
// Untuk angka positif → hasilnya SAMA
Math.trunc(14.7)   // → 14
Math.floor(14.7)   // → 14

// Untuk angka negatif → BERBEDA!
Math.trunc(-14.7)  // → -14 (memotong desimal)
Math.floor(-14.7)  // → -15 (membulatkan ke bawah)
```

> 💡 **Untuk soal ini**: Keduanya sama karena inputnya bilangan bulat positif. Tapi `Math.trunc()` secara semantik lebih tepat — niatnya adalah "buang desimal", bukan "bulatkan ke bawah".

### 3️⃣ `.toString(radix)` — Kekuatan tersembunyi

```javascript
(255).toString(2)   // → "11111111"  (biner)
(255).toString(8)   // → "377"       (oktal)
(255).toString(16)  // → "ff"        (heksadesimal)
(255).toString(36)  // → "73"        (basis 36 — max)
```

> 💡 Method ini menerima `radix` dari **2 sampai 36**. Sangat berguna untuk soal konversi basis bilangan!

---

## 📚 Konsep yang Diperkuat

| Konsep | Penjelasan |
|--------|-----------|
| `Number.prototype.toString(radix)` | Mengubah angka menjadi string dengan basis tertentu (2–36). Default radix = 10 |
| `Math.trunc()` | Membuang angka di belakang koma tanpa membulatkan. `Math.trunc(14.9)` → `14` |
| Operator Precedence | `.` (property access) punya prioritas lebih tinggi dari `+`. Makanya `(a + b).toString(2)` butuh tanda kurung |
| Arrow Function | `const fn = (a, b) => ekspresi` — ringkas, implicit return jika tanpa `{}` |

---

## 🔗 Keterkaitan dengan Materi Lain

- Berkaitan dengan: **Type Conversion** — mengubah Number ke String dengan basis tertentu
- Berkaitan dengan: **Numbers & Math Methods** — eksplorasi `Math.trunc()`, `Math.floor()`
- Berkaitan dengan: **Operator Precedence** — memahami urutan eksekusi operator

---

## 📝 Catatan untuk Masa Depan

> *Pola yang wajib diingat untuk soal serupa:*

- [x] `.toString(radix)` adalah senjata utama untuk konversi basis bilangan di JavaScript
- [x] Selalu pakai tanda kurung `(a + b)` saat ingin chaining method setelah operasi aritmatika
- [ ] Perhatikan edge-case bilangan desimal — biasakan memikirkan `Math.trunc()` atau `Math.floor()`
- [ ] Jangan *reinvent the wheel* — gunakan built-in method sebelum menulis logika manual
- [ ] Pola `angka.toString(2)` sering keluar di soal algoritma bertema konversi basis

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
