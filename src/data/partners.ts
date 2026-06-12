export interface Partner {
  name: string;
  initials: string;
  website?: string;
}

export const partners: Partner[] = [
  { name: "Roche Diagnostics", initials: "RD" },
  { name: "Thermo Fisher", initials: "TF" },
  { name: "Illumina", initials: "IL" },
  { name: "Agilent", initials: "AG" },
  { name: "Bio-Rad", initials: "BR" },
  { name: "Siemens Healthineers", initials: "SH" },
  { name: "Beckman Coulter", initials: "BC" },
  { name: "Abbott", initials: "AB" },
  { name: "BD Biosciences", initials: "BD" },
  { name: "PerkinElmer", initials: "PE" },
  { name: "Qiagen", initials: "QG" },
  { name: "Merck Life Science", initials: "MK" },
  { name: "Eppendorf", initials: "EP", website: "https://www.eppendorf.com?utm_source=chatgpt.com" },
  { name: "Haier Biomedical", initials: "HB", website: "https://www.haiermedical.com?utm_source=chatgpt.com" },
];
