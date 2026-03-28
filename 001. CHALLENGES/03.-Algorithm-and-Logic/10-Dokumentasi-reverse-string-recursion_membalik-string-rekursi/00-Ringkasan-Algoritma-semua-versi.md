# 📋 reverseString — Ringkasan Algoritma Semua Versi

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║          📋 RINGKASAN ALGORITMA — COMPLETE REFERENCE 📋                 ║
║          slice() · Index Parameter · charAt() · Perbandingan             ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![Estimated Time](https://img.shields.io/badge/Estimated%20Time-30%20minutes-blue?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-JavaScript-f7df1e?style=for-the-badge&logo=javascript&logoColor=black)
![Versi](https://img.shields.io/badge/Versi-3%20Solusi-success?style=for-the-badge)

---

## 🎯 Tujuan

- ✅ Ringkasan challenge dan kriteria dalam satu tempat
- ✅ Ringkasan algoritma semua versi secara detail
- ✅ Quick reference untuk review atau ujian

---

## 🧭 Quick Jump

| 🧩 Challenge | ⭐ Versi 1 | 🔵 Versi 2 | 🟢 Versi 3 | 🧪 Test Cases | 📊 Perbandingan |
|:------------:|:---------:|:---------:|:---------:|:-------------:|:---------------:|
| [Jump](#-deskripsi-challenge) | [Jump](#-versi-1-rekursi--slice---recommended) | [Jump](#-versi-2-rekursi--index-parameter) | [Jump](#-versi-3-rekursi--charat) | [Jump](#-test-cases-lengkap) | [Jump](#-perbandingan-lengkap) |

---

# 🧩 DESKRIPSI CHALLENGE

## 📋 Soal

> ### 📋 Deskripsi
>
> Diberikan sebuah function **`reverseString(str)`** yang menerima satu parameter:
>
> | Parameter | Tipe | Keterangan |
> |-----------|------|------------|
> | `str` | `string` | String yang akan dibalik urutan karakternya |
>
> Implementasikan function **`reverseString`** untuk mengembalikan **versi terbalik dari string** yang diberikan. Wajib menggunakan **rekursi** dalam solusinya.

---

## 🔍 Kriteria

> **1.** Jika `str` kosong (`""`)
> → return string kosong `""`
>
> **2.** Balik urutan karakter dari belakang ke depan
>
> **3.** Wajib menggunakan **rekursi** — tidak boleh pakai loop atau `.reverse()`
>
> **4.** Output berupa string terbalik dengan tipe yang sama

---

## 📊 Contoh-contoh

### Output yang Diharapkan

```javascript
// ✅ Edge case — string kosong
reverseString('')
// → ''
```

```javascript
// ✅ Edge case — satu karakter
reverseString('a')
// → 'a'
```

```javascript
// ✅ Normal case — kata biasa
reverseString('hello')
// → 'olleh'

reverseString('world')
// → 'dlrow'
```

```javascript
// ✅ Palindrome — hasil sama dengan input
reverseString('racecar')
// → 'racecar'
```

```javascript
// ✅ Huruf campuran & angka sebagai string
reverseString('JavaScript')
// → 'tpircSavaJ'

reverseString('12345')
// → '54321'
```

---

### Simulasi Pembalikan: `reverseString("hello")`

```
str = "hello"

Langkah 1: ambil 'o', sisa "hell"
Langkah 2: ambil 'l', sisa "hel"
Langkah 3: ambil 'l', sisa "he"
Langkah 4: ambil 'e', sisa "h"
Langkah 5: ambil 'h', sisa ""
Langkah 6: str kosong → BERHENTI

Kumpulkan dari bawah ke atas:
  '' → 'h' → 'eh' → 'leh' → 'lleh' → 'olleh' ✅
```

---

## ✅ Ringkasan

| Kriteria | Detail |
|----------|--------|
| Parameter | `str` — string yang akan dibalik |
| Output | String terbalik |
| Edge case | String kosong `''` → return `''` |
| Proses utama | Ambil karakter terakhir + rekursi dengan sisa string |
| Wajib | Menggunakan rekursi |

---

> 💡 **Aturan Sederhana:** Setiap panggilan rekursi mengambil satu karakter terakhir dan meletakkannya di depan hasil rekursi berikutnya. Ulangi sampai string habis — base case tercapai saat string kosong.

---

═══════════════════════════════════════════════════════════════════════

# ⭐ VERSI 1: Rekursi + `slice()` — Recommended

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Ringkas%20%7C%20Idiomatis-green?style=flat-square)
![Style](https://img.shields.io/badge/Style-Recursive-orange?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
}
```

</details>

### **Konsep Inti:**
```
Validasi str → jika kosong, return ''
Ambil karakter terakhir dari str      (str.slice(-1))
Gabungkan dengan hasil reverseString  (str tanpa karakter terakhir)
Ulangi sampai str kosong → BASE CASE
```

### **Step-by-Step (Detail):**

#### 🔴 Validasi Awal (Base Case):

1. **`if (!str) return ''`**
   - Cek apakah `str` adalah string kosong `""`
   - `!str` bernilai `true` ketika `str === ""`
   - Langsung return `''` tanpa proses apapun
   - Disebut **base case** — titik berhenti rekursi agar tidak infinite loop
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
   //^^^^^^^^^^^^^^^^^^^^^^^^^
   //  str = "" → stop!
     return str.slice(-1) + reverseString(str.slice(0, -1))
   }
   ```

#### 🔵 Recursive Case:

2. **`str.slice(-1)` — ambil karakter terakhir**
   - Index `-1` artinya hitung dari belakang
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.slice(-1) + reverseString(str.slice(0, -1))
   //         ^^^^^^^^^^^
   //         "hello".slice(-1) → 'o'
   }
   ```

3. **`str.slice(0, -1)` — ambil string tanpa karakter terakhir**
   - Dari index `0` sampai sebelum index terakhir
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.slice(-1) + reverseString(str.slice(0, -1))
   //                                     ^^^^^^^^^^^^^^^^
   //                                     "hello".slice(0,-1) → "hell"
   }
   ```

4. **`reverseString(str.slice(0, -1))` — panggil diri sendiri dengan string lebih pendek**
   - Setiap panggilan membuat `str` semakin pendek hingga akhirnya kosong
   - Saat kosong → base case tercapai → rekursi berhenti
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.slice(-1) + reverseString(str.slice(0, -1))
   //                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   //                       panggil lagi dengan "hell", "hel", dst...
   }
   ```

5. **`return str.slice(-1) + reverseString(...)` — gabungkan dan kembalikan**
   - Karakter terakhir diletakkan di **depan** hasil rekursi berikutnya
   - Posisi di depan inilah yang membuat string terbalik
   - Hasil dikumpulkan dari bawah ke atas (fase naik)
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.slice(-1) + reverseString(str.slice(0, -1))
   // ^^^^^^
   // kembalikan hasil gabungan ke panggilan sebelumnya
   }
   ```

### **Visualisasi untuk `"hello"`:**

```
str = "hello"

─────────────────────────────────────────────
FASE TURUN — memecah string satu karakter per panggilan
─────────────────────────────────────────────
Panggilan 1 → str = "hello"  slice(-1) = 'o'  kirim "hell"
Panggilan 2 → str = "hell"   slice(-1) = 'l'  kirim "hel"
Panggilan 3 → str = "hel"    slice(-1) = 'l'  kirim "he"
Panggilan 4 → str = "he"     slice(-1) = 'e'  kirim "h"
Panggilan 5 → str = "h"      slice(-1) = 'h'  kirim ""
Panggilan 6 → str = ""       → BASE CASE → return ''

─────────────────────────────────────────────
FASE NAIK — mengumpulkan hasil dari bawah ke atas
─────────────────────────────────────────────
Panggilan 6 → return ''
Panggilan 5 → 'h' + ''      = 'h'
Panggilan 4 → 'e' + 'h'     = 'eh'
Panggilan 3 → 'l' + 'eh'    = 'leh'
Panggilan 2 → 'l' + 'leh'   = 'lleh'
Panggilan 1 → 'o' + 'lleh'  = 'olleh' ✅

return 'olleh' ✅
```

### **Tabel Iterasi:**

| Panggilan ke- | `str` masuk | `slice(-1)` | `slice(0,-1)` dikirim | Return |
|:---:|---|:---:|---|---|
| 1 | `"hello"` | `'o'` | `"hell"` | `'o' + ...` |
| 2 | `"hell"`  | `'l'` | `"hel"`  | `'l' + ...` |
| 3 | `"hel"`   | `'l'` | `"he"`   | `'l' + ...` |
| 4 | `"he"`    | `'e'` | `"h"`    | `'e' + ...` |
| 5 | `"h"`     | `'h'` | `""`     | `'h' + ...` |
| 6 | `""`      | —     | —        | `''` ← base case |

### **Keywords:**
- 🛑 **Base Case** — `if (!str) return ''` titik berhenti rekursi
- 📉 **Fase Turun** — fungsi terus memanggil dirinya, string makin pendek
- 📈 **Fase Naik** — hasil dikembalikan dari panggilan terdalam ke atas
- ✂️ **`slice(-1)`** — mengambil karakter terakhir dengan index negatif
- ✂️ **`slice(0,-1)`** — mengambil seluruh string kecuali karakter terakhir

### **Kapan Pakai:**
- ✅ Ingin kode paling ringkas dan idiomatis
- ✅ Tidak ingin parameter tambahan — pemanggilan tetap bersih
- ✅ Familiar dengan index negatif di JavaScript
- ✅ Default pilihan untuk production code

### **Pitfalls (Jebakan Umum):**

**1) ❌ Posisi `slice(-1)` di belakang**
```javascript
// ❌ SALAH — karakter terakhir di belakang → string tidak terbalik
return reverseString(str.slice(0, -1)) + str.slice(-1)
// reverseString("hello") → "hello" bukan "olleh"

// ✅ BENAR — karakter terakhir di depan
return str.slice(-1) + reverseString(str.slice(0, -1))
// reverseString("hello") → "olleh" ✅
```

**2) ❌ Tidak ada base case**
```javascript
// ❌ SALAH — Maximum call stack exceeded
const reverseString = (str) => {
  return str.slice(-1) + reverseString(str.slice(0, -1))
}

// ✅ BENAR
const reverseString = (str) => {
  if (!str) return ''
  return str.slice(-1) + reverseString(str.slice(0, -1))
}
```

**3) ❌ Memanggil rekursi dengan `str` yang sama**
```javascript
// ❌ SALAH — str tidak dipotong → infinite loop
return str.slice(-1) + reverseString(str)

// ✅ BENAR — kirim str yang sudah dipotong
return str.slice(-1) + reverseString(str.slice(0, -1))
```

### **💡 Insight Penting:**

> **Kenapa `slice(-1)` harus di depan?**
> Karena hasil rekursi baru tersedia di fase naik (dari bawah ke atas). Karakter yang diambil paling awal (`'o'` dari `"hello"`) harus menjadi yang paling depan di hasil akhir. Dengan meletakkan `slice(-1)` di depan, setiap karakter otomatis tersusun dalam urutan terbalik.

> **Kenapa `str` tidak berubah tapi setiap panggilan berbeda?**
> Karena `str.slice(0, -1)` menghasilkan **string baru** yang dikirim sebagai argumen ke panggilan berikutnya. Setiap panggilan rekursi punya variabel `str`-nya sendiri di memory — bukan mengubah `str` yang sama.

> **Kenapa ini solusi paling direkomendasikan?**
> Karena paling ringkas, tidak butuh parameter tambahan, dan menggunakan `slice()` dengan index negatif yang idiomatis di JavaScript. Mudah dibaca dan mudah dipahami polanya.

---

═══════════════════════════════════════════════════════════════════════

# 🔵 VERSI 2: Rekursi + Index Parameter

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Tanpa%20String%20Baru-blue?style=flat-square)
![Style](https://img.shields.io/badge/Style-Recursive%20%2B%20Index-9cf?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-✅%20Yes-success?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
const reverseString = (str, index = str.length - 1) => {
  if (index < 0) return ''
  return str[index] + reverseString(str, index - 1)
}
```

</details>

### **Konsep Inti:**
```
Siapkan index = posisi karakter terakhir (str.length - 1)
Validasi index → jika index < 0, return ''
Ambil karakter di posisi index          (str[index])
Gabungkan dengan hasil reverseString    (str yang sama, index - 1)
Ulangi sampai index < 0 → BASE CASE
```

### **Step-by-Step (Detail):**

#### 🔴 Validasi Awal (Base Case):

1. **`index = str.length - 1` — default parameter**
   - Saat pertama dipanggil, `index` otomatis menunjuk ke karakter terakhir
   - Contoh: `"hello".length - 1` → `4` (index karakter `'o'`)
   ```javascript
   const reverseString = (str, index = str.length - 1) => {
   //                          ^^^^^^^^^^^^^^^^^^^^^^^
   //                          "hello" → index mulai dari 4
     if (index < 0) return ''
     return str[index] + reverseString(str, index - 1)
   }
   ```

2. **`if (index < 0) return ''`**
   - Rekursi berhenti ketika `index` sudah melewati karakter pertama
   - `index < 0` artinya semua karakter sudah diambil
   ```javascript
   const reverseString = (str, index = str.length - 1) => {
     if (index < 0) return ''
   //^^^^^^^^^^^^^^^^^^^^^^^^^
   //  index = -1 → sudah habis → stop!
     return str[index] + reverseString(str, index - 1)
   }
   ```

#### 🔵 Recursive Case:

3. **`str[index]` — ambil karakter di posisi index**
   - Mengambil karakter berdasarkan posisi index saat ini
   - Index dimulai dari akhir string, mundur satu per satu
   ```javascript
   const reverseString = (str, index = str.length - 1) => {
     if (index < 0) return ''
     return str[index] + reverseString(str, index - 1)
   //        ^^^^^^^^^
   //        str[4] = 'o', str[3] = 'l', dst...
   }
   ```

4. **`reverseString(str, index - 1)` — panggil ulang dengan index mundur**
   - `str` tetap sama — tidak dipotong seperti solusi utama
   - Hanya `index` yang berubah, mundur 1 setiap panggilan
   ```javascript
   const reverseString = (str, index = str.length - 1) => {
     if (index < 0) return ''
     return str[index] + reverseString(str, index - 1)
   //                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   //                    kirim str yang sama, index mundur: 4→3→2→1→0→-1
   }
   ```

5. **`return str[index] + reverseString(...)` — gabungkan dan kembalikan**
   - Karakter di posisi `index` diletakkan di **depan** hasil rekursi berikutnya
   - Hasil dikumpulkan dari bawah ke atas (fase naik)
   ```javascript
   const reverseString = (str, index = str.length - 1) => {
     if (index < 0) return ''
     return str[index] + reverseString(str, index - 1)
   // ^^^^^^
   // kembalikan hasil gabungan ke panggilan sebelumnya
   }
   ```

### **Visualisasi untuk `"hello"`:**

```
str = "hello", index mulai dari 4

─────────────────────────────────────────────
FASE TURUN — index mundur satu per satu
─────────────────────────────────────────────
Panggilan 1 → index = 4  str[4] = 'o'  kirim index 3
Panggilan 2 → index = 3  str[3] = 'l'  kirim index 2
Panggilan 3 → index = 2  str[2] = 'l'  kirim index 1
Panggilan 4 → index = 1  str[1] = 'e'  kirim index 0
Panggilan 5 → index = 0  str[0] = 'h'  kirim index -1
Panggilan 6 → index = -1 → BASE CASE → return ''

─────────────────────────────────────────────
FASE NAIK — mengumpulkan hasil dari bawah ke atas
─────────────────────────────────────────────
Panggilan 6 → return ''
Panggilan 5 → 'h' + ''      = 'h'
Panggilan 4 → 'e' + 'h'     = 'eh'
Panggilan 3 → 'l' + 'eh'    = 'leh'
Panggilan 2 → 'l' + 'leh'   = 'lleh'
Panggilan 1 → 'o' + 'lleh'  = 'olleh' ✅

return 'olleh' ✅
```

### **Tabel Iterasi:**

| Panggilan ke- | `index` | `str[index]` | `index - 1` dikirim | Return |
|:---:|:---:|:---:|:---:|---|
| 1 | `4` | `'o'` | `3` | `'o' + ...` |
| 2 | `3` | `'l'` | `2` | `'l' + ...` |
| 3 | `2` | `'l'` | `1` | `'l' + ...` |
| 4 | `1` | `'e'` | `0` | `'e' + ...` |
| 5 | `0` | `'h'` | `-1` | `'h' + ...` |
| 6 | `-1` | — | — | `''` ← base case |

### **Keywords:**
- 🛑 **Base Case** — `if (index < 0) return ''` titik berhenti rekursi
- 🔢 **Default Parameter** — `index = str.length - 1` nilai otomatis jika tidak diisi
- 📌 **`str[index]`** — mengakses karakter string berdasarkan posisi index
- 📉 **Fase Turun** — index terus mundur dari akhir ke awal string
- 📈 **Fase Naik** — hasil dikembalikan dari panggilan terdalam ke atas

### **Kapan Pakai:**
- ✅ Ingin menghindari pembuatan string baru setiap panggilan
- ✅ Pendekatan yang mirip loop tradisional dengan index
- ✅ String sangat panjang — lebih hemat karena `str` tidak disalin
- ✅ Ingin eksplorasi penggunaan default parameter

### **Pitfalls (Jebakan Umum):**

**1) ❌ Base case salah — `index === 0` bukan `index < 0`**
```javascript
// ❌ SALAH — karakter index 0 tidak ikut!
if (index === 0) return ''
// reverseString("hello") → "olle" bukan "olleh"

// ✅ BENAR
if (index < 0) return ''
// reverseString("hello") → "olleh" ✅
```

**2) ❌ Lupa `index - 1` — index tidak mundur**
```javascript
// ❌ SALAH — index tidak berubah → infinite loop
return str[index] + reverseString(str, index)

// ✅ BENAR
return str[index] + reverseString(str, index - 1)
```

**3) ❌ Memanggil fungsi dengan index manual dari luar**
```javascript
// ❌ TIDAK IDEAL — pemanggil harus tahu detail implementasi
reverseString("hello", 4)

// ✅ BENAR — default parameter menangani ini otomatis
reverseString("hello")
```

### **💡 Insight Penting:**

> **Apa bedanya dengan solusi utama?**
> Solusi utama memotong `str` menjadi lebih pendek setiap panggilan dengan `slice(0, -1)` — membuat string baru di setiap rekursi. Alternatif ini tidak mengubah `str` sama sekali — hanya `index` yang mundur. Keduanya menghasilkan hasil yang sama.

> **Kenapa pakai default parameter?**
> Agar pemanggil tidak perlu tahu bahwa fungsi ini butuh `index`. Cukup panggil `reverseString("hello")` dan `index` otomatis dimulai dari posisi terakhir. Ini menjaga antarmuka fungsi tetap bersih dan sederhana dari luar.

> **Kapan pendekatan index ini lebih berguna?**
> Ketika kamu ingin menghindari pembuatan string baru di setiap panggilan. `str.slice(0, -1)` membuat string baru setiap rekursi, sedangkan `str[index]` hanya membaca dari string yang sama tanpa membuat salinan baru — lebih hemat memori untuk string panjang.

---

═══════════════════════════════════════════════════════════════════════

# 🟢 VERSI 3: Rekursi + `charAt()`

═══════════════════════════════════════════════════════════════════════

![Best For](https://img.shields.io/badge/Best%20For-Eksplisit%20%7C%20Pemula-yellowgreen?style=flat-square)
![Style](https://img.shields.io/badge/Style-Verbose%20%7C%20Explicit-yellow?style=flat-square)
![Recommended](https://img.shields.io/badge/Recommended-⚠️%20Learning-yellow?style=flat-square)

### **Code:**

<details>
<summary>Lihat Kode (klik untuk expand)</summary>

```javascript
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}
```

</details>

### **Konsep Inti:**
```
Validasi str → jika kosong, return ''
Ambil karakter terakhir dari str      (str.charAt(str.length - 1))
Gabungkan dengan hasil reverseString  (str tanpa karakter terakhir)
Ulangi sampai str kosong → BASE CASE
```

### **Step-by-Step (Detail):**

#### 🔴 Validasi Awal (Base Case):

1. **`if (!str) return ''`**
   - Cek apakah `str` adalah string kosong `""`
   - `!str` bernilai `true` ketika `str === ""`
   - Langsung return `''` tanpa proses apapun
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
   //^^^^^^^^^^^^^^^^^^^^^^^^^
   //  str = "" → stop!
     return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
   }
   ```

#### 🔵 Recursive Case:

2. **`str.charAt(str.length - 1)` — ambil karakter terakhir**
   - `str.length - 1` = index karakter terakhir
   - `charAt()` mengambil karakter di posisi index tersebut
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
   //        ^^^^^^^^^^^^^^^^^^^^^^^^^^
   //        "hello".charAt(4) → 'o'
   }
   ```

3. **`str.substring(0, str.length - 1)` — ambil string tanpa karakter terakhir**
   - Dari index `0` sampai sebelum index terakhir
   - Contoh: `"hello".substring(0, 4)` → `"hell"`
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
   //                                                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   //                                                   "hello".substring(0, 4) → "hell"
   }
   ```

4. **`reverseString(str.substring(0, str.length - 1))` — panggil ulang dengan string lebih pendek**
   - Setiap panggilan membuat `str` semakin pendek hingga akhirnya kosong
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
   //                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   //                                    panggil lagi dengan "hell", "hel", dst...
   }
   ```

5. **`return str.charAt(...) + reverseString(...)` — gabungkan dan kembalikan**
   - Karakter terakhir diletakkan di **depan** hasil rekursi berikutnya
   ```javascript
   const reverseString = (str) => {
     if (!str) return ''
     return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
   // ^^^^^^
   // kembalikan hasil gabungan ke panggilan sebelumnya
   }
   ```

### **Visualisasi untuk `"hello"`:**

```
str = "hello"

─────────────────────────────────────────────
FASE TURUN — memecah string satu karakter per panggilan
─────────────────────────────────────────────
Panggilan 1 → str = "hello"  charAt(4) = 'o'  kirim "hell"
Panggilan 2 → str = "hell"   charAt(3) = 'l'  kirim "hel"
Panggilan 3 → str = "hel"    charAt(2) = 'l'  kirim "he"
Panggilan 4 → str = "he"     charAt(1) = 'e'  kirim "h"
Panggilan 5 → str = "h"      charAt(0) = 'h'  kirim ""
Panggilan 6 → str = ""       → BASE CASE → return ''

─────────────────────────────────────────────
FASE NAIK — mengumpulkan hasil dari bawah ke atas
─────────────────────────────────────────────
Panggilan 6 → return ''
Panggilan 5 → 'h' + ''      = 'h'
Panggilan 4 → 'e' + 'h'     = 'eh'
Panggilan 3 → 'l' + 'eh'    = 'leh'
Panggilan 2 → 'l' + 'leh'   = 'lleh'
Panggilan 1 → 'o' + 'lleh'  = 'olleh' ✅

return 'olleh' ✅
```

### **Tabel Iterasi:**

| Panggilan ke- | `str` masuk | `charAt(length-1)` | `substring(0, length-1)` dikirim | Return |
|:---:|---|:---:|---|---|
| 1 | `"hello"` | `'o'` | `"hell"` | `'o' + ...` |
| 2 | `"hell"`  | `'l'` | `"hel"`  | `'l' + ...` |
| 3 | `"hel"`   | `'l'` | `"he"`   | `'l' + ...` |
| 4 | `"he"`    | `'e'` | `"h"`    | `'e' + ...` |
| 5 | `"h"`     | `'h'` | `""`     | `'h' + ...` |
| 6 | `""`      | —     | —        | `''` ← base case |

### **Keywords:**
- 🛑 **Base Case** — `if (!str) return ''` titik berhenti rekursi
- 🔤 **`charAt()`** — mengambil karakter string berdasarkan posisi index
- ✂️ **`substring()`** — mengambil bagian string dari index awal sampai sebelum index akhir
- 📉 **Fase Turun** — fungsi terus memanggil dirinya, string makin pendek
- 📈 **Fase Naik** — hasil dikembalikan dari panggilan terdalam ke atas

### **Kapan Pakai:**
- ✅ Baru belajar — `charAt()` lebih eksplisit dari index negatif
- ✅ Ingin kode yang tidak bergantung pada fitur index negatif
- ✅ Sebagai bahan pembelajaran sebelum beralih ke versi ringkas
- ⚠️ Tidak disarankan untuk production — terlalu verbose

### **Pitfalls (Jebakan Umum):**

**1) ❌ Salah hitung index di `charAt()`**
```javascript
// ❌ SALAH — charAt(str.length) selalu return '' → out of bounds
return str.charAt(str.length) + reverseString(str.substring(0, str.length))
//                  ^^^^^^^^^                                    ^^^^^^^^^
//                  harusnya str.length - 1!

// ✅ BENAR
return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
```

**2) ❌ Posisi `charAt()` di belakang**
```javascript
// ❌ SALAH — string tidak terbalik
return reverseString(str.substring(0, str.length - 1)) + str.charAt(str.length - 1)
// reverseString("hello") → "hello" bukan "olleh"

// ✅ BENAR
return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
```

**3) ❌ Tidak ada base case**
```javascript
// ❌ SALAH — Maximum call stack exceeded
const reverseString = (str) => {
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}

// ✅ BENAR
const reverseString = (str) => {
  if (!str) return ''
  return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))
}
```

### **💡 Insight Penting:**

> **Apa bedanya `charAt()` vs `slice(-1)`?**
> Secara hasil keduanya sama — sama-sama mengambil karakter terakhir. Tapi `slice(-1)` lebih ringkas karena mendukung index negatif. `charAt()` harus menghitung `str.length - 1` secara eksplisit, membuatnya lebih verbose tapi lebih mudah dipahami pemula yang belum familiar dengan index negatif.

> **Apa bedanya `substring()` vs `slice()`?**
> Untuk kasus ini hasilnya sama. Perbedaan utamanya: `slice()` mendukung index negatif (`slice(0, -1)`), sedangkan `substring()` tidak — index negatif di `substring()` dianggap `0`. Itulah kenapa `slice()` lebih fleksibel dan lebih sering dipakai di kode modern.

> **Kapan alternatif ini relevan?**
> Alternatif ini berguna sebagai bahan pembelajaran untuk memahami bahwa ada banyak cara mengakses karakter dan memotong string di JavaScript. Untuk kode produksi, solusi utama dengan `slice()` lebih disukai karena lebih ringkas dan idiomatis.

---

═══════════════════════════════════════════════════════════════════════

# 🧪 TEST CASES LENGKAP

═══════════════════════════════════════════════════════════════════════

```javascript
const testCases = [
  {
    input: '',
    expected: '',
    desc: 'Edge case — string kosong'
  },
  {
    input: 'a',
    expected: 'a',
    desc: 'Edge case — satu karakter'
  },
  {
    input: 'hello',
    expected: 'olleh',
    desc: "Normal case — kata 'hello'"
  },
  {
    input: 'world',
    expected: 'dlrow',
    desc: "Normal case — kata 'world'"
  },
  {
    input: 'racecar',
    expected: 'racecar',
    desc: 'Palindrome — hasil sama dengan input'
  },
  {
    input: 'JavaScript',
    expected: 'tpircSavaJ',
    desc: 'Huruf campuran besar & kecil'
  },
  {
    input: '12345',
    expected: '54321',
    desc: 'Angka sebagai string'
  },
  {
    input: 'a b c',
    expected: 'c b a',
    desc: 'String dengan spasi'
  }
]

testCases.forEach(({ input, expected, desc }, index) => {
  const result = reverseString(input)
  const status = result === expected ? '✅ PASS' : '❌ FAIL'

  console.log(`Test Case #${index + 1}: ${status} - ${desc} | reverseString('${input}') = '${result}'`)

  if (status === '❌ FAIL') {
    console.log('Input   :', input)
    console.log('Expected:', expected)
    console.log('Result  :', result)
  }
})
```

**Output yang diharapkan:**
```
Test Case #1: ✅ PASS - Edge case — string kosong
Test Case #2: ✅ PASS - Edge case — satu karakter
Test Case #3: ✅ PASS - Normal case — kata 'hello'
Test Case #4: ✅ PASS - Normal case — kata 'world'
Test Case #5: ✅ PASS - Palindrome — hasil sama dengan input
Test Case #6: ✅ PASS - Huruf campuran besar & kecil
Test Case #7: ✅ PASS - Angka sebagai string
Test Case #8: ✅ PASS - String dengan spasi
```

---

═══════════════════════════════════════════════════════════════════════

# 📊 PERBANDINGAN LENGKAP

═══════════════════════════════════════════════════════════════════════

| Aspek | ⭐ slice() | 🔵 Index Parameter | 🟢 charAt() |
|-------|:---------:|:-----------------:|:-----------:|
| **Jumlah baris logika** | 2 baris | 2 baris | 2 baris |
| **Parameter tambahan** | ❌ Tidak ada | ✅ `index` (default) | ❌ Tidak ada |
| **String baru tiap rekursi** | ✅ Ya | ❌ Tidak | ✅ Ya |
| **Index negatif** | ✅ Dipakai | ❌ Tidak dipakai | ❌ Tidak didukung |
| **Kompleksitas Waktu** | O(n) | O(n) | O(n) |
| **Kompleksitas Memori** | O(n) | O(n) | O(n) |
| **Cocok untuk pemula** | ✅ Ringkas & familiar | ✅ Mirip loop biasa | ✅ Eksplisit & jelas |
| **Untuk production** | ✅ Direkomendasikan | ✅ Bisa dipakai | ⚠️ Terlalu verbose |

> `n` = panjang string yang dibalik

---

## 🎯 Decision Tree

```
Prioritas utama kamu apa?
│
├── RINGKAS / IDIOMATIS
│   │
│   └── Familiar dengan index negatif?  ──▶ ⭐ slice()
│                                             (paling pendek, paling modern)
│
├── HEMAT MEMORI / TANPA STRING BARU
│   │
│   └── Ingin hindari salinan string?   ──▶ 🔵 Index Parameter
│                                             (str tetap sama, hanya index berubah)
│
└── EKSPLISIT / BELAJAR
    │
    └── Baru kenal rekursi?             ──▶ 🟢 charAt()
                                             (semua ditulis eksplisit, mudah dipahami)

Default: ⭐ slice() — paling ringkas dan idiomatis untuk JavaScript ✅
```

---

## 🔑 Key Takeaways

```
┌─────────────────────────────────────────────────────────────────────┐
│  💡 Semua Solusi Menghasilkan Output yang Sama                      │
│     Perbedaan hanya pada pendekatan dan gaya penulisan              │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Base Case Wajib Ada di Setiap Rekursi                           │
│     Tanpa base case → Maximum call stack exceeded                   │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Posisi Karakter Terakhir Harus di Depan                         │
│     slice(-1) + rekursi → terbalik ✅                               │
│     rekursi + slice(-1) → tidak terbalik ❌                         │
├─────────────────────────────────────────────────────────────────────┤
│  💡 str Tidak Diubah — String Baru yang Dikirim                     │
│     slice(0,-1) menghasilkan string baru sebagai argumen            │
│     Setiap panggilan punya str-nya sendiri di memory                │
├─────────────────────────────────────────────────────────────────────┤
│  💡 String Kosong Otomatis Ter-handle oleh Base Case                │
│     !str → true untuk "" → return '' langsung ✅                   │
├─────────────────────────────────────────────────────────────────────┤
│  💡 Pilih Sesuai Konteks                                            │
│     Ringkas → slice()   |   Hemat memori → Index                   │
│     Belajar → charAt()  |   Semua O(n) waktu & O(n) memori         │
└─────────────────────────────────────────────────────────────────────┘
```

---

<div align="center">

## 🎯 Quick Reference Card

| Versi | Highlight |
|-------|-----------|
| ⭐ **slice()** | `if (!str) return ''` → `return str.slice(-1) + reverseString(str.slice(0, -1))` |
| 🔵 **Index** | `if (index < 0) return ''` → `return str[index] + reverseString(str, index - 1)` |
| 🟢 **charAt()** | `if (!str) return ''` → `return str.charAt(str.length - 1) + reverseString(str.substring(0, str.length - 1))` |

---

Made with ❤️ for learners

**Happy Coding! 🚀**

</div>
