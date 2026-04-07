import YouAreHere from './SnapshotHeader';
import Timeline from './Timeline';
import CostLedger from './CostLedger';
import Roles from './Roles';
import DocumentIndex from './DocumentIndex';
import CommonQuestions from './Notes';
import {
  buyerProfile,
  costItems,
  documents,
  roles,
  timelineStages,
  faqs,
} from './data';

const currentStageIndex = timelineStages.findIndex((s) => s.status === "current");
const currentStage = timelineStages[currentStageIndex];
const nextStage = timelineStages[currentStageIndex + 1];
const travelStage = timelineStages.find((s) => s.travelRequired);
const completedCount = timelineStages.filter((s) => s.status === "done").length;
const isTransferDone = timelineStages.find((s) => s.id === 7)?.status === "done";

export function BuyerControlPanel() {
  return (
    <div className="min-h-screen bg-fog-50 font-body text-ink-800">

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-fog-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div>
            <p className="font-display text-sm font-semibold text-ink-950">Mallika Boobna</p>
            <p className="text-xs text-ink-400">Partner & Director, MARRFA</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${buyerProfile.agentPhone}`}
              className="hidden text-xs text-ink-500 transition hover:text-ink-900 sm:block"
            >
              {buyerProfile.agentPhoneDisplay}
            </a>
            <a
              href={`mailto:${buyerProfile.agentEmail}`}
              className="rounded-full bg-ink-950 px-4 py-1.5 text-xs font-medium text-white transition hover:bg-ink-800"
            >
              Message Mallika
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-16 pt-10">

        {/* Hero */}
        <header>
          <p className="text-xs uppercase tracking-[0.4em] text-ink-400">Buyer control panel</p>
          <h1 className="mt-2 font-display text-3xl text-ink-950 sm:text-4xl">
            {buyerProfile.property}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-ink-600">
            <span className="stat-pill">Buyer: {buyerProfile.name}</span>
            <span className="stat-pill">Mortgage</span>
            <span className="stat-pill">Concierge: {buyerProfile.agent}</span>
          </div>
        </header>

        {/* You Are Here */}
        <YouAreHere
          currentStage={currentStage}
          nextStage={nextStage}
          travelStage={travelStage}
          completedCount={completedCount}
          totalCount={timelineStages.length}
        />

        {/* Journey timeline */}
        <Timeline stages={timelineStages} />

        {/* Money plan */}
        <CostLedger
          items={costItems}
          propertyPriceAED={buyerProfile.propertyPriceAED}
          downPaymentAED={buyerProfile.downPaymentAED}
          loanAmountAED={buyerProfile.loanAmountAED}
          currentStageId={currentStage.id}
        />

        {/* Key people */}
        <Roles items={roles} />

        {/* Document checklist */}
        <DocumentIndex items={documents} />

        {/* Common questions */}
        <CommonQuestions items={faqs} />

        {/* Post-transfer preview — locked until transfer is complete */}
        <section className={`section-card p-6 sm:p-8 ${isTransferDone ? "" : "opacity-50"}`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="section-title">After you own it</p>
              <h2 className="mt-2 font-display text-2xl text-ink-950">Post-transfer setup</h2>
              {!isTransferDone && (
                <p className="mt-1 text-sm text-ink-400">This section fills in once your transfer is complete.</p>
              )}
            </div>
            {!isTransferDone && (
              <span className="rounded-full bg-fog-100 px-3 py-1 text-xs text-ink-400">
                Locked
              </span>
            )}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Rental setup",
                body: "Short-term (monthly payouts, holiday home company manages everything) or long-term (yearly cheques, tenant covers costs). Mallika arranges both.",
              },
              {
                title: "Golden Visa",
                body: "Property ownership qualifies you for a UAE Golden Visa. Mallika assists with the application once you're in Dubai.",
              },
              {
                title: "Will preparation",
                body: "Highly recommended for foreign owners. Ensures your Dubai asset is protected and passed on correctly.",
              },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl bg-fog-50 p-5">
                <p className="text-base font-semibold text-ink-950">{card.title}</p>
                <p className="mt-2 text-sm text-ink-600">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-fog-200 pt-6 text-center text-xs text-ink-400">
          <p>
            Prepared by{" "}
            <a
              href={`https://${buyerProfile.agentWebsite}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-ink-800"
            >
              {buyerProfile.agentWebsite}
            </a>
            {" · "}
            Information is for guidance only and may be updated as your purchase progresses.
          </p>
        </footer>

      </main>
    </div>
  );
}
