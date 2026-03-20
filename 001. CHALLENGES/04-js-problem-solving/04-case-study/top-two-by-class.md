# 🥇🥈 Top Two By Class
### Mengambil Dua Siswa dengan Skor Tertinggi Per Kelas

![Kategori](https://img.shields.io/badge/Kategori-Case%20Study-darkblue)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Menengah-yellow)
![Topik](https://img.shields.io/badge/Topik-Grouping%20%7C%20Manual%20Ranking%20%7C%20Destructuring-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi Challenge](#-deskripsi-challenge) | Penjelasan soal |
| 2 | [🧠 Memahami Soal](#-memahami-soal) | Input & output yang diharapkan |
| 3 | [🧪 Test Cases](#-test-cases) | Contoh data dan hasil |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |
| 11 | [✍️ Latihan Menulis Ulang](#️-latihan-menulis-ulang) | Praktik bertahap |

---

## 📋 Deskripsi Challenge

Diberikan array of object berisi data siswa, ambil **dua siswa dengan skor tertinggi di setiap kelas**.

---

## 🧠 Memahami Soal

**Input:**
- Array of object
- Setiap object memiliki properti: `name`, `score`, `class`

**Output:**
```javascript
{
  foxes: [
    { name: '...', score: ... }, // rank 1
    { name: '...', score: ... }  // rank 2
  ],
  wolves: [
    { name: '...', score: ... }, // rank 1
    { name: '...', score: ... }  // rank 2
  ]
}
```

---

## 🧪 Test Cases

```javascript
const data = [
  { name: 'Dimitri', score: 90, class: 'foxes' },
  { name: 'Sergei', score: 74, class: 'foxes' },
  { name: 'Ivan', score: 95, class: 'foxes' },
  { name: 'Alexei', score: 85, class: 'wolves' },
  { name: 'Anastasia', score: 78, class: 'wolves' }
]

topTwoByClass(data)
// {
//   foxes: [
//     { name: 'Ivan', score: 95 },
//     { name: 'Dimitri', score: 90 }
//   ],
//   wolves: [
//     { name: 'Alexei', score: 85 },
//     { name: 'Anastasia', score: 78 }
//   ]
// }

topTwoByClass([]) // {}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Solusi |
|--------|-------------------|
| Grouping | Mengelompokkan siswa berdasarkan kelas |
| Manual Ranking | Mempertahankan top 2 per kelas tanpa sorting |
| Destructuring | Mengambil `name`, `score`, dan `class` dari setiap objek |
| `unshift()` | Menyisipkan elemen baru di posisi pertama array |

---

## 🔄 Implementasi

```javascript
const topTwoByClass = (students) => {                         // 1️⃣ Fungsi menerima array of object
  const result = {}                                           // 2️⃣ Wadah kosong untuk hasil per kelas

  for (const { name, score, class: className } of students) { // 3️⃣ Destructuring semua properti
    if (!result[className]) {                                  // 4️⃣ Jika kelas belum ada, buat array kosong
      result[className] = []
    }

    const arr = result[className]                             // 5️⃣ Referensi ke array kelas saat ini

    if (arr.length === 0) {                                   // 6️⃣ Kasus 1: array masih kosong
      arr.push({ name, score })                               //    → langsung masukkan sebagai rank 1

    } else if (arr.length === 1) {                            // 7️⃣ Kasus 2: baru ada 1 data
      if (score > arr[0].score) {                             //    → jika lebih tinggi dari rank 1
        arr.unshift({ name, score })                          //       sisipkan di depan (jadi rank 1)
      } else {                                                //    → jika lebih rendah
        arr.push({ name, score })                             //       tambahkan di belakang (jadi rank 2)
      }

    } else {                                                  // 8️⃣ Kasus 3: sudah ada 2 data
      if (score > arr[0].score) {                             //    → lebih tinggi dari rank 1?
        arr[1] = arr[0]                                       //       geser rank 1 ke posisi rank 2
        arr[0] = { name, score }                              //       masukkan sebagai rank 1 baru
      } else if (score > arr[1].score) {                      //    → hanya lebih tinggi dari rank 2?
        arr[1] = { name, score }                              //       ganti rank 2 langsung
      }
      // jika lebih rendah dari keduanya → abaikan
    }
  }

  return result                                               // 9️⃣ Kembalikan hasil ranking per kelas
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topTwoByClass = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `const result = {}` | Object kosong — setiap key adalah nama kelas, value-nya array berisi top 2 |
| 3️⃣ | `{ name, score, class: className }` | Destructuring mengambil 3 properti sekaligus. `class` di-rename jadi `className` karena reserved word |
| 4️⃣ | `if (!result[className]) result[className] = []` | Inisialisasi array kosong jika kelas baru pertama kali ditemukan |
| 5️⃣ | `const arr = result[className]` | Simpan referensi ke array kelas — agar kode berikutnya lebih ringkas dibaca |
| 6️⃣ | `arr.length === 0` → `push` | Array masih kosong: langsung masukkan data pertama tanpa perbandingan |
| 7️⃣ | `arr.length === 1` | Baru ada 1 data: bandingkan dengan rank 1. Jika lebih tinggi → `unshift()`, jika lebih rendah → `push()` |
| 8️⃣ | `else` (length === 2) | Array penuh: bandingkan dari atas. Geser rank 1 ke bawah jika perlu, atau ganti rank 2, atau abaikan |
| 9️⃣ | `return result` | Kembalikan object berisi top 2 per kelas |

**Hasil:**
```javascript
console.log(topTwoByClass(data))
// {
//   foxes: [ { name: 'Ivan', score: 95 }, { name: 'Dimitri', score: 90 } ],
//   wolves: [ { name: 'Alexei', score: 85 }, { name: 'Anastasia', score: 78 } ]
// }

console.log(topTwoByClass([]))  // {}
```

---

## 🧪 Visualisasi

**Data:** `students` (5 objek) — fokus pada kelas `foxes`

| Langkah | Objek | `arr` sebelum | Kasus | Aksi | `arr` setelah |
|---------|-------|---------------|-------|------|---------------|
| 1 | `Dimitri (90)` | `[]` | length = 0 | `push` | `[{Dimitri,90}]` |
| 2 | `Sergei (74)` | `[{Dimitri,90}]` | length = 1, `74 > 90` ❌ | `push` | `[{Dimitri,90}, {Sergei,74}]` |
| 3 | `Ivan (95)` | `[{Dimitri,90}, {Sergei,74}]` | length = 2, `95 > 90` ✅ | geser, masukkan | `[{Ivan,95}, {Dimitri,90}]` |

**Kelas `wolves`:**

| Langkah | Objek | `arr` sebelum | Kasus | Aksi | `arr` setelah |
|---------|-------|---------------|-------|------|---------------|
| 1 | `Alexei (85)` | `[]` | length = 0 | `push` | `[{Alexei,85}]` |
| 2 | `Anastasia (78)` | `[{Alexei,85}]` | length = 1, `78 > 85` ❌ | `push` | `[{Alexei,85}, {Anastasia,78}]` |

**Hasil akhir:**
```javascript
{
  foxes: [ { name: 'Ivan', score: 95 }, { name: 'Dimitri', score: 90 } ],
  wolves: [ { name: 'Alexei', score: 85 }, { name: 'Anastasia', score: 78 } ]
}
```

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan `.sort()` + `.slice()`

```javascript
const topTwoByClass = (students) => {                         // 1️⃣ Fungsi menerima array of object
  const grouped = {}                                          // 2️⃣ Wadah sementara untuk semua data per kelas

  for (const { name, score, class: className } of students) { // 3️⃣ Kelompokkan semua data dulu
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })                  // 4️⃣ Masukkan semua data tanpa seleksi
  }

  const result = {}
  for (const className in grouped) {                          // 5️⃣ Proses setiap kelas
    result[className] = grouped[className]
      .sort((a, b) => b.score - a.score)                      // 6️⃣ Urutkan descending berdasarkan score
      .slice(0, 2)                                            // 7️⃣ Ambil hanya 2 teratas
  }

  return result                                               // 8️⃣ Kembalikan hasil
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topTwoByClass = (students)` | Fungsi menerima array of object |
| 2️⃣ | `const grouped = {}` | Wadah sementara untuk menampung semua data sebelum diranking |
| 3️⃣ | `for (const { name, score, class: className } of students)` | Loop pertama: kelompokkan semua data ke kelasnya masing-masing |
| 4️⃣ | `grouped[className].push({ name, score })` | Masukkan semua data ke array kelas — belum ada seleksi di sini |
| 5️⃣ | `for (const className in grouped)` | Loop kedua: proses setiap kelas yang sudah terbentuk |
| 6️⃣ | `.sort((a, b) => b.score - a.score)` | Urutkan descending — `b - a` menghasilkan urutan dari skor terbesar ke terkecil |
| 7️⃣ | `.slice(0, 2)` | Ambil hanya 2 elemen pertama (index 0 dan 1) |
| 8️⃣ | `return result` | Kembalikan object berisi top 2 per kelas |

**Visualisasi — fokus: dua tahap (group dulu, sort + slice kemudian)**

Tahap 1 — Grouping semua data:
```javascript
grouped = {
  foxes: [ {Dimitri,90}, {Sergei,74}, {Ivan,95} ],
  wolves: [ {Alexei,85}, {Anastasia,78} ]
}
```

Tahap 2 — Sort + Slice per kelas:

| Kelas | Sebelum sort | Setelah sort | Setelah slice(0,2) |
|-------|-------------|--------------|---------------------|
| `foxes` | `[90, 74, 95]` | `[95, 90, 74]` | `[95, 90]` |
| `wolves` | `[85, 78]` | `[85, 78]` | `[85, 78]` |

**Hasil:**
```javascript
console.log(topTwoByClass(data))
// {
//   foxes: [ { name: 'Ivan', score: 95 }, { name: 'Dimitri', score: 90 } ],
//   wolves: [ { name: 'Alexei', score: 85 }, { name: 'Anastasia', score: 78 } ]
// }

console.log(topTwoByClass([]))  // {}
```

> **Kapan pakai ini?**
> Lebih mudah ditulis dan dibaca. Cocok ketika jumlah data per kelas tidak terlalu besar. Kelemahannya: `.sort()` bekerja O(n log n) per kelas — kurang efisien dibanding manual ranking yang O(n).

---

## ⚠️ Jebakan Umum

### ❌ 1. Selalu push tanpa membandingkan

```javascript
arr.push({ name, score }) // ❌ Array bisa berisi lebih dari 2 data
```

**Masalah:** Tidak ada mekanisme seleksi — semua data masuk tanpa batasan.

✅ **Solusi:** Gunakan tiga kasus (kosong, 1 data, penuh) untuk mengontrol isi array.

---

### ❌ 2. Lupa menggeser rank 1 sebelum menimpanya

```javascript
arr[0] = { name, score } // ❌ rank 1 lama hilang sebelum disimpan
arr[1] = arr[0]          // terlambat — arr[0] sudah ditimpa
```

**Masalah:** Urutan operasi salah — rank 1 lama hilang sebelum sempat dipindahkan ke rank 2.

✅ **Solusi:** Geser dulu, baru timpa:
```javascript
arr[1] = arr[0]          // simpan rank 1 lama ke rank 2
arr[0] = { name, score } // baru timpa rank 1 dengan data baru
```

---

### ❌ 3. Lupa rename `class` saat destructuring

```javascript
const { class } = student // ❌ SyntaxError
```

✅ **Solusi:**
```javascript
const { class: className } = student // ✅
```

---

## 💡 Insight

> **Top Two By Class adalah penerapan nyata dari `03-ranking/top-2-per-group.md`.**
> Di folder `03-ranking` kita belajar polanya secara umum — di sini kita terapkan ke soal dengan data siswa sungguhan.

Hubungan antar file dalam dokumentasi ini:

| File | Peran |
|------|-------|
| `01-fundamentals/max-pattern.md` | Fondasi: mencari satu nilai terbaik |
| `02-grouping/basic-grouping.md` | Fondasi: mengelompokkan data |
| `03-ranking/manual-ranking.md` | Pattern: ranking tanpa sorting |
| `03-ranking/top-2-per-group.md` | Pattern: top 2 per grup |
| `04-case-study/top-two-by-class.md` | Penerapan: ke soal nyata dengan data siswa |

---

## 📝 Pelajaran yang Didapat

- ✅ Top Two By Class adalah kombinasi Grouping + Manual Ranking pada data siswa nyata
- ✅ Tiga kasus yang selalu muncul: array kosong, 1 data, penuh
- ✅ Urutan operasi penting: geser rank lama dulu sebelum menimpa
- ✅ Trade-off: Manual Ranking O(n) vs Sort + Slice O(n log n)
- ✅ Bagaimana semua pattern yang dipelajari sebelumnya terhubung dalam satu solusi

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Manual Ranking

**Langkah 1** — Deklarasikan fungsi:
```javascript
const topTwoByClass = (students) => {

}
```
> Fungsi menerima satu parameter `students` berupa array of object.

---

**Langkah 2** — Siapkan wadah hasil:
```javascript
const topTwoByClass = (students) => {
  const result = {}
}
```
> `result` adalah object kosong — setiap key adalah nama kelas, value-nya array berisi maksimal 2 siswa terbaik.

---

**Langkah 3** — Buka loop dengan destructuring:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {

  }
}
```
> Destructuring mengambil `name`, `score`, dan `class` sekaligus. `class` di-rename jadi `className` karena reserved word.

---

**Langkah 4** — Inisialisasi array kelas jika belum ada:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }
  }
}
```
> Jika kelas ini belum pernah ditemukan, buat array kosong sebagai wadah ranking-nya.

---

**Langkah 5** — Simpan referensi array kelas:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]
  }
}
```
> `arr` adalah referensi ke array kelas saat ini — agar kode berikutnya lebih ringkas dari menulis `result[className]` berulang kali.

---

**Langkah 6** — Tambahkan kasus pertama: array masih kosong:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]

    if (arr.length === 0) {
      arr.push({ name, score })
    }
  }
}
```
> Array masih kosong: langsung masukkan data pertama tanpa perlu membandingkan apapun.

---

**Langkah 7** — Tambahkan kasus kedua: baru ada 1 data, skor lebih tinggi:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]

    if (arr.length === 0) {
      arr.push({ name, score })
    } else if (arr.length === 1) {
      if (score > arr[0].score) {
        arr.unshift({ name, score })
      }
    }
  }
}
```
> `unshift()` menyisipkan data baru di posisi index 0 — data lama otomatis bergeser ke index 1.

---

**Langkah 8** — Lengkapi kasus kedua: skor lebih rendah:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]

    if (arr.length === 0) {
      arr.push({ name, score })
    } else if (arr.length === 1) {
      if (score > arr[0].score) {
        arr.unshift({ name, score })
      } else {
        arr.push({ name, score })
      }
    }
  }
}
```
> Jika skor lebih rendah dari rank 1, cukup `push()` di belakang — data baru langsung jadi rank 2.

---

**Langkah 9** — Tambahkan kasus ketiga: array penuh, skor lebih tinggi dari rank 1:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]

    if (arr.length === 0) {
      arr.push({ name, score })
    } else if (arr.length === 1) {
      if (score > arr[0].score) {
        arr.unshift({ name, score })
      } else {
        arr.push({ name, score })
      }
    } else {
      if (score > arr[0].score) {
        arr[1] = arr[0]
        arr[0] = { name, score }
      }
    }
  }
}
```
> `arr[1] = arr[0]` menyimpan rank 1 lama ke posisi rank 2 dulu — baru kemudian `arr[0]` diisi data baru. Urutan ini sangat penting agar rank 1 lama tidak hilang.

---

**Langkah 10** — Tambahkan sub-kasus: skor hanya lebih tinggi dari rank 2:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]

    if (arr.length === 0) {
      arr.push({ name, score })
    } else if (arr.length === 1) {
      if (score > arr[0].score) {
        arr.unshift({ name, score })
      } else {
        arr.push({ name, score })
      }
    } else {
      if (score > arr[0].score) {
        arr[1] = arr[0]
        arr[0] = { name, score }
      } else if (score > arr[1].score) {
        arr[1] = { name, score }
      }
    }
  }
}
```
> Jika skor tidak mengalahkan rank 1 tapi mengalahkan rank 2, cukup ganti `arr[1]` langsung. Jika lebih rendah dari keduanya — data diabaikan.

---

**Langkah 11** — Kembalikan hasil:
```javascript
const topTwoByClass = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]

    if (arr.length === 0) {
      arr.push({ name, score })
    } else if (arr.length === 1) {
      if (score > arr[0].score) {
        arr.unshift({ name, score })
      } else {
        arr.push({ name, score })
      }
    } else {
      if (score > arr[0].score) {
        arr[1] = arr[0]
        arr[0] = { name, score }
      } else if (score > arr[1].score) {
        arr[1] = { name, score }
      }
    }
  }

  return result
}
```
> Fungsi selesai. `return result` mengembalikan object berisi top 2 per kelas.

**Hasil:**
```javascript
console.log(topTwoByClass(data))
// {
//   foxes: [ { name: 'Ivan', score: 95 }, { name: 'Dimitri', score: 90 } ],
//   wolves: [ { name: 'Alexei', score: 85 }, { name: 'Anastasia', score: 78 } ]
// }

console.log(topTwoByClass([]))  // {}
```

---

### Versi 2 — Sort + Slice

**Langkah 1** — Deklarasikan fungsi:
```javascript
const topTwoByClass = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Siapkan dua wadah:
```javascript
const topTwoByClass = (students) => {
  const grouped = {}
  const result = {}
}
```
> `grouped` untuk menampung semua data per kelas dulu. `result` untuk menyimpan hasil akhir setelah diranking.

---

**Langkah 3** — Buka loop pertama dan kelompokkan semua data:
```javascript
const topTwoByClass = (students) => {
  const grouped = {}
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })
  }
}
```
> Semua siswa dimasukkan ke kelasnya tanpa seleksi. Setelah loop ini selesai, `grouped` berisi semua data per kelas.

---

**Langkah 4** — Buka loop kedua untuk memproses setiap kelas:
```javascript
const topTwoByClass = (students) => {
  const grouped = {}
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })
  }

  for (const className in grouped) {

  }
}
```
> `for...in` menelusuri setiap key (nama kelas) yang ada di dalam object `grouped`.

---

**Langkah 5** — Sort setiap kelas secara descending:
```javascript
const topTwoByClass = (students) => {
  const grouped = {}
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })
  }

  for (const className in grouped) {
    result[className] = grouped[className]
      .sort((a, b) => b.score - a.score)
  }
}
```
> `.sort((a, b) => b.score - a.score)` mengurutkan dari skor tertinggi ke terendah.

---

**Langkah 6** — Ambil 2 data teratas dan kembalikan hasil:
```javascript
const topTwoByClass = (students) => {
  const grouped = {}
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })
  }

  for (const className in grouped) {
    result[className] = grouped[className]
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
  }

  return result
}
```
> `.slice(0, 2)` mengambil 2 elemen pertama. `return result` mengembalikan object berisi top 2 per kelas.

**Hasil:**
```javascript
console.log(topTwoByClass(data))
// {
//   foxes: [ { name: 'Ivan', score: 95 }, { name: 'Dimitri', score: 90 } ],
//   wolves: [ { name: 'Alexei', score: 85 }, { name: 'Anastasia', score: 78 } ]
// }

console.log(topTwoByClass([]))  // {}
```
