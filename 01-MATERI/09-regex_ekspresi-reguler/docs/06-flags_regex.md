# 🛠️ Flags — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 🚩 [Apa Itu Flag?](#apa-itu)
- 🌐 [Flag g — Global](#flag-g)
- 🔡 [Flag i — Case Insensitive](#flag-i)
- 📄 [Flag m — Multiline](#flag-m)
- 🌑 [Flag s — Dotall](#flag-s)
- 🔤 [Flag u — Unicode](#flag-u)
- 📌 [Flag d — Indices](#flag-d)
- ⚠️ [Gotcha: Flag g dengan .test()](#gotcha)
- 🔗 [Navigation](#navigation)

---

<a name="apa-itu"></a>
## 🚩 Apa Itu Flag?

**Flag** adalah modifier yang ditulis setelah tanda miring penutup `/pattern/flags`. Flag mengubah cara REGEX bekerja secara keseluruhan — bukan hanya bagian tertentu dari pattern.

```
/hello/gi
       ↑↑
       ||└── i: abaikan huruf besar/kecil
       └──── g: temukan semua kemunculan
```

Kamu bisa menggabungkan beberapa flag sekaligus:

```javascript
/pattern/gi    // global + case-insensitive
/pattern/gim   // global + case-insensitive + multiline
```

Tabel semua flag yang tersedia:

| Flag | Nama | Fungsi |
|:---:|---|---|
| `g` | Global | Temukan semua match, bukan hanya yang pertama |
| `i` | Case-insensitive | Abaikan perbedaan huruf besar/kecil |
| `m` | Multiline | `^` dan `$` berlaku per baris |
| `s` | Dotall | `.` ikut cocok dengan newline `\n` |
| `u` | Unicode | Aktifkan full Unicode support |
| `d` | Indices | Tambahkan info indeks untuk setiap group |

---

<a name="flag-g"></a>
## 🌐 Flag g — Global

Tanpa flag `g`, REGEX hanya menemukan **match pertama** dan berhenti. Dengan flag `g`, REGEX mencari **semua kemunculan**.

```javascript
// Tanpa g — hanya match PERTAMA
"banana".match(/a/);
// Output: ['a', index: 1, input: 'banana', ...]  ← hanya 'a' pertama

// Dengan g — SEMUA match
"banana".match(/a/g);
// Output: ['a', 'a', 'a']  ← semua 'a'
```

**Efek flag g pada berbagai method:**

```javascript
const text = "hello world hello universe";

// match() tanpa g — detail match pertama
text.match(/hello/);
// Output: ['hello', index: 0, input: '...', groups: undefined]

// match() dengan g — array semua match (tanpa detail)
text.match(/hello/g);
// Output: ['hello', 'hello']

// replace() tanpa g — ganti pertama saja
text.replace(/hello/, "hei");
// Output: "hei world hello universe"

// replace() dengan g — ganti semua
text.replace(/hello/g, "hei");
// Output: "hei world hei universe"
```

---

<a name="flag-i"></a>
## 🔡 Flag i — Case Insensitive

Dengan flag `i`, REGEX tidak membedakan huruf besar dan kecil.

```javascript
// Tanpa i — case sensitive (default)
/hello/.test("Hello");  // false
/hello/.test("HELLO");  // false
/hello/.test("hello");  // true

// Dengan i — tidak peduli huruf besar/kecil
/hello/i.test("Hello");  // true
/hello/i.test("HELLO");  // true
/hello/i.test("HeLLo");  // true
```

**Kombinasi g dan i:**

```javascript
const text = "Hello World hello WORLD";
text.match(/hello/gi);
// Output: ['Hello', 'hello']

text.match(/world/gi);
// Output: ['World', 'WORLD']
```

---

<a name="flag-m"></a>
## 📄 Flag m — Multiline

Secara default, `^` dan `$` hanya berlaku untuk awal dan akhir **seluruh string**. Dengan flag `m`, mereka berlaku untuk awal dan akhir **setiap baris**.

```javascript
const teks = `baris satu
baris dua
baris tiga`;

// Tanpa m — ^ hanya cocok di awal seluruh string
teks.match(/^baris/g);
// Output: ['baris']  ← hanya "baris" di baris pertama

// Dengan m — ^ cocok di awal setiap baris
teks.match(/^baris/gm);
// Output: ['baris', 'baris', 'baris']  ← semua baris ✅
```

**Visualisasi perbedaan:**

```
String (multiline):
  "baris satu\nbaris dua\nbaris tiga"
   ↑           ↑          ↑
   Awal str    \n          \n

Tanpa m:  ^ = hanya titik pertama (↑ kiri)
Dengan m: ^ = setiap titik setelah \n (semua ↑)
```

**Contoh nyata — parsing log:**

```javascript
const log = `[INFO] Server started
[ERROR] Connection failed
[INFO] Retrying...
[ERROR] Timeout`;

// Ambil semua baris ERROR
log.match(/^\[ERROR\].+/gm);
// Output: ['[ERROR] Connection failed', '[ERROR] Timeout']
```

---

<a name="flag-s"></a>
## 🌑 Flag s — Dotall

Secara default, `.` tidak cocok dengan karakter newline `\n`. Dengan flag `s` (dotall), `.` cocok dengan **semua karakter termasuk newline**.

```javascript
const text = "hello\nworld";

// Tanpa s — titik tidak cocok dengan newline
/hello.world/.test(text);   // false

// Dengan s — titik cocok dengan newline
/hello.world/s.test(text);  // true ✅
```

**Kapan digunakan?** Ketika kamu ingin mencocokkan teks yang mungkin mengandung baris baru di dalamnya:

```javascript
const html = `<div>
  <p>Konten</p>
</div>`;

// Tanpa s — tidak cocok (ada newline di dalam div)
/<div>.*<\/div>/.test(html);   // false

// Dengan s — cocok meskipun ada newline
/<div>.*<\/div>/s.test(html);  // true ✅
```

---

<a name="flag-u"></a>
## 🔤 Flag u — Unicode

Flag `u` mengaktifkan mode **full Unicode support**, memungkinkan REGEX menangani karakter Unicode dengan benar.

```javascript
// Tanpa u — karakter emoji/unicode bisa bermasalah
/\u{1F600}/.test("😀");    // false (tidak dikenali)

// Dengan u — Unicode escape dikenali
/\u{1F600}/u.test("😀");   // true ✅

// Tanpa u — emoji dihitung 2 karakter (surrogate pair)
"😀".length;  // 2

// Dengan u — . cocok dengan emoji sebagai 1 karakter
/^.$/u.test("😀");   // true  ✅ (1 karakter)
/^.$/.test("😀");    // false ❌ (dianggap 2 karakter)
```

---

<a name="flag-d"></a>
## 📌 Flag d — Indices (ES2022)

Flag `d` menambahkan informasi indeks posisi untuk setiap capturing group dalam hasil match.

```javascript
const regex = /(\d{4})-(\d{2})/d;
const match = "2024-03".match(regex);

console.log(match.indices[0]); // [0, 7]  — posisi full match
console.log(match.indices[1]); // [0, 4]  — posisi group 1 (tahun)
console.log(match.indices[2]); // [5, 7]  — posisi group 2 (bulan)
```

---

<a name="gotcha"></a>
## ⚠️ Gotcha: Flag g dengan .test()

Ini adalah **bug umum** yang sering mengejutkan pemula!

Ketika kamu menggunakan flag `g` pada regex yang dipakai berulang kali dengan `.test()`, regex menyimpan posisi terakhir (`lastIndex`) — dan di panggilan berikutnya, pencarian dimulai dari situ, bukan dari awal.

```javascript
const regex = /\d/g;  // ← ada flag g!

console.log(regex.test("abc123"));  // true   (lastIndex jadi 4)
console.log(regex.test("abc123"));  // false  ← bug! lastIndex = 4, mulai dari situ
console.log(regex.test("abc123"));  // true   (lastIndex reset ke 0 karena false)
```

**Solusi:**

```javascript
// Solusi 1: Jangan pakai flag g untuk .test()
const regex = /\d/;  // tanpa g — aman
console.log(regex.test("abc123"));  // true
console.log(regex.test("abc123"));  // true — selalu konsisten ✅

// Solusi 2: Reset lastIndex secara manual
const regex2 = /\d/g;
regex2.test("abc123");
regex2.lastIndex = 0;  // reset manual
regex2.test("abc123");  // true ✅

// Solusi 3: Buat regex baru setiap kali (kurang efisien)
/\d/g.test("abc123");  // true
/\d/g.test("abc123");  // true (regex baru, lastIndex = 0)
```

> 💡 **Aturan praktis:** Gunakan flag `g` hanya ketika memang perlu menemukan **semua** kemunculan (biasanya dengan `.match()`, `.matchAll()`, atau `.replace()`). Untuk `.test()`, hindari flag `g` kecuali kamu mengerti konsekuensinya.

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 05 — Groups & Lookaround](./05-groups-lookaround_regex.md)**
- **📖 [Lanjut ke Part 07 — Method JavaScript →](./07-method-javascript_regex.md)**
