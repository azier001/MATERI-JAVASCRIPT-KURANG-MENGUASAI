# 🏅 Manual Ranking
### Mengurutkan Data Tanpa Sorting

![Kategori](https://img.shields.io/badge/Kategori-Ranking-red)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Menengah-yellow)
![Topik](https://img.shields.io/badge/Topik-Comparison%20%7C%20Ranking%20%7C%20Array-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Manual Ranking |
| 2 | [🧠 Memahami Konsep](#-memahami-konsep) | Inti cara kerjanya |
| 3 | [🧪 Contoh Kasus](#-contoh-kasus) | Input & output yang diharapkan |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |
| 11 | [✍️ Latihan Menulis Ulang](#️-latihan-menulis-ulang) | Praktik bertahap |

---

## 📋 Deskripsi

**Manual Ranking** adalah teknik mengambil top-K data terbaik dari sekumpulan data tanpa menggunakan `.sort()`.

Digunakan ketika:
- mengambil **2 angka tertinggi** dari array
- mempertahankan **top-K data** secara efisien
- bekerja dengan **data yang terus masuk** satu per satu

> Manual Ranking adalah fondasi dari `top-1-per-group` dan `top-2-per-group` — sebelum diterapkan ke data berkelompok, pahami dulu cara kerjanya pada array sederhana.

---

## 🧠 Memahami Konsep

> Inti dari manual ranking:
> **Pertahankan array kecil berisi top-K data terbaik. Setiap data baru dievaluasi — masuk, menggantikan, atau diabaikan.**

Bayangkan kamu punya dua kursi VIP. Setiap orang baru yang datang dievaluasi: apakah ia layak duduk di kursi pertama, kedua, atau tidak sama sekali? Jika layak di kursi pertama, orang di kursi pertama bergeser ke kursi kedua.

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const numbers = [10, 5, 20, 8, 15]
```

**Output yang diharapkan (top 2):**
```javascript
[20, 15]  // [rank1, rank2]
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Iterasi (loop) | Menelusuri setiap elemen satu per satu |
| Array sebagai wadah ranking | Menyimpan top-K data dengan urutan terjaga |
| Perbandingan bertahap | Bandingkan dari rank tertinggi ke terendah |
| `unshift()` | Menyisipkan elemen baru di posisi pertama |

---

## 🔄 Implementasi

```javascript
const topTwo = (arr) => {                // 1️⃣ Fungsi menerima array angka
  const result = []                      // 2️⃣ Wadah ranking, dimulai kosong

  for (const num of arr) {              // 3️⃣ Telusuri setiap angka satu per satu

    if (result.length === 0) {          // 4️⃣ Kasus 1: result masih kosong
      result.push(num)                  //    → langsung masukkan sebagai rank 1

    } else if (result.length === 1) {   // 5️⃣ Kasus 2: baru ada 1 data
      if (num > result[0]) {            //    → jika lebih tinggi dari rank 1
        result.unshift(num)             //       sisipkan di depan (jadi rank 1)
      } else {                          //    → jika lebih rendah
        result.push(num)                //       tambahkan di belakang (jadi rank 2)
      }

    } else {                            // 6️⃣ Kasus 3: sudah ada 2 data (penuh)
      if (num > result[0]) {            //    → lebih tinggi dari rank 1?
        result[1] = result[0]           //       geser rank 1 ke posisi rank 2
        result[0] = num                 //       masukkan sebagai rank 1 baru
      } else if (num > result[1]) {     //    → hanya lebih tinggi dari rank 2?
        result[1] = num                 //       ganti rank 2 langsung
      }
      // jika lebih rendah dari keduanya → abaikan
    }
  }

  return result                         // 7️⃣ Kembalikan array berisi top 2
}
```

**Hasil:**
```javascript
console.log(topTwo([10, 5, 20, 8, 15])) // [20, 15]
console.log(topTwo([3, 1, 4, 1, 5, 9])) // [9, 5]
console.log(topTwo([7]))                 // [7]
console.log(topTwo([]))                  // []
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topTwo = (arr)` | Fungsi menerima array angka sebagai input |
| 2️⃣ | `const result = []` | Array kosong sebagai wadah ranking — akan berisi maksimal 2 angka |
| 3️⃣ | `for (const num of arr)` | Loop menelusuri setiap angka satu per satu — `num` adalah angka saat ini |
| 4️⃣ | `result.length === 0` → `push` | Array masih kosong: langsung masukkan tanpa perlu membandingkan apapun |
| 5️⃣ | `result.length === 1` | Baru ada 1 data: bandingkan dengan rank 1. Jika lebih tinggi → `unshift()`, jika lebih rendah → `push()` |
| 6️⃣ | `else` (length === 2) | Array penuh: bandingkan dari atas. Geser rank 1 ke bawah jika perlu, atau ganti rank 2 saja, atau abaikan |
| 7️⃣ | `return result` | Kembalikan array `[rank1, rank2]` |

---

## 🧪 Visualisasi

**Data:** `[10, 5, 20, 8, 15]`

| Langkah | `num` | `result` sebelum | Kasus | Aksi | `result` setelah |
|---------|-------|------------------|-------|------|------------------|
| 1 | `10` | `[]` | length = 0 | `push(10)` | `[10]` |
| 2 | `5` | `[10]` | length = 1, `5 > 10` ❌ | `push(5)` | `[10, 5]` |
| 3 | `20` | `[10, 5]` | length = 2, `20 > 10` ✅ | geser, `result[0] = 20` | `[20, 10]` |
| 4 | `8` | `[20, 10]` | length = 2, `8 > 20` ❌, `8 > 10` ❌ | abaikan | `[20, 10]` |
| 5 | `15` | `[20, 10]` | length = 2, `15 > 20` ❌, `15 > 10` ✅ | `result[1] = 15` | `[20, 15]` |

**Hasil akhir:** `[20, 15]` ✅

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan `.sort()` + `.slice()`

```javascript
const topTwo = (arr) => {                        // 1️⃣ Fungsi menerima array angka
  return [...arr]                                // 2️⃣ Salin array agar tidak mengubah aslinya
    .sort((a, b) => b - a)                       // 3️⃣ Urutkan descending
    .slice(0, 2)                                 // 4️⃣ Ambil 2 elemen pertama
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topTwo = (arr)` | Fungsi menerima array angka |
| 2️⃣ | `[...arr]` | Spread operator menyalin array — `.sort()` mengubah array asli, jadi kita salin dulu agar data asli tidak berubah |
| 3️⃣ | `.sort((a, b) => b - a)` | Mengurutkan dari besar ke kecil. `b - a` positif jika `b > a` — elemen yang lebih besar didahulukan |
| 4️⃣ | `.slice(0, 2)` | Mengambil elemen dari index 0 sampai index 1 — hasilnya array berisi 2 elemen pertama |

**Visualisasi — fokus: sort dulu, slice kemudian**

Data: `[10, 5, 20, 8, 15]`

| Tahap | Array |
|-------|-------|
| Input | `[10, 5, 20, 8, 15]` |
| Setelah `[...arr]` | `[10, 5, 20, 8, 15]` (salinan baru) |
| Setelah `.sort()` | `[20, 15, 10, 8, 5]` |
| Setelah `.slice(0, 2)` | `[20, 15]` ✅ |

**Hasil:**
```javascript
console.log(topTwo([10, 5, 20, 8, 15])) // [20, 15]
console.log(topTwo([3, 1, 4, 1, 5, 9])) // [9, 5]
console.log(topTwo([7]))                 // [7]
console.log(topTwo([]))                  // []
```

> **Kapan pakai ini?**
> Lebih mudah ditulis dan dibaca. Cocok untuk array sederhana dan ukuran data yang tidak terlalu besar. Untuk top-K yang besar (top-5, top-10), versi ini jauh lebih praktis daripada manual ranking.

---

## ⚠️ Jebakan Umum

### ❌ 1. Langsung compare tanpa cek keberadaan data

```javascript
if (num > result[0]) { ... } // ❌ Error jika result masih kosong
```

**Masalah:** Jika `result` masih kosong, `result[0]` adalah `undefined` — perbandingan dengan `undefined` menghasilkan `false` selamanya, bukan error, tapi hasilnya salah.

✅ **Solusi:** Selalu cek `result.length` dulu sebelum membandingkan.

---

### ❌ 2. Lupa menggeser rank 1 sebelum menimpanya

```javascript
result[0] = num       // ❌ rank 1 lama hilang sebelum disimpan
result[1] = result[0] // terlambat — result[0] sudah ditimpa
```

**Masalah:** Urutan baris ini salah — rank 1 lama hilang sebelum sempat dipindahkan ke rank 2.

✅ **Solusi:** Geser dulu, baru timpa:
```javascript
result[1] = result[0] // simpan rank 1 lama ke rank 2
result[0] = num       // baru timpa rank 1 dengan data baru
```

---

### ❌ 3. Mengubah array asli saat menggunakan `.sort()`

```javascript
return arr.sort((a, b) => b - a).slice(0, 2) // ❌ arr asli berubah urutannya
```

**Masalah:** `.sort()` mengubah array secara langsung (in-place) — array asli yang dikirim ke fungsi ikut berubah.

✅ **Solusi:** Salin dulu sebelum sort:
```javascript
return [...arr].sort((a, b) => b - a).slice(0, 2)
```

---

## 💡 Insight

> **Manual Ranking adalah Max Pattern yang diperluas untuk top-K.**
> Max Pattern menyimpan 1 nilai terbaik. Manual Ranking menyimpan K nilai terbaik — dengan logika yang lebih kompleks tapi tetap O(n).

Perbandingan pendekatan:

| | Manual Ranking | Sort + Slice |
|--|----------------|--------------|
| Kompleksitas | O(n) | O(n log n) |
| Keterbacaan | Lebih kompleks | Lebih mudah dibaca |
| Mengubah array asli | Tidak | Ya (kecuali disalin dulu) |
| Fleksibilitas top-K | Perlu ubah logika | Cukup ubah angka di `.slice()` |

---

## 📝 Pelajaran yang Didapat

- ✅ Manual Ranking adalah cara mempertahankan top-K data tanpa sorting
- ✅ Tiga kasus yang selalu muncul: array kosong, belum penuh, sudah penuh
- ✅ Urutan operasi penting: geser rank lama dulu sebelum menimpa
- ✅ Perbedaan `push()` (tambah di belakang) vs `unshift()` (sisip di depan)
- ✅ Kenapa `[...arr]` diperlukan sebelum `.sort()` — mencegah mutasi array asli
- ✅ Trade-off: Manual Ranking O(n) vs Sort + Slice O(n log n)

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Manual Ranking

**Langkah 1** — Deklarasikan fungsi:
```javascript
const topTwo = (arr) => {

}
```
> Fungsi menerima satu parameter `arr` berupa array angka.

---

**Langkah 2** — Siapkan wadah hasil:
```javascript
const topTwo = (arr) => {
  const result = []
}
```
> `result` adalah array kosong yang nantinya akan berisi maksimal 2 angka terbaik dengan urutan `[rank1, rank2]`.

---

**Langkah 3** — Buka loop:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {

  }
}
```
> `for...of` menelusuri setiap angka satu per satu. `num` adalah nilai angka saat ini.

---

**Langkah 4** — Tambahkan kasus pertama: result masih kosong:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {
    if (result.length === 0) {
      result.push(num)
    }
  }
}
```
> Jika `result` masih kosong, tidak ada yang perlu dibandingkan — langsung masukkan angka pertama sebagai rank 1.

---

**Langkah 5** — Tambahkan kasus kedua: baru ada 1 data, angka baru lebih tinggi:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {
    if (result.length === 0) {
      result.push(num)
    } else if (result.length === 1) {
      if (num > result[0]) {
        result.unshift(num)
      }
    }
  }
}
```
> `unshift()` menyisipkan `num` di posisi index 0 — angka lama otomatis bergeser ke index 1. Hasilnya `[num_baru, rank1_lama]`.

---

**Langkah 6** — Lengkapi kasus kedua: angka baru lebih rendah:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {
    if (result.length === 0) {
      result.push(num)
    } else if (result.length === 1) {
      if (num > result[0]) {
        result.unshift(num)
      } else {
        result.push(num)
      }
    }
  }
}
```
> Jika lebih rendah dari rank 1, cukup `push()` di belakang — angka baru langsung jadi rank 2.

---

**Langkah 7** — Tambahkan kasus ketiga: result penuh, angka baru lebih tinggi dari rank 1:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {
    if (result.length === 0) {
      result.push(num)
    } else if (result.length === 1) {
      if (num > result[0]) {
        result.unshift(num)
      } else {
        result.push(num)
      }
    } else {
      if (num > result[0]) {
        result[1] = result[0]
        result[0] = num
      }
    }
  }
}
```
> `result[1] = result[0]` menyimpan rank 1 lama ke posisi rank 2 dulu — baru kemudian `result[0]` diisi angka baru. Urutan ini **sangat penting** agar rank 1 lama tidak hilang.

---

**Langkah 8** — Tambahkan sub-kasus: angka baru hanya lebih tinggi dari rank 2:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {
    if (result.length === 0) {
      result.push(num)
    } else if (result.length === 1) {
      if (num > result[0]) {
        result.unshift(num)
      } else {
        result.push(num)
      }
    } else {
      if (num > result[0]) {
        result[1] = result[0]
        result[0] = num
      } else if (num > result[1]) {
        result[1] = num
      }
    }
  }
}
```
> Jika angka baru tidak mengalahkan rank 1 tapi mengalahkan rank 2, cukup ganti `result[1]` langsung. Jika lebih rendah dari keduanya — tidak ada aksi, angka diabaikan.

---

**Langkah 9** — Kembalikan hasil:
```javascript
const topTwo = (arr) => {
  const result = []

  for (const num of arr) {
    if (result.length === 0) {
      result.push(num)
    } else if (result.length === 1) {
      if (num > result[0]) {
        result.unshift(num)
      } else {
        result.push(num)
      }
    } else {
      if (num > result[0]) {
        result[1] = result[0]
        result[0] = num
      } else if (num > result[1]) {
        result[1] = num
      }
    }
  }

  return result
}
```
> Fungsi selesai. `return result` mengembalikan array `[rank1, rank2]` berisi 2 angka terbesar.

**Hasil:**
```javascript
console.log(topTwo([10, 5, 20, 8, 15])) // [20, 15]
console.log(topTwo([3, 1, 4, 1, 5, 9])) // [9, 5]
console.log(topTwo([7]))                 // [7]
console.log(topTwo([]))                  // []
```

---

### Versi 2 — Sort + Slice

**Langkah 1** — Deklarasikan fungsi:
```javascript
const topTwo = (arr) => {

}
```
> Fungsi menerima array angka sebagai input.

---

**Langkah 2** — Salin array asli:
```javascript
const topTwo = (arr) => {
  return [...arr]
}
```
> `[...arr]` membuat salinan baru dari array — penting agar `.sort()` tidak mengubah array asli yang dikirim ke fungsi.

---

**Langkah 3** — Sort secara descending:
```javascript
const topTwo = (arr) => {
  return [...arr]
    .sort((a, b) => b - a)
}
```
> `.sort((a, b) => b - a)` mengurutkan dari besar ke kecil. Jika `b > a`, hasilnya positif — elemen `b` didahulukan.

---

**Langkah 4** — Ambil 2 elemen teratas:
```javascript
const topTwo = (arr) => {
  return [...arr]
    .sort((a, b) => b - a)
    .slice(0, 2)
}
```
> `.slice(0, 2)` mengambil elemen dari index 0 hingga index 1 (tidak termasuk index 2). Hasilnya array berisi 2 angka terbesar.

**Hasil:**
```javascript
console.log(topTwo([10, 5, 20, 8, 15])) // [20, 15]
console.log(topTwo([3, 1, 4, 1, 5, 9])) // [9, 5]
console.log(topTwo([7]))                 // [7]
console.log(topTwo([]))                  // []
```
