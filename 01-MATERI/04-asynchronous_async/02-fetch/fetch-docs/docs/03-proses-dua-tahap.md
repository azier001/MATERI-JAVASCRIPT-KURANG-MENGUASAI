# 03 - Proses Dua Tahap Fetch 🎭

> **Tujuan Pembelajaran**: Memahami kenapa Fetch butuh 2 langkah (headers dulu, body kemudian)

---

## 🤔 Kenapa Ada 2 Await/Then?

Pernah bertanya-tanya kenapa kode Fetch seperti ini?

```javascript
const response = await fetch(url);      // 👈 Await ke-1
const data = await response.json();     // 👈 Await ke-2
```

**Kenapa tidak langsung 1 kali aja?** 🧐

Mari kita pahami!

---

## 🎬 Analogi: Pesan Paket Online

Bayangkan kamu pesan barang online:

### 📦 Tahap 1: Kurir Tiba (Response Headers)
```
🚪 *Tok tok tok*
Kurir: "Paket untuk Anda! Ini nota pengirimannya"
Kamu: "OK, terima kasih!"

✅ Kamu tahu:
   - Paket sudah sampai
   - Dari mana paketnya
   - Kapan dikirim
   - Ukuran paket

❌ Kamu BELUM tahu:
   - Isi paketnya apa
```

### 📦 Tahap 2: Buka Paket (Response Body)
```
Kamu: *Buka paket*
"Oh isinya sepatu!"

✅ Sekarang kamu tahu isi paketnya!
```

**Sama seperti Fetch!** 🎯

---

## 🔄 Visualisasi Proses Dua Tahap

```
┌─────────────────────────────────────────────┐
│  TAHAP 1: RESPONSE OBJECT                   │
│  ────────────────────────────────────────   │
│  fetch(url)                                 │
│      ↓                                      │
│  ⏳ Tunggu server...                        │
│      ↓                                      │
│  📋 Dapat Response Object                   │
│     - status: 200                           │
│     - headers: {...}                        │
│     - ok: true                              │
│     - body: [belum dibaca] 📦               │
│                                             │
│  ✅ Cek: Berhasil atau error?               │
│  ✅ Cek: Header apa yang dikirim?           │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│  TAHAP 2: BACA BODY                         │
│  ────────────────────────────────────────   │
│  response.json()                            │
│      ↓                                      │
│  🔓 Buka "paket" data                       │
│      ↓                                      │
│  📄 Dapat data yang bisa dipakai!           │
│     { name: "John", age: 30 }               │
│                                             │
│  ✅ Sekarang bisa pakai datanya!            │
└─────────────────────────────────────────────┘
```

---

## 💻 Contoh Kode dengan Penjelasan Detail

### Menggunakan `.then()`

```javascript
fetch('https://api.github.com/users/github')
  // 👇 TAHAP 1: Dapat response (headers)
  .then(response => {
    console.log('Status:', response.status);      // 200
    console.log('OK?', response.ok);               // true
    console.log('Headers:', response.headers);     // Headers object
    
    // 👇 TAHAP 2: Minta untuk baca body
    return response.json();
  })
  // 👇 Setelah body selesai di-parse
  .then(data => {
    console.log('Data:', data);  // Object data yang lengkap!
    console.log('Nama:', data.name);
  });
```

---

### Menggunakan `async/await`

```javascript
async function ambilData() {
  // 👇 TAHAP 1: Dapat response object
  const response = await fetch('https://api.github.com/users/github');
  
  console.log('Status:', response.status);  // 200
  console.log('OK?', response.ok);          // true
  
  // 👇 TAHAP 2: Baca body sebagai JSON
  const data = await response.json();
  
  console.log('Data:', data);
  console.log('Nama:', data.name);
}

ambilData();
```

---

## 🎯 Kenapa Dipisah Jadi 2 Tahap?

### 1️⃣ **Biar Bisa Cek Status Dulu** ✅

```javascript
const response = await fetch(url);

// Cek dulu apakah berhasil atau error
if (response.ok) {
  const data = await response.json();
  console.log('Sukses!', data);
} else {
  console.log('Error! Status:', response.status);
  // Tidak perlu baca body kalau error!
}
```

**Analogi:** Cek nota paket dulu sebelum buka paketnya.

---

### 2️⃣ **Biar Fleksibel Baca Body** 🔧

Body bisa dibaca dalam berbagai format:

```javascript
const response = await fetch(url);

// Pilih cara baca sesuai kebutuhan:
const text = await response.text();        // Sebagai text biasa
// ATAU
const json = await response.json();        // Sebagai JSON object
// ATAU
const blob = await response.blob();        // Sebagai binary (gambar, file)
```

---

### 3️⃣ **Efisiensi!** ⚡

Headers biasanya kecil (beberapa KB), body bisa besar (MB atau GB).

```
Headers (cepat) 📋 → Cek dulu → Kalau OK baru download body 📦
```

Kalau error, tidak perlu download body yang besar!

---

## 🎨 Diagram Timeline

```
0ms  ──→ fetch(url) dipanggil
         📤 Kirim request ke server
         
50ms ──→ Server terima request
         🔄 Server proses request
         
150ms ─→ Server kirim response headers
         📋 Browser terima headers
         ✅ TAHAP 1 SELESAI
         
         const response = await fetch(url); ← Dapat ini
         
         ↓
         
         response.json() dipanggil
         📥 Mulai download body
         
300ms ─→ Body selesai di-download
         🔄 Parse JSON
         ✅ TAHAP 2 SELESAI
         
         const data = await response.json(); ← Dapat ini
```

---

## 💡 Response Object Punya Apa Saja?

Setelah tahap 1, kamu dapat **Response object** dengan properties:

```javascript
const response = await fetch(url);

// Yang bisa langsung diakses (tanpa await):
console.log(response.status);      // 200, 404, 500, dll
console.log(response.statusText);  // "OK", "Not Found", dll
console.log(response.ok);          // true jika 200-299
console.log(response.url);         // URL lengkap
console.log(response.headers);     // Headers object

// Yang butuh await (untuk baca body):
const data = await response.json();       // Baca sebagai JSON
const text = await response.text();       // Baca sebagai text
const blob = await response.blob();       // Baca sebagai binary
```

---

## 🔍 Contoh Praktis: Cek Status Dulu

```javascript
async function ambilDataAman() {
  try {
    // TAHAP 1: Dapat response
    const response = await fetch('https://api.example.com/data');
    
    console.log('Response diterima!');
    console.log('Status:', response.status);
    
    // Cek status sebelum baca body
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    
    // TAHAP 2: Baru baca body kalau OK
    const data = await response.json();
    console.log('Data:', data);
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

**Ini best practice!** 👍

---

## ⚠️ Kesalahan Umum Pemula

### 1️⃣ Mengira Response Sudah Berisi Data
```javascript
// ❌ SALAH!
const response = await fetch(url);
console.log(response.name);  // undefined! Response bukan data!

// ✅ BENAR
const response = await fetch(url);
const data = await response.json();  // Parse dulu!
console.log(data.name);  // Baru bisa akses property
```

---

### 2️⃣ Baca Body Dua Kali
```javascript
// ❌ SALAH!
const response = await fetch(url);
const data1 = await response.json();
const data2 = await response.json();  // ERROR! Body sudah dibaca

// ✅ BENAR
const response = await fetch(url);
const data = await response.json();
// Kalau perlu lagi, pakai variable 'data'
```

**Kenapa error?** Body cuma bisa dibaca 1 kali! Seperti air yang sudah diminum, tidak bisa diminum lagi.

---

### 3️⃣ Tidak Cek `response.ok`
```javascript
// ❌ SALAH! Langsung parse
const response = await fetch(url);
const data = await response.json();  // Bisa error kalau status 404/500!

// ✅ BENAR
const response = await fetch(url);
if (response.ok) {
  const data = await response.json();
} else {
  console.log('Request gagal!');
}
```

---

### 4️⃣ Lupa Await di Tahap 2
```javascript
// ❌ SALAH!
const response = await fetch(url);
const data = response.json();  // Lupa await!
console.log(data);  // [object Promise] ❌

// ✅ BENAR
const response = await fetch(url);
const data = await response.json();  // Pakai await!
console.log(data);  // Object yang benar ✅
```

---

## 🎯 Latihan Mini

**Challenge:** Buat function yang:
1. Fetch data dari API
2. Cek status responsenya
3. Kalau status 200-299, tampilkan data
4. Kalau status error, tampilkan pesan error

API untuk latihan:
```
https://jsonplaceholder.typicode.com/posts/1
```

<details>
<summary>💡 Lihat Solusi</summary>

```javascript
async function ambilPost() {
  try {
    // TAHAP 1: Dapat response
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    console.log('📋 Status:', response.status);
    console.log('✅ OK?:', response.ok);
    
    // Cek status
    if (response.ok) {
      // TAHAP 2: Baca body
      const post = await response.json();
      
      console.log('🎉 Berhasil!');
      console.log('Judul:', post.title);
      console.log('Isi:', post.body);
    } else {
      console.log('❌ Request gagal! Status:', response.status);
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

ambilPost();
```
</details>

---

## 🏆 Kesimpulan

✅ Fetch bekerja dalam **2 tahap**:
   - **Tahap 1**: Dapat Response object (headers, status)
   - **Tahap 2**: Baca body (json, text, blob)

✅ **Tahap 1** cepat, **Tahap 2** bisa lambat (tergantung ukuran data)

✅ Pisah tahap biar bisa **cek status** sebelum baca body

✅ Body cuma bisa dibaca **1 kali**!

✅ Selalu cek `response.ok` sebelum parse body

---

## 🎓 Selanjutnya

Di file berikutnya (**04-membaca-response.md**), kita akan belajar:
- 📄 Berbagai cara baca response body
- 🔧 Kapan pakai `.json()`, `.text()`, atau `.blob()`
- 🎯 Contoh praktis untuk setiap cara

**Siap lanjut?** 🚀

---

### 📌 Ingat Ini!

```javascript
// Template 2 Tahap yang Aman:
const response = await fetch(url);  // TAHAP 1
if (response.ok) {
  const data = await response.json();  // TAHAP 2
  // Pakai data di sini
} else {
  // Handle error di sini
}
```

**Selalu cek `response.ok` sebelum parse!** 🎯
