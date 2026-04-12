# ⚠️ Part 07 — Pitfalls & Jebakan Umum

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-10%20minutes-blue)
![Level](https://img.shields.io/badge/Level-🌱%20Pemula-green)

---

## 🧭 Quick Jump

| 🐛 Kode Awal | ❌ Pitfall 1 | ❌ Pitfall 2 | ❌ Pitfall 3 | ❌ Pitfall 4 | ❌ Pitfall 5 |
|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|:-----------:|
| [Jump](#-kode-awal-sebelum-diperbaiki) | [Jump](#-pitfall-1--j-dimulai-dari-0) | [Jump](#-pitfall-2-return-string-bukan-array) | [Jump](#-pitfall-3-pakai-indexof-untuk-cari-posisi) | [Jump](#-pitfall-4-map-set-sebelum-map-has) | [Jump](#-pitfall-5-tidak-ada-return--di-akhir) |

---

## 🎯 Tujuan Pembelajaran

Setelah membaca part ini, kamu akan:
- ✅ Mengenali kesalahan umum yang sering terjadi di challenge Two Sum
- ✅ Memahami **kenapa** setiap kesalahan terjadi
- ✅ Tahu cara memperbaiki setiap kesalahan
- ✅ Tidak mengulangi kesalahan yang sama di challenge berikutnya

---

## 🐛 Kode Awal Sebelum Diperbaiki

Ini adalah kode pertama yang ditulis sebelum proses debugging — masih banyak masalah:

```javascript
const twoSum = (numbers, number) => {
  const result = []

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {   // ← bug 1: j dari 0
      if (numbers[i] + numbers[j] === number) {
        result.push(numbers[i], numbers[j])
        break
      }
    }
  }

  const resultPosition = []

  const number1 = result[0]
  const number2 = result[1]

  const position1 = numbers.indexOf(number1)      // ← bug 3: pakai indexOf
  const position2 = numbers.indexOf(number2)      // ← bug 3: pakai indexOf

  resultPosition.push(position1, position2)

  console.log(resultPosition)

  return `${resultPosition} (${number1} + ${number2} = ${number})` // ← bug 2: return string
}
```

Ada **3 bug utama** di kode awal ini, plus **2 kebiasaan yang perlu diperbaiki**. Mari kita bahas satu per satu.

---

## ❌ Pitfall 1 — `j` Dimulai dari `0`

### Masalahnya:

```javascript
// ❌ j dari 0 — bisa pasangan diri sendiri!
for (let j = 0; j < numbers.length; j++) {
```

Kalau `j` mulai dari `0`, ada kemungkinan `i` dan `j` menunjuk ke **index yang sama** — artinya satu elemen dipasangkan dengan dirinya sendiri.

Contoh array `[3, 2, 4]` target `6`:
```
i=0, j=0 → numbers[0] + numbers[0] = 3 + 3 = 6 ✅
→ Ketemu! Tapi ini bukan dua elemen berbeda — ini elemen yang sama!
→ Hasilnya [0, 0] padahal seharusnya [1, 2]
```

### Solusinya:

```javascript
// ✅ j dari i + 1 — setiap pasangan unik!
for (let j = i + 1; j < numbers.length; j++) {
```

Dengan `j = i + 1`, `j` selalu berada **satu langkah setelah** `i` — tidak mungkin sama.

---

## ❌ Pitfall 2 — Return String Bukan Array

### Masalahnya:

```javascript
// ❌ Return string — bukan yang diminta challenge!
return `${resultPosition} (${number1} + ${number2} = ${number})`
```

Ketika array dimasukkan ke dalam template literal, JavaScript otomatis mengubahnya jadi string:

```javascript
const arr = [0, 1]
console.log(typeof arr)          // "object" (array)
console.log(typeof `${arr}`)     // "string"
console.log(`${arr}`)            // "0,1" ← bukan array lagi!
```

Bagian `(2 + 7 = 9)` di contoh soal **bukan** format output — itu hanya komentar penjelasan dari pembuat soal!

### Solusinya:

```javascript
// ✅ Return array langsung
return [i, j]
// atau
return resultPosition
```

---

## ❌ Pitfall 3 — Pakai `indexOf()` untuk Mencari Posisi

### Masalahnya:

```javascript
// ❌ indexOf selalu cari dari kiri — salah untuk duplikat!
const position1 = numbers.indexOf(number1)
const position2 = numbers.indexOf(number2)
```

`indexOf()` selalu mengembalikan index **pertama** yang ditemukan dari kiri. Untuk array dengan nilai duplikat, ini bisa salah:

```javascript
const numbers = [3, 3]
numbers.indexOf(3)  // selalu 0, tidak pernah 1!
// → position1 = 0, position2 = 0
// → Hasilnya [0, 0] padahal seharusnya [0, 1]
```

Padahal kita sudah punya `i` dan `j` yang menyimpan indeks yang benar — tidak perlu cari lagi!

### Solusinya:

```javascript
// ✅ Langsung pakai i dan j — sudah pasti benar!
return [i, j]
```

---

## ❌ Pitfall 4 — `map.set` Sebelum `map.has`

### Masalahnya:

```javascript
// ❌ Simpan dulu, baru cek — bisa cocok dengan diri sendiri!
map.set(numbers[i], i)        // ← simpan dulu
if (map.has(complement)) {    // ← baru cek
  return [map.get(complement), i]
}
```

Kalau kita simpan dulu baru cek, elemen bisa cocok dengan **dirinya sendiri**. Contoh array `[5, 3]` target `10`:

```
i=0, numbers[0]=5, complement=5
map.set(5, 0) → Map: { 5→0 }
map.has(5)?   → ✅ ADA! (padahal baru saja kita simpan sendiri)
return [0, 0] ← SALAH! seharusnya tidak ada pasangan
```

### Solusinya:

```javascript
// ✅ Cek dulu, baru simpan — urutan yang benar!
if (map.has(complement)) {    // ← cek dulu
  return [map.get(complement), i]
}
map.set(numbers[i], i)        // ← baru simpan
```

---

## ❌ Pitfall 5 — Tidak Ada `return []` di Akhir

### Masalahnya:

```javascript
// ❌ Tanpa return [] — fungsi bisa return undefined!
const twoSum = (numbers, number) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === number) {
        return [i, j]
      }
    }
  }
  // tidak ada return di sini!
}

console.log(twoSum([1, 2, 3], 100))  // → undefined ← berbahaya!
```

Kalau tidak ada pasangan yang ditemukan, fungsi tidak mengembalikan apapun — JavaScript secara otomatis mengembalikan `undefined`.

### Solusinya:

```javascript
// ✅ Selalu tambahkan return [] di akhir
const twoSum = (numbers, number) => {
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === number) {
        return [i, j]
      }
    }
  }
  
  return []  // ← aman!
}
```

---

## ✅ Ringkasan Semua Pitfalls

| # | Pitfall | Penyebab | Solusi |
|---|---------|----------|--------|
| 1 | `j` dari `0` | Pasangan diri sendiri / duplikat kombinasi | Ganti ke `j = i + 1` |
| 2 | Return string | Template literal mengubah array ke string | Return array langsung `[i, j]` |
| 3 | Pakai `indexOf()` | Selalu ambil index pertama, salah untuk duplikat | Langsung pakai `i` dan `j` |
| 4 | `map.set` sebelum `map.has` | Elemen cocok dengan dirinya sendiri | Selalu `map.has` dulu, baru `map.set` |
| 5 | Tidak ada `return []` | Fungsi return `undefined` jika tidak ada pasangan | Tambahkan `return []` di akhir |

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 06: Perbandingan Semua Solusi](06-comparison-all-solutions_perbandingan-semua-solusi.md)**
- **📖 [Lanjut ke Part 08: Test Cases →](08-test-cases_pengujian-semua-versi.md)**

---

<div align="center">

Made with ❤️ for learners

</div>