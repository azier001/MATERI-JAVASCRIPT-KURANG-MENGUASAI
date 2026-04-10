# 05 - Menggunakan .then()

## 📌 Apa itu .then()?

`.then()` adalah method untuk **mengambil hasil** dari Promise. Ini adalah cara kita "mendengarkan" ketika Promise selesai.

---

## 🔧 Syntax Dasar

```javascript
promise.then(
  function(result) { /* handle sukses */ },
  function(error) { /* handle error */ }
);
```

`.then()` menerima **2 argumen** (keduanya opsional):

| Argumen | Kapan Dipanggil | Menerima |
|---------|-----------------|----------|
| **Pertama** | Promise fulfilled | Hasil (value) |
| **Kedua** | Promise rejected | Error |

---

## ✅ Contoh: Handle Sukses

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("Berhasil!"), 1000);
});

// Handler untuk sukses
promise.then(
  result => console.log(result), // "Berhasil!"
  error => console.log(error)    // Tidak jalan
);
```

**Output setelah 1 detik:**
```
Berhasil!
```

---

## ❌ Contoh: Handle Error

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Gagal!")), 1000);
});

// Handler untuk error
promise.then(
  result => console.log(result), // Tidak jalan
  error => console.log(error)    // Error: Gagal!
);
```

**Output setelah 1 detik:**
```
Error: Gagal!
```

---

## 🎯 Hanya Handle Sukses

Jika kamu **hanya** tertarik dengan hasil sukses, cukup berikan 1 argumen:

```javascript
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("Data"), 1000);
});

// Hanya handle sukses
promise.then(result => {
  console.log("Dapat data:", result);
});
```

**Catatan:** Error tidak akan ditangani. Ini akan menyebabkan "Unhandled Promise Rejection" jika terjadi error.

---

## 💡 Contoh Praktis

### Download File

```javascript
function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${filename}...`);
    
    setTimeout(() => {
      // Simulasi: 70% berhasil
      if (Math.random() > 0.3) {
        resolve(`${filename} downloaded!`);
      } else {
        reject(new Error(`Failed to download ${filename}`));
      }
    }, 2000);
  });
}

// Menggunakan .then()
downloadFile("photo.jpg").then(
  result => {
    console.log("✅ Sukses:", result);
  },
  error => {
    console.log("❌ Error:", error.message);
  }
);
```

---

### Login User

```javascript
function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "123") {
        resolve({
          id: 1,
          name: "Admin",
          role: "administrator"
        });
      } else {
        reject(new Error("Username atau password salah"));
      }
    }, 1000);
  });
}

// Gunakan .then()
login("admin", "123").then(
  user => {
    console.log("Login berhasil!");
    console.log("Welcome,", user.name);
  },
  error => {
    console.log("Login gagal:", error.message);
  }
);
```

---

## 🔗 Multiple .then()

Kamu bisa memanggil `.then()` **berkali-kali** pada Promise yang sama!

```javascript
let promise = new Promise((resolve) => {
  setTimeout(() => resolve("Data"), 1000);
});

// Handler 1
promise.then(result => {
  console.log("Handler 1:", result);
});

// Handler 2
promise.then(result => {
  console.log("Handler 2:", result);
});

// Handler 3
promise.then(result => {
  console.log("Handler 3:", result);
});

// Output (setelah 1 detik):
// Handler 1: Data
// Handler 2: Data
// Handler 3: Data
```

**Semua handler akan dipanggil!** 🎉

---

## ⏰ Handler pada Promise yang Sudah Selesai

Jika Promise **sudah selesai** saat kamu attach handler, handler akan **langsung dijalankan**:

```javascript
// Promise langsung selesai
let promise = new Promise(resolve => resolve("Selesai!"));

console.log("1. Sebelum .then()");

// Attach handler setelah promise selesai
promise.then(result => {
  console.log("3. Handler jalan:", result);
});

console.log("2. Setelah .then()");

// Output:
// 1. Sebelum .then()
// 2. Setelah .then()
// 3. Handler jalan: Selesai!
```

**Catatan:** Handler tetap asynchronous (jalan belakangan), tapi langsung dijadwalkan.

---

## 🎨 Variasi Penulisan

### Arrow Function (Singkat)

```javascript
promise.then(
  result => console.log(result),
  error => console.log(error)
);
```

### Arrow Function (Panjang)

```javascript
promise.then(
  result => {
    console.log("Dapat hasil:", result);
    // Bisa banyak baris
  },
  error => {
    console.log("Terjadi error:", error);
    // Bisa banyak baris
  }
);
```

### Regular Function

```javascript
promise.then(
  function(result) {
    console.log(result);
  },
  function(error) {
    console.log(error);
  }
);
```

---

## 🔄 .then() Return Value

`.then()` **selalu return Promise baru**, yang memungkinkan chaining!

```javascript
let promise = new Promise(resolve => {
  setTimeout(() => resolve(5), 1000);
});

promise
  .then(result => {
    console.log(result); // 5
    return result * 2;
  })
  .then(result => {
    console.log(result); // 10
    return result * 2;
  })
  .then(result => {
    console.log(result); // 20
  });
```

**Ini akan dipelajari lebih lanjut di promise chaining!**

---

## ⚡ Comparison dengan Callback

### Callback (Cara Lama)

```javascript
function getData(callback) {
  setTimeout(() => {
    callback("Data");
  }, 1000);
}

// Harus siapkan callback dulu
getData(function(data) {
  console.log(data);
});
```

### Promise dengan .then() (Cara Modern)

```javascript
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data");
    }, 1000);
  });
}

// Lebih fleksibel
let promise = getData();

// Bisa attach handler kapan saja
promise.then(data => {
  console.log(data);
});

// Bahkan bisa attach handler lagi
promise.then(data => {
  console.log("Data lagi:", data);
});
```

---

## 📊 Perbandingan

| Callback | Promise dengan .then() |
|----------|------------------------|
| Harus tahu sebelumnya apa yang mau dilakukan | Bisa attach handler kapan saja |
| Hanya bisa 1 callback | Bisa attach banyak handler |
| Callback hell jika nested | Bisa di-chain dengan rapi |
| Sulit handle error | Error handling terstruktur |

---

## ⚠️ Hal yang Perlu Diperhatikan

### 1. Kedua Argumen Opsional

```javascript
// Hanya sukses
promise.then(result => { ... });

// Hanya error
promise.then(null, error => { ... });

// Atau kosong (tapi ngapain? 😅)
promise.then();
```

### 2. Asynchronous

Handler `.then()` selalu dipanggil secara **asynchronous**, bahkan jika Promise sudah selesai:

```javascript
let promise = Promise.resolve("OK");

console.log("1");

promise.then(result => {
  console.log("3:", result);
});

console.log("2");

// Output:
// 1
// 2
// 3: OK
```

### 3. Return Value Penting untuk Chaining

```javascript
promise
  .then(result => {
    console.log(result);
    // Jika tidak return, .then() berikutnya dapat undefined
  })
  .then(result => {
    console.log(result); // undefined
  });
```

---

## 📝 Ringkasan

- `.then()` digunakan untuk mengambil hasil Promise
- Menerima 2 argumen: handler sukses dan handler error
- Bisa dipanggil berkali-kali pada Promise yang sama
- Handler jalan langsung jika Promise sudah selesai
- Selalu asynchronous, bahkan pada Promise yang sudah selesai
- `.then()` return Promise baru (untuk chaining)
- Lebih fleksibel dibanding callback tradisional

---

**File sebelumnya:** `04-aturan-penting.md`

**File selanjutnya:** `06-menangani-error-catch.md`

Kita akan belajar cara menangani error dengan `.catch()`!
