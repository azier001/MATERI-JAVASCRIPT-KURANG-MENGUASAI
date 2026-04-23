# 🔄 Challenge: Reverse a String Using a Queue

> Catatan belajar pribadi — membalikkan string menggunakan Queue (Antrean) di JavaScript.

---

## 📑 Daftar Isi

- 🔍 [Apa itu Queue?](#apa-itu-queue)
- ❌ [Kesalahan Umum Pemula](#kesalahan-umum-pemula)
- 💡 [Kunci Solusi: Teknik Prepend](#kunci-solusi-prepend)
- 🏗️ [Solusi 1 — Custom Queue Class](#solusi-1-custom-queue-class)
- 📦 [Solusi 2 — Array sebagai Queue](#solusi-2-array-sebagai-queue)
- ✨ [Solusi 3 — Refactoring dengan Spread Operator](#solusi-3-refactoring)
- 🏷️ [Tips Penamaan Variabel](#tips-penamaan-variabel)
- 📊 [Perbandingan Ketiga Solusi](#perbandingan-ketiga-solusi)
- 🎯 [Ringkasan Pelajaran](#ringkasan-pelajaran)

---

<a name="apa-itu-queue"></a>
## 🔍 Apa itu Queue?

Queue adalah struktur data yang bekerja seperti **antrean di kasir supermarket**. Orang yang datang pertama, dilayani pertama. Prinsip ini disebut **FIFO (First In, First Out)**.

Kalau kita masukkan kata `"HELLO"` ke dalam Queue:

```text
MASUK (Enqueue) ──▶ [ H ][ E ][ L ][ L ][ O ] ──▶ KELUAR (Dequeue)
                     ↑                         ↑
                   TAIL                      HEAD
                 (pintu masuk)           (pintu keluar)
```

Jika kita ambil (*dequeue*) satu per satu, urutan keluarnya: `H → E → L → L → O` — **urutannya tetap sama**, tidak terbalik!

> 💡 **Insight:** Karena Queue tidak otomatis membalik urutan (tidak seperti Stack), kita perlu **trik khusus** untuk membalik string menggunakannya.

---

<a name="kesalahan-umum-pemula"></a>
## ❌ Kesalahan Umum Pemula

### Kesalahan 1: Enqueue dan Dequeue di Loop yang Sama

```javascript
// ❌ SALAH — Antrean selalu cuma berisi 1 orang
for (const char of str) {
    queue.enqueue(char);
    result += queue.dequeue() + result;
}
```

**Kenapa salah?** Karena setiap karakter langsung diambil lagi sebelum karakter berikutnya masuk. Queue-nya tidak pernah benar-benar "mengantre". Ini seperti kasir yang hanya melayani satu orang, lalu tutup, lalu buka lagi.

### Kesalahan 2: Menggunakan `+=` untuk Prepend

```javascript
// ❌ SALAH — += itu append (menambah di belakang)
result += queue.dequeue() + result;
```

**Kenapa salah?** Operator `+=` adalah singkatan dari `result = result + ...`. Jadi dia selalu menempel data baru di **belakang**. Mari kita trace:

```text
Loop 1: result = "" + ("" + "a")        → "a"
Loop 2: result = "a" + ("a" + "b")      → "aab"     ← Sudah meleset!
Loop 3: result = "aab" + ("aab" + "c")  → "aababc"  ← Makin berantakan!
```

> 🔑 **Pelajaran:** Selalu pisahkan proses menjadi **dua tahap** — isi dulu antreannya, baru ambil satu per satu.

---

<a name="kunci-solusi-prepend"></a>
## 💡 Kunci Solusi: Teknik Prepend

Karena Queue mengeluarkan data sesuai urutan masuk (FIFO), kita perlu **menempelkan huruf baru di DEPAN** hasil yang sudah ada. Teknik ini disebut **Prepend**.

### Analogi Gerbong Kereta 🚂

**Append** — gerbong baru ditempel di belakang:
```text
[ result ] + [ baru ]  ══▶  [ result ][ baru ]
   "he"    +   "l"     ══▶     "hel"            ← urutan tetap sama
```

**Prepend** — gerbong baru ditempel di depan:
```text
[ baru ] + [ result ]  ══▶  [ baru ][ result ]
   "l"   +   "he"      ══▶     "lhe"            ← urutan mulai terbalik!
```

### Visualisasi Proses Prepend dengan `"ABC"`

```text
Queue setelah enqueue semua: [ A, B, C ]

┌─────────┬──────────────┬────────────────────────┬──────────────┐
│  Step   │   Dequeue    │       Operasi          │    Result    │
├─────────┼──────────────┼────────────────────────┼──────────────┤
│    1    │     "A"      │  "A" + ""              │     "A"      │
│    2    │     "B"      │  "B" + "A"             │     "BA"     │
│    3    │     "C"      │  "C" + "BA"            │     "CBA"    │
└─────────┴──────────────┴────────────────────────┴──────────────┘
                                                    ✅ Terbalik!
```

---

<a name="solusi-1-custom-queue-class"></a>
## 🏗️ Solusi 1 — Custom Queue Class

Menggunakan kelas Queue buatan sendiri dengan pointer `head` dan `tail`.

Pertama, kita punya file `queue.js` yang berisi implementasi Queue:

```javascript
class Queue {
    constructor() {
        this.queue = [];
        this.head = 0;    // Pointer ke elemen paling depan
        this.tail = 0;    // Pointer ke posisi kosong berikutnya
        this.maxSize = 100;
    }

    enqueue(element) {          // Masukkan ke antrean
        if (this.isFull()) return false;
        this.queue[this.tail] = element;
        this.tail++;
        return true;
    }

    dequeue() {                 // Ambil dari antrean (paling depan)
        const item = this.queue[this.head];
        this.head++;
        return item;
    }

    isEmpty() {                 // Cek apakah antrean kosong
        return this.getLength() === 0;
    }

    getLength() {               // Hitung jumlah isi antrean
        return this.tail - this.head;
    }
}
```

Visualisasi cara kerja pointer `head` dan `tail`:

```text
Awal:        queue = [ ]           head=0, tail=0

Enqueue "H": queue = [ H ]         head=0, tail=1
Enqueue "I": queue = [ H, I ]      head=0, tail=2

Dequeue:     queue = [ _, I ]      head=1, tail=2  → return "H"
                      ↑
                   (dilewati)
```

> 💡 **Kenapa pakai pointer?** Supaya `dequeue()` tidak perlu menggeser semua elemen — cukup geser pointer `head` ke kanan. Ini jauh lebih cepat!

Lalu, fungsi utamanya:

```javascript
const Queue = require('./queue');

const reverseStringWithCustomQueue = (str) => {
  const queue = new Queue();
  let result = '';

  // Tahap 1: Masukkan SEMUA karakter ke antrean
  for (const char of str) {
    queue.enqueue(char);
  }

  // Tahap 2: Ambil satu-satu dan tempel di DEPAN (Prepend)
  while (!queue.isEmpty()) {
    result = queue.dequeue() + result;
  }

  return result;
};
```

### 🔬 Visualisasi Eksekusi Solusi 1 — Input: `"hello"`

**Tahap 1: Enqueue semua karakter**
```text
enqueue("h"):  queue = [ h ]              head=0, tail=1
enqueue("e"):  queue = [ h, e ]           head=0, tail=2
enqueue("l"):  queue = [ h, e, l ]        head=0, tail=3
enqueue("l"):  queue = [ h, e, l, l ]     head=0, tail=4
enqueue("o"):  queue = [ h, e, l, l, o ]  head=0, tail=5
                 ↑                    ↑
               HEAD                 TAIL
```

**Tahap 2: Dequeue + Prepend**
```text
┌──────┬──────────┬───────────────────────────┬──────────┬─────────────────────┐
│ Step │ dequeue()│ queue setelah dequeue      │ Operasi  │ result              │
├──────┼──────────┼───────────────────────────┼──────────┼─────────────────────┤
│  1   │   "h"    │ [ _, e, l, l, o ] head=1  │ "h" + "" │ "h"                 │
│  2   │   "e"    │ [ _, _, l, l, o ] head=2  │ "e" + "h"│ "eh"                │
│  3   │   "l"    │ [ _, _, _, l, o ] head=3  │ "l" +"eh"│ "leh"               │
│  4   │   "l"    │ [ _, _, _, _, o ] head=4  │"l"+"leh" │ "lleh"              │
│  5   │   "o"    │ [ _, _, _, _, _ ] head=5  │"o"+"lleh"│ "olleh" ✅          │
└──────┴──────────┴───────────────────────────┴──────────┴─────────────────────┘

                  isEmpty() → true → keluar dari while loop
                  return "olleh" 🎉
```

---

<a name="solusi-2-array-sebagai-queue"></a>
## 📦 Solusi 2 — Array sebagai Queue

Di JavaScript, Array punya *method* bawaan yang bisa meniru perilaku Queue:

| Operasi Queue | Method Array | Penjelasan                        |
|:-------------:|:------------:|:----------------------------------|
| `enqueue()`   | `push()`     | Masukkan data di paling belakang  |
| `dequeue()`   | `shift()`    | Ambil data dari paling depan      |
| `isEmpty()`   | `.length`    | Cek panjang array                 |

```text
       [ shift() ] ◀─── [ index 0 ][ index 1 ][ index 2 ] ◀─── [ push() ]
           │                 A           B           C              │
       (Keluar)                                                  (Masuk)
```

Kodenya jadi jauh lebih singkat karena tidak perlu import file lain:

```javascript
const reverseStringWithArrayQueue = (str) => {
  const queue = [];
  let result = '';

  // push = enqueue
  for (const char of str) {
    queue.push(char);
  }

  // shift = dequeue
  while (queue.length > 0) {
    result = queue.shift() + result;
  }

  return result;
};
```

### 🔬 Visualisasi Eksekusi Solusi 2 — Input: `"hello"`

**Tahap 1: push() semua karakter**
```text
push("h"):  queue = [ "h" ]                       length = 1
push("e"):  queue = [ "h", "e" ]                   length = 2
push("l"):  queue = [ "h", "e", "l" ]              length = 3
push("l"):  queue = [ "h", "e", "l", "l" ]         length = 4
push("o"):  queue = [ "h", "e", "l", "l", "o" ]    length = 5
```

**Tahap 2: shift() + Prepend**
```text
┌──────┬──────────┬──────────────────────────────┬───────────┬────────────┐
│ Step │ shift()  │ queue setelah shift           │ Operasi   │ result     │
├──────┼──────────┼──────────────────────────────┼───────────┼────────────┤
│  1   │   "h"    │ [ "e", "l", "l", "o" ]       │ "h" + ""  │ "h"        │
│  2   │   "e"    │ [ "l", "l", "o" ]            │ "e" + "h" │ "eh"       │
│  3   │   "l"    │ [ "l", "o" ]                 │ "l" +"eh" │ "leh"      │
│  4   │   "l"    │ [ "o" ]                      │"l"+"leh"  │ "lleh"     │
│  5   │   "o"    │ [ ]                          │"o"+"lleh" │ "olleh" ✅ │
└──────┴──────────┴──────────────────────────────┴───────────┴────────────┘

                  queue.length === 0 → keluar dari while loop
                  return "olleh" 🎉
```

> 💡 **Perhatikan:** Setelah setiap `shift()`, semua elemen di dalam array bergeser ke kiri.
> Itulah kenapa `shift()` lebih lambat dibanding pointer `head` di Custom Queue Class.

---

<a name="solusi-3-refactoring"></a>
## ✨ Solusi 3 — Refactoring dengan Spread Operator

Kita bisa membuat Solusi 2 jadi **lebih elegan** dengan fitur modern JavaScript.

### Apa itu Spread Operator (`...`)?

Spread operator bisa "memecah" string menjadi array of characters dalam satu baris:

```javascript
const queue = [..."hello"];
// Hasilnya: ["h", "e", "l", "l", "o"]
```

Ini menghilangkan kebutuhan loop `for` untuk enqueue. Kodenya jadi sangat ringkas:

```javascript
const reverseStringWithQueue = (inputString) => {
  const charQueue = [...inputString];   // Langsung jadi antrean karakter!
  let reversed = '';

  while (charQueue.length > 0) {
    const char = charQueue.shift();     // Ambil satu karakter
    reversed = char + reversed;         // Tempel di depan
  }

  return reversed;
};
```

### 🔬 Visualisasi Eksekusi Solusi 3 — Input: `"hello"`

**Inisialisasi: Spread Operator langsung memecah string**
```text
[..."hello"]  ══▶  charQueue = [ "h", "e", "l", "l", "o" ]
                   reversed  = ""
```

**Loop: shift() + Prepend (sama seperti Solusi 2, tapi tanpa tahap push)**
```text
┌──────┬──────────────┬──────────────────────────┬───────────────┬────────────┐
│ Step │ char (shift)│ charQueue setelah shift    │ Operasi       │ reversed   │
├──────┼──────────────┼──────────────────────────┼───────────────┼────────────┤
│  1   │    "h"       │ [ "e", "l", "l", "o" ]   │ "h" + ""      │ "h"        │
│  2   │    "e"       │ [ "l", "l", "o" ]        │ "e" + "h"     │ "eh"       │
│  3   │    "l"       │ [ "l", "o" ]             │ "l" + "eh"    │ "leh"      │
│  4   │    "l"       │ [ "o" ]                  │ "l" + "leh"   │ "lleh"     │
│  5   │    "o"       │ [ ]                      │ "o" + "lleh"  │ "olleh" ✅ │
└──────┴──────────────┴──────────────────────────┴───────────────┴────────────┘

                  charQueue.length === 0 → keluar dari while loop
                  return "olleh" 🎉
```

**Sebelum vs Sesudah Refactor:**

```text
SEBELUM (5 baris untuk setup):        SESUDAH (1 baris untuk setup):
┌──────────────────────────────┐      ┌──────────────────────────────┐
│ const queue = [];            │      │ const charQueue = [...str];  │
│ for (const char of str) {    │      └──────────────────────────────┘
│   queue.push(char);          │         ✅ Cukup 1 baris!
│ }                            │
└──────────────────────────────┘
```

---

<a name="tips-penamaan-variabel"></a>
## 🏷️ Tips Penamaan Variabel

Variabel yang bagus itu bisa "bercerita" tanpa perlu komentar:

| Sebelum         | Sesudah          | Alasan                                        |
|:---------------:|:----------------:|:----------------------------------------------|
| `str`           | `inputString`    | Lebih jelas perannya sebagai **masukan**       |
| `result`        | `reversed`       | Langsung tahu isinya adalah **hasil terbalik** |
| `queue` (array) | `charQueue`      | Spesifik: ini adalah antrean **karakter**      |

> 💡 **Prinsip:** Kode yang baik bisa dibaca seperti kalimat bahasa Inggris:
> *"While **charQueue** length is more than 0, take a **char** and prepend it to **reversed**."*

---

<a name="perbandingan-ketiga-solusi"></a>
## 📊 Perbandingan Ketiga Solusi

| Aspek              | Solusi 1 (Custom Class) | Solusi 2 (Array)  | Solusi 3 (Refactored)  |
|:------------------:|:-----------------------:|:-----------------:|:----------------------:|
| **Jumlah Baris**   | ~10 baris + file Queue  | ~10 baris         | ~7 baris               |
| **Keterbacaan**    | ⭐⭐⭐                | ⭐⭐⭐⭐          | ⭐⭐⭐⭐⭐            |
| **Performa**       | ⭐⭐⭐⭐⭐            | ⭐⭐⭐            | ⭐⭐⭐                |
| **Butuh Import?**  | ✅ Ya                  | ❌ Tidak          | ❌ Tidak               |
| **Cocok Untuk**    | Proyek besar           | Penggunaan umum   | Kode modern & ringkas  |

> ⚠️ **Catatan Performa:** `Array.shift()` di JavaScript itu agak "berat" karena setelah mengambil elemen pertama, JS harus menggeser semua elemen sisanya ke depan. Custom Queue Class menggunakan pointer sehingga tidak perlu menggeser apapun — cukup geser pointer `head`.

---

<a name="ringkasan-pelajaran"></a>
## 🎯 Ringkasan Pelajaran

1. 🧠 **Queue = FIFO** — Yang masuk pertama, keluar pertama (seperti antrean kasir).
2. 🔄 **Prepend adalah kunci** — Untuk membalik urutan dari Queue, tempelkan huruf baru di **depan** hasil yang sudah ada (`baru + result`), bukan di belakang.
3. 📦 **Array bisa jadi Queue** — Gunakan `push()` untuk enqueue dan `shift()` untuk dequeue.
4. ✨ **Spread Operator `[...str]`** — Cara modern dan elegan untuk mengubah string menjadi array karakter dalam satu baris.
5. 🏷️ **Penamaan variabel itu penting** — Nama yang deskriptif membuat kode "bercerita" tanpa perlu komentar.
6. ⚖️ **Selalu ada trade-off** — Kode yang pendek belum tentu paling cepat. Pilih pendekatan yang sesuai kebutuhan.
