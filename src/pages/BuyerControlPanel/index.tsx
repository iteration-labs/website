import SnapshotHeader from './SnapshotHeader';
import Timeline from './Timeline';
import CostLedger from './CostLedger';
import Roles from './Roles';
import DocumentIndex from './DocumentIndex';
import Notes from './Notes';
import { buyerProfile, costLedger, documents, roles, timelineStages } from './data';

const currentStageIndex = timelineStages.findIndex((stage) => stage.status === "current");
const currentStage = timelineStages[currentStageIndex];
const nextStage = timelineStages[currentStageIndex + 1];
const completedCount = timelineStages.filter((stage) => stage.status === "done").length;
const remainingCount = timelineStages.length - completedCount;

const parseAED = (value?: string) => {
  if (!value) return 0;
  const normalized = value.replace(/,/g, "").toLowerCase();
  const number = Number(normalized.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(number)) return 0;
  if (normalized.includes("k")) return number * 1000;
  if (normalized.includes("m")) return number * 1_000_000;
  return number;
};

const readinessWindowWeeks = 4;
const readinessTotal = costLedger
  .filter((item) => item.dueInWeeks <= readinessWindowWeeks)
  .reduce((sum, item) => sum + parseAED(item.quotedAmount), 0);

const upcomingRoles = roles.filter(
  (role) => !role.assigned && role.startStageId <= currentStage.id + 2
);

const docsRequiredNext = documents
  .filter((doc) => doc.requiredWindow === "next")
  .map((doc) => doc.name);

const formatAED = (amount: number) => {
  if (amount >= 1_000_000) return `AED ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1000) return `AED ${(amount / 1000).toFixed(0)}k`;
  return `AED ${amount.toFixed(0)}`;
};

export function BuyerControlPanel() {
  return (
    <div className="min-h-screen bg-fog-50 font-body text-ink-800">
      <nav className="sticky top-0 z-50 border-b border-fog-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <a
            href="/"
            className="font-display text-sm font-semibold text-ink-800 transition-colors hover:text-ink-950"
          >
            ← Iteration Labs
          </a>
          <span className="rounded-full bg-reed-200 px-3 py-1 text-xs uppercase tracking-[0.3em] text-ink-600">
            Demo
          </span>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-16 pt-10">
        <header className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.4em] text-ink-400">Buyer control panel</p>
            <h1 className="font-display text-4xl text-ink-950 sm:text-5xl">
              {buyerProfile.property}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-ink-600">
              <span className="stat-pill">Buyer: {buyerProfile.name}</span>
              <span className="stat-pill">Target budget: {buyerProfile.budget}</span>
              <span className="stat-pill">Concierge: {buyerProfile.agent}</span>
            </div>
          </div>
          <SnapshotHeader
            currentStage={currentStage.name}
            completedCount={completedCount}
            remainingCount={remainingCount}
            nextStage={nextStage?.name ?? ""}
            nextStageSummary={nextStage?.description ?? ""}
            readinessSummary={`Have ~${formatAED(readinessTotal)} ready in the next ${readinessWindowWeeks} weeks`}
            upcomingRoles={upcomingRoles.map((role) => role.name)}
            documentsRequiredNext={docsRequiredNext}
          />
        </header>

        <Timeline stages={timelineStages} />
        <CostLedger items={costLedger} currentStage={currentStage.name} nextStage={nextStage?.name ?? ""} />
        <Roles items={roles} />
        <DocumentIndex items={documents} />
        <Notes />
      </main>
    </div>
  );
}
