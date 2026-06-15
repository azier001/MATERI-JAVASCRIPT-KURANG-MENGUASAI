# 📋 Semua Versi Solusi — Replace With Alphabet Position

### ✨ _Kompilasi lengkap seluruh versi kode dari awal hingga akhir, siap untuk copy-paste & perbandingan_

> 🎯 **Tujuan:** Mengumpulkan semua versi solusi yang dibahas selama sesi mentoring dalam satu halaman — mulai dari solusi pertama, evolusi deklaratif, optimasi Clean Code, hingga eksperimen mandiri yang penuh pelajaran.

---

<a name="daftar-isi"></a>

### 📑 Daftar Isi

| No | Bagian | Deskripsi |
|----|--------|-----------|
| 🔵 | [V1 — Imperatif](#v1-awal) | Solusi pertama dengan `for...of` |
| 🟢 | [V2 — Deklaratif](#v2-awal) | Evolusi ke Regex + `.map()` |
| 🔷 | [V1 Clean — Imperatif](#v1-clean) | V1 dengan naming Clean Code |
| 🟩 | [V2 Clean — Deklaratif](#v2-clean) | V2 dengan naming Clean Code |
| 🟡 | [V-Eksperimen — Trial & Error](#v-eksperimen) | Eksperimen mandiri + debugging |
| ⚖️ | [Perbandingan Head-to-Head](#perbandingan) | Tabel perbandingan semua versi |
| 💎 | [Rekomendasi](#rekomendasi) | Versi mana yang paling cocok & kapan |

---

<a name="v1-awal"></a>

## 🔵 V1 — Imperatif `for...of` (Naming Awal)

> **Sumber:** [01-solusi-bertahap.md](docs/01-solusi-bertahap.md) — Fase 2

```javascript
const alphabetPosition = (text) => {
  const formatted = text.toLowerCase();
  const result = [];

  for (const char of formatted) {
    if (char >= 'a' && char <= 'z') {
      const code = char.charCodeAt(0) - 96;
      result.push(code);
    }
  }

  return result.join(' ');
};
```

**Ciri khas:** Pendekatan step-by-step — `for...of` untuk iterasi, `if` guard untuk validasi, `push` + `join` untuk mengumpulkan hasil.

---

<a name="v2-awal"></a>

## 🟢 V2 — Deklaratif Regex + `.map()` (Naming Awal)

> **Sumber:** [02-evolusi-dan-clean-code.md](docs/02-evolusi-dan-clean-code.md) — Fase 3

```javascript
const alphabetPosition = (text) => {
  const matchedChars = text.toLowerCase().match(/[a-z]/g) || [];

  return matchedChars.map((char) => char.charCodeAt(0) - 96).join(' ');
};
```

**Ciri khas:** Method chaining `match` → `map` → `join`. Regex `/[a-z]/g` menggantikan loop + guard sekaligus. Fallback `|| []` untuk input tanpa huruf.

---

<a name="v1-clean"></a>

## 🔷 V1 Clean — Imperatif `for...of` (Clean Code)

> **Sumber:** [02-evolusi-dan-clean-code.md](docs/02-evolusi-dan-clean-code.md) — Fase 4

```javascript
const alphabetPosition = (text) => {
  const lowerCaseText = text.toLowerCase();
  const positions = [];

  for (const char of lowerCaseText) {
    if (char >= 'a' && char <= 'z') {
      const charPosition = char.charCodeAt(0) - 96;
      positions.push(charPosition);
    }
  }

  return positions.join(' ');
};
```

**Perubahan naming:**

| Sebelum | Sesudah | Alasan |
|:-------:|:-------:|--------|
| `formatted` | `lowerCaseText` | Eksplisit: teks yang sudah di-lowercase |
| `result` | `positions` | Spesifik: isinya posisi-posisi huruf |
| `code` | `charPosition` | Jelas: posisi absolut karakter |

---

<a name="v2-clean"></a>

## 🟩 V2 Clean — Deklaratif Regex + `.map()` (Clean Code)

> **Sumber:** [02-evolusi-dan-clean-code.md](docs/02-evolusi-dan-clean-code.md) — Fase 4

```javascript
const alphabetPosition = (text) => {
  const lettersOnly = text.toLowerCase().match(/[a-z]/g) || [];

  return lettersOnly.map((char) => char.charCodeAt(0) - 96).join(' ');
};
```

**Perubahan naming:**

| Sebelum | Sesudah | Alasan |
|:-------:|:-------:|--------|
| `matchedChars` | `lettersOnly` | Konteks seketika: array sudah dibersihkan dari non-huruf |

> [!TIP]
> 💡 **V2 Clean adalah versi yang paling direkomendasikan** — ringkas, ekspresif, dan self-documenting.

---

<a name="v-eksperimen"></a>

## 🟡 V-Eksperimen — Trial & Error Mandiri

> **Sumber:** [03-insight-trial-error.md](docs/03-insight-trial-error.md) — Insight

### ❌ Versi Buggy

```javascript
function alphabetPosition(text) {
  const formattedText = text.toLowerCase().replace(/\s+/g, '');
  let result = '';

  for (const char of formattedText) {
    if (char >= 'a' && char <= 'z') {
      result += char.charCodeAt(0) - 96;
    } else {
      result += ' ';
    }
  }

  return result;
}

// "The." → "2085 " ← Salah! (seharusnya "20 8 5")
```

**3 bug:** String penampung (angka menempel), blok `else` (tanda baca → spasi), pre-filter redundan.

### ✅ Versi Fixed

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

---

<a name="perbandingan"></a>

## ⚖️ Perbandingan Head-to-Head

| Aspek | V1 🔵 | V2 🟢 | V1 Clean 🔷 | V2 Clean 🟩 |
|-------|:------:|:------:|:-----------:|:-----------:|
| **Paradigma** | Imperatif | Deklaratif | Imperatif | Deklaratif |
| **Iterasi** | `for...of` | `.match()` + `.map()` | `for...of` | `.match()` + `.map()` |
| **Filter huruf** | `if` guard | Regex `/[a-z]/g` | `if` guard | Regex `/[a-z]/g` |
| **Penampung** | Array `[]` | Array (dari `match`) | Array `[]` | Array (dari `match`) |
| **Naming** | 🟡 Cukup | 🟡 Cukup | ✅ Clean Code | ✅ Clean Code |
| **Jumlah baris** | 10 | 4 | 10 | 4 |
| **Null-safe** | ✅ Natural | ✅ `\|\| []` | ✅ Natural | ✅ `\|\| []` |
| **Bisa `break`?** | ✅ Ya | ❌ Tidak | ✅ Ya | ❌ Tidak |

---

<a name="rekomendasi"></a>

## 💎 Rekomendasi — Kapan Pakai Versi Mana?

```
🏆 COPY-PASTE CEPAT (Best Practice)
   → V2 Clean — Paling ringkas, ekspresif, dan self-documenting

📚 BELAJAR FUNDAMENTAL
   → V1 Clean — Menunjukkan alur logika step-by-step yang mudah di-debug

🧪 BELAJAR DARI KESALAHAN
   → V-Eksperimen — Memahami kenapa Array > String untuk penampung data

🔧 BUTUH KONTROL LEBIH (break/continue)
   → V1 Clean — Mendukung flow control penuh di dalam loop
```

> [!TIP]
> 💡 **Prinsip Evolusi:** V1 → V2 bukan tentang "yang lama salah", tapi tentang menemukan pendekatan yang lebih cocok untuk masalah spesifik ini. Kedua paradigma (imperatif & deklaratif) punya tempatnya masing-masing.

---

[⬆️ Kembali ke README](README.md)
