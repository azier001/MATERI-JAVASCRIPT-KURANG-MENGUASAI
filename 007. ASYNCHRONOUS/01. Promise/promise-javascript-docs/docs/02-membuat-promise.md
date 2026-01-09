# 02 - Membuat Promise

## 📌 Syntax Dasar

Cara membuat Promise menggunakan constructor:

```javascript
let promise = new Promise(function(resolve, reject) {
  // executor (kode yang dijalankan)
});
```

---

## 🔧 Komponen Promise

### 1️⃣ Constructor `new Promise()`

Membuat objek Promise baru.

### 2️⃣ Executor Function

Fungsi yang otomatis dijalankan saat Promise dibuat.

```javascript
function(resolve, reject) {
  // kode di sini langsung dijalankan
}
```

### 3️⃣ Parameter `resolve` dan `reject`

Dua fungsi callback yang disediakan JavaScript:

| Parameter | Kapan Dipanggil | Fungsi |
|-----------|-----------------|--------|
| `resolve(value)` | Ketika berhasil | Mengirim hasil sukses |
| `reject(error)` | Ketika gagal | Mengirim error |

---

## 💡 Contoh Sederhana

### Contoh 1: Promise yang Berhasil

```javascript
let promise = new Promise(function(resolve, reject) {
  // Simulasi operasi yang butuh waktu
  setTimeout(() => {
    resolve("Selesai!");
  }, 1000);
});

console.log(promise); // Promise { <pending> }
// Setelah 1 detik, promise berubah jadi fulfilled
```

**Penjelasan:**
- Promise dibuat dan executor langsung jalan
- Setelah 1 detik, `resolve("Selesai!")` dipanggil
- Promise berubah status dari pending ke fulfilled

---

### Contoh 2: Promise yang Gagal

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    reject(new Error("Terjadi kesalahan!"));
  }, 1000);
});

console.log(promise); // Promise { <pending> }
// Setelah 1 detik, promise berubah jadi rejected
```

**Penjelasan:**
- Sama seperti contoh 1, tapi kali ini memanggil `reject()`
- Promise berubah status dari pending ke rejected

---

## ⚙️ Cara Kerja Executor

### Executor Langsung Dijalankan

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log("Executor jalan!");
});

console.log("Setelah Promise dibuat");

// Output:
// "Executor jalan!"
// "Setelah Promise dibuat"
```

> **Penting:** Executor dijalankan **otomatis dan langsung** saat `new Promise()` dibuat.

---

### Hanya Panggil Salah Satu

Executor harus memanggil **resolve ATAU reject**, tidak keduanya:

```javascript
let promise = new Promise(function(resolve, reject) {
  
  if (Math.random() > 0.5) {
    resolve("Berhasil!");
  } else {
    reject(new Error("Gagal!"));
  }
  
});
```

---

## 🎯 Contoh Praktis

### Simulasi Download File

```javascript
function downloadFile(filename) {
  return new Promise(function(resolve, reject) {
    
    console.log(`Mulai download: ${filename}`);
    
    // Simulasi download dengan setTimeout
    setTimeout(() => {
      
      // Simulasi: 80% berhasil, 20% gagal
      if (Math.random() > 0.2) {
        resolve(`${filename} berhasil didownload!`);
      } else {
        reject(new Error(`${filename} gagal didownload!`));
      }
      
    }, 2000); // 2 detik
    
  });
}

// Cara pakai (akan dipelajari di file berikutnya)
let filePromise = downloadFile("gambar.jpg");
```

---

### Cek Umur User

```javascript
function cekUmur(umur) {
  return new Promise(function(resolve, reject) {
    
    if (umur >= 17) {
      resolve("Boleh buat KTP");
    } else {
      reject(new Error("Belum cukup umur"));
    }
    
  });
}

let cekUser = cekUmur(20); // Promise berhasil
let cekAnak = cekUmur(15); // Promise gagal
```

---

## 📦 Promise yang Langsung Selesai

Promise tidak harus asynchronous. Bisa langsung resolve/reject:

```javascript
// Langsung resolve
let promiseCepat = new Promise(function(resolve, reject) {
  resolve(123); // langsung!
});

// Langsung reject
let promiseGagal = new Promise(function(resolve, reject) {
  reject(new Error("Error!"));
});
```

**Kapan berguna?**
- Ketika data sudah ada di cache
- Validasi data sebelum operasi asynchronous
- Testing

---

## ⚠️ Hal Penting yang Perlu Diingat

### 1. Executor Langsung Jalan

```javascript
console.log("1");

let promise = new Promise(function(resolve, reject) {
  console.log("2"); // Langsung jalan!
});

console.log("3");

// Output:
// "1"
// "2" 
// "3"
```

### 2. resolve/reject Disediakan JavaScript

Kamu **tidak perlu** membuat fungsi resolve dan reject sendiri:

```javascript
// ❌ SALAH - Tidak perlu buat sendiri
function resolve(value) { ... }
function reject(error) { ... }

// ✅ BENAR - Langsung pakai parameter
new Promise(function(resolve, reject) {
  resolve("OK");
});
```

### 3. Executor Hanya Sekali

Executor dijalankan hanya **1 kali** saat Promise dibuat:

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log("Jalan 1x saja");
  resolve("OK");
});

// Executor tidak jalan lagi meskipun promise diakses
promise.then(result => console.log(result));
```

---

## 🎨 Template Dasar

Gunakan template ini untuk membuat Promise:

```javascript
function namaFungsi(parameter) {
  return new Promise(function(resolve, reject) {
    
    // 1. Lakukan operasi (bisa asynchronous)
    
    // 2. Jika berhasil:
    resolve(hasil);
    
    // 3. Jika gagal:
    reject(new Error("Pesan error"));
    
  });
}
```

---

## 📝 Ringkasan

- Promise dibuat dengan `new Promise(executor)`
- Executor otomatis dijalankan saat Promise dibuat
- Executor menerima 2 parameter: `resolve` dan `reject`
- Panggil `resolve(value)` jika berhasil
- Panggil `reject(error)` jika gagal
- Promise bisa langsung resolve/reject tanpa async

---

**File sebelumnya:** `01-pengenalan-promise.md`

**File selanjutnya:** `03-state-dan-lifecycle.md`

Kita akan pelajari status dan siklus hidup Promise!
