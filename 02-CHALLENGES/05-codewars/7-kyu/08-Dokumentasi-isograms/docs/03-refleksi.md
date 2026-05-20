# 🪞 03 — Refleksi & Insight

![Level](https://img.shields.io/badge/Level-7%20kyu-red)

---

## 💭 Tantangan Utama

> Tantangan utama dari soal ini adalah **memahami konsep pengecekan duplikat** dalam sebuah string.
> Ide awalnya sudah benar: loop + simpan huruf yang sudah lewat, lalu cek setiap kali.
> Bagian yang sempat membingungkan adalah memastikan variable penampung **ditambahkan** (bukan di-assign ulang) agar memori huruf sebelumnya tidak hilang.

---

## 🔄 Evolusi Kode Kamu

### Versi 1 — Sebelum Mentoring (Frequency Counter)

```javascript
function isIsogram(str) {
  const freq = {};

  for (const char of str.toLowerCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }

  for (const key in freq) {
    if (freq[key] !== 1) return false;
  }

  return true;
}
```

**Review:**

- ✅ Logika benar dan lulus semua test.
- ⚠️ Naming kurang deskriptif (`freq`, `key`).
- ⚠️ Loop dua kali — hitung semua frekuensi dulu, baru cek duplikat.
- ⚠️ Menyimpan angka frekuensi padahal hanya butuh tahu "sudah ada atau belum" (boolean).

---

### Versi 2 — Setelah Mentoring (Object + Early Exit)

```javascript
function isIsogram(str) {
  const seenLetters = {};

  for (const char of str.toLowerCase()) {
    if (seenLetters[char]) return false;
    seenLetters[char] = true;
  }

  return true;
}
```

**Perbaikan yang dilakukan:**

| Aspek                    | Sebelum                       | Sesudah                                   |
| ------------------------ | ----------------------------- | ----------------------------------------- |
| **Naming variabel**      | `freq`, `key`                 | `seenLetters`, `char`                     |
| **Jumlah loop**          | 2 kali                        | 1 kali                                    |
| **Early exit**           | ❌ Harus selesai loop pertama | ✅ Langsung berhenti saat ketemu duplikat |
| **Tipe value di object** | Angka (`1, 2, 3...`)          | Boolean (`true`) — sesuai kebutuhan       |

---

### Versi 3 — Pendekatan Alternatif (String Penampung)

```javascript
const isIsogram = (str) => {
  const lowerStr = str.toLowerCase();
  let seenChars = '';

  for (let i = 0; i < lowerStr.length; i++) {
    const char = lowerStr[i];

    if (seenChars.includes(char)) return false;

    seenChars += char;
  }

  return true;
};
```

**Catatan:**

- Pendekatan berbeda yang sama validnya — menggunakan string sebagai memori.
- `.includes()` melakukan pencarian ke seluruh `seenChars` setiap iterasi → **O(n²)** time complexity.
- Versi 2 (object lookup) secara teknis lebih cepat karena property access di object mendekati **O(1)**.

---

## 🌟 Solusi Komunitas

### 1️⃣ Pendekatan `Set` — _Paling Elegan_

```javascript
function isIsogram(str) {
  return new Set(str.toUpperCase()).size == str.length;
}
```

**Cara Kerja:**
| Langkah | Proses | Hasil |
|---------|--------|-------|
| 1 | `str.toUpperCase()` | `"ABA"` |
| 2 | `new Set("ABA")` | `Set { 'A', 'B' }` (duplikat otomatis dihapus) |
| 3 | `.size == str.length` | `2 == 3` → `false` ❌ |

**Kenapa lebih baik:**

- Cuma 1 baris kode — sangat ringkas.
- `Set` secara otomatis membuang duplikat, jadi kita tinggal bandingkan ukurannya.
- Lebih _readable_ — langsung terlihat niatnya: "apakah jumlah huruf unik sama dengan panjang string?"

**Konsep baru yang dipelajari:**

- `Set` — struktur data yang hanya menyimpan nilai unik.
- `Set.size` — properti untuk mengetahui jumlah elemen unik.
- String bisa langsung dimasukkan ke `new Set()` karena string itu _iterable_ (bisa di-loop otomatis per karakter).

---

### 2️⃣ Pendekatan `RegExp` — _Paling Singkat tapi Paling Sulit Dibaca_

```javascript
function isIsogram(str) {
  return !/(\w).*\1/i.test(str);
}
```

**Cara Kerja:**
| Komponen Regex | Arti |
|----------------|------|
| `(\w)` | Tangkap 1 huruf/angka apapun (simpan sebagai **grup 1**) |
| `.*` | Boleh ada karakter apapun (0 atau lebih) di antara |
| `\1` | Cari huruf yang **sama persis** dengan grup 1 (backreference) |
| `/i` | Flag case-insensitive (abaikan besar/kecil huruf) |
| `!` | Negasi — jika regex cocok (ada duplikat), hasilnya di-_balik_ jadi `false` |

**Contoh eksekusi pada `"moOse"`:**

- Regex menangkap `o`, lalu mencari `o` lagi setelahnya → ketemu `O` (karena flag `/i`) → match!
- `.test()` return `true` → di-negasi jadi `false` → bukan isogram ✅

**Kenapa menarik:**

- Hanya 1 baris dan sangat _compact_.
- Menggunakan fitur _backreference_ (`\1`) yang sangat _powerful_ di regex.

**Kenapa belum perlu dipelajari sekarang:**

- Regex punya kurva belajar yang curam.
- Susah di-_debug_ dan di-_maintain_ jika belum terbiasa.
- Untuk level saat ini, pendekatan `Set` atau `loop` sudah lebih dari cukup.

---

### 3️⃣ Pendekatan `indexOf` — _Paling Mirip dengan Solusi Kamu_

```javascript
function isIsogram(str) {
  str = str.toLowerCase();

  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str.charAt(i), i + 1) >= 0) {
      return false;
    }
  }

  return true;
}
```

**Cara Kerja:**
| Langkah | Proses |
|---------|--------|
| 1 | Ubah string ke lowercase |
| 2 | Loop setiap karakter |
| 3 | Gunakan `indexOf(char, i + 1)` untuk mencari apakah karakter yang sama muncul **setelah posisi saat ini** |
| 4 | Jika ditemukan (`>= 0`), return `false` |

**Bedanya dengan solusimu:**

- Tidak butuh variabel penampung (`seenLetters`).
- `indexOf` parameter kedua (`fromIndex`) digunakan untuk mencari **ke depan saja** mulai dari posisi `i + 1`.
- `.charAt(i)` berfungsi sama dengan `str[i]`, hanya beda gaya penulisan.

**Konsep baru yang dipelajari:**

- `String.indexOf(searchValue, fromIndex)` — parameter kedua `fromIndex` menentukan mulai dari posisi mana pencarian dilakukan.

---

## 📊 Perbandingan Semua Solusi

| Aspek                  | Kode Awal (freq counter) | Kode Refactored (object) | `Set`        | `RegExp`     | `indexOf` |
| ---------------------- | ------------------------ | ------------------------ | ------------ | ------------ | --------- |
| **Jumlah baris**       | 8 baris                  | 6 baris                  | 1 baris      | 1 baris      | 5 baris   |
| **Jumlah loop**        | 2 kali                   | 1 kali                   | 0 (internal) | 0 (internal) | 1 kali    |
| **Early exit**         | ❌                       | ✅                       | ✅           | ✅           | ✅        |
| **Readability**        | ⭐⭐⭐                   | ⭐⭐⭐⭐⭐               | ⭐⭐⭐⭐⭐   | ⭐⭐         | ⭐⭐⭐⭐  |
| **Cocok untuk pemula** | ✅ Ya                    | ✅ Ya                    | ✅ Ya        | ❌ Tidak     | ✅ Ya     |

---

## 🎯 Key Takeaways

1. **`Set` adalah senjata rahasia** untuk mengecek duplikat. Jika soal meminta "apakah ada elemen yang berulang?", pikirkan `Set` terlebih dahulu.
2. **Naming itu penting.** `seenLetters` jauh lebih jelas daripada `freq`. Nama variabel yang bagus membuat kode bisa "menjelaskan dirinya sendiri".
3. **Pilih tipe data sesuai kebutuhan.** Hanya butuh tahu "ada atau tidak"? Pakai `boolean`. Butuh tahu "berapa kali"? Baru pakai angka.
4. **Early exit = efisien.** Jangan menghitung semua data kalau jawaban sudah bisa diketahui lebih awal. `return false` di tengah loop bisa menghemat banyak proses.
5. **`indexOf` punya parameter kedua** (`fromIndex`) yang sangat berguna untuk mencari kemunculan berikutnya dari sebuah karakter.
6. **Regex dengan backreference** (`\1`) bisa mendeteksi pola berulang, tapi belum perlu dikuasai di level ini.

---

_⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)_  
_⬆️ Kembali ke [README.md](../README.md)_
