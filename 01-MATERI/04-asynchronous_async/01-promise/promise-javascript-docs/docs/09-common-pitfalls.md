# 09 - Common Pitfalls (Kesalahan Umum)

## 📌 Pengantar

Berikut adalah kesalahan-kesalahan yang sering dilakukan pemula saat belajar Promise. Memahami ini akan membantumu menghindari bug yang sulit dilacak!

---

## ❌ Kesalahan 1: Lupa Return Promise

### Masalah:

```javascript
function getData() {
  // ❌ SALAH - Tidak return Promise
  new Promise((resolve) => {
    setTimeout(() => resolve("Data"), 1000);
  });
}

let result = getData();
console.log(result); // undefined ❌
```

### Solusi:

```javascript
function getData() {
  // ✅ BENAR - Return Promise
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data"), 1000);
  });
}

let promise = getData();
promise.then(data => console.log(data)); // "Data" ✅
```

### Kenapa Error?

Tanpa `return`, function mengembalikan `undefined`, bukan Promise!

---

## ❌ Kesalahan 2: Tidak Handle Error

### Masalah:

```javascript
// ❌ SALAH - Tidak ada .catch()
fetchData()
  .then(data => {
    console.log(data);
  });
// Jika error, akan muncul "Unhandled Promise Rejection"
```

### Solusi:

```javascript
// ✅ BENAR - Ada error handling
fetchData()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

### Dampak:

- Error tidak tertangani bisa crash aplikasi
- Sulit debugging
- User experience buruk (tidak ada feedback)

---

## ❌ Kesalahan 3: Mengira bisa Panggil resolve/reject Berkali-kali

### Masalah:

```javascript
// ❌ SALAH - Mengira semua resolve dipanggil
let promise = new Promise((resolve, reject) => {
  resolve(1);
  resolve(2); // Diabaikan
  resolve(3); // Diabaikan
});

promise.then(result => {
  console.log(result); // Hanya 1
});
```

### Penjelasan:

Promise hanya bisa settled **sekali**. Panggilan kedua dan seterusnya diabaikan.

### Solusi:

```javascript
// ✅ BENAR - Hanya panggil sekali
let promise = new Promise((resolve, reject) => {
  // Pilih salah satu
  if (condition) {
    resolve("Success");
  } else {
    reject(new Error("Failed"));
  }
});
```

---

## ❌ Kesalahan 4: Akses Langsung .state atau .result

### Masalah:

```javascript
let promise = new Promise(resolve => {
  setTimeout(() => resolve("OK"), 1000);
});

// ❌ SALAH - Tidak bisa akses langsung
console.log(promise.state);  // undefined
console.log(promise.result); // undefined
```

### Solusi:

```javascript
// ✅ BENAR - Gunakan .then()
promise.then(result => {
  console.log(result); // "OK"
});
```

### Kenapa?

Property `state` dan `result` adalah **internal**, tidak exposed ke developer.

---

## ❌ Kesalahan 5: Lupa Return di .then() Chain

### Masalah:

```javascript
// ❌ SALAH - Lupa return
fetchUser(1)
  .then(user => {
    // Lupa return!
    fetchPosts(user.id);
  })
  .then(posts => {
    console.log(posts); // undefined!
  });
```

### Solusi:

```javascript
// ✅ BENAR - Return Promise
fetchUser(1)
  .then(user => {
    return fetchPosts(user.id); // Return!
  })
  .then(posts => {
    console.log(posts); // Dapat posts ✅
  });
```

### Dampak:

`.then()` berikutnya menerima `undefined` karena tidak ada return value.

---

## ❌ Kesalahan 6: Nested Promise (Promise Hell)

### Masalah:

```javascript
// ❌ SALAH - Nested promise, mirip callback hell
fetchUser(1)
  .then(user => {
    fetchPosts(user.id)
      .then(posts => {
        fetchComments(posts[0].id)
          .then(comments => {
            console.log(comments);
          });
      });
  });
```

### Solusi:

```javascript
// ✅ BENAR - Flat chaining
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => {
    console.log(comments);
  })
  .catch(error => {
    console.error(error);
  });
```

### Keuntungan Flat Chaining:

- Lebih mudah dibaca
- Error handling lebih sederhana
- Mengikuti best practice

---

## ❌ Kesalahan 7: Bingung Synchronous vs Asynchronous

### Masalah:

```javascript
let data;

fetchData().then(result => {
  data = result;
});

console.log(data); // ❌ undefined (Promise belum selesai!)
```

### Penjelasan:

Promise adalah **asynchronous**. `console.log()` jalan **sebelum** Promise selesai.

### Solusi:

```javascript
// ✅ BENAR - Akses data di dalam .then()
fetchData().then(result => {
  console.log(result); // ✅ Ada datanya
  // Pakai data di sini
});

// Atau gunakan async/await (topik lanjutan)
```

---

## ❌ Kesalahan 8: Tidak Reject dengan Error Object

### Masalah:

```javascript
// ⚠️ KURANG BAIK - Reject dengan string
new Promise((resolve, reject) => {
  reject("Terjadi kesalahan");
});
```

### Solusi:

```javascript
// ✅ BAIK - Reject dengan Error object
new Promise((resolve, reject) => {
  reject(new Error("Terjadi kesalahan"));
});
```

### Keuntungan Error Object:

- Punya stack trace (untuk debugging)
- Standar yang umum digunakan
- Bisa pakai instanceof untuk cek tipe error

---

## ❌ Kesalahan 9: Mengharapkan .finally() Menerima Argumen

### Masalah:

```javascript
// ❌ SALAH - .finally() tidak menerima argumen
promise
  .finally((result) => {
    console.log(result); // undefined!
  });
```

### Solusi:

```javascript
// ✅ BENAR - .finally() tanpa argumen
promise
  .then(result => {
    console.log(result);
  })
  .finally(() => {
    cleanup(); // Hanya cleanup
  });
```

### Mengapa?

`.finally()` untuk cleanup umum, tidak peduli result atau error.

---

## ❌ Kesalahan 10: .catch() di Tempat yang Salah

### Masalah:

```javascript
// ❌ SALAH - .catch() terlalu awal
promise
  .catch(error => {
    console.error(error);
  })
  .then(result => {
    // Ini TETAP jalan meskipun ada error!
    console.log(result);
  });
```

### Solusi:

```javascript
// ✅ BENAR - .catch() di akhir
promise
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
```

### Penjelasan:

`.catch()` menangani error dan meneruskan flow. Jika ada `.then()` setelah `.catch()`, itu akan tetap dijalankan.

---

## ❌ Kesalahan 11: Campur Callback dan Promise

### Masalah:

```javascript
// ❌ SALAH - Bingung pakai callback atau promise
function confusingFunction(callback) {
  return new Promise((resolve, reject) => {
    // Pakai callback atau promise? Bingung!
    if (callback) {
      callback(null, "result");
    }
    resolve("result");
  });
}
```

### Solusi:

```javascript
// ✅ BENAR - Pilih salah satu (Promise)
function clearFunction() {
  return new Promise((resolve, reject) => {
    // Pure Promise
    resolve("result");
  });
}
```

---

## ❌ Kesalahan 12: Mengira Promise Blocking

### Masalah:

```javascript
console.log("1");

let promise = new Promise(resolve => {
  console.log("2");
  resolve("3");
});

console.log("4");

promise.then(result => {
  console.log(result);
});

console.log("5");

// ❌ SALAH mengira output: 1, 2, 3, 4, 5
// ✅ BENAR output: 1, 2, 4, 5, 3
```

### Penjelasan:

- Executor jalan **synchronous**
- Handler `.then()` jalan **asynchronous** (belakangan)

---

## ❌ Kesalahan 13: Tidak Spesifik dalam Error Message

### Masalah:

```javascript
// ❌ KURANG BAIK - Pesan error tidak jelas
reject(new Error("Error"));
reject(new Error("Failed"));
reject(new Error("Something went wrong"));
```

### Solusi:

```javascript
// ✅ BAIK - Pesan error spesifik
reject(new Error(`User dengan ID ${userId} tidak ditemukan`));
reject(new Error(`Koneksi ke database gagal: ${dbError.message}`));
reject(new Error(`File ${filename} tidak dapat dibaca: permission denied`));
```

### Keuntungan:

- Mudah debugging
- User mendapat informasi yang berguna
- Developer lain mudah understand masalahnya

---

## ❌ Kesalahan 14: Ignore Return Value dari .then()

### Masalah:

```javascript
// ❌ SALAH - Tidak pakai return value
function processData(data) {
  fetchData().then(result => {
    // Process result...
    return processedResult;
  });
  // Tidak return apapun!
}

let result = processData(); // undefined
```

### Solusi:

```javascript
// ✅ BENAR - Return Promise
function processData(data) {
  return fetchData().then(result => {
    return processedResult;
  });
}

processData().then(result => {
  console.log(result); // ✅
});
```

---

## 📋 Checklist Anti-Pitfall

Sebelum submit code, pastikan:

- ✅ Semua function yang buat Promise **return** Promise
- ✅ Semua Promise chain punya **.catch()** di akhir
- ✅ Hanya panggil **resolve/reject sekali**
- ✅ Tidak akses **.state** atau **.result** langsung
- ✅ **Return** value di setiap **.then()** yang di-chain
- ✅ Tidak nested Promise (gunakan flat chaining)
- ✅ Pakai **Error object** untuk reject
- ✅ **.finally()** tidak pakai argumen
- ✅ **.catch()** di posisi yang tepat (biasanya di akhir)
- ✅ Error message **spesifik dan informatif**

---

## 🎯 Tips Debugging

### 1. Console.log di Setiap Step

```javascript
promise
  .then(result => {
    console.log("Step 1:", result);
    return processStep1(result);
  })
  .then(result => {
    console.log("Step 2:", result);
    return processStep2(result);
  })
  .catch(error => {
    console.log("Error at:", error);
  });
```

### 2. Cek Return Value

```javascript
.then(result => {
  let processed = process(result);
  console.log("Will return:", processed);
  return processed; // Jangan lupa!
})
```

### 3. Gunakan Browser DevTools

- Lihat Promise state di console
- Breakpoint di dalam .then()
- Lihat stack trace saat error

---

## 📝 Ringkasan

Kesalahan umum yang harus dihindari:
1. Lupa return Promise dari function
2. Tidak handle error dengan .catch()
3. Mengira bisa resolve/reject berkali-kali
4. Akses langsung .state/.result
5. Lupa return di .then() chain
6. Nested Promise (promise hell)
7. Bingung sync vs async
8. Tidak pakai Error object
9. Mengharapkan .finally() punya argumen
10. .catch() di tempat yang salah
11. Campur callback dan Promise
12. Mengira Promise blocking
13. Error message tidak spesifik
14. Ignore return value dari .then()

**Remember:** Practice makes perfect! Semakin sering pakai Promise, semakin terbiasa menghindari kesalahan ini.

---

**File sebelumnya:** `08-contoh-praktis.md`

**File selanjutnya:** `10-latihan.md`

Saatnya mengasah pemahaman dengan latihan!
