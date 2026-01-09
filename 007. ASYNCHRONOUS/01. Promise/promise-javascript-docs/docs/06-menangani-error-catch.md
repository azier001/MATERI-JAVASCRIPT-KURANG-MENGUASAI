# 06 - Menangani Error dengan .catch()

## 📌 Apa itu .catch()?

`.catch()` adalah method khusus untuk **menangani error** di Promise. Ini adalah cara yang lebih bersih dan mudah dibaca dibanding menggunakan argumen kedua di `.then()`.

---

## 🔧 Syntax Dasar

```javascript
promise.catch(function(error) {
  // handle error
});
```

### .catch() adalah Shorthand

`.catch(errorHandler)` sebenarnya sama dengan `.then(null, errorHandler)`:

```javascript
// Ini sama:
promise.catch(error => console.log(error));

// Dengan ini:
promise.then(null, error => console.log(error));
```

---

## ❌ Contoh Dasar

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Terjadi kesalahan!"));
  }, 1000);
});

// Menangani error dengan .catch()
promise.catch(error => {
  console.log("Error ditangkap:", error.message);
});

// Output setelah 1 detik:
// Error ditangkap: Terjadi kesalahan!
```

---

## 💡 Contoh Praktis

### Validasi Input

```javascript
function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age < 0) {
      reject(new Error("Umur tidak boleh negatif!"));
    } else if (age < 17) {
      reject(new Error("Belum cukup umur untuk KTP"));
    } else {
      resolve("Boleh buat KTP");
    }
  });
}

// Menggunakan .catch()
checkAge(15)
  .then(result => {
    console.log("✅", result);
  })
  .catch(error => {
    console.log("❌", error.message);
  });

// Output:
// ❌ Belum cukup umur untuk KTP
```

---

### Fetch Data dari Server

```javascript
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId <= 0) {
        reject(new Error("User ID tidak valid"));
      } else if (userId > 100) {
        reject(new Error("User tidak ditemukan"));
      } else {
        resolve({ id: userId, name: "John Doe" });
      }
    }, 1000);
  });
}

// Handle error dengan .catch()
fetchUserData(999)
  .then(user => {
    console.log("User ditemukan:", user.name);
  })
  .catch(error => {
    console.log("Gagal ambil data:", error.message);
  });

// Output:
// Gagal ambil data: User tidak ditemukan
```

---

## 🔗 Kombinasi .then() dan .catch()

Pattern yang paling umum dan direkomendasikan:

```javascript
promise
  .then(result => {
    // Handle sukses
    console.log("Berhasil:", result);
  })
  .catch(error => {
    // Handle error
    console.log("Error:", error.message);
  });
```

**Keuntungan:**
- Kode lebih rapi dan mudah dibaca
- Pemisahan jelas antara success dan error handling
- Mengikuti best practice

---

## ⚡ .catch() Menangkap Semua Error

`.catch()` akan menangkap error dari:

### 1. Promise yang Rejected

```javascript
new Promise((resolve, reject) => {
  reject(new Error("Error 1"));
})
.then(result => {
  console.log(result);
})
.catch(error => {
  console.log("Tertangkap:", error.message);
});

// Output: Tertangkap: Error 1
```

### 2. Error yang Di-throw di Executor

```javascript
new Promise((resolve, reject) => {
  throw new Error("Error 2"); // Sama seperti reject()
})
.then(result => {
  console.log(result);
})
.catch(error => {
  console.log("Tertangkap:", error.message);
});

// Output: Tertangkap: Error 2
```

### 3. Error yang Di-throw di .then()

```javascript
new Promise(resolve => {
  resolve("OK");
})
.then(result => {
  throw new Error("Error 3"); // Error di .then()
})
.catch(error => {
  console.log("Tertangkap:", error.message);
});

// Output: Tertangkap: Error 3
```

---

## 🎯 Multiple Catch

Kamu bisa punya beberapa `.catch()` dalam chain:

```javascript
promise
  .then(result => {
    // Operasi 1
    return result * 2;
  })
  .catch(error => {
    // Catch error dari promise atau .then() pertama
    console.log("Error 1:", error.message);
  })
  .then(result => {
    // Operasi 2
    return result * 2;
  })
  .catch(error => {
    // Catch error dari .then() kedua
    console.log("Error 2:", error.message);
  });
```

---

## 🛡️ .catch() sebagai Safety Net

`.catch()` di akhir chain berfungsi sebagai "jaring pengaman" untuk menangkap semua error:

```javascript
fetchUser(1)
  .then(user => {
    console.log("User:", user);
    return fetchPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return fetchComments(posts[0].id);
  })
  .then(comments => {
    console.log("Comments:", comments);
  })
  .catch(error => {
    // Menangkap error dari mana saja di chain
    console.log("Terjadi error:", error.message);
  });
```

---

## 📊 Perbandingan dengan .then()

### Menggunakan .then() untuk Error

```javascript
promise.then(
  result => console.log(result),
  error => console.log(error) // Error handler
);
```

**Masalah:** Error di dalam success handler tidak tertangkap!

```javascript
promise.then(
  result => {
    throw new Error("Error di sini!");
  },
  error => {
    // Tidak akan menangkap error di atas!
    console.log(error);
  }
);
```

### Menggunakan .catch()

```javascript
promise
  .then(result => {
    throw new Error("Error di sini!");
  })
  .catch(error => {
    // AKAN menangkap error di atas! ✅
    console.log(error.message);
  });
```

**Kesimpulan:** `.catch()` lebih aman dan lebih baik!

---

## 🎨 Variasi Penulisan

### Arrow Function (Singkat)

```javascript
promise.catch(error => console.log(error.message));
```

### Arrow Function (Panjang)

```javascript
promise.catch(error => {
  console.error("Error:", error.message);
  console.error("Stack:", error.stack);
  // Bisa kirim ke logging service
});
```

### Regular Function

```javascript
promise.catch(function(error) {
  console.log(error.message);
});
```

---

## 💼 Best Practices

### 1. Selalu Gunakan .catch()

```javascript
// ❌ Buruk - Tidak handle error
fetchData()
  .then(result => {
    console.log(result);
  });

// ✅ Baik - Ada error handling
fetchData()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

---

### 2. Log Error dengan Informasi Lengkap

```javascript
promise.catch(error => {
  console.error("Error Message:", error.message);
  console.error("Error Stack:", error.stack);
  
  // Opsional: Kirim ke error tracking service
  // sendToErrorTracker(error);
});
```

---

### 3. Berikan Feedback ke User

```javascript
function loadUserProfile(userId) {
  showLoadingSpinner();
  
  fetchUser(userId)
    .then(user => {
      hideLoadingSpinner();
      displayUserProfile(user);
    })
    .catch(error => {
      hideLoadingSpinner();
      showErrorMessage("Gagal memuat profil: " + error.message);
    });
}
```

---

### 4. Jangan Abaikan Error

```javascript
// ❌ Buruk - Error diabaikan
promise.catch(() => {
  // Kosong, error hilang
});

// ✅ Baik - Minimal log
promise.catch(error => {
  console.error("Error:", error);
});
```

---

## ⚠️ Kesalahan Umum

### 1. Lupa Return di .then()

```javascript
promise
  .then(result => {
    // ❌ Lupa return
    processData(result);
  })
  .then(result => {
    console.log(result); // undefined!
  })
  .catch(error => {
    console.log(error);
  });
```

### 2. .catch() di Tempat yang Salah

```javascript
// ❌ Buruk - .catch() terlalu awal
promise
  .catch(error => console.log(error))
  .then(result => {
    // Ini tetap jalan meskipun ada error!
    console.log(result);
  });

// ✅ Baik - .catch() di akhir
promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
```

### 3. Tidak Spesifik dalam Error Message

```javascript
// ❌ Kurang informatif
reject(new Error("Error"));

// ✅ Lebih informatif
reject(new Error(`Gagal mengambil user dengan ID ${userId}: User tidak ditemukan`));
```

---

## 🔄 .catch() Return Value

Seperti `.then()`, `.catch()` juga return Promise baru:

```javascript
promise
  .catch(error => {
    console.log("Error:", error.message);
    return "Default value"; // Recovery
  })
  .then(result => {
    console.log("Lanjut dengan:", result);
  });
```

**Ini memungkinkan error recovery!**

---

## 📝 Ringkasan

- `.catch()` adalah shorthand untuk `.then(null, errorHandler)`
- Digunakan khusus untuk menangani error
- Menangkap error dari Promise, executor, dan `.then()`
- Lebih aman dari error handler di `.then()`
- Sebaiknya selalu ada di akhir chain
- Return Promise baru (bisa dilanjutkan dengan `.then()`)
- Best practice: Selalu handle error dengan `.catch()`

---

**File sebelumnya:** `05-menggunakan-then.md`

**File selanjutnya:** `07-cleanup-dengan-finally.md`

Kita akan belajar cara cleanup dan finalisasi dengan `.finally()`!
