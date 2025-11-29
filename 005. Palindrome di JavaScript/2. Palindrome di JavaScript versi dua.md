# 🔄 Palindrome di JavaScript

<div align="center">

![Palindrome Banner](https://img.shields.io/badge/JavaScript-Palindrome-yellow?style=for-the-badge&logo=javascript)
![Level](https://img.shields.io/badge/Level-Pemula-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Dokumentasi_Pribadi-blue?style=for-the-badge)

**Dokumentasi lengkap tentang Palindrome untuk pemula**

[📚 Mulai Belajar](#apa-itu-palindrome) • [💻 Lihat Contoh](#contoh-contoh-palindrome) • [🚀 Praktik](#implementasi-kode)

---

</div>

## 📑 Daftar Isi

- [Apa itu Palindrome?](#apa-itu-palindrome)
- [Mengapa Palindrome Penting?](#mengapa-palindrome-penting)
- [Konsep Dasar](#konsep-dasar)
- [Contoh-Contoh Palindrome](#contoh-contoh-palindrome)
- [Implementasi Kode](#implementasi-kode)
  - [Metode 1: Menggunakan Reverse String](#metode-1-menggunakan-reverse-string)
  - [Metode 2: Menggunakan Loop](#metode-2-menggunakan-loop)
  - [Metode 3: Menggunakan Rekursi](#metode-3-menggunakan-rekursi)
  - [Metode 4: Menggunakan Two Pointers](#metode-4-menggunakan-two-pointers)
- [Penanganan Case-Insensitive](#penanganan-case-insensitive)
- [Palindrome dengan Spasi dan Karakter Khusus](#palindrome-dengan-spasi-dan-karakter-khusus)
- [Palindrome Angka](#palindrome-angka)
- [Tips dan Trik](#tips-dan-trik)
- [Latihan Soal](#latihan-soal)
- [Kesimpulan](#kesimpulan)

---

<a name="apa-itu-palindrome"></a>
## 🎯 Apa itu Palindrome?

**Palindrome** adalah kata, frasa, angka, atau urutan karakter lain yang dibaca sama baik dari depan maupun dari belakang.

### Contoh Sederhana:
- **"katak"** → dibaca dari depan: k-a-t-a-k, dari belakang: k-a-t-a-k ✅
- **"radar"** → dibaca dari depan: r-a-d-a-r, dari belakang: r-a-d-a-r ✅
- **"kuda"** → dibaca dari depan: k-u-d-a, dari belakang: a-d-u-k ❌ (bukan palindrome)

---

<a name="mengapa-palindrome-penting"></a>
## 💡 Mengapa Palindrome Penting?

Mempelajari palindrome membantu kita memahami:

1. **Manipulasi String** - Belajar cara mengolah teks
2. **Logika Pemrograman** - Melatih berpikir algoritmik
3. **Problem Solving** - Sering muncul dalam interview coding
4. **Optimasi Kode** - Membandingkan berbagai pendekatan solusi

---

<a name="konsep-dasar"></a>
## 📖 Konsep Dasar

Untuk mengecek palindrome, kita perlu:

1. **Membandingkan karakter** dari posisi awal dan akhir
2. **Bergerak ke tengah** secara bertahap
3. **Memastikan semua pasangan** karakter sama

```
Contoh: "katak"
Posisi:  0 1 2 3 4
Huruf:   k a t a k

Pengecekan:
- Posisi 0 (k) vs Posisi 4 (k) → sama ✓
- Posisi 1 (a) vs Posisi 3 (a) → sama ✓
- Posisi 2 (t) → tengah, tidak perlu cek ✓

Hasil: PALINDROME!
```

---

<a name="contoh-contoh-palindrome"></a>
## 📝 Contoh-Contoh Palindrome

### ✅ Yang Termasuk Palindrome:

| Kata | Penjelasan |
|------|------------|
| katak | Hewan amfibi yang namanya palindrome |
| radar | Alat pendeteksi |
| civic | Berkaitan dengan kewarganegaraan |
| level | Tingkatan |
| noon | Tengah hari |
| 12321 | Angka palindrome |

### ❌ Yang Bukan Palindrome:

| Kata | Alasan |
|------|--------|
| rumah | r-u-m-a-h ≠ h-a-m-u-r |
| kucing | k-u-c-i-n-g ≠ g-n-i-c-u-k |
| 12345 | 1-2-3-4-5 ≠ 5-4-3-2-1 |

---

<a name="implementasi-kode"></a>
## 💻 Implementasi Kode

<a name="metode-1-menggunakan-reverse-string"></a>
### Metode 1: Menggunakan Reverse String

Cara paling sederhana: balik stringnya, lalu bandingkan!

```javascript
function isPalindrome1(str) {
    // Ubah string menjadi huruf kecil semua
    str = str.toLowerCase();
    
    // Balik string menggunakan split, reverse, dan join
    const reversed = str.split('').reverse().join('');
    
    // Bandingkan string asli dengan yang sudah dibalik
    return str === reversed;
}

// Testing
console.log(isPalindrome1("katak"));  // Output: true
console.log(isPalindrome1("radar"));  // Output: true
console.log(isPalindrome1("rumah"));  // Output: false
console.log(isPalindrome1("Katak"));  // Output: true (case-insensitive)
```

**Output:**
```
true
true
false
true
```

**Penjelasan:**
- `split('')` → Memecah string menjadi array karakter
- `reverse()` → Membalik urutan array
- `join('')` → Menggabungkan array kembali menjadi string
- `===` → Membandingkan apakah sama persis

---

<a name="metode-2-menggunakan-loop"></a>
### Metode 2: Menggunakan Loop

Metode ini lebih efisien karena tidak membuat string baru.

```javascript
function isPalindrome2(str) {
    str = str.toLowerCase();
    
    // Loop dari awal dan akhir menuju tengah
    for (let i = 0; i < str.length / 2; i++) {
        // Bandingkan karakter dari depan dan belakang
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    
    return true;
}

// Testing
console.log(isPalindrome2("level"));  // Output: true
console.log(isPalindrome2("hello"));  // Output: false
console.log(isPalindrome2("noon"));   // Output: true
console.log(isPalindrome2("civic"));  // Output: true
```

**Output:**
```
true
false
true
true
```

**Penjelasan:**
- Loop hanya sampai `length / 2` (setengah string)
- `str[i]` → karakter dari depan
- `str[str.length - 1 - i]` → karakter dari belakang
- Jika ada yang tidak sama, langsung return `false`

---

<a name="metode-3-menggunakan-rekursi"></a>
### Metode 3: Menggunakan Rekursi

Pendekatan dengan fungsi yang memanggil dirinya sendiri.

```javascript
function isPalindrome3(str) {
    str = str.toLowerCase();
    
    // Base case: jika string kosong atau 1 karakter, pasti palindrome
    if (str.length <= 1) {
        return true;
    }
    
    // Cek karakter pertama dan terakhir
    if (str[0] !== str[str.length - 1]) {
        return false;
    }
    
    // Panggil fungsi lagi untuk substring tanpa karakter pertama dan terakhir
    return isPalindrome3(str.slice(1, -1));
}

// Testing
console.log(isPalindrome3("madam"));    // Output: true
console.log(isPalindrome3("racecar")); // Output: true
console.log(isPalindrome3("hello"));   // Output: false
console.log(isPalindrome3("a"));       // Output: true
```

**Output:**
```
true
true
false
true
```

**Penjelasan:**
- **Base case**: String dengan 0 atau 1 karakter pasti palindrome
- Cek karakter ujung, jika tidak sama langsung `false`
- `slice(1, -1)` → ambil string tanpa karakter pertama dan terakhir
- Panggil fungsi lagi dengan substring yang lebih pendek

---

<a name="metode-4-menggunakan-two-pointers"></a>
### Metode 4: Menggunakan Two Pointers

Metode paling efisien dengan kompleksitas O(n/2).

```javascript
function isPalindrome4(str) {
    str = str.toLowerCase();
    
    let left = 0;                    // Pointer dari kiri
    let right = str.length - 1;      // Pointer dari kanan
    
    // Loop selama pointer belum bertemu
    while (left < right) {
        // Bandingkan karakter di posisi left dan right
        if (str[left] !== str[right]) {
            return false;
        }
        left++;   // Geser pointer kiri ke kanan
        right--;  // Geser pointer kanan ke kiri
    }
    
    return true;
}

// Testing
console.log(isPalindrome4("kayak"));   // Output: true
console.log(isPalindrome4("rotator")); // Output: true
console.log(isPalindrome4("world"));   // Output: false
console.log(isPalindrome4("abba"));    // Output: true
```

**Output:**
```
true
true
false
true
```

**Penjelasan:**
- Dua pointer bergerak dari ujung-ujung ke tengah
- `left++` → geser kiri ke kanan
- `right--` → geser kanan ke kiri
- Berhenti saat `left >= right` (pointer bertemu/lewat)

---

<a name="penanganan-case-insensitive"></a>
## 🔤 Penanganan Case-Insensitive

Kadang kita ingin "Katak" dan "katak" dianggap sama sebagai palindrome.

```javascript
function isPalindromeCaseInsensitive(str) {
    // Ubah semua huruf menjadi lowercase
    const lowerStr = str.toLowerCase();
    const reversed = lowerStr.split('').reverse().join('');
    return lowerStr === reversed;
}

// Testing
console.log(isPalindromeCaseInsensitive("Katak"));     // Output: true
console.log(isPalindromeCaseInsensitive("RaceCar"));   // Output: true
console.log(isPalindromeCaseInsensitive("Hello"));     // Output: false
console.log(isPalindromeCaseInsensitive("LeVeL"));     // Output: true
```

**Output:**
```
true
true
false
true
```

---

<a name="palindrome-dengan-spasi-dan-karakter-khusus"></a>
## 🧹 Palindrome dengan Spasi dan Karakter Khusus

Kadang palindrome mengandung spasi atau tanda baca yang harus diabaikan.

```javascript
function isPalindromeClean(str) {
    // Hapus semua karakter non-alphanumeric dan ubah ke lowercase
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    return cleaned === reversed;
}

// Testing
console.log(isPalindromeClean("A man a plan a canal Panama")); 
// Output: true

console.log(isPalindromeClean("race a car")); 
// Output: false

console.log(isPalindromeClean("Was it a car or a cat I saw?")); 
// Output: true

console.log(isPalindromeClean("Madam, I'm Adam")); 
// Output: true
```

**Output:**
```
true
false
true
true
```

**Penjelasan:**
- `/[^a-z0-9]/g` → regex untuk menghapus semua selain huruf dan angka
- Spasi, tanda baca, dan karakter khusus dihilangkan
- "A man a plan a canal Panama" → "amanaplanacanalpanama"

---

<a name="palindrome-angka"></a>
## 🔢 Palindrome Angka

Kita juga bisa mengecek palindrome untuk angka!

```javascript
function isNumberPalindrome(num) {
    // Ubah angka menjadi string
    const str = num.toString();
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}

// Testing
console.log(isNumberPalindrome(121));    // Output: true
console.log(isNumberPalindrome(12321));  // Output: true
console.log(isNumberPalindrome(12345));  // Output: false
console.log(isNumberPalindrome(1));      // Output: true
console.log(isNumberPalindrome(-121));   // Output: false (karena ada -)
```

**Output:**
```
true
true
false
true
false
```

**Bonus - Tanpa Konversi String:**

```javascript
function isNumberPalindrome2(num) {
    // Angka negatif bukan palindrome
    if (num < 0) return false;
    
    let original = num;
    let reversed = 0;
    
    // Balik angka secara matematis
    while (num > 0) {
        reversed = reversed * 10 + num % 10;
        num = Math.floor(num / 10);
    }
    
    return original === reversed;
}

// Testing
console.log(isNumberPalindrome2(121));    // Output: true
console.log(isNumberPalindrome2(12321));  // Output: true
console.log(isNumberPalindrome2(12345));  // Output: false
```

**Output:**
```
true
true
false
```

---

<a name="tips-dan-trik"></a>
## 💡 Tips dan Trik

### 1️⃣ Performa vs Kesederhanaan

```javascript
// Sederhana tapi membuat string baru (lebih lambat)
const simple = str => str === str.split('').reverse().join('');

// Lebih cepat karena tidak membuat string baru
const fast = str => {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) return false;
    }
    return true;
};
```

### 2️⃣ One-Liner dengan Arrow Function

```javascript
const isPalindrome = str => str === str.split('').reverse().join('');

console.log(isPalindrome("katak"));  // Output: true
```

**Output:**
```
true
```

### 3️⃣ Menggunakan Every Method

```javascript
function isPalindromeEvery(str) {
    return str.split('').every((char, i) => {
        return char === str[str.length - 1 - i];
    });
}

console.log(isPalindromeEvery("radar"));  // Output: true
```

**Output:**
```
true
```

---

<a name="latihan-soal"></a>
## 📚 Latihan Soal

### Soal 1: Palindrome Checker Sederhana
Buat fungsi yang mengecek apakah kata adalah palindrome (case-sensitive).

```javascript
function soal1(str) {
    // Tulis kode kamu di sini
}

// Test
console.log(soal1("katak"));  // Harus: true
console.log(soal1("Katak"));  // Harus: false
```

### Soal 2: Palindrome Terpanjang
Buat fungsi yang menemukan kata palindrome terpanjang dari array.

```javascript
function soal2(arr) {
    // Tulis kode kamu di sini
}

// Test
console.log(soal2(["katak", "level", "makan", "radar"]));  
// Harus: "katak" atau "level" atau "radar" (semua panjang 5)
```

### Soal 3: Hitung Palindrome
Buat fungsi yang menghitung berapa banyak palindrome dalam array.

```javascript
function soal3(arr) {
    // Tulis kode kamu di sini
}

// Test
console.log(soal3(["katak", "rumah", "level", "makan", "noon"]));  
// Harus: 3 (katak, level, noon)
```

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan

Palindrome adalah konsep dasar yang penting dalam pemrograman. Melalui dokumentasi ini, kamu telah belajar:

✅ Definisi dan konsep palindrome  
✅ Berbagai metode implementasi (reverse, loop, rekursi, two pointers)  
✅ Penanganan case-insensitive dan karakter khusus  
✅ Palindrome untuk string dan angka  
✅ Tips optimasi dan performa  

### 🚀 Langkah Selanjutnya:

1. Praktikkan semua metode yang sudah dipelajari
2. Coba selesaikan latihan soal
3. Eksplorasi variasi palindrome lainnya
4. Terapkan dalam project nyata

---

<div align="center">

**📌 Catatan Penting**

*Dokumentasi ini dibuat untuk keperluan belajar pribadi*  
*Terus berlatih dan jangan takut mencoba!*

**Happy Coding! 🎉**

---

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

</div>
