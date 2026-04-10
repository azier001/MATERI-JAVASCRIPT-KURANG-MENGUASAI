# 06 - Response Headers 📋

> **Tujuan Pembelajaran**: Memahami apa itu headers dan cara membacanya dari response

---

## 🤔 Apa itu Headers?

**Headers** adalah **informasi tambahan** yang dikirim bersama request/response.

### 🎭 Analogi: Amplop Surat

```
📬 Amplop (Headers):
   - Pengirim: Server XYZ
   - Tanggal: 10 Jan 2026
   - Jenis: Dokumen Penting
   - Ukuran: 2 KB

📄 Isi Surat (Body):
   - Data JSON yang sebenarnya
```

**Headers** = Informasi di amplop  
**Body** = Isi surat yang sebenarnya

---

## 📋 Response Headers Berisi Apa?

Headers memberitahu kita tentang:

- 📄 **Content-Type**: Format data (JSON, HTML, gambar)
- 📏 **Content-Length**: Ukuran data (dalam bytes)
- 📅 **Date**: Kapan response dikirim
- 🔒 **Cache-Control**: Berapa lama boleh di-cache
- 🌐 **Server**: Server apa yang dipakai
- Dan banyak lagi!

---

## 🔍 Cara Membaca Headers

### Property `response.headers`

```javascript
const response = await fetch(url);

console.log(response.headers);  // Headers object
```

Headers di Fetch adalah **Map-like object** (mirip Map tapi bukan Map).

---

## 💻 Contoh: Baca Satu Header

### Method: `.get()`

```javascript
async function cekHeaders() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  
  // Baca header spesifik
  const contentType = response.headers.get('Content-Type');
  console.log('Content-Type:', contentType);
  // Output: "application/json; charset=utf-8"
  
  const date = response.headers.get('Date');
  console.log('Date:', date);
  // Output: "Sat, 10 Jan 2026 12:00:00 GMT"
}

cekHeaders();
```

**Mudah kan?** Tinggal `response.headers.get('nama-header')` 🎯

---

## 🔄 Contoh: Baca Semua Headers

### Method: Loop dengan `for...of`

```javascript
async function lihatSemuaHeaders() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  
  console.log('📋 Semua Headers:');
  console.log('================');
  
  // Loop semua headers
  for (let [key, value] of response.headers) {
    console.log(`${key}: ${value}`);
  }
}

lihatSemuaHeaders();
```

**Output:**
```
📋 Semua Headers:
================
content-type: application/json; charset=utf-8
date: Sat, 10 Jan 2026 12:00:00 GMT
server: nginx
cache-control: max-age=43200
...
```

---

## 🎯 Headers yang Sering Digunakan

### 1️⃣ **Content-Type** 📄

Memberitahu format data yang dikirim:

```javascript
const contentType = response.headers.get('Content-Type');

if (contentType.includes('application/json')) {
  console.log('Data format JSON');
  const data = await response.json();
} else if (contentType.includes('text/html')) {
  console.log('Data format HTML');
  const html = await response.text();
} else if (contentType.includes('image')) {
  console.log('Data format gambar');
  const blob = await response.blob();
}
```

**Format umum:**
- `application/json` → JSON
- `text/html` → HTML
- `text/plain` → Text biasa
- `image/png` → Gambar PNG
- `image/jpeg` → Gambar JPEG

---

### 2️⃣ **Content-Length** 📏

Ukuran data dalam bytes:

```javascript
const response = await fetch(url);
const size = response.headers.get('Content-Length');

console.log('Ukuran data:', size, 'bytes');

// Convert ke KB
const sizeKB = (size / 1024).toFixed(2);
console.log('Ukuran data:', sizeKB, 'KB');
```

**Berguna untuk:** Progress bar, estimasi waktu download

---

### 3️⃣ **Date** 📅

Kapan response dikirim:

```javascript
const response = await fetch(url);
const date = response.headers.get('Date');

console.log('Response dikirim:', date);
// Output: "Sat, 10 Jan 2026 12:00:00 GMT"

// Convert ke Date object
const responseDate = new Date(date);
console.log('Tanggal lokal:', responseDate.toLocaleString());
```

---

### 4️⃣ **Cache-Control** 🔒

Berapa lama data boleh di-cache:

```javascript
const response = await fetch(url);
const cache = response.headers.get('Cache-Control');

console.log('Cache policy:', cache);
// Output: "max-age=3600" (cache 1 jam)
```

---

## 💡 Contoh Praktis: Cek Tipe Data

```javascript
async function smartFetch(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    
    // Cek Content-Type
    const contentType = response.headers.get('Content-Type');
    console.log('📄 Tipe konten:', contentType);
    
    // Parse sesuai tipe
    if (contentType.includes('json')) {
      const data = await response.json();
      console.log('✅ Parsed sebagai JSON:', data);
      return data;
    } else if (contentType.includes('text')) {
      const text = await response.text();
      console.log('✅ Parsed sebagai Text:', text.substring(0, 100));
      return text;
    } else if (contentType.includes('image')) {
      const blob = await response.blob();
      console.log('✅ Parsed sebagai Blob (gambar)');
      return blob;
    } else {
      console.log('⚠️ Tipe tidak dikenal, gunakan text');
      return await response.text();
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
smartFetch('https://jsonplaceholder.typicode.com/posts/1');
```

**Fungsi ini otomatis mendeteksi tipe data!** 🎯

---

## 🎨 Visualisasi Headers

```
Client Request
     ↓
┌──────────────────────────────┐
│  Server Process              │
└──────────────┬───────────────┘
               ↓
┌──────────────────────────────┐
│  Response                    │
│  ┌────────────────────────┐  │
│  │ Headers (Metadata) 📋  │  │
│  │ - Content-Type: JSON   │  │
│  │ - Content-Length: 1024 │  │
│  │ - Date: 10 Jan 2026    │  │
│  │ - Server: nginx        │  │
│  └────────────────────────┘  │
│  ┌────────────────────────┐  │
│  │ Body (Data) 📦         │  │
│  │ { "name": "John" }     │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
```

---

## 🔧 Method Headers Lainnya

### `.has()` - Cek apakah header ada

```javascript
const response = await fetch(url);

if (response.headers.has('Content-Type')) {
  console.log('✅ Ada Content-Type header');
} else {
  console.log('❌ Tidak ada Content-Type header');
}
```

### `.entries()` - Dapat iterator

```javascript
const response = await fetch(url);

for (let [key, value] of response.headers.entries()) {
  console.log(`${key} = ${value}`);
}
```

### `.keys()` - Dapat semua nama header

```javascript
const response = await fetch(url);

for (let key of response.headers.keys()) {
  console.log('Header:', key);
}
```

### `.values()` - Dapat semua nilai header

```javascript
const response = await fetch(url);

for (let value of response.headers.values()) {
  console.log('Value:', value);
}
```

---

## 💻 Contoh Lengkap: Info Detail Response

```javascript
async function infoResponse(url) {
  try {
    console.log('🔍 Fetching:', url);
    console.log('');
    
    const response = await fetch(url);
    
    // Info Status
    console.log('📊 STATUS INFO:');
    console.log('  Status:', response.status, response.statusText);
    console.log('  OK?:', response.ok);
    console.log('');
    
    // Info Headers
    console.log('📋 HEADERS INFO:');
    console.log('  Content-Type:', response.headers.get('Content-Type'));
    console.log('  Content-Length:', response.headers.get('Content-Length'), 'bytes');
    console.log('  Date:', response.headers.get('Date'));
    console.log('  Server:', response.headers.get('Server'));
    console.log('');
    
    // Semua headers
    console.log('📋 ALL HEADERS:');
    for (let [key, value] of response.headers) {
      console.log(`  ${key}: ${value}`);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Test
infoResponse('https://jsonplaceholder.typicode.com/posts/1');
```

---

## 🎯 Use Case: Download Progress

Pakai Content-Length untuk progress bar:

```javascript
async function downloadWithProgress(url) {
  const response = await fetch(url);
  
  // Dapat total size dari header
  const totalSize = response.headers.get('Content-Length');
  console.log('📦 Total size:', totalSize, 'bytes');
  
  // Setup reader
  const reader = response.body.getReader();
  let downloaded = 0;
  
  while (true) {
    const { done, value } = await reader.read();
    
    if (done) break;
    
    downloaded += value.length;
    const progress = (downloaded / totalSize * 100).toFixed(2);
    
    console.log(`⬇️ Progress: ${progress}%`);
  }
  
  console.log('✅ Download selesai!');
}
```

**Advanced!** Tapi berguna untuk file besar 📥

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Nama Header Case-Sensitive?
```javascript
// ❓ Apakah ini sama?
response.headers.get('content-type');
response.headers.get('Content-Type');
response.headers.get('CONTENT-TYPE');

// ✅ JAWABANNYA: SAMA! Headers tidak case-sensitive
console.log(response.headers.get('content-type'));   // OK
console.log(response.headers.get('Content-Type'));   // OK
console.log(response.headers.get('CONTENT-TYPE'));   // OK
```

**Headers tidak case-sensitive!** 🎯

---

### 2️⃣ Akses Headers Seperti Object
```javascript
// ❌ SALAH! Headers bukan plain object
const contentType = response.headers['Content-Type'];  // undefined!

// ✅ BENAR - Pakai .get()
const contentType = response.headers.get('Content-Type');  // OK!
```

---

### 3️⃣ Lupa Cek Header Ada atau Tidak
```javascript
// ❌ SALAH! Bisa dapat null
const length = response.headers.get('Content-Length');
console.log(length * 2);  // Error kalau null!

// ✅ BENAR - Cek dulu
const length = response.headers.get('Content-Length');
if (length) {
  console.log('Size:', length, 'bytes');
} else {
  console.log('Tidak ada info ukuran');
}
```

---

### 4️⃣ Expect Header yang Tidak Selalu Ada
```javascript
// ❌ Tidak semua response punya semua header!
const server = response.headers.get('Server');  // Bisa null!
const cache = response.headers.get('Cache-Control');  // Bisa null!

// ✅ BENAR - Selalu cek atau pakai default
const server = response.headers.get('Server') || 'Unknown';
console.log('Server:', server);
```

---

## 🎯 Latihan Mini

**Challenge:** Buat function yang:
1. Fetch data dari API
2. Tampilkan Content-Type
3. Tampilkan ukuran data (kalau ada)
4. Tampilkan tanggal response
5. Hitung jumlah total headers

API untuk test:
```
https://jsonplaceholder.typicode.com/posts/1
```

<details>
<summary>💡 Lihat Solusi</summary>

```javascript
async function analyzeResponse(url) {
  try {
    console.log('🔍 Analyzing:', url);
    console.log('');
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    
    // 1. Content-Type
    const contentType = response.headers.get('Content-Type');
    console.log('📄 Content-Type:', contentType);
    
    // 2. Ukuran data
    const size = response.headers.get('Content-Length');
    if (size) {
      console.log('📏 Ukuran:', size, 'bytes');
    } else {
      console.log('📏 Ukuran: Tidak tersedia');
    }
    
    // 3. Tanggal response
    const date = response.headers.get('Date');
    console.log('📅 Tanggal:', date);
    
    // 4. Hitung jumlah headers
    let count = 0;
    for (let [key] of response.headers) {
      count++;
    }
    console.log('🔢 Total headers:', count);
    
    console.log('');
    console.log('✅ Analisis selesai!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Test
analyzeResponse('https://jsonplaceholder.typicode.com/posts/1');
```
</details>

---

## 🏆 Kesimpulan

✅ **Headers** adalah metadata/informasi tambahan dari response

✅ Akses headers dengan `response.headers.get('nama-header')`

✅ Headers **tidak case-sensitive**

✅ **Content-Type** paling sering dipakai (cek format data)

✅ Tidak semua response punya semua headers (selalu cek!)

✅ Headers berguna untuk mengetahui tipe data sebelum parse

---

## 🎓 Selanjutnya

Di file berikutnya (**07-request-headers.md**), kita akan belajar:
- 📤 Cara mengirim custom headers
- 🔑 Headers untuk authentication
- 📋 Headers yang sering dipakai
- ⚠️ Headers yang forbidden (tidak boleh di-set)

**Siap lanjut?** 🚀

---

### 📌 Cheat Sheet Headers

```javascript
// Baca satu header
const type = response.headers.get('Content-Type');

// Cek header ada atau tidak
if (response.headers.has('Content-Length')) {
  // ...
}

// Loop semua headers
for (let [key, value] of response.headers) {
  console.log(key, value);
}

// Headers tidak case-sensitive!
response.headers.get('content-type');   // OK
response.headers.get('Content-Type');   // OK
response.headers.get('CONTENT-TYPE');   // OK
```

**Simpan cheat sheet ini!** 📝
