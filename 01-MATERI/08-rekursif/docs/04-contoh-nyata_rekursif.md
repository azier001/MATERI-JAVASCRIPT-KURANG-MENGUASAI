# 🌍 Contoh Nyata — Recursion — Rekursif

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Recursion-blue?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Use%20Cases-green?style=for-the-badge)

---

## 📑 Daftar Isi

- 🎯 [Studi Kasus 1 — Generate Array Angka Berurutan](#kasus-1)
- 🎯 [Studi Kasus 2 — Countdown dengan Aksi di Akhir](#kasus-2)
- 🎯 [Studi Kasus 3 — Menelusuri Struktur Folder Bertingkat](#kasus-3)
- 🎯 [Studi Kasus 4 — Menghitung Faktorial](#kasus-4)
- 🔗 [Kombinasi dengan Konsep Lain](#kombinasi)
- 📊 [Ringkasan Use Cases](#ringkasan)
- 🔗 [Navigation](#navigation)

---

<a name="kasus-1"></a>
## 🎯 Studi Kasus 1 — Generate Array Angka Berurutan

**Konteks:**
Kamu sedang membangun fitur pagination di sebuah web app — kamu perlu menghasilkan array nomor halaman dari `0` hingga `n` untuk ditampilkan sebagai tombol navigasi. Karena kamu sedang belajar Functional Programming, kamu ingin melakukannya tanpa mutasi array.

**Kode:**

```js
// 🌍 Generate Array Angka Berurutan
// Konteks: Menghasilkan array [0, 1, 2, ..., n] secara rekursif

const generateArray = (n) => {
  // 🛑 Base Case: jika n < 0, tidak ada angka yang perlu dibuat
  if (n < 0) return [];

  // 🔁 Recursive Case: buat array untuk (n-1), lalu tambahkan n di akhir
  return [...generateArray(n - 1), n];
};
```

**Penjelasan:**
- **`if (n < 0) return []`** → Base case yang aman — menangani nilai negatif sekaligus menjadi "benih" pertama array kosong.
- **`generateArray(n - 1)`** → Panggil diri sendiri dengan n yang semakin kecil, terus sampai base case.
- **`[...hasil, n]`** → Spread hasil rekursif, tambahkan `n` di posisi paling akhir — sehingga array terbentuk dari kecil ke besar.

**Output / Hasil:**

```js
// Jika dijalankan:
console.log(generateArray(5));
// → [0, 1, 2, 3, 4, 5]

console.log(generateArray(0));
// → [0]

console.log(generateArray(-1));
// → []  (aman, tidak crash)
```

> 💡 **Insight:** Pendekatan ini menghasilkan array tanpa pernah mengubah variabel yang sudah ada — setiap pemanggilan hanya menciptakan nilai baru, menjadikannya pilihan yang sangat cocok di konteks Functional Programming.

---

<a name="kasus-2"></a>
## 🎯 Studi Kasus 2 — Countdown dengan Aksi di Akhir

**Konteks:**
Kamu membuat fitur "Launch Countdown" di sebuah aplikasi — menampilkan hitungan mundur dari `n` ke `1`, lalu menampilkan pesan peluncuran setelah selesai. Urutan eksekusi sangat penting: angka harus tampil dari besar ke kecil, bukan sebaliknya.

**Kode:**

```js
// 🌍 Countdown dengan Aksi di Akhir
// Konteks: Hitung mundur dari n ke 1, lalu jalankan aksi peluncuran

function launchCountdown(n, onLaunch) {
  // 🛑 Base Case: semua angka sudah ditampilkan, jalankan aksi
  if (n <= 0) {
    onLaunch(); // Callback dijalankan di akhir
    return;
  }

  // 🔁 Recursive Case: tampilkan angka saat ini, lalu hitung mundur lebih jauh
  console.log(`T-${n}...`);
  launchCountdown(n - 1, onLaunch);
}
```

**Penjelasan:**
- **`onLaunch`** → Callback function yang akan dijalankan saat rekursif mencapai dasarnya — memisahkan logika "kapan selesai" dari logika "apa yang dilakukan saat selesai".
- **`console.log(`T-${n}...`)`** → Aksi utama dijalankan *sebelum* pemanggilan rekursif, sehingga output muncul dari besar ke kecil.
- **`launchCountdown(n - 1, onLaunch)`** → Meneruskan callback ke setiap level rekursif.

**Output / Hasil:**

```js
// Jika dijalankan:
launchCountdown(5, () => console.log("🚀 Liftoff!"));
// → T-5...
// → T-4...
// → T-3...
// → T-2...
// → T-1...
// → 🚀 Liftoff!
```

> 💡 **Insight:** Dengan meletakkan aksi *sebelum* pemanggilan rekursif, kita mengontrol urutan output dari besar ke kecil. Sebaliknya, jika aksi diletakkan *sesudah* pemanggilan rekursif, output akan muncul dari kecil ke besar saat fase unwinding.

---

<a name="kasus-3"></a>
## 🎯 Studi Kasus 3 — Menelusuri Struktur Folder Bertingkat

**Konteks:**
Kamu sedang membangun fitur "File Explorer" di sebuah web app. Pengguna bisa memiliki folder dengan sub-folder yang bertingkat tanpa batas. Kamu perlu mengumpulkan nama semua folder ke dalam satu array rata (flat) — tidak peduli seberapa dalam strukturnya.

**Kode:**

```js
// 🌍 Menelusuri Struktur Folder Bertingkat
// Konteks: Mengumpulkan semua nama folder dari struktur nested object

function getAllFolderNames(folder) {
  // Mulai dengan nama folder saat ini
  const names = [folder.name];

  // 🛑 Base Case implisit: jika tidak ada subfolder, loop tidak berjalan
  // 🔁 Recursive Case: untuk setiap subfolder, lakukan hal yang sama
  for (const sub of folder.subfolders) {
    const subNames = getAllFolderNames(sub); // Rekursif!
    names.push(...subNames);                 // Gabungkan hasilnya
  }

  return names;
}

// Data folder bertingkat:
const fileSystem = {
  name: "Root",
  subfolders: [
    { name: "Documents", subfolders: [
        { name: "Work", subfolders: [] },
        { name: "Personal", subfolders: [] }
    ]},
    { name: "Downloads", subfolders: [
        { name: "Images", subfolders: [
            { name: "2024", subfolders: [] }
        ]}
    ]}
  ]
};
```

**Penjelasan:**
- **`const names = [folder.name]`** → Kumpulkan nama folder saat ini terlebih dahulu.
- **`for (const sub of folder.subfolders)`** → Iterasi setiap subfolder yang ada.
- **`getAllFolderNames(sub)`** → Rekursif! Fungsi yang sama dijalankan untuk subfolder — tidak peduli seberapa dalam.
- **`names.push(...subNames)`** → Gabungkan hasil rekursif (array) ke dalam array utama dengan spread.

**Output / Hasil:**

```js
// Jika dijalankan:
console.log(getAllFolderNames(fileSystem));
// → ["Root", "Documents", "Work", "Personal", "Downloads", "Images", "2024"]

// Tanpa rekursif, kamu butuh for loop sebanyak jumlah tingkatan!
// Dengan rekursif: satu fungsi untuk semua kedalaman ✅
```

> 💡 **Insight:** Ini adalah kasus terkuat rekursif — ketika struktur datanya sendiri bersifat rekursif (folder berisi folder berisi folder...), maka solusi rekursif adalah yang paling natural dan elegan.

---

<a name="kasus-4"></a>
## 🎯 Studi Kasus 4 — Menghitung Faktorial

**Konteks:**
Faktorial adalah operasi matematis klasik yang sering muncul di kalkulasi probabilitas, kombinatorika, dan algoritma. Ini adalah contoh "buku teks" rekursif yang menunjukkan dengan sangat jelas pola "masalah besar = masalah kecil + satu langkah".

**Kode:**

```js
// 🌍 Menghitung Faktorial
// Konteks: n! = n × (n-1) × (n-2) × ... × 1
// Contoh: 5! = 5 × 4 × 3 × 2 × 1 = 120

function factorial(n) {
  // 🛑 Base Case: 0! dan 1! keduanya adalah 1
  if (n <= 1) return 1;

  // 🔁 Recursive Case: n! = n × (n-1)!
  return n * factorial(n - 1);
}
```

**Penjelasan:**
- **`if (n <= 1) return 1`** → Base case yang menangkap `0` dan `1` sekaligus, karena `0! = 1` dan `1! = 1` secara matematis.
- **`return n * factorial(n - 1)`** → Inilah definisi matematis faktorial yang diterjemahkan langsung ke kode — `n!` adalah `n` dikalikan `(n-1)!`.

**Output / Hasil:**

```js
// Jika dijalankan:
console.log(factorial(5));
// Proses: 5 × 4 × 3 × 2 × 1
// → 120

console.log(factorial(0));
// → 1  (secara matematis, 0! = 1)

console.log(factorial(1));
// → 1
```

> 💡 **Insight:** Faktorial adalah contoh sempurna bagaimana definisi matematis rekursif (`n! = n × (n-1)!`) bisa diterjemahkan langsung menjadi kode rekursif — hampir tanpa perubahan. Ini menunjukkan betapa "naturalnya" rekursif untuk masalah dengan definisi matematis yang rekursif.

---

<a name="kombinasi"></a>
## 🔗 Kombinasi dengan Konsep Lain

### Rekursif + Spread Operator (`...`)

Spread operator membuat kode rekursif yang membangun array menjadi jauh lebih ekspresif dan immutable — kamu bisa melihat bentuk array finalnya langsung dari sintaks.

```js
// Rekursif + Spread: membangun array secara immutable
function numberRange(start, end) {
  if (start === end) return [start];
  return [...numberRange(start, end - 1), end];
}

console.log(numberRange(1, 5));
// → [1, 2, 3, 4, 5]
// Setiap pemanggilan: [...[1], 2] → [...[1,2], 3] → dst
```

---

### Rekursif + Default Parameter

Default parameter memungkinkan kamu menyembunyikan "state awal" dari pengguna — berguna untuk pola Accumulator di mana kamu perlu membawa array kosong sebagai titik awal.

```js
// Rekursif + Default Parameter: sembunyikan state internal dari pengguna
function buildRange(n, result = []) {
  if (n < 0) return result;
  result.unshift(n); // Sisipkan di depan
  return buildRange(n - 1, result);
}

// Pengguna cukup memanggil dengan satu argumen:
console.log(buildRange(5));
// → [0, 1, 2, 3, 4, 5]
```

---

### Rekursif + Callback

Memisahkan "kapan berhenti" dari "apa yang dilakukan" — membuat fungsi rekursif lebih fleksibel dan reusable.

```js
// Rekursif + Callback: logika aksi dipisah dari logika rekursif
function countdown(n, onTick, onDone) {
  if (n <= 0) return onDone();
  onTick(n);
  countdown(n - 1, onTick, onDone);
}

countdown(
  3,
  (n) => console.log(`Hitung: ${n}`),
  () => console.log("Waktu habis!")
);
// → Hitung: 3
// → Hitung: 2
// → Hitung: 1
// → Waktu habis!
```

---

<a name="ringkasan"></a>
## 📊 Ringkasan Use Cases

| Use Case | Kapan Dipakai | Kompleksitas |
|----------|--------------|--------------|
| Generate Array Berurutan | Membuat deret angka tanpa mutasi (FP style) | Dasar |
| Countdown dengan Aksi | Hitung mundur + trigger aksi di akhir | Dasar |
| Penelusuran Folder Bertingkat | Struktur data nested dengan kedalaman tidak pasti | Lanjut |
| Menghitung Faktorial | Kalkulasi matematis dengan definisi rekursif | Menengah |

---

<a name="navigation"></a>
## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 03 — Sintaks & Penggunaan](./03-sintaks-penggunaan_rekursif.md)**
- **📖 [Lanjut ke Part 05 — Perbandingan Konsep →](./05-perbandingan-konsep_rekursif.md)**
