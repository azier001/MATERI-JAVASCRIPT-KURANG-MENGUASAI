# 👥 Groups & Lookaround — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- 👥 [Groups & Capturing](#groups)
- 🏷️ [Named Capturing Group](#named)
- 🚫 [Non-Capturing Group](#non-capturing)
- 🪞 [Backreference](#backreference)
- 🔭 [Lookahead & Lookbehind](#lookaround)
- 🔗 [Navigation](#navigation)

---

<a name="groups"></a>
## 👥 Groups & Capturing

Tanda kurung `(...)` digunakan untuk dua hal:
1. **Mengelompokkan** — perlakukan beberapa karakter sebagai satu unit
2. **Menangkap (capturing)** — simpan bagian yang cocok untuk digunakan kemudian

### Grouping untuk Quantifier

```javascript
// Tanpa group: quantifier hanya berlaku untuk satu karakter
/ab+/.test("abbb");   // true — b diulang

// Dengan group: quantifier berlaku untuk seluruh grup
/(ab)+/.test("ababab"); // true — "ab" diulang 3 kali
/(ab)+/.test("ab");     // true — "ab" diulang 1 kali
/(ab)+/.test("a");      // false — butuh "ab" setidaknya sekali
```

### Capturing Group

```javascript
// Ekstrak bagian tanggal
const str = "Today is 2024-03-15";
const match = str.match(/(\d{4})-(\d{2})-(\d{2})/);

console.log(match[0]); // "2024-03-15" — full match
console.log(match[1]); // "2024"       — group 1: tahun
console.log(match[2]); // "03"         — group 2: bulan
console.log(match[3]); // "15"         — group 3: hari
```

**Visualisasi capturing group:**

```
Pattern: /(\d{4})-(\d{2})-(\d{2})/
          └──1──┘  └──2──┘  └──3──┘

String: "2024-03-15"

match[0] → "2024-03-15"  (full match)
match[1] → "2024"        (group 1)
match[2] → "03"          (group 2)
match[3] → "15"          (group 3)
```

### Menggunakan Group dalam replace()

Gunakan `$1`, `$2`, ... untuk merujuk grup dalam penggantian:

```javascript
// Ubah format tanggal: DD/MM/YYYY → YYYY-MM-DD
"15/03/2024".replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
// Output: "2024-03-15"

//  $1 = "15" (hari)
//  $2 = "03" (bulan)
//  $3 = "2024" (tahun)
//  Hasilnya disusun ulang: $3-$2-$1
```

---

<a name="named"></a>
## 🏷️ Named Capturing Group

Named group membuat kode lebih mudah dibaca — kamu memberi nama pada setiap grup.

**Sintaks:** `(?<namaGroup>pattern)`

```javascript
// Tanpa named group — sulit dibaca
const m1 = "2024-03-15".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(m1[1], m1[2], m1[3]); // apa itu [1], [2], [3]?

// Dengan named group — jelas dan mudah dibaca
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const m2 = "2024-03-15".match(regex);

console.log(m2.groups.year);   // "2024"
console.log(m2.groups.month);  // "03"
console.log(m2.groups.day);    // "15"
```

**Named group dalam replace():**

```javascript
// Gunakan $<namaGroup> dalam replacement
const regex = /(?<day>\d{2})\/(?<month>\d{2})\/(?<year>\d{4})/;
"15/03/2024".replace(regex, "$<year>-$<month>-$<day>");
// Output: "2024-03-15"
```

---

<a name="non-capturing"></a>
## 🚫 Non-Capturing Group

Kadang kamu butuh grup hanya untuk mengelompokkan pola, tapi **tidak** ingin menyimpan hasilnya. Gunakan `(?:...)`.

```javascript
// Capturing group — sapaan ikut tersimpan di match[1]
const regex1 = /(Mr|Mrs|Ms)\. (\w+)/;
const m1 = "Mr. Smith".match(regex1);
console.log(m1[1]); // "Mr"    ← tersimpan tapi tidak perlu
console.log(m1[2]); // "Smith"

// Non-capturing group — sapaan tidak tersimpan
const regex2 = /(?:Mr|Mrs|Ms)\. (\w+)/;
const m2 = "Mr. Smith".match(regex2);
console.log(m2[1]); // "Smith" ← langsung nama, tanpa sapaan
```

**Contoh iterasi dengan exec():**

```javascript
const regex = /(?:Mr|Mrs|Ms)\. (\w+)/g;
const str = "Mr. Smith and Mrs. Johnson";

let match;
while ((match = regex.exec(str)) !== null) {
  console.log(match[1]);
}
// Output:
// Smith
// Johnson
```

---

<a name="backreference"></a>
## 🪞 Backreference — Merujuk Grup Sebelumnya

**Backreference** memungkinkan kamu merujuk kembali ke teks yang sudah cocok dengan grup sebelumnya.

**Sintaks:** `\1`, `\2`, ... (dalam pattern) atau `$1`, `$2` (dalam replacement)

```javascript
// Mendeteksi kata yang diulang (typo pengetikan ganda)
const regex = /\b(\w+)\s+\1\b/;

regex.test("hello hello world");  // true  — "hello" diulang
regex.test("hello world");        // false — tidak ada pengulangan
```

**Cara kerjanya:**

```
Pattern: /\b(\w+)\s+\1\b/
              └─1─┘     ↑
                     \1 = harus sama dengan group 1

"hello hello" → (\w+) cocok "hello", lalu \1 mencari "hello" lagi → ✅
"hello world" → (\w+) cocok "hello", lalu \1 mencari "hello" tapi ketemu "world" → ❌
```

**Contoh: mendeteksi tag HTML yang sesuai:**

```javascript
// Pastikan tag pembuka dan penutup sama
const tagRegex = /<(\w+)>.*?<\/\1>/;

tagRegex.test("<b>teks</b>");         // true  — tag sama
tagRegex.test("<b>teks</i>");         // false — tag berbeda
tagRegex.test("<strong>teks</strong>"); // true ✅
```

---

<a name="lookaround"></a>
## 🔭 Lookahead & Lookbehind

**Lookahead** dan **Lookbehind** adalah *zero-width assertions* — mereka mengecek konteks di sekitar karakter, **tapi tidak ikut masuk ke hasil match**.

| Syntax | Nama | Arti |
|---|---|---|
| `(?=...)` | Positive lookahead | Harus diikuti oleh ... |
| `(?!...)` | Negative lookahead | Tidak boleh diikuti oleh ... |
| `(?<=...)` | Positive lookbehind | Harus didahului oleh ... |
| `(?<!...)` | Negative lookbehind | Tidak boleh didahului oleh ... |

### 1. Positive Lookahead `(?=...)`

```javascript
// Ambil angka yang DIIKUTI " USD"
"100 USD dan 200 EUR".match(/\d+(?= USD)/g);
// Output: ['100']  ← hanya angka sebelum " USD"
// (tapi " USD"-nya sendiri tidak masuk hasil)
```

```
Pattern: /\d+(?= USD)/

"100 USD dan 200 EUR"
 ↑↑↑ ↑↑↑↑
 |||  |||└── lookahead: cek ada " USD" di sini? Ya ✅
 |||  └───── " USD" tidak masuk hasil
 └────────── "100" yang masuk hasil
```

### 2. Negative Lookahead `(?!...)`

```javascript
// Ambil angka yang TIDAK diikuti " USD"
"100 USD dan 200 EUR".match(/\d+(?! USD)/g);
// Output: ['10', '200']
// (perlu hati-hati: "10" dari "100" juga cocok)
```

### 3. Positive Lookbehind `(?<=...)`

```javascript
// Ambil angka yang DIDAHULUI "Rp"
"Harga: Rp5000 dan $200".match(/(?<=Rp)\d+/g);
// Output: ['5000']  ← hanya angka setelah "Rp"
```

### 4. Negative Lookbehind `(?<!...)`

```javascript
// Ambil angka yang TIDAK didahului "Rp"
"Harga: Rp5000 dan $200".match(/(?<!Rp)\d+/g);
// Output: ['200']
```

### 5. Contoh Nyata — Validasi Password dengan Lookahead

Lookahead sangat berguna untuk memvalidasi bahwa string mengandung beberapa kondisi sekaligus:

```javascript
// Password harus:
// - Min 8 karakter
// - Ada huruf kecil
// - Ada huruf besar
// - Ada angka
// - Ada simbol (@$!%*?&)

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
//                      ↑           ↑           ↑        ↑
//                   ada huruf   ada huruf   ada angka ada simbol
//                   kecil       besar

console.log(passwordRegex.test("MyPass123!"));  // true  ✅
console.log(passwordRegex.test("password"));    // false ❌ (tidak ada huruf besar, angka, simbol)
console.log(passwordRegex.test("PASSWORD1!"));  // false ❌ (tidak ada huruf kecil)
console.log(passwordRegex.test("MyPass!"));     // false ❌ (tidak ada angka, kurang dari 8)
```

**Kenapa pakai lookahead?** Karena setiap `(?=.*...)` mengecek kondisi dari **awal string tanpa menggerakkan kursor** — sehingga semua kondisi dicek secara independen.

```
"MyPass123!"  diperiksa:
  (?=.*[a-z])  → ada 'y','a','s','s' → ✅
  (?=.*[A-Z])  → ada 'M','P' → ✅
  (?=.*\d)     → ada '1','2','3' → ✅
  (?=.*[@$!%]) → ada '!' → ✅
  .{8,}        → panjang = 10 (≥8) → ✅
  Semua lolos → true ✅
```

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 04 — Quantifiers](./04-quantifiers_regex.md)**
- **📖 [Lanjut ke Part 06 — Flags →](./06-flags_regex.md)**
