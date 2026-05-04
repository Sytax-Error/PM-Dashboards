export interface ProjectRecord {
  id: number;
  ministry: string;
  projectNumber: string;
  piNumber: string;
  piDate: string;
  piAmount: number;
  amountReceived: number;
  receivedDate: string;
  poNumberWithDate: string;
  poAmount: number;
  agencyName: string;
  invoiceAmountReceived: number;
  invoiceAmountPaid: number;
  balanceAmount: number;
}

export interface ProjectDetail {
  srNo: number;
  projectNumber: string;
  customerName: string;
  projectType: string;
  budgetAmount: number;
  receivedAmount: number;
  noOfPOs: number;
  poAmount: number;
  noOfInvoiceReceived: number;
  noOfInvoiceBooked: number;
  invoiceAmount: number;
  amountPaid: number;
  noOfTaxInvoice: number;
  taxInvoiceAmount: number;
  ledgerBalance: number;
}

export const projectDetails: ProjectDetail[] = [
  { srNo: 1,  projectNumber: "S260066ZOUP", customerName: "Sanitation Mission",       projectType: "ZOHO E-mail Service",       budgetAmount: 282492,  receivedAmount: 282492,  noOfPOs: 1, poAmount: 269040,  noOfInvoiceReceived: 0,  noOfInvoiceBooked: 0,  invoiceAmount: 0,      amountPaid: 0,      noOfTaxInvoice: 0,  taxInvoiceAmount: 0,      ledgerBalance: 282492  },
  { srNo: 2,  projectNumber: "S241035ZOGJ", customerName: "Sciences, Rajkot",         projectType: "ZOHO E-mail Service",       budgetAmount: 3256092, receivedAmount: 3256092, noOfPOs: 2, poAmount: 3101040, noOfInvoiceReceived: 14, noOfInvoiceBooked: 10, invoiceAmount: 225975, amountPaid: 184074, noOfTaxInvoice: 10, taxInvoiceAmount: 245597, ledgerBalance: 3010530 },
  { srNo: 3,  projectNumber: "S250124ZOMD", customerName: "Health Department",        projectType: "Manpower",                  budgetAmount: 1850000, receivedAmount: 1850000, noOfPOs: 3, poAmount: 1720000, noOfInvoiceReceived: 8,  noOfInvoiceBooked: 6,  invoiceAmount: 145000, amountPaid: 120000, noOfTaxInvoice: 6,  taxInvoiceAmount: 158000, ledgerBalance: 1692000 },
  { srNo: 4,  projectNumber: "S260089ZOAH", customerName: "Education Board",          projectType: "Manpower",                  budgetAmount: 4500000, receivedAmount: 4500000, noOfPOs: 5, poAmount: 4200000, noOfInvoiceReceived: 22, noOfInvoiceBooked: 18, invoiceAmount: 380000, amountPaid: 310000, noOfTaxInvoice: 18, taxInvoiceAmount: 412000, ledgerBalance: 4088000 },
  { srNo: 5,  projectNumber: "S250234ZOSR", customerName: "Transport Corp",           projectType: "Manpower",                  budgetAmount: 2100000, receivedAmount: 2100000, noOfPOs: 2, poAmount: 1950000, noOfInvoiceReceived: 11, noOfInvoiceBooked: 9,  invoiceAmount: 175000, amountPaid: 145000, noOfTaxInvoice: 9,  taxInvoiceAmount: 189000, ledgerBalance: 1911000 },
  { srNo: 6,  projectNumber: "S260090ZOMI", customerName: "Smart City Mission",       projectType: "Miscellaneous",             budgetAmount: 5200000, receivedAmount: 5200000, noOfPOs: 4, poAmount: 4800000, noOfInvoiceReceived: 18, noOfInvoiceBooked: 15, invoiceAmount: 310000, amountPaid: 265000, noOfTaxInvoice: 15, taxInvoiceAmount: 335000, ledgerBalance: 4865000 },
  { srNo: 7,  projectNumber: "S241099ZOBS", customerName: "Defence Research Lab",     projectType: "BAS Services",              budgetAmount: 8600000, receivedAmount: 8600000, noOfPOs: 7, poAmount: 8000000, noOfInvoiceReceived: 32, noOfInvoiceBooked: 28, invoiceAmount: 640000, amountPaid: 520000, noOfTaxInvoice: 28, taxInvoiceAmount: 694000, ledgerBalance: 7960000 },
  { srNo: 8,  projectNumber: "S250456ZOBS", customerName: "Ports Authority",          projectType: "BAS Services",              budgetAmount: 3100000, receivedAmount: 3100000, noOfPOs: 3, poAmount: 2900000, noOfInvoiceReceived: 12, noOfInvoiceBooked: 10, invoiceAmount: 228000, amountPaid: 190000, noOfTaxInvoice: 10, taxInvoiceAmount: 247000, ledgerBalance: 2872000 },
  { srNo: 9,  projectNumber: "S260201ZODC", customerName: "NIC Data Centre",          projectType: "Data center",               budgetAmount: 6400000, receivedAmount: 6400000, noOfPOs: 5, poAmount: 6000000, noOfInvoiceReceived: 24, noOfInvoiceBooked: 20, invoiceAmount: 480000, amountPaid: 400000, noOfTaxInvoice: 20, taxInvoiceAmount: 520000, ledgerBalance: 5920000 },
  { srNo: 10, projectNumber: "S241302ZONW", customerName: "National Network Project", projectType: "Network",                   budgetAmount: 2800000, receivedAmount: 2800000, noOfPOs: 3, poAmount: 2600000, noOfInvoiceReceived: 10, noOfInvoiceBooked: 8,  invoiceAmount: 195000, amountPaid: 162000, noOfTaxInvoice: 8,  taxInvoiceAmount: 211000, ledgerBalance: 2605000 },
  { srNo: 11, projectNumber: "S260312ZOHW", customerName: "Customs Department",       projectType: "Hardware",                  budgetAmount: 1500000, receivedAmount: 1500000, noOfPOs: 2, poAmount: 1400000, noOfInvoiceReceived: 6,  noOfInvoiceBooked: 5,  invoiceAmount: 112000, amountPaid: 93000,  noOfTaxInvoice: 5,  taxInvoiceAmount: 121000, ledgerBalance: 1407000 },
  { srNo: 12, projectNumber: "S241405ZOSW", customerName: "UIDAI",                   projectType: "Software",                  budgetAmount: 3700000, receivedAmount: 3700000, noOfPOs: 4, poAmount: 3500000, noOfInvoiceReceived: 16, noOfInvoiceBooked: 12, invoiceAmount: 296000, amountPaid: 248000, noOfTaxInvoice: 12, taxInvoiceAmount: 320000, ledgerBalance: 3452000 },
  { srNo: 13, projectNumber: "S260502ZODS", customerName: "Ministry of Finance",      projectType: "Digital Signature",         budgetAmount: 950000,  receivedAmount: 950000,  noOfPOs: 1, poAmount: 890000,  noOfInvoiceReceived: 4,  noOfInvoiceBooked: 3,  invoiceAmount: 71000,  amountPaid: 59000,  noOfTaxInvoice: 3,  taxInvoiceAmount: 77000,  ledgerBalance: 879000  },
  { srNo: 14, projectNumber: "S241601ZOGE", customerName: "GST Council",              projectType: "General",                   budgetAmount: 4200000, receivedAmount: 4200000, noOfPOs: 4, poAmount: 3900000, noOfInvoiceReceived: 17, noOfInvoiceBooked: 14, invoiceAmount: 315000, amountPaid: 262000, noOfTaxInvoice: 14, taxInvoiceAmount: 341000, ledgerBalance: 3885000 },
  { srNo: 15, projectNumber: "S260701ZOWD", customerName: "MSME Ministry",            projectType: "Web Development",           budgetAmount: 1200000, receivedAmount: 1200000, noOfPOs: 2, poAmount: 1100000, noOfInvoiceReceived: 5,  noOfInvoiceBooked: 4,  invoiceAmount: 88000,  amountPaid: 74000,  noOfTaxInvoice: 4,  taxInvoiceAmount: 95000,  ledgerBalance: 1112000 },
  { srNo: 16, projectNumber: "S241801ZONG", customerName: "Meghraj Cloud Program",    projectType: "National Government Cloud", budgetAmount: 7800000, receivedAmount: 7800000, noOfPOs: 6, poAmount: 7200000, noOfInvoiceReceived: 28, noOfInvoiceBooked: 24, invoiceAmount: 576000, amountPaid: 480000, noOfTaxInvoice: 24, taxInvoiceAmount: 624000, ledgerBalance: 7224000 },
  { srNo: 17, projectNumber: "S260901ZOEP", customerName: "GeM Portal",               projectType: "E-Procurment",              budgetAmount: 2200000, receivedAmount: 2200000, noOfPOs: 2, poAmount: 2050000, noOfInvoiceReceived: 9,  noOfInvoiceBooked: 7,  invoiceAmount: 158000, amountPaid: 132000, noOfTaxInvoice: 7,  taxInvoiceAmount: 171000, ledgerBalance: 2042000 },
  { srNo: 18, projectNumber: "S241999ZOEL", customerName: "BSNL HQ",                 projectType: "E-Mail Services",           budgetAmount: 680000,  receivedAmount: 680000,  noOfPOs: 1, poAmount: 640000,  noOfInvoiceReceived: 3,  noOfInvoiceBooked: 2,  invoiceAmount: 51000,  amountPaid: 42000,  noOfTaxInvoice: 2,  taxInvoiceAmount: 55000,  ledgerBalance: 629000  },
  { srNo: 19, projectNumber: "S260101ZOSC", customerName: "DRDO Labs",                projectType: "Scaning&Digitzation",       budgetAmount: 1800000, receivedAmount: 1800000, noOfPOs: 2, poAmount: 1680000, noOfInvoiceReceived: 8,  noOfInvoiceBooked: 6,  invoiceAmount: 134000, amountPaid: 112000, noOfTaxInvoice: 6,  taxInvoiceAmount: 145000, ledgerBalance: 1666000 },
  { srNo: 20, projectNumber: "S241111ZOSP", customerName: "NIC Shastri Park",         projectType: "ShastriPdc",                budgetAmount: 450000,  receivedAmount: 450000,  noOfPOs: 1, poAmount: 420000,  noOfInvoiceReceived: 2,  noOfInvoiceBooked: 2,  invoiceAmount: 35000,  amountPaid: 29000,  noOfTaxInvoice: 2,  taxInvoiceAmount: 38000,  ledgerBalance: 415000  },
  { srNo: 21, projectNumber: "S260201ZORL", customerName: "Telecom Ministry",         projectType: "Rollout",                   budgetAmount: 900000,  receivedAmount: 900000,  noOfPOs: 1, poAmount: 840000,  noOfInvoiceReceived: 4,  noOfInvoiceBooked: 3,  invoiceAmount: 67000,  amountPaid: 56000,  noOfTaxInvoice: 3,  taxInvoiceAmount: 73000,  ledgerBalance: 833000  },
  { srNo: 22, projectNumber: "S241301ZOWS", customerName: "Rural Dev Board LN",       projectType: "Work St LN",                budgetAmount: 380000,  receivedAmount: 380000,  noOfPOs: 1, poAmount: 355000,  noOfInvoiceReceived: 2,  noOfInvoiceBooked: 1,  invoiceAmount: 28000,  amountPaid: 23000,  noOfTaxInvoice: 1,  taxInvoiceAmount: 30000,  ledgerBalance: 352000  },
  { srNo: 23, projectNumber: "S260401ZOWS", customerName: "Rural Dev Board SP",       projectType: "Work St SP",                budgetAmount: 2800000, receivedAmount: 2800000, noOfPOs: 2, poAmount: 2600000, noOfInvoiceReceived: 11, noOfInvoiceBooked: 9,  invoiceAmount: 196000, amountPaid: 164000, noOfTaxInvoice: 9,  taxInvoiceAmount: 212000, ledgerBalance: 2604000 },
  { srNo: 24, projectNumber: "S241502ZODV", customerName: "Income Tax Dept",          projectType: "Data Vault",                budgetAmount: 520000,  receivedAmount: 520000,  noOfPOs: 1, poAmount: 490000,  noOfInvoiceReceived: 2,  noOfInvoiceBooked: 2,  invoiceAmount: 39000,  amountPaid: 32000,  noOfTaxInvoice: 2,  taxInvoiceAmount: 42000,  ledgerBalance: 481000  },
];

// Customer pool used to generate dynamic project records when a project type is clicked
const _customerPool = [
  "Sanitation Mission","Sciences, Rajkot","Health Department","Education Board","Transport Corp",
  "Smart City Mission","Defence Research Lab","Ports Authority","NIC Data Centre","National Network Project",
  "Customs Department","UIDAI","Ministry of Finance","GST Council","MSME Ministry",
  "Meghraj Cloud Program","GeM Portal","BSNL HQ","DRDO Labs","NIC Shastri Park",
  "Telecom Ministry","Rural Dev Board LN","Rural Dev Board SP","Income Tax Dept","Department of Posts",
  "Border Roads Org","Indian Railways","ESIC","EPFO","CBDT","CBIC","Election Commission",
  "Election Commission HQ","Power Grid Corp","Coal India","NHAI","SAIL","NTPC","ISRO Bengaluru",
  "AAI Mumbai","RBI Mumbai","SEBI HQ","DGCA","Bharat Petroleum","HPCL","ONGC","IOCL","NPCI","RailTel",
];

function _seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

/**
 * Generate exactly `count` project records for a given project type.
 * Output is deterministic (seeded), so the same projectType always produces
 * the same project numbers/values across re-renders.
 */
export function generateProjectsForType(projectType: string, count: number): ProjectDetail[] {
  if (count <= 0) return [];

  // Use the existing hand-crafted records if any match — keep them at the top
  const existing = projectDetails.filter((p) => p.projectType === projectType);
  if (existing.length >= count) return existing.slice(0, count);

  // Build a numeric seed from the projectType string so output is stable per type
  let seed = 0;
  for (let i = 0; i < projectType.length; i++) seed = (seed * 31 + projectType.charCodeAt(i)) >>> 0;
  const rand = _seededRandom(seed || 1);

  // Short code from project type to use in project numbers (e.g. "ZOHO E-mail Service" -> "ZE")
  const code = projectType
    .replace(/[^A-Za-z]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase())
    .join("")
    .slice(0, 3) || "PR";

  const result: ProjectDetail[] = [...existing];
  for (let i = result.length + 1; i <= count; i++) {
    const noOfPOs              = 1 + Math.floor(rand() * 8);
    const poAmount             = Math.round(150000 + rand() * 5000000);
    const budgetAmount         = Math.round(poAmount * (1 + rand() * 0.3));
    const receivedAmount       = budgetAmount;
    const noOfInvoiceReceived  = Math.floor(rand() * 30);
    const noOfInvoiceBooked    = Math.max(0, noOfInvoiceReceived - Math.floor(rand() * 5));
    const invoiceAmount        = Math.round(rand() * 600000);
    const amountPaid           = Math.round(invoiceAmount * (0.5 + rand() * 0.5));
    const noOfTaxInvoice       = noOfInvoiceBooked;
    const taxInvoiceAmount     = Math.round(invoiceAmount * (1 + rand() * 0.1));
    const ledgerBalance        = budgetAmount - amountPaid;

    const customer = _customerPool[Math.floor(rand() * _customerPool.length)];
    const numStub  = String(100000 + Math.floor(rand() * 899999));

    result.push({
      srNo: i,
      projectNumber: `S${numStub}${code}`,
      customerName: customer,
      projectType,
      budgetAmount,
      receivedAmount,
      noOfPOs,
      poAmount,
      noOfInvoiceReceived,
      noOfInvoiceBooked,
      invoiceAmount,
      amountPaid,
      noOfTaxInvoice,
      taxInvoiceAmount,
      ledgerBalance,
    });
  }
  return result;
}

// Detail data for each clickable field
// PO/WO Details - matches the green table structure
export interface PODetail {
  srNo: number;
  projectNumber: string;
  vendorName: string;
  poWoNumber: string;
  poDate: string;
  startDate: string;
  endDate: string;
  totalPoAmount: number;
}

// Invoice Received at Billdesk - matches the second table structure
export interface InvoiceReceivedDetail {
  srNo: number;
  projectNumber: string;
  poWoNumber: string;
  vendorName: string;
  invoiceNumber: string;
  invoiceDate: string;
  receivedDate: string;
  invoiceAmount: number;
  bookAmount: number;
  amountPaid: number;
  objectionDetails: string;
  invoiceStatus: "Pending With Payment" | "Payment Done" | "Pending With Provision";
}

// Invoice Booked Details - matches the third table structure
export interface InvoiceBookedDetail {
  srNo: number;
  projectNumber: string;
  vendorName: string;
  poNumber: string;
  invoiceRefNumber: string;
  invoiceDate: string;
  glDate: string;
  amount: number;
  amountPaid: number;
  t: number;
  unt: number;
  objectionRemaks: string;
}

// Tax Invoice Details - matches the fourth table structure
export interface TaxInvoiceDetail {
  srNo: number;
  projectNumber: string;
  poWoNumber: string;
  ammendPoNumber: string;
  taxInvoiceNumber: string;
  billDate: string;
  status: string;
  billingPeriodFrom: string;
  billingPeriodTo: string;
  billStatus: string;
  expInvoiceNumber: string;
  taxInvoiceAmount: number;
}

const projectNums = ["S241035ZOGJ","S260066ZOUP","S250124ZOMD","S260089ZOAH","S250234ZOSR","S260090ZOMI","S241099ZOBS","S250456ZOBS","S260201ZODC","S241302ZONW"];
const vendors = ["ZOHO CORPORATION PRIVATE LIMITED","TATA CONSULTANCY SERVICES","INFOSYS LIMITED","HCL TECHNOLOGIES","WIPRO LIMITED","TECH MAHINDRA"];

function generatePOs(): PODetail[] {
  const base: PODetail[] = [
    { srNo: 1, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poWoNumber: "O2500794", poDate: "21-Jul-25", startDate: "15-Jul-25", endDate: "14-Jul-30", totalPoAmount: 1805400 },
    { srNo: 2, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poWoNumber: "O2400800", poDate: "4-Oct-24", startDate: "1-Oct-24", endDate: "30-Sep-29", totalPoAmount: 1295640 },
  ];
  for (let i = 3; i <= 30; i++) {
    base.push({
      srNo: i,
      projectNumber: projectNums[(i - 1) % projectNums.length],
      vendorName: vendors[(i - 1) % vendors.length],
      poWoNumber: `O${2400000 + i * 17}`,
      poDate: `${(i % 28) + 1}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i % 12]}-25`,
      startDate: `${(i % 28) + 1}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i % 12]}-25`,
      endDate: `${(i % 28) + 1}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i % 12]}-30`,
      totalPoAmount: Math.round(500000 + Math.random() * 2500000),
    });
  }
  return base;
}

export const poDetails: PODetail[] = generatePOs();

export const invoiceReceivedDetails: InvoiceReceivedDetail[] = [
  { srNo: 1, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805524250027", invoiceDate: "22-Jan-25", receivedDate: "3-Feb-25", invoiceAmount: 43371, bookAmount: 41901, amountPaid: 0, objectionDetails: "-", invoiceStatus: "Pending With Payment" },
  { srNo: 2, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805524250041", invoiceDate: "27-Feb-25", receivedDate: "10-Mar-25", invoiceAmount: 20886, bookAmount: 20178, amountPaid: 20178, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 3, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805524250060", invoiceDate: "###", receivedDate: "24-Mar-25", invoiceAmount: 20886, bookAmount: 20178, amountPaid: 20178, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 4, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260022", invoiceDate: "15-Apr-25", receivedDate: "2-May-25", invoiceAmount: 20966, bookAmount: 20256, amountPaid: 20256, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 5, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260099", invoiceDate: "30-Jun-25", receivedDate: "5-Dec-25", invoiceAmount: 21240, bookAmount: 20520, amountPaid: 20520, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 6, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260033", invoiceDate: "30-Jun-25", receivedDate: "5-Dec-25", invoiceAmount: 21240, bookAmount: 20520, amountPaid: 20520, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 7, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260196", invoiceDate: "19-Jul-25", receivedDate: "5-Dec-25", invoiceAmount: 21240, bookAmount: 20520, amountPaid: 20520, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 8, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260485", invoiceDate: "29-Sep-25", receivedDate: "9-Dec-25", invoiceAmount: 21240, bookAmount: 20520, amountPaid: 20520, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 9, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260329", invoiceDate: "30-Aug-25", receivedDate: "9-Dec-25", invoiceAmount: 21240, bookAmount: 20520, amountPaid: 20520, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 10, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260674", invoiceDate: "30-Oct-25", receivedDate: "9-Dec-25", invoiceAmount: 21594, bookAmount: 20862, amountPaid: 20862, objectionDetails: "-", invoiceStatus: "Payment Done" },
  { srNo: 11, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525260884", invoiceDate: "###", receivedDate: "13-Feb-26", invoiceAmount: 21594, bookAmount: 0, amountPaid: 0, objectionDetails: "-", invoiceStatus: "Pending With Provision" },
  { srNo: 12, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525261094", invoiceDate: "28-Dec-25", receivedDate: "13-Feb-26", invoiceAmount: 21594, bookAmount: 0, amountPaid: 0, objectionDetails: "-", invoiceStatus: "Pending With Provision" },
  { srNo: 13, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525261334", invoiceDate: "9-Jan-26", receivedDate: "13-Feb-26", invoiceAmount: 21594, bookAmount: 0, amountPaid: 0, objectionDetails: "-", invoiceStatus: "Pending With Provision" },
  { srNo: 14, projectNumber: "S241035ZOGJ", poWoNumber: "O2500794", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", invoiceNumber: "805525261504", invoiceDate: "9-Jan-26", receivedDate: "18-Feb-26", invoiceAmount: 1249, bookAmount: 0, amountPaid: 0, objectionDetails: "-", invoiceStatus: "Pending With Provision" },
  ...(() => {
    const extra: InvoiceReceivedDetail[] = [];
    const statuses: ("Payment Done" | "Pending With Payment" | "Pending With Provision")[] = ["Payment Done", "Payment Done", "Payment Done", "Pending With Payment", "Pending With Provision"];
    for (let i = 15; i <= 40; i++) {
      const amt = Math.round(15000 + Math.random() * 30000);
      const paid = statuses[(i - 1) % 5] === "Payment Done" ? amt : 0;
      extra.push({ srNo: i, projectNumber: projectNums[(i - 1) % projectNums.length], poWoNumber: `O${2400000 + i * 13}`, vendorName: vendors[(i - 1) % vendors.length], invoiceNumber: `8055${25260000 + i}`, invoiceDate: `${(i % 28) + 1}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i % 12]}-25`, receivedDate: `${(i % 28) + 5}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i % 12]}-25`, invoiceAmount: amt, bookAmount: paid > 0 ? Math.round(amt * 0.97) : 0, amountPaid: paid, objectionDetails: "-", invoiceStatus: statuses[(i - 1) % 5] });
    }
    return extra;
  })(),
];

export const invoiceBookedDetails: InvoiceBookedDetail[] = [
  { srNo: 1, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260329", invoiceDate: "30-Aug-25", glDate: "29-Jan-26", amount: 20520, amountPaid: 20520, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 2, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260033", invoiceDate: "30-Jun-25", glDate: "29-Jan-26", amount: 20520, amountPaid: 20520, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 3, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260196", invoiceDate: "19-Jul-25", glDate: "29-Jan-26", amount: 20520, amountPaid: 20520, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 4, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260485", invoiceDate: "29-Sep-25", glDate: "29-Jan-26", amount: 20520, amountPaid: 20520, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 5, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260099", invoiceDate: "30-Jun-25", glDate: "29-Jan-26", amount: 20520, amountPaid: 20520, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 6, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260674", invoiceDate: "30-Oct-25", glDate: "29-Jan-26", amount: 20862, amountPaid: 20862, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 7, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805525260022", invoiceDate: "15-Apr-25", glDate: "6-May-25", amount: 20256, amountPaid: 20256, t: 0, unt: 0, objectionRemaks: "" },
  { srNo: 8, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805524250027", invoiceDate: "22-Jan-25", glDate: "31-Mar-25", amount: 41901, amountPaid: 0, t: 0, unt: 41901, objectionRemaks: "" },
  { srNo: 9, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805524250041", invoiceDate: "27-Feb-25", glDate: "25-Mar-25", amount: 20178, amountPaid: 20178, t: 0, unt: 42, objectionRemaks: "" },
  { srNo: 10, projectNumber: "S241035ZOGJ", vendorName: "ZOHO CORPORATION PRIVATE LIMITED", poNumber: "O2400800", invoiceRefNumber: "805524250060", invoiceDate: "17-Mar-25", glDate: "25-Mar-25", amount: 20178, amountPaid: 20178, t: 0, unt: 0, objectionRemaks: "" },
  ...(() => {
    const extra: InvoiceBookedDetail[] = [];
    for (let i = 11; i <= 35; i++) {
      const amt = Math.round(15000 + Math.random() * 30000);
      const paid = i % 4 === 0 ? 0 : amt;
      extra.push({ srNo: i, projectNumber: projectNums[(i - 1) % projectNums.length], vendorName: vendors[(i - 1) % vendors.length], poNumber: `O${2400000 + i * 13}`, invoiceRefNumber: `8055${25260000 + i * 7}`, invoiceDate: `${(i % 28) + 1}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i % 12]}-25`, glDate: `${(i % 28) + 3}-${["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][(i + 1) % 12]}-26`, amount: amt, amountPaid: paid, t: 0, unt: paid === 0 ? amt : 0, objectionRemaks: "" });
    }
    return extra;
  })(),
];

export const taxInvoiceDetails: TaxInvoiceDetail[] = [
  { srNo: 1, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "MAR/24-25/HS/429", billDate: "26-Mar-25", status: "FINAL", billingPeriodFrom: "", billingPeriodTo: "", billStatus: "Success", expInvoiceNumber: "805524250060", taxInvoiceAmount: 21930 },
  { srNo: 2, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "MAR/24-25/HS/452", billDate: "26-Mar-25", status: "FINAL", billingPeriodFrom: "", billingPeriodTo: "", billStatus: "Success", expInvoiceNumber: "805524250041", taxInvoiceAmount: 21930 },
  { srNo: 3, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "MAR/24-25/HS/613", billDate: "31-Mar-25", status: "FINAL", billingPeriodFrom: "", billingPeriodTo: "", billStatus: "Success", expInvoiceNumber: "805524250027", taxInvoiceAmount: 45539 },
  { srNo: 4, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "MAY/25-26/HS/39", billDate: "7-May-25", status: "FINAL", billingPeriodFrom: "", billingPeriodTo: "", billStatus: "Success", expInvoiceNumber: "805525260022", taxInvoiceAmount: 22014 },
  { srNo: 5, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "FEB/SC/2526/76", billDate: "2-Feb-26", status: "FINAL", billingPeriodFrom: "Apr-25", billingPeriodTo: "Apr-25", billStatus: "Success", expInvoiceNumber: "805525260033", taxInvoiceAmount: 22302 },
  { srNo: 6, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "FEB/SC/2526/92", billDate: "2-Feb-26", status: "FINAL", billingPeriodFrom: "Jun-25", billingPeriodTo: "Jun-25", billStatus: "Success", expInvoiceNumber: "805525260196", taxInvoiceAmount: 22302 },
  { srNo: 7, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "FEB/SC/2526/113", billDate: "2-Feb-26", status: "FINAL", billingPeriodFrom: "Sep-25", billingPeriodTo: "Sep-25", billStatus: "Success", expInvoiceNumber: "805525260674", taxInvoiceAmount: 22674 },
  { srNo: 8, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "FEB/SC/2526/108", billDate: "2-Feb-26", status: "FINAL", billingPeriodFrom: "Aug-25", billingPeriodTo: "Aug-25", billStatus: "Success", expInvoiceNumber: "805525260485", taxInvoiceAmount: 22302 },
  { srNo: 9, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "FEB/SC/2526/103", billDate: "2-Feb-26", status: "FINAL", billingPeriodFrom: "Jun-25", billingPeriodTo: "Jun-25", billStatus: "Success", expInvoiceNumber: "805525260329", taxInvoiceAmount: 22302 },
  { srNo: 10, projectNumber: "S241035ZOGJ", poWoNumber: "O2400800", ammendPoNumber: "", taxInvoiceNumber: "FEB/SC/2526/85", billDate: "2-Feb-26", status: "FINAL", billingPeriodFrom: "May-25", billingPeriodTo: "May-25", billStatus: "Success", expInvoiceNumber: "805525260099", taxInvoiceAmount: 22302 },
  ...(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const extra: TaxInvoiceDetail[] = [];
    for (let i = 11; i <= 35; i++) {
      const m = months[i % 12];
      extra.push({ srNo: i, projectNumber: projectNums[(i - 1) % projectNums.length], poWoNumber: `O${2400000 + i * 13}`, ammendPoNumber: "", taxInvoiceNumber: `${m.toUpperCase()}/SC/2526/${i * 3}`, billDate: `${(i % 28) + 1}-${m}-26`, status: "FINAL", billingPeriodFrom: `${m}-25`, billingPeriodTo: `${m}-25`, billStatus: "Success", expInvoiceNumber: `8055${25260000 + i * 7}`, taxInvoiceAmount: Math.round(18000 + Math.random() * 30000) });
    }
    return extra;
  })(),
];

export const ministries = [
  "Ministry of Defence",
  "Ministry of Home Affairs",
  "Ministry of Finance",
  "Ministry of Health",
  "Ministry of Education",
  "Ministry of Railways",
  "Ministry of IT",
  "Department of Science",
  "Ministry of Agriculture",
  "Ministry of Commerce",
];

export const agencies = [
  "BEL",
  "HAL",
  "DRDO",
  "ISRO",
  "BHEL",
  "ECIL",
  "TCS",
  "Infosys",
  "Wipro",
  "L&T Defence",
  "Mahindra Defence",
  "Godrej Aerospace",
];

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split("T")[0];
}

export interface ManagerEntry {
  managerName: string;
  email: string;
  department: string;
  projects: { type: string; count: number; highlight?: boolean }[];
}

export const managerProjectsData: ManagerEntry[] = [
  {
    managerName: "Atul Rastogi",
    email: "atul.rastogi@nicsi.gov.in",
    department: "Infrastructure & Services",
    projects: [
      { type: "BAS Services", count: 186 },
      { type: "Data center", count: 65 },
      { type: "Digital Signature", count: 1 },
      { type: "Data Vault", count: 2 },
      { type: "E-Mail Services", count: 3 },
      { type: "E-Procurment", count: 1 },
      { type: "General", count: 188 },
      { type: "Hardware", count: 31 },
      { type: "Miscellaneous", count: 824 },
      { type: "Manpower", count: 248 },
      { type: "National Government Cloud", count: 1 },
      { type: "Network", count: 14 },
      { type: "Rollout", count: 4 },
      { type: "Scaning&Digitzation", count: 13 },
      { type: "ShastriPdc", count: 2 },
      { type: "Software", count: 2 },
      { type: "Web Development", count: 11 },
      { type: "Work St LN", count: 2 },
      { type: "Work St SP", count: 14 },
      { type: "ZOHO E-mail Service", count: 575, highlight: true },
    ],
  },
  {
    managerName: "Priya Sharma",
    email: "priya.sharma@nicsi.gov.in",
    department: "Software & Digital",
    projects: [
      { type: "Digital Signature", count: 45 },
      { type: "Data Vault", count: 12 },
      { type: "Hardware", count: 89 },
      { type: "Software", count: 156 },
      { type: "Network", count: 34 },
      { type: "General", count: 112 },
      { type: "Manpower", count: 45 },
      { type: "Web Development", count: 28 },
    ],
  },
  {
    managerName: "Rajesh Verma",
    email: "rajesh.verma@nicsi.gov.in",
    department: "Network & Security",
    projects: [
      { type: "Network", count: 98 },
      { type: "Hardware", count: 54 },
      { type: "Security Services", count: 67 },
      { type: "Data center", count: 23 },
      { type: "ShastriPdc", count: 8 },
      { type: "Rollout", count: 19 },
      { type: "General", count: 76 },
    ],
  },
  {
    managerName: "Sunita Mehta",
    email: "sunita.mehta@nicsi.gov.in",
    department: "Cloud & Analytics",
    projects: [
      { type: "National Government Cloud", count: 42 },
      { type: "Data Vault", count: 31 },
      { type: "Analytics Platform", count: 18 },
      { type: "BAS Services", count: 56 },
      { type: "E-Mail Services", count: 22 },
      { type: "General", count: 44 },
      { type: "Manpower", count: 15 },
    ],
  },
];

// Registered user accounts — used by AuthContext
export const userAccounts = [
  {
    email: "admin@nicsi.gov.in",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    managerName: null,
  },
  {
    email: "atul.rastogi@nicsi.gov.in",
    password: "atul123",
    name: "Atul Rastogi",
    role: "user" as const,
    managerName: "Atul Rastogi",
  },
  {
    email: "priya.sharma@nicsi.gov.in",
    password: "priya123",
    name: "Priya Sharma",
    role: "user" as const,
    managerName: "Priya Sharma",
  },
  {
    email: "rajesh.verma@nicsi.gov.in",
    password: "rajesh123",
    name: "Rajesh Verma",
    role: "user" as const,
    managerName: "Rajesh Verma",
  },
  {
    email: "sunita.mehta@nicsi.gov.in",
    password: "sunita123",
    name: "Sunita Mehta",
    role: "user" as const,
    managerName: "Sunita Mehta",
  },
];

function generateRecords(): ProjectRecord[] {
  const records: ProjectRecord[] = [];
  for (let i = 1; i <= 50; i++) {
    const piAmount = Math.round((Math.random() * 90 + 10) * 100000);
    const amountReceived = Math.round(piAmount * (0.4 + Math.random() * 0.6));
    const invoicePaid = Math.round(amountReceived * (0.3 + Math.random() * 0.5));
    const invoiceReceived = Math.round(invoicePaid + piAmount * Math.random() * 0.2);
    const poDate = randomDate(new Date(2023, 0, 1), new Date(2025, 6, 1));

    records.push({
      id: i,
      ministry: ministries[Math.floor(Math.random() * ministries.length)],
      projectNumber: `PRJ-${String(2024000 + i).slice(-6)}`,
      piNumber: `PI-${String(1000 + i)}`,
      piDate: randomDate(new Date(2022, 0, 1), new Date(2024, 11, 31)),
      piAmount,
      amountReceived,
      receivedDate: randomDate(new Date(2023, 0, 1), new Date(2025, 5, 30)),
      poNumberWithDate: `PO-${String(5000 + i)} / ${poDate}`,
      poAmount: Math.round(piAmount * (0.8 + Math.random() * 0.3)),
      agencyName: agencies[Math.floor(Math.random() * agencies.length)],
      invoiceAmountReceived: invoiceReceived,
      invoiceAmountPaid: invoicePaid,
      balanceAmount: piAmount - amountReceived,
    });
  }
  return records;
}

export const projectRecords: ProjectRecord[] = generateRecords();

export interface DashboardStats {
  totalProjects: number;
  totalPIAmount: number;
  totalReceived: number;
  totalBalance: number;
  totalInvoicePaid: number;
  ministryBreakdown: { name: string; amount: number; projects: number }[];
  monthlyTrend: { month: string; received: number; paid: number }[];
}

export function getDashboardStats(): DashboardStats {
  const totalProjects = projectRecords.length;
  const totalPIAmount = projectRecords.reduce((s, r) => s + r.piAmount, 0);
  const totalReceived = projectRecords.reduce((s, r) => s + r.amountReceived, 0);
  const totalBalance = projectRecords.reduce((s, r) => s + r.balanceAmount, 0);
  const totalInvoicePaid = projectRecords.reduce((s, r) => s + r.invoiceAmountPaid, 0);

  const ministryMap = new Map<string, { amount: number; projects: number }>();
  projectRecords.forEach((r) => {
    const existing = ministryMap.get(r.ministry) || { amount: 0, projects: 0 };
    existing.amount += r.piAmount;
    existing.projects += 1;
    ministryMap.set(r.ministry, existing);
  });

  const ministryBreakdown = Array.from(ministryMap.entries()).map(([name, data]) => ({
    name: name.replace("Ministry of ", "").replace("Department of ", ""),
    amount: data.amount,
    projects: data.projects,
  }));

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTrend = months.map((month) => ({
    month,
    received: Math.round((Math.random() * 50 + 20) * 100000),
    paid: Math.round((Math.random() * 30 + 10) * 100000),
  }));

  return { totalProjects, totalPIAmount, totalReceived, totalBalance, totalInvoicePaid, ministryBreakdown, monthlyTrend };
}
