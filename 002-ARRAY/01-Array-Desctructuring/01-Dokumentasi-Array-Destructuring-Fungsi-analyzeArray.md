# 📚 Dokumentasi Array Destructuring - Fungsi `analyzeArray`

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Difficulty](https://img.shields.io/badge/Difficulty-Easy-green?style=for-the-badge)
![ES6+](https://img.shields.io/badge/ES6+-Important-red?style=for-the-badge)

**Dokumentasi Pribadi untuk Pemula**

Memahami Array Destructuring dan Rest Operator di JavaScript

</div>

---

## 📑 Daftar Isi

- [Pengenalan](#pengenalan)
- [Apa itu Array Destructuring?](#apa-itu-array-destructuring)
- [Apa itu Rest Operator?](#apa-itu-rest-operator)
- [Apa itu Default Values?](#apa-itu-default-values)
- [Fungsi analyzeArray](#fungsi-analyzearray)
- [Cara Kerja Kode](#cara-kerja-kode)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Tips & Trik](#tips--trik)
- [Kesimpulan](#kesimpulan)

---

<a name="pengenalan"></a>
## 🎯 Pengenalan

Dokumentasi ini menjelaskan tentang fungsi `analyzeArray` yang menggunakan konsep **Array Destructuring** di JavaScript. Fungsi ini sangat berguna untuk mengambil elemen-elemen tertentu dari array dengan cara yang lebih elegan dan mudah dibaca.

**Tujuan Pembelajaran:**
- ✅ Memahami Array Destructuring
- ✅ Menggunakan Rest Operator (`...`)
- ✅ Menerapkan Default Values
- ✅ Manipulasi array dengan method `pop()`

---

<a name="apa-itu-array-destructuring"></a>
## 📖 Apa itu Array Destructuring?

**Array Destructuring** adalah fitur ES6+ yang memungkinkan kita untuk "membongkar" nilai dari array dan menyimpannya ke dalam variabel terpisah dengan sintaks yang lebih ringkas.

### Cara Tradisional (Tanpa Destructuring)

```javascript
const colors = ['merah', 'hijau', 'biru'];

const first = colors[0];
const second = colors[1];
const third = colors[2];

console.log(first);  // Output: "merah"
console.log(second); // Output: "hijau"
console.log(third);  // Output: "biru"
```

### Cara Modern (Dengan Destructuring)

```javascript
const colors = ['merah', 'hijau', 'biru'];

const [first, second, third] = colors;

console.log(first);  // Output: "merah"
console.log(second); // Output: "hijau"
console.log(third);  // Output: "biru"
```

**Keuntungan:**
- 🚀 Kode lebih ringkas dan mudah dibaca
- 🎯 Langsung assign nilai ke variabel
- ✨ Sintaks yang lebih elegan

---

<a name="apa-itu-rest-operator"></a>
## 📦 Apa itu Rest Operator?

**Rest Operator** (`...`) digunakan untuk mengumpulkan sisa elemen array yang belum di-destructure ke dalam array baru.

### Contoh Penggunaan

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const [first, second, ...rest] = numbers;

console.log(first);  // Output: 1
console.log(second); // Output: 2
console.log(rest);   // Output: [3, 4, 5, 6]
```

**Penjelasan:**
- `first` mengambil elemen pertama (1)
- `second` mengambil elemen kedua (2)
- `...rest` mengambil **semua sisa elemen** dan menyimpannya dalam array baru ([3, 4, 5, 6])

### Contoh dengan String

```javascript
const fruits = ['apel', 'mangga', 'jeruk', 'pisang', 'anggur'];

const [fav1, fav2, ...others] = fruits;

console.log(fav1);   // Output: "apel"
console.log(fav2);   // Output: "mangga"
console.log(others); // Output: ["jeruk", "pisang", "anggur"]
```

---

<a name="apa-itu-default-values"></a>
## 🔧 Apa itu Default Values?

**Default Values** adalah nilai pengganti yang akan digunakan jika elemen array tidak ada atau bernilai `undefined`.

### Contoh Tanpa Default Value

```javascript
const arr = [10];

const [a, b, c] = arr;

console.log(a); // Output: 10
console.log(b); // Output: undefined
console.log(c); // Output: undefined
```

### Contoh Dengan Default Value

```javascript
const arr = [10];

const [a = 0, b = 0, c = 0] = arr;

console.log(a); // Output: 10
console.log(b); // Output: 0
console.log(c); // Output: 0
```

**Penjelasan:**
- `a` mendapat nilai dari array (10)
- `b` dan `c` menggunakan default value (0) karena tidak ada di array

---

<a name="fungsi-analyzearray"></a>
## 🔍 Fungsi analyzeArray

Berikut adalah kode lengkap fungsi `analyzeArray`:

```javascript
function analyzeArray(arr) {
  const [first = null, second = null, ...rest] = arr;
  const last = rest.pop() || null;
  return {
    first,
    second,
    last,
    restLength: rest.length
  };
}
```

### Penjelasan Komponen

| Komponen | Penjelasan |
|----------|------------|
| `first = null` | Elemen pertama, default `null` jika tidak ada |
| `second = null` | Elemen kedua, default `null` jika tidak ada |
| `...rest` | Sisa elemen setelah first dan second |
| `rest.pop()` | Mengambil elemen terakhir dari rest |
| `\|\| null` | Jika `pop()` return undefined, gunakan `null` |
| `rest.length` | Jumlah elemen setelah first, second, dan last diambil |

---

<a name="cara-kerja-kode"></a>
## ⚙️ Cara Kerja Kode

Mari kita breakdown step-by-step dengan contoh:

```javascript
const myArray = [10, 20, 30, 40, 50];
```

### Step 1: Destructuring
```javascript
const [first = null, second = null, ...rest] = [10, 20, 30, 40, 50];

// Hasil:
// first = 10
// second = 20
// rest = [30, 40, 50]
```

### Step 2: Ambil Elemen Terakhir
```javascript
const last = rest.pop() || null;

// rest.pop() menghapus dan return elemen terakhir: 50
// rest sekarang = [30, 40]
// last = 50
```

### Step 3: Return Object
```javascript
return {
  first: 10,
  second: 20,
  last: 50,
  restLength: 2  // panjang rest setelah pop() = [30, 40]
};
```

---

<a name="contoh-penggunaan"></a>
## 💡 Contoh Penggunaan

### Contoh 1: Array Normal

```javascript
const result1 = analyzeArray([1, 2, 3, 4, 5]);

console.log(result1);
```

**Output:**
```javascript
{
  first: 1,
  second: 2,
  last: 5,
  restLength: 2
}
```

**Penjelasan:** Array memiliki 5 elemen. First = 1, second = 2, last = 5. Sisa di tengah ada 2 elemen (3 dan 4).

---

### Contoh 2: Array dengan 3 Elemen

```javascript
const result2 = analyzeArray(['a', 'b', 'c']);

console.log(result2);
```

**Output:**
```javascript
{
  first: 'a',
  second: 'b',
  last: 'c',
  restLength: 0
}
```

**Penjelasan:** Array hanya punya 3 elemen. First = 'a', second = 'b', last = 'c'. Tidak ada sisa elemen di tengah.

---

### Contoh 3: Array dengan 2 Elemen

```javascript
const result3 = analyzeArray([100, 200]);

console.log(result3);
```

**Output:**
```javascript
{
  first: 100,
  second: 200,
  last: null,
  restLength: 0
}
```

**Penjelasan:** Array hanya punya 2 elemen. First = 100, second = 200. Tidak ada elemen ketiga, jadi last = null.

---

### Contoh 4: Array dengan 1 Elemen

```javascript
const result4 = analyzeArray([42]);

console.log(result4);
```

**Output:**
```javascript
{
  first: 42,
  second: null,
  last: null,
  restLength: 0
}
```

**Penjelasan:** Array hanya punya 1 elemen. First = 42. Second dan last tidak ada, jadi keduanya = null.

---

### Contoh 5: Array Kosong

```javascript
const result5 = analyzeArray([]);

console.log(result5);
```

**Output:**
```javascript
{
  first: null,
  second: null,
  last: null,
  restLength: 0
}
```

**Penjelasan:** Array kosong, semua nilai menggunakan default value = null.

---

### Contoh 6: Array dengan Banyak Elemen

```javascript
const result6 = analyzeArray([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

console.log(result6);
```

**Output:**
```javascript
{
  first: 10,
  second: 20,
  last: 100,
  restLength: 7
}
```

**Penjelasan:** First = 10, second = 20, last = 100. Sisa di tengah ada 7 elemen (30, 40, 50, 60, 70, 80, 90).

---

<a name="tips--trik"></a>
## 💎 Tips & Trik

### 1. Kenapa Pakai `|| null` setelah `pop()`?

```javascript
const last = rest.pop() || null;
```

**Alasan:**
- `pop()` akan return `undefined` jika array kosong
- Kita ingin konsisten menggunakan `null` untuk nilai yang tidak ada
- Operator `||` akan memilih `null` jika `pop()` return `undefined`

### 2. Alternatif Tanpa Mengubah Array Original

Kode kita menggunakan `pop()` yang mengubah array `rest`. Jika tidak ingin mengubah array:

```javascript
function analyzeArray(arr) {
  const [first = null, second = null, ...rest] = arr;
  const last = rest.length > 0 ? rest[rest.length - 1] : null;
  return {
    first,
    second,
    last,
    restLength: rest.length > 0 ? rest.length - 1 : 0
  };
}
```

### 3. Shorthand Property Names

Perhatikan return statement:

```javascript
return {
  first,      // sama dengan first: first
  second,     // sama dengan second: second
  last,       // sama dengan last: last
  restLength: rest.length
};
```

Ini adalah ES6 shorthand. Jika nama property sama dengan nama variabel, bisa disingkat.

---

<a name="kesimpulan"></a>
## 🎓 Kesimpulan

### Apa yang Sudah Dipelajari?

✅ **Array Destructuring** - Cara modern mengambil nilai dari array  
✅ **Rest Operator** - Mengumpulkan sisa elemen dengan `...`  
✅ **Default Values** - Memberikan nilai default jika elemen tidak ada  
✅ **Method `pop()`** - Mengambil elemen terakhir dari array  
✅ **Object Shorthand** - Sintaks singkat untuk membuat object  

### Konsep Penting

| Konsep | Sintaks | Kegunaan |
|--------|---------|----------|
| Destructuring | `[a, b] = arr` | Ambil nilai dari array |
| Rest Operator | `...rest` | Kumpulkan sisa elemen |
| Default Value | `a = null` | Nilai cadangan |
| Pop Method | `arr.pop()` | Ambil elemen terakhir |

### Kapan Menggunakan?

Fungsi `analyzeArray` berguna ketika:
- 📊 Perlu analisis cepat struktur array
- 🔍 Ingin tahu elemen first, second, dan last
- 📏 Perlu hitung sisa elemen di tengah
- 🛡️ Butuh handling untuk array kosong atau tidak lengkap

---

<div align="center">

**Happy Coding! 🚀**

*Dokumentasi ini dibuat untuk pembelajaran pribadi*

---

[![JavaScript](https://img.shields.io/badge/Learn%20More-JavaScript-yellow?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>
