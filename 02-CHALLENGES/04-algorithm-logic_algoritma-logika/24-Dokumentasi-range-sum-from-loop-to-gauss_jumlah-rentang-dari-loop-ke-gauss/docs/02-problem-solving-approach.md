# 🧠 Problem Solving Approach — Alur Berpikir

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Algorithm%20Logic-blue?style=for-the-badge)

---

## 📑 Daftar Isi

- 🔍 [Langkah 1 — Pahami Masalah](#langkah-1)
- 🔎 [Langkah 2 — Identifikasi Pola Penjumlahan Deret](#langkah-2)
- 📦 [Langkah 3 — Rencanakan Strategi](#langkah-3)
- 🔗 [Langkah 4 — Gabungkan Menjadi Pseudocode](#langkah-4)

---

<a name="langkah-1"></a>
## 🔍 Langkah 1 — Pahami Masalah

Sebelum menulis kode, terjemahkan dulu masalahnya ke bahasa sederhana:

> *"Diberikan dua angka yang urutannya tidak dijamin, jumlahkan semua angka di antara keduanya (termasuk kedua angka tersebut)."*

3 pertanyaan kunci:
- **Apa inputnya?** → Dua bilangan bulat `a` dan `b` (bisa positif, negatif, atau nol).
- **Apa outputnya?** → Satu angka berupa total penjumlahan dari `a` sampai `b` (inklusif).
- **Apa jebakan utamanya?** → Urutan `a` dan `b` tidak dijamin. `a` bisa lebih besar dari `b`.

---

<a name="langkah-2"></a>
## 🔎 Langkah 2 — Identifikasi Pola Penjumlahan Deret

Mari kita breakdown beberapa contoh input untuk menemukan pola:

| Input `(a, b)` | Angka Terkecil | Angka Terbesar | Deret yang Dijumlahkan | Hasil |
|:---:|:---:|:---:|:---|:---:|
| `(1, 0)` | 0 | 1 | 0 + 1 | 1 |
| `(-1, 2)` | -1 | 2 | -1 + 0 + 1 + 2 | 2 |
| `(5, 2)` | 2 | 5 | 2 + 3 + 4 + 5 | 14 |
| `(3, 3)` | 3 | 3 | 3 | 3 |

**Pola yang ditemukan:**
1. Kita selalu harus tahu mana angka **terkecil** (`min`) dan **terbesar** (`max`) terlebih dahulu.
2. Kemudian kita menjumlahkan semua bilangan bulat dari `min` sampai `max`.
3. Jika `a == b`, hasilnya langsung angka itu sendiri (tidak perlu loop).

> 💡 **Insight:** Karena ini adalah penjumlahan deret berurutan, ada rumus matematika (Rumus Gauss) yang bisa menghitung hasilnya secara instan tanpa perulangan!

---

<a name="langkah-3"></a>
## 📦 Langkah 3 — Rencanakan Strategi

Dari pola yang ditemukan, ada **3 strategi** yang bisa digunakan:

### Strategi A — Loop Manual
```
Tentukan min dan max
↓
Mulai dari min, tambahkan satu-satu ke penampung sampai max
↓
Kembalikan penampung
```

### Strategi B — Rumus Gauss (Tanpa Loop)
```
Tentukan min dan max
↓
Hitung: (Banyak Angka × Jumlah Pasangan) ÷ 2
↓
Kembalikan hasil
```

Visualisasi Rumus Gauss dengan contoh angka **1 sampai 4**:

```
Pasangan:
  1 + 4 = 5
  2 + 3 = 5
  ──────────
  2 pasang × 5 = 10

Rumus:
  Banyak Angka    = (max - min + 1) = (4 - 1 + 1) = 4
  Jumlah Pasangan = (min + max)     = (1 + 4)     = 5
  Total           = (4 × 5) ÷ 2    = 10 ✅
```

### Strategi C — Rekursif
```
Jika a == b → kembalikan a (berhenti)
↓
Jika a < b → kembalikan a + panggil fungsi(a+1, b)
Jika a > b → kembalikan a + panggil fungsi(a-1, b)
```

> 💡 **Mana yang terbaik?** Strategi B (Rumus Gauss) adalah yang paling efisien karena hanya butuh satu kali hitungan, tanpa perulangan. Strategi C (Rekursif) paling berbahaya karena bisa menyebabkan *Stack Overflow* jika jarak angkanya terlalu besar.

---

<a name="langkah-4"></a>
## 🔗 Langkah 4 — Gabungkan Menjadi Pseudocode

### Pseudocode Strategi Loop:
```
FUNCTION getSum(a, b):
  1. Tentukan start = angka terkecil dari a dan b
  2. Tentukan end   = angka terbesar dari a dan b
  3. Buat penampung sum = 0
  4. LOOP dari i = start sampai i <= end:
       sum = sum + i
  5. Return sum
```

### Pseudocode Strategi Gauss:
```
FUNCTION getSum(a, b):
  1. Tentukan start = angka terkecil dari a dan b
  2. Tentukan end   = angka terbesar dari a dan b
  3. Hitung count     = (end - start + 1)
  4. Hitung pairValue = (start + end)
  5. Return (count × pairValue) ÷ 2
```

### Pseudocode Strategi Rekursif:
```
FUNCTION getSum(a, b):
  1. Jika a == b → Return a
  2. Jika a < b  → Return a + getSum(a + 1, b)
  3. Jika a > b  → Return a + getSum(a - 1, b)
```

Dari pseudocode ini, kita bisa membuat kode JavaScript yang sesungguhnya.
Masing-masing dibahas di **Part 03 sampai Part 06**.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 01 — Challenge Overview](./01-challenge-overview.md)**
- **📖 [Lanjut ke Part 03 — Version V1 Loop →](./03-version-v1-loop.md)**
