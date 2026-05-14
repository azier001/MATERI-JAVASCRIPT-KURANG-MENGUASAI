# 🎯 Pembulatan Satu Desimal di JavaScript — One Decimal Rounding

### ✨ _Menguasai teknik membulatkan angka ke 1 desimal dengan cara yang benar & aman_

> 🎯 **Tujuan:** Setelah membaca dokumentasi ini, kamu akan paham cara membulatkan angka ke 1 desimal di JavaScript — termasuk jebakan tipe data yang sering bikin bug, dan trik matematika alternatif yang dipakai programmer senior.

---

<a name="daftar-isi"></a>

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 📖 | [Latar Belakang](#latar-belakang) | Dari mana masalah ini muncul? |
| 🔑 | [Konsep Penting](#konsep-penting) | Memahami `toFixed()`, `Number()`, dan `Math.round()` |
| ⚖️ | [Perbandingan Metode](#perbandingan-metode) | `toFixed()` vs `Math.round()` — mana yang lebih baik? |
| 🛠️ | [Cara Penggunaan](#cara-penggunaan) | Step-by-step implementasi kedua metode |
| 🧪 | [Verifikasi](#verifikasi) | Buktikan sendiri hasilnya di console |
| 📝 | [Catatan Akhir](#catatan-akhir) | Tanggal & konteks pembuatan |

---

<a name="latar-belakang"></a>

## 📖 Latar Belakang

Saat mengerjakan challenge di Codewars, saya menemukan instruksi yang berbunyi:

> *"The function returns a **number** representing the Kuroshio Flow Index, **rounded to one decimal place**."*

Kalimat ini terlihat sederhana, tapi ternyata menyimpan **dua syarat sekaligus** yang harus dipenuhi:

### 🔍 Membedah Instruksi — 3 Bagian Penting

| No | Potongan Kalimat | Artinya |
|----|------------------|---------|
| 1️⃣ | _"returns a **number**"_ | Tipe data output **wajib** `Number`, bukan `String` |
| 2️⃣ | _"representing the Kuroshio Flow Index"_ | Konteks cerita saja — tidak memengaruhi kode |
| 3️⃣ | _"**rounded to one decimal place**"_ | Angka harus dibulatkan menjadi **1 digit di belakang koma** |

> [!TIP]
> 💡 **Analogi Mudah Dipahami**
>
> | | Tanpa Pembulatan | Dengan Pembulatan 1 Desimal |
> |---|---|---|
> | 📝 | Nilai mentah: `4.5678` | Nilai rapi: `4.6` |
> | 🔒 | Terlalu detail, sulit dibaca | Ringkas, mudah dipahami |
>
> Bayangkan seperti **timbangan digital di pasar** — meskipun berat sebenarnya `2.567 kg`, layar timbangan hanya menampilkan `2.6 kg` agar mudah dibaca pembeli.

### 💡 Jadi, Apa Tantangannya?

Tantangannya bukan soal "bagaimana cara membulatkan" (itu mudah), tapi **bagaimana membulatkan TANPA mengubah tipe data dari `Number` menjadi `String`**. Di sinilah jebakan JavaScript yang sering membuat pemula bingung.

---

<a name="konsep-penting"></a>

## 🔑 Konsep Penting — Tiga Senjata Pembulatan

### 1️⃣ `toFixed()` — _"Si Rapi Tapi Penipu"_ 🎭

```
🎯 Fungsi    → Membulatkan angka ke jumlah desimal tertentu
📌 Output    → Selalu mengembalikan STRING, bukan Number!
🔐 Analogi   → Seperti kasir yang merapikan struk belanja —
                hasilnya rapi, tapi formatnya berubah jadi "teks di kertas"
```

```javascript
let angka = 4.56;
let hasil = angka.toFixed(1);

console.log(hasil);        // "4.6"  ← Ada tanda kutip!
console.log(typeof hasil); // "string" ← Bukan number!
```

> [!WARNING]
> 🚨 **Jebakan `toFixed()`!**
> Meskipun outputnya *terlihat* seperti angka, tipe datanya sudah berubah menjadi **String**.
> Kalau soal meminta `return` sebuah `Number`, maka `toFixed()` saja **TIDAK CUKUP**.

---

### 2️⃣ `Number()` — _"Si Pengubah Tipe Data"_ 🔄

```
🎯 Fungsi    → Mengkonversi nilai apapun menjadi tipe Number
📌 Input     → Bisa menerima String, Boolean, dll.
🔐 Analogi   → Seperti mesin pencetak koin — kamu masukkan kertas
                bertuliskan "4.6", keluar koin bernilai 4.6
```

```javascript
let teks = "4.6";
let angka = Number(teks);

console.log(angka);        // 4.6  ← Tanpa tanda kutip!
console.log(typeof angka); // "number" ← Sudah benar!
```

> [!NOTE]
> 💡 **Jalan Pintas:** Ada cara singkat pengganti `Number()` yaitu **unary plus** (`+`).
> ```javascript
> let angka = +"4.6";  // Sama persis dengan Number("4.6")
> ```
> Tanda `+` di depan String akan otomatis mengkonversinya menjadi Number.

---

### 3️⃣ `Math.round()` — _"Si Pembulat Kejam"_ ⚔️

```
🎯 Fungsi    → Membulatkan angka ke bilangan BULAT terdekat
📌 Output    → Selalu mengembalikan NUMBER (aman!)
🔐 Analogi   → Seperti hakim yang hanya mengenal "bersalah" atau "tidak" —
                tidak ada zona abu-abu, semua angka desimal langsung dihapus
```

```javascript
Math.round(4.3);  // → 4  (dibulatkan ke bawah)
Math.round(4.5);  // → 5  (dibulatkan ke atas)
Math.round(4.9);  // → 5  (dibulatkan ke atas)
```

> [!IMPORTANT]
> 🔔 **Masalah:** `Math.round()` secara bawaan membulatkan ke **bilangan bulat** (0 desimal).
> Untuk bisa membulatkan ke **1 desimal**, kita perlu trik matematika — dijelaskan di section berikutnya!

---

<a name="perbandingan-metode"></a>

## ⚖️ Perbandingan — `toFixed()` vs `Math.round()` Trick

| Aspek | `Number(x.toFixed(1))` 🟢 | `Math.round(x * 10) / 10` 🟢 |
|-------|:--------------------------:|:-----------------------------:|
| Kemudahan dibaca | ✅ Sangat jelas | ⚠️ Perlu pemahaman trik |
| Tipe data output | ✅ `Number` _(setelah dibungkus `Number()`)_ | ✅ `Number` _(otomatis)_ |
| Perlu konversi tipe? | ⚠️ Ya, harus bungkus `Number()` | ✅ Tidak perlu |
| Performa | ✅ Cepat | ✅ Cepat |
| Risiko lupa konversi | 🔴 Tinggi — pemula sering lupa | 🟢 Tidak ada risiko |
| Hasil akhir | ✅ Sama | ✅ Sama |

> [!TIP]
> 🏆 **Kesimpulan:** Kedua cara sama-sama valid dan menghasilkan output yang identik.
> - Pakai **`Number(x.toFixed(1))`** jika kamu suka kode yang *readable* dan mudah dipahami.
> - Pakai **`Math.round(x * 10) / 10`** jika kamu ingin menghindari konversi tipe data dan terlihat lebih *pro*.

---

<a name="cara-penggunaan"></a>

## 🛠️ Cara Penggunaan (Step-by-Step)

### 🅰️ Metode 1 — `Number()` + `toFixed()` (Rekomendasi Pemula)

> **📋 Langkah:** 2 tahap | **🎯 Cocok untuk:** Kode yang mudah dibaca

**1.** 🔢 **Bulatkan angka ke 1 desimal dengan `toFixed(1)`**

```javascript
let kuroshioIndex = 4.56;
let dibulatkan = kuroshioIndex.toFixed(1); // → "4.6" (masih String!)
```

---

**2.** 🔄 **Konversi kembali ke Number dengan `Number()`**

```javascript
let hasilAkhir = Number(dibulatkan); // → 4.6 (sudah Number!)
```

---

**✏️ Versi Ringkas (1 baris):**

```javascript
return Number(kuroshioIndex.toFixed(1));
```

> 📖 **Penjelasan kata per kata:**
>
> | Bagian | Arti |
> |--------|------|
> | `return` | Mengembalikan nilai dari fungsi |
> | `Number(...)` | Membungkus hasil agar tipe datanya pasti `Number` |
> | `kuroshioIndex` | Variabel yang menyimpan hasil perhitungan |
> | `.toFixed(1)` | Method bawaan Number — bulatkan ke 1 desimal |

---

### 🅱️ Metode 2 — Trik `Math.round()` (Level Menengah)

> **📋 Langkah:** 3 tahap logika dalam 1 baris | **🎯 Cocok untuk:** Kode tanpa konversi tipe

**Ide utamanya:** Kita "geser" posisi koma agar `Math.round()` bisa bekerja sesuai keinginan kita.

```
[Input]     → 4.56
[× 10]      → 45.6       ← Geser koma ke kanan
[round()]   → 46          ← Bulatkan ke bilangan bulat
[÷ 10]      → 4.6         ← Kembalikan koma ke posisi semula
```

**Implementasi:**

```javascript
return Math.round(kuroshioIndex * 10) / 10;
```

> 📖 **Penjelasan kata per kata:**
>
> | Bagian | Arti |
> |--------|------|
> | `return` | Mengembalikan nilai dari fungsi |
> | `Math.round(...)` | Bulatkan ke bilangan bulat terdekat |
> | `kuroshioIndex * 10` | Geser koma 1 posisi ke kanan (agar digit yang ingin dipertahankan "selamat") |
> | `/ 10` | Kembalikan koma ke posisi asal |

> [!NOTE]
> 💡 **Kenapa dikali dan dibagi 10?**
> Karena kita ingin mempertahankan **1** desimal. Kalau ingin **2** desimal, maka kalikan dan bagi dengan **100**. Kalau **3** desimal, pakai **1000**. Polanya:
>
> | Jumlah Desimal | Pengali & Pembagi |
> |:--------------:|:-----------------:|
> | 1 desimal | `× 10` lalu `÷ 10` |
> | 2 desimal | `× 100` lalu `÷ 100` |
> | 3 desimal | `× 1000` lalu `÷ 1000` |

---

### 🅲️ Bonus — Unary Plus `+` (Jalan Pintas)

Cara tercepat menulis konversi `Number()`:

```javascript
return +kuroshioIndex.toFixed(1);
```

> [!TIP]
> 💡 **Perbedaan penulisan:**
> ```javascript
> // Ketiganya menghasilkan output yang IDENTIK: 4.6 (tipe Number)
>
> // ✅ Cara 1 — Paling jelas dibaca
> return Number(kuroshioIndex.toFixed(1));
>
> // ✅ Cara 2 — Trik matematika (tanpa konversi tipe)
> return Math.round(kuroshioIndex * 10) / 10;
>
> // ✅ Cara 3 — Paling singkat (unary plus)
> return +kuroshioIndex.toFixed(1);
> ```

---

<a name="verifikasi"></a>

## ✅ Verifikasi — Buktikan Sendiri di Console

### 1️⃣ Uji Metode 1 — `Number()` + `toFixed()`

```javascript
let angka = 4.56;
let hasil = Number(angka.toFixed(1));
console.log(hasil);        // 4.6
console.log(typeof hasil); // "number"
```

Pastikan output berikut muncul:
```
4.6           ← ✅ Angka sudah dibulatkan
"number"      ← ✅ Tipe data benar
```

---

### 2️⃣ Uji Metode 2 — `Math.round()` Trick

```javascript
let angka = 4.56;
let hasil = Math.round(angka * 10) / 10;
console.log(hasil);        // 4.6
console.log(typeof hasil); // "number"
```

Pastikan output berikut muncul:
```
4.6           ← ✅ Angka sudah dibulatkan
"number"      ← ✅ Tipe data benar
```

---

### 3️⃣ Uji dengan Berbagai Nilai

```javascript
// Kumpulan test case
let testCases = [4.56, 3.14, 7.777, 10.05, 0.99];

testCases.forEach(angka => {
    let cara1 = Number(angka.toFixed(1));
    let cara2 = Math.round(angka * 10) / 10;
    console.log(`${angka} → Cara 1: ${cara1} | Cara 2: ${cara2} | Sama? ${cara1 === cara2}`);
});
```

Output yang diharapkan:
```
4.56  → Cara 1: 4.6  | Cara 2: 4.6  | Sama? true   ← ✅
3.14  → Cara 1: 3.1  | Cara 2: 3.1  | Sama? true   ← ✅
7.777 → Cara 1: 7.8  | Cara 2: 7.8  | Sama? true   ← ✅
10.05 → Cara 1: 10.1 | Cara 2: 10.1 | Sama? true   ← ✅
0.99  → Cara 1: 1    | Cara 2: 1    | Sama? true   ← ✅
```

> 🎊 **Semua Lulus!** Kedua metode terbukti menghasilkan output identik.

---

<a name="catatan-akhir"></a>

## 📋 Ringkasan Cepat — Cheat Sheet

```
╔══════════════════════════════════════════════════════════════╗
║              🎯 ONE DECIMAL ROUNDING — CHEAT SHEET          ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  📌 MASALAH:                                                 ║
║  Soal minta return Number yang dibulatkan ke 1 desimal       ║
║                                                              ║
║  ✅ CARA 1 — toFixed + Number (Pemula)                       ║
║  return Number(hasil.toFixed(1));                             ║
║                                                              ║
║  ✅ CARA 2 — Math.round Trick (Menengah)                     ║
║  return Math.round(hasil * 10) / 10;                         ║
║                                                              ║
║  ✅ CARA 3 — Unary Plus (Singkat)                            ║
║  return +hasil.toFixed(1);                                   ║
║                                                              ║
║  ⚠️ JEBAKAN:                                                ║
║  toFixed() mengembalikan STRING, bukan Number!               ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

> 📝 **Catatan Akhir:**
> Dokumentasi ini dibuat pada **15 Mei 2026** berdasarkan sesi mentoring langsung di **Google Antigravity** dengan **JavaScript (Node.js)**. Konsep pembulatan ini berlaku universal di semua environment JavaScript (browser maupun server), namun contoh diuji menggunakan `console.log()` di terminal.

---

> _Dibuat oleh **azier** · Sesi Belajar JavaScript · 2026_ 🚀
