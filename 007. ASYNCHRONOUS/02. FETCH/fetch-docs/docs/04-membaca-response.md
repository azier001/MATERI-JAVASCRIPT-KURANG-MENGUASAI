# 04 - Membaca Response Body 📖

> **Tujuan Pembelajaran**: Memahami berbagai cara membaca response dan kapan menggunakannya

---

## 🎯 Response Body Bisa Dibaca Dengan Berbagai Cara!

Setelah dapat Response object, kamu bisa baca body-nya dengan berbagai metode:

```javascript
const response = await fetch(url);

// Pilih salah satu:
response.json()         // 📄 Untuk data JSON
response.text()         // 📝 Untuk text biasa
response.blob()         // 🖼️ Untuk binary (gambar, video)
response.formData()     // 📋 Untuk form data
response.arrayBuffer()  // 🔢 Untuk low-level binary
```

**Tapi tunggu dulu!** Kamu hanya bisa pakai **SATU** cara per response! 🚨

---

## 📄 Method 1: `.json()` - Untuk Data JSON

### 🎯 Kapan Pakai?
- Data dari API (biasanya format JSON)
- Dapat object/array JavaScript
- **Paling sering dipakai!** ⭐

### 💻 Contoh Sederhana

```javascript
async function ambilUser() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const data = await response.json();  // Parse JSON jadi Object
  
  console.log(data);
  console.log('Nama:', data.name);
  console.log('Email:', data.email);
}

ambilUser();
```

**Output:**
```javascript
{
  id: 1,
  name: "Leanne Graham",
  email: "Sincere@april.biz",
  // ... data lainnya
}
```

---

### 🔍 Di Balik Layar `.json()`

```
Response Body (String):        response.json():
'{"name":"John","age":30}'  →  {name: "John", age: 30}
      📝 Text                      🎁 Object JavaScript
```

Sama seperti `JSON.parse()` tapi dilakukan otomatis!

---

## 📝 Method 2: `.text()` - Untuk Text Biasa

### 🎯 Kapan Pakai?
- Dapat HTML
- Dapat plain text
- Dapat CSV
- Response bukan JSON

### 💻 Contoh Sederhana

```javascript
async function ambilHTML() {
  const response = await fetch('https://example.com');
  const html = await response.text();  // Dapat string HTML
  
  console.log(html);
  // Output: "<html><body>...</body></html>"
}

ambilHTML();
```

---

### 💡 Contoh: Ambil Text File

```javascript
async function ambilTextFile() {
  const response = await fetch('https://example.com/data.txt');
  const text = await response.text();
  
  console.log(text);
  // Output: Isi file text.txt
}

ambilTextFile();
```

---

## 🖼️ Method 3: `.blob()` - Untuk Binary Data

### 🎯 Kapan Pakai?
- Download gambar
- Download file
- Dapat video/audio
- Segala yang berbentuk file

### 💻 Contoh: Download Gambar

```javascript
async function downloadGambar() {
  const response = await fetch('https://via.placeholder.com/150');
  const blob = await response.blob();  // Dapat binary data
  
  // Buat URL untuk blob
  const imageUrl = URL.createObjectURL(blob);
  
  // Tampilkan di halaman
  const img = document.createElement('img');
  img.src = imageUrl;
  document.body.appendChild(img);
}

downloadGambar();
```

**Hasilnya:** Gambar muncul di halaman! 🖼️

---

### 🎨 Visualisasi Blob

```
Server          Browser
  📦  ─────→  Blob object ─────→  URL.createObjectURL()
(File)       (Binary data)              ↓
                               blob:http://...abc123
                                     ↓
                               <img src="blob:...">
                                     ↓
                               Gambar ditampilkan! 🖼️
```

---

### 💾 Contoh: Download File

```javascript
async function downloadFile() {
  const response = await fetch('https://example.com/document.pdf');
  const blob = await response.blob();
  
  // Buat link download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.pdf';  // Nama file
  a.click();  // Trigger download!
  
  // Cleanup
  URL.revokeObjectURL(url);
}
```

**Hasilnya:** File otomatis ke-download! 📥

---

## 📋 Method 4: `.formData()` - Untuk Form Data

### 🎯 Kapan Pakai?
- Response dari form submission
- Data format `multipart/form-data`

### 💻 Contoh

```javascript
async function ambilFormData() {
  const response = await fetch('https://example.com/form-data');
  const formData = await response.formData();
  
  // Akses data
  console.log(formData.get('username'));
  console.log(formData.get('email'));
}
```

**Jarang dipakai untuk response**, lebih sering untuk **request**!

---

## 🔢 Method 5: `.arrayBuffer()` - Low-Level Binary

### 🎯 Kapan Pakai?
- Manipulasi binary data
- WebAssembly
- Cryptography
- **Advanced use case!** ⚠️

### 💻 Contoh

```javascript
async function ambilBinary() {
  const response = await fetch('https://example.com/data.bin');
  const buffer = await response.arrayBuffer();
  
  console.log(buffer);  // ArrayBuffer(1024)
  
  // Manipulasi binary data...
  const view = new Uint8Array(buffer);
  console.log(view[0]);  // Byte pertama
}
```

**Untuk pemula:** Skip dulu method ini! 😊

---

## 🎯 Perbandingan Semua Method

| Method | Return Type | Kapan Pakai | Frequency |
|--------|-------------|-------------|-----------|
| `.json()` | Object/Array | API data | ⭐⭐⭐⭐⭐ |
| `.text()` | String | HTML/text | ⭐⭐⭐ |
| `.blob()` | Blob | Gambar/file | ⭐⭐⭐ |
| `.formData()` | FormData | Form data | ⭐⭐ |
| `.arrayBuffer()` | ArrayBuffer | Binary advanced | ⭐ |

**90% kasus pakai `.json()`!** 🎯

---

## 💻 Contoh Praktis Lengkap

### Scenario: Ambil & Tampilkan Post dari API

```javascript
async function tampilkanPost() {
  try {
    // 1. Fetch data
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    // 2. Cek status
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    // 3. Parse JSON
    const post = await response.json();
    
    // 4. Tampilkan di HTML
    document.getElementById('content').innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <small>User ID: ${post.userId}</small>
    `;
    
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('content').innerHTML = '❌ Gagal memuat data';
  }
}

tampilkanPost();
```

---

### Scenario: Download & Preview Gambar

```javascript
async function previewGambar(url) {
  try {
    // 1. Fetch gambar
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    // 2. Parse sebagai blob
    const blob = await response.blob();
    
    // 3. Buat URL
    const imageUrl = URL.createObjectURL(blob);
    
    // 4. Tampilkan
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '300px';
    document.body.appendChild(img);
    
    // 5. Cleanup setelah 3 detik
    setTimeout(() => {
      URL.revokeObjectURL(imageUrl);
    }, 3000);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

previewGambar('https://via.placeholder.com/300');
```

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Pakai Method yang Salah
```javascript
// ❌ SALAH! API kirim JSON tapi pakai .text()
const response = await fetch('https://api.example.com/data');
const data = await response.text();
console.log(data);  // String, bukan object!

// ✅ BENAR
const data = await response.json();  // Object!
console.log(data.name);  // Bisa akses property
```

---

### 2️⃣ Baca Body 2 Kali
```javascript
// ❌ SALAH! Body cuma bisa dibaca 1x
const response = await fetch(url);
const data1 = await response.json();
const data2 = await response.json();  // ERROR! ❌

// ✅ BENAR - Simpan di variable
const response = await fetch(url);
const data = await response.json();
console.log(data);  // Pakai variable ini berkali-kali
console.log(data);  // OK!
```

**Kenapa?** Body adalah **stream** yang sekali dibaca habis! 🌊

---

### 3️⃣ Lupa Await
```javascript
// ❌ SALAH!
const response = await fetch(url);
const data = response.json();  // Lupa await!
console.log(data.name);  // ERROR! data masih Promise

// ✅ BENAR
const data = await response.json();  // Pakai await!
console.log(data.name);  // OK!
```

---

### 4️⃣ Tidak Handle Error Parsing
```javascript
// ❌ SALAH! Kalau response bukan JSON, error!
const data = await response.json();

// ✅ BENAR
try {
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Gagal parse JSON:', error);
}
```

---

## 🎯 Latihan Mini

**Challenge 1:** Ambil data user dari API dan tampilkan nama + email
```
API: https://jsonplaceholder.typicode.com/users/2
```

**Challenge 2:** Ambil HTML dari website dan hitung berapa kali kata "the" muncul
```
URL: https://example.com
```

<details>
<summary>💡 Lihat Solusi Challenge 1</summary>

```javascript
async function tampilkanUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/2');
    
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    
    const user = await response.json();
    
    console.log('👤 Nama:', user.name);
    console.log('📧 Email:', user.email);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

tampilkanUser();
```
</details>

<details>
<summary>💡 Lihat Solusi Challenge 2</summary>

```javascript
async function hitungKata() {
  try {
    const response = await fetch('https://example.com');
    
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Hitung kata "the" (case insensitive)
    const count = (html.match(/\bthe\b/gi) || []).length;
    
    console.log(`Kata "the" muncul ${count} kali`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

hitungKata();
```
</details>

---

## 🏆 Kesimpulan

✅ Ada **5 method** untuk baca response body

✅ **`.json()`** paling sering dipakai (untuk API)

✅ **`.text()`** untuk HTML/text biasa

✅ **`.blob()`** untuk gambar/file

✅ Body **hanya bisa dibaca 1 kali**!

✅ Pilih method sesuai **tipe data** yang dikirim server

✅ Jangan lupa **await** dan **error handling**!

---

## 🎓 Selanjutnya

Di file berikutnya (**05-memeriksa-status.md**), kita akan belajar:
- 🔍 Cara cek apakah request berhasil
- 📊 Memahami HTTP status codes
- ⚠️ Menangani berbagai jenis error
- 🎯 Best practice error handling

**Siap lanjut?** 🚀

---

### 📌 Cheat Sheet

```javascript
// Template untuk berbagai tipe response:

// JSON (paling umum)
const data = await response.json();

// Text/HTML
const text = await response.text();

// Gambar/File
const blob = await response.blob();
const url = URL.createObjectURL(blob);

// INGAT: Pilih SATU method saja! ☝️
```

**Simpan cheat sheet ini!** 📝
