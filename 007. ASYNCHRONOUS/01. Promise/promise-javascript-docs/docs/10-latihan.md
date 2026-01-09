# 10 - Latihan

## 📌 Pengantar

Latihan ini dirancang untuk mengasah pemahamanmu tentang Promise. Coba kerjakan sendiri dulu sebelum melihat solusinya!

---

## 📚 Latihan 1: Output Prediction

### Soal:

Apa output dari kode berikut?

```javascript
let promise = new Promise(function(resolve, reject) {
  resolve(1);
  
  setTimeout(() => resolve(2), 1000);
});

promise.then(result => console.log(result));
```

**Pilihan:**
- A. `1`
- B. `2`
- C. `1` lalu `2`
- D. `2` lalu `1`

<details>
<summary>Lihat Solusi</summary>

**Jawaban: A. `1`**

**Penjelasan:**
- Promise hanya bisa di-resolve **sekali**
- `resolve(1)` dipanggil pertama kali
- `resolve(2)` di dalam setTimeout diabaikan
- Output: `1`

</details>

---

## 📚 Latihan 2: Membuat delay()

### Soal:

Buat function `delay(ms)` yang return Promise. Promise harus resolve setelah `ms` milliseconds.

```javascript
function delay(ms) {
  // Tulis kode di sini
}

// Test:
delay(3000).then(() => console.log('Jalan setelah 3 detik'));
```

<details>
<summary>Lihat Solusi</summary>

```javascript
function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// Test:
delay(3000).then(() => console.log('Jalan setelah 3 detik'));
```

**Penjelasan:**
- Return Promise baru
- Gunakan setTimeout untuk delay
- Panggil resolve setelah delay selesai
- Tidak perlu kirim value karena ini hanya delay

</details>

---

## 📚 Latihan 3: Validasi Umur

### Soal:

Buat function `validateAge(age)` yang:
- Resolve jika umur >= 17 dengan pesan "Valid"
- Reject jika umur < 17 dengan Error "Terlalu muda"
- Reject jika umur negatif dengan Error "Umur tidak valid"

```javascript
function validateAge(age) {
  // Tulis kode di sini
}

// Test:
validateAge(20)
  .then(msg => console.log(msg))
  .catch(err => console.log(err.message));

validateAge(15)
  .then(msg => console.log(msg))
  .catch(err => console.log(err.message));
```

<details>
<summary>Lihat Solusi</summary>

```javascript
function validateAge(age) {
  return new Promise((resolve, reject) => {
    if (age < 0) {
      reject(new Error("Umur tidak valid"));
    } else if (age < 17) {
      reject(new Error("Terlalu muda"));
    } else {
      resolve("Valid");
    }
  });
}

// Test:
validateAge(20)
  .then(msg => console.log(msg))       // "Valid"
  .catch(err => console.log(err.message));

validateAge(15)
  .then(msg => console.log(msg))
  .catch(err => console.log(err.message)); // "Terlalu muda"

validateAge(-5)
  .then(msg => console.log(msg))
  .catch(err => console.log(err.message)); // "Umur tidak valid"
```

</details>

---

## 📚 Latihan 4: Urutan Eksekusi

### Soal:

Apa urutan output dari kode ini?

```javascript
console.log("A");

let promise = new Promise(resolve => {
  console.log("B");
  resolve("C");
});

console.log("D");

promise.then(result => {
  console.log(result);
});

console.log("E");
```

<details>
<summary>Lihat Solusi</summary>

**Output: A, B, D, E, C**

**Penjelasan:**
1. `console.log("A")` - synchronous
2. Promise dibuat, executor jalan langsung → `console.log("B")`
3. `resolve("C")` dipanggil, tapi handler `.then()` asynchronous
4. `console.log("D")` - synchronous
5. `console.log("E")` - synchronous
6. Event loop selesai, baru jalankan `.then()` → `console.log("C")`

</details>

---

## 📚 Latihan 5: Random Success

### Soal:

Buat function `randomSuccess()` yang:
- 50% chance resolve dengan "Berhasil!"
- 50% chance reject dengan Error "Gagal!"

```javascript
function randomSuccess() {
  // Tulis kode di sini
}

// Test (jalankan beberapa kali):
randomSuccess()
  .then(msg => console.log("✅", msg))
  .catch(err => console.log("❌", err.message));
```

<details>
<summary>Lihat Solusi</summary>

```javascript
function randomSuccess() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Berhasil!");
    } else {
      reject(new Error("Gagal!"));
    }
  });
}

// Test:
randomSuccess()
  .then(msg => console.log("✅", msg))
  .catch(err => console.log("❌", err.message));
```

**Penjelasan:**
- `Math.random()` menghasilkan angka 0-1
- Jika > 0.5, resolve
- Jika <= 0.5, reject

</details>

---

## 📚 Latihan 6: Perbaiki Kode

### Soal:

Kode berikut ada bug. Temukan dan perbaiki!

```javascript
function getUserData() {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "John" });
    }, 1000);
  });
}

let user = getUserData();
console.log(user); // Mengapa undefined?
```

<details>
<summary>Lihat Solusi</summary>

**Bug:** Lupa `return` Promise

**Perbaikan:**

```javascript
function getUserData() {
  return new Promise((resolve) => { // Tambah return!
    setTimeout(() => {
      resolve({ id: 1, name: "John" });
    }, 1000);
  });
}

// Cara pakai:
getUserData().then(user => {
  console.log(user); // { id: 1, name: "John" }
});
```

</details>

---

## 📚 Latihan 7: Fetch with Timeout

### Soal:

Buat function `fetchWithTimeout(url, timeout)` yang:
- Simulasi fetch data (pakai delay 2 detik)
- Jika lebih dari `timeout`, reject dengan Error "Timeout"
- Jika selesai tepat waktu, resolve dengan "Data dari [url]"

```javascript
function fetchWithTimeout(url, timeout) {
  // Tulis kode di sini
}

// Test:
fetchWithTimeout("api.com/data", 3000)
  .then(data => console.log("✅", data))
  .catch(err => console.log("❌", err.message));

fetchWithTimeout("api.com/data", 1000)
  .then(data => console.log("✅", data))
  .catch(err => console.log("❌", err.message));
```

<details>
<summary>Lihat Solusi</summary>

```javascript
function fetchWithTimeout(url, timeout) {
  let fetchPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data dari ${url}`);
    }, 2000); // Simulasi fetch 2 detik
  });
  
  let timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Timeout"));
    }, timeout);
  });
  
  // Race: mana yang selesai duluan
  return Promise.race([fetchPromise, timeoutPromise]);
}

// Test:
fetchWithTimeout("api.com/data", 3000)
  .then(data => console.log("✅", data))      // Berhasil
  .catch(err => console.log("❌", err.message));

fetchWithTimeout("api.com/data", 1000)
  .then(data => console.log("✅", data))
  .catch(err => console.log("❌", err.message)); // Timeout
```

**Catatan:** `Promise.race()` adalah topik lanjutan, tapi berguna untuk kasus timeout!

</details>

---

## 📚 Latihan 8: Chain Promises

### Soal:

Buat 3 function:
- `getUser(id)` - return Promise yang resolve dengan `{ id, name: "User" }` setelah 1 detik
- `getPosts(userId)` - return Promise yang resolve dengan `["Post 1", "Post 2"]` setelah 1 detik
- `getComments(postId)` - return Promise yang resolve dengan `["Comment 1", "Comment 2"]` setelah 1 detik

Chain mereka untuk mendapat data lengkap!

<details>
<summary>Lihat Solusi</summary>

```javascript
function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: "User " + id });
    }, 1000);
  });
}

function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["Post 1", "Post 2"]);
    }, 1000);
  });
}

function getComments(postTitle) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(["Comment 1", "Comment 2"]);
    }, 1000);
  });
}

// Chain:
getUser(1)
  .then(user => {
    console.log("User:", user);
    return getPosts(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
    return getComments(posts[0]);
  })
  .then(comments => {
    console.log("Comments:", comments);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

**Output (total 3 detik):**
```
User: { id: 1, name: "User 1" }
Posts: ["Post 1", "Post 2"]
Comments: ["Comment 1", "Comment 2"]
```

</details>

---

## 📚 Latihan 9: Error Handling

### Soal:

Apa yang salah dengan kode ini? Perbaiki!

```javascript
fetchData()
  .then(data => {
    return processData(data);
  })
  .then(result => {
    throw new Error("Oops!");
  })
  .then(result => {
    console.log("This won't run");
  });
```

<details>
<summary>Lihat Solusi</summary>

**Masalah:** Tidak ada `.catch()` untuk menangani error!

**Perbaikan:**

```javascript
fetchData()
  .then(data => {
    return processData(data);
  })
  .then(result => {
    throw new Error("Oops!");
  })
  .then(result => {
    console.log("This won't run");
  })
  .catch(error => {
    console.error("Error caught:", error.message);
  });
```

</details>

---

## 📚 Latihan 10: Real-World Scenario

### Soal:

Buat function `login(username, password)` yang:
- Validasi input (tidak boleh kosong)
- Simulasi API call (1 detik)
- 70% success rate
- Return user object jika berhasil
- Show loading indicator saat proses
- Hide loading indicator setelah selesai (sukses/gagal)

<details>
<summary>Lihat Solusi</summary>

```javascript
function showLoading() {
  console.log("⏳ Loading...");
}

function hideLoading() {
  console.log("✓ Loading selesai");
}

function login(username, password) {
  // Validasi
  if (!username || !password) {
    return Promise.reject(new Error("Username dan password harus diisi"));
  }
  
  showLoading();
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulasi: 70% berhasil
      if (Math.random() > 0.3) {
        resolve({
          id: 1,
          username: username,
          token: "abc123"
        });
      } else {
        reject(new Error("Username atau password salah"));
      }
    }, 1000);
  }).finally(() => {
    hideLoading();
  });
}

// Test:
login("admin", "123")
  .then(user => {
    console.log("✅ Login berhasil!");
    console.log("User:", user);
  })
  .catch(error => {
    console.log("❌ Login gagal:", error.message);
  });

// Test validasi:
login("", "")
  .then(user => {
    console.log("✅", user);
  })
  .catch(error => {
    console.log("❌", error.message);
  });
```

</details>

---

## 🎯 Challenge Bonus

### Challenge 1: Retry Logic

Buat function yang retry operasi jika gagal (maksimal 3x).

```javascript
function retryOperation(operation, maxRetries = 3) {
  // Tulis kode di sini
}

// Test dengan operation yang sering gagal
function unreliableOperation() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.7) {
      resolve("Berhasil!");
    } else {
      reject(new Error("Gagal"));
    }
  });
}

retryOperation(unreliableOperation, 3)
  .then(result => console.log(result))
  .catch(error => console.log("Gagal setelah 3x retry"));
```

<details>
<summary>Lihat Solusi</summary>

```javascript
function retryOperation(operation, maxRetries = 3) {
  return operation().catch(error => {
    if (maxRetries > 0) {
      console.log(`Retry... (${maxRetries} attempts left)`);
      return retryOperation(operation, maxRetries - 1);
    } else {
      throw error;
    }
  });
}

// Test:
retryOperation(unreliableOperation, 3)
  .then(result => console.log("✅", result))
  .catch(error => console.log("❌", error.message));
```

</details>

---

### Challenge 2: Parallel Execution

Buat function yang menjalankan beberapa Promise **parallel** dan return hasilnya.

```javascript
function parallel(promises) {
  // Tulis kode di sini
}

// Test:
let promise1 = delay(1000).then(() => "Result 1");
let promise2 = delay(2000).then(() => "Result 2");
let promise3 = delay(1500).then(() => "Result 3");

parallel([promise1, promise2, promise3])
  .then(results => console.log(results));
// Harus dapat semua hasil setelah 2 detik (bukan 4.5 detik)
```

<details>
<summary>Lihat Solusi</summary>

```javascript
function parallel(promises) {
  return Promise.all(promises);
}

// Test:
let promise1 = delay(1000).then(() => "Result 1");
let promise2 = delay(2000).then(() => "Result 2");
let promise3 = delay(1500).then(() => "Result 3");

parallel([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // ["Result 1", "Result 2", "Result 3"]
  });
```

**Catatan:** `Promise.all()` adalah built-in method untuk parallel execution!

</details>

---

## 📝 Kesimpulan Latihan

Setelah menyelesaikan latihan ini, kamu seharusnya sudah:

- ✅ Memahami cara kerja Promise
- ✅ Bisa membuat Promise sendiri
- ✅ Mengerti executor dan resolver/reject
- ✅ Paham .then(), .catch(), .finally()
- ✅ Bisa chain Promise dengan benar
- ✅ Menghindari kesalahan umum
- ✅ Handle error dengan baik
- ✅ Implement real-world scenarios

---

## 🚀 Langkah Selanjutnya

Setelah menguasai Promise dasar, kamu bisa lanjut belajar:

1. **Promise Chaining** - Chain Promise yang lebih kompleks
2. **Promise.all()** - Menjalankan banyak Promise parallel
3. **Promise.race()** - Ambil hasil Promise tercepat
4. **async/await** - Syntax modern untuk Promise
5. **Error Handling Advanced** - Strategi handle error yang lebih baik
6. **Promise Patterns** - Pattern umum dalam aplikasi nyata

---

**File sebelumnya:** `09-common-pitfalls.md`

---

<div align="center">

🎉 **Selamat! Kamu sudah menyelesaikan semua materi Promise!** 🎉

Keep practicing and happy coding! 💪

</div>
