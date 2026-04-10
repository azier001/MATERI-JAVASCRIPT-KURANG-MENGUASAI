# 🥇🥈 Top 2 Per Group
### Mengambil Dua Data Tertinggi di Setiap Grup

![Kategori](https://img.shields.io/badge/Kategori-Ranking-red)
![Kesulitan](https://img.shields.io/badge/Kesulitan-Menengah-yellow)
![Topik](https://img.shields.io/badge/Topik-Grouping%20%7C%20Manual%20Ranking%20%7C%20Destructuring-orange)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [📋 Deskripsi](#-deskripsi) | Apa itu Top 2 Per Group |
| 2 | [🧠 Memahami Konsep](#-memahami-konsep) | Inti cara kerjanya |
| 3 | [🧪 Contoh Kasus](#-contoh-kasus) | Input & output yang diharapkan |
| 4 | [🔍 Konsep yang Digunakan](#-konsep-yang-digunakan) | Fondasi teknis |
| 5 | [🔄 Implementasi](#-implementasi) | Kode lengkap |
| 6 | [🧪 Visualisasi](#-visualisasi) | Langkah-langkah iterasi |
| 7 | [🔀 Versi Alternatif](#-versi-alternatif) | Cara lain menulis solusi |
| 8 | [⚠️ Jebakan Umum](#️-jebakan-umum) | Kesalahan yang sering terjadi |
| 9 | [💡 Insight](#-insight) | Catatan penting |
| 10 | [📝 Pelajaran yang Didapat](#-pelajaran-yang-didapat) | Ringkasan belajar |

---

## 📋 Deskripsi

**Top 2 Per Group** adalah kombinasi dari **Grouping** dan **Manual Ranking** — mengambil dua data terbaik dari setiap grup tanpa menggunakan sorting.

Digunakan ketika:
- mengambil **2 siswa dengan skor tertinggi** per kelas
- mengambil **2 produk terlaris** per kategori
- mengambil **2 karyawan terbaik** per departemen

> Berbeda dengan Top 1 Per Group — di sini setiap grup menyimpan **array berisi dua** data terbaik, bukan satu objek.

---

## 🧠 Memahami Konsep

> Inti dari top 2 per group:
> **Selalu anggap array per grup sebagai `[rank1, rank2]`. Setiap data baru dibandingkan dari atas — jika lebih baik dari rank 1, geser rank 1 ke rank 2 lalu masukkan. Jika hanya lebih baik dari rank 2, ganti rank 2 saja.**

Bayangkan dua kursi terdepan di kelas — kursi pertama untuk yang terbaik, kursi kedua untuk runner-up. Setiap siswa baru dievaluasi: apakah ia layak duduk di kursi pertama, kedua, atau tidak sama sekali?

---

## 🧪 Contoh Kasus

**Input:**
```javascript
const students = [
  { name: 'Dimitri', score: 90, class: 'foxes' },
  { name: 'Sergei', score: 74, class: 'foxes' },
  { name: 'Ivan', score: 95, class: 'foxes' },
  { name: 'Alexei', score: 85, class: 'wolves' },
  { name: 'Anastasia', score: 78, class: 'wolves' }
]
```

**Output yang diharapkan:**
```javascript
{
  foxes: [
    { name: 'Ivan', score: 95 },    // rank 1
    { name: 'Dimitri', score: 90 }  // rank 2
  ],
  wolves: [
    { name: 'Alexei', score: 85 },    // rank 1
    { name: 'Anastasia', score: 78 }  // rank 2
  ]
}
```

---

## 🔍 Konsep yang Digunakan

| Konsep | Peran dalam Pattern |
|--------|---------------------|
| Grouping | Mengelompokkan data berdasarkan properti `class` |
| Manual Ranking | Membandingkan dan mengatur posisi tanpa sorting |
| Destructuring | Mengambil `name`, `score`, dan `class` dari setiap objek |
| `unshift()` | Menyisipkan elemen ke posisi pertama array |

---

## 🔄 Implementasi

```javascript
const topTwoPerGroup = (students) => {                          // 1️⃣ Fungsi menerima array of object
  const result = {}                                             // 2️⃣ Wadah kosong untuk hasil per grup

  for (const { name, score, class: className } of students) {  // 3️⃣ Destructuring semua properti
    if (!result[className]) {                                   // 4️⃣ Jika grup belum ada, buat array kosong
      result[className] = []
    }

    const arr = result[className]                               // 5️⃣ Referensi ke array grup saat ini

    if (arr.length === 0) {                                     // 6️⃣ Kasus 1: array masih kosong
      arr.push({ name, score })                                 //    → langsung masukkan sebagai rank 1

    } else if (arr.length === 1) {                              // 7️⃣ Kasus 2: baru ada 1 data
      if (score > arr[0].score) {                               //    → jika lebih tinggi dari rank 1
        arr.unshift({ name, score })                            //       sisipkan di depan (jadi rank 1)
      } else {                                                  //    → jika lebih rendah
        arr.push({ name, score })                               //       tambahkan di belakang (jadi rank 2)
      }

    } else {                                                    // 8️⃣ Kasus 3: sudah ada 2 data
      if (score > arr[0].score) {                               //    → lebih tinggi dari rank 1?
        arr[1] = arr[0]                                         //       geser rank 1 ke posisi rank 2
        arr[0] = { name, score }                                //       masukkan sebagai rank 1 baru
      } else if (score > arr[1].score) {                        //    → lebih tinggi dari rank 2 saja?
        arr[1] = { name, score }                                //       ganti rank 2 langsung
      }
      // jika lebih rendah dari keduanya → abaikan
    }
  }

  return result                                                 // 9️⃣ Kembalikan hasil ranking per grup
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topTwoPerGroup = (students)` | Fungsi menerima array of object sebagai input |
| 2️⃣ | `const result = {}` | Object kosong — setiap key akan berisi array berisi maksimal 2 data terbaik |
| 3️⃣ | `{ name, score, class: className }` | Destructuring mengambil 3 properti sekaligus. `class` di-rename jadi `className` |
| 4️⃣ | `if (!result[className]) result[className] = []` | Inisialisasi array kosong jika grup baru pertama kali ditemukan |
| 5️⃣ | `const arr = result[className]` | Simpan referensi ke array grup — agar kode berikutnya lebih ringkas dibaca |
| 6️⃣ | `arr.length === 0` → `arr.push(...)` | Array kosong: langsung masukkan data pertama tanpa perbandingan apapun |
| 7️⃣ | `arr.length === 1` | Baru ada 1 data: bandingkan dengan rank 1. Jika lebih tinggi → `unshift()` (sisip di depan), jika lebih rendah → `push()` (tambah di belakang) |
| 8️⃣ | `arr.length === 2` (else) | Sudah penuh: bandingkan dari atas. Jika lebih tinggi dari rank 1 → geser rank 1 ke bawah, masukkan di atas. Jika hanya lebih tinggi dari rank 2 → ganti rank 2. Jika lebih rendah dari keduanya → abaikan |
| 9️⃣ | `return result` | Kembalikan object berisi top 2 per grup |

---

## 🧪 Visualisasi

**Data:** `students` (5 objek) — fokus pada grup `foxes`

| Langkah | Objek | `arr` sebelum | Kasus | Aksi | `arr` setelah |
|---------|-------|---------------|-------|------|---------------|
| 1 | `Dimitri (90)` | `[]` | length = 0 | `push` | `[{Dimitri,90}]` |
| 3 | `Ivan (95)` | `[{Dimitri,90}]` | length = 1, `95 > 90` ✅ | `unshift` | `[{Ivan,95}, {Dimitri,90}]` |
| 2 | `Sergei (74)` | `[{Ivan,95}, {Dimitri,90}]` | length = 2, `74 > 95` ❌, `74 > 90` ❌ | abaikan | `[{Ivan,95}, {Dimitri,90}]` |

> Catatan: urutan langkah mengikuti urutan data di array input, bukan urutan skor.

**Ilustrasi 3 kasus saat array sudah penuh `[rank1, rank2]`:**

| Skor Baru | Dibanding rank1 | Dibanding rank2 | Hasil |
|-----------|-----------------|-----------------|-------|
| `110` | `110 > 100` ✅ | — | `[110, 100]` — rank1 baru, rank1 lama geser |
| `95` | `95 > 100` ❌ | `95 > 90` ✅ | `[100, 95]` — rank2 diganti |
| `80` | `80 > 100` ❌ | `80 > 90` ❌ | `[100, 90]` — tidak berubah |

---

## 🔀 Versi Alternatif

### Versi 2 — Menggunakan `.sort()` per grup

```javascript
const topTwoPerGroup = (students) => {                          // 1️⃣ Fungsi menerima array of object
  const grouped = {}                                            // 2️⃣ Wadah untuk semua data per grup

  for (const { name, score, class: className } of students) {  // 3️⃣ Kelompokkan semua data dulu
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })                    // 4️⃣ Masukkan semua data ke grupnya
  }

  const result = {}
  for (const className in grouped) {                            // 5️⃣ Proses setiap grup
    result[className] = grouped[className]
      .sort((a, b) => b.score - a.score)                        // 6️⃣ Urutkan descending berdasarkan score
      .slice(0, 2)                                              // 7️⃣ Ambil hanya 2 teratas
  }

  return result                                                 // 8️⃣ Kembalikan hasil
}
```

**Penjelasan detail:**

| # | Kode | Penjelasan |
|---|------|------------|
| 1️⃣ | `const topTwoPerGroup = (students)` | Fungsi menerima array of object |
| 2️⃣ | `const grouped = {}` | Wadah sementara untuk menampung semua data sebelum diranking |
| 3️⃣ | `for (const { name, score, class: className } of students)` | Loop pertama: kelompokkan semua data ke grupnya masing-masing |
| 4️⃣ | `grouped[className].push({ name, score })` | Masukkan semua data ke array grup — belum ada seleksi di sini |
| 5️⃣ | `for (const className in grouped)` | Loop kedua: proses setiap grup yang sudah terbentuk |
| 6️⃣ | `.sort((a, b) => b.score - a.score)` | Urutkan descending — `b - a` menghasilkan urutan dari besar ke kecil |
| 7️⃣ | `.slice(0, 2)` | Ambil hanya 2 elemen pertama (index 0 dan 1) |
| 8️⃣ | `return result` | Kembalikan object berisi top 2 per grup |

**Visualisasi — fokus: dua tahap (group dulu, sort + slice kemudian)**

Tahap 1 — Grouping semua data:
```javascript
grouped = {
  foxes: [{Dimitri,90}, {Sergei,74}, {Ivan,95}],
  wolves: [{Alexei,85}, {Anastasia,78}]
}
```

Tahap 2 — Sort + Slice per grup:

| Grup | Sebelum sort | Setelah sort | Setelah slice(0,2) |
|------|-------------|--------------|---------------------|
| `foxes` | `[90, 74, 95]` | `[95, 90, 74]` | `[95, 90]` |
| `wolves` | `[85, 78]` | `[85, 78]` | `[85, 78]` |

> **Kapan pakai ini?**
> Lebih mudah dipahami dan ditulis. Kelemahannya: `.sort()` bekerja O(n log n) per grup — kurang efisien dibanding manual ranking yang O(n).

---

## ⚠️ Jebakan Umum

### ❌ 1. Sorting setiap iterasi loop

```javascript
for (const student of students) {
  arr.push(student)
  arr.sort(...) // ❌ Sort dipanggil setiap iterasi
}
```

**Masalah:** Sort di dalam loop → O(n² log n). Sangat tidak efisien untuk data besar.

✅ **Solusi:** Gunakan manual ranking (bandingkan langsung tanpa sort) atau sort sekali di akhir setelah semua data masuk.

---

### ❌ 2. Tidak menjaga urutan array

```javascript
arr.push({ name, score }) // ❌ Selalu push tanpa cek posisi
```

**Masalah:** Array tidak mencerminkan `[rank1, rank2]` — urutan jadi tidak terkontrol.

✅ **Solusi:** Gunakan `unshift()` untuk rank 1 baru, atau atur posisi secara eksplisit dengan `arr[0]` dan `arr[1]`.

---

### ❌ 3. Tidak membatasi jumlah data per grup

```javascript
arr.push({ name, score }) // ❌ Array bisa berisi lebih dari 2 data
```

**Masalah:** Tidak ada mekanisme yang membatasi array hanya berisi 2 data.

✅ **Solusi:** Gunakan kondisi `else` (kasus array penuh) yang hanya mengupdate tanpa push — atau gunakan `.slice(0, 2)` di akhir.

---

## 💡 Insight

> **Manual ranking adalah cara berpikir yang lebih efisien dari sorting.**
> Sorting memindahkan semua elemen — manual ranking hanya membandingkan di titik yang tepat.

Perbandingan pendekatan:

| | Manual Ranking | Sort + Slice |
|--|----------------|--------------|
| Kompleksitas | O(n) | O(n log n) per grup |
| Keterbacaan | Lebih kompleks | Lebih mudah dibaca |
| Fleksibilitas | Perlu diubah untuk top-3, top-4 | Cukup ubah angka di `.slice()` |

> Untuk top-K yang lebih besar (top-5, top-10), Sort + Slice lebih praktis. Manual ranking optimal hanya untuk K yang sangat kecil (1 atau 2).

---

## 📝 Pelajaran yang Didapat

- ✅ Top 2 Per Group adalah Grouping + Manual Ranking dalam satu loop
- ✅ Cara mengelola array `[rank1, rank2]` dengan tiga kasus: kosong, satu data, penuh
- ✅ Perbedaan `push()` (tambah di belakang) vs `unshift()` (sisip di depan)
- ✅ Cara menggeser rank dengan `arr[1] = arr[0]` sebelum mengisi `arr[0]`
- ✅ Trade-off antara manual ranking (efisien) vs sort + slice (mudah dibaca)
- ✅ Kapan manual ranking lebih baik dari sorting, dan kapan sebaliknya

---

## ✍️ Latihan Menulis Ulang

Ikuti langkah-langkah berikut secara berurutan. Setiap langkah menambahkan satu atau dua baris baru ke kode sebelumnya. Tutup bagian implementasi di atas sebelum mulai!

---

### Versi 1 — Manual Ranking

**Langkah 1** — Deklarasikan fungsi:
```javascript
const topTwoPerGroup = (students) => {

}
```
> Fungsi menerima satu parameter `students` berupa array of object.

---

**Langkah 2** — Siapkan wadah hasil:
```javascript
const topTwoPerGroup = (students) => {
  const result = {}
}
```
> `result` adalah object kosong. Setiap key-nya adalah nama kelas, value-nya adalah array berisi top 2.

---

**Langkah 3** — Buka loop dengan destructuring:
```javascript
const topTwoPerGroup = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {

  }
}
```
> `for...of` menelusuri setiap objek siswa. Destructuring mengambil `name`, `score`, dan `class` sekaligus — `class` di-rename jadi `className` karena reserved word.

---

**Langkah 4** — Inisialisasi grup jika belum ada:
```javascript
const topTwoPerGroup = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }
  }
}
```
> Jika kelas ini belum pernah ditemukan sebelumnya, buat array kosong sebagai wadah ranking-nya.

---

**Langkah 5** — Simpan referensi array grup:
```javascript
const topTwoPerGroup = (students) => {
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!result[className]) {
      result[className] = []
    }

    const arr = result[className]
  }
}
```
> `arr` adalah referensi ke array grup saat ini — agar kode berikutnya lebih ringkas dibaca daripada menulis `result[className]` berulang kali.

---

**Langkah 6** — Tambahkan kasus pertama: array masih kosong:
```javascript
const topTwoPerGroup = (students) => {
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
> Jika array masih kosong, langsung masukkan data pertama tanpa perlu membandingkan apapun.

---

**Langkah 7** — Tambahkan kasus kedua: array punya 1 data, skor lebih tinggi dari rank 1:
```javascript
const topTwoPerGroup = (students) => {
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
> `unshift()` menyisipkan data baru di posisi pertama (index 0) — data lama otomatis bergeser ke index 1.

---

**Langkah 8** — Lengkapi kasus kedua: skor lebih rendah dari rank 1:
```javascript
const topTwoPerGroup = (students) => {
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
const topTwoPerGroup = (students) => {
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
> `arr[1] = arr[0]` menyimpan rank 1 lama ke posisi rank 2 dulu — baru kemudian `arr[0]` diisi data baru. Urutan ini penting: jika dibalik, rank 1 lama akan hilang sebelum sempat disimpan.

---

**Langkah 10** — Tambahkan sub-kasus: skor hanya lebih tinggi dari rank 2:
```javascript
const topTwoPerGroup = (students) => {
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
> Jika skor tidak mengalahkan rank 1 tapi mengalahkan rank 2, cukup ganti `arr[1]` langsung. Jika lebih rendah dari keduanya, tidak ada aksi — data diabaikan.

---

**Langkah 11** — Kembalikan hasil:
```javascript
const topTwoPerGroup = (students) => {
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
> Fungsi selesai. `return result` mengembalikan object berisi top 2 per grup.

---

### Versi 2 — Sort + Slice

**Langkah 1** — Deklarasikan fungsi:
```javascript
const topTwoPerGroup = (students) => {

}
```
> Fungsi menerima array of object sebagai input.

---

**Langkah 2** — Siapkan dua wadah:
```javascript
const topTwoPerGroup = (students) => {
  const grouped = {}
  const result = {}
}
```
> `grouped` untuk menampung semua data per grup dulu. `result` untuk menyimpan hasil akhir setelah diranking.

---

**Langkah 3** — Buka loop pertama dengan destructuring:
```javascript
const topTwoPerGroup = (students) => {
  const grouped = {}
  const result = {}

  for (const { name, score, class: className } of students) {

  }
}
```
> Loop pertama bertugas mengelompokkan semua data — belum ada seleksi di sini.

---

**Langkah 4** — Inisialisasi grup dan masukkan semua data:
```javascript
const topTwoPerGroup = (students) => {
  const grouped = {}
  const result = {}

  for (const { name, score, class: className } of students) {
    if (!grouped[className]) grouped[className] = []
    grouped[className].push({ name, score })
  }
}
```
> Semua siswa dimasukkan ke grupnya tanpa seleksi. Setelah loop ini selesai, `grouped` berisi semua data per kelas.

---

**Langkah 5** — Buka loop kedua untuk memproses setiap grup:
```javascript
const topTwoPerGroup = (students) => {
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

**Langkah 6** — Sort setiap grup secara descending:
```javascript
const topTwoPerGroup = (students) => {
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
> `.sort((a, b) => b.score - a.score)` mengurutkan dari skor tertinggi ke terendah. `b - a` menghasilkan urutan descending, `a - b` ascending.

---

**Langkah 7** — Ambil 2 data teratas dan kembalikan hasil:
```javascript
const topTwoPerGroup = (students) => {
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
> `.slice(0, 2)` mengambil elemen dari index 0 sampai index 1 (2 elemen pertama). Fungsi selesai dan `result` dikembalikan.
