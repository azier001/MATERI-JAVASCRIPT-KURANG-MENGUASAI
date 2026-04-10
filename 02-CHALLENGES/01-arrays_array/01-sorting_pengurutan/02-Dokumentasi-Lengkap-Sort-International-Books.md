# 📚 Dokumentasi Lengkap: Sort International Books

> **Dokumentasi belajar step-by-step untuk pemula** - Dari nol sampai mahir!

---

## 📑 Daftar Isi

### 🎯 Pendahuluan
- [Tentang Dokumentasi Ini](#tentang-dokumentasi-ini)
- [Problem Statement](#problem-statement)
- [Test Cases & Expected Output](#test-cases)

### 🎓 Perjalanan Belajar Step-by-Step
- [Langkah 1: Validasi Input](#langkah-1)
- [Langkah 2: Membuat Array of Objects](#langkah-2)
- [Langkah 3: Sorting Data](#langkah-3)
- [Langkah 4a: Variabel Tracking](#langkah-4a)
- [Langkah 4b: Logic Continue](#langkah-4b)
- [Langkah 4c: Logic Break](#langkah-4c)
- [Langkah 5: Format Output](#langkah-5)

### 💻 Implementasi Kode
- [Kode 1: Original Step-by-Step](#kode-1)
- [Kode 2: Functional Style](#kode-2)
- [Kode 3: Compact Version](#kode-3)
- [Kode 4: Optimized Version (TERBAIK!)](#kode-4)
- [Kode 5: Coddy's Approach](#kode-5)

### 🔍 Analisis Mendalam
- [Perbandingan Semua Kode](#perbandingan-kode)
- [Object vs String Approach](#object-vs-string)
- [Bug Analysis - Coddy's Code](#bug-analysis)
- [Naming Convention Best Practices](#naming-convention)

### ⚡ Cheat Sheet
- [Quick Reference](#cheat-sheet)
- [Common Pitfalls](#common-pitfalls)
- [Decision Tree](#decision-tree)

### 🎯 Penutup
- [Key Takeaways](#key-takeaways)
- [Next Steps](#next-steps)

---

<a name="tentang-dokumentasi-ini"></a>
## 🎯 Tentang Dokumentasi Ini

### 📖 Apa Ini?
Dokumentasi ini adalah **catatan lengkap perjalanan belajar** untuk menyelesaikan coding challenge "Sort International Books". Dibuat dengan pendekatan **step-by-step untuk pemula**.

### 🎓 Siapa Target-nya?
- ✅ Pemula yang baru belajar JavaScript
- ✅ Developer yang ingin improve naming convention
- ✅ Siapa saja yang suka belajar dengan contoh nyata

### 💡 Kenapa Dokumentasi Ini Penting?
- 📝 **Reference pribadi** yang bisa dibaca kapan saja
- 🔄 **Tracking progress** dari nol sampai optimal
- 🎯 **Best practices** yang bisa diterapkan di project lain

---

<a name="problem-statement"></a>
## 📋 Problem Statement

### 🎯 Challenge: Sort International Books

Anda membantu acara sorting buku internasional di perpustakaan. Tugas Anda adalah:

**Input:**
- `bookTitles` (array): Judul-judul buku
- `countries` (array): Negara asal masing-masing buku

**Proses:**
1. ✅ Gabungkan setiap buku dengan negara dalam format `"Title - Country"`
2. ✅ Sort alfabetis berdasarkan title
3. ✅ Maksimal **5 buku per negara** (gunakan `continue`)
4. ✅ Stop setelah **20 buku total** (gunakan `break`)

**Output:**
- Array string dengan format `"Title - Country"`

**Aturan Penting:**
- ⚠️ Jika array kosong atau panjang berbeda → return `[]`
- ⚠️ **HARUS** pakai `continue` untuk skip buku
- ⚠️ **HARUS** pakai `break` untuk stop di 20 buku

---

<a name="test-cases"></a>
## 🧪 Test Cases & Expected Output

### Test Case 1: Normal Case
```javascript
const titles1 = [
  "The Great Gatsby", "1984", "To Kill a Mockingbird", 
  "Pride and Prejudice", "The Catcher in the Rye",
  "Animal Farm", "Brave New World", "Lord of the Flies",
  "Jane Eyre", "Wuthering Heights", "Great Expectations",
  "Oliver Twist", "Emma", "Sense and Sensibility",
  "Frankenstein", "Dracula", "The Hobbit",
  "The Lord of the Rings", "Harry Potter", "The Chronicles of Narnia"
];

const countries1 = [
  "USA", "UK", "USA", "UK", "USA",
  "UK", "UK", "UK", "UK", "UK",
  "UK", "UK", "UK", "UK", "UK",
  "Ireland", "Ireland", "UK", "UK", "UK"
];
```

**Expected Output:** 20 buku (maksimal 5 dari UK, 3 dari USA, 2 dari Ireland)

### Test Case 2: Tepat 20 Buku
```javascript
const titles2 = ["Book A", "Book B", ..., "Book T"]; // 20 buku
const countries2 = ["France", "Germany", ..., "Portugal"];
```

**Expected Output:** Semua 20 buku masuk

### Test Case 3: Lebih dari 5 Buku dari Negara yang Sama
```javascript
const titles3 = ["Alpha", "Beta", "Gamma", ..., "Kappa"];
const countries3 = ["Japan", "Japan", "Japan", ..., "Korea"];
```

**Expected Output:** Maksimal 5 dari Japan, sisanya Korea

### Test Case 4: Array Kosong
```javascript
sortInternationalBooks([], [])
```

**Expected Output:** `[]`

### Test Case 5: Panjang Berbeda
```javascript
sortInternationalBooks(["Book1", "Book2"], ["Country1"])
```

**Expected Output:** `[]`

---

<a name="langkah-1"></a>
## 🎓 Langkah 1: Validasi Input

### 📝 Konsep
Sebelum memproses data, kita harus **validasi input** terlebih dahulu untuk menghindari error.

### ✅ Yang Perlu Dicek:
1. ❌ Apakah array kosong?
2. ❌ Apakah panjang kedua array sama?

### 💻 Implementasi Pertama:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  const isValidInput =
    bookTitles.length > 0 &&
    countries.length > 0 &&
    bookTitles.length === countries.length;

  if (!isValidInput) return [];

  return 'Valid input';
};
```

### 🔍 Review Naming Convention:

| Variable | Status | Alasan |
|----------|--------|--------|
| `isValidInput` | ✅ Excellent | Prefix `is` untuk boolean, sangat jelas |
| `bookTitles` | ✅ Good | Plural, menunjukkan array |
| `countries` | ✅ Good | Plural, konsisten |

### 💡 Alternatif Naming:
```javascript
// Lebih semantic (menunjukkan state)
const hasValidInput = /* ... */;
```

**Kesimpulan Langkah 1:** ✅ Validasi sudah bekerja dengan baik!

---

<a name="langkah-2"></a>
## 🎓 Langkah 2: Membuat Array of Objects

### 📝 Konsep
Kita bisa pakai 2 pendekatan:
1. **Array of Objects** ← Kita pilih ini!
2. Array of Strings

### 🤔 Kenapa Pilih Objects?

**✅ Kelebihan Objects:**
- Data terstruktur dan mudah diakses
- Mudah untuk tracking buku per negara
- Tidak perlu parsing string
- Lebih flexible dan maintainable

**❌ Kekurangan Strings:**
- Harus `split()` untuk extract data
- Rawan error jika title punya karakter `" - "`
- Kurang flexible

### 💻 Implementasi:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  const isValidInput =
    bookTitles.length > 0 &&
    countries.length > 0 &&
    bookTitles.length === countries.length;

  if (!isValidInput) return [];

  const bookEntries = [];

  for (let i = 0; i < bookTitles.length; i++) {
    const bookEntry = {
      title: bookTitles[i],
      country: countries[i],
    };

    bookEntries.push(bookEntry);
  }

  return bookEntries;
};
```

### 🔍 Review Naming:

| Variable | Status | Alasan |
|----------|--------|--------|
| `bookEntries` | ✅ Good | Plural untuk array, jelas |
| `bookEntry` | ✅ Good | Singular untuk object, konsisten |
| `i` | ✅ Standard | Umum untuk index |

**Output Langkah 2:**
```javascript
[
  { title: "Book A", country: "USA" },
  { title: "Book B", country: "UK" }
]
```

---

<a name="langkah-3"></a>
## 🎓 Langkah 3: Sorting Data

### 📝 Konsep
Kita perlu mengurutkan array **alfabetis berdasarkan title**.

### 💻 Implementasi:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  // ... validasi & create objects

  const sorted = bookEntries.sort((bookA, bookB) =>
    bookA.title.localeCompare(bookB.title)
  );

  return sorted;
};
```

### 🔍 Penjelasan Method:

**`.sort()` dengan compare function:**
```javascript
array.sort((a, b) => {
  // Return negatif: a sebelum b
  // Return 0: tidak berubah
  // Return positif: b sebelum a
});
```

**`.localeCompare()` untuk string:**
```javascript
"apple".localeCompare("banana") // -1 (apple < banana)
"zebra".localeCompare("apple")  // 1 (zebra > apple)
```

### 💡 Tips:
Bisa langsung tanpa variable `sorted`:
```javascript
bookEntries.sort((bookA, bookB) => 
  bookA.title.localeCompare(bookB.title)
);
return bookEntries;
```

**Output Langkah 3:** Array sudah terurut A-Z!

---

<a name="langkah-4a"></a>
## 🎓 Langkah 4a: Variabel Tracking

### 📝 Konsep
Sebelum filtering, kita perlu variabel untuk **tracking**:
1. 📦 Hasil akhir (array)
2. 📊 Jumlah buku per negara (object)

### 💻 Implementasi:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  // ... validasi, create objects, sorting

  const sorted = bookEntries.sort((bookA, bookB) =>
    bookA.title.localeCompare(bookB.title)
  );

  const filteredBooks = [];
  const countryCount = {};

  return filteredBooks;
};
```

### 🔍 Penjelasan Variabel:

**`filteredBooks = []`**
- Array kosong untuk menyimpan hasil akhir
- Maksimal 20 buku

**`countryCount = {}`**
- Object untuk tracking jumlah buku per negara
- Format: `{ "USA": 3, "UK": 5, "Japan": 2 }`

### 💡 Alternatif Naming (Better):
```javascript
const selectedBooks = [];      // Lebih semantic
const countryUsage = {};       // Lebih descriptive
const booksPerCountry = {};    // Sangat jelas
```

---

<a name="langkah-4b"></a>
## 🎓 Langkah 4b: Logic Continue (Max 5 per Negara)

### 📝 Konsep
Kita perlu **skip buku** jika negara sudah punya 5 buku menggunakan `continue`.

### 💻 Implementasi dengan Debug:

```javascript
for (const book of sorted) {
  const country = book.country;

  console.log(`Processing: ${book.title} (${country})`);

  // Inisialisasi jika negara belum ada
  if (!countryCount[country]) {
    countryCount[country] = 0;
    console.log(`✨ First book from ${country}`);
  }

  console.log(`Current count: ${countryCount[country]}`);

  // Cek apakah sudah 5 buku
  if (countryCount[country] >= 5) {
    console.log(`❌ SKIP: ${country} already has 5 books`);
    continue; // Skip buku ini!
  }

  // Push ke hasil
  filteredBooks.push(book);
  console.log(`✅ ADDED`);

  // Increment counter
  countryCount[country]++;
  console.log(`Total books: ${filteredBooks.length}`);
}
```

### 🔍 Cara Kerja `continue`:

```javascript
for (const book of sorted) {
  if (condition) {
    continue; // Langsung loncat ke iterasi berikutnya
  }
  
  // Code ini akan di-skip jika continue dijalankan
  console.log("This won't run if continue is executed");
}
```

### 💡 Key Points:
- ✅ `continue` hanya untuk **skip iterasi saat ini**
- ✅ Loop tetap jalan untuk item berikutnya
- ✅ Sempurna untuk kondisi "maksimal 5 per negara"

---

<a name="langkah-4c"></a>
## 🎓 Langkah 4c: Logic Break (Stop di 20 Buku)

### 📝 Konsep
Kita perlu **stop loop** setelah 20 buku menggunakan `break`.

### 💻 Implementasi:

```javascript
for (const book of sorted) {
  // CEK DI AWAL LOOP!
  if (filteredBooks.length >= 20) {
    console.log('🛑 STOP: Already have 20 books');
    break; // Stop seluruh loop!
  }

  const country = book.country;

  if (!countryCount[country]) countryCount[country] = 0;

  if (countryCount[country] >= 5) continue;

  filteredBooks.push(book);
  countryCount[country]++;
}
```

### 🔍 Cara Kerja `break`:

```javascript
for (const book of sorted) {
  if (condition) {
    break; // STOP seluruh loop, keluar sepenuhnya
  }
  
  // Code ini tidak akan pernah dijalankan setelah break
  console.log("This won't run after break");
}
// Eksekusi lanjut ke sini setelah break
```

### 💡 Perbedaan `continue` vs `break`:

| Keyword | Fungsi | Analogi |
|---------|--------|---------|
| `continue` | Skip iterasi ini, lanjut ke berikutnya | ⏭️ Skip lagu |
| `break` | Stop seluruh loop | ⏹️ Stop music player |

### ⚠️ Urutan Penting:
```javascript
// ✅ BENAR: Cek break di AWAL
if (filteredBooks.length >= 20) break;
if (countryCount[country] >= 5) continue;
filteredBooks.push(book);

// ❌ SALAH: Cek break di AKHIR
filteredBooks.push(book);
if (filteredBooks.length >= 20) break; // Sudah 21 buku!
```

---

<a name="langkah-5"></a>
## 🎓 Langkah 5: Format Output

### 📝 Konsep
Convert array of objects menjadi array of strings dengan format `"Title - Country"`.

### 💻 Implementasi:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  // ... semua logic sebelumnya

  return filteredBooks.map((book) => `${book.title} - ${book.country}`);
};
```

### 🔍 Penjelasan `.map()`:

**Dari:**
```javascript
[
  { title: "Book A", country: "USA" },
  { title: "Book B", country: "UK" }
]
```

**Menjadi:**
```javascript
[
  "Book A - USA",
  "Book B - UK"
]
```

### 💡 Alternatif (Destructuring):
```javascript
return filteredBooks.map(({ title, country }) => 
  `${title} - ${country}`
);
```

### ✨ Optimasi Super:
Push langsung dalam format string!
```javascript
// Di dalam loop
filteredBooks.push(`${book.title} - ${book.country}`);

// Tidak perlu map lagi
return filteredBooks;
```

**🎉 SELESAI! Kode lengkap sudah jadi!**

---

<a name="kode-1"></a>
## 💻 Kode 1: Original Step-by-Step

### 📌 Karakteristik
- ✅ Mengikuti proses belajar step-by-step
- ✅ Explicit variables untuk clarity
- ✅ Traditional loop
- ✅ Easy to understand untuk pemula

### 📝 Kode Lengkap:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  const isValidInput =
    bookTitles.length > 0 &&
    countries.length > 0 &&
    bookTitles.length === countries.length;

  if (!isValidInput) return [];

  const bookEntries = [];

  for (let i = 0; i < bookTitles.length; i++) {
    const bookEntry = {
      title: bookTitles[i],
      country: countries[i],
    };
    bookEntries.push(bookEntry);
  }

  const sorted = bookEntries.sort((bookA, bookB) =>
    bookA.title.localeCompare(bookB.title)
  );

  const filteredBooks = [];
  const countryCount = {};

  for (const book of sorted) {
    if (filteredBooks.length >= 20) break;

    const country = book.country;

    if (!countryCount[country]) countryCount[country] = 0;

    if (countryCount[country] >= 5) continue;

    filteredBooks.push(book);
    countryCount[country]++;
  }

  return filteredBooks.map((book) => `${book.title} - ${book.country}`);
};
```

### ⭐ Rating:

| Aspek | Score | Keterangan |
|-------|-------|------------|
| Readability | ⭐⭐⭐⭐⭐ | Sangat mudah dipahami |
| Performance | ⭐⭐⭐⭐ | Baik, ada extra `.map()` di akhir |
| Maintainability | ⭐⭐⭐⭐ | Explicit, mudah di-maintain |
| Modern JS | ⭐⭐⭐ | Standard, belum optimal |

---

<a name="kode-2"></a>
## 💻 Kode 2: Functional Style

### 📌 Karakteristik
- ✅ Menggunakan `.map()` untuk create objects
- ✅ More declarative approach
- ✅ Better naming convention
- ✅ Functional programming style

### 📝 Kode Lengkap:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  if (!bookTitles.length || bookTitles.length !== countries.length) {
    return [];
  }

  const books = bookTitles.map((title, index) => ({
    title,
    country: countries[index]
  }));

  const sortedBooks = books.sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  const filteredBooks = [];
  const booksPerCountry = {};

  for (const book of sortedBooks) {
    if (filteredBooks.length >= 20) break;

    const currentCount = booksPerCountry[book.country] || 0;
    if (currentCount >= 5) continue;

    filteredBooks.push(book);
    booksPerCountry[book.country] = currentCount + 1;
  }

  return filteredBooks.map(({ title, country }) => 
    `${title} - ${country}`
  );
};
```

### 🔍 Improvements:

| Aspect | Improvement |
|--------|-------------|
| Validation | Lebih concise |
| Object Creation | Pakai `.map()` (functional) |
| Naming | `booksPerCountry` lebih descriptive |
| Destructuring | Pakai destructuring di `.map()` |

### ⭐ Rating:

| Aspek | Score | Keterangan |
|-------|-------|------------|
| Readability | ⭐⭐⭐⭐ | Clean dan jelas |
| Performance | ⭐⭐⭐⭐ | Sama seperti #1 |
| Maintainability | ⭐⭐⭐⭐⭐ | Excellent structure |
| Modern JS | ⭐⭐⭐⭐ | Functional approach |

---

<a name="kode-3"></a>
## 💻 Kode 3: Compact Version

### 📌 Karakteristik
- ✅ Method chaining `.map().sort()`
- ✅ Lebih ringkas
- ✅ Balanced readability & conciseness
- ✅ Good for experienced developers

### 📝 Kode Lengkap:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  if (!bookTitles.length || bookTitles.length !== countries.length) {
    return [];
  }

  const books = bookTitles
    .map((title, idx) => ({ title, country: countries[idx] }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const result = [];
  const countByCountry = {};

  for (const book of books) {
    if (result.length >= 20) break;

    const count = countByCountry[book.country] || 0;
    if (count >= 5) continue;

    result.push(book);
    countByCountry[book.country] = count + 1;
  }

  return result.map(({ title, country }) => `${title} - ${country}`);
};
```

### 🔍 Key Features:

| Feature | Penjelasan |
|---------|------------|
| Method Chaining | `.map().sort()` dalam satu statement |
| `idx` | Abbreviation umum untuk `index` |
| `result` | Simple dan jelas |
| `countByCountry` | Descriptive naming |

### ⭐ Rating:

| Aspek | Score | Keterangan |
|-------|-------|------------|
| Readability | ⭐⭐⭐⭐ | Compact tapi tetap jelas |
| Performance | ⭐⭐⭐⭐ | Sama seperti sebelumnya |
| Maintainability | ⭐⭐⭐⭐ | Good balance |
| Modern JS | ⭐⭐⭐⭐ | Chaining + destructuring |

---

<a name="kode-4"></a>
## 💻 Kode 4: Optimized Version ⭐ TERBAIK!

### 📌 Karakteristik
- ✅ **Push langsung formatted string** (no extra `.map()`)
- ✅ Modern operator `??=` (nullish coalescing assignment)
- ✅ **Best naming convention**
- ✅ Most efficient implementation

### 📝 Kode Lengkap:

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  const hasValidInput =
    bookTitles.length > 0 &&
    countries.length > 0 &&
    bookTitles.length === countries.length;

  if (!hasValidInput) return [];

  const books = bookTitles.map((title, index) => ({
    title,
    country: countries[index],
  }));

  books.sort((a, b) => a.title.localeCompare(b.title));

  const countryUsage = {};
  const selectedBooks = [];

  for (const book of books) {
    if (selectedBooks.length >= 20) break;

    const { country } = book;
    countryUsage[country] ??= 0;

    if (countryUsage[country] === 5) continue;

    selectedBooks.push(`${book.title} - ${country}`);
    countryUsage[country]++;
  }

  return selectedBooks;
};
```

### 🔍 Why This is The BEST:

**1. Naming Excellence:**
| Variable | Why Better |
|----------|------------|
| `hasValidInput` | Semantic, menunjukkan state |
| `countryUsage` | Super descriptive! |
| `selectedBooks` | Jelas maksudnya |

**2. Modern Operator `??=`:**
```javascript
// Sebelum
if (!countryUsage[country]) countryUsage[country] = 0;

// Sesudah (Modern!)
countryUsage[country] ??= 0;
```

**3. Performance Optimization:**
```javascript
// Langsung push formatted string
selectedBooks.push(`${book.title} - ${country}`);

// Tidak perlu .map() lagi di akhir! ✨
return selectedBooks;
```

**4. Destructuring:**
```javascript
const { country } = book; // Clean!
```

### ⭐ Rating:

| Aspek | Score | Keterangan |
|-------|-------|------------|
| Readability | ⭐⭐⭐⭐⭐ | Perfect naming |
| Performance | ⭐⭐⭐⭐⭐ | Optimal! No extra map |
| Maintainability | ⭐⭐⭐⭐⭐ | Excellent |
| Modern JS | ⭐⭐⭐⭐⭐ | Uses `??=` operator |

### 🏆 **WINNER! Ini kode terbaik untuk production!**

---

<a name="kode-5"></a>
## 💻 Kode 5: Coddy's Approach

### 📌 Karakteristik
- ✅ String-based approach (bukan object)
- ✅ Sangat compact
- ❌ Harus parsing dengan `.split()`
- ⚠️ Ada bug di logic counter

### 📝 Kode Lengkap:

```javascript
function sortInternationalBooks(bookTitles, countries) {
  if (!bookTitles || !countries || bookTitles.length !== countries.length) {
    return [];
  }

  const combinedBooks = bookTitles.map((title, index) => 
    `${title} - ${countries[index]}`
  );

  const sortedBooks = combinedBooks.sort((a, b) => a.localeCompare(b));

  const result = [];
  const countryCount = {};

  for (const book of sortedBooks) {
    const country = book.split(' - ')[1];
    countryCount[country] = (countryCount[country] || 0) + 1;

    if (countryCount[country] > 5) continue;

    result.push(book);

    if (result.length === 20) break;
  }

  return result;
}
```

### ⚠️ Masalah & Bug:

**Bug 1: Counter Logic Salah**
```javascript
countryCount[country] = (countryCount[country] || 0) + 1;
if (countryCount[country] > 5) continue; // ❌ Salah!

// Book ke-6 akan masuk dulu baru di-skip
// Hasil: bisa dapat 6 buku per negara!
```

**Fix:**
```javascript
// Cek SEBELUM increment
if (countryCount[country] >= 5) continue;
countryCount[country] = (countryCount[country] || 0) + 1;
```

**Bug 2: String Splitting Rawan Error**
```javascript
const country = book.split(' - ')[1];

// Jika title punya " - " di dalamnya:
book = "War - And Peace - Russia"
country = "And Peace" // ❌ SALAH! (harusnya "Russia")
```

### 🔍 Pros & Cons:

**Pros:**
- ✅ Sangat compact
- ✅ Sedikit transformasi

**Cons:**
- ❌ Bug di counter logic
- ❌ Rawan error jika title punya `" - "`
- ❌ Harus parsing string (not elegant)
- ❌ Kurang maintainable

### ⭐ Rating:

| Aspek | Score | Keterangan |
|-------|-------|------------|
| Readability | ⭐⭐⭐ | OK tapi ada parsing |
| Performance | ⭐⭐⭐⭐⭐ | Efficient |
| Maintainability | ⭐⭐ | Sulit maintain, ada bug |
| Modern JS | ⭐⭐⭐ | Standard |

### 💡 Kesimpulan:
Approach ini **OK untuk quick challenge**, tapi **TIDAK untuk production** karena ada bug dan less robust.

---

<a name="perbandingan-kode"></a>
## 🔍 Perbandingan Semua Kode

### 📊 Comparison Table:

| Kode | Readability | Performance | Maintainability | Modern JS | Best For |
|------|-------------|-------------|-----------------|-----------|----------|
| **#1 Original** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 📚 Learning |
| **#2 Functional** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 💼 Balance |
| **#3 Compact** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⚡ Quick |
| **#4 Optimized** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 🏆 **Production** |
| **#5 Coddy** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | 🚫 Not Recommended |

### 🎯 Rekomendasi Penggunaan:

```
┌─────────────────────────────────────┐
│  Skenario → Pilih Kode              │
├─────────────────────────────────────┤
│  📚 Belajar pertama kali → #1       │
│  💼 Interview coding → #4           │
│  🏢 Production code → #4            │
│  ⚡ Quick challenge → #3            │
│  🎓 Teach others → #2               │
│  🚫 Avoid → #5                      │
└─────────────────────────────────────┘
```

---

<a name="object-vs-string"></a>
## 🔍 Object vs String Approach

### 📊 Perbandingan Mendalam:

#### **Approach 1: Array of Objects** (Kode #1-#4)

**Structure:**
```javascript
[
  { title: "Book A", country: "USA" },
  { title: "Book B", country: "UK" }
]
```

**✅ Kelebihan:**
- 🎯 Data terstruktur, mudah diakses
- 🔒 Type-safe, tidak ada parsing
- 🛠️ Mudah untuk tracking per negara
- 📈 Scalable (mudah tambah property)
- 🐛 Tidak ada bug potential dari parsing

**❌ Kekurangan:**
- 📦 Perlu extra `.map()` di akhir (kecuali #4)
- 💾 Sedikit lebih banyak memory

**Best For:** Production code, maintainability

---

#### **Approach 2: Array of Strings** (Kode #5)

**Structure:**
```javascript
[
  "Book A - USA",
  "Book B - UK"
]
```

**✅ Kelebihan:**
- ⚡ Lebih compact dan simple
- 🚀 Langsung format final
- 💾 Memory efficient

**❌ Kekurangan:**
- 🔧 Harus `.split()` untuk extract data
- 🐛 **Bug potential**: title dengan `" - "`
- 🚫 Kurang flexible
- 📉 Sulit di-maintain

**Example Bug:**
```javascript
// Title: "War - And Peace"
// Country: "Russia"

const book = "War - And Peace - Russia";
const country = book.split(' - ')[1]; 
// Result: "And Peace" ❌
// Expected: "Russia"

// FIX: Gunakan split dengan limit atau lastIndexOf
const parts = book.split(' - ');
const country = parts[parts.length - 1]; // ✅ "Russia"
```

**Best For:** Quick challenges dengan input terjamin clean

---

### 🏆 Winner: **Array of Objects!**

**Alasan:**
1. ✅ Robust dan tidak ada bug potential
2. ✅ Maintainable untuk production
3. ✅ Modern best practice
4. ✅ Performance difference negligible

---

<a name="bug-analysis"></a>
## 🐛 Bug Analysis - Coddy's Code

### ⚠️ Bug #1: Counter Logic Error

**Kode Bermasalah:**
```javascript
for (const book of sortedBooks) {
  const country = book.split(' - ')[1];
  
  // INCREMENT DULU
  countryCount[country] = (countryCount[country] || 0) + 1;
  
  // BARU CEK (Terlambat!)
  if (countryCount[country] > 5) continue;
  
  result.push(book);
}
```

**Apa yang Terjadi:**
```javascript
// Book 1-5 dari USA → OK, masuk semua
countryCount["USA"] = 1, 2, 3, 4, 5

// Book 6 dari USA:
countryCount["USA"] = 6  // ← INCREMENT DULU
if (6 > 5) continue;     // ← BARU CEK, tapi sudah 6!
// Book ke-6 TIDAK masuk, tapi counter sudah 6!

// Book 7 dari USA:
countryCount["USA"] = 7
if (7 > 5) continue;     // Skip
```

**Hasil:** Logic tetap benar secara kebetulan, tapi **tidak elegant** dan **counter tidak akurat**.

---

**Fix #1: Cek Sebelum Increment**
```javascript
for (const book of sortedBooks) {
  const country = book.split(' - ')[1];
  
  const count = countryCount[country] || 0;
  
  // CEK DULU
  if (count >= 5) continue;
  
  // BARU INCREMENT & PUSH
  result.push(book);
  countryCount[country] = count + 1;
}
```

---

**Fix #2: Gunakan Equality Check**
```javascript
// Kalau tetap mau increment dulu
countryCount[country] = (countryCount[country] || 0) + 1;

// Gunakan === bukan >
if (countryCount[country] === 6) continue;
```

### ⚠️ Bug #2: String Splitting Vulnerability

**Kode Bermasalah:**
```javascript
const country = book.split(' - ')[1];
```

**Test Case yang Gagal:**
```javascript
bookTitles = ["War - And Peace"];
countries = ["Russia"];

// Result string: "War - And Peace - Russia"
const country = book.split(' - ')[1];
// Expected: "Russia"
// Actual: "And Peace" ❌
```

**Fix:**
```javascript
// Option 1: Split dan ambil element terakhir
const parts = book.split(' - ');
const country = parts[parts.length - 1];

// Option 2: lastIndexOf
const lastDashIndex = book.lastIndexOf(' - ');
const country = book.substring(lastDashIndex + 3);

// Option 3: TERBAIK → Pakai Object! (seperti kode #1-#4)
```

---

### 💡 Lesson Learned:

| Issue | Bad Practice | Good Practice |
|-------|--------------|---------------|
| Counter | Increment lalu cek | Cek dulu baru increment |
| Data Structure | Parse string | Gunakan object |
| Validation | Assume input clean | Defensive programming |

**Kesimpulan:** Kode #5 menunjukkan pentingnya **defensive programming** dan **structured data**!

---

<a name="naming-convention"></a>
## 📝 Naming Convention Best Practices

### 🎯 General Rules:

```javascript
// ✅ GOOD: Descriptive & Clear
const selectedBooks = [];
const countryUsage = {};
const hasValidInput = true;

// ❌ BAD: Vague & Unclear
const arr = [];
const obj = {};
const flag = true;
```

### 📊 Comparison Table:

| Concept | ❌ Bad | 😐 OK | ✅ Good | ⭐ Excellent |
|---------|--------|-------|---------|-------------|
| **Boolean** | `valid` | `isValid` | `isValidInput` | `hasValidInput` |
| **Array** | `data` | `books` | `filteredBooks` | `selectedBooks` |
| **Counter** | `count` | `counter` | `countryCount` | `countryUsage` |
| **Result** | `arr` | `result` | `finalBooks` | `selectedBooks` |

### 🔤 Prefixes untuk Boolean:

```javascript
// is → State/Condition
const isValid = true;
const isReady = false;

// has → Possession
const hasValidInput = true;
const hasError = false;

// can/should → Permission/Recommendation
const canSubmit = true;
const shouldContinue = false;
```

### 📦 Array Naming:

```javascript
// ✅ PLURAL untuk array
const books = [];
const countries = [];
const selectedBooks = [];

// ✅ SINGULAR untuk single item
const book = { title: "...", country: "..." };
const country = "USA";
```

### 🔢 Counter/Object Naming:

```javascript
// Jelas apa yang di-count
const countryUsage = {};        // ⭐ Excellent
const booksPerCountry = {};     // ⭐ Excellent
const countByCountry = {};      // ✅ Good
const countryCount = {};        // 😐 OK (redundant)
const count = {};               // ❌ Bad (too vague)
```

### 🎨 Variable Naming Pattern:

```javascript
// Pattern: <adjective><noun>
const sortedBooks = [];      // sorted (adj) + books (noun)
const filteredBooks = [];    // filtered + books
const selectedBooks = [];    // selected + books

// Pattern: <noun><preposition><noun>
const booksPerCountry = {};  // books per country
const countByCountry = {};   // count by country
```

### 💡 Special Cases:

**Index Variables:**
```javascript
// ✅ Standard abbreviations OK
for (let i = 0; i < arr.length; i++) {}
for (let idx = 0; idx < arr.length; idx++) {}

// ✅ Descriptive untuk complex loops
for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {}
```

**Temporary Variables:**
```javascript
// ✅ OK untuk scope kecil
const { country } = book;
const count = countryUsage[country] || 0;

// ❌ BAD untuk scope besar
const temp = someComplexCalculation();
```

---

<a name="cheat-sheet"></a>
## ⚡ Cheat Sheet - Quick Reference

### 🎯 Problem Summary
Sorting buku internasional dengan **max 5 per negara** dan **max 20 total**.

### 📝 Solution Template (Best Version):

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  // 1. Validate
  const hasValidInput =
    bookTitles.length > 0 &&
    countries.length > 0 &&
    bookTitles.length === countries.length;
  if (!hasValidInput) return [];

  // 2. Transform to objects
  const books = bookTitles.map((title, index) => ({
    title,
    country: countries[index],
  }));

  // 3. Sort alphabetically
  books.sort((a, b) => a.title.localeCompare(b.title));

  // 4. Filter with constraints
  const countryUsage = {};
  const selectedBooks = [];

  for (const book of books) {
    if (selectedBooks.length >= 20) break;     // Max 20 total
    
    const { country } = book;
    countryUsage[country] ??= 0;
    
    if (countryUsage[country] === 5) continue; // Max 5 per country
    
    selectedBooks.push(`${book.title} - ${country}`);
    countryUsage[country]++;
  }

  return selectedBooks;
};
```

### 🔑 Key Concepts:

| Concept | Syntax | Purpose |
|---------|--------|---------|
| **Validation** | `if (!valid) return []` | Early return |
| **Transform** | `.map((item, idx) => ...)` | Array to objects |
| **Sort** | `.sort((a, b) => a.localeCompare(b))` | Alphabetical |
| **Continue** | `if (condition) continue` | Skip iteration |
| **Break** | `if (condition) break` | Stop loop |
| **Nullish** | `obj[key] ??= 0` | Set if undefined/null |
| **Destructure** | `const { prop } = obj` | Extract property |

### 📊 Time Complexity:

```
┌────────────────────────────────────┐
│ Operation      │ Complexity        │
├────────────────┼───────────────────┤
│ Validation     │ O(1)              │
│ Map to Objects │ O(n)              │
│ Sort           │ O(n log n) ⭐     │
│ Filter Loop    │ O(n)              │
├────────────────┼───────────────────┤
│ TOTAL          │ O(n log n)        │
└────────────────────────────────────┘

n = jumlah buku
Bottleneck: Sorting operation
```

### 💾 Space Complexity:

```
O(n) → untuk array books, selectedBooks, countryUsage
```

---

<a name="common-pitfalls"></a>
## ⚠️ Common Pitfalls

### 🐛 Pitfall #1: Counter Logic

❌ **WRONG:**
```javascript
countryCount[country]++;
if (countryCount[country] > 5) continue;
// Book ke-6 sudah di-count!
```

✅ **CORRECT:**
```javascript
if (countryCount[country] >= 5) continue;
countryCount[country]++;
// Cek dulu baru increment
```

---

### 🐛 Pitfall #2: Break Position

❌ **WRONG:**
```javascript
result.push(book);
if (result.length >= 20) break;
// Bisa jadi 21 buku!
```

✅ **CORRECT:**
```javascript
if (result.length >= 20) break;
result.push(book);
// Cek dulu baru push
```

---

### 🐛 Pitfall #3: String Splitting

❌ **WRONG:**
```javascript
const country = book.split(' - ')[1];
// Gagal jika title punya " - "
```

✅ **CORRECT:**
```javascript
// Gunakan object approach
const { country } = book;
```

---

### 🐛 Pitfall #4: Validation

❌ **WRONG:**
```javascript
if (bookTitles.length !== countries.length) return [];
// Tidak cek jika kosong!
```

✅ **CORRECT:**
```javascript
if (!bookTitles.length || bookTitles.length !== countries.length) {
  return [];
}
```

---

### 🐛 Pitfall #5: Naming

❌ **WRONG:**
```javascript
const arr = [];
const obj = {};
const data = [];
```

✅ **CORRECT:**
```javascript
const selectedBooks = [];
const countryUsage = {};
const books = [];
```

---

<a name="decision-tree"></a>
## 🌳 Decision Tree - Pilih Kode Yang Mana?

```
                    START
                      |
                      ↓
          Tujuan kamu apa?
                      |
        ┌─────────────┼─────────────┐
        ↓             ↓             ↓
    BELAJAR      INTERVIEW     PRODUCTION
        |             |             |
        ↓             ↓             ↓
   Kode #1      Kode #4        Kode #4
  (Step by      (Optimized)   (Optimized)
   Step)            ⭐            ⭐
        
        
        Perlu simple & cepat?
                |
                ↓
            Kode #3
          (Compact)
            
            
        Teach others?
                |
                ↓
            Kode #2
         (Functional)
```

### 📊 Quick Decision Matrix:

| Kriteria | Pilihan |
|----------|---------|
| 🎓 **Baru belajar JS** | #1 Original |
| 💼 **Interview coding** | #4 Optimized |
| 🏢 **Production code** | #4 Optimized |
| ⚡ **Quick challenge** | #3 Compact |
| 👨‍🏫 **Mengajar orang** | #2 Functional |
| 🚫 **Hindari** | #5 Coddy |

---

<a name="key-takeaways"></a>
## 🎯 Key Takeaways

### 📚 Hal Penting yang Dipelajari:

#### **1. 🏗️ Structured Data > String Parsing**
```javascript
// ✅ GOOD: Object
{ title: "Book", country: "USA" }

// ❌ BAD: String yang perlu parsing
"Book - USA"
```
**Lesson:** Selalu gunakan data structure yang tepat!

---

#### **2. 📝 Naming Convention Matters**
```javascript
// Impact pada readability:
const countryUsage = {};  // ⭐ Langsung paham!
const obj = {};           // ❌ Harus baca context
```
**Lesson:** Good naming = self-documenting code!

---

#### **3. 🔄 Continue vs Break**
```javascript
continue → Skip iterasi ini, lanjut berikutnya
break    → Stop seluruh loop
```
**Lesson:** Pahami kapan pakai yang mana!

---

#### **4. ⚡ Performance Optimization**
```javascript
// Optimasi: Push langsung formatted string
selectedBooks.push(`${title} - ${country}`);
return selectedBooks;

// Vs: Extra .map() di akhir
return books.map(b => `${b.title} - ${b.country}`);
```
**Lesson:** Small optimizations add up!

---

#### **5. 🐛 Defensive Programming**
```javascript
// Always validate input
if (!arr.length || arr1.length !== arr2.length) return [];

// Always check before increment
if (count >= 5) continue;
count++;
```
**Lesson:** Prevent bugs before they happen!

---

#### **6. 🎨 Modern JavaScript**
```javascript
// Nullish coalescing assignment
obj[key] ??= 0;

// Destructuring
const { country } = book;

// Template literals
`${title} - ${country}`
```
**Lesson:** Modern syntax = cleaner code!

---

### 🏆 Best Practices Summary:

| Practice | ✅ Do | ❌ Don't |
|----------|-------|----------|
| **Data Structure** | Use objects | Parse strings |
| **Naming** | Descriptive names | Vague names (arr, obj) |
| **Validation** | Check early | Assume valid input |
| **Loop Control** | Check before action | Act before check |
| **Code Style** | Clean & readable | Over-clever |

---

### 💡 Prinsip SOLID yang Diterapkan:

**Single Responsibility:**
- Setiap step punya tugas spesifik
- Validation → Transform → Sort → Filter

**Open/Closed:**
- Mudah extend (tambah property di object)
- Tidak perlu ubah core logic

**Readability:**
- Kode mudah dipahami
- Self-documenting dengan naming yang baik

---

<a name="next-steps"></a>
## 🚀 Next Steps

### 📖 Untuk Belajar Lebih Lanjut:

#### **1. Practice Variations:**
```javascript
// Challenge tambahan:
- Maksimal 3 buku per negara
- Stop di 50 buku
- Sort descending
- Group by country
- Export to CSV
```

#### **2. Add Features:**
```javascript
// Fitur tambahan:
- Search by country
- Filter by year
- Multiple sort criteria
- Pagination (10 per page)
```

#### **3. Optimization:**
```javascript
// Explore lebih dalam:
- Binary search untuk sorted array
- Memoization untuk repeated calls
- Lazy evaluation
```

#### **4. Testing:**
```javascript
// Belajar testing:
- Unit tests dengan Jest
- Edge cases handling
- Performance testing
```

---

### 🎓 Resources Rekomendasi:

**JavaScript Fundamentals:**
- MDN Web Docs (Array methods)
- JavaScript.info (Modern JS)
- Eloquent JavaScript (Free book)

**Clean Code:**
- "Clean Code" by Robert C. Martin
- "Code Complete" by Steve McConnell

**Practice Platforms:**
- LeetCode
- HackerRank
- Codewars

---

## 🎉 Penutup

### ✨ Selamat!

Anda telah menyelesaikan pembelajaran lengkap tentang:
- ✅ Problem solving step-by-step
- ✅ Multiple implementation approaches
- ✅ Best practices & naming conventions
- ✅ Bug analysis & optimization
- ✅ Modern JavaScript features

### 🏆 Achievement Unlocked:

```
┌───────────────────────────────────────┐
│                                       │
│    🎓 MASTER OF BOOK SORTING 🎓      │
│                                       │
│  You've completed the full journey   │
│  from beginner to optimized code!    │
│                                       │
│         Keep coding! 🚀               │
│                                       │
└───────────────────────────────────────┘
```

### 💪 Remember:

> **"Clean code is not written by following a set of rules.  
> You know you've achieved clean code when each routine  
> you read turns out to be pretty much what you expected."**  
> — Robert C. Martin

---

### 📬 Feedback & Improvement:

Dokumentasi ini adalah living document. Jika ada yang perlu ditambah atau diperbaiki:
1. Review code secara berkala
2. Update dengan best practices terbaru
3. Tambahkan contoh use case baru
4. Share dengan teman-teman!

---

**🎯 Final Code Recommendation: Kode #4 (Optimized Version)**

```javascript
const sortInternationalBooks = (bookTitles, countries) => {
  const hasValidInput =
    bookTitles.length > 0 &&
    countries.length > 0 &&
    bookTitles.length === countries.length;
  if (!hasValidInput) return [];

  const books = bookTitles.map((title, index) => ({
    title,
    country: countries[index],
  }));

  books.sort((a, b) => a.title.localeCompare(b.title));

  const countryUsage = {};
  const selectedBooks = [];

  for (const book of books) {
    if (selectedBooks.length >= 20) break;
    const { country } = book;
    countryUsage[country] ??= 0;
    if (countryUsage[country] === 5) continue;
    selectedBooks.push(`${book.title} - ${country}`);
    countryUsage[country]++;
  }

  return selectedBooks;
};
```

---

**📅 Dibuat:** 2026
**📝 Versi:** 1.0
**🎯 Level:** Beginner to Advanced
**⏱️ Estimasi Belajar:** 2-3 jam

**Happy Coding! 🚀✨**