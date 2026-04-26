# 🎨 Karakter & Pola Dasar — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🔤 [Karakter Literal](#literal)
- 🎭 [Metacharacters](#metacharacters)
- 🗂️ [Character Classes](#character-classes)
- 🔡 [Shorthand Classes](#shorthand)
- ⚓ [Anchors (Jangkar)](#anchors)
- 🔗 [Navigation](#navigation)

---

<a name="literal"></a>
## 🔤 Karakter Literal

Karakter literal adalah karakter yang mencocokkan dirinya sendiri secara persis — apa yang kamu tulis, itulah yang dicari.

```javascript
const regex = /cat/;

console.log(regex.test("I have a cat"));  // true
console.log(regex.test("I have a dog"));  // false
console.log(regex.test("catch me"));      // true (mengandung "cat")
```

> **Perhatikan:** REGEX mencari pola di mana saja dalam string, tidak harus exact match. Untuk memaksa exact match, gunakan **anchors** `^` dan `$`.

---

<a name="metacharacters"></a>
## 🎭 Metacharacters (Karakter Khusus)

Metacharacters adalah karakter yang punya **arti khusus** dalam REGEX.

```
Metacharacters:  .  ^  $  *  +  ?  {  }  [  ]  \  |  (  )
```

### 1. Titik (.) — Karakter Apapun

Titik cocok dengan **karakter apapun** kecuali newline `\n`.

```javascript
const regex = /c.t/g;
const str = "cat cut cot c9t c@t";

str.match(regex);
// Output: ['cat', 'cut', 'cot', 'c9t', 'c@t']
```

```
Pattern: c . t
         │ │ │
         │ │ └── 't' literal
         │ └──── apapun (satu karakter)
         └────── 'c' literal

"cat" → c(a)t ✅   "ct" → tidak cocok ❌ (butuh tepat 1 karakter di tengah)
```

### 2. Escape Character (\\) — Jadikan Literal

Tambahkan `\` untuk membuat metacharacter menjadi literal:

```javascript
// ❌ Titik cocok dengan SEMUA karakter
/3.14/.test("3x14");   // true — tidak diinginkan!

// ✅ Escape agar cocok dengan titik literal
/3\.14/.test("3x14");  // false ✅
/3\.14/.test("3.14");  // true  ✅
```

### 3. Alternation (|) — ATAU

```javascript
// Salah satu dari pilihan yang ada
"I have a cat and a dog".match(/cat|dog/g);
// Output: ['cat', 'dog']

// Validasi ekstensi file gambar
const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
console.log(imageRegex.test("photo.JPG")); // true
console.log(imageRegex.test("doc.pdf"));   // false
```

---

<a name="character-classes"></a>
## 🗂️ Character Classes (Kelas Karakter)

Gunakan `[...]` untuk mencocokkan **salah satu dari beberapa karakter** sekaligus.

```javascript
// [abc] — cocok dengan a, b, atau c
/[abc]/.test("apple");  // true (ada 'a')
/[abc]/.test("xyz");    // false

// [a-z] — range huruf kecil
/[a-z]/.test("Hello");  // true (ada e, l, l, o)

// [0-9] — range angka
/[0-9]/.test("Umur: 25"); // true

// Kombinasi vokal
"hello world".match(/[aeiou]/g);
// Output: ['e', 'o', 'o']
```

### Negasi: [^...]

Tambahkan `^` di dalam `[...]` untuk membaliknya — "apapun **kecuali** ini":

```javascript
// [^0-9] — bukan angka
/[^0-9]/.test("123"); // false (semua angka)
/[^0-9]/.test("abc"); // true  (ada huruf)

// Contoh praktis: hapus semua yang bukan angka
"(021) 555-1234".replace(/[^0-9]/g, '');
// Output: '0215551234'
```

```
Pattern: /[aeiou]/g  (semua vokal)

String:  "hello world"
          h e l l o   w o r l d
            ↑       ↑   ↑
            e       o   o

Matches: ['e', 'o', 'o']
```

---

<a name="shorthand"></a>
## 🔡 Shorthand Classes (Singkatan Praktis)

| Shorthand | Arti | Equivalent |
|:---:|---|:---:|
| `\d` | Digit (angka) | `[0-9]` |
| `\D` | Bukan digit | `[^0-9]` |
| `\w` | Word character | `[a-zA-Z0-9_]` |
| `\W` | Bukan word character | `[^a-zA-Z0-9_]` |
| `\s` | Whitespace (spasi, tab, newline) | `[ \t\n\r]` |
| `\S` | Bukan whitespace | |

```javascript
// \d — hanya angka
"I have 10 apples and 5 oranges".match(/\d+/g);
// Output: ['10', '5']

// \w — word characters
"hello-world 123".match(/\w+/g);
// Output: ['hello', 'world', '123']

// \D — hapus semua yang bukan angka
"(021) 555-1234".replace(/\D/g, '');
// Output: '0215551234'

// \s — pisahkan berdasarkan whitespace
"  satu  dua   tiga  ".split(/\s+/).filter(Boolean);
// Output: ['satu', 'dua', 'tiga']
```

---

<a name="anchors"></a>
## ⚓ Anchors (Jangkar)

Anchors mencocokkan **posisi** dalam string, bukan karakter.

| Anchor | Arti |
|:---:|---|
| `^` | Awal string |
| `$` | Akhir string |
| `\b` | Word boundary (batas kata) |
| `\B` | Bukan word boundary |

### Caret (^) dan Dollar ($)

```javascript
/^Hello/.test("Hello World");  // true  — dimulai dengan "Hello"
/^Hello/.test("Say Hello");    // false — tidak dimulai "Hello"

/world$/.test("Hello world");  // true  — diakhiri "world"
/world$/.test("world peace");  // false — tidak diakhiri "world"

// Exact match: kombinasi ^ dan $
/^\d{4}$/.test("2024");   // true  (tepat 4 digit)
/^\d{4}$/.test("20245");  // false (lebih dari 4 digit)
```

### Word Boundary (\b)

```javascript
// Tanpa \b — cocok di mana saja termasuk dalam kata lain
"cat catch scattered".match(/cat/g);
// Output: ['cat', 'cat', 'cat']  ← 3 hasil!

// Dengan \b — hanya kata utuh
"cat catch scattered".match(/\bcat\b/g);
// Output: ['cat']  ← hanya 1 hasil ✅
```

```
String: "cat catch scattered"
                      
/\bcat\b/:
  "cat"       → ada boundary di kedua sisi → ✅ cocok
  "ca[t]ch"   → setelah 't' ada 'c' (bukan boundary) → ❌
  "scat[tered]"→ sebelum 'c' ada huruf → ❌

Result: ['cat']
```

**Contoh nyata — ganti kata tepat:**

```javascript
const text = "I like JavaScript, not Java";

// ❌ Tanpa \b — ikut mengganti "Java" dalam "JavaScript"!
text.replace(/Java/g, 'Python');
// Output: "I like PythonScript, not Python"

// ✅ Dengan \b — hanya "Java" yang berdiri sendiri
text.replace(/\bJava\b/g, 'Python');
// Output: "I like JavaScript, not Python" ✅
```

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 02 — Cara Membuat REGEX](./02-cara-membuat_regex.md)**
- **📖 [Lanjut ke Part 04 — Quantifiers →](./04-quantifiers_regex.md)**
