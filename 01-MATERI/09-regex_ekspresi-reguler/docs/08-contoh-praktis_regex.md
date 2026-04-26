# 💡 Contoh Praktis — Regular Expression

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Regular%20Expression-FF6B6B?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📑 Daftar Isi

- ✉️ [Validasi Email](#email)
- 📱 [Validasi Nomor Telepon Indonesia](#telepon)
- 🔐 [Validasi Password](#password)
- 🏷️ [Ekstrak Hashtag](#hashtag)
- 🌐 [Validasi & Ekstrak URL](#url)
- 💰 [Format Angka Mata Uang](#rupiah)
- 📅 [Konversi Format Tanggal](#tanggal)
- 🧹 [Membersihkan Data](#cleaning)
- 🔗 [Navigation](#navigation)

---

<a name="email"></a>
## ✉️ Validasi Email

```javascript
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

console.log(validateEmail("user@example.com"));    // true
console.log(validateEmail("user@example.co.id"));  // true
console.log(validateEmail("invalid.email"));       // false — tidak ada @
console.log(validateEmail("@example.com"));        // false — tidak ada bagian sebelum @
console.log(validateEmail("user@.com"));           // false — domain tidak valid
```

**Bedah pattern:**

```
/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

^                    → awal string
[a-zA-Z0-9._%+-]+   → bagian sebelum @ (huruf, angka, . _ % + -)
@                    → karakter @ literal
[a-zA-Z0-9.-]+      → nama domain (huruf, angka, titik, strip)
\.                   → titik literal (bukan metacharacter)
[a-zA-Z]{2,}        → TLD minimal 2 huruf (com, id, co, net, ...)
$                    → akhir string
```

**Ekstrak semua email dari teks:**

```javascript
function extractEmails(text) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  return text.match(regex) || [];
}

const teks = "Hubungi kami di info@company.com atau support@help.co.id";
console.log(extractEmails(teks));
// Output: ['info@company.com', 'support@help.co.id']
```

---

<a name="telepon"></a>
## 📱 Validasi Nomor Telepon Indonesia

```javascript
function validatePhone(phone) {
  // Format yang diterima:
  // +62812345678   → dengan kode negara +62
  // 62812345678    → tanpa tanda +
  // 0812345678     → dengan awalan 0
  const regex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return regex.test(phone);
}

console.log(validatePhone("081234567890"));    // true
console.log(validatePhone("+6281234567890"));  // true
console.log(validatePhone("6281234567890"));   // true
console.log(validatePhone("0712345678"));      // false — bukan 08xx
console.log(validatePhone("1234567890"));      // false — format salah
```

**Bedah pattern:**

```
/^(\+62|62|0)8[1-9][0-9]{6,9}$/

^             → awal string
(\+62|62|0)   → kode awal: +62, 62, atau 0
8             → selalu diikuti angka 8
[1-9]         → digit kedua: 1-9 (tidak boleh 0)
[0-9]{6,9}    → sisa: 6 sampai 9 digit angka
$             → akhir string
```

---

<a name="password"></a>
## 🔐 Validasi Password

```javascript
function validatePassword(password) {
  // Syarat:
  // - Minimal 8 karakter
  // - Ada huruf kecil
  // - Ada huruf besar
  // - Ada angka
  // - Ada simbol (@$!%*?&)
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
}

console.log(validatePassword("MyPass123!"));   // true  ✅
console.log(validatePassword("password"));     // false — tidak ada huruf besar, angka, simbol
console.log(validatePassword("Password1"));    // false — tidak ada simbol
console.log(validatePassword("MyPass!"));      // false — tidak ada angka, kurang 8 karakter

// Fungsi dengan pesan error spesifik
function checkPassword(password) {
  const checks = {
    length:    { regex: /.{8,}/,          msg: "Minimal 8 karakter" },
    lowercase: { regex: /(?=.*[a-z])/,    msg: "Ada huruf kecil" },
    uppercase: { regex: /(?=.*[A-Z])/,    msg: "Ada huruf besar" },
    number:    { regex: /(?=.*\d)/,        msg: "Ada angka" },
    symbol:    { regex: /(?=.*[@$!%*?&])/, msg: "Ada simbol (@$!%*?&)" },
  };

  const failed = Object.entries(checks)
    .filter(([, check]) => !check.regex.test(password))
    .map(([, check]) => check.msg);

  return failed.length === 0
    ? { valid: true, message: "Password kuat! ✅" }
    : { valid: false, missing: failed };
}

console.log(checkPassword("MyPass!"));
// Output: { valid: false, missing: ['Ada angka'] }

console.log(checkPassword("MyPass123!"));
// Output: { valid: true, message: 'Password kuat! ✅' }
```

---

<a name="hashtag"></a>
## 🏷️ Ekstrak Hashtag

```javascript
function extractHashtags(text) {
  return text.match(/#\w+/g) || [];
}

const tweet = "Belajar #coding dan #regex itu #seru! #JavaScript";
console.log(extractHashtags(tweet));
// Output: ['#coding', '#regex', '#seru', '#JavaScript']

// Menghitung kemunculan setiap hashtag
function countHashtags(text) {
  const tags = text.match(/#\w+/gi) || [];
  return tags.reduce((count, tag) => {
    const lower = tag.toLowerCase();
    count[lower] = (count[lower] || 0) + 1;
    return count;
  }, {});
}

const posts = "#JavaScript #regex #JavaScript #coding #regex #regex";
console.log(countHashtags(posts));
// Output: { '#javascript': 2, '#regex': 3, '#coding': 1 }
```

---

<a name="url"></a>
## 🌐 Validasi & Ekstrak URL

```javascript
// Validasi URL
function isValidURL(url) {
  const regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/;
  return regex.test(url);
}

console.log(isValidURL("https://www.example.com"));        // true
console.log(isValidURL("http://example.co.id/page?q=1"));  // true
console.log(isValidURL("not a url"));                       // false
console.log(isValidURL("ftp://invalid.com"));               // false

// Ekstrak semua URL dari teks
function extractURLs(text) {
  const regex = /https?:\/\/[^\s<>"{}|\\^`[\]]+/g;
  return text.match(regex) || [];
}

const content = "Kunjungi https://example.com dan http://test.co.id untuk info lebih lanjut.";
console.log(extractURLs(content));
// Output: ['https://example.com', 'http://test.co.id']
```

---

<a name="rupiah"></a>
## 💰 Format Angka Mata Uang

```javascript
// Format angka dengan pemisah ribuan (titik untuk Indonesia)
function formatRupiah(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

console.log(formatRupiah(1500000));   // "1.500.000"
console.log(formatRupiah(25000));     // "25.000"
console.log(formatRupiah(1234567890)); // "1.234.567.890"
```

**Bedah pattern `/\B(?=(\d{3})+(?!\d))/g`:**

```
\B              → bukan word boundary (posisi di dalam angka)
(?=             → positive lookahead:
  (\d{3})+      →   satu atau lebih kelompok 3 digit
  (?!\d)        →   yang tidak diikuti digit lagi (jadi di akhir)
)

Cara kerja pada "1500000":
  Posisi setelah "1"   → 500000 di depan → (\d{3})+ = 2× → (?!\d) ✅ → INSERT "."
  Posisi setelah "15"  → 00000 di depan  → bukan kelipatan 3 → ❌
  Posisi setelah "1500"→ 000 di depan    → (\d{3})+ = 1× → (?!\d) ✅ → INSERT "."
  
Hasil: "1.500.000"
```

```javascript
// Lengkap dengan prefix "Rp"
function formatUang(angka) {
  const formatted = angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp ${formatted}`;
}

console.log(formatUang(75000));    // "Rp 75.000"
console.log(formatUang(1500000)); // "Rp 1.500.000"
```

---

<a name="tanggal"></a>
## 📅 Konversi Format Tanggal

```javascript
// DD/MM/YYYY → YYYY-MM-DD
function convertToISO(dateStr) {
  return dateStr.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
}

console.log(convertToISO("15/03/2024")); // "2024-03-15"
console.log(convertToISO("01/01/2000")); // "2000-01-01"

// Validasi format tanggal DD/MM/YYYY
function isValidDate(dateStr) {
  const regex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(dateStr);
}

console.log(isValidDate("15/03/2024")); // true
console.log(isValidDate("32/13/2024")); // false — tanggal tidak valid
console.log(isValidDate("5/3/2024"));   // false — harus 2 digit
```

**Ekstrak semua tanggal dari teks:**

```javascript
function extractDates(text) {
  const regex = /\b(\d{2})\/(\d{2})\/(\d{4})\b/g;
  const matches = [...text.matchAll(regex)];
  return matches.map(m => ({
    original: m[0],
    day: m[1],
    month: m[2],
    year: m[3]
  }));
}

const laporan = "Dibuat pada 15/03/2024, diperbarui 20/03/2024.";
console.log(extractDates(laporan));
// Output:
// [
//   { original: '15/03/2024', day: '15', month: '03', year: '2024' },
//   { original: '20/03/2024', day: '20', month: '03', year: '2024' }
// ]
```

---

<a name="cleaning"></a>
## 🧹 Membersihkan Data

**Hapus tag HTML:**

```javascript
function stripHTML(html) {
  return html.replace(/<[^>]*>/g, '');
}

stripHTML("<p>Hello <b>World</b></p>");  // "Hello World"
stripHTML("<div class='x'>Teks</div>");  // "Teks"
```

**Normalisasi whitespace:**

```javascript
function normalizeSpaces(text) {
  return text
    .replace(/^\s+|\s+$/g, '')  // trim awal & akhir
    .replace(/\s+/g, ' ');       // collapse whitespace di tengah
}

normalizeSpaces("  Hello    World  "); // "Hello World"
```

**Buat URL slug dari judul:**

```javascript
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')    // hapus karakter bukan huruf/angka/spasi/strip
    .replace(/\s+/g, '-')        // ganti spasi dengan strip
    .replace(/--+/g, '-')        // hapus strip ganda
    .replace(/^-+|-+$/g, '');    // trim strip di awal & akhir
}

console.log(slugify("Hello World!"));          // "hello-world"
console.log(slugify("Belajar REGEX (Part 1)")); // "belajar-regex-part-1"
console.log(slugify("  Spasi  Ganda  "));       // "spasi-ganda"
```

**Sensor/masking data sensitif:**

```javascript
// Sensor kartu kredit — tampilkan hanya 4 digit terakhir
function maskCreditCard(number) {
  return number.replace(/\d(?=\d{4})/g, '*');
}

console.log(maskCreditCard("1234567890123456")); // "************3456"

// Sensor email — tampilkan 2 huruf pertama dan domain
function maskEmail(email) {
  return email.replace(/(?<=.{2}).(?=[^@]*@)/g, '*');
}

console.log(maskEmail("johndoe@example.com")); // "jo*****@example.com"
```

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **⬅️ [Part 07 — Method JavaScript](./07-method-javascript_regex.md)**
- **📖 [Lanjut ke Part 09 — Kesalahan Umum & Tips →](./09-kesalahan-tips_regex.md)**
