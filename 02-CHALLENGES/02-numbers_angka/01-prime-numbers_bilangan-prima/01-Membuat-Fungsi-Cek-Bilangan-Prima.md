# 🎯 Dokumentasi Program Cek Bilangan Prima JavaScript

> **Dokumentasi Pribadi untuk Pemula** - Belajar membuat program cek bilangan prima langkah demi langkah

---

## 📋 Daftar Isi

- [Pengenalan](#pengenalan)
- [Apa itu Bilangan Prima?](#apa-itu-bilangan-prima)
- [Algoritma Pengecekan Bilangan Prima](#algoritma-pengecekan-bilangan-prima)
- [Langkah-Langkah Pembuatan Program](#langkah-langkah-pembuatan-program)
  - [Langkah 1: Membuat Fungsi Dasar](#langkah-1-membuat-fungsi-dasar)
  - [Langkah 2: Validasi Angka ≤ 1](#langkah-2-validasi-angka--1)
  - [Langkah 3: Pengecekan Angka 2](#langkah-3-pengecekan-angka-2)
  - [Langkah 4: Pengecekan Bilangan Genap](#langkah-4-pengecekan-bilangan-genap)
  - [Langkah 5: Loop Pengecekan Pembagi](#langkah-5-loop-pengecekan-pembagi)
  - [Langkah 6: Isi Loop](#langkah-6-isi-loop)
  - [Langkah 7: Return True di Akhir](#langkah-7-return-true-di-akhir)
  - [Langkah 8: Validasi Input User](#langkah-8-validasi-input-user)
  - [Langkah 9: Input dari User](#langkah-9-input-dari-user)
- [Kode Final](#kode-final)
- [Cara Testing](#cara-testing)
- [Best Practice yang Dipelajari](#best-practice-yang-dipelajari)
- [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Dokumentasi ini berisi langkah-langkah pembuatan program untuk **mengecek apakah sebuah angka adalah bilangan prima atau bukan** menggunakan JavaScript.

Program ini dibuat dengan pendekatan **step-by-step** yang cocok untuk pemula yang ingin memahami:
- ✅ Algoritma bilangan prima
- ✅ Penggunaan loop dan kondisi
- ✅ Input validation
- ✅ Best practice JavaScript

---

<a name="apa-itu-bilangan-prima"></a>
## 📖 Apa itu Bilangan Prima?

**Bilangan Prima** adalah bilangan bulat positif yang **hanya bisa dibagi habis oleh 1 dan dirinya sendiri**.

### Contoh:

✅ **Bilangan Prima:**
- `2` → hanya bisa dibagi 1 dan 2
- `3` → hanya bisa dibagi 1 dan 3
- `5` → hanya bisa dibagi 1 dan 5
- `7` → hanya bisa dibagi 1 dan 7
- `11` → hanya bisa dibagi 1 dan 11

❌ **Bukan Bilangan Prima:**
- `1` → definisi bilangan prima dimulai dari 2
- `4` → bisa dibagi 1, 2, dan 4
- `6` → bisa dibagi 1, 2, 3, dan 6
- `9` → bisa dibagi 1, 3, dan 9

---

<a name="algoritma-pengecekan-bilangan-prima"></a>
## 🧮 Algoritma Pengecekan Bilangan Prima

### Konsep Dasar

Untuk mengecek apakah angka `n` adalah bilangan prima, kita perlu:
1. Cek apakah ada angka lain (selain 1 dan n) yang bisa membagi `n`
2. Jika ada → **bukan prima**
3. Jika tidak ada → **prima**

### Optimasi Algoritma

🚀 **Optimasi 1: Cek sampai √n saja**
- Jika `n` memiliki pembagi lebih dari √n, pasti ada pembagi pasangannya yang kurang dari √n
- Contoh: 36 = 6 × 6, cukup cek sampai 6

🚀 **Optimasi 2: Skip bilangan genap**
- Semua bilangan genap (kecuali 2) pasti bukan prima
- Cukup cek angka 2 secara khusus, lalu skip semua genap lainnya
- Loop hanya cek bilangan ganjil: 3, 5, 7, 9, 11...

### Pseudocode

```
function cekPrima(angka):
    jika angka <= 1:
        return false
    
    jika angka == 2:
        return true
    
    jika angka habis dibagi 2:
        return false
    
    untuk i dari 3 sampai √angka, increment 2:
        jika angka habis dibagi i:
            return false
    
    return true
```

---

<a name="langkah-langkah-pembuatan-program"></a>
## 🛠️ Langkah-Langkah Pembuatan Program

<a name="langkah-1-membuat-fungsi-dasar"></a>
### Langkah 1: Membuat Fungsi Dasar

**📝 Tujuan:** Membuat struktur fungsi dengan nama yang sesuai best practice

**💡 Konsep:**
- Gunakan bahasa Inggris untuk penamaan
- Fungsi boolean sebaiknya diawali dengan `is`, `has`, atau `can`
- Gunakan camelCase

**✍️ Kode:**

```javascript
function isPrime(number) {

}
```

**📌 Penjelasan:**
- `isPrime` → nama fungsi (is + Prime)
- `number` → parameter yang menerima angka yang akan dicek

---

<a name="langkah-2-validasi-angka--1"></a>
### Langkah 2: Validasi Angka ≤ 1

**📝 Tujuan:** Menangani kasus angka ≤ 1 yang bukan bilangan prima

**💡 Konsep:**
- Bilangan prima dimulai dari angka 2
- Angka 1, 0, dan angka negatif **bukan prima**

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (number <= 1) {
    return false
  }
}
```

**📌 Penjelasan:**
- `number <= 1` → cek apakah angka kurang dari atau sama dengan 1
- `return false` → kembalikan nilai false (bukan prima)

**🧪 Test:**
- Input: `1` → Output: `false` ✅
- Input: `0` → Output: `false` ✅
- Input: `-5` → Output: `false` ✅

---

<a name="langkah-3-pengecekan-angka-2"></a>
### Langkah 3: Pengecekan Angka 2

**📝 Tujuan:** Menangani kasus khusus angka 2

**💡 Konsep:**
- Angka 2 adalah **satu-satunya bilangan prima genap**
- Perlu pengecekan khusus

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
}
```

**📌 Penjelasan:**
- `number === 2` → cek apakah angka sama dengan 2 (strict equality)
- `return true` → kembalikan nilai true (prima)

**🧪 Test:**
- Input: `2` → Output: `true` ✅

---

<a name="langkah-4-pengecekan-bilangan-genap"></a>
### Langkah 4: Pengecekan Bilangan Genap

**📝 Tujuan:** Menangani semua bilangan genap selain 2

**💡 Konsep:**
- Semua bilangan genap (kecuali 2) **bukan prima**
- Angka genap = habis dibagi 2
- Menggunakan operator modulo `%` untuk cek sisa bagi

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
  
  if (number % 2 === 0) {
    return false
  }
}
```

**📌 Penjelasan:**
- `number % 2 === 0` → sisa bagi dengan 2 sama dengan 0 (habis dibagi)
- Jika habis dibagi 2, maka genap → bukan prima

**🧪 Test:**
- Input: `4` → Output: `false` ✅
- Input: `8` → Output: `false` ✅
- Input: `10` → Output: `false` ✅

---

<a name="langkah-5-loop-pengecekan-pembagi"></a>
### Langkah 5: Loop Pengecekan Pembagi

**📝 Tujuan:** Membuat loop untuk mengecek pembagi dari 3 sampai √number

**💡 Konsep:**
- Mulai dari 3 (karena 1, 2 sudah dicek)
- Sampai √number (optimasi)
- Increment 2 (hanya cek bilangan ganjil: 3, 5, 7, 9...)

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
  
  if (number % 2 === 0) {
    return false
  }
  
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    
  }
}
```

**📌 Penjelasan:**
- `let i = 3` → mulai dari 3
- `i <= Math.sqrt(number)` → loop sampai akar kuadrat dari number
- `i += 2` → tambah 2 setiap iterasi (3, 5, 7, 9, 11...)
- `Math.sqrt()` → fungsi untuk menghitung akar kuadrat

**❓ Kenapa hanya sampai √number?**
- Jika n punya pembagi > √n, pasti ada pembagi pasangan < √n
- Contoh: 36 = 6 × 6 atau 9 × 4, cukup cek sampai 6

**❓ Kenapa increment 2?**
- Bilangan genap sudah dicek sebelumnya
- Cukup cek bilangan ganjil saja untuk efisiensi

---

<a name="langkah-6-isi-loop"></a>
### Langkah 6: Isi Loop

**📝 Tujuan:** Mengecek apakah number habis dibagi dengan i

**💡 Konsep:**
- Di setiap iterasi, cek apakah `number` habis dibagi `i`
- Jika habis dibagi → ada pembagi lain → bukan prima

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
  
  if (number % 2 === 0) {
    return false
  }
  
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false
    }
  }
}
```

**📌 Penjelasan:**
- `number % i === 0` → cek apakah sisa bagi dengan i sama dengan 0
- Jika habis dibagi i → ketemu pembagi → return false (bukan prima)

**🧪 Test:**
- Input: `9` → 9 % 3 = 0 → Output: `false` ✅
- Input: `15` → 15 % 3 = 0 → Output: `false` ✅

---

<a name="langkah-7-return-true-di-akhir"></a>
### Langkah 7: Return True di Akhir

**📝 Tujuan:** Mengembalikan true jika tidak ditemukan pembagi

**💡 Konsep:**
- Jika loop selesai tanpa menemukan pembagi
- Artinya angka tersebut **prima**
- Return true di akhir fungsi

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
  
  if (number % 2 === 0) {
    return false
  }
  
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false
    }
  }
  
  return true
}
```

**📌 Penjelasan:**
- `return true` → ditempatkan **setelah loop**
- Jika eksekusi sampai sini, artinya tidak ada pembagi → prima

**🧪 Test:**
- Input: `5` → Output: `true` ✅
- Input: `7` → Output: `true` ✅
- Input: `11` → Output: `true` ✅

---

<a name="langkah-8-validasi-input-user"></a>
### Langkah 8: Validasi Input User

**📝 Tujuan:** Menangani input yang tidak valid dari user

**💡 Konsep:**
- User bisa input selain angka (huruf, simbol, dll)
- User bisa input bilangan desimal
- Perlu validasi agar program tidak error

**✍️ Kode:**

```javascript
function isPrime(number) {
  if (isNaN(number)) {
    console.log('Invalid input! Please enter a valid number.')
    return false
  }
  
  if (!Number.isInteger(number)) {
    console.log('Please enter an integer number.')
    return false
  }
  
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
  
  if (number % 2 === 0) {
    return false
  }
  
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false
    }
  }
  
  return true
}
```

**📌 Penjelasan:**

**Validasi 1: `isNaN(number)`**
- Mengecek apakah input bukan angka (Not a Number)
- Contoh: "abc", undefined, null

**Validasi 2: `!Number.isInteger(number)`**
- Mengecek apakah bukan bilangan bulat
- Tanda `!` → not (negasi)
- Contoh: 5.5, 3.14, 7.8

**🧪 Test:**
- Input: `"abc"` → Output: "Invalid input!" ✅
- Input: `5.5` → Output: "Please enter an integer number." ✅

---

<a name="langkah-9-input-dari-user"></a>
### Langkah 9: Input dari User

**📝 Tujuan:** Menerima input dari user dan menampilkan hasil

**💡 Konsep:**
- Gunakan `prompt()` untuk input dari user
- Gunakan unary operator `+` untuk konversi string ke number
- Tampilkan hasil dengan `console.log()`

**✍️ Kode:**

```javascript
const num = +(prompt('Insert your number : '))
const result = isPrime(num)

console.log(`${num} is prime : `, result)
```

**📌 Penjelasan:**

**1. Input:**
- `prompt('Insert your number : ')` → menampilkan dialog input
- `+` (unary operator) → mengkonversi string hasil prompt menjadi number
- `const num` → menyimpan angka yang diinput

**2. Proses:**
- `isPrime(num)` → memanggil fungsi isPrime dengan parameter num
- `const result` → menyimpan hasil (true/false)

**3. Output:**
- `console.log()` → menampilkan ke console
- Template literal `` `${num} is prime : ` `` → format string dengan variabel

---

<a name="kode-final"></a>
## 🎯 Kode Final

```javascript
function isPrime(number) {
  if (isNaN(number)) {
    console.log('Invalid input! Please enter a valid number.')
    return false
  }
  
  if (!Number.isInteger(number)) {
    console.log('Please enter an integer number.')
    return false
  }
  
  if (number <= 1) {
    return false
  }
  
  if (number === 2) {
    return true
  }
  
  if (number % 2 === 0) {
    return false
  }
  
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) {
      return false
    }
  }
  
  return true
}

const num = +(prompt('Insert your number : '))
const result = isPrime(num)

console.log(`${num} is prime : `, result)
```

---

<a name="cara-testing"></a>
## 🧪 Cara Testing

### Di Browser (Chrome/Firefox/Edge)

1. **Buka Developer Console**
   - Tekan `F12` atau `Ctrl + Shift + J` (Windows/Linux)
   - Atau `Cmd + Option + J` (Mac)

2. **Copy-Paste Kode**
   - Copy seluruh kode final
   - Paste di Console
   - Tekan Enter

3. **Input Angka**
   - Dialog prompt akan muncul
   - Masukkan angka yang ingin dicek
   - Klik OK

4. **Lihat Hasil**
   - Hasil akan muncul di console

### Test Cases

Ubah nilai `num` secara manual untuk testing berbagai kasus:

```javascript
const num = 7  // Ganti angka di sini
```

**✅ Bilangan Prima (harusnya `true`):**
- `2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47`

**❌ Bukan Prima (harusnya `false`):**
- `0, 1, 4, 6, 8, 9, 10, 15, 20, 21, 25, 27, 100`

**⚠️ Invalid Input:**
- `"abc"` → "Invalid input!"
- `5.5` → "Please enter an integer number."
- `-5` → `false`

---

<a name="best-practice-yang-dipelajari"></a>
## 🌟 Best Practice yang Dipelajari

### 1. 📝 Penamaan (Naming Convention)

✅ **Gunakan Bahasa Inggris**
```javascript
// ✅ Good
function isPrime(number) { }

// ❌ Avoid
function cekPrima(angka) { }
```

✅ **Boolean Function → Awali dengan is/has/can**
```javascript
// ✅ Good
isPrime(), isValid(), hasValue()

// ❌ Avoid
checkPrime(), validateInput()
```

✅ **camelCase untuk variabel dan fungsi**
```javascript
// ✅ Good
const userName = "John"
function calculateTotal() { }

// ❌ Avoid
const user_name = "John"
const UserName = "John"
```

---

### 2. 🔍 Strict Equality

✅ **Gunakan `===` bukan `==`**
```javascript
// ✅ Good
if (number === 2) { }

// ❌ Avoid
if (number == 2) { }
```

**Kenapa?**
- `===` → cek nilai DAN tipe data
- `==` → hanya cek nilai (bisa auto-convert tipe)

---

### 3. 🎨 Konsistensi Kurung Kurawal

✅ **Selalu gunakan kurung kurawal untuk if statement**
```javascript
// ✅ Good
if (number <= 1) {
  return false
}

// ⚠️ Works but not recommended
if (number <= 1) return false
```

**Kenapa?**
- Lebih aman untuk maintenance
- Menghindari bug saat menambah kode
- Lebih readable

---

### 4. ✅ Input Validation

✅ **Selalu validasi input user**
```javascript
// ✅ Good
if (isNaN(number)) {
  console.log('Invalid input!')
  return false
}

if (!Number.isInteger(number)) {
  console.log('Please enter an integer!')
  return false
}
```

**Kenapa?**
- User bisa input apa saja
- Mencegah program error
- User experience lebih baik

---

### 5. 🚀 Optimasi Algoritma

✅ **Cek sampai √n saja**
```javascript
// ✅ Good
for (let i = 3; i <= Math.sqrt(number); i += 2) { }

// ❌ Tidak efisien
for (let i = 3; i < number; i += 2) { }
```

✅ **Skip bilangan genap**
```javascript
// ✅ Good - increment 2 (cek ganjil saja)
for (let i = 3; i <= Math.sqrt(number); i += 2) { }

// ❌ Tidak efisien - cek semua angka
for (let i = 3; i <= Math.sqrt(number); i++) { }
```

---

### 6. 📊 Debugging yang Baik

✅ **Console.log dengan label yang jelas**
```javascript
// ✅ Good
console.log(`${num} is prime : `, result)

// ❌ Kurang informatif
console.log(result)
```

✅ **Test dengan berbagai kasus**
- Valid input (prima dan bukan prima)
- Invalid input (huruf, desimal, negatif)
- Edge cases (0, 1, 2)

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan

### Apa yang Telah Dipelajari

✅ **Algoritma:**
- Cara kerja pengecekan bilangan prima
- Optimasi dengan √n
- Optimasi dengan skip bilangan genap

✅ **JavaScript Concepts:**
- Function dan parameter
- Conditional statements (if)
- Loop (for)
- Operator (%, ===, <=, !)
- Type conversion (unary +)
- Template literals

✅ **Best Practice:**
- Naming convention
- Input validation
- Strict equality
- Consistent code style
- Efficient algorithm

✅ **Problem Solving:**
- Breaking down problem
- Step-by-step implementation
- Testing and debugging
- Edge case handling

---

### 🚀 Next Steps

Setelah menguasai program ini, Anda bisa mencoba:

1. **Membuat variasi program:**
   - Cek apakah angka adalah bilangan ganjil/genap
   - Cari semua bilangan prima dari 1 sampai n
   - Cek apakah angka adalah bilangan sempurna

2. **Meningkatkan program:**
   - Tambahkan UI dengan HTML/CSS
   - Simpan riwayat pengecekan
   - Tampilkan faktor-faktor pembagi

3. **Pelajari konsep lanjutan:**
   - Array dan looping
   - Object dan method
   - DOM manipulation

---

## 📚 Referensi

- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)

---

**💪 Keep Learning! Keep Coding!**

*Dibuat dengan ❤️ untuk dokumentasi pribadi*
