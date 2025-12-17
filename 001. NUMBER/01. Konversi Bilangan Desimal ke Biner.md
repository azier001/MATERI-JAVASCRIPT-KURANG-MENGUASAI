# 🔢 Konversi Bilangan Desimal ke Biner dengan JavaScript

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Beginner Friendly](https://img.shields.io/badge/Level-Beginner-green?style=for-the-badge)
![Documentation](https://img.shields.io/badge/Type-Documentation-blue?style=for-the-badge)

**Dokumentasi lengkap untuk memahami cara mengkonversi bilangan desimal ke biner menggunakan JavaScript**

</div>

---

## 📑 Daftar Isi

- [Pengenalan](#pengenalan)
- [Apa itu Bilangan Desimal?](#apa-itu-bilangan-desimal)
- [Apa itu Bilangan Biner?](#apa-itu-bilangan-biner)
- [Konsep Konversi Desimal ke Biner](#konsep-konversi-desimal-ke-biner)
- [Metode Konversi di JavaScript](#metode-konversi-di-javascript)
  - [Metode 1: Menggunakan toString()](#metode-1-menggunakan-tostring)
  - [Metode 2: Algoritma Manual dengan Loop](#metode-2-algoritma-manual-dengan-loop)
  - [Metode 3: Menggunakan Rekursi](#metode-3-menggunakan-rekursi)
  - [Metode 4: Menggunakan Bitwise Operators](#metode-4-menggunakan-bitwise-operators)
- [Perbandingan Metode](#perbandingan-metode)
- [Contoh Kasus Penggunaan](#contoh-kasus-penggunaan)
- [Tips dan Trik](#tips-dan-trik)
- [Referensi](#referensi)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Selamat datang di dokumentasi konversi bilangan desimal ke biner! Dokumentasi ini dibuat khusus untuk pemula yang ingin memahami cara mengubah bilangan desimal (basis 10) menjadi bilangan biner (basis 2) menggunakan JavaScript.

Konversi desimal ke biner adalah salah satu konsep fundamental dalam pemrograman dan sangat penting untuk memahami bagaimana komputer menyimpan dan memproses data.

### Kenapa Harus Belajar Ini?

- 🖥️ Memahami cara kerja komputer di level rendah
- 💡 Meningkatkan pemahaman tentang sistem bilangan
- 🔧 Berguna untuk pemrograman tingkat lanjut
- 📊 Membantu dalam operasi bitwise dan manipulasi data

---

<a name="apa-itu-bilangan-desimal"></a>
## 📖 Apa itu Bilangan Desimal?

**Bilangan Desimal** adalah sistem bilangan berbasis 10 yang kita gunakan sehari-hari. Sistem ini menggunakan 10 digit: **0, 1, 2, 3, 4, 5, 6, 7, 8, 9**.

### Contoh Bilangan Desimal:
- 10 (sepuluh)
- 25 (dua puluh lima)
- 156 (seratus lima puluh enam)

### Cara Kerja:
Setiap posisi dalam bilangan desimal merepresentasikan pangkat dari 10:

```
Contoh: 156
= (1 × 10²) + (5 × 10¹) + (6 × 10⁰)
= (1 × 100) + (5 × 10) + (6 × 1)
= 100 + 50 + 6
= 156
```

---

<a name="apa-itu-bilangan-biner"></a>
## 📖 Apa itu Bilangan Biner?

**Bilangan Biner** adalah sistem bilangan berbasis 2 yang hanya menggunakan 2 digit: **0 dan 1**.

### Contoh Bilangan Biner:
- 1010 (biner) = 10 (desimal)
- 11001 (biner) = 25 (desimal)
- 10011100 (biner) = 156 (desimal)

### Cara Kerja:
Setiap posisi dalam bilangan biner merepresentasikan pangkat dari 2:

```
Contoh: 1010 (biner)
= (1 × 2³) + (0 × 2²) + (1 × 2¹) + (0 × 2⁰)
= (1 × 8) + (0 × 4) + (1 × 2) + (0 × 1)
= 8 + 0 + 2 + 0
= 10 (desimal)
```

### Mengapa Komputer Menggunakan Biner?

💡 Komputer menggunakan biner karena hanya memahami dua kondisi: **ON (1)** dan **OFF (0)**. Ini sesuai dengan cara kerja transistor dalam chip komputer.

---

<a name="konsep-konversi-desimal-ke-biner"></a>
## 🔄 Konsep Konversi Desimal ke Biner

### Langkah-langkah Manual:

Untuk mengkonversi desimal ke biner, kita menggunakan metode **pembagian berulang dengan 2**:

**Contoh: Konversi 10 ke biner**

```
10 ÷ 2 = 5  sisa 0  ⬅️ (digit paling kanan)
5  ÷ 2 = 2  sisa 1
2  ÷ 2 = 1  sisa 0
1  ÷ 2 = 0  sisa 1  ⬅️ (digit paling kiri)

Baca dari bawah ke atas: 1010
```

**Contoh: Konversi 25 ke biner**

```
25 ÷ 2 = 12  sisa 1  ⬅️ (digit paling kanan)
12 ÷ 2 = 6   sisa 0
6  ÷ 2 = 3   sisa 0
3  ÷ 2 = 1   sisa 1
1  ÷ 2 = 0   sisa 1  ⬅️ (digit paling kiri)

Baca dari bawah ke atas: 11001
```

---

<a name="metode-konversi-di-javascript"></a>
## 💻 Metode Konversi di JavaScript

<a name="metode-1-menggunakan-tostring"></a>
### Metode 1: Menggunakan toString()

Metode paling sederhana dan tercepat menggunakan built-in method JavaScript.

```javascript
function decimalToBinary1(decimal) {
  return decimal.toString(2);
}

// Contoh penggunaan
console.log(decimalToBinary1(10));   
console.log(decimalToBinary1(25));   
console.log(decimalToBinary1(156));  
console.log(decimalToBinary1(7));    
console.log(decimalToBinary1(0));    
```

**Output:**
```
1010
11001
10011100
111
0
```

#### Penjelasan:
- `toString(2)` adalah method bawaan JavaScript untuk mengkonversi angka ke string dengan basis tertentu
- Parameter `2` menunjukkan basis biner
- Metode ini paling efisien dan mudah digunakan

---

<a name="metode-2-algoritma-manual-dengan-loop"></a>
### Metode 2: Algoritma Manual dengan Loop

Implementasi manual menggunakan logika pembagian berulang.

```javascript
function decimalToBinary2(decimal) {
  // Jika angka 0, langsung return "0"
  if (decimal === 0) return "0";
  
  let binary = "";
  
  // Loop selama decimal lebih dari 0
  while (decimal > 0) {
    let remainder = decimal % 2;  // Ambil sisa bagi 2
    binary = remainder + binary;  // Tambahkan di depan string
    decimal = Math.floor(decimal / 2);  // Bagi dengan 2 dan bulatkan ke bawah
  }
  
  return binary;
}

// Contoh penggunaan
console.log(decimalToBinary2(10));
console.log(decimalToBinary2(25));
console.log(decimalToBinary2(156));
console.log(decimalToBinary2(7));
console.log(decimalToBinary2(0));
```

**Output:**
```
1010
11001
10011100
111
0
```

#### Penjelasan Step by Step (Contoh: 10):

```
Iterasi 1: 10 % 2 = 0, binary = "0", decimal = 5
Iterasi 2: 5 % 2 = 1, binary = "10", decimal = 2
Iterasi 3: 2 % 2 = 0, binary = "010", decimal = 1
Iterasi 4: 1 % 2 = 1, binary = "1010", decimal = 0
Loop berhenti, hasil: "1010"
```

---

<a name="metode-3-menggunakan-rekursi"></a>
### Metode 3: Menggunakan Rekursi

Pendekatan menggunakan fungsi yang memanggil dirinya sendiri.

```javascript
function decimalToBinary3(decimal) {
  // Base case: jika decimal 0 atau 1
  if (decimal === 0 || decimal === 1) {
    return decimal.toString();
  }
  
  // Recursive case: bagi dengan 2 dan tambahkan sisa
  return decimalToBinary3(Math.floor(decimal / 2)) + (decimal % 2);
}

// Contoh penggunaan
console.log(decimalToBinary3(10));
console.log(decimalToBinary3(25));
console.log(decimalToBinary3(156));
console.log(decimalToBinary3(7));
console.log(decimalToBinary3(1));
```

**Output:**
```
1010
11001
10011100
111
1
```

#### Penjelasan Cara Kerja Rekursi (Contoh: 10):

```
decimalToBinary3(10)
  └─> decimalToBinary3(5) + "0"
        └─> decimalToBinary3(2) + "1"
              └─> decimalToBinary3(1) + "0"
                    └─> "1"
              
Hasil akhir: "1" + "0" + "1" + "0" = "1010"
```

---

<a name="metode-4-menggunakan-bitwise-operators"></a>
### Metode 4: Menggunakan Bitwise Operators

Metode advanced menggunakan operasi bitwise.

```javascript
function decimalToBinary4(decimal) {
  if (decimal === 0) return "0";
  
  let binary = "";
  
  while (decimal > 0) {
    // & 1 mengecek bit paling kanan (sama seperti % 2)
    binary = (decimal & 1) + binary;
    // >> 1 menggeser bit ke kanan (sama seperti Math.floor(decimal / 2))
    decimal = decimal >> 1;
  }
  
  return binary;
}

// Contoh penggunaan
console.log(decimalToBinary4(10));
console.log(decimalToBinary4(25));
console.log(decimalToBinary4(156));
console.log(decimalToBinary4(7));
console.log(decimalToBinary4(0));
```

**Output:**
```
1010
11001
10011100
111
0
```

#### Penjelasan Bitwise Operators:

- `& 1` (AND dengan 1): Mengecek apakah bit paling kanan adalah 1 atau 0
- `>> 1` (Right Shift): Menggeser semua bit ke kanan satu posisi (sama dengan membagi 2)

**Contoh Visual:**
```
10 dalam biner: 1010

Iterasi 1: 1010 & 1 = 0, lalu 1010 >> 1 = 101
Iterasi 2: 101 & 1 = 1, lalu 101 >> 1 = 10
Iterasi 3: 10 & 1 = 0, lalu 10 >> 1 = 1
Iterasi 4: 1 & 1 = 1, lalu 1 >> 1 = 0
```

---

<a name="perbandingan-metode"></a>
## ⚖️ Perbandingan Metode

| Metode | Kelebihan | Kekurangan | Cocok Untuk |
|--------|-----------|------------|-------------|
| **toString()** | ✅ Paling sederhana<br>✅ Cepat<br>✅ Built-in | ❌ Tidak belajar logika | Produksi, solusi cepat |
| **Loop Manual** | ✅ Mudah dipahami<br>✅ Menunjukkan logika | ❌ Lebih banyak kode | Pembelajaran pemula |
| **Rekursi** | ✅ Elegan<br>✅ Functional programming | ❌ Lebih sulit dipahami<br>❌ Stack overflow untuk angka besar | Pembelajaran advanced |
| **Bitwise** | ✅ Sangat cepat<br>✅ Efisien | ❌ Sulit dipahami pemula | Optimasi performa |

---

<a name="contoh-kasus-penggunaan"></a>
## 🎨 Contoh Kasus Penggunaan

### 1. Konversi dengan Format Panjang Tetap

Menambahkan padding agar biner memiliki panjang minimal tertentu.

```javascript
function decimalToBinaryPadded(decimal, minLength = 8) {
  let binary = decimal.toString(2);
  return binary.padStart(minLength, '0');
}

// Contoh penggunaan
console.log(decimalToBinaryPadded(10));
console.log(decimalToBinaryPadded(5));
console.log(decimalToBinaryPadded(255));
console.log(decimalToBinaryPadded(7, 16));
```

**Output:**
```
00001010
00000101
11111111
0000000000000111
```

---

### 2. Konversi Array Angka

Mengkonversi beberapa angka sekaligus.

```javascript
function convertArrayToBinary(numbers) {
  return numbers.map(num => ({
    decimal: num,
    binary: num.toString(2)
  }));
}

// Contoh penggunaan
const numbers = [10, 25, 156, 7];
const results = convertArrayToBinary(numbers);

results.forEach(result => {
  console.log(`${result.decimal} = ${result.binary}`);
});
```

**Output:**
```
10 = 1010
25 = 11001
156 = 10011100
7 = 111
```

---

### 3. Konversi dengan Validasi

Menambahkan pengecekan input.

```javascript
function safeBinaryConversion(input) {
  // Validasi input
  if (typeof input !== 'number') {
    return "Error: Input harus berupa angka";
  }
  
  if (input < 0) {
    return "Error: Tidak bisa konversi angka negatif";
  }
  
  if (!Number.isInteger(input)) {
    return "Error: Input harus bilangan bulat";
  }
  
  return input.toString(2);
}

// Contoh penggunaan
console.log(safeBinaryConversion(10));
console.log(safeBinaryConversion(-5));
console.log(safeBinaryConversion(3.14));
console.log(safeBinaryConversion("hello"));
```

**Output:**
```
1010
Error: Tidak bisa konversi angka negatif
Error: Input harus bilangan bulat
Error: Input harus berupa angka
```

---

### 4. Konversi dengan Informasi Detail

Menampilkan proses konversi secara detail.

```javascript
function detailedBinaryConversion(decimal) {
  if (decimal === 0) {
    return {
      decimal: 0,
      binary: "0",
      steps: ["0 adalah kasus khusus, biner = 0"]
    };
  }
  
  let steps = [];
  let temp = decimal;
  let binary = "";
  
  while (temp > 0) {
    let remainder = temp % 2;
    let quotient = Math.floor(temp / 2);
    steps.push(`${temp} ÷ 2 = ${quotient} sisa ${remainder}`);
    binary = remainder + binary;
    temp = quotient;
  }
  
  return {
    decimal: decimal,
    binary: binary,
    steps: steps
  };
}

// Contoh penggunaan
const result = detailedBinaryConversion(25);
console.log(`Desimal: ${result.decimal}`);
console.log(`Biner: ${result.binary}`);
console.log("Langkah-langkah:");
result.steps.forEach((step, index) => {
  console.log(`  ${index + 1}. ${step}`);
});
```

**Output:**
```
Desimal: 25
Biner: 11001
Langkah-langkah:
  1. 25 ÷ 2 = 12 sisa 1
  2. 12 ÷ 2 = 6 sisa 0
  3. 6 ÷ 2 = 3 sisa 0
  4. 3 ÷ 2 = 1 sisa 1
  5. 1 ÷ 2 = 0 sisa 1
```

---

<a name="tips-dan-trik"></a>
## 💡 Tips dan Trik

### 1. Memahami Batasan Number di JavaScript

```javascript
// JavaScript menggunakan 64-bit floating point
const maxSafeInteger = Number.MAX_SAFE_INTEGER;
console.log(maxSafeInteger);
console.log(maxSafeInteger.toString(2));
```

**Output:**
```
9007199254740991
11111111111111111111111111111111111111111111111111111
```

---

### 2. Konversi Bilangan Negatif

JavaScript menggunakan **Two's Complement** untuk bilangan negatif.

```javascript
function negativeBinary(decimal) {
  // Untuk bilangan negatif, gunakan >>> (unsigned right shift)
  return (decimal >>> 0).toString(2);
}

console.log(negativeBinary(-10));
console.log(negativeBinary(-1));
console.log(negativeBinary(-100));
```

**Output:**
```
11111111111111111111111111110110
11111111111111111111111111111111
11111111111111111111111110011100
```

---

### 3. Shortcut untuk Power of 2

Mengecek apakah angka adalah pangkat dari 2.

```javascript
function isPowerOfTwo(num) {
  return num > 0 && (num & (num - 1)) === 0;
}

console.log(isPowerOfTwo(8));
console.log(isPowerOfTwo(10));
console.log(isPowerOfTwo(16));
console.log(isPowerOfTwo(15));
```

**Output:**
```
true
false
true
false
```

---

### 4. Menghitung Jumlah Bit 1

```javascript
function countOnes(decimal) {
  let binary = decimal.toString(2);
  let count = 0;
  
  for (let bit of binary) {
    if (bit === '1') count++;
  }
  
  return count;
}

console.log(`10 (${(10).toString(2)}) memiliki ${countOnes(10)} bit 1`);
console.log(`25 (${(25).toString(2)}) memiliki ${countOnes(25)} bit 1`);
console.log(`255 (${(255).toString(2)}) memiliki ${countOnes(255)} bit 1`);
```

**Output:**
```
10 (1010) memiliki 2 bit 1
25 (11001) memiliki 3 bit 1
255 (11111111) memiliki 8 bit 1
```

---

<a name="referensi"></a>
## 📚 Referensi

### Dokumentasi Official
- [MDN - Number.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
- [MDN - Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)

### Konsep Dasar
- Sistem bilangan: Desimal (basis 10), Biner (basis 2)
- Operasi modulo (`%`) dan pembagian bulat
- Rekursi dan iterasi dalam pemrograman
- Bitwise operations

---

## 🎓 Kesimpulan

Konversi desimal ke biner adalah konsep fundamental dalam pemrograman. Beberapa poin penting:

1. ✅ **Untuk penggunaan praktis**: Gunakan `toString(2)`
2. ✅ **Untuk pembelajaran**: Pahami algoritma manual dengan loop
3. ✅ **Untuk optimasi**: Pelajari bitwise operators
4. ✅ **Untuk fleksibilitas**: Kombinasikan dengan validasi dan formatting

Selamat belajar! 🚀

---

<div align="center">

**📝 Dokumentasi Pribadi**

Dibuat dengan ❤️ untuk pembelajaran JavaScript

*Terakhir diperbarui: Desember 2025*

</div>
