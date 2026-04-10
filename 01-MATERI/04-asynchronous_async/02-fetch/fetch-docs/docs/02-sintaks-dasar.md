# 02 - Sintaks Dasar Fetch 📝

> **Tujuan Pembelajaran**: Memahami dan menulis syntax Fetch yang paling sederhana

---

## 🎯 Syntax Paling Dasar

Ini adalah bentuk **paling simple** dari Fetch:

```javascript
fetch(url)
```

Yup, sesimple itu! 🎉

---

## 📖 Anatomi Fetch

Mari kita bedah satu-satu:

```javascript
fetch(url, options)
```

| Bagian | Penjelasan | Wajib? |
|--------|------------|--------|
| `url` | Alamat yang mau kamu akses | ✅ Wajib |
| `options` | Pengaturan tambahan (method, headers, dll) | ❌ Opsional |

---

## 🚀 Contoh Pertama: GET Request

### Cara 1: Menggunakan `.then()` (Klasik)

```javascript
// Ambil data dari API
fetch('https://api.github.com/users/github')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log('Nama:', data.name);
  });
```

**Penjelasan step-by-step:**

```
1. fetch() → Kirim request ke URL 📤
2. .then() → Tunggu response dari server ⏳
3. response.json() → Ubah response jadi object JavaScript 🔄
4. .then() → Pakai data yang sudah jadi 🎉
```

---

### Cara 2: Menggunakan `async/await` (Modern) ✨

```javascript
async function ambilData() {
  const response = await fetch('https://api.github.com/users/github');
  const data = await response.json();
  
  console.log(data);
  console.log('Nama:', data.name);
}

ambilData();
```

**Lebih mudah dibaca kan?** 😊

---

## 🎨 Visualisasi Proses

```
┌──────────────────────────────────────┐
│  fetch(url)                          │
│  ↓                                   │
│  Kirim Request 📤                    │
└──────────────────┬───────────────────┘
                   │
        ⏳ Tunggu Server ⏳
                   │
┌──────────────────▼───────────────────┐
│  Server kirim Response 📥            │
│  ↓                                   │
│  response.json()                     │
│  ↓                                   │
│  Data siap pakai! 🎉                 │
└──────────────────────────────────────┘
```

---

## 💻 Contoh Praktis: Tampilkan di Web

### HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Belajar Fetch</title>
</head>
<body>
  <h1>Data User GitHub</h1>
  <button onclick="ambilData()">Ambil Data</button>
  <div id="result"></div>
  
  <script src="script.js"></script>
</body>
</html>
```

### JavaScript (script.js)
```javascript
async function ambilData() {
  // Tampilkan loading
  document.getElementById('result').innerHTML = '⏳ Loading...';
  
  try {
    // Ambil data
    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();
    
    // Tampilkan hasil
    document.getElementById('result').innerHTML = `
      <h2>${data.name}</h2>
      <p>Username: ${data.login}</p>
      <p>Followers: ${data.followers}</p>
      <img src="${data.avatar_url}" width="100">
    `;
  } catch (error) {
    document.getElementById('result').innerHTML = '❌ Error: ' + error;
  }
}
```

**Hasilnya:** Ketika tombol diklik, data muncul tanpa reload! 🎉

---

## 🔄 Perbandingan `.then()` vs `async/await`

### Menggunakan `.then()` ⛓️
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log('Error:', error));
```

**Kelebihan:**
- ✅ Cara klasik, banyak tutorial pakai ini
- ✅ Bisa chain berkali-kali

**Kekurangan:**
- ❌ Bisa jadi "callback hell" kalau banyak
- ❌ Agak susah dibaca untuk pemula

---

### Menggunakan `async/await` 🌟
```javascript
async function ambilData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error:', error);
  }
}
```

**Kelebihan:**
- ✅ Lebih mudah dibaca (seperti code sinkron)
- ✅ Error handling lebih jelas dengan try-catch
- ✅ Ini cara modern! 🚀

**Kekurangan:**
- ❌ Harus pakai dalam function `async`

---

## 💡 Tips Pro

### 1️⃣ Selalu Pakai `try-catch` dengan async/await
```javascript
async function ambilData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Terjadi error:', error);
  }
}
```

### 2️⃣ Simpan Response Dulu
```javascript
// ✅ Good
const response = await fetch(url);
const data = await response.json();

// ❌ Avoid (sulit di-debug)
const data = await (await fetch(url)).json();
```

### 3️⃣ Pakai Variable yang Jelas
```javascript
// ✅ Good - jelas maksudnya
const userData = await response.json();

// ❌ Bad - kurang jelas
const x = await response.json();
```

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Lupa `await` atau `.then()`
```javascript
// ❌ SALAH! Ini cuma Promise
const data = fetch(url);
console.log(data); // [object Promise]

// ✅ BENAR
const response = await fetch(url);
const data = await response.json();
console.log(data); // Data yang sebenarnya!
```

### 2️⃣ Lupa Pakai `async` pada Function
```javascript
// ❌ SALAH! await harus di dalam async function
function ambilData() {
  const response = await fetch(url); // Error!
}

// ✅ BENAR
async function ambilData() {
  const response = await fetch(url); // OK!
}
```

### 3️⃣ Langsung Pakai Response Tanpa `.json()`
```javascript
// ❌ SALAH!
const response = await fetch(url);
console.log(response.name); // undefined

// ✅ BENAR
const response = await fetch(url);
const data = await response.json(); // Harus di-parse dulu!
console.log(data.name); // Baru bisa akses property
```

### 4️⃣ Tidak Handle Error
```javascript
// ❌ SALAH! Kalau error, aplikasi crash
const data = await fetch(url);

// ✅ BENAR
try {
  const data = await fetch(url);
} catch (error) {
  console.log('Ada error:', error);
}
```

---

## 🎯 Latihan Mini

Coba tulis kode untuk ambil data dari API ini:
```
https://jsonplaceholder.typicode.com/users/1
```

Tampilkan:
- Nama user
- Email user
- Nama perusahaan

<details>
<summary>💡 Lihat Solusi</summary>

```javascript
async function ambilUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await response.json();
    
    console.log('Nama:', user.name);
    console.log('Email:', user.email);
    console.log('Perusahaan:', user.company.name);
  } catch (error) {
    console.error('Error:', error);
  }
}

ambilUser();
```
</details>

---

## 🏆 Kesimpulan

✅ Syntax dasar Fetch: `fetch(url)`  
✅ Ada 2 cara: `.then()` (klasik) dan `async/await` (modern)  
✅ `async/await` lebih mudah dibaca dan direkomendasikan  
✅ Jangan lupa `try-catch` untuk handle error  
✅ Response harus di-parse dulu pakai `.json()`  

---

## 🎓 Selanjutnya

Di file berikutnya (**03-proses-dua-tahap.md**), kita akan belajar:
- 🔍 Kenapa ada 2 `await`/`then`?
- 📊 Apa yang terjadi di belakang layar?
- 🎯 Memahami Response object lebih dalam

**Siap lanjut?** 🚀

---

### 🎁 Bonus: Cheat Sheet

```javascript
// Template Fetch Sederhana
async function ambilData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Copy template ini dan tinggal ganti `url` nya!** 📋
