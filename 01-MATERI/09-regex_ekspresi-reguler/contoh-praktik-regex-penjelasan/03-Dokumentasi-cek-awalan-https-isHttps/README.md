# 🔒 isHttps — Validasi Awalan HTTPS

![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript)
![Regex](https://img.shields.io/badge/Konsep-Regex-blue)
![Anchor](https://img.shields.io/badge/Konsep-Anchor%20%5E-green)
![Escape](https://img.shields.io/badge/Konsep-Escape%20Character-orange)

> Fungsi untuk memvalidasi apakah sebuah URL **diawali dengan `https://`**, memastikan koneksi aman (secure).

---

## 🔗 Daftar Isi

- 📋 [Deskripsi Soal](#deskripsi-soal)
- 📌 [Aturan Validasi](#aturan-validasi)
- 💡 [Konsep Kunci](#konsep-kunci)
- ⚠️ [Pitfalls](#pitfalls)
- 🔢 [Final Code](#final-code)
- 🧪 [Test Cases](#test-cases)
- 🔑 [Keywords](#keywords)

---

<a name="deskripsi-soal"></a>
## 📋 Deskripsi Soal

Di dunia web, `https://` menandakan bahwa koneksi antara browser dan server **terenkripsi** (aman). Banyak aplikasi perlu memvalidasi apakah URL yang dimasukkan pengguna benar-benar menggunakan protokol HTTPS.

Tugasnya: buat fungsi `isHttps(url)` yang mengembalikan `true` jika URL diawali dengan `https://`, dan `false` jika tidak.

---

<a name="aturan-validasi"></a>
## 📌 Aturan Validasi

URL dianggap **valid HTTPS** jika memenuhi **semua** syarat berikut:

| # | Syarat | Contoh Gagal |
|---|--------|--------------|
| 1 | Input harus bertipe **string** | `null` (bukan string) |
| 2 | Harus **diawali** dengan `https://` | `"http://google.com"` (kurang `s`) |
| 3 | Awalan `https://` harus di **posisi paling depan** | `"Buka https://web.com"` (ada teks di depan) |
| 4 | Tidak peduli huruf besar/kecil (**case insensitive**) | `"HTTPS://GOOGLE.COM"` → tetap valid ✅ |

> 💡 **Kenapa harus di posisi paling depan?**
> Karena URL yang valid selalu dimulai dengan protokolnya (`https://`). Jika ada teks lain di depannya, itu bukan URL murni — melainkan kalimat yang mengandung URL.

---

<a name="konsep-kunci"></a>
## 💡 Konsep Kunci

### 1. Anchor `^` — Mengunci Posisi di Awal String

Anchor `^` memberitahu regex: *"Mulai pencocokan dari karakter pertama string. Tidak boleh ada apapun sebelumnya."*

```js
/^https/.test("https://web.com")       // true  ✅ — dimulai dari https
/^https/.test("Buka https://web.com")  // false ✅ — ada "Buka " di depan
```

```
String: "https://google.com"
         ↑
         ^ menunjuk ke sini (posisi 0)
```

> 💡 **Analogi:** Bayangkan `^` seperti tanda "START" di garis awal lomba lari. Regex hanya akan mulai mencocokkan dari titik itu.

---

### 2. Escape Character `\` — Menjinakkan Karakter Spesial

Karakter `/` punya arti khusus dalam regex literal (sebagai **pembuka dan penutup** pola). Jika kita ingin mencocokkan `/` sebagai teks biasa, kita harus "menjinakkannya" dengan backslash `\`.

```
Tanpa escape:  /^https:///   ← ❌ regex bingung mana penutupnya!
Dengan escape: /^https:\/\// ← ✅ regex tahu \/ itu teks biasa
```

Bedah karakter satu per satu:

```
/^https:\/\//
 │└──┬──┘└┬┘
 │   │    └── \/\/ → dua garis miring "/" yang di-escape
 │   └─────── https: → karakter literal (teks apa adanya)
 └──────────── ^ → anchor: harus dimulai dari sini
```

---

### 3. Flag `i` — Case Insensitive (Abaikan Besar/Kecil)

Secara default, regex itu **kaku** — `h` tidak sama dengan `H`. Flag `i` diletakkan setelah tanda `/` penutup untuk membuat regex tidak peduli huruf besar atau kecil.

```js
// ❌ Tanpa flag i — kaku
/^https:\/\//.test("HTTPS://GOOGLE.COM")  // false

// ✅ Dengan flag i — fleksibel
/^https:\/\//i.test("HTTPS://GOOGLE.COM") // true
/^https:\/\//i.test("hTtPs://web.id")     // true
```

```
/^https:\/\//i
              │
              └── i = ignore case (abaikan besar/kecil)
```

---

### 4. Bedah Pola Lengkap

```
/^https:\/\//i

  ^         → "Mulai dari karakter pertama..."
  https:    → "...cocokkan teks 'https:' secara literal..."
  \/\/      → "...lalu cocokkan '//' (di-escape agar tidak dikira penutup)..."
  i         → "...dan tidak peduli huruf besar atau kecil."
```

Visualisasi proses pengecekan:

```
Input: "https://google.com"

  Posisi 0: ^ cocok? ✅ (ini awal string)
  h → h? ✅
  t → t? ✅
  t → t? ✅
  p → p? ✅
  s → s? ✅
  : → :? ✅
  / → \/? ✅
  / → \/? ✅

  RESULT: true ✅ (semua karakter awalan cocok)
```

```
Input: "http://google.com"

  Posisi 0: ^ cocok? ✅
  h → h? ✅
  t → t? ✅
  t → t? ✅
  p → p? ✅
  : → s? ❌ STOP! (regex mengharapkan 's', tapi ketemu ':')

  RESULT: false ❌
```

---

### 5. Regex vs `startsWith()` — Kapan Pakai yang Mana?

Di JavaScript modern, kita bisa melakukan hal yang sama tanpa regex:

```js
// Versi tanpa regex
function isHttps(url) {
  return url.toLowerCase().startsWith('https://');
}
```

Perbandingan:

| Aspek | Regex | `startsWith()` |
|-------|-------|-----------------|
| Keterbacaan | Perlu belajar sintaks | Langsung mudah dibaca |
| Fleksibilitas | Bisa dikembangkan untuk pola kompleks | Terbatas untuk teks statis |
| Multi-pattern | Mudah: `/^(https\|ftps):\/\//` | Harus pakai `\|\|` manual |
| Lintas bahasa | Bisa dipakai di Python, PHP, Java | Khusus JavaScript |
| Performa | Sedikit lebih lambat untuk kasus simpel | Lebih cepat untuk kasus simpel |

> 💡 **Kapan pakai apa?**
> - Pakai `startsWith()` jika hanya mengecek **satu awalan tetap** yang sederhana.
> - Pakai **Regex** jika pola bisa berkembang, butuh fleksibilitas, atau ingin konsisten lintas bahasa.
> - Dalam konteks **belajar regex**, kita sengaja pakai regex untuk melatih pemahaman pola.

---

<a name="pitfalls"></a>
## ⚠️ Pitfalls

### 1. Lupa Escape Karakter `/`

Percobaan awal yang umum — **langsung tulis `/` tanpa di-escape:**

```js
// ❌ Salah — regex error karena `/` dianggap penutup pola
const regex = /^https:///

// ✅ Benar — escape dengan backslash
const regex = /^https:\/\//
```

| Masalah | Penjelasan |
|---------|------------|
| Syntax Error | `/` di tengah regex literal dianggap sebagai penutup, sisa teks menjadi kode invalid |
| Solusi | Selalu escape karakter `/` menjadi `\/` di dalam regex literal |

---

### 2. Tidak Pakai Anchor `^`

Percobaan yang hanya mengecek **"ada `https://` di mana saja"** tanpa peduli posisi:

```js
// ❌ Salah — tidak pakai ^ (bisa cocok di mana saja dalam string)
const regex = /https:\/\//i
regex.test("Buka https://web.com")  // true ← padahal bukan URL murni!

// ✅ Benar — pakai ^ untuk memastikan di awal
const regex = /^https:\/\//i
regex.test("Buka https://web.com")  // false ✅
```

| Masalah | Penjelasan |
|---------|------------|
| False positive | Tanpa `^`, regex menemukan `https://` di tengah kalimat dan menganggapnya valid |
| Solusi | Selalu pakai `^` jika ingin memastikan pola ada di **awal** string |

---

### 3. Lupa Flag `i` (Case Sensitive)

```js
// ❌ Kurang fleksibel — hanya terima huruf kecil
const regex = /^https:\/\//
regex.test("HTTPS://GOOGLE.COM")  // false ← padahal URL-nya valid!

// ✅ Tambahkan flag i
const regex = /^https:\/\//i
regex.test("HTTPS://GOOGLE.COM")  // true ✅
```

| Masalah | Penjelasan |
|---------|------------|
| Menolak URL valid | Banyak sistem menulis URL dalam huruf besar, regex tanpa `i` akan salah menolak |
| Solusi | Tambahkan flag `i` di akhir regex untuk mengabaikan besar/kecil |

---

### 4. Input Bukan String — Error!

Jika user memasukkan `null`, `undefined`, atau angka, fungsi bisa **crash:**

```js
// ❌ Tanpa pengecekan tipe
function isHttps(url) {
  return /^https:\/\//i.test(url);
}
isHttps(null)  // false (kebetulan tidak error di test, tapi tidak aman)
isHttps(123)   // false

// ✅ Dengan guard — lebih aman dan eksplisit
function isHttps(url) {
  if (typeof url !== 'string') return false;
  return /^https:\/\//i.test(url);
}
```

| Masalah | Penjelasan |
|---------|------------|
| Unexpected behavior | `test()` mengkonversi non-string secara implisit, hasilnya bisa tidak terduga |
| Solusi | Tambahkan pengecekan `typeof url !== 'string'` di awal fungsi |

---

### 5. Spasi di Awal String — Silent False

Jika ada spasi di depan URL, anchor `^` langsung gagal:

```js
const regex = /^https:\/\//i;

// ❌ Ada spasi di depan — regex menolak!
regex.test("  https://google.com")  // false ← padahal URL-nya valid

// ✅ Bersihkan dulu dengan trim()
const cleanUrl = "  https://google.com".trim();
regex.test(cleanUrl)  // true ✅
```

```
INPUT: "  https://google.com"
  │
  ▼
┌────────────────────────────────┐
│  STEP 1: url.trim()           │  ← Hapus spasi di ujung
│                                │
│  "  https://..." → "https://…"│
└────────────────────────────────┘
  │
  ▼
┌────────────────────────────────┐
│  STEP 2: /^https:\/\//i.test()│  ← Validasi URL bersih
│                                │
│  "https://google.com" → true ✅│
└────────────────────────────────┘
```

| Masalah | Penjelasan |
|---------|------------|
| Spasi tak terlihat | User bisa tidak sadar ada spasi saat copy-paste URL |
| Solusi | Gunakan `.trim()` sebelum menjalankan regex |

> 💡 **Pelajaran:** Pisahkan tanggung jawab — `.trim()` untuk **membersihkan**, regex untuk **memvalidasi**. Jangan bebankan semua ke regex.

---

<a name="final-code"></a>
## 🔢 Final Code

```js
function isHttps(url) {
  if (typeof url !== 'string') return false;

  const cleanUrl = url.trim();
  const regex = /^https:\/\//i;

  return regex.test(cleanUrl);
}
```

**Alternatif** tanpa regex (menggunakan `startsWith`):

```js
function isHttps(url) {
  if (typeof url !== 'string') return false;

  return url.trim().toLowerCase().startsWith('https://');
}
```

> 💡 Versi `startsWith` lebih mudah dibaca untuk kasus sederhana seperti ini.
> Versi regex lebih baik jika nanti pola perlu dikembangkan (misal: cek `https://` ATAU `ftps://`).

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Fungsi

```js
function isHttps(url) {
  if (typeof url !== 'string') return false;

  const cleanUrl = url.trim();
  const regex = /^https:\/\//i;

  return regex.test(cleanUrl);
}
```

### Console.log

```js
console.log(isHttps('https://google.com'))
```

```
true
```

---

```js
console.log(isHttps('HTTPS://GOOGLE.COM'))    // case insensitive
```

```
true
```

---

```js
console.log(isHttps('http://google.com'))     // kurang 's'
```

```
false
```

---

```js
console.log(isHttps('www.https://web.com'))   // tidak di awal
```

```
false
```

---

```js
console.log(isHttps('  https://github.com'))  // ada spasi di depan
```

```
true
```

---

```js
console.log(isHttps(''))                      // string kosong
```

```
false
```

---

```js
console.log(isHttps(null))                    // bukan string
```

```
false
```

### Hasil

```
true
true
false
false
true
false
false
```

### Test Runner Lengkap

```js
const testCases = [
  // Kasus Valid
  { input: 'https://google.com', expected: true, desc: 'URL https biasa' },
  { input: 'HTTPS://GOOGLE.COM', expected: true, desc: 'Huruf besar semua' },
  { input: 'hTtPs://Mixed.Case', expected: true, desc: 'Campuran besar/kecil' },
  { input: '  https://spasi.com', expected: true, desc: 'Spasi di depan (trim)' },
  { input: 'https://github.com  ', expected: true, desc: 'Spasi di belakang (trim)' },

  // Kasus Tidak Valid
  { input: 'http://google.com', expected: false, desc: 'HTTP tanpa S' },
  { input: 'ftp://server.com', expected: false, desc: 'Protokol FTP' },
  { input: 'www.https://web.com', expected: false, desc: 'https:// bukan di awal' },
  { input: 'Buka https://web.com', expected: false, desc: 'Ada teks di depan' },

  // Edge Cases
  { input: '', expected: false, desc: 'String kosong' },
  { input: null, expected: false, desc: 'Null' },
  { input: undefined, expected: false, desc: 'Undefined' },
  { input: 123, expected: false, desc: 'Number' },
  { input: 'https', expected: false, desc: 'Hanya tulisan https tanpa ://' },
  { input: 'https:', expected: false, desc: 'Kurang //' },
  { input: 'https:/', expected: false, desc: 'Kurang satu /' },
]

function runTests(fn) {
  console.log(`\n=== RUNNING TESTS ===\n`)
  let passCount = 0

  testCases.forEach(({ input, expected, desc }, index) => {
    const result = fn(input)
    const status = JSON.stringify(result) === JSON.stringify(expected) ? '✅ PASS' : '❌ FAIL'
    if (status === '✅ PASS') passCount++
    console.log(`Test #${index + 1}: ${status} - ${desc}`)
    if (status === '❌ FAIL') {
      console.log('  Input   :', input)
      console.log('  Expected:', JSON.stringify(expected))
      console.log('  Result  :', JSON.stringify(result))
    }
  })

  console.log(`\nRESULT: ${passCount}/${testCases.length} Passed\n`)
}

runTests(isHttps)
```

### Hasil Test Runner

```
=== RUNNING TESTS ===

Test #1:  ✅ PASS - URL https biasa
Test #2:  ✅ PASS - Huruf besar semua
Test #3:  ✅ PASS - Campuran besar/kecil
Test #4:  ✅ PASS - Spasi di depan (trim)
Test #5:  ✅ PASS - Spasi di belakang (trim)
Test #6:  ✅ PASS - HTTP tanpa S
Test #7:  ✅ PASS - Protokol FTP
Test #8:  ✅ PASS - https:// bukan di awal
Test #9:  ✅ PASS - Ada teks di depan
Test #10: ✅ PASS - String kosong
Test #11: ✅ PASS - Null
Test #12: ✅ PASS - Undefined
Test #13: ✅ PASS - Number
Test #14: ✅ PASS - Hanya tulisan https tanpa ://
Test #15: ✅ PASS - Kurang //
Test #16: ✅ PASS - Kurang satu /

RESULT: 16/16 Passed
```

---

<a name="keywords"></a>
## 🔑 Keywords

| Keyword | Penjelasan |
|---------|------------|
| `^` | Anchor regex — cocokkan dari **awal** string |
| `\/` | Escape character — menuliskan `/` sebagai teks biasa di dalam regex literal |
| `\` (backslash) | Escape character — "menjinakkan" karakter spesial agar dibaca sebagai teks biasa |
| Flag `i` | Case insensitive — abaikan perbedaan huruf besar/kecil |
| `regex.test()` | Method untuk mengecek apakah string cocok dengan pola regex (return `true`/`false`) |
| `typeof` | Operator JavaScript untuk mengecek tipe data suatu variabel |
| `.trim()` | Method string untuk menghapus spasi di awal dan akhir string |
| `.startsWith()` | Method string bawaan JavaScript untuk mengecek apakah string diawali teks tertentu |
| `.toLowerCase()` | Method string untuk mengubah semua huruf menjadi huruf kecil |
| Early return | Pola kode: langsung `return false` di awal jika kondisi tidak terpenuhi |
