# 🧠 Thinking Patterns
### Cara Berpikir Memilih Pattern yang Tepat

![Kategori](https://img.shields.io/badge/Kategori-Mental%20Model-teal)
![Tipe](https://img.shields.io/badge/Tipe-Ringkasan%20%26%20Panduan-lightgrey)
![Bahasa](https://img.shields.io/badge/Bahasa-JavaScript-yellow)

---

## 📚 Daftar Isi

| No | Bagian | Keterangan |
|----|--------|------------|
| 1 | [🗺️ Peta Mental](#️-peta-mental) | Hubungan antar semua pattern |
| 2 | [🔀 Alur Berpikir](#-alur-berpikir) | Cara memilih pattern yang tepat |
| 3 | [✅ Checklist Sebelum Menulis Kode](#-checklist-sebelum-menulis-kode) | Pertanyaan wajib sebelum mulai coding |
| 4 | [📋 Ringkasan Semua Pattern](#-ringkasan-semua-pattern) | Tabel ringkas pattern + kapan pakainya |
| 5 | [🔗 Kombinasi Pattern](#-kombinasi-pattern) | Pattern yang sering dipakai bersama |
| 6 | [💡 Prinsip Utama](#-prinsip-utama) | Insight paling penting dari semua pattern |

---

## 🗺️ Peta Mental

Semua pattern yang sudah dipelajari saling terhubung — dari yang paling dasar hingga yang paling kompleks:

```
FONDASI
├── Max Pattern          → mencari satu nilai terbesar
├── Min Pattern          → mencari satu nilai terkecil
└── Frequency Counter    → menghitung kemunculan data

        ↓ dikombinasikan dengan

GROUPING
├── Basic Grouping       → mengumpulkan data ke dalam kelompok
└── Count By Class       → menghitung jumlah per kelompok
                           (Frequency Counter + Grouping)

        ↓ dikombinasikan dengan

RANKING
├── Manual Ranking       → mempertahankan top-K tanpa sorting
├── Top 1 Per Group      → satu terbaik per kelompok
│                          (Grouping + Max Pattern)
└── Top 2 Per Group      → dua terbaik per kelompok
                           (Grouping + Manual Ranking)

        ↓ diterapkan ke

CASE STUDY
├── Highest Score        → Max Pattern pada array of object
├── Lowest Score         → Min Pattern pada array of object
├── Count By Class       → Frequency Counter pada array of object
├── Top Two By Class     → Grouping + Manual Ranking pada data nyata
└── Melee Ranged         → Fixed Grouping (Array) pada data nyata
```

---

## 🔀 Alur Berpikir

Gunakan alur ini setiap kali menemukan soal baru:

**Langkah 1 — Pahami output yang diinginkan**

| Jika output berupa... | Kemungkinan pattern |
|-----------------------|---------------------|
| Satu angka atau objek | Max / Min Pattern |
| Object `{ key: count }` | Frequency Counter |
| Object `{ key: [...items] }` | Grouping (Object) |
| Array `[[], []]` dengan posisi index mutlak | Fixed Grouping (Array) |
| Object `{ key: satu_item_terbaik }` | Grouping + Max Pattern |
| Object `{ key: [item1, item2] }` | Grouping + Manual Ranking |

---

**Langkah 2 — Pahami struktur input**

| Jika input berupa... | Yang perlu diperhatikan |
|----------------------|------------------------|
| Array of primitive | Langsung iterasi, tidak perlu destructuring |
| Array of object | Perlu destructuring atau dot notation untuk akses properti |
| Ada properti `class` | Rename saat destructuring: `{ class: className }` |

---

**Langkah 3 — Tentukan apakah perlu grouping**

```
Apakah hasilnya dikelompokkan per kategori?
│
├── TIDAK → cukup satu tracker (max / min / counter)
│
└── YA → perlu wadah per grup
          │
          ├── Output = Object? → pakai {} (Dynamic Grouping)
          │     ├── Hitung saja? → Frequency Counter
          │     ├── Kumpulkan semua? → Basic Grouping
          │     ├── Ambil 1 terbaik? → Top 1 Per Group
          │     └── Ambil 2 terbaik? → Top 2 Per Group
          │
          └── Output = Array [[], []] dengan posisi mutlak?
                → pakai [[], []] (Fixed Grouping)
```

---

**Langkah 4 — Pilih implementasi**

| Situasi | Rekomendasi |
|---------|-------------|
| Belajar / memahami logika | Gunakan `for...of` dengan komentar |
| Butuh index elemen | Gunakan `for` biasa |
| Gaya fungsional | Gunakan `.reduce()` |
| Top-K kecil (1 atau 2) | Manual Ranking — O(n) |
| Top-K besar (5, 10, dst) | Sort + Slice — lebih praktis |

---

## ✅ Checklist Sebelum Menulis Kode

Jawab pertanyaan ini sebelum mulai menulis solusi:

**Tentang Input:**
- [ ] Apa tipe datanya? (array of primitive / array of object)
- [ ] Properti apa yang dibutuhkan dari setiap objek?
- [ ] Apakah ada reserved word di nama properti? (misal: `class`)
- [ ] Apakah perlu handle array kosong?

**Tentang Output:**
- [ ] Apa bentuk outputnya? (angka / objek / array)
- [ ] Apakah hasilnya dikelompokkan per kategori?
- [ ] Berapa banyak data yang perlu diambil per kelompok?

**Tentang Logika:**
- [ ] Pattern mana yang paling cocok?
- [ ] Apakah perlu kombinasi dua pattern?
- [ ] Bagaimana menginisialisasi tracker/wadah dengan benar?
- [ ] Apakah perlu `null` atau `[]` atau `{}` sebagai nilai awal?

---

## 📋 Ringkasan Semua Pattern

| Pattern | Input | Output | Kompleksitas | Kapan Pakai |
|---------|-------|--------|--------------|-------------|
| **Max Pattern** | Array angka / objek | Satu nilai / objek terbesar | O(n) | Mencari nilai tertinggi |
| **Min Pattern** | Array angka / objek | Satu nilai / objek terkecil | O(n) | Mencari nilai terendah |
| **Frequency Counter** | Array apapun | `{ key: count }` | O(n) | Menghitung kemunculan |
| **Basic Grouping** | Array apapun | `{ key: [...items] }` | O(n) | Mengumpulkan per kategori |
| **Count By Class** | Array of object | `{ key: count }` | O(n) | Menghitung per kategori dari objek |
| **Manual Ranking** | Array angka / objek | Array top-K | O(n) | Top-K kecil tanpa sorting |
| **Top 1 Per Group** | Array of object | `{ key: item_terbaik }` | O(n) | Satu terbaik per kategori |
| **Top 2 Per Group** | Array of object | `{ key: [item1, item2] }` | O(n) | Dua terbaik per kategori |

---

## 🔗 Kombinasi Pattern

Beberapa pattern yang sering dipakai bersama:

**Frequency Counter + Grouping**
```javascript
// Dasar dari Count By Class
result[key] = (result[key] || 0) + 1
```
> Gunakan ketika ingin menghitung jumlah per kategori dari array of object.

---

**Grouping + Max Pattern → Top 1 Per Group**
```javascript
// Simpan satu terbaik per grup
if (!result[className] || score > result[className].score) {
  result[className] = { name, score }
}
```
> Gunakan ketika ingin mengambil satu data terbaik dari setiap kelompok.

---

**Grouping + Manual Ranking → Top 2 Per Group**
```javascript
// Pertahankan dua terbaik per grup
if (arr.length === 0) { arr.push(...) }
else if (arr.length === 1) { /* bandingkan dengan rank 1 */ }
else { /* bandingkan dengan rank 1 dan rank 2 */ }
```
> Gunakan ketika ingin mengambil dua data terbaik dari setiap kelompok.

---

**Max / Min + Null Tracker**
```javascript
// Aman untuk array of object
let max = null
if (max === null || score > max.score) {
  max = { name, score }
}
```
> Gunakan `null` sebagai nilai awal ketika menyimpan objek — lebih aman dari `0` yang hanya cocok untuk angka.

---

## 💡 Prinsip Utama

> **1. Kenali bentuk output sebelum menulis satu baris kode pun.**
> Output adalah peta — ia menunjukkan pattern mana yang harus dipakai.

---

> **2. Satu loop sudah cukup untuk hampir semua problem di sini.**
> Max, Min, Frequency Counter, Grouping, Top 1, Top 2 — semuanya O(n). Jangan langsung pikir sorting.

---

> **3. Object adalah alat paling serbaguna.**
> Bisa menyimpan hitungan (`{ key: count }`), kumpulan data (`{ key: [...] }`), atau satu data terbaik (`{ key: item }`). Kenali mana yang dibutuhkan.

---

> **4. Inisialisasi yang benar adalah setengah dari solusi.**
> `null` untuk tracker objek. `[]` untuk wadah array. `{}` untuk wadah per grup. Salah inisialisasi = salah hasil.

---

> **5. Destructuring `{ class: className }` adalah jebakan yang sering dilupakan.**
> `class` adalah reserved word — selalu rename saat destructuring ketika bekerja dengan data yang punya properti `class`.

---

> **6. Manual Ranking vs Sort + Slice — pilih berdasarkan K.**
> K kecil (1 atau 2) → Manual Ranking lebih efisien (O(n)).
> K besar (5, 10, dst) → Sort + Slice lebih praktis meski O(n log n).

---

> **7. Object bukan satu-satunya wadah grouping.**
> Jika soal meminta posisi index yang mutlak, gunakan Array pre-defined `[[], []]`. Object untuk fleksibilitas, Array untuk posisi tetap.
