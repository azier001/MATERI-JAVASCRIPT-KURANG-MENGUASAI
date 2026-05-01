# 🧪 Test Cases — Kasus Pengujian

![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Topic](https://img.shields.io/badge/Topic-Testing-blue?style=for-the-badge)

---

## 📑 Daftar Isi

- 📝 [Daftar Kasus Pengujian (9 Kasus)](#daftar-kasus)
- ⚠️ [Pentingnya Edge Cases](#edge-cases)
- 🤖 [Script Test Runner Otomatis](#test-runner)

---

<a name="daftar-kasus"></a>
## 📝 Daftar Kasus Pengujian (9 Kasus)

Untuk memastikan keandalan dari semua versi solusi, kita menjalankan 9 skenario berbeda. Versi V1 (User) dan V2 (Mentor) berhasil lulus semua pengujian. V3 (Coddy) berpotensi gagal pada kasus nama kembar dan array kosong.

### 1. Edge Cases (Kondisi Ekstrem)

Kondisi di batas luar kewajaran yang sering membuat program error.

| # | Skenario | Input | Expected Output |
|---|----------|-------|-----------------|
| 1 | Array kosong | `([], 2)` | `[["Empty","Empty"],["Empty","Empty"]]` |
| 2 | Satu bunga, grid 1x1 | `(["Rose"], 1)` | `[["esoR"]]` |
| 3 | Bunga lebih banyak dari petak | `(["A","B","C","D","E"], 2)` | `[["A","B"],["C","D"]]` — hanya 4 petak, bunga ke-5 tidak masuk |

### 2. Normal Cases (Kondisi Biasa)

Kondisi standar yang biasanya ada di contoh soal.

| # | Skenario | Input | Expected Output |
|---|----------|-------|-----------------|
| 4 | Contoh soal utama | `(["Rose","Sunflower","Lily","Tulip"], 3)` | `[["Rose","Lily","Tulip"],["rewoflnuS","Empty","Empty"],["Empty","Empty","Empty"]]` |
| 5 | Dua bunga, grid 2x2 | `(["Daisy","Orchid"], 2)` | `[["Daisy","dihcrO"],["Empty","Empty"]]` |
| 6 | Bunga pas mengisi grid | `(["Rose","Lily","Tulip","Daisy"], 2)` | `[["Rose","Lily"],["Tulip","ysiaD"]]` |

### 3. Complex / Soal Cases (Kondisi Kompleks)

Kondisi panjang atau varian yang lebih menantang.

| # | Skenario | Input | Expected Output |
|---|----------|-------|-----------------|
| 7 | Nama kembar terpanjang | `(["Rose","Orchid","Orchid"], 2)` | `[["Rose","Orchid"],["dihcrO","Empty"]]` — hanya yang TERAKHIR dibalik |
| 8 | Semua nama sama panjang | `(["Rose","Lily","Iris"], 2)` | `[["Rose","Lily"],["sirI","Empty"]]` — yang terakhir di sorted dibalik |
| 9 | Grid besar, bunga sedikit | `(["Lily"], 3)` | `[["yliL","Empty","Empty"],["Empty","Empty","Empty"],["Empty","Empty","Empty"]]` |

---

<a name="edge-cases"></a>
## ⚠️ Pentingnya Edge Cases

Mengapa pengujian seperti "Array kosong" dan "Nama kembar terpanjang" (Test Case 1 dan 7) itu penting?

Jika fungsi `arrangeFlowerGarden` dipanggil dengan array kosong tanpa guard `if (sortedFlowers.length > 0)`, program akan mencoba mengakses `sortedFlowers[-1]` yang menghasilkan `undefined`. Kemudian memanggil `.split('')` pada `undefined` akan langsung meng-crash aplikasi. Dalam konteks nyata — misalnya sebuah aplikasi perencanaan taman — ini bisa membuat halaman web menjadi blank atau menampilkan error ke pengguna.

> 🔴 `TypeError: Cannot read properties of undefined (reading 'split')`

Untuk kasus nama kembar (Test Case 7), V3 (Coddy) akan membalik **semua** bunga yang namanya cocok, bukan hanya yang terakhir. Ini melanggar aturan challenge yang meminta hanya bunga terakhir di sorted list yang dibalik. Solusinya: balik bunga **sebelum** dimasukkan ke grid (seperti V1 dan V2), sehingga kita langsung menargetkan index terakhir tanpa risiko salah sasaran.

---

<a name="test-runner"></a>
## 🤖 Script Test Runner Otomatis

Untuk menguji semua versi secara instan, jalankan script ini di terminal dengan Node.js.

```javascript
// Paste fungsi yang ingin dites di sini
// function arrangeFlowerGarden(flowerNames, gridSize) { ... }

const testCases = [
  {
    input: [[], 2],
    expected: [["Empty","Empty"],["Empty","Empty"]],
    desc: "Array kosong"
  },
  {
    input: [["Rose"], 1],
    expected: [["esoR"]],
    desc: "Satu bunga, grid 1x1"
  },
  {
    input: [["A","B","C","D","E"], 2],
    expected: [["A","B"],["C","D"]],
    desc: "Bunga lebih banyak dari petak"
  },
  {
    input: [["Rose","Sunflower","Lily","Tulip"], 3],
    expected: [["Rose","Lily","Tulip"],["rewoflnuS","Empty","Empty"],["Empty","Empty","Empty"]],
    desc: "Contoh soal utama"
  },
  {
    input: [["Daisy","Orchid"], 2],
    expected: [["Daisy","dihcrO"],["Empty","Empty"]],
    desc: "Dua bunga, grid 2x2"
  },
  {
    input: [["Rose","Lily","Tulip","Daisy"], 2],
    expected: [["Rose","Lily"],["Tulip","ysiaD"]],
    desc: "Bunga pas mengisi grid"
  },
  {
    input: [["Rose","Orchid","Orchid"], 2],
    expected: [["Rose","Orchid"],["dihcrO","Empty"]],
    desc: "Nama kembar terpanjang"
  },
  {
    input: [["Rose","Lily","Iris"], 2],
    expected: [["Rose","Lily"],["sirI","Empty"]],
    desc: "Semua nama sama panjang"
  },
  {
    input: [["Lily"], 3],
    expected: [["yliL","Empty","Empty"],["Empty","Empty","Empty"],["Empty","Empty","Empty"]],
    desc: "Grid besar, bunga sedikit"
  },
];

function runTests(fn) {
  console.log(`\n=== RUNNING TESTS ===\n`);
  let passCount = 0;

  testCases.forEach(({ input, expected, desc }, index) => {
    const result = fn(...input);
    const status = JSON.stringify(result) === JSON.stringify(expected) ? '✅ PASS' : '❌ FAIL';

    if (status === '✅ PASS') passCount++;

    console.log(`Test #${index + 1}: ${status} - ${desc}`);

    if (status === '❌ FAIL') {
      console.log('  Input   :', JSON.stringify(input));
      console.log('  Expected:', JSON.stringify(expected));
      console.log('  Result  :', JSON.stringify(result));
    }
  });

  console.log(`\nRESULT: ${passCount}/${testCases.length} Passed\n`);
}

runTests(arrangeFlowerGarden);
```

> **Trik Tip:** Untuk membandingkan dua array multidimensi (2D) dalam unit test sederhana, cara tercepat adalah meng-convert keduanya menjadi string dengan `JSON.stringify()`. Jika kedua string identik, maka struktur dan isinya pasti sama. Perhatikan juga bahwa `fn(...input)` menggunakan spread operator untuk meneruskan array `[flowerNames, gridSize]` sebagai dua argumen terpisah ke fungsi.

---

## 🔗 Navigation

- **📚 [← Kembali ke README](../README.md)**
- **📖 [← Part 06 — Perbandingan Semua Versi](./06-all-versions-comparison_perbandingan-semua-versi.md)**
