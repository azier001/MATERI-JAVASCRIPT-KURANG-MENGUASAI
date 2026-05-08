# 🧠 02 — Metodologi & Pendekatan

![Level](https://img.shields.io/badge/Level-8%20kyu-blue)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Dekonstruksi Masalah (Mental Model)

Tantangan ini terdiri dari **satu operasi utama** yang memiliki dua sub-komponen:

1. **Traversal Sekuensial** — Mengunjungi setiap elemen di dalam array satu per satu.
2. **Evaluasi Kondisional** — Pada setiap elemen, memeriksa apakah nilainya `true` secara ketat (`===`), dan menambahkan counter jika memenuhi kriteria.

Tantangan tersembunyi di soal ini bukan pada logika counting-nya (yang sederhana), melainkan pada **penanganan bad values** — array bisa berisi `null` atau `undefined` yang jika tidak ditangani dengan benar bisa menyebabkan *false positive* atau error.

> 💡 **Insight Kunci:** Penggunaan `=== true` (strict equality) secara elegan menyelesaikan kedua masalah sekaligus — hanya menghitung `true` DAN otomatis mengabaikan `null`, `undefined`, dan `false` tanpa perlu pengecekan terpisah.

---

## 🗺️ Algoritma Dasar (Pseudocode)

```text
START
  RECEIVE arrayOfSheep
  SET counter = 0
  
  FOR EACH element IN arrayOfSheep
    IF element IS STRICTLY EQUAL TO true THEN
      INCREMENT counter BY 1
    END IF
  END FOR
  
  RETURN counter
END
```

---

## 🎨 Visualisasi Alur: Linear Scan & Count

```text
  Input: [true, false, null, true, undefined, true]
           │      │      │     │       │        │
           ▼      ▼      ▼     ▼       ▼        ▼
  === true? ✅     ❌     ❌    ✅      ❌       ✅
           │                    │                │
       count=1              count=2          count=3
                                                 │
                                          return 3 ✅
```

> 💡 **Prinsip Kunci:** Operator `===` (strict equality) membandingkan **nilai DAN tipe data** secara bersamaan. Ini berarti `null === true` → `false`, `undefined === true` → `false`, dan bahkan `1 === true` → `false`. Hanya `true === true` yang menghasilkan `true`.

---

## 🔄 Percobaan Pertama (Langsung Berhasil)

```javascript
// Attempt #1 — For Loop Tradisional + Strict Equality
function countSheeps(sheep) {
  let count = 0;

  for (let i = 0; i < sheep.length; i++) {
    if (sheep[i] === true) {
      count++;
    }
  }

  return count;
}
```

**Hasil:** ✅ Lulus di percobaan pertama  
**Alasan berhasil:** Pseudocode yang disusun di awal sudah tepat menerjemahkan pola *conditional counting*, dan penggunaan `===` langsung menangani semua edge case tanpa perlu kode tambahan.

---

## ✅ Solusi Final

```javascript
function countSheeps(sheep) {
  let count = 0;

  for (let i = 0; i < sheep.length; i++) {
    if (sheep[i] === true) {
      count++;
    }
  }

  return count;
}
```

---

## 🔍 Analisis Komponen Kritis

1. **`let count = 0`** — Inisialisasi *accumulator* dengan nilai `0`. Menggunakan `let` karena nilai ini akan bermutasi (bertambah) selama iterasi. Variabel ini berperan sebagai **memori** yang menyimpan hasil penghitungan sementara.

2. **`for (let i = 0; i < sheep.length; i++)`** — Loop tradisional yang mengunjungi setiap index dari `0` hingga `sheep.length - 1`. Dipilih karena memberikan kontrol penuh terhadap iterasi dan mudah dipahami secara mekanistik.

3. **`if (sheep[i] === true)`** — *Guard clause* yang menjadi inti dari solusi. Operator `===` (strict equality) memastikan:
   - `true === true` → ✅ dihitung
   - `false === true` → ❌ dilewati
   - `null === true` → ❌ dilewati (bukan boolean)
   - `undefined === true` → ❌ dilewati (bukan boolean)

4. **`count++`** — *Post-increment operator* yang menambahkan `1` ke counter setiap kali ditemukan domba yang hadir. Ekuivalen dengan `count = count + 1`.

5. **`return count`** — Mengembalikan total akumulasi setelah seluruh array selesai ditelusuri.

---

## 🔬 Mengapa `=== true` dan Bukan `== true`?

```text
┌────────────────────────────────────────────────────────┐
│  Loose Equality (==)         Strict Equality (===)     │
│                                                        │
│  1 == true    → true ⚠️      1 === true    → false ✅  │
│  "1" == true  → true ⚠️      "1" === true  → false ✅  │
│  null == true → false         null === true → false     │
│  true == true → true          true === true → true      │
└────────────────────────────────────────────────────────┘
```

> Dengan `==`, JavaScript melakukan *type coercion* — mengubah tipe data sebelum membandingkan. Angka `1` akan dianggap `true`. Dengan `===`, tidak ada konversi tipe, sehingga hanya boolean `true` yang lolos.

---

## 🧪 Verifikasi Manual

```javascript
// Test 1: Array dari soal
const sheep1 = [
  true,  true,  true,  false,
  true,  true,  true,  true ,
  true,  false, true,  false,
  true,  false, false, true ,
  true,  true,  true,  true ,
  false, false, true,  true
];
console.log(countSheeps(sheep1)); // → 17 ✅

// Test 2: Bad values (null & undefined)
console.log(countSheeps([true, false, null, undefined, true])); // → 2 ✅

// Test 3: Array kosong
console.log(countSheeps([])); // → 0 ✅

// Test 4: Semua true
console.log(countSheeps([true, true, true])); // → 3 ✅

// Test 5: Tidak ada domba
console.log(countSheeps([false, null, undefined])); // → 0 ✅
```

---

## ⏱️ Kompleksitas Komputasi

- **Time Complexity:** $O(n)$ — Setiap elemen dalam array dikunjungi tepat satu kali, di mana `n` adalah panjang array.
- **Space Complexity:** $O(1)$ — Hanya satu variabel tambahan (`count`) yang dialokasikan, tidak bergantung pada ukuran input.

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
