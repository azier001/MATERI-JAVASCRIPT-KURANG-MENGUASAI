# 🔧 Method JavaScript untuk REGEX

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 📋 [Ringkasan Semua Method](#ringkasan)
- ✅ [regex.test()](#test)
- 🔍 [string.match()](#match)
- 🔍🔍 [string.matchAll()](#matchall)
- 🔄 [string.replace() & replaceAll()](#replace)
- 📍 [string.search()](#search)
- ✂️ [string.split()](#split)
- ⚙️ [regex.exec()](#exec)
- 🔗 [Navigation](#navigation)

---

<a name="ringkasan"></a>
## 📋 Ringkasan Semua Method

| Method | Dipanggil Pada | Kembalikan | Kegunaan |
|---|:---:|---|---|
| `regex.test(str)` | RegExp | `true` / `false` | Cek ada/tidak match |
| `str.match(regex)` | String | Array / `null` | Ambil match |
| `str.matchAll(regex)` | String | Iterator | Semua match + detail group |
| `str.replace(regex, rep)` | String | String baru | Ganti teks |
| `str.search(regex)` | String | Indeks / `-1` | Cari posisi pertama |
| `str.split(regex)` | String | Array string | Pecah string |
| `regex.exec(str)` | RegExp | Array / `null` | Iterasi manual |

---

<a name="test"></a>
## ✅ regex.test(str) — Cek Ada/Tidak

Method paling sederhana. Kembalikan `true` jika pattern cocok, `false` jika tidak.

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailRegex.test("user@example.com");  // true
emailRegex.test("bukan-email");       // false
```

**Penggunaan umum — validasi form:**

```javascript
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isOnlyNumbers(str) {
  return /^\d+$/.test(str);
}

function isStrongPassword(pass) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(pass);
}

console.log(isValidEmail("user@mail.com")); // true
console.log(isOnlyNumbers("12345"));        // true
console.log(isStrongPassword("MyPass1!"));  // true
```

---

<a name="match"></a>
## 🔍 string.match(regex) — Cari dan Ambil

Cari match dalam string dan kembalikan hasilnya.

**Tanpa flag g — detail match pertama:**

```javascript
const result = "Halo Dunia".match(/[A-Z]/);

console.log(result);
// Output: ['H', index: 0, input: 'Halo Dunia', groups: undefined]
// result[0] → 'H'     (yang ditemukan)
// result.index → 0    (posisi dalam string)
```

**Dengan flag g — array semua match:**

```javascript
"Halo Dunia".match(/[A-Z]/g);
// Output: ['H', 'D']
// (tanpa info index, tanpa detail — hanya array nilai)
```

**Jika tidak ada match — kembalikan null:**

```javascript
const result = "halo dunia".match(/[A-Z]/g);
console.log(result); // null

// ⚠️ Selalu tangani null!
const matches = "halo dunia".match(/[A-Z]/g) || [];
console.log(matches); // []  (aman, tidak error)
```

**Dengan capturing group (tanpa flag g):**

```javascript
const str = "Tanggal: 2024-03-15";
const match = str.match(/(\d{4})-(\d{2})-(\d{2})/);

console.log(match[0]); // "2024-03-15" — full match
console.log(match[1]); // "2024"       — group 1
console.log(match[2]); // "03"         — group 2
console.log(match[3]); // "15"         — group 3
```

---

<a name="matchall"></a>
## 🔍🔍 string.matchAll(regex) — Semua Match + Detail Group

`matchAll` mengembalikan **iterator** yang berisi **semua** match beserta **detail capturing group** tiap match. Harus menggunakan flag `g`.

```javascript
const str = "2024-03-15 dan 2023-12-01";
const regex = /(\d{4})-(\d{2})-(\d{2})/g;

const matches = [...str.matchAll(regex)]; // spread iterator ke array

matches.forEach(match => {
  console.log(`Full: ${match[0]}, Tahun: ${match[1]}, Bulan: ${match[2]}, Hari: ${match[3]}`);
});
// Output:
// Full: 2024-03-15, Tahun: 2024, Bulan: 03, Hari: 15
// Full: 2023-12-01, Tahun: 2023, Bulan: 12, Hari: 01
```

**Perbandingan match() vs matchAll():**

```
match() dengan g:
  → ['2024-03-15', '2023-12-01']  (hanya nilai, tanpa group detail)

matchAll() dengan g:
  → [
      ['2024-03-15', '2024', '03', '15', index: 0, ...],
      ['2023-12-01', '2023', '12', '01', index: 11, ...]
    ]  (lengkap dengan group dan posisi)
```

---

<a name="replace"></a>
## 🔄 string.replace() & replaceAll() — Ganti Teks

### replace() — Ganti dengan String

```javascript
// Ganti pertama saja (tanpa g)
"aaa bbb aaa".replace(/aaa/, "xxx");
// Output: "xxx bbb aaa"

// Ganti semua (dengan g)
"aaa bbb aaa".replace(/aaa/g, "xxx");
// Output: "xxx bbb xxx"
```

### replace() — Gunakan Capturing Group

```javascript
// $1, $2, ... merujuk ke capturing group
"15/03/2024".replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
// Output: "2024-03-15"

// Named group: $<namaGroup>
"15/03/2024".replace(
  /(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{4})/,
  "$<year>-$<month>-$<day>"
);
// Output: "2024-03-15"
```

### replace() — Gunakan Function

Untuk logika penggantian yang lebih kompleks:

```javascript
// Ubah setiap kata menjadi Title Case
"hello world javascript".replace(/\b\w/g, (char) => char.toUpperCase());
// Output: "Hello World Javascript"

// Gandakan semua angka
"1 + 2 = 3".replace(/\d+/g, (num) => parseInt(num) * 2);
// Output: "2 + 4 = 6"
```

**Parameter function dalam replace:**

```javascript
str.replace(regex, function(match, group1, group2, offset, string) {
  // match   → string yang cocok dengan full pattern
  // group1  → capturing group 1
  // group2  → capturing group 2
  // offset  → posisi match dalam string
  // string  → string asli
});

// Contoh: sorot setiap kata dalam HTML
"hello world".replace(/(\w+)/g, (match, word, offset) => {
  return `<span data-pos="${offset}">${word}</span>`;
});
// Output: "<span data-pos="0">hello</span> <span data-pos="6">world</span>"
```

### replaceAll() — Ganti Semua (ES2021)

```javascript
// Alternatif modern untuk replace dengan flag g
"aaa bbb aaa".replaceAll("aaa", "xxx");
// Output: "xxx bbb xxx"

// Dengan regex (harus pakai flag g)
"aaa bbb aaa".replaceAll(/aaa/g, "xxx");
// Output: "xxx bbb xxx"
```

---

<a name="search"></a>
## 📍 string.search(regex) — Cari Posisi

Kembalikan **indeks** posisi pertama match ditemukan, atau `-1` jika tidak ada.

```javascript
"hello world".search(/world/);    //  6 — ditemukan di indeks 6
"hello world".search(/Python/);   // -1 — tidak ditemukan
```

**Penggunaan umum:**

```javascript
const text = "Belajar JavaScript sangat menyenangkan";
const idx = text.search(/JavaScript/);

if (idx !== -1) {
  console.log(`"JavaScript" ditemukan di posisi ${idx}`);
  // Output: "JavaScript" ditemukan di posisi 8
} else {
  console.log("Tidak ditemukan");
}
```

> **Catatan:** `search()` selalu mencari dari indeks 0 dan **mengabaikan flag `g`**.

---

<a name="split"></a>
## ✂️ string.split(regex) — Pecah String

Pecah string menjadi array berdasarkan pola REGEX sebagai separator.

```javascript
// Pecah berdasarkan koma
"apel,jeruk,pisang".split(/,/);
// Output: ['apel', 'jeruk', 'pisang']

// Pecah berdasarkan satu atau lebih whitespace
"  satu  dua   tiga  ".split(/\s+/).filter(Boolean);
// Output: ['satu', 'dua', 'tiga']
// filter(Boolean) menghilangkan string kosong

// Pecah berdasarkan berbagai tanda pemisah
"satu,dua;tiga|empat".split(/[,;|]/);
// Output: ['satu', 'dua', 'tiga', 'empat']
```

**Pecah berdasarkan baris:**

```javascript
const multiline = "baris 1\nbaris 2\r\nbaris 3";
multiline.split(/\r?\n/);
// Output: ['baris 1', 'baris 2', 'baris 3']
// \r?\n menangani baik \n (Unix) maupun \r\n (Windows)
```

---

<a name="exec"></a>
## ⚙️ regex.exec(str) — Iterasi Manual

`exec()` mirip dengan `match()` tapi digunakan untuk **iterasi manual** — terutama berguna dengan flag `g` ketika kamu perlu memproses setiap match satu per satu.

```javascript
const regex = /\d+/g;
const str = "Item: 10, total: 2500, diskon: 5";

let match;
while ((match = regex.exec(str)) !== null) {
  console.log(`Nilai: ${match[0]}, posisi: ${match.index}`);
}
// Output:
// Nilai: 10, posisi: 6
// Nilai: 2500, posisi: 17
// Nilai: 5, posisi: 31
```

**Cara kerja exec() dengan flag g:**

```
regex.lastIndex = 0  (awal)

exec() #1 → cocok "10"   di index 6  → lastIndex = 8
exec() #2 → cocok "2500" di index 17 → lastIndex = 21
exec() #3 → cocok "5"    di index 31 → lastIndex = 32
exec() #4 → tidak cocok             → lastIndex = 0, return null

Loop while berhenti saat return null
```

**Dengan capturing group:**

```javascript
const regex = /(\w+)=(\w+)/g;
const query = "name=John&age=25&city=Jakarta";

let match;
while ((match = regex.exec(query)) !== null) {
  console.log(`${match[1]}: ${match[2]}`);
}
// Output:
// name: John
// age: 25
// city: Jakarta
```

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 06 — Flags](./06-flags_regex.md)**
- **📖 [Lanjut ke Part 08 — Contoh Praktis →](./08-contoh-praktis_regex.md)**
