# 🧠 02 — Metodologi & Pendekatan

![Level](https://img.shields.io/badge/Level-8%20kyu-red)
![Status](https://img.shields.io/badge/Status-✅%20Solved-success)

---

## 💭 Dekonstruksi Masalah (Mental Model)

Inti dari masalah ini adalah **pencocokan pola (pattern matching)** sederhana pada batas awal sebuah string. Tantangan utamanya bukan pada pengambilan karakter, melainkan pada bagaimana menangani *case-sensitivity* dengan cara yang paling terstruktur, elegan, dan menjunjung tinggi prinsip *DRY (Don't Repeat Yourself)*.

---

## 🗺️ Algoritma Dasar (Pseudocode)

```text
START
  RECEIVE argumen `name`
  SANITIZE `name` dari whitespace di awal/akhir
  EXTRACT karakter pada index 0
  NORMALIZE karakter tersebut ke huruf kecil (lowercase)
  IF karakter == 'r' THEN
    RETURN interpolasi string: "{name} plays banjo"
  ELSE
    RETURN interpolasi string: "{name} does not play banjo"
  END IF
END
```

---

## 🔄 Iterasi Solusi: Fase 1 (Naif)

```javascript
// Iterasi #1 — Pendekatan Deklaratif Klasik
function areYouPlayingBanjo(name) {
  if (name.startsWith('R') || name.startsWith('r')) {
    return name + ' plays banjo';
  } else {
    return name + ' does not play banjo';
  }
}
```

**Evaluasi:** ✅ Fungsional.  
**Kritik:** Secara arsitektur, metode ini melakukan dua evaluasi diskrit. Jika kondisi menjadi lebih kompleks di masa depan, rantai logika `||` akan terus memanjang (pelanggaran prinsip OCP - Open/Closed Principle tingkat mikro).

---

## 🔄 Iterasi Solusi: Fase 2 (Refactoring Modular)

```javascript
// Iterasi #2 — Standardisasi Data & Operator Ternary
const areYouPlayingBanjo = (name) => {
  return name[0].toLowerCase() === 'r'
    ? `${name} plays banjo`
    : `${name} does not play banjo`;
};
```

**Evaluasi:** ✅ Elegan & Efisien.  
**Kritik:** Akses index `[0]` memiliki limitasi keamanan. Walaupun soal menjamin "valid strings", pada skenario string kosong `""`, `name[0]` akan menghasilkan `undefined`, yang mana pemanggilan `.toLowerCase()` padanya akan memicu `TypeError`.

---

## ✅ Solusi Final: Fase 3 (Robust & Ekspresif)

```javascript
// Solusi Final — Regular Expressions (Regex) Defensif
const areYouPlayingBanjo = (name) => {
  return /^r/i.test(name.trim())
    ? `${name} plays banjo`
    : `${name} does not play banjo`;
};
```

---

## 🔍 Analisis Komponen Kritis

1. **`name.trim()`**: *Defensive layer*. Mencegah kegagalan evaluasi jika input sistem memuat spasi tersembunyi (misal: `"  Ringo"`).
2. **`/^r/i`**: Mesin regex (state machine) tingkat rendah yang sangat teroptimasi di engine V8 JavaScript.
   - `^` : Anchor asertif. Evaluasi berhenti seketika setelah indeks 0, menghasilkan efisiensi *O(1)* mutlak.
   - `i` : Case-insensitive flag, mengeleminasi kebutuhan manipulasi `.toLowerCase()`.
3. **Template Literals (`` `${...}` ``)**: Menghindari alokasi memori berlebih dari konkatenasi operator `+` berantai, serta secara visual jauh lebih ekspresif.

---

## ⏱️ Kompleksitas Komputasi

- **Time Complexity:** $O(1)$ — Regex engine hanya mengevaluasi *state* awal string. Waktu eksekusi konstan tidak peduli seberapa panjang nama yang diberikan.
- **Space Complexity:** $O(1)$ — Memori yang dialokasikan bersifat konstan untuk merepresentasikan boolean dari eksekusi `.test()`.

---

## ⬅️ Kembali ke [01-soal.md](01-soal.md)
## ➡️ Lanjut ke [03-refleksi.md](03-refleksi.md)
