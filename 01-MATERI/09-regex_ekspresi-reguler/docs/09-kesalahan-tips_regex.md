# ⚠️ Kesalahan Umum & Tips — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🚫 [Kesalahan Umum](#kesalahan)
- 💡 [Tips & Best Practice](#tips)
- 🛠️ [Tools untuk Berlatih](#tools)
- 🎯 [Tantangan Latihan](#latihan)
- 🔗 [Navigation](#navigation)

---

<a name="kesalahan"></a>
## 🚫 Kesalahan Umum

### 1. Lupa Escape Metacharacter

Titik `.` cocok dengan **semua karakter**, bukan hanya titik literal. Banyak pemula lupa escape ini.

```javascript
// ❌ Salah — titik cocok dengan SEMUA karakter
const wrongRegex = /file.txt/;
console.log(wrongRegex.test("fileXtxt")); // true — tidak diinginkan!

// ✅ Benar — escape titik agar menjadi literal
const correctRegex = /file\.txt/;
console.log(correctRegex.test("fileXtxt")); // false ✅
console.log(correctRegex.test("file.txt")); // true  ✅
```

**Karakter lain yang sering lupa di-escape:**

```javascript
// Kurung kotak []
/\[test\]/.test("[test]");  // true ✅ (tanpa escape, [ punya arti khusus)

// Tanda kurung ()
/\(hello\)/.test("(hello)"); // true ✅

// Tanda tanya ?
/colou\?r/.test("colou?r");  // true ✅ (mencari tanda ? literal)

// Plus +
/a\+b/.test("a+b");          // true ✅
```

---

### 2. Greedy Menyebabkan Over-Matching

Quantifier `*` dan `+` secara default **greedy** — mereka mengambil sebanyak mungkin karakter. Ini sering menyebabkan hasil yang tidak diinginkan.

```javascript
// ❌ Greedy mengambil terlalu banyak
const html = "<b>satu</b> dan <b>dua</b>";
html.match(/<b>.*<\/b>/)[0];
// Output: '<b>satu</b> dan <b>dua</b>'  ← seluruh string!

// ✅ Lazy (tambah ?) mengambil yang tepat
html.match(/<b>.*?<\/b>/g);
// Output: ['<b>satu</b>', '<b>dua</b>']  ← benar ✅
```

---

### 3. Lupa Flag `g` saat Ingin Semua Match

```javascript
// ❌ Hanya ganti yang pertama
"aaa bbb aaa".replace(/aaa/, "xxx");
// Output: "xxx bbb aaa"  ← yang kedua tidak terganti!

// ✅ Semua match diganti
"aaa bbb aaa".replace(/aaa/g, "xxx");
// Output: "xxx bbb xxx"  ✅
```

---

### 4. Bug Flag `g` dengan `.test()` Berulang

```javascript
// ❌ Bug: regex dengan flag g menyimpan lastIndex
const regex = /\d/g;

console.log(regex.test("abc123"));  // true  (lastIndex = 4)
console.log(regex.test("abc123"));  // false ← BUG! mulai dari lastIndex = 4
console.log(regex.test("abc123"));  // true  (lastIndex reset ke 0 karena false)
// Hasil berselang-seling: true, false, true, false, ...

// ✅ Solusi: hapus flag g untuk .test()
const safeRegex = /\d/;  // tanpa g
console.log(safeRegex.test("abc123"));  // true
console.log(safeRegex.test("abc123"));  // true — selalu konsisten ✅
```

---

### 5. Tidak Menangani Kembalian `null` dari `.match()`

```javascript
// ❌ Akan error jika tidak ada match!
const tags = "hello world".match(/#\w+/g).join(', ');
// TypeError: Cannot read properties of null (reading 'join')

// ✅ Selalu tangani null dengan fallback
const tags = ("hello world".match(/#\w+/g) || []).join(', ');
// Output: ""  (string kosong, aman) ✅

// Atau gunakan Optional Chaining (ES2020)
const tags2 = "hello world".match(/#\w+/g)?.join(', ') ?? '';
```

---

### 6. Mengabaikan Case Sensitivity

```javascript
// ❌ Tidak cocok dengan "Hello" karena case sensitive
/hello/.test("Hello");  // false

// ✅ Gunakan flag i
/hello/i.test("Hello");    // true ✅
/hello/i.test("HELLO");    // true ✅
/hello/i.test("HeLLo");    // true ✅
```

---

### 7. Mencoba Parsing HTML Kompleks dengan REGEX

REGEX tidak cocok untuk parsing HTML yang kompleks dan nested. Gunakan DOM parser sebagai gantinya.

```javascript
// ❌ REGEX bisa gagal untuk HTML yang nested atau tidak beraturan
const html = '<div class="x"><p>Teks <b>tebal</b></p></div>';
// Pattern REGEX untuk ini bisa sangat kompleks dan rentan error

// ✅ Gunakan DOM Parser — jauh lebih andal
const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const links = doc.querySelectorAll('a');          // cari semua link
const paragraphs = doc.querySelectorAll('p');     // cari semua paragraf
```

> 💡 **Aturan:** Gunakan REGEX untuk ekstraksi teks **sederhana dan berstruktur**. Untuk parsing HTML/XML yang nested, selalu gunakan parser yang tepat.

---

<a name="tips"></a>
## 💡 Tips & Best Practice

### 1. Simpan REGEX ke Variabel (Jangan Tulis Ulang)

```javascript
// ❌ Kurang baik — regex dibuat ulang setiap fungsi dipanggil
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Lebih baik — buat sekali, gunakan berkali-kali
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return EMAIL_REGEX.test(email);
}
```

### 2. Gunakan Named Group untuk Keterbacaan

```javascript
// ❌ Susah dibaca — apa itu match[1], match[2], match[3]?
const m = "2024-03-15".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(m[1], m[2], m[3]);

// ✅ Mudah dibaca dengan named group
const m = "2024-03-15".match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(m.groups.year, m.groups.month, m.groups.day);
// "2024" "03" "15"  — langsung paham artinya!
```

### 3. Mulai dari Sederhana, Tambahkan Kompleksitas Bertahap

```javascript
// Jangan langsung tulis regex yang sangat kompleks!
// Mulai dari yang kecil dan uji satu per satu:

// Langkah 1: pastikan format dasar
/^\d+$/         // hanya digit

// Langkah 2: tentukan panjang
/^\d{10,13}$/   // 10-13 digit

// Langkah 3: tambahkan awalan
/^08\d{8,11}$/  // diawali 08 + 8-11 digit

// Langkah 4: tambahkan format lain
/^(\+62|62|0)8[1-9]\d{6,9}$/ // format Indonesia lengkap
```

### 4. Escape Input User Sebelum Dimasukkan ke Constructor

```javascript
// Fungsi helper: escape semua metacharacter
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // \\ → backslash
  // $& → karakter yang ditemukan (dimasukkan kembali dengan escape)
}

// Contoh penggunaan — pencarian teks dari input user
function searchText(content, userInput) {
  const safeInput = escapeRegex(userInput); // escape dulu!
  const regex = new RegExp(safeInput, 'gi');
  return content.match(regex) || [];
}

// Aman meskipun user mengetik karakter spesial seperti "(test)"
console.log(searchText("Ini adalah (test) bukan uji", "(test)"));
// Output: ['(test)'] ✅ (tanpa escape, tanda kurung punya arti khusus!)
```

### 5. Uji Edge Cases

Selalu uji REGEX-mu dengan kasus-kasus tepi:

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Kasus normal
emailRegex.test("user@example.com");    // true ✅

// Edge cases:
emailRegex.test("");                    // false — string kosong
emailRegex.test("@");                   // false — hanya @
emailRegex.test("user@");              // false — tidak ada domain
emailRegex.test("user@.com");          // false — titik di awal domain
emailRegex.test("user @example.com");  // false — ada spasi
emailRegex.test("user@example");       // false — tidak ada TLD
```

### 6. Gunakan Non-Capturing Group untuk Performa

```javascript
// Capturing group menyimpan hasil di memory
/(Mr|Mrs|Ms)\. (\w+)/  // match[1] = sapaan, match[2] = nama

// Non-capturing group: hanya untuk grouping, tidak disimpan
/(?:Mr|Mrs|Ms)\. (\w+)/ // match[1] = nama (lebih efisien)
```

---

<a name="tools"></a>
## 🛠️ Tools untuk Berlatih

Jangan coba-coba REGEX langsung di kode produksi! Gunakan tools online ini:

| Tool | URL | Keunggulan |
|---|---|---|
| **Regex101** | [regex101.com](https://regex101.com/) | Penjelasan detail setiap bagian pattern |
| **RegExr** | [regexr.com](https://regexr.com/) | Penjelasan hover, reference cepat |
| **RegexPal** | [regexpal.com](https://www.regexpal.com/) | Sederhana dan cepat |

**Tips menggunakan Regex101:**
1. Pilih flavor **"JavaScript (V8)"** di panel kiri
2. Masukkan pattern di kotak atas (tanpa tanda `/`)
3. Masukkan test string di bawahnya
4. Baca penjelasan otomatis di panel kanan — sangat membantu untuk debugging!

---

<a name="latihan"></a>
## 🎯 Tantangan Latihan

Coba selesaikan tantangan berikut untuk mengasah kemampuanmu:

### Level Pemula
1. **Validasi NIK** — Buat fungsi `isValidNIK(nik)` yang memvalidasi NIK Indonesia (tepat 16 digit angka)
2. **Hanya Huruf** — Buat regex yang hanya cocok dengan string yang semua karakternya huruf (a-z, A-Z)
3. **Awalan Tertentu** — Buat regex yang cocok dengan string yang diawali "https://"

### Level Menengah
4. **Ekstrak Email** — Buat fungsi `extractEmails(text)` yang mengambil semua email dari teks
5. **Slug URL** — Buat fungsi `slugify(title)` yang mengubah judul menjadi URL slug
6. **Sensor Kartu Kredit** — Buat fungsi `maskCard(number)` yang menampilkan hanya 4 digit terakhir

### Level Lanjutan
7. **Hitung Kata** — Buat fungsi `countWords(text)` yang menghitung jumlah kata menggunakan REGEX
8. **Format Ribuan** — Buat fungsi yang mengubah 1500000 menjadi "1.500.000"
9. **Parser Query String** — Buat fungsi `parseQuery(queryString)` yang mengubah `"name=John&age=25"` menjadi `{ name: 'John', age: '25' }`

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 08 — Contoh Praktis](./08-contoh-praktis_regex.md)**
- **📖 [Lanjut ke Ringkasan Konsep →](../ringkasan-konsep_regex.md)**
