# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)

---

## 💭 Proses Berpikir Awal

> _Apa yang pertama kali terlintas di pikiran saat membaca soal ini?_

Karena huruf besar dan kecil dianggap sama (`"moOse"` → `false`), string harus diubah menjadi format _lowercase_ terlebih dahulu. Setelah itu, untuk mengetahui apakah ada huruf yang berulang, kita harus meloop karakter demi karakter dan mengingat karakter mana saja yang sudah pernah dicek. Jika huruf yang sedang dicek sudah ada di dalam "ingatan/memori", berarti huruf tersebut berulang.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```
1. Buat variable penampung kata (sebagai memori)
2. Ubah string input menjadi lowercase
3. Loop dari index ke 0 sampai batas panjang string
4. Di dalam loop cek, apakah karakter sekarang sudah ada di variable penampung
   - Kalau sudah ada, langsung return false (karena ada duplikat)
   - Kalau tidak ada, tambahkan karakter sekarang ke variable penampung
5. Jika sampai akhir loop tidak menemukan double, return true
```

---

## 🔄 Percobaan Pertama (Sebelum Mentoring)

```javascript
// Attempt #1 — Frequency Counter (menghitung kemunculan tiap huruf)
function isIsogram(str) {
  const freq = {};

  for (const char of str.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const key in freq) {
    if (freq[key] !== 1) return false;
  }

  return true;
}
```

**Hasil:** ✅ Lulus
**Apa yang bisa diperbaiki:**

- **Naming kurang deskriptif** — `freq` dan `key` terlalu generik, tidak langsung menggambarkan isinya.
- **Loop dua kali** — Loop pertama menghitung semua frekuensi, loop kedua mengecek duplikat. Padahal kita bisa langsung berhenti saat pertama kali menemukan duplikat di loop pertama.
- **Menyimpan angka padahal hanya butuh boolean** — Karena kita hanya perlu tahu "sudah pernah muncul atau belum" (bukan "berapa kali muncul"), menyimpan `true` lebih tepat daripada menyimpan angka.

---

## 🔄 Percobaan Kedua (Setelah Mentoring — Refactored)

```javascript
// Attempt #2 — Object sebagai "daftar absensi" + early exit
function isIsogram(str) {
  const seenLetters = {};

  for (const char of str.toLowerCase()) {
    if (seenLetters[char]) return false;
    seenLetters[char] = true;
  }

  return true;
}
```

**Hasil:** ✅ Lulus
**Kenapa lebih baik:**

- Naming lebih deskriptif: `seenLetters` langsung menjelaskan bahwa ini adalah "huruf-huruf yang sudah terlihat".
- Hanya butuh **1 loop** (bukan 2) — lebih efisien.
- **Early exit** — langsung berhenti begitu ketemu duplikat pertama, tidak perlu menghitung semua huruf dulu.
- Value di object menggunakan `true` (boolean) bukan angka — lebih sesuai dengan tujuannya.

---

## 🔄 Percobaan Ketiga (Setelah Mentoring — String Penampung)

```javascript
// Attempt #3 — String sebagai memori + includes()
const isIsogram = (str) => {
  const lowerStr = str.toLowerCase();
  let seenChars = '';

  for (let i = 0; i < lowerStr.length; i++) {
    const char = lowerStr[i];
    if (seenChars.includes(char)) return false;
    seenChars += char;
  }

  return true;
};
```

**Hasil:** ✅ Lulus
**Pendekatan berbeda:**

- Menggunakan `string` kosong sebagai penampung (bukan `object`).
- Mengecek duplikat dengan `.includes()` (bukan property lookup di object).
- Menggunakan `for` loop klasik dengan index (bukan `for...of`).

---

## ✅ Solusi Final

```javascript
// Solusi Final — Object sebagai "daftar absensi"
function isIsogram(str) {
  const seenLetters = {};

  for (const char of str.toLowerCase()) {
    if (seenLetters[char]) return false;
    seenLetters[char] = true;
  }

  return true;
}
```

---

## 🔍 Penjelasan Baris per Baris

```javascript
function isIsogram(str) {
  const seenLetters = {};
  // ⬆️ Membuat object kosong sebagai "daftar absensi".
  //    Setiap huruf yang sudah lewat akan ditandai di sini.

  for (const char of str.toLowerCase()) {
    // ⬆️ Ubah string ke lowercase, lalu loop per karakter menggunakan for...of.
    //    Variabel `char` otomatis berisi huruf saat ini di setiap iterasi.

    if (seenLetters[char]) return false;
    // ⬆️ Cek apakah huruf `char` sudah ditandai di `seenLetters`.
    //    Jika sudah ada (bernilai `true`), berarti duplikat → langsung return false.

    seenLetters[char] = true;
    // ⬆️ Jika belum ada, tandai huruf ini sebagai "sudah terlihat" dengan nilai `true`.
  }

  return true;
  // ⬆️ Jika loop selesai tanpa menemukan duplikat, semua huruf unik → return true.
}
```

---

## 🎬 Visualisasi: `isIsogram("moOse")` → `false`

Pertama, `"moOse".toLowerCase()` → `"moose"`

```
seenLetters = {}  (kosong)

Iterasi 1 — char = 'm'
├── Cek: seenLetters['m'] → undefined  ✅ Aman
├── Tandai: seenLetters['m'] = true
└── seenLetters = { m: true }

Iterasi 2 — char = 'o'
├── Cek: seenLetters['o'] → undefined  ✅ Aman
├── Tandai: seenLetters['o'] = true
└── seenLetters = { m: true, o: true }

Iterasi 3 — char = 'o'
├── Cek: seenLetters['o'] → true  🚨 DUPLIKAT!
└── return false ❌  (berhenti, tidak lanjut ke 's' dan 'e')
```

---

## 🧪 Verifikasi Manual

```javascript
console.log(isIsogram('Dermatoglyphics')); // → true ✅
console.log(isIsogram('aba')); // → false ✅
console.log(isIsogram('moOse')); // → false ✅
console.log(isIsogram('')); // → true ✅ (String kosong dianggap isogram)
```

---

_⬅️ Kembali ke [01-soal.md](01-soal.md)_  
_➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)_
