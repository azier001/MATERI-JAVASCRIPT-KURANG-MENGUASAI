# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Kita berhasil mengidentifikasi bahwa `String` itu **immutable**, sehingga kita langsung tahu butuh wadah penampung baru (`result`).
- Refactoring dari `if/else` → `switch` → **Object Mapping** berjalan sangat natural dan menunjukkan pemahaman yang baik tentang evolusi kode.
- Penggunaan `for...of` untuk iterasi string membuktikan kenyamanan dengan sintaks modern ES6.
- Solusi final kita (Object Mapping + `for...of`) ternyata sudah **sejajar** dengan fondasi yang digunakan semua solusi top komunitas.

---

## ❌ Apa yang Salah di Awal?

*Tidak ada kesalahan logika sejak awal. Pendekatan langsung akurat dari ide pertama (loop + cek karakter) hingga eksekusi kodenya.* 🚀

---

## 🌟 Best Practice & Solusi Unik Komunitas

Setelah melihat tab *Solutions* di Codewars, semua solusi teratas berakar dari konsep yang sama: **Object Mapping**. Yang berbeda hanyalah *cara iterasinya*. Ada dua paradigma utama:

### Pendekatan 1: Regex + `.replace()` dengan Callback

```javascript
let pairs = { A: 'T', T: 'A', C: 'G', G: 'C' };
const DNAStrand = dna => dna.replace(/./g, c => pairs[c]);
```

**Kenapa ini sering di-upvote (Best Practice):**
- **One-liner sejati** — seluruh logika ditulis dalam satu baris saja.
- Memanfaatkan fakta bahwa `.replace()` bisa menerima **function sebagai argumen kedua** (bukan hanya string).
- Regex `/./g` secara elegan menangkap *setiap karakter tunggal* dalam string.

**🔍 Penjelasan Baris per Baris:**

```javascript
let pairs = { A: 'T', T: 'A', C: 'G', G: 'C' };
// ↑ Kamus pasangan basa DNA (Object Mapping)

const DNAStrand = dna =>     // Arrow function, parameter: string dna
  dna.replace(               // Panggil method .replace() pada string dna
    /./g,                    // Regex: /./g → cocokkan SETIAP karakter (.) secara global (g)
    c => pairs[c]            // Callback: untuk setiap karakter 'c' yang cocok,
  );                         // cari pasangannya di kamus dan kembalikan sebagai pengganti
```

> **Insight:** `.replace()` biasanya dipakai untuk mengganti teks statis (`str.replace("A", "T")`), tapi ternyata argumen keduanya bisa berupa *function*! Fungsi ini dipanggil untuk **setiap match** yang ditemukan, dan return-nya digunakan sebagai karakter pengganti.

---

### Pendekatan 2: `.split().map().join()` (Method Chaining)

```javascript
var pairs = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };

function DNAStrand(dna) {
  return dna.split('').map(function(v) { return pairs[v] }).join('');
}
```

**Kenapa ini menarik:**
- Menunjukkan pola **Split → Transform → Join** yang sangat umum di JavaScript.
- String tidak punya method `.map()`, sehingga harus dipecah dulu menjadi Array.
- Setiap elemen array di-*transform* melalui lookup ke kamus, lalu dijahit kembali.

**🔍 Penjelasan Baris per Baris:**

```javascript
var pairs = { 'A': 'T', 'T': 'A', 'C': 'G', 'G': 'C' };
// ↑ Kamus pasangan basa DNA

function DNAStrand(dna) {
  return dna
    .split('')               // 1. Pecah string menjadi array → "ATT" → ["A", "T", "T"]
    .map(function(v) {       // 2. Iterasi array, untuk setiap elemen 'v':
      return pairs[v]        //    cari pasangannya di kamus → ["T", "A", "A"]
    })
    .join('');                // 3. Gabung kembali array menjadi string → "TAA"
}
```

---

### Pendekatan 3: *Inline Object* di dalam `.map()` (The Clever Way)

```javascript
function DNAStrand(dna) {
  return dna.split('').map(function(v) {
    return { A: 'T', T: 'A', C: 'G', G: 'C' }[v];
  }).join('');
}
```

**Kenapa ini menarik (dan sedikit berbahaya):**
- Kamus pasangan dibuat **langsung di dalam `.map()`** tanpa menyimpannya ke variabel terlebih dahulu.
- Secara teknis ini bekerja, tapi kamus **dibuat ulang di setiap iterasi** — tidak efisien untuk string panjang!
- Di dunia industri, ini dianggap kurang *readable* dan tidak direkomendasikan.

**🔍 Penjelasan Baris per Baris:**

```javascript
function DNAStrand(dna) {
  return dna
    .split('')                               // 1. Pecah string menjadi array karakter
    .map(function(v) {                       // 2. Untuk setiap karakter 'v':
      return { A: 'T', T: 'A', C: 'G', G: 'C' }[v];
      // ↑ Buat object baru → langsung akses key [v] → return value-nya
      // ⚠️ Object ini DIBUAT ULANG setiap iterasi (tidak efisien)
    })
    .join('');                                // 3. Gabung kembali menjadi string
}
```

---

### Pendekatan 4: Regex + Static Property pada Function

```javascript
function DNAStrand(dna) {
  return dna.replace(/./g, function(c) {
    return DNAStrand.pairs[c]
  })
}

DNAStrand.pairs = { A: 'T', T: 'A', C: 'G', G: 'C' };
```

**Kenapa ini menarik:**
- Memanfaatkan fakta unik JavaScript: **function adalah object**, sehingga bisa punya *property* sendiri (`DNAStrand.pairs`).
- Kamus disimpan sebagai *static property* yang melekat pada fungsi, bukan di scope global. Ini mengurangi polusi *global namespace*.

**🔍 Penjelasan Baris per Baris:**

```javascript
function DNAStrand(dna) {
  return dna.replace(
    /./g,                        // Regex: cocokkan setiap karakter secara global
    function(c) {                // Callback untuk setiap match:
      return DNAStrand.pairs[c]  // Akses kamus yang disimpan di property fungsi itu sendiri
    }
  )
}

DNAStrand.pairs = { A: 'T', T: 'A', C: 'G', G: 'C' };
// ↑ Menambahkan property 'pairs' ke fungsi DNAStrand
// Function di JS adalah First-Class Object — bisa punya property sendiri!
```

---

## 📚 Konsep Baru (Review)

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| **Object Mapping** | Menggunakan Object sebagai "kamus" untuk memetakan input ke output tanpa rantai `if/else`. Akses menggunakan Bracket Notation `obj[key]`. |
| **`.replace()` + Callback** | Method `.replace()` bisa menerima function sebagai argumen kedua. Function ini dipanggil untuk setiap match, dan return-nya menjadi karakter pengganti. |
| **Regex `/./g`** | Pola regex `.` mencocokkan **satu karakter apa saja**. Flag `g` (global) membuat pencocokan berlaku ke **semua** karakter, bukan hanya yang pertama. |
| **Split → Map → Join** | Pola standar untuk mentransformasi string di JavaScript: pecah jadi array, olah tiap elemen, gabung kembali jadi string. |
| **Function as Object** | Di JavaScript, function adalah *first-class object* — bisa punya property sendiri (misal: `myFunc.data = {...}`). |

---

## 📝 Catatan untuk Masa Depan

- [x] Untuk kasus "ganti karakter berdasarkan peta pasangan", **Object Mapping** adalah solusi terbaik dan paling fleksibel.
- [x] Ingat bahwa `.replace()` bukan hanya untuk mengganti teks statis — ia bisa menerima **Regex + Callback function** untuk manipulasi yang sangat dinamis.
- [x] Pola **Split → Map → Join** sangat berguna setiap kali kita ingin mentransformasi string per karakter menggunakan kekuatan Array methods.
- [x] Menyimpan kamus di variabel terpisah (bukan *inline* di dalam `.map()`) lebih efisien dan lebih *readable* untuk kode produksi.

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
