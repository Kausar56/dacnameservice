import { Calendar, CalendarClock, FileSignature, Hash, Ruler, Tag } from "lucide-react";

import { PanelCard, DetailRow } from "./panel";
import type { DomainDetails } from "@/components/search/mock-data";

export function InfoCard({ details }: { details: DomainDetails }) {
  return (
    <PanelCard title="Domain Information" icon={<Tag className="size-4" />}>
      <DetailRow
        icon={<Hash className="size-3.5" />}
        label="Domain Name"
        value={<span className="font-mono text-dac-cyan">{details.name}</span>}
      />
      <DetailRow
        icon={<Tag className="size-3.5" />}
        label="Category"
        value={details.category}
      />
      <DetailRow
        icon={<Ruler className="size-3.5" />}
        label="Length"
        value={`${details.length} characters`}
      />
      <DetailRow
        icon={<Calendar className="size-3.5" />}
        label="Registration Date"
        value={details.registeredAt ?? "—"}
      />
      <DetailRow
        icon={<CalendarClock className="size-3.5" />}
        label="Expiry Date"
        value={details.expiresAt ?? "—"}
      />
      <DetailRow
        icon={<FileSignature className="size-3.5" />}
        label="Registration Type"
        value={details.registrationType}
        last
      />
    </PanelCard>
  );
}
