# 🎯 Immutability & Array Methods JavaScript

> **Panduan Lengkap untuk Pemula** - Memahami perbedaan mutating vs non-mutating array methods

---

## 📚 Daftar Isi

1. [Apa itu Immutability?](#apa-itu-immutability)
2. [Non-Mutating Methods](#non-mutating-methods)
3. [Mutating Methods](#mutating-methods)
4. [Kapan Pakai Yang Mana?](#kapan-pakai-yang-mana)
5. [Latihan & Tips](#latihan--tips)

---

## 🤔 Apa itu Immutability?

**Immutability** artinya "tidak bisa diubah". Dalam JavaScript, ini berarti membuat data baru daripada mengubah data yang sudah ada.

### Analogi Sederhana 📝

Bayangkan kamu punya **buku catatan asli**:

- **Mutating** = Mencoret-coret langsung di buku asli ❌
- **Non-mutating** = Fotokopi buku, lalu edit fotocopiannya ✅

Buku asli tetap utuh!

```javascript
// Seperti ini maksudnya:
const bukuAsli = ['Halaman 1', 'Halaman 2', 'Halaman 3'];

// Non-mutating: Bikin salinan baru
const bukuBaru = bukuAsli.map(hal => hal + ' (edited)');
console.log(bukuAsli); // Masih asli! ✨

// Mutating: Ubah langsung buku asli
bukuAsli.push('Halaman 4');
console.log(bukuAsli); // Berubah! 😱
```

---

## ✨ Non-Mutating Methods

Method-method ini **TIDAK mengubah** array original. Mereka membuat **array baru**.

### 1. `.map()` - Transformasi Setiap Element

**Fungsi:** Ubah setiap item dalam array jadi bentuk baru.

```javascript
const angka = [1, 2, 3, 4, 5];

// Kali 2 setiap angka
const angkaKaliDua = angka.map(num => num * 2);

console.log(angka);          // [1, 2, 3, 4, 5] ← TETAP SAMA!
console.log(angkaKaliDua);   // [2, 4, 6, 8, 10] ← ARRAY BARU!
```

**Kapan pakai?** Ketika ingin mengubah SEMUA item dalam array.

**Contoh Real-World:**

```javascript
const users = [
  { name: 'Budi', age: 20 },
  { name: 'Ani', age: 25 },
  { name: 'Citra', age: 30 }
];

// Ambil nama-nama saja
const names = users.map(user => user.name);
console.log(names); // ['Budi', 'Ani', 'Citra']
```

---

### 2. `.filter()` - Saring/Filter Element

**Fungsi:** Ambil hanya item yang memenuhi kondisi tertentu.

```javascript
const scores = [45, 67, 89, 34, 92, 78];

// Ambil nilai yang >= 70 (lulus)
const lulus = scores.filter(score => score >= 70);

console.log(scores); // [45, 67, 89, 34, 92, 78] ← TETAP!
console.log(lulus);  // [89, 92, 78] ← ARRAY BARU!
```

**Kapan pakai?** Ketika ingin memilih item berdasarkan kriteria.

**Contoh Real-World:**

```javascript
const products = [
  { name: 'Laptop', price: 10000000 },
  { name: 'Mouse', price: 150000 },
  { name: 'Keyboard', price: 500000 }
];

// Produk di bawah 1 juta
const affordable = products.filter(p => p.price < 1000000);
console.log(affordable); 
// [{ name: 'Mouse', ... }, { name: 'Keyboard', ... }]
```

---

### 3. `.reduce()` - Gabungkan Jadi Satu Nilai

**Fungsi:** Menggabungkan semua element jadi satu nilai (total, object, string, dll).

```javascript
const prices = [10000, 25000, 15000, 30000];

// Hitung total harga
const total = prices.reduce((sum, price) => sum + price, 0);

console.log(prices); // [10000, 25000, 15000, 30000] ← TETAP!
console.log(total);  // 80000 ← NILAI BARU!
```

**Cara kerja `.reduce()`:**

```javascript
// Syntax: array.reduce((accumulator, currentValue) => { ... }, initialValue)

const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((acc, num) => {
  console.log(`acc: ${acc}, num: ${num}`);
  return acc + num;
}, 0);

// Output:
// acc: 0, num: 1 → return 1
// acc: 1, num: 2 → return 3
// acc: 3, num: 3 → return 6
// acc: 6, num: 4 → return 10
```

**Contoh Real-World:**

```javascript
const cart = [
  { item: 'Buku', price: 50000, qty: 2 },
  { item: 'Pulpen', price: 5000, qty: 5 },
  { item: 'Penggaris', price: 3000, qty: 1 }
];

// Hitung total belanja
const totalBelanja = cart.reduce((total, product) => {
  return total + (product.price * product.qty);
}, 0);

console.log(totalBelanja); // 128000
```

---

### 4. Method Non-Mutating Lainnya

```javascript
const arr = [1, 2, 3, 4, 5];

// .slice() - Potong sebagian array
const potongan = arr.slice(1, 3);
console.log(potongan); // [2, 3]
console.log(arr);      // [1, 2, 3, 4, 5] ← TETAP!

// .concat() - Gabungkan array
const arr2 = [6, 7, 8];
const gabungan = arr.concat(arr2);
console.log(gabungan); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arr);      // [1, 2, 3, 4, 5] ← TETAP!

// Spread operator [...] - Clone array
const clone = [...arr];
clone.push(99);
console.log(arr);   // [1, 2, 3, 4, 5] ← TETAP!
console.log(clone); // [1, 2, 3, 4, 5, 99]
```

---

## ⚠️ Mutating Methods

Method-method ini **MENGUBAH** array original secara langsung!

### ⚡ Daftar Mutating Methods

```javascript
const arr = [1, 2, 3, 4, 5];

// .push() - Tambah di akhir
arr.push(6);
console.log(arr); // [1, 2, 3, 4, 5, 6] ← BERUBAH!

// .pop() - Hapus dari akhir
arr.pop();
console.log(arr); // [1, 2, 3, 4, 5] ← BERUBAH!

// .unshift() - Tambah di awal
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3, 4, 5] ← BERUBAH!

// .shift() - Hapus dari awal
arr.shift();
console.log(arr); // [1, 2, 3, 4, 5] ← BERUBAH!

// .splice() - Hapus/Tambah di tengah
arr.splice(2, 1, 99); // Hapus 1 item di index 2, ganti dengan 99
console.log(arr); // [1, 2, 99, 4, 5] ← BERUBAH!

// .reverse() - Balik urutan
arr.reverse();
console.log(arr); // [5, 4, 99, 2, 1] ← BERUBAH!

// .sort() - Urutkan
arr.sort();
console.log(arr); // [1, 2, 4, 5, 99] ← BERUBAH!
```

### 🚨 Hati-hati dengan Mutating Methods!

```javascript
// MASALAH: Reference sama!
const original = [1, 2, 3];
const copy = original; // INI BUKAN COPY, tapi reference yang sama!

copy.push(4);
console.log(original); // [1, 2, 3, 4] ← Ikut berubah! 😱
console.log(copy);     // [1, 2, 3, 4]

// SOLUSI: Clone dulu pakai spread operator
const original2 = [1, 2, 3];
const copy2 = [...original2]; // Clone beneran

copy2.push(4);
console.log(original2); // [1, 2, 3] ← Aman! ✅
console.log(copy2);     // [1, 2, 3, 4]
```

---

## 🎯 Kapan Pakai Yang Mana?

### ✅ Pakai Non-Mutating Methods Ketika:

1. **Bekerja dengan React/Vue/Framework modern** - State harus immutable
2. **Functional Programming** - Pure functions tidak boleh mengubah input
3. **Predictability** - Lebih mudah debug karena data original tidak berubah
4. **Undo/Redo features** - Perlu history data

```javascript
// ✅ GOOD - Immutable approach (React friendly)
const [todos, setTodos] = useState([...]);

const addTodo = (newTodo) => {
  setTodos([...todos, newTodo]); // Bikin array baru
};

// ❌ BAD - Mutating approach
const addTodoWrong = (newTodo) => {
  todos.push(newTodo); // Ubah langsung (React tidak detect!)
  setTodos(todos);
};
```

### ⚡ Pakai Mutating Methods Ketika:

1. **Performance critical** - Mutating lebih cepat untuk array besar
2. **Simple scripts** - Tidak ada state management kompleks
3. **Memang ingin ubah original** - Sudah pasti tidak akan masalah

```javascript
// OK untuk simple script
let numbers = [1, 2, 3];
numbers.push(4);
numbers.push(5);
console.log(numbers); // [1, 2, 3, 4, 5]
```

---

## 📊 Tabel Perbandingan

| Method | Mutating? | Fungsi | Return Value |
|--------|-----------|--------|--------------|
| `.map()` | ❌ No | Transform setiap item | Array baru |
| `.filter()` | ❌ No | Filter berdasarkan kondisi | Array baru |
| `.reduce()` | ❌ No | Gabungkan jadi 1 nilai | Nilai apa saja |
| `.slice()` | ❌ No | Potong sebagian array | Array baru |
| `.concat()` | ❌ No | Gabungkan array | Array baru |
| `.push()` | ✅ Yes | Tambah di akhir | Length baru |
| `.pop()` | ✅ Yes | Hapus dari akhir | Item yang dihapus |
| `.shift()` | ✅ Yes | Hapus dari awal | Item yang dihapus |
| `.unshift()` | ✅ Yes | Tambah di awal | Length baru |
| `.splice()` | ✅ Yes | Hapus/tambah di mana saja | Array yang dihapus |
| `.reverse()` | ✅ Yes | Balik urutan | Array yang dibalik |
| `.sort()` | ✅ Yes | Urutkan | Array yang diurutkan |

---

## 💡 Latihan & Tips

### Latihan 1: Transformasi Data

```javascript
// Ubah data ini jadi format yang lebih berguna
const students = [
  { name: 'Andi', math: 80, english: 75 },
  { name: 'Budi', math: 90, english: 85 },
  { name: 'Citra', math: 70, english: 95 }
];

// TODO: Bikin array berisi nama siswa + rata-rata nilai
// Expected: [{ name: 'Andi', average: 77.5 }, ...]

const result = students.map(student => ({
  name: student.name,
  average: (student.math + student.english) / 2
}));

console.log(result);
```

### Latihan 2: Filtering & Chaining

```javascript
// Chain methods untuk hasil yang kompleks
const products = [
  { name: 'Laptop', price: 15000000, category: 'electronics' },
  { name: 'Meja', price: 1500000, category: 'furniture' },
  { name: 'Mouse', price: 200000, category: 'electronics' },
  { name: 'Kursi', price: 2000000, category: 'furniture' }
];

// TODO: Ambil produk electronics, harga < 10jt, lalu ambil namanya saja
const result = products
  .filter(p => p.category === 'electronics')
  .filter(p => p.price < 10000000)
  .map(p => p.name);

console.log(result); // ['Mouse']
```

### Latihan 3: Reduce untuk Object

```javascript
// Grouping data dengan reduce
const orders = [
  { product: 'Laptop', category: 'electronics', price: 15000000 },
  { product: 'Mouse', category: 'electronics', price: 200000 },
  { product: 'Meja', category: 'furniture', price: 1500000 }
];

// TODO: Group by category
const grouped = orders.reduce((acc, order) => {
  const category = order.category;
  
  if (!acc[category]) {
    acc[category] = [];
  }
  
  acc[category].push(order);
  return acc;
}, {});

console.log(grouped);
// {
//   electronics: [{ product: 'Laptop', ... }, { product: 'Mouse', ... }],
//   furniture: [{ product: 'Meja', ... }]
// }
```

---

## 🎓 Tips Pro

### 1. Selalu Return di `.map()`

```javascript
// ❌ SALAH - Lupa return
const doubled = [1, 2, 3].map(num => {
  num * 2; // Lupa return!
});
console.log(doubled); // [undefined, undefined, undefined]

// ✅ BENAR
const doubled2 = [1, 2, 3].map(num => {
  return num * 2;
});
console.log(doubled2); // [2, 4, 6]

// ✅ BENAR - Implicit return (tanpa {})
const doubled3 = [1, 2, 3].map(num => num * 2);
console.log(doubled3); // [2, 4, 6]
```

### 2. `.filter()` Harus Return Boolean

```javascript
// ❌ SALAH
const adults = users.filter(user => user.age); // Return number!

// ✅ BENAR
const adults2 = users.filter(user => user.age >= 18); // Return boolean
```

### 3. Clone Deep Objects

```javascript
// ⚠️ HATI-HATI: Spread hanya shallow copy
const original = [{ name: 'Andi', scores: [80, 90] }];
const copy = [...original];

copy[0].scores.push(100); // Nested array tetap reference!
console.log(original[0].scores); // [80, 90, 100] ← Berubah! 😱

// ✅ SOLUSI: Deep clone
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy[0].scores.push(100);
console.log(original[0].scores); // [80, 90] ← Aman! ✅
```

---

## 📚 Resources Belajar

### Dokumentasi
- [MDN Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info - Array Methods](https://javascript.info/array-methods)

### Tutorial
- [freeCodeCamp - Functional Programming](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/#functional-programming)
- [JavaScript Array Methods Tutorial (YouTube)](https://www.youtube.com/results?search_query=javascript+array+methods)

### Practice
- [Codewars - Array Challenges](https://www.codewars.com/)
- [LeetCode - Array Problems](https://leetcode.com/problemset/all/?topicSlugs=array)
- [Exercism - JavaScript Track](https://exercism.org/tracks/javascript)

---

## 🎯 Kesimpulan

**Key Takeaways:**

1. **Non-mutating methods** (map, filter, reduce) = Array baru, original tetap
2. **Mutating methods** (push, pop, splice) = Ubah array original
3. **Framework modern** lebih suka immutable approach
4. **Clone array** pakai spread `[...]` atau `Array.from()`
5. **Practice, practice, practice!** 🚀

**Next Steps:**
- Latih di Codewars/LeetCode setiap hari (15-30 menit)
- Bikin mini project: Todo App, Shopping Cart, dll
- Pelajari konsep "Pure Functions" untuk level selanjutnya

---

💪 **Semangat belajar! Kamu pasti bisa!**
