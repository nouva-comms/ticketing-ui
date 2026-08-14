export const IDENTITY_TYPE_OPTIONS = [
  { value: "ktp", label: "KTP" },
  { value: "sim", label: "SIM" },
  { value: "passport", label: "Paspor" },
];

// export const AGE_OPTIONS = Array.from({ length: 83 }, (_, i) => i + 3).map(
//   (age) => ({ value: String(age), label: `${age} Tahun` })
// );

export const AGE_OPTIONS = [
  { value: "6-12", label: "6 - 12 Tahun" },
  { value: "13-17", label: "13 - 17 Tahun" },
  { value: "18-25", label: "18 - 25 Tahun" },
  { value: "26-35", label: "26 - 35 Tahun" },
  { value: "36-45", label: "36 - 45 Tahun" },
  { value: "46-55", label: "46 - 55 Tahun" },
  { value: "56-65", label: "56 - 65 Tahun" },
  { value: "66+", label: "66 Tahun ke atas" },
];

export const SHIRT_SIZE_OPTIONS = [
  { value: "xs", label: "XS" },
  { value: "s", label: "S" },
  { value: "m", label: "M" },
  { value: "l", label: "L" },
  { value: "xl", label: "XL" },
  { value: "xxl", label: "XXL" }
];

export const GENDER_OPTIONS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
];
