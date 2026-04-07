// Approximate conversion: 1 AED ≈ SGD 0.35. For reference only, not financial advice.
export const AED_TO_SGD = 0.352;

export const buyerProfile = {
  name: "Priya Sharma",
  property: "1BR | Act One Act Two Towers, Downtown Dubai",
  propertyPriceAED: 2_350_000,
  downPaymentAED: 940_000,   // 40%
  loanAmountAED: 1_410_000,  // 60%
  agent: "Mallika Boobna",
  agentTitle: "Partner & Director, MARRFA",
  agentPhone: "+971505113629",
  agentPhoneDisplay: "+971 50 511 3629",
  agentEmail: "mallika@marrfadiscovery.com",
  agentWebsite: "mallikaindubai.com",
};

export type TimelineStage = {
  id: number;
  name: string;
  description: string;
  note?: string;
  weeksUntil?: number;
  status: "done" | "current" | "upcoming";
  travelRequired?: boolean;
};

export const timelineStages: TimelineStage[] = [
  {
    id: 1,
    name: "Mortgage Pre-Approval",
    description: "Bank assessed your financials and issued a pre-approval — locking your budget and interest rate range.",
    note: "Free and non-binding. Took 6–15 working days.",
    status: "done",
  },
  {
    id: 2,
    name: "Property Selection",
    description: "Shortlisted and selected the property after viewings within your approved budget.",
    status: "done",
  },
  {
    id: 3,
    name: "Offer & 10% Deposit Cheque",
    description: "Offer submitted to seller. A 10% AED deposit cheque was issued — held by the agency, not encashed.",
    note: "Cheque is returned at transfer. Only cashed if you back out after Form F.",
    status: "done",
  },
  {
    id: 4,
    name: "Form F — MoU Signed",
    description: "Memorandum of Understanding signed by both parties. All negotiated terms are locked. Bank valuation now begins.",
    status: "current",
    weeksUntil: 0,
  },
  {
    id: 5,
    name: "Bank Valuation",
    description: "Bank independently values the property. Loan is based on whichever is lower — agreed price or bank valuation.",
    note: "Valuation fee due at this stage (typically under AED 5,000).",
    status: "upcoming",
    weeksUntil: 1,
  },
  {
    id: 6,
    name: "Final Offer Letter — Sign in Dubai",
    description: "Bank issues the Final Offer Letter (FOL). You must sign this in person at the bank in Dubai.",
    note: "Plan for 1–2 working days in Dubai. FOL is typically ready 15–20 days after Form F.",
    status: "upcoming",
    weeksUntil: 3,
    travelRequired: true,
  },
  {
    id: 7,
    name: "Title Transfer",
    description: "Final settlement at the trustee office. Money exchanges hands and the property officially becomes yours.",
    note: "Manager's cheques required for down payment, DLD fee, and all closing costs.",
    status: "upcoming",
    weeksUntil: 5,
  },
  {
    id: 8,
    name: "Post-Transfer Setup",
    description: "Rental setup, Golden Visa application, and will preparation. Mallika assists throughout.",
    status: "upcoming",
    weeksUntil: 7,
  },
];

export type CostItem = {
  name: string;
  description: string;
  amountAED: number;
  paid: boolean;
  dueStage: string;
  dueStageId: number;
  isHeld?: boolean;
};

// Based on property price AED 2,350,000 | Loan AED 1,410,000
export const costItems: CostItem[] = [
  {
    name: "Bank Valuation Fee",
    description: "Paid to the bank once Form F is signed, before the Final Offer Letter is issued.",
    amountAED: 2_800,
    paid: false,
    dueStage: "Bank Valuation",
    dueStageId: 5,
  },
  {
    name: "Broker Commission",
    description: "2.1% of purchase price. Paid to the agency at transfer.",
    amountAED: 49_350,
    paid: false,
    dueStage: "Title Transfer",
    dueStageId: 7,
  },
  {
    name: "Dubai Land Department (DLD) Fee",
    description: "4% of property price. Mandatory government transfer fee.",
    amountAED: 94_000,
    paid: false,
    dueStage: "Title Transfer",
    dueStageId: 7,
  },
  {
    name: "Title Deed Fee",
    description: "Fixed government fee for issuance of the title deed.",
    amountAED: 580,
    paid: false,
    dueStage: "Title Transfer",
    dueStageId: 7,
  },
  {
    name: "Mortgage Registration Fee",
    description: "0.25% of loan amount. Paid to DLD at transfer.",
    amountAED: 3_525,
    paid: false,
    dueStage: "Title Transfer",
    dueStageId: 7,
  },
  {
    name: "Trustee Office Fee",
    description: "Fixed fee for the DLD-registered trustee who facilitates the transfer.",
    amountAED: 4_200,
    paid: false,
    dueStage: "Title Transfer",
    dueStageId: 7,
  },
];

// Held by agent — returned at transfer. Not a cost.
export const depositCheque = {
  amountAED: 235_000, // 10% of 2,350,000
  description: "10% security deposit. Held by the agency — returned at transfer or encashed only if you back out after signing Form F.",
};

export type RoleItem = {
  name: string;
  title: string;
  entersAt: string;
  summary: string;
  asksFor?: string;
  assigned: boolean;
  startStageId: number;
  phone?: string;
  email?: string;
  website?: string;
};

export const roles: RoleItem[] = [
  {
    name: "Mallika Boobna",
    title: "Partner & Director, MARRFA",
    entersAt: "Day one",
    summary: "Your primary guide through the entire process — from property selection to post-transfer rental and visa setup. Coordinates all parties on your behalf.",
    assigned: true,
    startStageId: 1,
    phone: "+971505113629",
    email: "mallika@marrfadiscovery.com",
    website: "mallikaindubai.com",
  },
  {
    name: "Mortgage Advisor",
    title: "UAE-licensed bank",
    entersAt: "Pre-Approval",
    summary: "Assessed your financials, issued pre-approval, and will disburse the final loan at transfer. Bank valuation is now underway.",
    asksFor: "Salary certificate, 6-month bank statements, passport, National ID, credit report.",
    assigned: true,
    startStageId: 1,
  },
  {
    name: "Conveyancing Company",
    title: "Optional — for overseas buyers",
    entersAt: "Offer stage",
    summary: "Assisted with the 10% AED deposit cheque since you're based in Singapore. Also handles legal coordination between parties.",
    asksFor: "Power of attorney or signed transaction authorisation.",
    assigned: true,
    startStageId: 3,
  },
  {
    name: "Trustee Office",
    title: "DLD-registered trustee",
    entersAt: "Title Transfer",
    summary: "Facilitates the final property transfer. Verifies all documents and cheques before ownership changes hands.",
    asksFor: "Manager's cheques, Emirates ID, signed MoU, Final Offer Letter.",
    assigned: false,
    startStageId: 7,
  },
];

export type DocumentItem = {
  name: string;
  status: "Submitted" | "Ready" | "Not ready";
  note?: string;
  link?: string;
  stage: string;
  stageId: number;
  requiredWindow: "done" | "now" | "later";
};

export const documents: DocumentItem[] = [
  {
    name: "Passport",
    status: "Submitted",
    stage: "Mortgage Pre-Approval",
    stageId: 1,
    requiredWindow: "done",
  },
  {
    name: "National ID",
    status: "Submitted",
    stage: "Mortgage Pre-Approval",
    stageId: 1,
    requiredWindow: "done",
  },
  {
    name: "Salary Certificate",
    status: "Submitted",
    stage: "Mortgage Pre-Approval",
    stageId: 1,
    requiredWindow: "done",
  },
  {
    name: "Bank Statements (6 months)",
    status: "Submitted",
    note: "Savings and current accounts.",
    stage: "Mortgage Pre-Approval",
    stageId: 1,
    requiredWindow: "done",
  },
  {
    name: "Credit Report",
    status: "Submitted",
    stage: "Mortgage Pre-Approval",
    stageId: 1,
    requiredWindow: "done",
  },
  {
    name: "Signed Form F (MoU)",
    status: "Ready",
    note: "Submit to the bank to trigger valuation.",
    stage: "Form F — MoU Signed",
    stageId: 4,
    requiredWindow: "now",
  },
  {
    name: "Manager's Cheque — Down Payment",
    status: "Not ready",
    note: "AED 940,000 (~SGD 331k). Arrange with your bank in advance of transfer.",
    stage: "Title Transfer",
    stageId: 7,
    requiredWindow: "later",
  },
  {
    name: "Manager's Cheque — DLD & Closing Fees",
    status: "Not ready",
    note: "~AED 152,455 (~SGD 54k). Covers DLD, broker, trustee, mortgage registration.",
    stage: "Title Transfer",
    stageId: 7,
    requiredWindow: "later",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "Do I need to be physically in Dubai?",
    answer: "Yes — once. You must be in Dubai to sign the Final Offer Letter (FOL) at the bank. Plan for 1–2 working days. Everything else — document submission, payments, coordination — can be handled remotely from Singapore.",
  },
  {
    question: "What happens to my 10% deposit cheque?",
    answer: "It's held by the agency — it is not encashed. It's only cashed if you back out after signing Form F. At transfer, the cheque is returned. Since you're Singapore-based, the conveyancing company issued it on your behalf.",
  },
  {
    question: "How long does the rest of the process take?",
    answer: "Bank valuation takes roughly 1–2 weeks after Form F. The Final Offer Letter is typically ready 15–20 days after Form F. Transfer usually follows 2–6 weeks after MoU. You're most likely 4–6 weeks from owning the property.",
  },
  {
    question: "What happens after I own the property?",
    answer: "You can rent it out — short-term (managed by a trusted holiday home company, monthly payouts) or long-term (one or two cheques per year, tenant covers most costs). Mallika also assists with your Golden Visa application once you're in Dubai, and recommends preparing a will.",
  },
];
