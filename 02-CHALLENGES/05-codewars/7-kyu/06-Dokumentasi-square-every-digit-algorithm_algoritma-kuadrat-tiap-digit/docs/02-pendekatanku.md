# 🧠 02 — Pendekatanku

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Proses Berpikir Awal

> *Bagaimana cara memecah angka menjadi per digit, mengkuadratkannya, lalu menggabungkannya kembali?*

Tantangan utama adalah tipe data `Number` tidak bisa di-iterasi (dilooping) atau dipecah secara langsung. Oleh karena itu, kita harus mengubahnya terlebih dahulu menjadi tipe data yang bisa dipecah, yaitu `String` lalu memecahnya menjadi kumpulan karakter di dalam `Array`. Setelah berada di dalam Array, kita bisa mengolah tiap digit satu per satu.

---

## 🗺️ Rencana Sebelum Koding (Pseudocode)

```text
1. Ubah angka input menjadi String agar bisa dipecah.
2. Pecah String tersebut menjadi Array (menggunakan spread operator `[...]`).
3. Iterasi setiap elemen di dalam Array (menggunakan `.map()`).
4. Di dalam `.map()`, kuadratkan setiap elemen (digit * digit).
5. Gabungkan kembali Array yang sudah berisi angka kuadrat menjadi satu String penuh (menggunakan `.join('')`).
6. Terakhir, ubah String hasil gabungan tersebut kembali menjadi tipe data Number (menggunakan `Number()`).
7. Return hasilnya.
```

---

## 🔄 Percobaan Pertama (Eksplorasi)

Kode pertama yang berhasil ditulis sebelum sesi mentoring, menggunakan pendekatan deklaratif dengan *spread operator* dan *unary plus*:

```javascript
// Attempt #1 — Pendekatan Deklaratif yang Sangat Rapi (Refactored Naming)
function squareDigits(num) {
  const numAsString = String(num);

  const squaredStr = [...numAsString].map((digit) => +digit * +digit).join('');

  return Number(squaredStr);
}
```

**Hasil:** ✅ Lulus
**Catatan:** Kode ini sudah **sangat luar biasa dan *best practice***! Memecah logika menjadi variabel `numAsString` dan `squaredStr` membuatnya sangat mudah dibaca (*readable*). Penggunaan kata `digit` di dalam *map* juga sangat mendeskripsikan elemen yang sedang diolah. Penggunaan *unary plus* (`+digit`) juga menunjukkan pemahaman yang baik tentang konversi tipe data eksplisit.

---

## ✅ Solusi Final (Pendekatan Deklaratif)

Berkat *problem solving* yang baik, kita bisa menggunakan *spread operator* `[...]` yang sangat elegan, dan kita bisa merangkai semuanya (*method chaining*) dalam satu baris fungsi!

```javascript
// Solusi Final (Deklaratif & One-liner)
function squareDigits(num){
  return Number([...String(num)].map(digit => digit * digit).join(''));
}
```

---

## 🔍 Penjelasan Baris per Baris

```javascript
function squareDigits(num) {
  return Number(                         // 4. Ubah hasil string final kembali menjadi Number
    [...String(num)]                     // 1. Ubah num jadi String, lalu sebar jadi Array of string
      .map(digit => digit * digit)       // 2. Iterasi array, kuadratkan setiap karakternya (coercion ke number otomatis terjadi di sini)
      .join('')                          // 3. Gabungkan seluruh angka di array menjadi satu String tanpa pemisah
  );
}
```

---

## 🧪 Verifikasi Manual

```javascript
console.log(squareDigits(9119)); // → 811181 ✅
console.log(squareDigits(765));  // → 493625 ✅
console.log(squareDigits(0));    // → 0 ✅
```

---

*⬅️ Kembali ke [01-soal.md](01-soal.md)*  
*➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)*
