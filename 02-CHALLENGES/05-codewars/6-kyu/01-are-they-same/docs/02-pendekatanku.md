# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-6%20kyu-yellow)
![Status](https://img.shields.io/badge/Status-✅%20Completed-green)

---

## 💭 Proses Berpikir Awal

Setelah membaca soal, yang perlu dilakukan:
1. Cek apakah setiap elemen di `array1` memiliki pasangan kuadratnya di `array2`
2. Multiplisitas harus sama (jika 19 muncul 3x di array1, maka 361 harus muncul 3x di array2)
3. Urutan tidak penting

**Pendekatan yang terpikirkan pertama: SORTING**

Alasan: Jika kedua array di-sort, maka elemen-elemen yang seharusnya "match" akan berada di index yang sama.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Cek null: if array1 atau array2 null → return false
2. Sort kedua array
3. Loop dan compare: apakah sortedArray1[i] sama dengan akar kuadrat sortedArray2[i]?
4. Return true jika semua match
```

**Strategi Awal:**
- Sort kedua array langsung
- Compare dengan `Math.sqrt()` di setiap iterasi
- Ide: lebih simpel karena tidak perlu transform array dulu

---

## 🔄 Percobaan Pertama (Mandiri Sebelum Mentoring)

**Pendekatan:** Sorting + Math.sqrt() di Loop

```javascript
function comp(array1, array2) {
  if (array1 === null || array2 === null) return false;
  const sortedArray1 = [...array1].sort((a, b) => a - b);
  const sortedArray2 = [...array2].sort((a, b) => a - b);
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== Math.sqrt(sortedArray2[i])) return false;
  }
  return true;
}
```

**Hasil:** ⚠️ Logika benar, tapi ada 2 masalah!

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐☆ |
| Keringkasan | ⭐⭐⭐⭐☆ |
| Pendekatan | Imperatif (for loop) |
| **Bugs** | ❌ Length check hilang |
| **Presisi** | ⚠️ Floating point risk |

---

## 🔍 Review & Masalah yang Ditemukan

### ✅ Yang Sudah Benar:
1. **Null check** ✓
2. **Spread operator `[...]`** ✓ (tidak mutasi array asli)
3. **Sort dengan comparator** ✓ (`(a, b) => a - b`)
4. **Early return pattern** ✓
5. **Logika sorting** ✓

### ❌ Masalah 1: Missing Length Check

**Bug:**
```javascript
array1 = [1, 2, 3]       // 3 elements
array2 = [1, 4, 9, 16]   // 4 elements

// Loop hanya sampai sortedArray1.length (3)
// Elemen ke-4 di array2 tidak pernah dicek!
// Hasilnya: return true (SALAH!)
```

**Fix:** Tambahkan `if (array1.length !== array2.length) return false;`

### ⚠️ Masalah 2: Math.sqrt() - Floating Point Risk

**Potensi masalah presisi:**
```javascript
// Math.sqrt() menghasilkan floating point
Math.sqrt(121) = 11  // ✓ Kebetulan presisi
Math.sqrt(2) = 1.4142135623730951  // Float!

// Floating point comparison bisa tidak presisi
Math.sqrt(9.000000000001) !== 3  // true (floating point error)
```

**Perbandingan performa:**
- `Math.sqrt()`: Operasi lebih lambat (komputasi kompleks)
- Kuadrat (`x * x`): Operasi lebih cepat (perkalian sederhana)

**Fix:** Ganti dengan kuadratkan array1, bukan sqrt array2

---

## 🔄 Percobaan Kedua (Refactoring)

**Pendekatan:** Sorting + Kuadrat di Loop (Fix Bugs)

```javascript
function comp(array1, array2) {
  if (array1 === null || array2 === null) return false;
  if (array1.length !== array2.length) return false;  // ✅ FIX: Length check
  
  const sortedArray1 = [...array1].sort((a, b) => a - b);
  const sortedArray2 = [...array2].sort((a, b) => a - b);
  
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] * sortedArray1[i] !== sortedArray2[i]) return false;  // ✅ FIX: Kuadrat
  }
  return true;
}
```

**Hasil:** ✅ Lulus! (Semua bugs teratasi)

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐⭐☆ |
| Pendekatan | Imperatif (for loop) |
| **Bugs** | ✅ Teratasi semua |
| **Presisi** | ✅ Integer presisi 100% |
| **Performa** | ⚠️ Kuadrat di setiap iterasi |

**Perubahan dari V1:**
1. ✅ Tambah length check
2. ✅ Ganti `Math.sqrt(sortedArray2[i])` jadi `sortedArray1[i] * sortedArray1[i]`
3. ✅ Presisi integer (tidak ada floating point)

---

## ✅ Solusi Final (Optimasi)

**Pendekatan:** Transform Dulu, Sort, Loop Compare Langsung

```javascript
function comp(array1, array2) {
  if (array1 === null || array2 === null) return false;
  if (array1.length !== array2.length) return false;
  
  const sortedArray1 = [...array1].map((x) => x * x).sort((a, b) => a - b);
  const sortedArray2 = [...array2].sort((a, b) => a - b);
  
  for (let i = 0; i < sortedArray1.length; i++) {
    if (sortedArray1[i] !== sortedArray2[i]) return false;
  }
  return true;
}
```

**Hasil:** ✅ Lulus! (Optimal)

**Evaluasi:**
| Aspek | Penilaian |
|-------|-----------|
| Keterbacaan | ⭐⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐⭐⭐ |
| Pendekatan | Imperatif (for loop) |
| **Bugs** | ✅ Teratasi semua |
| **Presisi** | ✅ Integer presisi 100% |
| **Performa** | ✅ Kuadrat hanya sekali |

**Optimasi dari V2:**
- ✅ Transform dengan `.map(x => x * x)` **di awal** (sekali)
- ✅ Loop jadi lebih simpel (compare langsung tanpa operasi)
- ✅ Performa lebih baik (tidak ada operasi di setiap iterasi)

---

## � Perbandingan 3 Versi

| Aspek | V1 (Mandiri) | V2 (Refactor) | V3 (Final) |
|-------|--------------|---------------|------------|
| **Null check** | ✅ | ✅ | ✅ |
| **Length check** | ❌ Missing | ✅ Fixed | ✅ |
| **Approach** | sqrt di loop | kuadrat di loop | map dulu, loop simpel |
| **Presisi** | ⚠️ Float risk | ✅ Integer | ✅ Integer |
| **Performa** | ⚠️ Sqrt lambat | ⚠️ Kuadrat per iterasi | ✅ Kuadrat sekali |
| **Readability** | ⭐⭐⭐⭐☆ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## �🔍 Penjelasan Baris per Baris (Solusi Final)

```javascript
// Baris 1-2: Null Check
if (array1 === null || array2 === null) return false;
// Sesuai spesifikasi soal: jika salah satu null, return false
// Menggunakan === untuk strict equality

// Baris 3-4: Length Check
if (array1.length !== array2.length) return false;
// Jika panjang berbeda, mustahil "sama" (multiplisitas pasti beda)
// Early return untuk efisiensi

// Baris 5-6: Transform & Sort Array1
const sortedArray1 = [...array1].map((x) => x * x).sort((a, b) => a - b);
// [...array1]: Spread operator untuk copy array (tidak mutasi array asli)
// .map((x) => x * x): Kuadratkan setiap elemen
// .sort((a, b) => a - b): Sort ascending (PENTING: harus pakai comparator!)

// Baris 7-8: Sort Array2
const sortedArray2 = [...array2].sort((a, b) => a - b);
// Copy & sort array2
// Tidak perlu transform karena array2 sudah berisi nilai kuadrat

// Baris 9-13: Loop & Compare
for (let i = 0; i < array1.length; i++) {
  if (sortedArray1[i] !== sortedArray2[i]) return false;
}
// Loop melalui setiap index
// Jika ada yang tidak match, langsung return false

// Baris 14: Success Case
return true;
// Jika loop selesai tanpa return false, berarti semua match!
```

---

## 🧪 Verifikasi Manual

**Test Case 1 (Valid):**
```javascript
array1 = [121, 144, 19, 161, 19, 144, 19, 11]
array2 = [121, 14641, 20736, 361, 25921, 361, 20736, 361]

// Proses:
1. ✅ Null check: keduanya tidak null
2. ✅ Length check: 8 === 8
3. Transform & sort:
   sortedArray1 = [121, 361, 361, 361, 14641, 20736, 20736, 25921]
   sortedArray2 = [121, 361, 361, 361, 14641, 20736, 20736, 25921]
4. Loop compare: semua index sama ✅
5. Return: true ✓
```

**Test Case 2 (Invalid):**
```javascript
array1 = [121, 144, 19, 161, 19, 144, 19, 11]
array2 = [132, 14641, 20736, 361, 25921, 361, 20736, 361]

// Proses:
1. ✅ Null & length check pass
2. Transform & sort:
   sortedArray1 = [121, 361, 361, 361, 14641, 20736, 20736, 25921]
   sortedArray2 = [132, 361, 361, 361, 14641, 20736, 20736, 25921]
3. Loop compare: index 0 → 121 !== 132 ❌
4. Return: false ✓
```

---

## 📈 Evolusi Solusi

```
V1 (Mandiri)              V2 (Bug Fix)              V3 (Final/Optimal)
─────────────────         ─────────────────         ─────────────────
✓ Null check              ✓ Null check              ✓ Null check
✗ No length check    →    ✓ Length check       →    ✓ Length check
✓ Sort both arrays        ✓ Sort both arrays        ✓ Sort both arrays
✗ sqrt di loop            ✓ x*x di loop             ✓ map(x*x) di awal
⚠️ Float precision        ✓ Integer precision       ✓ Integer precision
⚠️ Performa lambat        ⚠️ Kuadrat per iterasi    ✅ Kuadrat sekali
```

### Pelajaran dari Refactoring:

1. **Edge Case Length Check adalah CRITICAL**
   - Tanpa ini, array beda panjang bisa lolos
   - Always check preconditions sebelum logic utama

2. **Integer > Float untuk Presisi**
   - `Math.sqrt()` → floating point → potensi error
   - Kuadrat (`x * x`) → integer → presisi 100%

3. **Transform Sekali > Transform Berulang**
   - V2: Kuadrat di setiap iterasi (n kali operasi)
   - V3: Map dulu, loop compare langsung (n operasi map + n compare = efisien)

4. **Spread Operator untuk Immutability**
   - `[...array]` → tidak mutasi array original
   - Best practice di functional programming

---

**Konsep Penting yang Dipelajari:**
1. **Spread Operator**: `[...array]` untuk copy array tanpa mutasi
2. **Array.map()**: Transform setiap elemen
3. **Sort dengan comparator**: `(a, b) => a - b` untuk sort angka (bukan string!)
4. **Early return pattern**: Return segera jika kondisi edge case terpenuhi
5. **Integer vs Float**: Pilih operasi yang presisi (kuadrat > sqrt)
6. **Performance optimization**: Transform sekali > transform berulang

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
