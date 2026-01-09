# 08 - Contoh Praktis: loadScript

## 📌 Permasalahan

Kita perlu memuat script JavaScript secara dinamis dari URL eksternal. Script membutuhkan waktu untuk di-download, jadi ini adalah operasi asynchronous.

---

## 🔙 Versi dengan Callback (Cara Lama)

Dulu, kita menggunakan callback untuk menangani loading script:

```javascript
function loadScript(src, callback) {
  // Buat elemen script
  let script = document.createElement('script');
  script.src = src;
  
  // Event saat script selesai load
  script.onload = () => callback(null, script);
  
  // Event saat terjadi error
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  
  // Tambahkan ke document
  document.head.append(script);
}
```

### Cara Pakai:

```javascript
loadScript('https://cdn.example.com/library.js', function(error, script) {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log(`${script.src} loaded!`);
    // Pakai library...
  }
});
```

### ❌ Masalah dengan Callback:

1. Harus siapkan callback function **sebelum** memanggil `loadScript()`
2. Hanya bisa punya **satu callback**
3. Sulit untuk di-chain jika perlu load beberapa script berurutan
4. Callback hell jika kompleks

---

## ✨ Versi dengan Promise (Cara Modern)

Sekarang kita ubah menjadi Promise-based:

```javascript
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    // Buat elemen script
    let script = document.createElement('script');
    script.src = src;
    
    // Event saat script selesai load
    script.onload = () => resolve(script);
    
    // Event saat terjadi error
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
    
    // Tambahkan ke document
    document.head.append(script);
  });
}
```

---

## 🎯 Cara Menggunakan

### Contoh 1: Basic Usage

```javascript
let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => {
    console.log(`${script.src} is loaded!`);
    console.log("Lodash version:", _.VERSION);
  },
  error => {
    console.error(`Error: ${error.message}`);
  }
);
```

---

### Contoh 2: Dengan .catch()

```javascript
loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js")
  .then(script => {
    console.log(`${script.src} is loaded!`);
    console.log("Lodash tersedia:", typeof _ !== 'undefined');
  })
  .catch(error => {
    console.error("Gagal load script:", error.message);
  });
```

---

### Contoh 3: Multiple Handlers

Keunggulan Promise: bisa attach **banyak handler**!

```javascript
let scriptPromise = loadScript("https://cdn.example.com/library.js");

// Handler 1
scriptPromise.then(script => {
  console.log("Handler 1: Script loaded!");
});

// Handler 2
scriptPromise.then(script => {
  console.log("Handler 2: Initializing library...");
  // Initialize library
});

// Handler 3
scriptPromise.then(script => {
  console.log("Handler 3: Ready to use!");
});
```

---

### Contoh 4: Dengan .finally()

```javascript
function loadScriptWithLoading(src) {
  showLoadingIndicator();
  
  loadScript(src)
    .then(script => {
      console.log("Script loaded:", script.src);
      initializeLibrary();
    })
    .catch(error => {
      showErrorMessage("Gagal memuat library: " + error.message);
    })
    .finally(() => {
      hideLoadingIndicator();
    });
}

// Pakai:
loadScriptWithLoading("https://cdn.example.com/library.js");
```

---

## 🔗 Loading Multiple Scripts (Sequential)

Jika perlu load beberapa script **berurutan**:

```javascript
loadScript("https://cdn.example.com/library1.js")
  .then(() => {
    console.log("Library 1 loaded");
    return loadScript("https://cdn.example.com/library2.js");
  })
  .then(() => {
    console.log("Library 2 loaded");
    return loadScript("https://cdn.example.com/library3.js");
  })
  .then(() => {
    console.log("All libraries loaded!");
    // Semua library siap dipakai
  })
  .catch(error => {
    console.error("Error loading scripts:", error.message);
  });
```

**Jauh lebih rapi dari callback hell!**

---

## 📊 Perbandingan Lengkap

### Callback Version

```javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Error for ${src}`));
  document.head.append(script);
}

// Penggunaan:
loadScript('lib1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    // Berhasil, load library berikutnya
    loadScript('lib2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        // Callback hell continues...
      }
    });
  }
});
```

---

### Promise Version

```javascript
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Error for ${src}`));
    document.head.append(script);
  });
}

// Penggunaan:
loadScript('lib1.js')
  .then(() => loadScript('lib2.js'))
  .then(() => loadScript('lib3.js'))
  .then(() => {
    console.log("All loaded!");
  })
  .catch(handleError);
```

**Lebih bersih dan mudah dibaca!** ✨

---

## 🎨 Keuntungan Promise Version

| Aspek | Callback | Promise |
|-------|----------|---------|
| **Alur Kode** | Harus tahu callback sebelumnya | Alur natural (panggil, lalu handle) |
| **Multiple Handlers** | Hanya 1 callback | Bisa banyak `.then()` |
| **Error Handling** | Manual di setiap callback | Satu `.catch()` untuk semua |
| **Chaining** | Callback hell | Flat chaining |
| **Readability** | Sulit dibaca jika kompleks | Mudah dibaca |

---

## 💼 Implementasi Real-World

### Contoh: Load Library dan Initialize

```javascript
function setupLibrary() {
  console.log("Starting setup...");
  
  loadScript("https://cdn.example.com/library.js")
    .then(script => {
      console.log("✅ Library loaded");
      
      // Check jika library tersedia
      if (typeof MyLibrary === 'undefined') {
        throw new Error("Library tidak tersedia setelah load");
      }
      
      // Initialize library
      return MyLibrary.init({
        apiKey: 'xxx',
        debug: true
      });
    })
    .then(config => {
      console.log("✅ Library initialized");
      console.log("Config:", config);
      
      // Library siap dipakai
      MyLibrary.doSomething();
    })
    .catch(error => {
      console.error("❌ Setup failed:", error.message);
      showErrorToUser("Gagal memuat aplikasi. Silakan refresh halaman.");
    })
    .finally(() => {
      console.log("Setup process completed");
    });
}
```

---

### Contoh: Load dengan Timeout

```javascript
function loadScriptWithTimeout(src, timeout = 5000) {
  let timeoutId;
  
  let timeoutPromise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Timeout loading ${src}`));
    }, timeout);
  });
  
  let loadPromise = loadScript(src)
    .then(script => {
      clearTimeout(timeoutId);
      return script;
    });
  
  // Race: mana yang selesai duluan
  return Promise.race([loadPromise, timeoutPromise]);
}

// Pakai:
loadScriptWithTimeout("https://cdn.example.com/library.js", 3000)
  .then(script => {
    console.log("Loaded in time!");
  })
  .catch(error => {
    console.error("Failed or timeout:", error.message);
  });
```

---

### Contoh: Load dengan Retry

```javascript
function loadScriptWithRetry(src, retries = 3) {
  return loadScript(src).catch(error => {
    if (retries > 0) {
      console.log(`Retry loading ${src}. Remaining attempts: ${retries}`);
      return loadScriptWithRetry(src, retries - 1);
    } else {
      throw error;
    }
  });
}

// Pakai:
loadScriptWithRetry("https://cdn.example.com/library.js", 3)
  .then(script => {
    console.log("Loaded successfully (maybe after retry)");
  })
  .catch(error => {
    console.error("Failed after all retries:", error.message);
  });
```

---

## 🔍 Penjelasan Detail Kode

### Mengapa Return Promise?

```javascript
function loadScript(src) {
  return new Promise(function(resolve, reject) {
    // ...
  });
}
```

**Return Promise** memungkinkan:
- Function bisa di-chain
- Hasil bisa dipakai di banyak tempat
- Mengikuti best practice

---

### Event Handlers

```javascript
script.onload = () => resolve(script);
script.onerror = () => reject(new Error(`Script load error for ${src}`));
```

**Penjelasan:**
- `onload`: Dipanggil saat script berhasil di-load
- `onerror`: Dipanggil saat gagal (404, network error, dll)
- `resolve(script)`: Kirim objek script sebagai hasil
- `reject(new Error(...))`: Kirim error object

---

### Append ke Document

```javascript
document.head.append(script);
```

Menambahkan `<script>` tag ke `<head>`, ini yang memicu browser untuk mulai download script.

---

## 📝 Ringkasan

- `loadScript` adalah contoh nyata penggunaan Promise
- Mengkonversi operasi callback menjadi Promise-based
- Promise version lebih fleksibel dan mudah di-maintain
- Bisa punya multiple handlers
- Error handling lebih bersih
- Mudah di-chain untuk sequential loading
- Best practice untuk operasi asynchronous

---

**File sebelumnya:** `07-cleanup-dengan-finally.md`

**File selanjutnya:** `09-common-pitfalls.md`

Kita akan belajar kesalahan-kesalahan umum yang sering dilakukan pemula!
