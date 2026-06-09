import { Container } from "@/components/ui/container";
import { Footer } from "@/components/home";

import { ActivityTimeline } from "./activity-timeline";
import { DomainHero } from "./domain-hero";
import { InfoCard } from "./info-card";
import { OwnerCard } from "./owner-card";
import { QEReputationCard } from "./qe-reputation-card";
import { RelatedDomains } from "./related-domains";
import { ResolverCard } from "./resolver-card";
import type { DomainDetails as DomainDetailsType } from "@/components/search/mock-data";

export function DomainDetails({ details }: { details: DomainDetailsType }) {
  return (
    <>
      <DomainHero details={details} />

      <Container className="relative z-10 pb-16">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Main column */}
          <div className="space-y-5 lg:col-span-2">
            <InfoCard details={details} />
            <QEReputationCard details={details} />
            <ActivityTimeline events={details.activity} />
          </div>

          {/* Side column */}
          <div className="space-y-5">
            <div id="owner" className="scroll-mt-28">
              <OwnerCard details={details} />
            </div>
            <ResolverCard details={details} />
          </div>
        </div>
      </Container>

      <RelatedDomains domains={details.related} />

      <Footer />
    </>
  );
}
