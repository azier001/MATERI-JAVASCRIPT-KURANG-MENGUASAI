# 📅 20 Maret 2026 — Jurnal Belajar JavaScript

**Sumber Challenge:** [coddy.tech](https://coddy.tech)  
**Tingkat:** Easy  
**Kategori:** JavaScript Fundamentals / Basic Algorithms  
**Topik Utama:** Array, Functions  
**Topik Pendukung:** Array Methods (`.filter()`, `.some()`), Boolean Logic

---

## 📚 Daftar Isi

- 📋 [Deskripsi Challenge](#deskripsi-challenge)
- 🧠 [Memahami Soal](#memahami-soal)
- 🧪 [Test Cases](#test-cases)
- 🔄 [Eksplorasi Solusi](#eksplorasi-solusi)
- 📝 [Pelajaran yang Didapat](#pelajaran-yang-didapat)

---

<a name="deskripsi-challenge"></a>
## 🌱 Deskripsi Challenge: Garden Companion Plant Filter

> _"Dalam berkebun, tidak semua tanaman bisa ditanam berdampingan. Tugasmu: saring daftar tanaman pendamping dan kembalikan hanya yang kompatibel dengan tanaman target."_

---

### 🎯 Misi

Buat fungsi **`filterCompatiblePlants`** yang menyaring tanaman pendamping yang **kompatibel** dengan tanaman target berdasarkan daftar pasangan yang tidak cocok.

```
targetPlant = "tomato"
companions  = [basil, carrot, onion]
incompatiblePairs = [["tomato", "carrot"]]

  basil  → tidak ada di incompatiblePairs bersama tomato → ✅ LOLOS
  carrot → ada di incompatiblePairs bersama tomato        → ❌ BUANG
  onion  → tidak ada di incompatiblePairs bersama tomato → ✅ LOLOS

  hasil → ["basil", "onion"]
```

---

### 📥 Input

| Parameter | Tipe | Deskripsi |
|---|---|---|
| `targetPlant` | `string` | Tanaman utama yang ingin dicek kompatibilitasnya |
| `companions` | `Array<string>` | Daftar kandidat tanaman pendamping |
| `incompatiblePairs` | `Array<Array<string>>` | Pasangan tanaman yang tidak bisa ditanam bersama |

---

### 📤 Output

| Kondisi | Return Value |
|---|---|
| Normal | Array berisi nama tanaman yang kompatibel |
| Semua kompatibel | Seluruh elemen `companions` dikembalikan |
| Semua inkompatibel | Array kosong `[]` |

---

### 💡 Contoh Nyata

```js
// tomato-carrot inkompatibel → carrot dibuang
filterCompatiblePlants("tomato", ["basil", "carrot", "onion"], [["tomato", "carrot"]])
// → ["basil", "onion"]

// garlic tidak ada di pair manapun → semua lolos
filterCompatiblePlants("garlic", ["basil"], [["tomato", "basil"]])
// → ["basil"]
```

---

<a name="memahami-soal"></a>
## 🧠 Memahami Soal

### Apa itu incompatiblePairs?

`incompatiblePairs` adalah array of arrays — setiap sub-array berisi **dua tanaman** yang tidak bisa ditanam bersama:

```
incompatiblePairs = [
  ["tomato", "carrot"],   // tomato & carrot tidak cocok
  ["basil", "onion"]      // basil & onion tidak cocok
]
```

### Logika inti

Sebuah `companion` harus **dibuang** jika:
- Ada pair yang mengandung `targetPlant` **DAN** `companion` secara bersamaan

Sebuah `companion` **lolos** jika:
- Tidak ada satupun pair yang mempertemukan keduanya

### Pengecekan Dua Arah

Urutan dalam pair tidak konsisten — perlu cek dari kedua sisi:

```
pair = ["carrot", "tomato"]  ← urutan terbalik dari biasanya

Arah normal  : pair[0] === targetPlant && pair[1] === companion
Arah terbalik: pair[1] === targetPlant && pair[0] === companion
```

### Cara berpikir menyelesaikan soal

1. Loop setiap `companion` dari array `companions`
2. Untuk setiap `companion`, cek seluruh `incompatiblePairs`
3. Jika ada pair yang mempertemukan `targetPlant` dan `companion` → buang
4. Jika tidak ada → companion lolos
5. Kembalikan semua companion yang lolos

---

<a name="test-cases"></a>
## 🧪 Test Cases

### Buatan Sendiri

**Test 1 — Target tidak ada di pair manapun**
```js
filterCompatiblePlants("garlic", ["basil", "mint"], [["tomato", "basil"]])
// Expected: ["basil", "mint"]
// garlic tidak muncul di pair manapun → semua lolos
```

**Test 2 — Semua companions inkompatibel**
```js
filterCompatiblePlants("pepper", ["tomato", "basil"], [["pepper", "tomato"], ["pepper", "basil"]])
// Expected: []
// pepper inkompatibel dengan semua → hasil kosong
```

**Test 3 — Pair dengan urutan terbalik**
```js
filterCompatiblePlants("tomato", ["basil", "carrot"], [["carrot", "tomato"]])
// Expected: ["basil"]
// pair urutan terbalik, carrot tetap harus dibuang
```

**Test 4 — Companions kosong**
```js
filterCompatiblePlants("tomato", [], [["tomato", "carrot"]])
// Expected: []
// tidak ada companions → hasil kosong
```

**Test 5 — incompatiblePairs kosong**
```js
filterCompatiblePlants("tomato", ["basil", "carrot", "onion"], [])
// Expected: ["basil", "carrot", "onion"]
// tidak ada pasangan inkompatibel → semua lolos
```

---

### Soal Asli

**Soal 1**
```js
filterCompatiblePlants("garlic", ["basil"], [["tomato", "basil"]])
// Expected: ["basil"]
```

**Soal 2**
```js
filterCompatiblePlants("tomato", ["basil", "carrot", "onion"], [["tomato", "carrot"]])
// Expected: ["basil", "onion"]
```

**Soal 3**
```js
filterCompatiblePlants("lettuce", ["radish", "spinach", "kale"], [["lettuce", "spinach"], ["kale", "radish"]])
// Expected: ["radish", "kale"]
```

---

<a name="eksplorasi-solusi"></a>
## 🔄 Eksplorasi Solusi

### Versi 1 — for Loop Manual

```js
function filterCompatiblePlants(targetPlant, companions, incompatiblePairs) {
  const result = [];                              // (1) wadah hasil filter

  for (let i = 0; i < companions.length; i++) {  // (2) loop setiap companion
    let compatible = true;                        // (3) asumsi awal: kompatibel

    for (let j = 0; j < incompatiblePairs.length; j++) {  // (4) cek semua pair
      const pair = incompatiblePairs[j];
      if (
        (pair[0] === targetPlant && pair[1] === companions[i]) ||  // (5) arah normal
        (pair[1] === targetPlant && pair[0] === companions[i])     // (6) arah terbalik
      ) {
        compatible = false;  // (7) tandai inkompatibel
        break;               // (8) tidak perlu cek pair lainnya
      }
    }

    if (compatible) result.push(companions[i]);  // (9) hanya push jika kompatibel
  }

  return result;
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `const result = []` | Array kosong untuk menampung companions yang lolos |
| 2 | `for (let i = 0; ...)` | Loop luar — iterasi setiap companion |
| 3 | `let compatible = true` | Asumsi awal: companion ini kompatibel, sampai terbukti sebaliknya |
| 4 | `for (let j = 0; ...)` | Loop dalam — cek setiap pair |
| 5-6 | `pair[0] === ... \|\| pair[1] === ...` | Pengecekan dua arah untuk antisipasi urutan pair yang terbalik |
| 7 | `compatible = false` | Tandai bahwa companion ini inkompatibel |
| 8 | `break` | Keluar dari loop dalam — tidak perlu lanjut cek pair lain |
| 9 | `if (compatible) result.push(...)` | Hanya masukkan ke hasil jika lolos semua pengecekan |

**Alur eksekusi dengan `filterCompatiblePlants("tomato", ["basil", "carrot", "onion"], [["tomato", "carrot"]])`:**
```
i=0, companion="basil":
  j=0, pair=["tomato","carrot"]: tomato===tomato ✅ tapi carrot===basil ❌ → tidak cocok
  compatible = true → push "basil"

i=1, companion="carrot":
  j=0, pair=["tomato","carrot"]: tomato===tomato ✅ dan carrot===carrot ✅ → COCOK!
  compatible = false, break
  → tidak di-push

i=2, companion="onion":
  j=0, pair=["tomato","carrot"]: tomato===tomato ✅ tapi carrot===onion ❌ → tidak cocok
  compatible = true → push "onion"

return ["basil", "onion"] ✅
```

**✅ Kelebihan:**
- Mudah dipahami — alur eksplisit dan jelas
- `break` membuat efisien — berhenti begitu ditemukan inkompatibel

**⚠️ Catatan:**
- Kode lebih panjang — butuh variabel `result` dan flag `compatible`
- Loop bersarang (nested loop) — perlu melacak dua index sekaligus

---

### Versi 2 — `.filter()` + `.some()` (Solusi Resmi)

```js
function filterCompatiblePlants(targetPlant, companions, incompatiblePairs) {
  return companions.filter(companion => {         // (1) filter setiap companion
    return !incompatiblePairs.some(pair =>        // (2) cek apakah ADA pair yang cocok
      (pair[0] === targetPlant && pair[1] === companion) ||  // (3) arah normal
      (pair[1] === targetPlant && pair[0] === companion)     // (4) arah terbalik
    );
  });
}
```

**Penjelasan baris per baris:**

| # | Kode | Penjelasan |
|---|---|---|
| 1 | `.filter(companion => ...)` | Hanya kembalikan companion yang memenuhi kondisi |
| 2 | `!incompatiblePairs.some(...)` | `some()` return `true` jika ada pair cocok → `!` membaliknya: lolos jika **tidak ada** yang cocok |
| 3 | `pair[0] === targetPlant && pair[1] === companion` | Cek arah normal |
| 4 | `pair[1] === targetPlant && pair[0] === companion` | Cek arah terbalik |

**Alur eksekusi dengan `filterCompatiblePlants("tomato", ["basil", "carrot", "onion"], [["tomato", "carrot"]])`:**
```
companion="basil":
  some(): pair["tomato","carrot"] → tomato===tomato ✅ tapi carrot===basil ❌ → false
  some() = false → !false = true → basil LOLOS ✅

companion="carrot":
  some(): pair["tomato","carrot"] → tomato===tomato ✅ dan carrot===carrot ✅ → true
  some() = true → !true = false → carrot DIBUANG ❌

companion="onion":
  some(): pair["tomato","carrot"] → tomato===tomato ✅ tapi carrot===onion ❌ → false
  some() = false → !false = true → onion LOLOS ✅

return ["basil", "onion"] ✅
```

**✅ Kelebihan:**
- Ringkas — tidak perlu variabel `result`, flag `compatible`, atau `break`
- Deklaratif — kode terbaca seperti kalimat: *"filter companions yang tidak ada pasangan inkompatibel-nya"*
- Tidak ada nested loop yang terlihat — kompleksitas tersembunyi di dalam method

**Perbedaan kunci Versi 1 vs Versi 2:**
```js
// Versi 1 — Imperative: kamu kendalikan sendiri
let compatible = true;
for (...) { if (...) { compatible = false; break; } }
if (compatible) result.push(companion);

// Versi 2 — Declarative: JS yang kendalikan
return !incompatiblePairs.some(pair => ...);
```

---

<a name="pelajaran-yang-didapat"></a>
## 📝 Pelajaran yang Didapat

### 1. `.filter()` untuk menyaring array

```js
// Hanya elemen yang return true yang masuk ke hasil
[1, 2, 3, 4].filter(n => n > 2)  // → [3, 4]

// Dalam soal ini:
companions.filter(companion => /* kondisi lolos */)
```

---

### 2. `.some()` untuk mengecek keberadaan

```js
// Return true jika minimal SATU elemen memenuhi kondisi
[1, 2, 3].some(n => n > 2)   // → true  (ada yang > 2)
[1, 2, 3].some(n => n > 5)   // → false (tidak ada yang > 5)
```

> ⚠️ Berbeda dengan `.every()` yang butuh **semua** elemen memenuhi kondisi.

---

### 3. Negasi `!` untuk membalik logika

```js
// Kita ingin companion yang TIDAK inkompatibel
// .some() return true jika ADA yang inkompatibel
// Jadi kita balik dengan !

!incompatiblePairs.some(...)
// true  → tidak ada yang inkompatibel → companion LOLOS
// false → ada yang inkompatibel       → companion DIBUANG
```

---

### 4. Pengecekan dua arah pada pair

```js
// Pair bisa disimpan dalam urutan apapun
["tomato", "carrot"]  // atau
["carrot", "tomato"]  // keduanya bermakna sama

// Solusi: cek kedua kemungkinan
(pair[0] === targetPlant && pair[1] === companion) ||
(pair[1] === targetPlant && pair[0] === companion)
```

---

### 5. Imperative vs Declarative

| | Imperative (Versi 1) | Declarative (Versi 2) |
|---|---|---|
| Cara | `for` loop + flag manual | `.filter()` + `.some()` |
| Kendali | Kamu yang iterasi sendiri | JS yang iterasi |
| Panjang kode | Lebih panjang | Lebih ringkas |
| Keterbacaan pemula | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Gaya modern | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

> 💡 Secara logika, kedua solusi **identik** dan menghasilkan output yang sama.
