# 📙 Insight: Trial & Error — String vs Array & Efisiensi Filter

### ✨ _Jujur membedah kode eksperimen mandiri yang gagal, dan menemukan pelajaran berharga di balik setiap bug_

> 🎯 **Tujuan:** Mendokumentasikan proses menulis ulang kode secara mandiri dari nol, menganalisis tiga jebakan (gotcha) yang ditemukan, dan memahami secara mendalam mengapa Array lebih unggul dari String sebagai penampung data.

---

<a name="daftar-isi"></a>

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🧪 | [Konteks Eksperimen](#konteks) | Inisiatif menulis ulang kode dari nol |
| 🐛 | [Kode Buggy & Analisis](#kode-buggy) | Draft awal yang menghasilkan output berantakan |
| 💡 | [Gotcha 1 — String vs Array](#gotcha-1) | Angka menempel tanpa spasi |
| 💡 | [Gotcha 2 — Salah Paham "Ignore"](#gotcha-2) | Tanda baca diubah, bukan diabaikan |
| 💡 | [Gotcha 3 — Filter Redundan](#gotcha-3) | Pre-filter yang mubazir |
| ✅ | [Rekonstruksi Solusi](#rekonstruksi) | Kode final yang diperbaiki |
| 💎 | [Key Takeaways](#key-takeaways) | Pelajaran inti dari eksperimen |

---

<a name="konteks"></a>

## 🧪 Konteks Eksperimen

Setelah menyelesaikan seluruh sesi mentoring (Fase 1–4), muncul inisiatif untuk **menulis ulang algoritma secara mandiri dari nol** — tanpa melihat solusi sebelumnya. Tujuannya mulia: menguji seberapa dalam pemahaman yang sudah tertanam.

Hasilnya? Kode yang ditulis **tampak masuk akal** di permukaan, tetapi menyimpan **tiga cacat tersembunyi** yang sangat edukatif.

---

<a name="kode-buggy"></a>

## 🐛 Kode Buggy (Draft Eksperimen Awal)

```javascript
function alphabetPosition(text) {
  // Pre-filter menghapus spasi
  const formattedText = text.toLowerCase().replace(/\s+/g, '');
  let result = ''; // ← 🔴 Masalah 1: Penampung STRING

  for (const char of formattedText) {
    if (char >= 'a' && char <= 'z') {
      result += char.charCodeAt(0) - 96; // ← 🔴 Masalah 2: Angka menempel
    } else {
      result += ' '; // ← 🔴 Masalah 3: "Ignore" yang salah
    }
  }

  return result;
}
```

### Hasil yang Diharapkan vs Kenyataan

```
Input:    "The."
Expected: "20 8 5"

Actual:   "2085 "
               ↑↑
               │└─ Spasi sisa dari titik yang "diubah" (bukan diabaikan)
               └── Angka 20, 8, 5 menempel tanpa pemisah
```

> [!WARNING]
> 🔴 **Kode ini lulus syntax check dan tidak melempar error apapun** — ia berjalan "normal" tapi menghasilkan output yang salah. Ini jenis bug yang paling berbahaya: **silent failure**.

---

<a name="gotcha-1"></a>

## 💡 Gotcha 1 — String Concatenation (`+=`) vs Array `.join()`

### Akar Masalah

Penampung `result` bertipe **String** (`let result = ''`). Saat menemui abjad berturut-turut, perintah `result += angka` langsung **menempelkan angka tanpa spasi**:

```
Iterasi 1: char = 't' → 116 - 96 = 20 → result = "" + 20  → "20"
Iterasi 2: char = 'h' → 104 - 96 = 8  → result = "20" + 8 → "208"   ← 😱
Iterasi 3: char = 'e' → 101 - 96 = 5  → result = "208" + 5 → "2085"  ← 😱
```

Angka `20`, `8`, `5` menyatu menjadi `"2085"` — mustahil dibedakan mana angka yang mana!

### Solusi: Delegasikan ke Array

```javascript
// ❌ String: Angka menempel tanpa spasi
let result = '';
result += 20;  // "20"
result += 8;   // "208"  ← Salah!

// ✅ Array: Setiap angka tersimpan terpisah
const result = [];
result.push(20);  // [20]
result.push(8);   // [20, 8]
result.join(' '); // "20 8"  ← Benar!
```

> [!IMPORTANT]
> 🔔 **Prinsip:** Jangan merangkai data numerik ke dalam String secara manual. Simpan dulu di Array, biarkan `.join(' ')` yang menangani pemisah spasi secara otomatis dan konsisten.

---

<a name="gotcha-2"></a>

## 💡 Gotcha 2 — Salah Paham pada Maksud "Ignore"

### Akar Masalah

Aturan soal menginstruksikan: *"If anything in the text isn't a letter, **ignore it**"*.

Kode eksperimen menerjemahkan "ignore" secara keliru:

```javascript
} else {
  result += ' '; // ← Tanda baca DIUBAH menjadi spasi, bukan DIABAIKAN
}
```

Titik (`.`) yang seharusnya **diabaikan total** justru **diubah wujudnya** menjadi karakter spasi. Akibatnya muncul spasi-spasi tak terduga di output.

### Visualisasi Perbedaan

```
Input: "The."

❌ Kode buggy (tanda baca → spasi):
   't' → 20, 'h' → 8, 'e' → 5, '.' → ' '
   Output: "2085 "  ← Ada spasi sisa + angka menempel

✅ Kode benar (tanda baca → diabaikan):
   't' → 20, 'h' → 8, 'e' → 5, '.' → (tidak diproses)
   Output: "20 8 5"
```

### Solusi: Buang Seluruh Blok `else`

```javascript
// ❌ "Ignore" yang salah — karakter tetap DIPROSES
if (char >= 'a' && char <= 'z') {
  result.push(char.charCodeAt(0) - 96);
} else {
  result += ' '; // ← Masih ada aksi!
}

// ✅ "Ignore" yang benar — karakter TIDAK DIPROSES sama sekali
if (char >= 'a' && char <= 'z') {
  result.push(char.charCodeAt(0) - 96);
}
// ← Tidak ada else. Titik. Selesai. Inilah "ignore" yang sesungguhnya.
```

> [!TIP]
> 💡 **Pengabaian paling sejati dalam pemrograman** adalah ketika program **sama sekali tidak mengeksekusi instruksi apapun** — bukan mengubah sesuatu menjadi bentuk lain.

---

<a name="gotcha-3"></a>

## 💡 Gotcha 3 — Redundansi Regex Pre-Filter

### Akar Masalah

Di awal kode eksperimen, ada baris yang menghapus spasi sebelum loop:

```javascript
const formattedText = text.toLowerCase().replace(/\s+/g, '');
```

Niatnya baik: "bersihkan spasi dulu agar loop tidak perlu memprosesnya". Namun baris ini **mubazir (redundant)**, karena sesaat kemudian **setiap karakter** sudah disortir oleh guard clause yang sangat ketat:

```javascript
if (char >= 'a' && char <= 'z') { ... }
```

Spasi, tab, newline — semua bentuk `\s` — secara teknis langsung **tertolak** di pintu gerbang `if` ini. Jadi menghapusnya sebelum loop hanyalah menggandakan pekerjaan:

```
Lapisan 1: .replace(/\s+/g, '')  → Hapus spasi     ← REDUNDAN
Lapisan 2: if (char >= 'a' ...)  → Tolak non-abjad  ← Sudah cukup sendirian
```

### Solusi: Cukup Lowercase Saja

```javascript
// ❌ Redundan: Dua lapisan filter untuk tugas yang sama
const formattedText = text.toLowerCase().replace(/\s+/g, '');

// ✅ Efisien: Satu tugas, satu baris
const formattedText = text.toLowerCase();
```

> [!NOTE]
> 💡 **Catatan:** Kode redundan tidak menyebabkan error atau output salah — ia hanya **membuang sumber daya komputasi** untuk pekerjaan yang sudah ditangani di tempat lain. Mengenali dan membuangnya adalah ciri programmer yang matang.

---

<a name="rekonstruksi"></a>

## ✅ Rekonstruksi Solusi Akhir

Dengan membuang kode redundan, mengganti String menjadi Array, dan menghapus blok `else`, kode eksperimen berhasil diperbaiki:

```javascript
function alphabetPosition(text) {
  const formattedText = text.toLowerCase();
  const result = [];

  for (const char of formattedText) {
    if (char >= 'a' && char <= 'z') {
      const code = char.charCodeAt(0) - 96;
      result.push(code);
    }
  }

  return result.join(' ');
}
```

### Ringkasan Perbaikan

| Bug | Masalah | Perbaikan |
|:---:|---------|-----------|
| 🔴 1 | `let result = ''` — angka menempel | `const result = []` + `.join(' ')` |
| 🔴 2 | Blok `else` — tanda baca diubah jadi spasi | Hapus blok `else` seluruhnya |
| 🟡 3 | `.replace(/\s+/g, '')` — filter ganda | Hapus — cukup `.toLowerCase()` saja |

---

<a name="key-takeaways"></a>

## 💎 Key Takeaways

### 🧠 Pelajaran Teknis

```
1️⃣  Array > String untuk penampung data numerik
    → Array menjaga setiap elemen TERPISAH
    → .join(' ') merangkai spasi secara otomatis dan konsisten

2️⃣  "Ignore" = tidak ada kode yang dieksekusi
    → Bukan mengubah ke bentuk lain (spasi, null, dsb.)
    → Cukup TIDAK menulis blok else

3️⃣  Kenali redundansi — jangan gandakan pekerjaan
    → Jika guard clause sudah menyortir, pre-filter tidak diperlukan
    → Kode redundan = aman tapi boros
```

### 🌱 Pelajaran Mindset

> [!TIP]
> 💡 **Jangan ragu untuk bereksperimen dan berbuat salah.**
>
> Kesalahan-kesalahan di atas justru memberikan **fondasi pemahaman yang lebih dalam** dibanding langsung copy-paste solusi yang benar. Bug mengajarkan "kenapa", bukan cuma "bagaimana".

---

[⬅️ Kembali ke 02 — Evolusi & Clean Code](02-evolusi-dan-clean-code.md) · [⬆️ Kembali ke README](../README.md)
