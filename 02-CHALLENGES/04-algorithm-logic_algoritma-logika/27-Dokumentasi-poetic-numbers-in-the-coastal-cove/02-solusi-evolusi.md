# 💻 Solusi Lengkap & Evolusi

### ✨ *Tiga pendekatan berbeda untuk satu masalah yang sama — dari tradisional hingga modern.*

**⬅️ Kembali ke [README — Analisis & Blueprint](./README.md)**

---

## 📑 Daftar Isi

| No | Bagian | Deskripsi |
|:--:|--------|-----------|
| 🅰️ | [Versi Tradisional](#️-versi-a--tradisional-clean-code) | `for` loop + `String()` — paling mudah dipahami pemula |
| 🅱️ | [Versi Matematika Murni](#️-versi-b--matematika-murni) | `while` loop + modulo — tanpa konversi string |
| 🅲 | [Versi Modern (reduce)](#-versi-c--modern-reduce) | Spread + `.reduce()` — satu baris deklaratif |
| ⚖️ | [Tabel Evolusi Solusi](#️-tabel-evolusi-solusi) | Perbandingan paradigma Imperative vs Declarative |
| ⚠️ | [Gotchas & Troubleshooting](#️-gotchas--troubleshooting) | Kesalahan nyata dari sesi mentoring |
| 🗂️ | [Versi Satu File (Monolitik)](./single-file-version/poetic-numbers-cove.md) | Seluruh dokumentasi digabung dalam 1 halaman |

---

<a name="️-versi-a--tradisional-clean-code"></a>
## 🅰️ Versi A — Tradisional (Clean Code)

> **Paradigma:** Imperative | **Digit Extraction:** String + `for` loop

```javascript
function poeticNumbersInCove(start, end) {
  const poeticNumbers = [];

  for (let num = start; num <= end; num++) {
    // 🚪 Guard Clause 1: Bukan kelipatan 3? Skip!
    if (num % 3 !== 0) continue;

    // 🚪 Guard Clause 2: Kelipatan 5? Skip!
    if (num % 5 === 0) continue;

    // 🧮 Hitung jumlah digit via string
    const numStr = String(num);
    let total = 0;
    for (let j = 0; j < numStr.length; j++) {
      total += Number(numStr[j]);
    }

    // ⚖️ Jumlah digit genap? Masukkan!
    if (total % 2 === 0) poeticNumbers.push(num);
  }

  return poeticNumbers;
}
```

> [!NOTE]
> **Mengapa `let j` dan bukan `let i`?** Karena `i` sudah "terpakai secara mental" untuk outer loop. Meskipun kita pakai `num` (bukan `i`) di outer loop, menggunakan `j` adalah kebiasaan baik untuk menghindari **variable shadowing** — lihat bagian [Gotchas](#️-gotchas--troubleshooting).

---

<a name="️-versi-b--matematika-murni"></a>
## 🅱️ Versi B — Matematika Murni

> **Paradigma:** Imperative | **Digit Extraction:** `while` loop + modulo

```javascript
const poeticNumbersInCove = (start, end) => {
  const poeticNumbers = [];

  for (let num = start; num <= end; num++) {
    if (num % 3 !== 0) continue;
    if (num % 5 === 0) continue;

    // 🧮 Hitung jumlah digit via matematika murni
    let digitSum = 0;
    let tempNum = num;

    while (tempNum > 0) {
      digitSum += tempNum % 10;           // ambil digit terakhir
      tempNum = Math.floor(tempNum / 10); // buang digit terakhir
    }

    if (digitSum % 2 === 0) poeticNumbers.push(num);
  }

  return poeticNumbers;
};
```

> [!TIP]
> **Kenapa pakai `tempNum` dan bukan langsung `num`?**
> Karena `while` loop akan mengubah nilainya menjadi `0`. Jika kita pakai `num` langsung, kita kehilangan angka asli dan tidak bisa `push(num)` ke array! Selalu buat **salinan** saat proses destruktif.

---

<a name="-versi-c--modern-reduce"></a>
## 🅲 Versi C — Modern (reduce)

> **Paradigma:** Declarative | **Digit Extraction:** Spread + `.reduce()`

```javascript
const poeticNumbersInCove = (start, end) => {
  const poeticNumbers = [];

  for (let num = start; num <= end; num++) {
    if (num % 3 !== 0) continue;
    if (num % 5 === 0) continue;

    // 🧮 Satu baris: pecah → jumlahkan
    const numStr = String(num);
    const totalDigits = [...numStr].reduce(
      (sum, digitStr) => sum + Number(digitStr), 0
    );

    if (totalDigits % 2 === 0) poeticNumbers.push(num);
  }

  return poeticNumbers;
};
```

**Membedah satu baris ajaib:**
```
[...numStr].reduce((sum, digitStr) => sum + Number(digitStr), 0)
  │            │        │      │              │                │
  │            │        │      │              │                └─ nilai awal sum = 0
  │            │        │      │              └─ konversi char → angka
  │            │        │      └─ setiap karakter digit (masih string!)
  │            │        └─ akumulator yang terus bertambah
  │            └─ method array: "reduksi" array jadi 1 nilai
  └─ spread string → array karakter: "24" → ["2", "4"]
```

---

<a name="️-tabel-evolusi-solusi"></a>
## ⚖️ Tabel Evolusi Solusi

### Perbandingan Paradigma: Imperative vs Declarative

| Aspek | 🅰️ Tradisional | 🅱️ Matematika | 🅲 Modern |
|-------|:-:|:-:|:-:|
| **Paradigma** | Imperative | Imperative | Declarative |
| **Cara kerja** | Mendikte langkah per langkah | Mendikte dengan rumus math | Menyatakan hasil yang dimau |
| **Digit extraction** | `String()` + `for` loop | `% 10` + `Math.floor` | `[...str].reduce()` |
| **Jumlah baris** (inti) | ~6 baris | ~5 baris | ~3 baris |
| **Keterbacaan pemula** | ⭐⭐⭐ Sangat mudah | ⭐⭐ Perlu pahami modulo | ⭐ Perlu pahami reduce |
| **Performa** | Baik | 🏆 Terbaik | Sedikit lebih berat* |
| **Risiko bug** | Rendah | Sedang (infinite loop) | Rendah |

> [!NOTE]
> **\*Mengapa versi `reduce` sedikit lebih berat?**
> `[...numStr]` menciptakan **array baru di memori** setiap iterasi. Untuk angka kecil ini tidak terasa, tapi dalam skala jutaan angka, versi matematika murni lebih efisien karena tidak ada alokasi memori tambahan.

### Kapan Pakai Yang Mana?

| Situasi | Rekomendasi |
|---------|:-----------:|
| Belajar / interview / challenge | 🅰️ Tradisional |
| Butuh performa maksimal | 🅱️ Matematika |
| Kode production / tim | 🅲 Modern |
| Tidak yakin | 🅰️ Tradisional |

---

<a name="️-gotchas--troubleshooting"></a>
## ⚠️ Gotchas & Troubleshooting

Dua kesalahan nyata dari sesi mentoring yang **wajib dihindari**:

### 🐛 Gotcha 1: Infinite Loop (Versi Matematika)

> [!CAUTION]
> **Kode di bawah akan membuat browser/komputer FREEZE!** Jangan coba jalankan.

```javascript
// ❌ KODE SALAH — Menyebabkan infinite loop!
while (tempNum > 0) {
  const lastDigit = tempNum % 10;
  const firstDigit = Math.floor(tempNum / 10);
  digitSum += firstDigit + lastDigit;
  // 💀 FATAL: tempNum TIDAK PERNAH di-update!
  // Loop akan berjalan selamanya karena tempNum tetap > 0
}
```

**Apa yang salah?**
1. `tempNum` tidak pernah diubah → kondisi `tempNum > 0` selalu `true` → **loop tak pernah berhenti**
2. `firstDigit` ikut dijumlahkan padahal seharusnya hanya `lastDigit`

**✅ Perbaikan:**
```javascript
while (tempNum > 0) {
  digitSum += tempNum % 10;             // hanya ambil digit terakhir
  tempNum = Math.floor(tempNum / 10);   // WAJIB: update tempNum!
}
```

> [!TIP]
> **Aturan emas `while` loop:** Pastikan **selalu ada statement** di dalam loop yang mengubah kondisi loop menuju `false`. Tanpa itu = infinite loop.

---

### 🐛 Gotcha 2: Variable Shadowing & `else if` Berlebih

> [!WARNING]
> Kode di bawah **berjalan**, tapi rawan bug dan tidak bersih.

```javascript
// ❌ KODE BERMASALAH — Berjalan tapi rawan bug
for (let i = start; i <= end; i++) {
  if (i % 3 !== 0) {
    continue;
  } else if (i % 5 === 0) {   // ← 'else if' tidak perlu!
    continue;
  }

  const numStr = String(i);
  let total = 0;
  for (let i = 0; i < numStr.length; i++) {  // 💀 'let i' BENTROK!
    total += Number(numStr[i]);
  }
}
```

**Dua masalah:**

| # | Masalah | Penjelasan |
|:-:|---------|------------|
| 1 | **`else if` berlebih** | Setelah `continue`, kode bawahnya tidak dijalankan. Jadi `else` tidak diperlukan — cukup `if` biasa yang terpisah |
| 2 | **Variable shadowing** | Inner loop mendeklarasikan `let i` yang **menutupi** `i` dari outer loop. JavaScript mengizinkan ini, tapi membuat debugging sangat membingungkan |

**✅ Perbaikan:**
```javascript
for (let num = start; num <= end; num++) {   // ← 'num' bukan 'i'
  if (num % 3 !== 0) continue;               // ← tanpa else
  if (num % 5 === 0) continue;               // ← if terpisah

  const numStr = String(num);
  let total = 0;
  for (let j = 0; j < numStr.length; j++) {  // ← 'j' bukan 'i'
    total += Number(numStr[j]);
  }
}
```

> [!IMPORTANT]
> **Dua pelajaran utama:**
> 1. Setelah `continue`, tidak perlu `else` — guard clause berdiri sendiri
> 2. Gunakan nama variabel **berbeda** untuk nested loop (`num`/`j` bukan `i`/`i`)

---

## 🏁 Ringkasan

```
poeticNumbersInCove(start, end)
│
├─ Loop: start → end
│   ├─ 🚪 Guard 1: num % 3 !== 0 → continue
│   ├─ 🚪 Guard 2: num % 5 === 0 → continue
│   ├─ 🧮 Hitung jumlah digit (3 cara berbeda)
│   └─ ⚖️ Jumlah genap? → push ke array
│
└─ Return: array angka puitis ✨
```

**⬅️ Kembali ke [README — Analisis & Blueprint](./README.md)**
