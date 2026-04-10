# 🌐 Valid IPv4 Address — Ringkasan Algoritma Semua Versi

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║       🌐 RINGKASAN ALGORITMA — COMPLETE REFERENCE 🌐                    ║
║         Versi Saya (Regex + Leading Zero) · Versi Referensi (parseInt)  ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Versi](https://img.shields.io/badge/Versi-2%20Solusi-success?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Coddy-blue?style=for-the-badge)

---

## 🎯 Tujuan

- ✅ Ringkasan challenge dan kriteria dalam satu tempat
- ✅ Ringkasan algoritma 2 versi secara detail
- ✅ Perbandingan pendekatan Regex vs parseInt+toString
- ✅ Catatan kesalahan pribadi selama proses belajar
- ✅ Quick reference untuk review

---

## 🧭 Quick Jump

| 🧩 Challenge | ✅ Versi 1 | ⚡ Versi 2 | 🐛 Kesalahan Saya | 🧪 Test Cases | 📊 Perbandingan |
|:------------:|:---------:|:---------:|:-----------------:|:-------------:|:---------------:|
| [Jump](#-deskripsi-challenge) | [Jump](#-versi-1-regex--leading-zero-versi-saya) | [Jump](#-versi-2-parseint--tostring-referensi) | [Jump](#-kesalahan-saya-selama-proses) | [Jump](#-test-cases-lengkap) | [Jump](#-perbandingan-lengkap) |

---

# 🧩 DESKRIPSI CHALLENGE

## 📋 Soal

> ### 📋 Deskripsi
>
> Buat function **`isValidIPv4`** yang menerima satu parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `str` | `string` | String yang akan dicek apakah merupakan IPv4 yang valid |
>
> Fungsi mengecek apakah string tersebut adalah alamat **IPv4 yang valid**.

---

## 🔍 Kriteria

> **Apa itu IPv4 yang Valid?**
> IPv4 adalah alamat jaringan yang terdiri dari **4 segmen** (disebut octet) yang dipisahkan oleh titik `.`
> Setiap segmen harus memenuhi semua syarat berikut:
> - Terdiri dari **digit angka saja** (tidak boleh ada huruf atau spasi)
> - Nilainya antara **0 sampai 255**
> - **Tidak boleh ada leading zero** (contoh: `045` tidak valid, tapi `0` valid)
> - Jumlah segmen harus **tepat 4** (tidak boleh lebih, tidak boleh kurang)
>
> **Return:** `true` jika valid, `false` jika tidak valid

---

## 📊 Contoh-contoh

```javascript
// ✅ Valid — IPv4 normal
console.log(isValidIPv4('1.2.3.4'))
// → true
```

```javascript
// ✅ Valid — angka besar tapi masih dalam range
console.log(isValidIPv4('123.45.67.89'))
// → true
```

```javascript
// ❌ Tidak valid — hanya 3 segmen
console.log(isValidIPv4('1.2.3'))
// → false
```

```javascript
// ❌ Tidak valid — 5 segmen
console.log(isValidIPv4('1.2.3.4.5'))
// → false
```

```javascript
// ❌ Tidak valid — segmen melebihi 255
console.log(isValidIPv4('123.456.78.90'))
// → false
```

```javascript
// ❌ Tidak valid — ada leading zero
console.log(isValidIPv4('123.045.067.089'))
// → false
```

---

### Simulasi Pengecekan IPv4:

```
str = '122.164.23.21'

Split by '.' → ['122', '164', '23', '21']
Length = 4 ✅

Segmen '122':
  Hanya digit?       ✅
  Leading zero?      ❌ (tidak ada)
  0 <= 122 <= 255?   ✅ → valid

Segmen '164':
  Hanya digit?       ✅
  Leading zero?      ❌ (tidak ada)
  0 <= 164 <= 255?   ✅ → valid

Segmen '23':
  Hanya digit?       ✅
  Leading zero?      ❌ (tidak ada)
  0 <= 23 <= 255?    ✅ → valid

Segmen '21':
  Hanya digit?       ✅
  Leading zero?      ❌ (tidak ada)
  0 <= 21 <= 255?    ✅ → valid

Hasil: true ✅
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter | `str` — string yang akan divalidasi |
| Output | `true` jika valid, `false` jika tidak valid |
| Jumlah segmen | Tepat 4 segmen dipisah titik `.` |
| Isi segmen | Hanya digit, nilai 0–255, tanpa leading zero |
| Method utama | `.split()`, `.every()` |

---

> 💡 **Aturan Sederhana:** IPv4 valid = tepat 4 segmen, setiap segmen hanya angka murni antara 0–255, tanpa leading zero.

---

## ⚡ Quick Test

```javascript
console.log(isValidIPv4('1.2.3.4'))          // → true
```

```javascript
console.log(isValidIPv4('123.456.78.90'))    // → false
```

```javascript
console.log(isValidIPv4('123.045.067.089'))  // → false
```

```javascript
console.log(isValidIPv4('1.2.3'))            // → false
```

---

═══════════════════════════════════════════════════════════════════════

# ✅ VERSI 1: Regex + Leading Zero (Versi Saya)

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Eksplisit%20%7C%20Bertahap-green?style=flat-square)
![Style](https://img.shields.io/badge/Style-Imperative-orange?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
const isValidIPv4 = (str) => {
  const formatted = str.split('.');

  if (formatted.length !== 4) return false;

  const isValid = formatted.every((number) => {
    if (number[0] === '0' && number.length > 1) return false;
    if (/^\d+$/.test(number)) {
      return Number(number) >= 0 && Number(number) <= 255;
    }
    return false;
  });

  return isValid;
};
```

</details>

### **Konsep Inti:**
```
Split string by '.' → array of segments
Cek panjang array === 4, jika tidak → return false
Untuk setiap segment di dalam every():
  Cek leading zero: karakter pertama '0' DAN panjang > 1 → return false
  Cek hanya digit dengan regex /^\d+$/
  Jika lolos regex → cek apakah nilai antara 0 dan 255
  Jika tidak lolos regex → return false
Return hasil every()
```

### **Step-by-Step (Detail):**

#### 🔵 Split String:

1. **`str.split('.')`**
   - Memecah string berdasarkan titik `.`
   - `'122.164.23.21'` → `['122', '164', '23', '21']`
   - Hasilnya array of string (bukan number!)

#### 🟡 Cek Jumlah Segmen:

2. **`if (formatted.length !== 4) return false`**
   - Tepat 4 segmen — tidak boleh kurang, tidak boleh lebih
   - `'1.2.3'` → length 3 → `false`
   - `'1.2.3.4.5'` → length 5 → `false`

#### 🟠 Cek Leading Zero:

3. **`if (number[0] === '0' && number.length > 1) return false`**
   - `number[0]` → karakter pertama dari string
   - `'045'[0] === '0'` dan `'045'.length > 1` → `true` → ditolak!
   - `'0'[0] === '0'` tapi `'0'.length > 1` → `false` → `'0'` tetap valid!
   - Contoh:
   ```javascript
   '045'  → number[0] = '0', length = 3 → leading zero! ❌
   '0'    → number[0] = '0', length = 1 → valid ✅
   '123'  → number[0] = '1'             → valid ✅
   ```

#### 🟢 Cek Hanya Digit dengan Regex:

4. **`/^\d+$/.test(number)`**
   - `^` → mulai dari awal string
   - `\d+` → satu atau lebih digit angka
   - `$` → sampai akhir string
   - Artinya: **seluruh string harus terdiri dari digit saja**
   - Contoh:
   ```javascript
   /^\d+$/.test('123')    // true  ✅ → hanya digit
   /^\d+$/.test('  1  ')  // false ❌ → ada spasi
   /^\d+$/.test('1abc')   // false ❌ → ada huruf
   /^\d+$/.test('')       // false ❌ → string kosong
   ```

#### 🔴 Cek Range 0–255:

5. **`Number(number) >= 0 && Number(number) <= 255`**
   - `Number()` mengkonversi string ke number
   - Cek apakah nilainya dalam range yang valid
   - Contoh:
   ```javascript
   Number('122') >= 0 && Number('122') <= 255 // true  ✅
   Number('256') >= 0 && Number('256') <= 255 // false ❌
   ```

### **Visualisasi untuk `str = '122.164.23.21'`:**

```
split('.') → ['122', '164', '23', '21']
length = 4 → lolos ✅

.every() iterasi satu per satu:

─────────────────────────────────────────────
number = '122'
  Leading zero? '1' !== '0' → tidak ✅
  /^\d+$/.test('122') → true ✅
  Number('122') >= 0 && <= 255 → true ✅ → masuk
─────────────────────────────────────────────
number = '164'
  Leading zero? '1' !== '0' → tidak ✅
  /^\d+$/.test('164') → true ✅
  Number('164') >= 0 && <= 255 → true ✅ → masuk
─────────────────────────────────────────────
number = '23'
  Leading zero? '2' !== '0' → tidak ✅
  /^\d+$/.test('23') → true ✅
  Number('23') >= 0 && <= 255 → true ✅ → masuk
─────────────────────────────────────────────
number = '21'
  Leading zero? '2' !== '0' → tidak ✅
  /^\d+$/.test('21') → true ✅
  Number('21') >= 0 && <= 255 → true ✅ → masuk
─────────────────────────────────────────────

Semua lolos → every() return true ✅
Hasil: true ✅
```

### **Keywords:**
- 🔵 **`.split('.')`** — memecah string menjadi array berdasarkan titik
- 🟡 **`length !== 4`** — memastikan tepat 4 segmen
- 🟠 **`number[0] === '0' && number.length > 1`** — mendeteksi leading zero
- 🟢 **`/^\d+$/`** — regex untuk memastikan hanya digit murni
- 🔴 **`Number()`** — konversi string ke number untuk perbandingan range
- 🔄 **`.every()`** — semua segmen harus lolos semua pengecekan

### **Kapan Pakai:**
- ✅ Ingin setiap langkah validasi terlihat jelas dan eksplisit
- ✅ Mudah di-debug karena setiap kondisi terpisah
- ✅ Cocok untuk pemahaman mendalam tentang validasi string

### **Pitfalls (Jebakan Umum):**

**1) ❌ Pakai `> 4` bukan `!== 4` untuk cek panjang**
```javascript
// ❌ SALAH — saya pakai ini di awal, '1.2.3' (length 3) lolos!
if (formatted.length > 4) return false;

// ✅ BENAR — tepat 4, tidak boleh kurang tidak boleh lebih
if (formatted.length !== 4) return false;
```

**2) ❌ Tidak konversi string ke Number saat perbandingan**
```javascript
// ❌ SALAH — saya lupa ini di awal, '999' dibandingkan sebagai string
number >= 0 && number <= 255
// '999' >= 0 → true (JavaScript coerce string ke number)
// tapi '  1  ' >= 0 → juga true! tidak aman

// ✅ BENAR — konversi eksplisit dulu
Number(number) >= 0 && Number(number) <= 255
```

**3) ❌ Lupa `return` di dalam `if` block**
```javascript
// ❌ SALAH — saya pernah lupa return, hasilnya selalu false!
if (/^\d+$/.test(number)) {
  Number(number) >= 0 && Number(number) <= 255; // dihitung tapi tidak di-return!
}

// ✅ BENAR — harus di-return
if (/^\d+$/.test(number)) {
  return Number(number) >= 0 && Number(number) <= 255;
}
```

**4) ❌ Tidak ada `return false` di luar `if` block**
```javascript
// ❌ SALAH — saya pernah buat ini, kalau regex gagal return undefined
// every() menganggap undefined sebagai false, tapi tidak eksplisit
if (/^\d+$/.test(number)) {
  return Number(number) >= 0 && Number(number) <= 255;
}
// tidak ada return di sini → return undefined secara implisit

// ✅ BENAR — eksplisit
if (/^\d+$/.test(number)) {
  return Number(number) >= 0 && Number(number) <= 255;
}
return false; // kalau tidak lolos regex, langsung false
```

**5) ❌ Tidak mendeteksi leading zero**
```javascript
// ❌ SALAH — '045' lolos padahal tidak valid di IPv4
formatted.every((number) => {
  if (/^\d+$/.test(number)) {
    return Number(number) >= 0 && Number(number) <= 255;
  }
  return false;
});

// ✅ BENAR — cek leading zero dulu sebelum yang lain
if (number[0] === '0' && number.length > 1) return false;
```

### **💡 Insight Penting:**

> **Kenapa `number[0] === '0' && number.length > 1` bisa mendeteksi leading zero?**
> Karena leading zero artinya string diawali `'0'` tapi panjangnya lebih dari 1. `'045'` → karakter pertama `'0'` dan panjang `3` → leading zero. Tapi `'0'` → karakter pertama `'0'` tapi panjang `1` → ini angka nol murni yang valid di IPv4.

> **Kenapa perlu regex `/^\d+$/` padahal sudah ada `Number()`?**
> Karena `Number('  1  ') = 1` — JavaScript mengabaikan spasi saat konversi. Regex `/^\d+$/` lebih ketat: hanya lolos jika seluruh string dari awal sampai akhir terdiri dari digit saja. Tanpa regex, input dengan spasi akan lolos.

---

═══════════════════════════════════════════════════════════════════════

# ⚡ VERSI 2: parseInt + toString (Referensi)

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Ringkas%20%7C%20Elegan-blue?style=flat-square)
![Style](https://img.shields.io/badge/Style-Declarative-9cf?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
const isValidIPv4 = (input) => {
  const octets = input.split('.');
  if (octets.length !== 4) {
    return false;
  }
  return octets.every((octet) => {
    const num = parseInt(octet);
    return num >= 0 && num <= 255 && octet === num.toString();
  });
};
```

</details>

### **Konsep Inti:**
```
Split string by '.' → array of octets
Cek panjang array === 4, jika tidak → return false
Untuk setiap octet di dalam every():
  Parse octet ke integer → simpan ke num
  Cek tiga kondisi sekaligus:
    num >= 0           → nilai tidak negatif
    num <= 255         → nilai tidak melebihi batas
    octet === num.toString() → string asli harus sama persis dengan num yang dikonversi balik
Return hasil every()
```

### **Step-by-Step (Detail):**

#### 🔵 Split String:

1. **`input.split('.')`**
   - Sama dengan Versi 1 — memecah string berdasarkan titik
   - `'122.164.23.21'` → `['122', '164', '23', '21']`

#### 🟡 Cek Jumlah Segmen:

2. **`if (octets.length !== 4) return false`**
   - Sama dengan Versi 1 — tepat 4 segmen

#### 🟢 Satu Kondisi untuk Semua Validasi:

3. **`num >= 0 && num <= 255 && octet === num.toString()`**
   - Ini bagian paling elegan dari solusi ini!
   - `parseInt(octet)` → parse string ke integer, mengabaikan karakter non-digit di akhir
   - `num.toString()` → konversi balik ke string
   - `octet === num.toString()` → bandingkan string asli dengan hasil konversi balik
   - Kenapa ini cerdas? Karena satu kondisi ini menangani SEMUA kasus:
   ```javascript
   // Leading zero
   octet = '045' → parseInt('045') = 45 → '45'.toString() = '45'
   '045' === '45' → false ❌ → leading zero terdeteksi!

   // Spasi
   octet = '  1  ' → parseInt('  1  ') = 1 → '1'.toString() = '1'
   '  1  ' === '1' → false ❌ → spasi terdeteksi!

   // Huruf di akhir
   octet = '1abc' → parseInt('1abc') = 1 → '1'.toString() = '1'
   '1abc' === '1' → false ❌ → huruf terdeteksi!

   // String non-angka
   octet = 'abc' → parseInt('abc') = NaN → NaN.toString() = 'NaN'
   'abc' === 'NaN' → false ❌ → non-angka terdeteksi!

   // Valid
   octet = '122' → parseInt('122') = 122 → (122).toString() = '122'
   '122' === '122' → true ✅
   ```

### **Visualisasi untuk `str = '123.045.67.89'`:**

```
split('.') → ['123', '045', '67', '89']
length = 4 → lolos ✅

.every() iterasi satu per satu:

─────────────────────────────────────────────
octet = '123'
  parseInt('123') = 123
  123 >= 0 ✅ && 123 <= 255 ✅
  '123' === (123).toString() → '123' === '123' → true ✅ → masuk
─────────────────────────────────────────────
octet = '045'
  parseInt('045') = 45
  45 >= 0 ✅ && 45 <= 255 ✅
  '045' === (45).toString() → '045' === '45' → false ❌ → STOP!
─────────────────────────────────────────────

every() berhenti di '045' → return false
Hasil: false ✅ (leading zero terdeteksi!)
```

### **Keywords:**
- 🔵 **`.split('.')`** — memecah string menjadi array berdasarkan titik
- 🟡 **`length !== 4`** — memastikan tepat 4 segmen
- 🟢 **`parseInt()`** — parse string ke integer
- ⚖️ **`octet === num.toString()`** — trick elegan untuk deteksi semua kasus sekaligus
- 🔄 **`.every()`** — semua segmen harus lolos semua pengecekan

### **Kapan Pakai:**
- ✅ Ingin solusi yang paling ringkas dan elegan
- ✅ Satu kondisi `octet === num.toString()` menangani semua edge case
- ✅ Referensi solusi resmi

### **Pitfalls (Jebakan Umum):**

**1) ❌ Pakai `==` bukan `===` untuk perbandingan string**
```javascript
// ❌ HINDARI — loose equality bisa memberi hasil tak terduga
octet == num.toString()

// ✅ BENAR — strict equality untuk perbandingan string
octet === num.toString()
```

**2) ❌ Tidak menyimpan parseInt ke variabel — memanggil dua kali**
```javascript
// ❌ TIDAK EFISIEN — parseInt dipanggil dua kali
return parseInt(octet) >= 0 && parseInt(octet) <= 255 && octet === parseInt(octet).toString();

// ✅ LEBIH BAIK — simpan ke variabel dulu
const num = parseInt(octet);
return num >= 0 && num <= 255 && octet === num.toString();
```

**3) ❌ Lupa kondisi `octet === num.toString()` — leading zero lolos**
```javascript
// ❌ SALAH — '045' akan lolos karena parseInt('045') = 45 yang valid
const num = parseInt(octet);
return num >= 0 && num <= 255;

// ✅ BENAR — tambahkan perbandingan balik ke string
return num >= 0 && num <= 255 && octet === num.toString();
```

### **💡 Insight Penting:**

> **Kenapa `octet === num.toString()` adalah trick yang cerdas?**
> `parseInt()` selalu menghasilkan integer "bersih" — tanpa leading zero, tanpa spasi, tanpa huruf. Dengan mengkonversi balik ke string (`num.toString()`) dan membandingkan dengan string aslinya (`octet`), kita bisa langsung tahu apakah input-nya sudah "bersih" sejak awal. Kalau tidak sama persis, berarti ada sesuatu yang janggal di input — entah leading zero, spasi, atau karakter lain.

> **Apa bedanya `parseInt` vs `Number` untuk kasus ini?**
> `Number('1abc') = NaN` — langsung gagal. `parseInt('1abc') = 1` — mengambil angka di depan dan mengabaikan huruf. Justru karena `parseInt` lebih "permisif" inilah trick `octet === num.toString()` bisa bekerja: `'1abc' !== '1'` → terdeteksi!

---

═══════════════════════════════════════════════════════════════════════

# 🐛 KESALAHAN SAYA SELAMA PROSES

═══════════════════════════════════════════════════════════════════════

> Bagian ini berisi catatan kesalahan nyata yang saya buat selama mengerjakan challenge ini. Tujuannya agar tidak terulang lagi.

---

### **Kesalahan #1 — Pakai `> 4` bukan `!== 4`**

```javascript
// ❌ Kode saya yang salah
if (formatted.length > 4) return false;
```

**Apa yang terjadi:**
`isValidIPv4('1.2.3')` harusnya `false`, tapi hasilnya `true` karena `3 > 4` adalah `false` sehingga tidak di-reject.

**Pelajaran:** Jumlah segmen harus tepat 4 — gunakan `!== 4`.

---

### **Kesalahan #2 — Tidak sadar bahwa elemen hasil `.split()` adalah string**

```javascript
// ❌ Kode saya yang salah
const isValid = formatted.every((number) => number >= 0 && number <= 255);
```

**Apa yang terjadi:**
JavaScript membandingkan string dengan number secara implisit. `'999' <= 255` menghasilkan `false` (benar kebetulan), tapi `'  1  ' >= 0` menghasilkan `true` (lolos padahal ada spasi). Saya tidak sadar ini bermasalah sampai dites dengan input spasi.

**Pelajaran:** Selalu sadar tipe data. Hasil `.split()` adalah array of **string**, bukan number.

---

### **Kesalahan #3 — Lupa `return` di dalam `if` block**

```javascript
// ❌ Kode saya yang salah
if (/^\d+$/.test(number)) {
  Number(number) >= 0 && Number(number) <= 255; // tidak di-return!
}
```

**Apa yang terjadi:**
Ekspresi dihitung tapi hasilnya dibuang begitu saja. Fungsi arrow tidak punya return statement, sehingga selalu return `undefined`, dan `every()` menganggap semua elemen `false`.

**Pelajaran:** Ekspresi di dalam block `{}` harus di-`return` secara eksplisit.

---

### **Kesalahan #4 — `return false` di luar `if` selalu dijalankan**

```javascript
// ❌ Kode saya yang salah
if (/^\d+$/.test(number)) {
  return Number(number) >= 0 && Number(number) <= 255;
}

return false; // ini dijalankan SETELAH if, bukan hanya kalau if gagal
```

**Apa yang terjadi:**
Saya salah paham — saya pikir `return false` hanya dijalankan kalau `if` tidak masuk. Padahal kalau `if` masuk dan sudah `return`, `return false` di bawahnya memang tidak dijalankan. Ini sebenarnya sudah benar, tapi saya sempat bingung kenapa hasilnya masih `false` semua. Ternyata masalahnya ada di Kesalahan #3 — bukan di sini.

**Pelajaran:** Pahami flow `return` di dalam fungsi. Setelah `return` dieksekusi, baris berikutnya di fungsi yang sama tidak akan dijalankan.

---

### **Kesalahan #5 — Tidak mendeteksi leading zero**

```javascript
// ❌ Kode saya yang salah (sebelum mengetahui test case leading zero)
const isValidIPv4 = (str) => {
  const formatted = str.split('.');
  if (formatted.length !== 4) return false;
  const isValid = formatted.every((number) => {
    if (/^\d+$/.test(number)) {
      return Number(number) >= 0 && Number(number) <= 255;
    }
    return false;
  });
  return isValid;
};
```

**Apa yang terjadi:**
`isValidIPv4('123.045.067.089')` harusnya `false`, tapi hasilnya `true`. `'045'` lolos regex `/^\d+$/` karena memang hanya digit, dan `Number('045') = 45` yang valid dalam range 0–255.

**Pelajaran:** IPv4 tidak mengizinkan leading zero. `045` berbeda dengan `45` — `045` bisa diinterpretasikan sebagai oktal di beberapa sistem. Selalu cek karakter pertama: `number[0] === '0' && number.length > 1`.

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
const testCases = [
  {
    input: '1.2.3.4',
    expected: true,
    desc: "Normal case — IPv4 sederhana"
  },
  {
    input: '123.45.67.89',
    expected: true,
    desc: "Normal case — angka besar tapi valid"
  },
  {
    input: '1.2.3',
    expected: false,
    desc: "Edge case — hanya 3 segmen"
  },
  {
    input: '1.2.3.4.5',
    expected: false,
    desc: "Edge case — 5 segmen"
  },
  {
    input: '123.456.78.90',
    expected: false,
    desc: "Edge case — segmen melebihi 255"
  },
  {
    input: '123.045.067.089',
    expected: false,
    desc: "Edge case — leading zero"
  },
  {
    input: '  1.2.3.4  ',
    expected: false,
    desc: "Edge case — ada spasi"
  },
  {
    input: 'abc.def.ghi.jkl',
    expected: false,
    desc: "Edge case — bukan angka sama sekali"
  }
]

testCases.forEach(({ input, expected, desc }, index) => {
  const result = isValidIPv4(input)
  const pass = result === expected
  const status = pass ? '✅ PASS' : '❌ FAIL'

  console.log(`Test Case #${index + 1}: ${status} - ${desc}`)
  console.log(`  isValidIPv4('${input}') → ${result}`)

  if (!pass) {
    console.log(`  Expected: ${expected}`)
    console.log(`  Result  : ${result}`)
  }
})
```

**Output yang diharapkan:**
```
Test Case #1: ✅ PASS - Normal case — IPv4 sederhana
  isValidIPv4('1.2.3.4') → true
Test Case #2: ✅ PASS - Normal case — angka besar tapi valid
  isValidIPv4('123.45.67.89') → true
Test Case #3: ✅ PASS - Edge case — hanya 3 segmen
  isValidIPv4('1.2.3') → false
Test Case #4: ✅ PASS - Edge case — 5 segmen
  isValidIPv4('1.2.3.4.5') → false
Test Case #5: ✅ PASS - Edge case — segmen melebihi 255
  isValidIPv4('123.456.78.90') → false
Test Case #6: ✅ PASS - Edge case — leading zero
  isValidIPv4('123.045.067.089') → false
Test Case #7: ✅ PASS - Edge case — ada spasi
  isValidIPv4('  1.2.3.4  ') → false
Test Case #8: ✅ PASS - Edge case — bukan angka sama sekali
  isValidIPv4('abc.def.ghi.jkl') → false
```

---

═══════════════════════════════════════════════════════════════════════

# 📊 PERBANDINGAN LENGKAP

═══════════════════════════════════════════════════════════════════════

| Aspek | ✅ Versi 1 (Regex + Leading Zero) | ⚡ Versi 2 (parseInt + toString) |
|-------|:---------------------------------:|:--------------------------------:|
| Panjang kode | ~10 baris | ~7 baris |
| Variabel tambahan | Tidak ada | `const num` |
| Deteksi leading zero | Eksplisit `number[0] === '0'` | Implisit via `octet === num.toString()` |
| Deteksi spasi/huruf | Regex `/^\d+$/` | Implisit via `octet === num.toString()` |
| Keterbacaan | ✅ Setiap langkah jelas | ✅ Lebih ringkas tapi perlu dipahami tricknya |
| Performa | Sama | Sama |
| Hasil | Sama ✅ | Sama ✅ |

---

## 🔑 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────────┐
│  💡 Hasil .split() adalah Array of String, bukan Number             │
│     Selalu sadar tipe data saat melakukan perbandingan              │
├─────────────────────────────────────────────────────────────────────┤
│  💡 IPv4 Valid = 4 Segmen, Digit Murni, 0–255, Tanpa Leading Zero   │
│     Setiap kondisi harus dicek secara eksplisit atau implisit       │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Regex /^\d+$/ adalah Cara Ketat untuk Validasi Digit            │
│     Number() dan parseInt() terlalu permisif untuk spasi            │
├─────────────────────────────────────────────────────────────────────┤
│  💡 octet === num.toString() adalah Trick Satu Kondisi untuk Semua  │
│     Leading zero, spasi, huruf — semuanya terdeteksi sekaligus      │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Selalu Return Secara Eksplisit di dalam Block {}                │
│     Ekspresi tanpa return dibuang — tidak mempengaruhi output       │
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Versi | Highlight |
|-------|-----------|
| ✅ **Versi 1 (Regex + Leading Zero)** | `number[0] === '0' && number.length > 1` + `/^\d+$/.test(number)` |
| ⚡ **Versi 2 (parseInt + toString)** | `const num = parseInt(octet)` → `octet === num.toString()` |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
