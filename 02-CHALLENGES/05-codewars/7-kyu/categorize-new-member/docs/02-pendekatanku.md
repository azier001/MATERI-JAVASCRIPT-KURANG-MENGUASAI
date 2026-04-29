# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

Soal ini meminta kita **mengubah** setiap pasangan `[age, handicap]` menjadi string `"Senior"` atau `"Open"` — artinya panjang input dan output **selalu sama**.

Dua konsep langsung terlintas:

1. **Iterasi** — kita perlu memeriksa setiap member satu per satu
2. **Transformasi** — setiap elemen berubah bentuk, bukan disaring atau dijumlah

Kondisi `Senior` terdiri dari **dua syarat sekaligus** yang harus terpenuhi:
- Umur minimal 55 (`age >= 55`)
- Handicap lebih dari 7 (`handicap > 7`)

Jika salah satu saja tidak terpenuhi → otomatis `"Open"`.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Terima array 2D → tiap sub-array adalah [age, handicap]
2. Buat array hasil (result) yang kosong
3. Untuk setiap member di dalam data:
   a. Ambil nilai age dan handicap dari sub-array
   b. Cek: apakah age >= 55 DAN handicap > 7?
      → Ya  : tambahkan "Senior" ke result
      → Tidak: tambahkan "Open"  ke result
4. Kembalikan array result
```

---

## 🔄 Percobaan Pertama — Imperatif (`for...of`)

Pendekatan paling langsung: iterasi manual dengan `for...of` dan `Array destructuring`.

```javascript
function openOrSenior(data) {
  const result = [];

  for (const item of data) {
    const [year, handicap] = item; // destructuring sub-array

    if (year >= 55 && handicap > 7) {
      result.push('Senior');
    } else {
      result.push('Open');
    }
  }

  return result;
}
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Sangat eksplisit |
| Keringkasan | ⭐⭐⭐ Cukup panjang |
| Pendekatan | Imperatif — "bagaimana caranya?" |

> 💡 **Catatan**: `const [year, handicap] = item` adalah *Array Destructuring*. Ini memisahkan elemen index-0 ke variabel `year` dan index-1 ke variabel `handicap` dalam satu baris.

---

## 🔄 Percobaan Kedua — Deklaratif (`.map()`)

Karena polanya adalah **transformasi 1-ke-1**, `.map()` adalah alat yang tepat.

```javascript
const openOrSenior = (data) => {
  return data.map((item) => {
    const [year, handicap] = item;

    return year >= 55 && handicap > 7 ? 'Senior' : 'Open';
  });
};
```

**Hasil:** ✅ Lulus

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ Masih jelas, lebih deklaratif |
| Keringkasan | ⭐⭐⭐⭐ Lebih ringkas dari V1 |
| Pendekatan | Deklaratif — "apa yang diinginkan?" |

> 💡 **Kenapa `.map()` lebih tepat dari `for...of` di sini?**  
> `.map()` dirancang khusus untuk **transformasi** (1 elemen → 1 hasil baru). Kita tidak perlu mengelola array `result` secara manual — `.map()` sudah otomatis mengembalikan array baru. Kode lebih ekspresif dan niatnya lebih jelas.

---

## ✅ Solusi Final — Destructuring langsung di parameter

Perbaikan dari V2: destructuring dipindah langsung ke **parameter callback** `.map()`, menghilangkan satu baris ekstra.

```javascript
const openOrSenior = (data) => {
  return data.map(([age, handicap]) =>
    age >= 55 && handicap > 7 ? 'Senior' : 'Open'
  );
};
```

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐ Sangat ringkas, butuh paham destructuring |
| Keringkasan | ⭐⭐⭐⭐⭐ Minimal dan elegan |
| Pendekatan | Deklaratif + Functional |

---

## 🔍 Penjelasan Baris per Baris (Solusi Final)

```javascript
const openOrSenior = (data) => {
//    ^^^^^^^^^^^^^^^^^^^^^^^^^^^
//    Arrow function menerima parameter 'data' (array 2D)

  return data.map(([age, handicap]) =>
//              ^^^^^^^^^^^^^^^^^^^^
//              .map() iterasi setiap sub-array
//              ([age, handicap]) → destructuring langsung di parameter:
//                  'age'      = elemen index-0 dari sub-array
//                  'handicap' = elemen index-1 dari sub-array

    age >= 55 && handicap > 7 ? 'Senior' : 'Open'
//  ^^^^^^^^^^   ^^^^^^^^^^^^^
//  Syarat 1:    Syarat 2:
//  umur min 55  handicap di atas 7
//
//  Keduanya harus TRUE (&&) agar menjadi 'Senior'
//  Jika salah satu FALSE → 'Open'
  );
};
```

---

## 🧪 Verifikasi Manual

Kita telusuri setiap member dari contoh soal:

| Member | Age | Handicap | `age >= 55`? | `handicap > 7`? | Hasil |
|--------|-----|----------|:------------:|:---------------:|-------|
| [18, 20] | 18 | 20 | ❌ | ✅ | **Open** |
| [45, 2]  | 45 | 2  | ❌ | ❌ | **Open** |
| [61, 12] | 61 | 12 | ✅ | ✅ | **Senior** |
| [37, 6]  | 37 | 6  | ❌ | ❌ | **Open** |
| [21, 21] | 21 | 21 | ❌ | ✅ | **Open** |
| [78, 9]  | 78 | 9  | ✅ | ✅ | **Senior** |

```javascript
const data = [[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]];
console.log(openOrSenior(data));
// → ["Open", "Open", "Senior", "Open", "Open", "Senior"] ✅
```

---

## 📈 Evolusi Solusi

```
V1 (Imperatif)        V2 (Deklaratif)       V3 / Final
─────────────         ─────────────         ─────────────
for...of +            .map() +              .map() +
result.push()    →    destructuring    →    destructuring
                      di dalam body         langsung di param
```

Setiap iterasi menghilangkan satu lapisan "bising" (noise) dan membuat **niat kode makin terlihat jelas**.

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
