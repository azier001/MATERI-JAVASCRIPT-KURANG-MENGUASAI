# 🟢 Part 03 — Solusi: HashMap (Versi Sendiri)

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-15%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 📊 Visualisasi | ❌ Pitfalls | 🧪 Test Cases |
|:-------:|:-------------:|:--------------:|:-----------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-visualisasi-proses) | [Jump](#-pitfalls-yang-perlu-dihindari) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami cara kerja HashMap untuk mencari pasangan
- ✅ Memahami konsep complement dan bagaimana Map menyimpannya
- ✅ Memahami kenapa HashMap lebih efisien dari Nested Loop
- ✅ Siap untuk melihat versi alternatif di Part 04

---

## 📄 Kode

```javascript
const twoSum = (numbers, number) => {
  const map = new Map()

  for (let i = 0; i < numbers.length; i++) {
    const complement = number - numbers[i]

    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(numbers[i], i)
  }

  return []
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Menyiapkan Map sebagai penampung

```javascript
const map = new Map()
```

Map adalah struktur data yang menyimpan pasangan **key-value**. Di sini kita akan menyimpan:
- **key** → nilai angka (`numbers[i]`)
- **value** → indeksnya (`i`)

Mengapa indeks yang disimpan? Karena challenge meminta return **indeks**, bukan nilai angkanya.

---

### 2. Menghitung complement

```javascript
const complement = number - numbers[i]
```

Complement adalah angka yang kita **butuhkan** sebagai pasangan. Kalau `numbers[i] = 2` dan `target = 9`, maka `complement = 9 - 2 = 7` — kita butuh angka `7`.

---

### 3. Cek apakah complement sudah ada di Map

```javascript
if (map.has(complement)) {
  return [map.get(complement), i]
}
```

- `map.has(complement)` → cek apakah complement sudah tersimpan di Map
- `map.get(complement)` → ambil indeks dari complement yang sudah tersimpan
- `return [map.get(complement), i]` → kembalikan indeks complement dan indeks saat ini

---

### 4. Simpan angka saat ini ke Map

```javascript
map.set(numbers[i], i)
```

Kalau complement belum ada, simpan angka saat ini beserta indeksnya ke Map — agar bisa ditemukan di iterasi berikutnya sebagai complement dari angka lain.

---

### 5. Return kosong jika tidak ada pasangan

```javascript
return []
```

Kalau loop selesai tanpa menemukan pasangan, kembalikan array kosong.

---

## 📊 Visualisasi Proses

Kita trace step by step untuk array `[2, 7, 11, 15]` target `9`:

```
Array:  [ 2,  7, 11, 15 ]
Index:    0   1   2   3
Target: 9
Map:    {}
```

```
iterasi i=0
┌─────────────────────────────────────┐
│ numbers[i]  = 2                     │
│ complement  = 9 - 2 = 7             │
│                                     │
│ map.has(7)? ❌ belum ada            │
│                                     │
│ map.set(2, 0) → simpan angka & index│
└─────────────────────────────────────┘
Map: { 2→0 }
```

```
iterasi i=1
┌─────────────────────────────────────┐
│ numbers[i]  = 7                     │
│ complement  = 9 - 7 = 2             │
│                                     │
│ map.has(2)? ✅ ADA!                 │
│                                     │
│ map.get(2) → index = 0              │
│ return [0, 1] ← SELESAI!           │
└─────────────────────────────────────┘
Map: { 2→0 } ← i=2 dan i=3 tidak dijalankan
```

```
HASIL
┌─────────────────────────────────────┐
│ index 0 → angka 2                   │
│ index 1 → angka 7                   │
│ 2 + 7 = 9 ✅                        │
│ return [0, 1]                       │
└─────────────────────────────────────┘
```

---

Trace untuk `[3, 2, 4]` target `6`:

```
Array:  [ 3,  2,  4 ]
Index:    0   1   2
Target: 6
Map:    {}
```

```
iterasi i=0
┌─────────────────────────────────────┐
│ numbers[i]  = 3                     │
│ complement  = 6 - 3 = 3             │
│                                     │
│ map.has(3)? ❌ belum ada            │
│                                     │
│ map.set(3, 0) → simpan angka & index│
└─────────────────────────────────────┘
Map: { 3→0 }
```

```
iterasi i=1
┌─────────────────────────────────────┐
│ numbers[i]  = 2                     │
│ complement  = 6 - 2 = 4             │
│                                     │
│ map.has(4)? ❌ belum ada            │
│                                     │
│ map.set(2, 1) → simpan angka & index│
└─────────────────────────────────────┘
Map: { 3→0, 2→1 }
```

```
iterasi i=2
┌─────────────────────────────────────┐
│ numbers[i]  = 4                     │
│ complement  = 6 - 4 = 2             │
│                                     │
│ map.has(2)? ✅ ADA!                 │
│                                     │
│ map.get(2) → index = 1              │
│ return [1, 2] ← SELESAI!           │
└─────────────────────────────────────┘
Map: { 3→0, 2→1 }
```

```
HASIL
┌─────────────────────────────────────┐
│ index 1 → angka 2                   │
│ index 2 → angka 4                   │
│ 2 + 4 = 6 ✅                        │
│ return [1, 2]                       │
└─────────────────────────────────────┘
```

---

Trace untuk `[3, 3]` target `6` — kasus menarik dengan angka duplikat:

```
Array:  [ 3,  3 ]
Index:    0   1
Target: 6
Map:    {}
```

```
iterasi i=0
┌─────────────────────────────────────┐
│ numbers[i]  = 3                     │
│ complement  = 6 - 3 = 3             │
│                                     │
│ map.has(3)? ❌ belum ada            │
│                                     │
│ map.set(3, 0) → simpan angka & index│
└─────────────────────────────────────┘
Map: { 3→0 }
```

```
iterasi i=1
┌─────────────────────────────────────┐
│ numbers[i]  = 3                     │
│ complement  = 6 - 3 = 3             │
│                                     │
│ map.has(3)? ✅ ADA!                 │
│                                     │
│ map.get(3) → index = 0              │
│ return [0, 1] ← SELESAI!           │
└─────────────────────────────────────┘
Map: { 3→0 }
```

```
HASIL
┌─────────────────────────────────────┐
│ index 0 → angka 3                   │
│ index 1 → angka 3                   │
│ 3 + 3 = 6 ✅                        │
│ return [0, 1]                       │
└─────────────────────────────────────┘
```

> **Perhatikan:** Untuk kasus `[3, 3]`, Map menyimpan angka `3` dengan indeks `0` di iterasi pertama. Di iterasi kedua, complement-nya juga `3` — dan Map langsung menemukan indeks `0`. Hasilnya `[0, 1]` — benar! Map aman untuk kasus ini karena yang disimpan adalah **indeks**, bukan nilai.

---

## ❌ Pitfalls yang Perlu Dihindari

```javascript
// ❌ map.set sebelum map.has — bisa mencocokkan elemen dengan dirinya sendiri!
map.set(numbers[i], i)        // ← simpan dulu
if (map.has(complement)) { }  // ← baru cek → SALAH! urutan harus dibalik
```

```javascript
// ❌ Menyimpan nilai bukan indeks di Map
map.set(numbers[i], numbers[i])  // ← harusnya map.set(numbers[i], i)
// Akibatnya map.get(complement) mengembalikan nilai, bukan indeks!
```

```javascript
// ❌ Return nilai bukan indeks
return [map.get(complement), numbers[i]]  // ← harusnya return [map.get(complement), i]
```

---

## 💡 Insight

> **Kenapa urutan `map.has` sebelum `map.set` itu penting?**
> Kalau kita `map.set` dulu baru `map.has`, elemen bisa cocok dengan dirinya sendiri. Misalnya `[3, 3]` target `6` — di iterasi pertama kita simpan `3` ke Map, lalu langsung cek complement `3` — Map sudah berisi `3`! Hasilnya `[0, 0]` — salah. Dengan `map.has` dulu, kita cek complement **sebelum** menyimpan elemen saat ini.

> **Kenapa HashMap lebih efisien dari Nested Loop?**
> Nested Loop mengecek semua kombinasi — O(n²). HashMap hanya loop sekali — O(n). Rahasianya ada di `map.has()` yang bisa mencari data dalam waktu konstan O(1), tanpa perlu loop tambahan.

> **Apa itu time-space trade-off?**
> HashMap lebih cepat (O(n)) tapi butuh memori ekstra untuk menyimpan data di Map — O(n) space. Nested Loop lebih lambat (O(n²)) tapi tidak butuh memori ekstra — O(1) space. Kita "menukar" memori dengan kecepatan.

---

## 🧪 Test Cases

```javascript
// Basic cases
console.log(twoSum([2, 7, 11, 15], 9));  // → [0, 1]
console.log(twoSum([3, 2, 4], 6));        // → [1, 2]
console.log(twoSum([3, 3], 6));           // → [0, 1]

// Negative numbers
console.log(twoSum([-1, -2, -3, -4, -5], -8));  // → [2, 4]
console.log(twoSum([-10, 20, 10, -20], 0));      // → [0, 2]

// Edge cases
console.log(twoSum([0, 4, 3, 0], 0));   // → [0, 3]
console.log(twoSum([1, 2], 3));          // → [0, 1]

// Tidak ada pasangan
console.log(twoSum([1, 2, 3], 100));    // → []
```

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 02: Solusi — Nested Loop](02-solution-nested-loop_solusi-nested-loop.md)**
- **📖 [Lanjut ke Part 04: Solusi — HashMap (AI) →](04-solution-hashmap-ai_solusi-hashmap-ai.md)**

---

<div align="center">

Made with ❤️ for learners

</div>