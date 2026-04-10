# 📅 12 Maret 2026 — Jurnal Belajar JavaScript

**Sumber Challenge:** [coddy.tech](https://coddy.tech)  
**Tingkat:** Easy  
**Kategori:** JavaScript Fundamentals / Basic Algorithms  
**Topik Utama:** Array, Loop, Conditionals, Functions  
**Topik Pendukung:** Objects, Number Formatting (`toFixed`, `Number`), Array Methods (`findIndex`)

---

## 📚 Daftar Isi

- 📋 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Memahami Soal](#memahami-soal)
- 🧪 [Test Cases](#test-cases)
- 🔄 [Evolusi Kode](#evolusi-kode)
- ⚖️ [Perbandingan Solusi](#perbandingan-solusi)
- 📝 [Pelajaran yang Didapat](#pelajaran-yang-didapat)

---

<a name="deskripsi-challenge"></a>
## 🐍 Deskripsi Challenge: Rattlesnake Rattle Pattern

> _"Kamu adalah seorang herpetologis — ilmuwan yang mempelajari reptil. Hari ini kamu menemukan spesimen ular derik yang unik. Kamu mengamati rattle-nya (bagian yang berbunyi di ujung ekor) dan mencatat lebar tiap segmennya. Tugasmu: temukan apakah ada segmen yang tumbuh **tidak wajar**."_

---

### 🎯 Misi

Buat fungsi **`analyzeRattlePattern`** yang bisa mendeteksi pertumbuhan tidak normal pada rattle ular derik.

```
Rattle ular derik terdiri dari segmen-segmen:

  [ujung/tertua]                    [pangkal/terbaru]
       │                                   │
       ▼                                   ▼
  ┌────┬──────┬────────┬──────────────┬──────────────────┐
  │ 5  │  10  │   15   │      31      │       ...        │
  └────┴──────┴────────┴──────────────┴──────────────────┘
  lebar bertambah secara normal →→→ tapi ada yang tiba-tiba melonjak!
```

---

### 📥 Input

| Parameter | Tipe | Deskripsi |
|---|---|---|
| `rattleSegments` | `Array<number>` | Lebar tiap segmen rattle, dari ujung (tertua) ke pangkal (terbaru) |

---

### 📤 Output

| Kondisi | Return Value |
|---|---|
| ✅ Pertumbuhan normal | `{ result: "Normal growth pattern observed." }` |
| ⚠️ Ditemukan unusual growth | `{ unusualSegment: index, growthFactor: rasio }` |

- **`unusualSegment`** — index segmen yang tumbuh tidak wajar
- **`growthFactor`** — seberapa besar lonjakannya (dibulatkan 1 desimal)

---

### 💡 Contoh Nyata

```js
// 🔴 Ada yang tidak beres! 31 > 2 × 15
analyzeRattlePattern([5, 10, 15, 31])
// → { unusualSegment: 3, growthFactor: 2.1 }

// 🟢 Semua tumbuh normal, tidak ada yang melonjak
analyzeRattlePattern([1, 2, 4, 8, 16])
// → { result: "Normal growth pattern observed." }
```

---

<a name="memahami-soal"></a>
## 🧠 Memahami Soal

### Apa itu "unusual growth"?

Pertumbuhan dianggap **tidak normal** jika sebuah segmen lebarnya **lebih dari 2x** lebar segmen sebelumnya.

```
Segmen sebelumnya = 10
Segmen sekarang   = 21 → tidak normal ✅ (21 > 10 × 2)
Segmen sekarang   = 20 → normal ✅      (20 = 10 × 2, bukan lebih dari)
```

> ⚠️ **Jebakan:** Tepat 2x dianggap **normal**. Syaratnya adalah **lebih dari** 2x, bukan sama dengan.

### Cara berpikir menyelesaikan soal:

1. Loop mulai dari index `1` (bukan `0`) karena perlu membandingkan dengan segmen sebelumnya
2. Bandingkan setiap segmen dengan segmen sebelumnya
3. Jika ditemukan unusual growth → langsung `return` dan hentikan loop
4. Jika loop selesai tanpa menemukan apapun → return pesan normal

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Buatan Sendiri

**Test 1 — Unusual di awal**
```js
console.log(analyzeRattlePattern([1, 3]))
// Expected: { unusualSegment: 1, growthFactor: 3 }
```

**Test 2 — Semua sama**
```js
console.log(analyzeRattlePattern([5, 5, 5]))
// Expected: { result: 'Normal growth pattern observed.' }
```

**Test 3 — Tepat 2x (jebakan! ⚠️)**
```js
console.log(analyzeRattlePattern([4, 8, 16]))
// Expected: { result: 'Normal growth pattern observed.' }
```

**Test 4 — Unusual di tengah**
```js
console.log(analyzeRattlePattern([2, 4, 9, 10]))
// Expected: { unusualSegment: 2, growthFactor: 2.3 }
```

**Test 5 — Array 1 elemen**
```js
console.log(analyzeRattlePattern([7]))
// Expected: { result: 'Normal growth pattern observed.' }
```

---

### Soal Asli

**Soal 1**
```js
console.log(analyzeRattlePattern([1, 2, 4, 8, 16]))
// Expected: { result: 'Normal growth pattern observed.' }
```

**Soal 2**
```js
console.log(analyzeRattlePattern([5, 10, 15, 31]))
// Expected: { unusualSegment: 3, growthFactor: 2.1 }
```

**Soal 3**
```js
console.log(analyzeRattlePattern([3, 3, 3, 3, 3]))
// Expected: { result: 'Normal growth pattern observed.' }
```

**Soal 4**
```js
console.log(analyzeRattlePattern([1, 1, 1, 3, 4]))
// Expected: { unusualSegment: 3, growthFactor: 3 }
```

**Soal 5**
```js
console.log(analyzeRattlePattern([1, 2, 5, 6, 7]))
// Expected: { unusualSegment: 2, growthFactor: 2.5 }
```

**Soal 6**
```js
console.log(analyzeRattlePattern([2, 2, 2, 2, 2]))
// Expected: { result: 'Normal growth pattern observed.' }
```

---

<a name="evolusi-kode"></a>
## 🔄 Evolusi Kode

### Versi 1 — Percobaan Pertama

```js
function analyzeRattlePattern(rattleSegments) {
  let result = {};                              // (1) objek kosong sebagai wadah hasil

  for (let i = 1; i < rattleSegments.length; i++) {  // (2) mulai dari index 1
    const current = rattleSegments[i];          // (3) ambil segmen saat ini
    const previous = rattleSegments[i - 1];     // (4) ambil segmen sebelumnya
    const difference = current / previous;      // (5) hitung rasio pertumbuhan
    const limit = 2;                            // (6) batas threshold unusual

    if (difference > limit) {
      const unusualSegment = i;
      console.log(unusualSegment); // ❌ hanya log, belum return
    } else {
      result = { result: 'Normal growth pattern observed.' }; // ❌ dijalankan tiap iterasi normal
    }
  }

  return result;
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `let result = {}` | Menyiapkan objek kosong — rencananya untuk diisi hasil akhir |
| 2 | `for (let i = 1; ...)` | Loop mulai dari index `1` bukan `0`, karena `i-1` butuh ada elemen sebelumnya |
| 3 | `rattleSegments[i]` | Mengambil nilai elemen saat ini, misal `rattleSegments[2]` = elemen ketiga |
| 4 | `rattleSegments[i - 1]` | Mengambil nilai elemen tepat sebelumnya untuk dibandingkan |
| 5 | `current / previous` | Menghitung berapa kali lipatnya, misal `31 / 15 = 2.066` |
| 6 | `const limit = 2` | Threshold batas normal — jika rasio melebihi ini, dianggap unusual |

**❌ Masalah yang ditemukan:**
- Saat unusual ditemukan, hanya `console.log` — belum ada `return`
- Pesan "Normal" diset di dalam `else`, sehingga bisa **ditimpa** di iterasi berikutnya:
  ```
  Contoh: [2, 4, 9, 10]
  i=1: 4 vs 2  → normal  → result = "Normal" ✅
  i=2: 9 vs 4  → unusual → masuk if, tapi hanya console.log ❌
  i=3: 10 vs 9 → normal  → result = "Normal" lagi, menimpa unusual ❌
  ```
- Tidak ada `growthFactor` di return value

---

### Versi 2 — Perbaikan Logika

```js
function analyzeRattlePattern(rattleSegments) {
  for (let i = 1; i < rattleSegments.length; i++) {   // (1) hapus `let result`, tidak perlu lagi
    const current = rattleSegments[i];
    const previous = rattleSegments[i - 1];
    const difference = current / previous;
    const limit = 2;

    if (difference > limit) {
      const unusualSegment = i;
      const growthFactor = difference.toFixed(1);      // (2) bulatkan ke 1 desimal — tapi masih string ❌
      return { unusualSegment, growthFactor };          // (3) return langsung, loop berhenti
    }
  }

  return { result: 'Normal growth pattern observed.' }; // (4) hanya dicapai jika tidak ada unusual
}
```

**Penjelasan perbaikan dari Versi 1:**

| # | Perubahan | Alasan |
|---|---|---|
| 1 | Hapus `let result = {}` | Tidak perlu lagi karena langsung `return` di dalam loop |
| 2 | Tambah `growthFactor` | Melengkapi return value yang diminta soal |
| 3 | `return` di dalam `if` | Langsung berhenti saat unusual ditemukan, tidak perlu lanjut iterasi |
| 4 | `return` di luar loop | Hanya dieksekusi jika seluruh loop selesai tanpa menemukan unusual |

**✅ Yang sudah benar:**
- `return` langsung saat unusual ditemukan — loop otomatis berhenti
- Pesan normal dipindah ke luar loop

**❌ Masalah yang ditemukan:**
- `toFixed(1)` mengembalikan **string**, bukan number
  ```js
  (3).toFixed(1)      // → "3.0"  ← tipe: string ❌
  (2.5).toFixed(1)    // → "2.5"  ← tipe: string ❌
  typeof "3.0"        // → "string"
  typeof 3            // → "number" ← yang diharapkan soal
  ```

---

### Versi Final — Clean Code

```js
function analyzeRattlePattern(rattleSegments) {
  const UNUSUAL_GROWTH_THRESHOLD = 2;                   // (1) konstanta threshold, ditulis UPPER_CASE
  const NORMAL_GROWTH_MESSAGE = 'Normal growth pattern observed.'; // (2) konstanta pesan

  for (let i = 1; i < rattleSegments.length; i++) {
    const currentSegmentWidth = rattleSegments[i];      // (3) naming lebih deskriptif
    const previousSegmentWidth = rattleSegments[i - 1]; // (4) naming lebih deskriptif

    const isUnusualGrowth =                             // (5) boolean diekstrak ke variabel sendiri
      currentSegmentWidth > UNUSUAL_GROWTH_THRESHOLD * previousSegmentWidth;

    if (isUnusualGrowth) {
      const growthFactor = Number(                      // (6) Number() konversi string → number
        (currentSegmentWidth / previousSegmentWidth).toFixed(1)
      );
      return { unusualSegment: i, growthFactor };
    }
  }

  return { result: NORMAL_GROWTH_MESSAGE };             // (7) pakai konstanta, bukan string mentah
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `UNUSUAL_GROWTH_THRESHOLD` | Konstanta ditulis `UPPER_CASE` — konvensi JS untuk nilai yang tidak pernah berubah |
| 2 | `NORMAL_GROWTH_MESSAGE` | Kalau pesan perlu diubah, cukup edit di satu tempat saja |
| 3 | `currentSegmentWidth` | Lebih jelas dari `current` — langsung tahu: ini lebar segmen saat ini |
| 4 | `previousSegmentWidth` | Lebih jelas dari `previous` — ini lebar segmen sebelumnya |
| 5 | `isUnusualGrowth` | Boolean diawali `is` — sehingga `if (isUnusualGrowth)` terbaca seperti kalimat |
| 6 | `Number(...toFixed(1))` | `toFixed(1)` → `"2.1"` (string), lalu `Number()` → `2.1` (number) ✅ |
| 7 | `NORMAL_GROWTH_MESSAGE` | Konsisten menggunakan konstanta, menghindari typo di string |

**Alur eksekusi dengan contoh `[5, 10, 15, 31]`:**
```
i=1: currentSegmentWidth=10, previousSegmentWidth=5
     isUnusualGrowth = 10 > 2*5 = 10 > 10 → false, lanjut

i=2: currentSegmentWidth=15, previousSegmentWidth=10
     isUnusualGrowth = 15 > 2*10 = 15 > 20 → false, lanjut

i=3: currentSegmentWidth=31, previousSegmentWidth=15
     isUnusualGrowth = 31 > 2*15 = 31 > 30 → true! ✅
     growthFactor = Number((31/15).toFixed(1)) = Number("2.1") = 2.1
     return { unusualSegment: 3, growthFactor: 2.1 }
```

**✅ Perbaikan di versi final:**
- `difference.toFixed(1)` dibungkus `Number()` agar tipenya benar
- Naming lebih deskriptif: `current` → `currentSegmentWidth`, `previous` → `previousSegmentWidth`
- Kondisi diekstrak ke variabel boolean `isUnusualGrowth` untuk keterbacaan
- Konstanta ditulis `UPPER_CASE`: `UNUSUAL_GROWTH_THRESHOLD`, `NORMAL_GROWTH_MESSAGE`

---

<a name="perbandingan-solusi"></a>
## ⚖️ Perbandingan Solusi

### 🙋 Solusi Saya (versi final)

```js
function analyzeRattlePattern(rattleSegments) {
  const UNUSUAL_GROWTH_THRESHOLD = 2;
  const NORMAL_GROWTH_MESSAGE = 'Normal growth pattern observed.';

  for (let i = 1; i < rattleSegments.length; i++) {
    const currentSegmentWidth = rattleSegments[i];
    const previousSegmentWidth = rattleSegments[i - 1];

    const isUnusualGrowth = currentSegmentWidth > UNUSUAL_GROWTH_THRESHOLD * previousSegmentWidth;

    if (isUnusualGrowth) {
      const growthFactor = Number((currentSegmentWidth / previousSegmentWidth).toFixed(1));
      return { unusualSegment: i, growthFactor };
    }
  }

  return { result: NORMAL_GROWTH_MESSAGE };
}
```

---

### 🌐 Solusi Coddy.tech (official)

```js
function analyzeRattlePattern(rattleSegments) {
  for (let i = 1; i < rattleSegments.length; i++) {
    if (rattleSegments[i] > 2 * rattleSegments[i - 1]) {   // (1) kondisi langsung inline
      return {
        unusualSegment: i,
        growthFactor: Number(                               // (2) konversi string → number
          (rattleSegments[i] / rattleSegments[i - 1])       // (3) hitung rasio
          .toFixed(1)                                       // (4) bulatkan 1 desimal
        )
      };
    }
  }
  return {
    result: "Normal growth pattern observed."              // (5) fallback jika tidak ada unusual
  };
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `rattleSegments[i] > 2 * rattleSegments[i - 1]` | Kondisi ditulis langsung tanpa variabel perantara — lebih ringkas |
| 2 | `Number(...)` | Membungkus hasil `toFixed()` agar tipe datanya number, bukan string |
| 3 | `rattleSegments[i] / rattleSegments[i - 1]` | Menghitung rasio: segmen sekarang dibagi segmen sebelumnya |
| 4 | `.toFixed(1)` | Membulatkan ke 1 angka desimal, misal `2.066...` → `"2.1"` |
| 5 | `return { result: ... }` | Dicapai hanya jika seluruh loop selesai tanpa menemukan unusual |

**Alur eksekusi dengan contoh `[5, 10, 15, 31]`:**
```
i=1: rattleSegments[1]=10 > 2*rattleSegments[0]=10 → 10 > 10 → false
i=2: rattleSegments[2]=15 > 2*rattleSegments[1]=20 → 15 > 20 → false
i=3: rattleSegments[3]=31 > 2*rattleSegments[2]=30 → 31 > 30 → true!
     growthFactor = Number((31/15).toFixed(1)) = Number("2.1") = 2.1
     return { unusualSegment: 3, growthFactor: 2.1 } ✅
```

---

### 🤖 Solusi Mentor / Claude (declarative style)

```js
function analyzeRattlePattern(rattleSegments) {
  const UNUSUAL_GROWTH_MULTIPLIER = 2;

  const unusualIndex = rattleSegments.findIndex(    // (1) findIndex: cari index pertama yang cocok
    (segment, index) =>                             // (2) callback: tiap elemen + index-nya
      index > 0 &&                                  // (3) skip index 0, tidak ada elemen sebelumnya
      segment > UNUSUAL_GROWTH_MULTIPLIER * rattleSegments[index - 1] // (4) cek kondisi unusual
  );

  if (unusualIndex === -1) {                        // (5) findIndex return -1 jika tidak ditemukan
    return { result: 'Normal growth pattern observed.' };
  }

  const growthFactor = Number(
    (rattleSegments[unusualIndex] / rattleSegments[unusualIndex - 1]).toFixed(1) // (6) hitung rasio
  );

  return { unusualSegment: unusualIndex, growthFactor }; // (7) return hasil unusual
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `findIndex(...)` | Method array bawaan JS — mencari index pertama yang memenuhi kondisi callback |
| 2 | `(segment, index) =>` | Callback menerima 2 argumen: nilai elemen dan index-nya |
| 3 | `index > 0` | Pastikan tidak mengakses `index - 1 = -1` yang tidak ada di array |
| 4 | `segment > UNUSUAL_GROWTH_MULTIPLIER * rattleSegments[index - 1]` | Sama dengan kondisi di versi `for` loop |
| 5 | `unusualIndex === -1` | `findIndex` mengembalikan `-1` jika tidak ada elemen yang cocok |
| 6 | `rattleSegments[unusualIndex - 1]` | Mengakses elemen sebelum index unusual untuk menghitung rasio |
| 7 | `{ unusualSegment: unusualIndex, ... }` | Shorthand property — nama key dan variabel berbeda, jadi ditulis eksplisit |

**Perbedaan kunci dengan `for` loop:**
```js
// for loop — kamu kendalikan iterasi sendiri
for (let i = 1; i < arr.length; i++) {
  if (kondisi) return i;
}
return -1; // implisit jika tidak ada

// findIndex — JS yang kendalikan iterasi
const index = arr.findIndex((el, i) => i > 0 && kondisi);
// otomatis return -1 jika tidak ditemukan
```

---

### 📊 Tabel Perbandingan

| Aspek | Solusi Saya | Coddy.tech | Claude |
|---|---|---|---|
| Pendekatan | Imperative (for loop) | Imperative (for loop) | Declarative (findIndex) |
| Keterbacaan | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| Keringkasan | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Naming | Deskriptif | Inline | Deskriptif |
| Konstanta | UPPER_CASE ✅ | Tidak ada | UPPER_CASE ✅ |

> 💡 Secara logika, ketiga solusi **identik** dan menghasilkan output yang sama.

---

<a name="pelajaran-yang-didapat"></a>
## 📝 Pelajaran yang Didapat

### 1. `toFixed()` mengembalikan string, bukan number
```js
(2.066).toFixed(1)         // "2.1" ← string
Number((2.066).toFixed(1)) // 2.1  ← number ✅
```

### 2. Return di dalam loop menghentikan loop sekaligus
```js
for (...) {
  if (kondisi) return value; // loop langsung berhenti di sini
}
```

### 3. Pesan default harus di luar loop
```js
// ❌ Salah — bisa tertimpa
for (...) {
  if (unusual) { ... }
  else { result = 'Normal' } // dijalankan tiap iterasi
}

// ✅ Benar — hanya dicapai jika loop selesai tanpa return
for (...) {
  if (unusual) return { ... }
}
return { result: 'Normal' }
```

### 4. Naming conventions yang baik
| Jenis | Konvensi | Contoh |
|---|---|---|
| Variabel biasa | camelCase | `currentSegmentWidth` |
| Boolean | diawali `is/has` | `isUnusualGrowth` |
| Konstanta | UPPER_CASE | `UNUSUAL_GROWTH_THRESHOLD` |

### 5. Imperative vs Declarative
| | Imperative | Declarative |
|---|---|---|
| Cara | `for` loop manual | `findIndex`, `find`, `filter` |
| Cocok untuk | Pemula, mudah di-debug | Kode ringkas dan ekspresif |
| Contoh | `for (let i = 1; ...)` | `array.findIndex(...)` |
