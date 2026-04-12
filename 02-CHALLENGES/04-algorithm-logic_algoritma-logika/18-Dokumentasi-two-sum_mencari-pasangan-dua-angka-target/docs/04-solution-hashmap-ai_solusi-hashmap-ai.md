# 🟡 Part 04 — Solusi: HashMap (Versi AI)

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌿%20Menengah-yellowgreen)

---

## 🧭 Quick Jump

| 📄 Kode | 🔍 Penjelasan | 🔄 Perbandingan | 🧪 Test Cases |
|:-------:|:-------------:|:---------------:|:-------------:|
| [Jump](#-kode) | [Jump](#-penjelasan-per-bagian) | [Jump](#-perbandingan-dengan-versi-3) | [Jump](#-test-cases) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Memahami variasi penulisan HashMap yang lebih readable
- ✅ Memahami peran variabel `current` untuk keterbacaan kode
- ✅ Memahami bahwa logika yang sama bisa ditulis dengan gaya berbeda
- ✅ Siap untuk melihat versi Set di Part 05

---

## 📄 Kode

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    const needed = target - current;

    if (map.has(needed)) {
      return [map.get(needed), i];
    }

    map.set(current, i);
  }

  return [];
}
```

---

## 🔍 Penjelasan Per Bagian

### 1. Menyiapkan Map sebagai penampung

```javascript
const map = new Map()
```

Sama seperti versi sebelumnya — Map menyimpan pasangan **key-value** di mana key adalah nilai angka dan value adalah indeksnya.

---

### 2. Menyimpan nilai saat ini ke variabel `current`

```javascript
const current = nums[i];
```

Perbedaan pertama dari versi sebelumnya — nilai `nums[i]` disimpan ke variabel `current` terlebih dahulu. Ini membuat kode lebih mudah dibaca karena nama `current` lebih deskriptif daripada `nums[i]`.

---

### 3. Menghitung complement dengan nama `needed`

```javascript
const needed = target - current;
```

Perbedaan kedua — complement dinamai `needed` (yang dibutuhkan) bukan `complement`. Secara makna identik, hanya nama variabelnya berbeda. `needed` cukup intuitif — "angka yang kita butuhkan sebagai pasangan."

---

### 4. Cek apakah `needed` sudah ada di Map

```javascript
if (map.has(needed)) {
  return [map.get(needed), i];
}
```

Sama persis dengan versi sebelumnya — cek keberadaan complement di Map, lalu ambil indeksnya dengan `map.get()`.

---

### 5. Simpan `current` ke Map

```javascript
map.set(current, i);
```

Karena `current = nums[i]`, baris ini identik dengan `map.set(nums[i], i)` di versi sebelumnya — hanya lebih ringkas dibaca.

---

## 🔄 Perbandingan dengan Versi 3

Kedua versi ini **identik secara logika** — hanya berbeda di penamaan variabel:

```
VERSI 3 (versi sendiri)         VERSI 4 (versi AI)
┌─────────────────────┐         ┌─────────────────────┐
│                     │         │                     │
│ numbers[i]          │   →     │ current = nums[i]   │
│                     │         │                     │
│ complement =        │   →     │ needed =            │
│ number - numbers[i] │         │ target - current    │
│                     │         │                     │
│ map.has(complement) │   →     │ map.has(needed)     │
│ map.get(complement) │   →     │ map.get(needed)     │
│                     │         │                     │
│ map.set(numbers[i], │   →     │ map.set(current, i) │
│         i)          │         │                     │
└─────────────────────┘         └─────────────────────┘
      ↓                                   ↓
   Identik! Hanya beda penamaan variabel saja
```

### Apa keunggulan variabel `current`?

Dengan menyimpan `nums[i]` ke `current`, kode menjadi lebih mudah dibaca karena:

```javascript
// Tanpa current — nums[i] muncul dua kali
const complement = number - numbers[i]
map.set(numbers[i], i)

// Dengan current — lebih bersih
const current = nums[i]
const needed = target - current
map.set(current, i)
```

Untuk array dengan nama yang panjang, manfaatnya lebih terasa:

```javascript
// Tanpa current — verbose
const needed = targetValue - inputNumbersArray[currentIndex]
map.set(inputNumbersArray[currentIndex], currentIndex)

// Dengan current — jauh lebih bersih
const current = inputNumbersArray[currentIndex]
const needed = targetValue - current
map.set(current, currentIndex)
```

---

## 💡 Insight

> **Kapan perlu variabel `current`?**
> Kalau nama array atau ekspresi aksesnya pendek (`nums[i]`), variabel `current` opsional — tidak terlalu berpengaruh. Tapi kalau nama array panjang atau ekspresinya kompleks, `current` sangat membantu keterbacaan. Ini adalah kebiasaan baik dalam menulis kode yang *readable*.

> **`complement` vs `needed` — mana yang lebih baik?**
> Keduanya valid. `complement` lebih umum dipakai di komunitas programming untuk problem Two Sum. `needed` lebih intuitif secara bahasa sehari-hari — "angka yang dibutuhkan." Pilih yang paling jelas maknanya untuk kamu dan tim.

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
- **📖 [← Part 03: Solusi — HashMap (Versi Sendiri)](03-solution-hashmap_solusi-hashmap.md)**
- **📖 [Lanjut ke Part 05: Solusi — Set →](05-solution-set_solusi-set.md)**

---

<div align="center">

Made with ❤️ for learners

</div>