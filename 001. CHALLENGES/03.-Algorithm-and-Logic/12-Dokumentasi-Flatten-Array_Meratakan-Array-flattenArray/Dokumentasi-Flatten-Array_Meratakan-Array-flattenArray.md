# 📐 flattenArray — Meratakan Array Bersarang

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Topik](https://img.shields.io/badge/Topik-Rekursi-blueviolet?style=for-the-badge)
![Level](https://img.shields.io/badge/Level-Pemula-green?style=for-the-badge)

> Dokumentasi pribadi — challenge meratakan array bersarang (nested array) menjadi satu level menggunakan rekursi.

---

## 📋 Daftar Isi

- 📌 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Konsep Rekursi](#konsep-rekursi)
- 🤔 [3 Pertanyaan Inti Rekursi](#3-pertanyaan-inti-rekursi)
- 🧪 [Test Cases](#test-cases)
- 🔁 [V1 — Rekursi + `for...of` + `.push()`](#v1)
- ⚙️ [V2 — Rekursi + `.reduce()` + Spread Operator](#v2)
- 🔗 [V3 — Rekursi + `.reduce()` + `.concat()`](#v3)
- 🗺️ [V4 — Rekursi + `.map()` + `.concat()`](#v4)
- ✨ [V5 — Built-in `.flat(Infinity)`](#v5)
- 📊 [Perbandingan Semua Versi](#perbandingan)
- 🛡️ [Edge Cases](#edge-cases)
- ⚠️ [Pitfalls — Kesalahan yang Pernah Terjadi](#pitfalls)
- 📖 [Keywords](#keywords)
- 💡 [Insight](#insight)

---

<a name="deskripsi-challenge"></a>
## 📌 Deskripsi Challenge

Buatlah fungsi `flattenArray` yang menerima array berisi array-array bersarang (nested), lalu mengembalikan array baru yang semua angkanya sudah rata di satu level — tidak ada lagi array di dalamnya.

### 🔖 Function Signature

```typescript
function flattenArray(arr: number[]): number[];
```

### 🧪 Contoh Input & Output

| Input | Output |
|---|---|
| `flattenArray([1, [2, 3], [4, 5, [6]]])` | `[1, 2, 3, 4, 5, 6]` |
| `flattenArray([[1, 2], [3, [4, 5]], [6, [7]]])` | `[1, 2, 3, 4, 5, 6, 7]` |
| `flattenArray([1, [2, [3, [4, [5]]]]])` | `[1, 2, 3, 4, 5]` |

### 📏 Constraints

- Array input bisa mengandung nested array dengan kedalaman berapa pun
- Array input bisa mengandung berapa pun jumlah nested array

---

<a name="konsep-rekursi"></a>
## 🧠 Konsep Rekursi

Sebelum masuk ke solusinya, penting untuk paham dua bagian utama rekursi:

| Bagian | Penjelasan | Contoh di challenge ini |
|---|---|---|
| **Base Case** | Kondisi berhenti — kapan fungsi TIDAK memanggil dirinya lagi | Kalau `item` bukan array → langsung kembalikan `[item]` |
| **Recursive Case** | Langkah yang terus berjalan sambil memanggil dirinya sendiri | Kalau `item` adalah array → proses tiap elemennya satu per satu |

> 💬 Bayangin rekursi seperti membuka kotak hadiah yang di dalamnya ada kotak lagi, dan di dalamnya ada kotak lagi — terus sampai ketemu isinya yang bukan kotak. Nah, isi yang bukan kotak itulah yang kita kumpulkan. Itulah base case.

Kenapa challenge ini cocok pakai rekursi? Karena nested array-nya bisa **sedalam apapun**. Kita tidak tahu ada berapa lapisan array di dalamnya — jadi kita tidak bisa pakai `for` loop biasa yang hanya masuk satu level. Rekursi memungkinkan kita masuk ke lapisan seberapa pun dalamnya.

---

<a name="3-pertanyaan-inti-rekursi"></a>
## 🤔 3 Pertanyaan Inti Rekursi

Sebelum nulis kode rekursi apapun, coba jawab 3 pertanyaan ini dulu. Kalau ketiganya sudah terjawab, struktur kodenya akan terbentuk sendiri.

> 💡 Framework ini bisa dipakai ulang untuk challenge rekursi lain di masa depan — karena setiap fungsi rekursif selalu punya tiga hal: apa yang diproses, apa yang dilakukan, dan kapan berhenti.

Diterapkan ke `flattenArray`:

| Pertanyaan | Jawaban |
|---|---|
| 🚀 Apa yang diproses? | Setiap elemen di dalam array |
| ➡️ Apa yang dilakukan? | Kalau elemen adalah array → rekursi. Kalau bukan → kumpulkan |
| 🛑 Berhenti kapan? | Saat elemen yang diproses bukan array lagi (base case) |

---

<a name="test-cases"></a>
## 🧪 Test Cases

Berikut test case yang bisa dicopy-paste langsung ke console untuk mencoba masing-masing solusi.

---

**Test Case 1 — Nested satu level**

```javascript
console.log(flattenArray([1, [2, 3], [4, 5, [6]]]));
// Expected output: [1, 2, 3, 4, 5, 6]
```

---

**Test Case 2 — Beberapa nested di berbagai posisi**

```javascript
console.log(flattenArray([[1, 2], [3, [4, 5]], [6, [7]]]));
// Expected output: [1, 2, 3, 4, 5, 6, 7]
```

---

**Test Case 3 — Nested sangat dalam**

```javascript
console.log(flattenArray([1, [2, [3, [4, [5]]]]]));
// Expected output: [1, 2, 3, 4, 5]
```

---

<a name="v1"></a>
## 🔁 V1 — Rekursi + `for...of` + `.push()`

Versi paling mudah dibaca. Kita iterasi setiap elemen satu per satu pakai `for...of`, lalu putuskan: kalau bukan array langsung masukkan ke `result`, kalau array panggil fungsinya lagi secara rekursi.

```javascript
// Siapkan wadah untuk menampung hasil akhir
const flattenArray = (arr) => {
  const result = []

  for (const item of arr) {
    if (!Array.isArray(item)) {
      // Kalau item bukan array, langsung masukkan ke result
      result.push(item)
    } else {
      // Kalau item adalah array, rekursi — lalu spread hasilnya ke result
      result.push(...flattenArray(item))
    }
  }

  return result
}
```

### 🔍 Visualisasi `flattenArray([1, [2, [3]]])`

```
flattenArray([1, [2, [3]]])
│
├── item = 1 → bukan array → result.push(1) → result: [1]
│
└── item = [2, [3]] → array → flattenArray([2, [3]])
    │
    ├── item = 2 → bukan array → result.push(2) → result: [2]
    │
    └── item = [3] → array → flattenArray([3])
        │
        └── item = 3 → bukan array → result.push(3) → result: [3]
        └── return [3]  ← base case tercapai
    └── result.push(...[3]) → result: [2, 3]
    └── return [2, 3]
└── result.push(...[2, 3]) → result: [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

### 📉 Fase Descent (Turun) & Ascent (Naik)

```
DESCENT — masuk ke dalam lapisan:
flattenArray([1, [2, [3]]]) → menemukan [2, [3]]
  flattenArray([2, [3]]) → menemukan [3]
    flattenArray([3]) → menemukan 3, bukan array → BERHENTI

ASCENT — kembali sambil membawa hasil:
    return [3]
  result.push(...[3]) → [2, 3] → return [2, 3]
result.push(...[2, 3]) → [1, 2, 3] → return [1, 2, 3]
```

---

<a name="v2"></a>
## ⚙️ V2 — Rekursi + `.reduce()` + Spread Operator

Versi ini pakai `.reduce()` untuk mengumpulkan hasil rekursi ke dalam accumulator. Setiap elemen direkursi dulu, lalu hasilnya di-spread ke dalam `acc`.

```javascript
const flattenArray = (arr) => {
  const flatten = (item) => {
    // Base case: kalau bukan array, bungkus jadi array agar bisa di-spread
    if (!Array.isArray(item)) return [item]

    // Recursive case: reduce setiap elemen, spread hasilnya ke accumulator
    return item.reduce((acc, current) => [...acc, ...flatten(current)], [])
  }

  return flatten(arr)
}
```

> 💡 Kenapa base case-nya `return [item]` bukan `return item`? Karena kita akan spread hasilnya dengan `...flatten(current)` — dan spread hanya bisa dilakukan ke array. Kalau `item` adalah angka dan langsung di-return tanpa dibungkus, spread-nya akan error.

### 🔍 Visualisasi `flattenArray([1, [2, 3]])`

```
flatten([1, [2, 3]])
│
├── reduce: current = 1
│   flatten(1) → [1]  ← base case
│   acc = [...[], ...[1]] → [1]
│
└── reduce: current = [2, 3]
    flatten([2, 3])
    ├── reduce: current = 2 → flatten(2) → [2] → acc: [2]
    └── reduce: current = 3 → flatten(3) → [3] → acc: [2, 3]
    return [2, 3]
    acc = [...[1], ...[2, 3]] → [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

### 📉 Fase Descent & Ascent

```
DESCENT:
flatten([1, [2, 3]]) → flatten(1), flatten([2, 3])
  flatten([2, 3]) → flatten(2), flatten(3)
    flatten(2) → [2]  ← base case
    flatten(3) → [3]  ← base case

ASCENT:
  [...[], ...[2]] → [2]
  [...[2], ...[3]] → [2, 3]  → return [2, 3]
[...[], ...[1]] → [1]
[...[1], ...[2, 3]] → [1, 2, 3]  → return [1, 2, 3]
```

---

<a name="v3"></a>
## 🔗 V3 — Rekursi + `.reduce()` + `.concat()`

Hampir sama persis dengan V2 — bedanya hanya cara menggabungkan hasil rekursi ke accumulator. V2 pakai spread operator `...`, V3 pakai `.concat()`. Hasilnya identik.

```javascript
const flattenArray = (arr) => {
  const flatten = (item) => {
    // Base case: kalau bukan array, kembalikan langsung
    if (!Array.isArray(item)) return item

    // Recursive case: reduce tiap elemen, concat hasilnya ke accumulator
    return item.reduce((acc, current) => {
      return acc.concat(flatten(current))
    }, [])
  }

  return flatten(arr)
}
```

> 💡 Kenapa di V3 base case-nya `return item` (tanpa dibungkus array), tapi di V2 harus `return [item]`?
> Karena `.concat()` lebih fleksibel dari spread — kalau argumennya bukan array, `.concat()` tetap bisa menambahkannya sebagai satu elemen. Sedangkan spread `...` butuh array.

### 🔍 Perbandingan V2 vs V3

```javascript
// V2 — pakai spread, base case harus return [item]
return item.reduce((acc, current) => [...acc, ...flatten(current)], [])

// V3 — pakai concat, base case cukup return item
return item.reduce((acc, current) => acc.concat(flatten(current)), [])
```

### 🔍 Visualisasi `flattenArray([1, [2, 3]])`

```
flatten([1, [2, 3]])
│
├── reduce: current = 1
│   flatten(1) → 1  ← base case (bukan array, return langsung)
│   acc = [].concat(1) → [1]
│
└── reduce: current = [2, 3]
    flatten([2, 3])
    ├── acc = [].concat(2) → [2]
    └── acc = [2].concat(3) → [2, 3]
    return [2, 3]
    acc = [1].concat([2, 3]) → [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

---

<a name="v4"></a>
## 🗺️ V4 — Rekursi + `.map()` + `.concat()`

Versi ini pakai `.map()` untuk merekursi setiap elemen, lalu hasilnya digabungkan jadi satu level pakai `[].concat(...mapped)`.

```javascript
const flattenArray = (arr) => {
  const flatten = (item) => {
    // Base case: kalau bukan array, bungkus jadi array
    if (!Array.isArray(item)) return [item]

    // Rekursi setiap elemen dulu, simpan hasilnya di mapped
    const mapped = item.map(value => flatten(value))

    // Gabungkan semua array hasil map jadi satu level
    return [].concat(...mapped)
  }

  return flatten(arr)
}
```

> 💡 Kenapa pakai `[].concat(...mapped)` bukan langsung `mapped.concat()`?
> Karena `mapped` adalah **array of arrays** — misalnya `[[1], [2, 3]]`. Kalau kita spread isinya ke `.concat()`, semua elemen akan digabung jadi satu: `[1, 2, 3]`. Kalau tidak di-spread, hasilnya tetap nested.

### 🔍 Visualisasi `flattenArray([1, [2, 3]])`

```
flatten([1, [2, 3]])
│
├── map:
│   value = 1 → flatten(1) → [1]
│   value = [2, 3] → flatten([2, 3])
│       map:
│       value = 2 → flatten(2) → [2]
│       value = 3 → flatten(3) → [3]
│       mapped = [[2], [3]]
│       [].concat(...[[2], [3]]) → [2, 3]
│
├── mapped = [[1], [2, 3]]
└── [].concat(...[[1], [2, 3]]) → [1, 2, 3]

Hasil akhir: [1, 2, 3] ✅
```

### 📉 Fase Descent & Ascent

```
DESCENT:
flatten([1, [2, 3]]) → map tiap elemen
  flatten(1) → [1]  ← base case
  flatten([2, 3]) → map tiap elemen
    flatten(2) → [2]  ← base case
    flatten(3) → [3]  ← base case

ASCENT:
    mapped = [[2], [3]]
    [].concat(...[[2], [3]]) → [2, 3]  → return [2, 3]
  mapped = [[1], [2, 3]]
  [].concat(...[[1], [2, 3]]) → [1, 2, 3]  → return [1, 2, 3]
```

---

<a name="v5"></a>
## ✨ V5 — Built-in `.flat(Infinity)`

Versi paling singkat. JavaScript sudah punya method `.flat()` bawaan yang bisa meratakan array. Tinggal pass `Infinity` sebagai argument agar bisa flatten array sedalam apapun.

```javascript
// Satu baris sudah cukup!
const flattenArray = (arr) => arr.flat(Infinity)
```

> 💡 Kenapa pakai `Infinity`? Karena `.flat()` by default hanya meratakan **1 level** saja. Misalnya `[1, [2, [3]]].flat()` hasilnya `[1, 2, [3]]` — masih ada nested! Dengan `Infinity`, semua level ikut diratakan sampai habis.

```javascript
[1, [2, [3]]].flat()           // → [1, 2, [3]]  ← masih nested!
[1, [2, [3]]].flat(Infinity)   // → [1, 2, 3]    ← sudah rata ✅
```

> ⚠️ Catatan: versi ini paling singkat, tapi kita tidak implementasi sendiri logika flatten-nya. Untuk tujuan belajar rekursi, V1–V4 jauh lebih bermanfaat.

---

<a name="perbandingan"></a>
## 📊 Perbandingan Semua Versi

| | V1 | V2 | V3 | V4 | V5 |
|---|---|---|---|---|---|
| **Pendekatan** | `for...of` + `.push()` | `.reduce()` + spread | `.reduce()` + `.concat()` | `.map()` + `.concat()` | `.flat(Infinity)` |
| **Base case** | `!Array.isArray` | `return [item]` | `return item` | `return [item]` | — |
| **Cara gabung** | `push(...rekursi)` | `[...acc, ...flatten]` | `acc.concat(flatten)` | `[].concat(...mapped)` | built-in |
| **Keterbacaan** | ✅✅ Paling mudah | ✅ Mudah | ✅ Mudah | ⚠️ Perlu teliti | ✅✅ Paling singkat |
| **Cocok untuk belajar** | ✅✅ | ✅✅ | ✅✅ | ✅ | ⚠️ Kurang, terlalu singkat |

---

<a name="edge-cases"></a>
## 🛡️ Edge Cases

### 1. Array kosong

```javascript
flattenArray([]);
// → [] ✅ — for...of tidak akan masuk loop, reduce return nilai awal []
```

### 2. Semua elemen sudah flat (tidak ada nested)

```javascript
flattenArray([1, 2, 3]);
// → [1, 2, 3] ✅ — setiap elemen bukan array, langsung dikembalikan
```

### 3. Nested sangat dalam

```javascript
flattenArray([1, [2, [3, [4, [5]]]]]);
// → [1, 2, 3, 4, 5] ✅ — rekursi akan terus masuk sampai base case
```

### 4. Array berisi satu elemen yang nested

```javascript
flattenArray([[[[42]]]]);
// → [42] ✅
```

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls — Kesalahan yang Pernah Terjadi

Ini catatan kesalahan nyata yang terjadi selama mengerjakan challenge ini.

---

### 1. Pakai `.map()` tanpa menggabungkan hasilnya

❌ **Salah** — `.map()` selalu mengembalikan array, jadi hasilnya tetap nested:
```javascript
const flatten = (item) => {
  if (!Array.isArray(item)) return item
  return item.map(value => flatten(value))  // hasilnya masih array of arrays!
}
// flattenArray([1, [2, 3]]) → [1, [2, 3]] ← tidak flat
```

✅ **Benar** — hasil `.map()` perlu digabungkan jadi satu level:
```javascript
const mapped = item.map(value => flatten(value))
return [].concat(...mapped)
```

---

### 2. Base case tidak membungkus nilai dalam array (saat pakai spread)

❌ **Salah** — kalau base case return angka biasa, spread akan error:
```javascript
if (!Array.isArray(item)) return item  // return angka

return item.reduce((acc, current) => [...acc, ...flatten(current)], [])
// Error: flatten(current) is not iterable ← tidak bisa di-spread!
```

✅ **Benar** — bungkus dalam array agar bisa di-spread:
```javascript
if (!Array.isArray(item)) return [item]  // return array
```

---

### 3. `.concat()` dipanggil di dalam `.map()` pada `value`

❌ **Salah** — `value` bisa jadi angka, tidak punya method `.concat()` seperti array:
```javascript
return item.map(value => value.concat(flatten(value)))
// TypeError: value.concat is not a function
```

✅ **Benar** — `.concat()` dipanggil di luar `.map()`, di array kosong `[]`:
```javascript
const mapped = item.map(value => flatten(value))
return [].concat(...mapped)
```

---

### 4. `.map()` tidak memanggil rekursi

❌ **Salah** — `value => value` hanya meng-copy elemen, tidak merekursi:
```javascript
return item.map(value => value).concat(flatten)
// hasilnya tetap nested, dan flatten adalah fungsinya bukan hasil rekursi
```

✅ **Benar** — setiap `value` harus direkursi:
```javascript
return item.map(value => flatten(value))
```

---

### 5. Passing fungsi ke `.concat()`, bukan hasil rekursi

❌ **Salah** — `flatten` di sini adalah referensi fungsi, bukan hasil pemanggilannya:
```javascript
return item.map(value => flatten(value)).concat(flatten)
// hasilnya: [...array, function flatten] ← fungsinya ikut masuk array!
```

✅ **Benar** — spread hasil `.map()` ke `.concat()`:
```javascript
return [].concat(...item.map(value => flatten(value)))
```

---

### 6. `.concat()` tanpa argument

❌ **Salah** — `.concat()` tanpa argument tidak melakukan apa-apa:
```javascript
return item.map(value => flatten(value)).concat()
// hasilnya tetap array of arrays, tidak digabungkan
```

✅ **Benar** — spread `mapped` sebagai argument:
```javascript
return [].concat(...mapped)
```

---

### 7. Spread `value` yang out of scope

❌ **Salah** — `value` hanya ada di dalam callback `.map()`, tidak bisa diakses di luar:
```javascript
return item.map(value => flatten(value)).concat(...value)
// ReferenceError: value is not defined
```

✅ **Benar** — simpan hasil `.map()` ke variabel dulu:
```javascript
const mapped = item.map(value => flatten(value))
return [].concat(...mapped)
```

---

### 8. `return` di dalam `for...of` loop — fungsi berhenti terlalu cepat

❌ **Salah** — `return` di dalam loop membuat fungsi berhenti di elemen pertama yang bukan array:
```javascript
for (const item of arr) {
  if (!Array.isArray(item)) return [item]  // langsung return, loop berhenti!
}
```

✅ **Benar** — gunakan `.push()` agar loop terus berjalan:
```javascript
for (const item of arr) {
  if (!Array.isArray(item)) result.push(item)
}
```

---

### 9. `.push()` langsung tanpa rekursi saat elemen adalah array

❌ **Salah** — `push(...item)` hanya menyebarkan elemen satu level, tidak masuk ke nested yang lebih dalam:
```javascript
} else {
  result.push(...item)  // nested di dalam item tidak ikut diproses!
}
```

✅ **Benar** — rekursi dulu, baru push hasilnya:
```javascript
} else {
  result.push(...flattenArray(item))
}
```

---

### 10. Memanggil rekursi tapi hasilnya tidak dipakai

❌ **Salah** — `flattenArray(item)` dipanggil tapi hasilnya dibuang begitu saja:
```javascript
} else {
  flattenArray(item)  // hasilnya tidak masuk ke result!
}
```

✅ **Benar** — spread hasilnya ke dalam `result`:
```javascript
} else {
  result.push(...flattenArray(item))
}
```

---

<a name="keywords"></a>
## 📖 Keywords

| Istilah | Penjelasan |
|---|---|
| **Rekursi** | Teknik di mana fungsi memanggil dirinya sendiri |
| **Base Case** | Kondisi berhenti rekursi agar tidak looping selamanya |
| **Recursive Case** | Bagian fungsi yang memanggil dirinya sendiri dengan input yang lebih kecil |
| **Nested Array** | Array yang di dalamnya mengandung array lain |
| **Flatten** | Proses meratakan array bersarang menjadi satu level |
| **`Array.isArray()`** | Method untuk mengecek apakah suatu nilai adalah array |
| **`concat()`** | Method array untuk menggabungkan dua array atau lebih menjadi satu |
| **Spread Operator (`...`)** | Sintaks untuk menyebarkan elemen array ke dalam array atau argument fungsi |
| **`.reduce()`** | Method array untuk mengakumulasi nilai dari semua elemen menjadi satu hasil |
| **`.map()`** | Method array untuk mentransformasi setiap elemen menjadi nilai baru |
| **`.flat()`** | Method bawaan JavaScript untuk meratakan nested array |
| **Call Stack** | Tumpukan pemanggilan fungsi — setiap rekursi menambah satu lapisan |
| **Descent** | Fase rekursi turun — fungsi terus memanggil dirinya ke lapisan lebih dalam |
| **Ascent** | Fase rekursi naik — fungsi mulai mengembalikan nilai dari lapisan terdalam ke luar |

---

<a name="insight"></a>
## 💡 Insight

> Challenge `flattenArray` mengajarkan sesuatu yang penting: **rekursi bersinar justru saat kita tidak tahu seberapa dalam masalahnya**. Kalau nested array-nya cuma satu level, `for` loop biasa sudah cukup. Tapi kalau bisa sedalam apapun — di situlah rekursi tidak tergantikan.

> Setiap versi solusi di atas pada dasarnya melakukan hal yang sama: **cek dulu apakah ini array atau bukan. Kalau bukan, kumpulkan. Kalau iya, masuk lebih dalam.** Yang berbeda hanya cara mengumpulkan dan menggabungkan hasilnya — ada yang pakai `push`, `reduce`, `map`, atau `concat`. Pilih mana yang paling mudah dibaca untuk dirimu sendiri.

> Kesalahan terbanyak terjadi di V4 (`map` + `concat`) — dan itu wajar. Kombinasi dua method sekaligus dengan spread di tempat yang tepat memang butuh latihan. Yang penting bukan tidak pernah salah, tapi paham *kenapa* salah dan tahu cara memperbaikinya.
