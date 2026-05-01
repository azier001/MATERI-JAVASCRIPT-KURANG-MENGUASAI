/**
 * ⚔️ Codewars: Are You Playing Banjo? (8 kyu)
 * 
 * Mengevaluasi apakah seseorang bermain banjo berdasarkan huruf pertama nama mereka.
 * Jika nama dimulai dengan huruf 'R' atau 'r', maka mereka dianggap pemain banjo.
 * 
 * @param {string} name - Nama yang akan dievaluasi. Diasumsikan sebagai string yang valid.
 * @returns {string} String terformat yang menyatakan apakah orang tersebut bermain banjo.
 */

const areYouPlayingBanjo = (name) => {
  // Menggunakan Regular Expression (RegEx) untuk ringkas dan presisi.
  // ^r : Memastikan kecocokan di awal string dengan huruf 'r'.
  // i  : Modifier case-insensitive, memastikan 'R' dan 'r' keduanya cocok.
  // trim() diterapkan secara defensif untuk menangani spasi di awal/akhir yang tidak disengaja.
  return /^r/i.test(name.trim())
    ? `${name} plays banjo`
    : `${name} does not play banjo`;
};

// ==========================================
// 🧪 VERIFIKASI / TEST CASES
// ==========================================
console.log(areYouPlayingBanjo("Ringo"));    // Output: "Ringo plays banjo"
console.log(areYouPlayingBanjo("bravo"));    // Output: "bravo does not play banjo"
console.log(areYouPlayingBanjo("  Ricky"));  // Output: "  Ricky plays banjo" (Penanganan edge case)

