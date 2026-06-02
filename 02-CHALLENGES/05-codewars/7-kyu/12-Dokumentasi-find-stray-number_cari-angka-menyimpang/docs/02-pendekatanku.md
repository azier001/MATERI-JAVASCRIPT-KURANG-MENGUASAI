# 🧠 Pendekatan & Problem Solving

## 🤔 Ide Awal

Setelah menganalisis soal, saya menemukan pola:
- Array selalu berisi **dua angka unik**
- Salah satu angka muncul **hanya 1 kali** (stray number)
- Angka lainnya muncul **berkali-kali** (majority number)

**Strategi:** Cari angka yang frekuensi kemunculannya = 1

---

## 🔄 Percobaan & Iterasi

### Pendekatan yang Dipilih: Filter + Find

**Langkah-langkah:**
1. Ambil angka pertama dari array
2. Hitung berapa kali angka pertama muncul menggunakan `filter()`
3. Jika muncul 1x → angka pertama adalah stray
4. Jika muncul >1x → cari angka lain yang berbeda menggunakan `find()`

**Mengapa pendekatan ini?**
- Simple dan mudah dipahami
- Memanfaatkan built-in array methods
- Tidak perlu struktur data tambahan (Set/Map)

---

## ✅ Solusi Final

```javascript
const stray = (numbers) => {
  const firstNumber = numbers[0];
  const firstNumberCount = numbers.filter(num => num === firstNumber).length;
  
  if (firstNumberCount === 1) {
    return firstNumber;
  } else {
    return numbers.find(num => num !== firstNumber);
  }
};
```

**Catatan Clean Code:**
- Menggunakan `const` untuk immutability
- Naming dalam English untuk standar industri
- `firstNumber` & `firstNumberCount` - descriptive dan self-explanatory
- `num` sebagai callback parameter - singkat tapi jelas

**Hasil Testing:** ✅ All tests passed!

---

## 📖 Penjelasan Baris per Baris

```javascript
const stray = (numbers) => {
  // Baris 1: Ambil elemen pertama sebagai referensi
  const firstNumber = numbers[0];
  
  // Baris 2-3: Filter semua angka yang sama dengan firstNumber,
  // lalu hitung jumlahnya dengan .length
  const firstNumberCount = numbers.filter(num => num === firstNumber).length;
  
  // Baris 4-6: Jika firstNumber hanya muncul 1x,
  // berarti dia adalah stray number, langsung return
  if (firstNumberCount === 1) {
    return firstNumber;
  } else {
    // Baris 7-9: Jika tidak, cari angka pertama yang berbeda
    // dari firstNumber (pasti itu stray number)
    return numbers.find(num => num !== firstNumber);
  }
};
```

### Trace Example:

**Input:** `[1, 1, 2]`
1. `firstNumber = 1`
2. `filter(num => num === 1)` → `[1, 1]` → `length = 2`
3. `2 === 1` → false, masuk else
4. `find(num => num !== 1)` → ketemu `2`
5. Return `2` ✅

**Input:** `[8, 1, 1, 1, 1, 1, 1]`
1. `firstNumber = 8`
2. `filter(num => num === 8)` → `[8]` → `length = 1`
3. `1 === 1` → true, return `8` ✅

---

## 🎯 Kompleksitas

- **Time Complexity:** O(n)
  - `filter()` = O(n)
  - `find()` = O(n) worst case
  - Total tetap O(n) karena sequential
  
- **Space Complexity:** O(1)
  - Hanya menggunakan 2 variabel sederhana
  - Filter membuat array baru tapi tidak disimpan permanen

---

## 🚀 Pendekatan Alternatif: Frequency Counter dengan `reduce()`

### Kode Original dari Eksplorasi Mandiri:

```javascript
function stray(numbers) {
  const grouped = numbers.reduce((acc, current) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {});
  
  for (const key in grouped) {
    if (grouped[key] === 1) {
      return +key;
    }
  }
}
```

**Konsep:** Frequency Counter Pattern
- Build frequency map dengan `reduce()`
- Loop untuk cari key dengan value = 1
- Convert key dari string ke number dengan `+key`

---

### 📊 Review & Analisis

#### ✅ **Kelebihan:**

1. **Scalability** ⭐⭐⭐⭐⭐
   - Work untuk N unique values (tidak terbatas 2 angka saja)
   - Lebih general purpose

2. **Single Pass** ⚡
   - Hanya perlu 1x iterasi untuk build map
   - Loop kedua maksimal sejumlah unique values (biasanya kecil)

3. **Frequency Counter Pattern** 🎯
   - Pattern yang sangat umum di interview coding
   - Applicable untuk banyak masalah real-world

4. **Pemahaman Data Structure** 🗺️
   - Menggunakan Object sebagai Hash Map
   - Menunjukkan pemahaman key-value pairs

#### ⚠️ **Area Improvement:**

1. **Type Conversion dengan `+key`**
   ```javascript
   return +key;  // Object keys selalu string!
   ```
   - Lebih eksplisit: `Number(key)` atau `parseInt(key, 10)`

2. **`for...in` Loop**
   - Bisa diganti dengan `Object.entries()` untuk approach yang lebih modern
   - `for...in` iterate over prototype chain juga (meski tidak masalah di sini)

3. **Space Complexity**
   - O(k) dimana k = jumlah unique values
   - Trade-off: lebih banyak memory untuk flexibility

4. **Edge Case Handling**
   - Tidak ada return statement jika stray number tidak ditemukan
   - Bisa tambahkan defensive programming

---

### 💎 Rekomendasi Final: Versi Terbaik

#### Opsi 1: Dengan `Map` (Most Recommended)

```javascript
function stray(numbers) {
  // Build frequency map menggunakan Map (key tetap number!)
  const frequencyMap = numbers.reduce((acc, num) => {
    acc.set(num, (acc.get(num) || 0) + 1);
    return acc;
  }, new Map());
  
  // Find number dengan frequency = 1
  for (const [num, count] of frequencyMap) {
    if (count === 1) {
      return num;  // Tidak perlu type conversion!
    }
  }
}
```

**Keuntungan `Map` vs `Object`:**
- ✅ Keys tetap dalam tipe aslinya (number stays number)
- ✅ Tidak perlu type conversion
- ✅ Performance lebih baik untuk frequent operations
- ✅ Lebih semantic untuk data mapping

#### Opsi 2: Dengan `Object.entries()` (Modern & Functional)

```javascript
function stray(numbers) {
  // Build frequency map
  const grouped = numbers.reduce((acc, current) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {});
  
  // Find dengan Object.entries() + destructuring
  const [strayNumber] = Object.entries(grouped)
    .find(([num, count]) => count === 1);
  
  return Number(strayNumber);
}
```

**Keuntungan:**
- ✅ Lebih functional approach
- ✅ Array destructuring untuk readability
- ✅ Chainable methods

#### Opsi 3: One-Liner (Advanced)

```javascript
const stray = (numbers) => {
  const freq = numbers.reduce((m, n) => m.set(n, (m.get(n) || 0) + 1), new Map());
  return [...freq].find(([n, c]) => c === 1)[0];
};
```

---

### 📈 Perbandingan Solusi

| Aspek | Solusi 1 (filter + find) | Solusi 2 (reduce + loop) |
|-------|-------------------------|--------------------------|
| **Readability** | ⭐⭐⭐⭐⭐ Sangat jelas | ⭐⭐⭐⭐ Butuh pemahaman reduce |
| **Scalability** | ⭐⭐⭐ Hanya 2 unique values | ⭐⭐⭐⭐⭐ N unique values |
| **Time Complexity** | O(2n) - filter + find | O(n + k) - n = array size, k = unique |
| **Space Complexity** | O(1) | O(k) - k = unique values |
| **Use Case** | Specific problem | General frequency counting |
| **Interview Value** | ⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |

---

### 🎯 Kesimpulan

**Untuk Challenge Ini:**
- Solusi 1 (filter + find) lebih cocok karena problem guarantee 2 unique values

**Untuk Portfolio & Interview:**
- Solusi 2 (frequency counter) lebih powerful dan menunjukkan:
  - Pemahaman data structure
  - Ability to think beyond specific constraints
  - Knowledge of common algorithm patterns

**Key Learnings:**
1. ✅ `reduce()` untuk frequency counting
2. ✅ `Map` vs `Object` trade-offs
3. ✅ Object keys are always strings
4. ✅ `Object.entries()` untuk modern iteration
5. ✅ Space-time complexity trade-offs

---

**Status:** ✅ Solusi selesai & tested  
**Next Step:** Refleksi & analisis solusi komunitas

---

## 🗺️ Navigasi

**📍 Kamu di sini:** 02-pendekatanku.md

| ⬅️ Sebelumnya | 🏠 Home | Selanjutnya ➡️ |
|:---|:---:|---:|
| [⬅️ 01-soal.md](01-soal.md) | [🏠 README](../README.md) | [03-refleksi.md ➡️](03-refleksi.md) |

---

*💡 Tip: Gunakan navigasi di atas untuk berpindah antar dokumen*
