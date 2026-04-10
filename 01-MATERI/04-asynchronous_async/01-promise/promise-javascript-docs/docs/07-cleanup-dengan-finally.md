# 07 - Cleanup dengan .finally()

## 📌 Apa itu .finally()?

`.finally()` adalah method yang **selalu dijalankan** setelah Promise selesai, tidak peduli berhasil atau gagal. Cocok untuk cleanup dan finalisasi.

---

## 🔧 Syntax Dasar

```javascript
promise.finally(function() {
  // Cleanup code
});
```

**Karakteristik:**
- Tidak menerima argumen
- Jalan setelah Promise settled (fulfilled atau rejected)
- Tidak mengubah hasil Promise

---

## ⚡ Kapan .finally() Dipanggil?

`.finally()` **selalu** jalan, apapun hasilnya:

### Saat Promise Fulfilled

```javascript
let promise = new Promise(resolve => {
  setTimeout(() => resolve("Berhasil!"), 1000);
});

promise
  .finally(() => {
    console.log("1. Finally jalan");
  })
  .then(result => {
    console.log("2. Then:", result);
  });

// Output:
// 1. Finally jalan
// 2. Then: Berhasil!
```

### Saat Promise Rejected

```javascript
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Gagal!")), 1000);
});

promise
  .finally(() => {
    console.log("1. Finally jalan");
  })
  .catch(error => {
    console.log("2. Catch:", error.message);
  });

// Output:
// 1. Finally jalan
// 2. Catch: Gagal!
```

---

## 💡 Contoh Praktis

### Loading Spinner

```javascript
function fetchData() {
  // Tampilkan loading
  showLoadingSpinner();
  
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
    .catch(error => {
      showError(error.message);
    })
    .finally(() => {
      // Sembunyikan loading (selalu jalan)
      hideLoadingSpinner();
    });
}
```

**Keuntungan:** Tidak perlu tulis `hideLoadingSpinner()` di 2 tempat (then dan catch)!

---

### Close Database Connection

```javascript
function getUserData(userId) {
  let connection;
  
  return connectToDatabase()
    .then(conn => {
      connection = conn;
      return connection.query(`SELECT * FROM users WHERE id = ${userId}`);
    })
    .then(result => {
      return result.rows[0];
    })
    .catch(error => {
      console.error("Database error:", error);
      throw error;
    })
    .finally(() => {
      // Tutup koneksi (selalu jalan)
      if (connection) {
        connection.close();
      }
    });
}
```

---

### File Upload

```javascript
function uploadFile(file) {
  showUploadProgress();
  
  return uploadToServer(file)
    .then(response => {
      showSuccessMessage("File berhasil diupload!");
      return response.url;
    })
    .catch(error => {
      showErrorMessage("Upload gagal: " + error.message);
      throw error;
    })
    .finally(() => {
      // Cleanup UI (selalu jalan)
      hideUploadProgress();
      enableUploadButton();
    });
}
```

---

## 🎯 Perbedaan dengan .then()

### .finally() vs .then(f, f)

Meskipun terlihat mirip, ada perbedaan penting:

```javascript
// Ini BUKAN sama:
promise.finally(() => console.log("Done"));

// Dengan ini:
promise.then(
  () => console.log("Done"),
  () => console.log("Done")
);
```

---

## 🔍 Karakteristik Khusus .finally()

### 1. Tidak Menerima Argumen

```javascript
promise.finally(() => {
  // Tidak tahu apakah sukses atau gagal
  // Tidak dapat akses result atau error
  console.log("Cleanup");
});

// ❌ Ini TIDAK AKAN JALAN
promise.finally((result) => {
  console.log(result); // undefined
});
```

**Kenapa?** Karena tugasnya adalah cleanup umum, bukan proses hasil.

---

### 2. Meneruskan Result/Error

`.finally()` **tidak mengubah** hasil Promise, hanya meneruskannya:

```javascript
new Promise(resolve => {
  setTimeout(() => resolve("Value"), 1000);
})
.finally(() => {
  console.log("Finally");
  // Tidak return apapun
})
.then(result => {
  console.log("Value masih ada:", result); // "Value"
});

// Output:
// Finally
// Value masih ada: Value
```

### Dengan Error:

```javascript
new Promise((resolve, reject) => {
  reject(new Error("Error"));
})
.finally(() => {
  console.log("Finally");
})
.catch(error => {
  console.log("Error masih ada:", error.message);
});

// Output:
// Finally
// Error masih ada: Error
```

---

### 3. Return Value Diabaikan

```javascript
promise
  .finally(() => {
    return "Ini diabaikan";
  })
  .then(result => {
    console.log(result); // Nilai asli dari promise, bukan "Ini diabaikan"
  });
```

**Kecuali:** Jika `.finally()` throw error!

---

### 4. Throw Error di .finally()

Jika `.finally()` throw error, error itu akan menggantikan hasil sebelumnya:

```javascript
new Promise(resolve => {
  resolve("OK");
})
.finally(() => {
  throw new Error("Error di finally!");
})
.then(result => {
  console.log("Tidak akan jalan");
})
.catch(error => {
  console.log("Error:", error.message); // "Error di finally!"
});
```

---

## 📋 Pattern Umum

### Pattern 1: Loading State

```javascript
function loadData() {
  setLoading(true);
  
  fetchData()
    .then(data => {
      processData(data);
    })
    .catch(error => {
      handleError(error);
    })
    .finally(() => {
      setLoading(false);
    });
}
```

---

### Pattern 2: Disable/Enable Button

```javascript
function submitForm(data) {
  disableSubmitButton();
  
  sendToServer(data)
    .then(response => {
      showSuccess(response);
    })
    .catch(error => {
      showError(error);
    })
    .finally(() => {
      enableSubmitButton();
    });
}
```

---

### Pattern 3: Timer/Counter

```javascript
function operasiDenganTimer() {
  startTimer();
  
  doSomething()
    .then(result => {
      console.log("Selesai:", result);
    })
    .catch(error => {
      console.error("Error:", error);
    })
    .finally(() => {
      stopTimer();
      showElapsedTime();
    });
}
```

---

## 🎨 Analogi Sederhana

Bayangkan `.finally()` seperti membersihkan meja setelah makan:

```plaintext
🍽️ MAKAN (Promise)
    │
    ├─ Makanan enak ✅ (fulfilled)
    │  └─ "Kenyang dan senang"
    │
    └─ Makanan basi ❌ (rejected)
       └─ "Sakit perut"

🧹 BERSIH-BERSIH (finally)
    └─ Tetap harus bersihkan meja
       (tidak peduli makanan enak atau basi)
```

---

## ⚠️ Kesalahan Umum

### 1. Mengharapkan Argumen

```javascript
// ❌ Salah - finally tidak dapat argumen
promise.finally((result) => {
  console.log(result); // undefined
});

// ✅ Benar - tidak pakai argumen
promise.finally(() => {
  console.log("Cleanup");
});
```

---

### 2. Mengharapkan Return Value Dipakai

```javascript
// ❌ Salah - return value diabaikan
promise
  .finally(() => {
    return "Default value";
  })
  .then(result => {
    console.log(result); // Bukan "Default value"
  });

// ✅ Benar - jangan return value di finally
promise
  .finally(() => {
    cleanup();
  })
  .then(result => {
    console.log(result);
  });
```

---

### 3. Pakai .finally() untuk Logic

```javascript
// ❌ Buruk - logic di finally
promise.finally(() => {
  if (someCondition) {
    // Logic tidak seharusnya di sini
    doSomething();
  }
});

// ✅ Baik - hanya cleanup
promise
  .then(result => {
    if (someCondition) {
      doSomething();
    }
  })
  .finally(() => {
    cleanup();
  });
```

---

## 🔄 Urutan Eksekusi

```javascript
console.log("1. Start");

let promise = new Promise(resolve => {
  console.log("2. Executor");
  setTimeout(() => {
    console.log("4. Resolve");
    resolve("OK");
  }, 1000);
});

console.log("3. After promise");

promise
  .finally(() => {
    console.log("5. Finally");
  })
  .then(result => {
    console.log("6. Then:", result);
  });

// Output:
// 1. Start
// 2. Executor
// 3. After promise
// 4. Resolve
// 5. Finally
// 6. Then: OK
```

---

## 💼 Best Practices

### 1. Gunakan untuk Cleanup

```javascript
// ✅ Baik - cleanup resources
promise.finally(() => {
  closeConnection();
  clearCache();
  resetState();
});
```

---

### 2. Jangan Ubah State

```javascript
// ❌ Buruk - mengubah state
promise.finally(() => {
  result = modifyResult(result); // Tidak dapat akses result!
});

// ✅ Baik - hanya cleanup
promise.finally(() => {
  hideLoadingSpinner();
});
```

---

### 3. Singkat dan Fokus

```javascript
// ✅ Baik - singkat dan jelas
promise
  .then(processData)
  .catch(handleError)
  .finally(cleanup);
```

---

## 📝 Ringkasan

- `.finally()` **selalu jalan** setelah Promise selesai
- **Tidak menerima argumen** (tidak tahu result atau error)
- **Meneruskan** result/error ke handler berikutnya
- **Return value diabaikan** (kecuali throw error)
- Cocok untuk **cleanup dan finalisasi**
- Contoh: hide loading, close connection, enable button
- Bukan untuk logic, hanya untuk cleanup

---

**File sebelumnya:** `06-menangani-error-catch.md`

**File selanjutnya:** `08-contoh-praktis.md`

Kita akan lihat implementasi nyata dengan contoh loadScript!
