# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

> *Bagaimana cara mengganti setiap karakter dalam string DNA dengan pasangan komplementernya?*

Tantangan utamanya adalah tipe data `String` di JavaScript itu **immutable** — kita tidak bisa mengubah karakter di dalamnya secara langsung (misalnya `str[0] = "T"` tidak akan bekerja). Oleh karena itu, kita butuh wadah penampung baru untuk membangun string hasil, sambil membaca input karakter per karakter.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```text
1. Siapkan wadah string kosong untuk menampung hasil.
2. Looping setiap karakter di dalam string input.
3. Di dalam loop, cek karakter saat ini:
   - Jika "A" → tambahkan "T" ke hasil.
   - Jika "T" → tambahkan "A" ke hasil.
   - Jika "C" → tambahkan "G" ke hasil.
   - Jika "G" → tambahkan "C" ke hasil.
4. Setelah loop selesai, return hasil.
```

---

## 🔄 Versi 1: Pendekatan Basic (If-Else)

Pendekatan paling eksplisit menggunakan `for` loop klasik dan struktur percabangan `if...else if` untuk mengevaluasi setiap kemungkinan karakter.

```javascript
function dnaStrand(dna) {
  let result = "";

  for (let i = 0; i < dna.length; i++) {
    if (dna[i] === "A") {
      result += "T";
    } else if (dna[i] === "T") {
      result += "A";
    } else if (dna[i] === "C") {
      result += "G";
    } else if (dna[i] === "G") {
      result += "C";
    }
  }

  return result;
}
```

**Kelebihan:** Sangat mudah dipahami bagi pemula, logika tertulis secara eksplisit.  
**Kekurangan:** Kode cukup panjang dan repetitif; jika kasusnya bertambah, rantai `if-else` membengkak.

---

## 🔄 Versi 2: Pendekatan Switch Case

Mengganti `if...else if` dengan `switch` untuk merapikan visual kode. Setiap kasus terpisah dengan jelas secara vertikal.

```javascript
function dnaStrand(dna) {
  let result = "";

  for (let i = 0; i < dna.length; i++) {
    switch (dna[i]) {
      case "A": result += "T"; break;
      case "T": result += "A"; break;
      case "C": result += "G"; break;
      case "G": result += "C"; break;
    }
  }

  return result;
}
```

**Kelebihan:** Struktur lebih rapi dan mudah di-*scan* oleh mata dibanding `if-else` berderet.  
**Kekurangan:** Masih imperatif — kita mendiktekan setiap langkah secara manual; `break` wajib dituliskan di setiap `case`.

---

## ✅ Versi 3: Object Mapping + `for...of` (Solusi Final)

Alih-alih mengecek kondisi satu per satu, kita membuat sebuah **kamus (Object)** yang memetakan setiap basa ke pasangannya. Lalu kita tinggal "menerjemahkan" setiap karakter menggunakan *Bracket Notation* `kamus[char]`.

```javascript
const dnaStrand = (dna) => {
  let result = '';
  const pairs = {
    "A": "T",
    "T": "A",
    "C": "G",
    "G": "C"
  };

  for (const char of dna) {
    result += pairs[char];
  }

  return result;
};
```

**Kelebihan:** Tidak ada lagi rantai `if/else` atau `switch` — penambahan pasangan baru cukup tambah satu baris di kamus. Looping `for...of` juga lebih bersih dari `for (let i = 0; ...)`.  
**Kekurangan:** Membutuhkan pemahaman tentang Object dan Bracket Notation.

---

## 🔍 Penjelasan Baris per Baris (Versi 3)

```javascript
const dnaStrand = (dna) => {         // Deklarasi fungsi arrow, parameter: string dna
  let result = '';                    // Wadah string kosong untuk menampung hasil
  const pairs = {                     // Kamus pasangan basa DNA
    "A": "T",                         //   key "A" → value "T"
    "T": "A",                         //   key "T" → value "A"
    "C": "G",                         //   key "C" → value "G"
    "G": "C"                          //   key "G" → value "C"
  };

  for (const char of dna) {          // Loop setiap karakter dalam string
    result += pairs[char];            // Cari pasangan di kamus, tambahkan ke result
  }

  return result;                      // Kembalikan DNA komplementer yang sudah dirakit
};
```

---

## 🧪 Verifikasi Manual

```javascript
console.log(dnaStrand("ATTGC")); // → "TAACG" ✅
console.log(dnaStrand("GTAT"));  // → "CATA"  ✅
console.log(dnaStrand("A"));     // → "T"     ✅
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
