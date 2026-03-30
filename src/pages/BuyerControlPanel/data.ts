export type TimelineStage = {
  id: number;
  name: string;
  description: string;
  weeksUntil?: number;
  status: "done" | "current" | "upcoming";
};

export type CostItem = {
  name: string;
  expectedRange: string;
  quotedAmount?: string;
  paidAmount?: string;
  dueStage: string;
  dueInWeeks: number;
};

export type RoleItem = {
  name: string;
  entersAt: string;
  summary: string;
  asksFor: string;
  assigned: boolean;
  startStageId: number;
};

export type DocumentItem = {
  name: string;
  status: "Not ready" | "Ready" | "Shared";
  link?: string;
  stage: string;
  stageId: number;
  requiredWindow: "now" | "next" | "later";
};

export const buyerProfile = {
  name: "Sasha Al Noor",
  property: "2BR Marina View Apartment",
  budget: "AED 2.5M",
  agent: "Concierge Team"
};

export const timelineStages: TimelineStage[] = [
  { id: 1, name: "Intent Confirmed", description: "Budget and preferred areas captured.", status: "done" },
  { id: 2, name: "Shortlist Locked", description: "Top 3 options selected for offer review.", status: "done" },
  { id: 3, name: "Offer Made", description: "Initial offer submitted to seller.", status: "current", weeksUntil: 0 },
  { id: 4, name: "Offer Accepted", description: "Seller confirms terms and price.", status: "upcoming", weeksUntil: 1 },
  { id: 5, name: "MoU Signed", description: "Memorandum of Understanding executed.", status: "upcoming", weeksUntil: 2 },
  { id: 6, name: "Mortgage Initiated", description: "Bank paperwork and valuation start.", status: "upcoming", weeksUntil: 3 },
  { id: 7, name: "Mortgage Approved", description: "Final approval and offer letter issued.", status: "upcoming", weeksUntil: 5 },
  { id: 8, name: "Transfer Scheduled", description: "Transfer appointment locked with trustee.", status: "upcoming", weeksUntil: 6 },
  { id: 9, name: "Transfer Completed", description: "Ownership officially transferred.", status: "upcoming", weeksUntil: 8 },
  { id: 10, name: "Post-Transfer", description: "Utilities, visa, or rental setup.", status: "upcoming", weeksUntil: 9 }
];

export const costLedger: CostItem[] = [
  { name: "Booking deposit", expectedRange: "AED 50k - 100k", quotedAmount: "AED 75k", paidAmount: "AED 0", dueStage: "Offer Accepted", dueInWeeks: 1 },
  { name: "MoU signing fee", expectedRange: "AED 5k - 8k", quotedAmount: "AED 6.5k", paidAmount: "AED 0", dueStage: "MoU Signed", dueInWeeks: 2 },
  { name: "Mortgage valuation", expectedRange: "AED 2k - 3.5k", quotedAmount: "AED 2.8k", paidAmount: "AED 0", dueStage: "Mortgage Initiated", dueInWeeks: 3 },
  { name: "Dubai Land Department fee", expectedRange: "4% of purchase price", quotedAmount: "AED 100k", paidAmount: "AED 0", dueStage: "Transfer Scheduled", dueInWeeks: 6 },
  { name: "Trustee service", expectedRange: "AED 4k - 5k", quotedAmount: "AED 4.2k", paidAmount: "AED 0", dueStage: "Transfer Scheduled", dueInWeeks: 6 }
];

export const roles: RoleItem[] = [
  { name: "Mortgage advisor", entersAt: "Mortgage Initiated", summary: "Guides on bank options and required paperwork.", asksFor: "Salary certificate, bank statements, visa copy.", assigned: false, startStageId: 6 },
  { name: "Trustee office", entersAt: "Transfer Scheduled", summary: "Handles the formal property transfer.", asksFor: "Manager's cheque, Emirates ID, MoU.", assigned: false, startStageId: 8 },
  { name: "Conveyancing support", entersAt: "MoU Signed", summary: "Reviews paperwork and aligns parties.", asksFor: "Signed MoU, title deed copy.", assigned: true, startStageId: 5 }
];

export const documents: DocumentItem[] = [
  { name: "Passport copy", status: "Ready", link: "https://example.com/placeholder", stage: "Offer Made", stageId: 3, requiredWindow: "now" },
  { name: "Emirates ID", status: "Not ready", stage: "MoU Signed", stageId: 5, requiredWindow: "next" },
  { name: "Salary certificate", status: "Not ready", stage: "Mortgage Initiated", stageId: 6, requiredWindow: "next" },
  { name: "Signed MoU", status: "Not ready", stage: "MoU Signed", stageId: 5, requiredWindow: "next" },
  { name: "Manager's cheque", status: "Not ready", stage: "Transfer Scheduled", stageId: 8, requiredWindow: "later" }
];
