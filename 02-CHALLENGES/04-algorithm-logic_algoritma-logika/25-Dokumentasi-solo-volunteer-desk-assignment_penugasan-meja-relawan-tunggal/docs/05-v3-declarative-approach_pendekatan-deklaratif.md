# 🚀 V3 — Declarative Approach — Pendekatan Deklaratif Modern

### ✨ _Evolusi dari loop manual ke Array Methods modern — lebih ringkas, lebih ekspresif, dan tetap mudah dibaca_

> 🎯 **Tujuan:** Mendokumentasikan versi solusi yang dibangun step-by-step selama sesi mentoring Fase 2 & 3 — menggunakan `.find()`, `.findLastIndex()`, dan Ternary Operator untuk menggantikan loop manual.

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Array%20|%20String%20|%20Math-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-V3-purple?style=for-the-badge)

---

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 💻 | [Kode Lengkap](#kode) | Versi deklaratif final dari sesi mentoring |
| 🔍 | [Penjelasan Baris per Baris](#penjelasan) | Breakdown setiap method yang dipakai |
| 🧠 | [Konsep Kunci](#konsep) | `.find()`, `.findLastIndex()`, Spread Operator |
| 📐 | [Pendekatan Bertahap](#bertahap) | Rekonstruksi step-by-step dari sesi mentoring |
| 🎞️ | [Simulasi Langkah demi Langkah](#simulasi) | Tracing eksekusi lengkap |
| 💡 | [Insight Penting](#insight) | Kapan pakai deklaratif vs imperatif |

---

<a name="kode"></a>
## 💻 Kode Lengkap

Versi ini adalah hasil **evolusi** dari sesi mentoring Fase 2 & 3 — di mana loop manual diganti menjadi Array Methods bawaan JavaScript yang lebih ekspresif.

```javascript
const findSoloVolunteer = (employeeIds, roomName, deskNumber) => {
  const soloId = employeeIds.find(
    (id) => employeeIds.indexOf(id) === employeeIds.lastIndexOf(id),
  );

  const vowelChars = 'aiueoAIUEO';

  let vowelPosition = [...roomName].findLastIndex((char) =>
    vowelChars.includes(char),
  );

  vowelPosition = vowelPosition !== -1 ? vowelPosition + 1 : -1;

  let isPowerOfThree = false;

  while (deskNumber % 3 === 0 && deskNumber > 0) {
    deskNumber = deskNumber / 3;
  }

  if (deskNumber === 1) isPowerOfThree = true;

  return [soloId, vowelPosition, isPowerOfThree];
};
```

---

<a name="penjelasan"></a>
## 🔍 Penjelasan Baris per Baris

### 🔵 Misi 1 — `.find()` Menggantikan `for` Loop

```javascript
const soloId = employeeIds.find(
  (id) => employeeIds.indexOf(id) === employeeIds.lastIndexOf(id),
);
```

🔎 **Cari elemen pertama yang memenuhi syarat.** Method `.find()` menerima sebuah arrow function sebagai "syarat pencarian". Dia akan menelusuri array satu per satu, dan **langsung berhenti** begitu menemukan elemen yang syaratnya `true`.

> 📖 **Penjelasan kata per kata:**
>
> | Bagian | Arti |
> |--------|------|
> | `.find(...)` | Cari satu elemen pertama yang memenuhi syarat |
> | `(id) =>` | Arrow function — setiap elemen diwakili oleh `id` |
> | `indexOf(id)` | Posisi **pertama** kali `id` muncul di array |
> | `lastIndexOf(id)` | Posisi **terakhir** kali `id` muncul di array |
> | `===` | Jika posisi pertama = terakhir → hanya muncul 1 kali |

> [!TIP]
> 💡 **Perbandingan sebelum & sesudah:**
> ```javascript
> // ❌ V2 — 7 baris kode (loop manual + variabel + break)
> let soloId;
> for (const id of employeeIds) {
>     if (employeeIds.indexOf(id) === employeeIds.lastIndexOf(id)) {
>         soloId = id;
>         break;
>     }
> }
>
> // ✅ V3 — 3 baris kode (deklaratif)
> const soloId = employeeIds.find(
>     (id) => employeeIds.indexOf(id) === employeeIds.lastIndexOf(id),
> );
> ```

---

### 🟢 Misi 2 — Spread Operator + `.findLastIndex()`

```javascript
const vowelChars = 'aiueoAIUEO';

let vowelPosition = [...roomName].findLastIndex((char) =>
  vowelChars.includes(char),
);

vowelPosition = vowelPosition !== -1 ? vowelPosition + 1 : -1;
```

🔤 **Pecah string menjadi array, lalu cari index vokal terakhir.** Dua teknik modern bekerja sama di sini: Spread Operator untuk konversi tipe data, dan `.findLastIndex()` untuk pencarian mundur otomatis.

> 📖 **Penjelasan kata per kata:**
>
> | Bagian | Arti |
> |--------|------|
> | `[...roomName]` | Spread Operator — pecah `"Main"` menjadi `['M','a','i','n']` |
> | `.findLastIndex(...)` | Cari index **terakhir** yang memenuhi syarat (otomatis dari belakang) |
> | `(char) =>` | Setiap huruf diwakili oleh `char` |
> | `vowelChars.includes(char)` | Cek apakah huruf tersebut ada di daftar vokal |

> 📖 **Penjelasan Ternary Operator:**
>
> | Bagian | Arti |
> |--------|------|
> | `vowelPosition !== -1` | Apakah vokal ditemukan? |
> | `? vowelPosition + 1` | Jika YA → konversi ke 1-indexed |
> | `: -1` | Jika TIDAK → biarkan tetap -1 |

> [!WARNING]
> ⚠️ **Kenapa perlu Ternary?** Karena `.findLastIndex()` return `-1` saat tidak menemukan. Jika kita blindly menambah 1, `-1 + 1 = 0` — padahal soal meminta `-1` untuk kasus "tidak ada vokal". Ternary melindungi kita dari jebakan ini.

---

### 🟠 Misi 3 — While Loop (Tetap Sama)

```javascript
let isPowerOfThree = false;

while (deskNumber % 3 === 0 && deskNumber > 0) {
  deskNumber = deskNumber / 3;
}

if (deskNumber === 1) isPowerOfThree = true;
```

🔢 **Misi 3 tidak berubah dari V2.** Untuk logika pembagian berulang, `while` loop sudah merupakan pendekatan yang paling bersih dan aman. Tidak ada Array Method yang bisa menggantikannya untuk kasus ini.

> [!NOTE]
> 💡 **Tidak semua bagian harus "dimodernkan".** Jika loop sudah optimal dan mudah dibaca, memaksa menggunakan method modern justru bisa menurunkan readability. Programmer yang matang tahu kapan harus memakai tools modern dan kapan harus tetap sederhana.

---

<a name="konsep"></a>
## 🧠 Konsep Kunci

### 1️⃣ `.find()` — _"Detektif yang Berhenti Begitu Ketemu"_ 🔍

```
🎯 Fungsi    → Mencari SATU elemen pertama di array yang memenuhi syarat
📌 Return    → Elemen itu sendiri (bukan index-nya). Undefined jika tidak ada
🔐 Analogi   → Seperti detektif yang menginterogasi satu per satu.
               Begitu tersangka ditemukan, dia langsung STOP — tidak perlu
               menginterogasi sisanya
```

```javascript
// Contoh sederhana:
const angka = [4, 7, 2, 9];
const hasil = angka.find(x => x > 5);  // → 7 (elemen pertama yang > 5)
```

### 2️⃣ `.findLastIndex()` — _"Detektif yang Mulai dari Belakang"_ 🔎

```
🎯 Fungsi    → Mencari INDEX terakhir di array yang memenuhi syarat
📌 Return    → Index (angka). -1 jika tidak ditemukan
🔐 Analogi   → Seperti detektif yang mulai interogasi dari orang terakhir.
               Begitu ketemu tersangka, dia langsung STOP dan lapor nomor
               kursinya (index)
```

```javascript
// Contoh sederhana:
const huruf = ['M', 'a', 'i', 'n'];
const idx = huruf.findLastIndex(h => 'aiueo'.includes(h));  // → 2 (index huruf 'i')
```

### 3️⃣ Spread Operator `[...]` — _"Mesin Fotocopy Karakter"_ 📋

```
🎯 Fungsi    → Memecah string menjadi array huruf per huruf
📌 Alternatif → .split('') melakukan hal yang sama
🔐 Analogi   → Seperti memfotocopy halaman buku menjadi kartu-kartu terpisah —
               setiap kartu berisi satu huruf
```

```javascript
// Dua cara yang sama hasilnya:
[...'Main']         // → ['M', 'a', 'i', 'n']
'Main'.split('')    // → ['M', 'a', 'i', 'n']
```

> [!TIP]
> 💡 **Kenapa `[...roomName]` dan bukan `roomName.split('')`?** Keduanya bekerja sama untuk kasus kita. Tapi Spread Operator lebih aman untuk string yang mengandung emoji atau karakter Unicode khusus (karena dia memecah berdasarkan *code point*, bukan *code unit*).

---

<a name="bertahap"></a>
## 📐 Pendekatan Bertahap (Rekonstruksi Sesi Mentoring)

Berikut urutan step-by-step yang dilalui selama sesi mentoring Fase 2 & 3:

### Step 1 — Misi 1 dengan `for...of` (Fase 2)

```javascript
// Dimulai dengan loop manual dulu
let soloId;
for (const id of employeeIds) {
  if (employeeIds.indexOf(id) === employeeIds.lastIndexOf(id)) {
    soloId = id;
    break;
  }
}
```
> ✅ *Kode berjalan benar. Lanjut ke Misi 2.*

### Step 2 — Misi 2 dengan `for` mundur (Fase 2)

```javascript
const vowelChars = 'aiueoAIUEO';
let vowelPosition = -1;

for (let i = roomName.length - 1; i >= 0; i--) {
  if (vowelChars.includes(roomName[i])) {
    vowelPosition = i + 1;
    break;
  }
}
```
> ✅ *Kode berjalan benar. Lanjut ke Misi 3.*

### Step 3 — Misi 3 dengan `while` (Fase 2)

```javascript
let isPowerOfThree = false;
while (deskNumber % 3 === 0 && deskNumber > 0) {
  deskNumber = deskNumber / 3;
}
if (deskNumber === 1) isPowerOfThree = true;
```
> ✅ *Solusi Fase 2 lengkap! Masuk Fase 3: Evolusi.*

### Step 4 — Evolusi Misi 1: `for...of` → `.find()` (Fase 3)

```javascript
// Loop 7 baris diringkas menjadi 3 baris
const soloId = employeeIds.find(
  (id) => employeeIds.indexOf(id) === employeeIds.lastIndexOf(id),
);
```
> ✅ *Lebih ringkas. Kesalahan awal: pakai `!==` bukannya `===` — diperbaiki setelah review.*

### Step 5 — Evolusi Misi 2: `for` mundur → `.findLastIndex()` (Fase 3)

```javascript
let vowelPosition = [...roomName].findLastIndex((char) =>
  vowelChars.includes(char),
);
vowelPosition = vowelPosition !== -1 ? vowelPosition + 1 : -1;
```
> ✅ *Lebih modern. Kesalahan awal: lupa arrow function di dalam `.findLastIndex()` — diperbaiki setelah review.*

---

<a name="simulasi"></a>
## 🎞️ Simulasi Langkah demi Langkah

```
📊 Tracing Eksekusi:
   Input: employeeIds = [8, 15, 22, 15, 8, 33, 33], roomName = "Breakroom", deskNumber = 1

   ──── MISI 1: .find() ────

   .find() menelusuri array:
     id = 8  → indexOf(8)  = 0, lastIndexOf(8)  = 4  → 0 === 4? ❌ → lanjut
     id = 15 → indexOf(15) = 1, lastIndexOf(15) = 3  → 1 === 3? ❌ → lanjut
     id = 22 → indexOf(22) = 2, lastIndexOf(22) = 2  → 2 === 2? ✅ → RETURN 22!

   soloId = 22 ✅
   (Angka 33 dan sisa lainnya tidak perlu dicek — .find() otomatis berhenti)

   ──── MISI 2: [...roomName].findLastIndex() ────

   [...'Breakroom'] = ['B','r','e','a','k','r','o','o','m']

   .findLastIndex() menelusuri dari belakang:
     index 8: 'm' → vokal? ❌
     index 7: 'o' → vokal? ✅ → RETURN 7!

   vowelPosition = 7 → 7 !== -1? ✅ → 7 + 1 = 8

   vowelPosition = 8 ✅

   ──── MISI 3: While Loop ────

   deskNumber = 1
   1 % 3 === 0? ❌ → while tidak dijalankan sama sekali
   deskNumber === 1? ✅ → isPowerOfThree = true ✅

   ──── OUTPUT ────

   return [22, 8, true] ✅
```

---

<a name="insight"></a>
## 💡 Insight Penting

> **Deklaratif vs Imperatif — kapan pakai yang mana?**
> - Gunakan **deklaratif** (`.find()`, `.filter()`, `.map()`) ketika tujuannya jelas dan bisa diungkapkan dalam satu kalimat: *"Cari elemen yang..."*, *"Ambil semua yang..."*, *"Ubah setiap elemen menjadi..."*.
> - Gunakan **imperatif** (`for`, `while`) ketika logikanya kompleks, membutuhkan state yang berubah-ubah, atau memerlukan kontrol alur yang presisi (seperti pembagian berulang di Misi 3).

> **Kesalahan yang saya buat saat belajar `.find()`:**
> Saya awalnya menulis `employeeIds.indexOf(id) !== employeeIds.lastIndexOf(id)` (pakai `!==`). Ini **kebalikan** dari yang kita mau — ini justru mencari angka yang punya kembaran! Ingat: `===` berarti "sama" (jomblo), `!==` berarti "berbeda" (punya pasangan).

> **Kesalahan yang saya buat saat belajar `.findLastIndex()`:**
> Saya awalnya menulis `.findLastIndex(vowelChars)` tanpa arrow function. Ingat: method seperti `.find()`, `.findLastIndex()`, `.filter()`, `.map()` **selalu** membutuhkan arrow function `(param) => ...` di dalamnya sebagai "syarat pengecekan".

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 04 — V2 Refactored Approach](./04-v2-refactored-approach_pendekatan-refactored.md)**
- **📖 [Lanjut ke Part 06 — V4 Coddy Approach →](./06-v4-coddy-approach_pendekatan-coddy.md)**
