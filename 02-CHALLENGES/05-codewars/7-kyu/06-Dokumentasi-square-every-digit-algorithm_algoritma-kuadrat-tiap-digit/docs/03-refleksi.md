# 💡 03 — Refleksi & Lesson Learned

![Level](https://img.shields.io/badge/Level-7%20kyu-red)
![Insight](https://img.shields.io/badge/Insight-Lesson%20Learned-blueviolet)

---

## ✅ Apa yang Berhasil?

- Kita berhasil mengidentifikasi bahwa tipe data `Number` tidak bisa di-*looping*, sehingga langkah pertama wajib mengubahnya menjadi `String`.
- Kita sangat baik dalam menggunakan *spread operator* `[...]` untuk memecah string menjadi array yang elegan.
- Penggunaan tipe konversi secara eksplisit (`+digit`) di dalam *map* membuktikan pemahaman konversi tipe data yang matang.
- Logika keseluruhan dipisah ke dalam dua variabel `numAsString` dan `squaredStr` menjadikan kode lebih profesional dan *readable*.

---

## ❌ Apa yang Salah di Awal?

*Tidak ada kesalahan logika sejak awal. Pendekatan langsung akurat dari ide pertama hingga eksekusi kodenya.* 🚀

---

## 🌟 Best Practice & Solusi Unik Komunitas

Saat melihat tab *Solutions* di Codewars, ada beberapa pendekatan lain yang patut dijadikan referensi gaya penulisan:

### Pendekatan 1: *Old-School & Implicit Coercion*

```javascript
function squareDigits(num){
  return Number(('' + num).split('').map(function (val) { return val * val;}).join(''));
}
```

**Kenapa ini menarik:**
- Mengubah angka ke string menggunakan penambahan string kosong `'' + num`.
- Masih menggunakan cara konvensional `split('')` dan *anonymous function*. Cara ini *solid* namun terasa kuno dibanding pendekatan ES6 modern kita.

**🔍 Penjelasan Baris per Baris:**

```javascript
function squareDigits(num) {
  return Number(                // 5. Ubah string hasil akhir menjadi Number
    ('' + num)                  // 1. Gabungkan string kosong '' dengan num → implicit coercion menjadi String (misal: '' + 9119 → "9119")
      .split('')                // 2. Pecah string menjadi array karakter → ["9", "1", "1", "9"]
      .map(function (val) {     // 3. Iterasi array, kuadratkan setiap elemen (val masih string, tapi * otomatis konversi ke Number)
        return val * val;       //    "9" * "9" → 81, "1" * "1" → 1 → menghasilkan [81, 1, 1, 81]
      })
      .join('')                 // 4. Gabungkan array menjadi satu string → "811181"
  );
}
```

---

### Pendekatan 2: *The "Clever" Unary Plus*

```javascript
function squareDigits(num){
  return +num.toString().split('').map(i => i*i).join('');
}
```

**Kenapa ini sering di-upvote (Clever):**
- Menggunakan method bawaan `.toString()` untuk konversi awal.
- Menggunakan *Unary Plus* (`+`) di paling depan untuk menggantikan fungsi pembungkus `Number(...)`. Ini sangat pendek dan populer untuk gaya *code golf*.

**🔍 Penjelasan Baris per Baris:**

```javascript
function squareDigits(num) {
  return +(                     // 5. Unary Plus (+) di depan → mengubah string hasil akhir menjadi Number (shortcut dari Number(...))
    num.toString()              // 1. Panggil method .toString() pada num → 9119 menjadi "9119"
      .split('')                // 2. Pecah string menjadi array karakter → ["9", "1", "1", "9"]
      .map(i => i * i)          // 3. Arrow function: kuadratkan setiap elemen (implicit coercion) → [81, 1, 1, 81]
      .join('')                 // 4. Gabungkan kembali menjadi string → "811181"
  );
}
```

---

### Pendekatan 3: *Campuran dengan Shadowing Variable*

```javascript
function squareDigits(num){
  return +String(num).split('').map(function(num){return +num * +num;}).join('');
}
```

**Kenapa ini menarik (dan sedikit bahaya):**
- Menggabungkan trik `+` di awal dengan konversi eksplisit `+num * +num` persis seperti kodemu.
- Namun, orang ini menamai parameter map dengan `num` (`function(num)`). Ini adalah praktik **buruk** yang disebut *Variable Shadowing*, karena namanya sama dengan parameter fungsi utamanya `squareDigits(num)`. Ini bisa membingungkan pembaca kode!

**🔍 Penjelasan Baris per Baris:**

```javascript
function squareDigits(num) {        // ← num di sini = parameter fungsi utama (misal: 9119)
  return +(                         // 5. Unary Plus → ubah string akhir menjadi Number
    String(num)                     // 1. Konversi num ke String → "9119"
      .split('')                    // 2. Pecah jadi array → ["9", "1", "1", "9"]
      .map(function(num) {          // 3. ⚠️ SHADOWING! Parameter 'num' di sini menimpa 'num' di luar!
        return +num * +num;         //    +num mengubah string "9" ke Number 9, lalu 9 * 9 = 81
      })                            //    Hasil: [81, 1, 1, 81]
      .join('')                     // 4. Gabung menjadi string → "811181"
  );
}
```

---

## 📚 Konsep Baru (Review)

| Konsep | Penjelasan Singkat |
|--------|-------------------|
| `implicit coercion` | Di JavaScript, string yang berisi angka otomatis diubah jadi Number jika dilakukan operasi matematika `*`, `/`, `-` (Kecuali `+` karena akan jadi penggabungan string). |
| `Unary Plus (+)` | Simbol `+` yang diletakkan di depan variabel atau eksekusi fungsi berfungsi sebagai *shortcut* untuk mengubah tipe datanya menjadi Number. Sangat cepat! |
| `.toString()` vs `String()` | `.toString()` adalah method bawaan tipe data, sedangkan `String()` adalah fungsi global wrapper. Keduanya sama-sama mengubah jadi *string*. |

---

## 📝 Catatan untuk Masa Depan

- [x] Kalau ingin membuat kode super singkat, ingat trik penambahan *Unary Plus* `+` di awal ekspresi untuk menghindari penulisan `Number(...)`.
- [x] Menyimpan logika panjang dalam variabel (seperti yang kita lakukan) lebih disukai di dunia industri karena lebih *readable* ketimbang memaksakan *one-liner* yang panjang.

---

*⬅️ Kembali ke [02-pendekatanku.md](02-pendekatanku.md)*  
*⬆️ [Kembali ke README](../README.md)*
