"use client";

import { motion } from "framer-motion";
import {
  Activity,
  CircleDot,
  Network,
  Repeat,
  Sparkles,
  UserCog,
  UserPlus,
} from "lucide-react";

import { PanelCard } from "./panel";
import type {
  ActivityEvent,
  ActivityType,
} from "@/components/search/mock-data";

const ICONS: Record<ActivityType, typeof CircleDot> = {
  registration: UserPlus,
  renewal: Repeat,
  resolver: Network,
  profile: UserCog,
  transfer: CircleDot,
  listing: Sparkles,
};

const COLORS: Record<ActivityType, string> = {
  registration: "text-dac-cyan",
  renewal: "text-dac-green",
  resolver: "text-dac-quantum",
  profile: "text-dac-cyan",
  transfer: "text-dac-premium",
  listing: "text-muted-foreground",
};

export function ActivityTimeline({ events }: { events: ActivityEvent[] }) {
  return (
    <PanelCard title="Activity" icon={<Activity className="size-4" />}>
      <ol className="relative space-y-1">
        {events.map((event, i) => {
          const Icon = ICONS[event.type];
          const isLast = i === events.length - 1;
          return (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {/* connector line */}
              {!isLast && (
                <span
                  className="absolute left-[15px] top-9 h-[calc(100%-1.5rem)] w-px bg-white/[0.08]"
                  aria-hidden
                />
              )}
              {/* node */}
              <span
                className={`relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.04] ${COLORS[event.type]}`}
              >
                <Icon className="size-4" />
              </span>
              {/* content */}
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {event.title}
                  </p>
                  <span className="text-caption shrink-0">{event.date}</span>
                </div>
                <p className="text-body-sm mt-0.5">{event.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </PanelCard>
  );
}
