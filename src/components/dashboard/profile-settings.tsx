"use client";

import * as React from "react";
import { Check, Globe, MessageCircle, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "./avatar";
import { USER } from "./mock-dashboard";

/** X (Twitter) glyph — not available in lucide-react. */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

/** GitHub glyph — not available in lucide-react. */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.21 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.33-1.73-1.33-1.73-1.09-.73.08-.71.08-.71 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.49.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6.01 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.24 2.86.12 3.16.77.83 1.23 1.88 1.23 3.17 0 4.53-2.81 5.53-5.49 5.82.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z" />
    </svg>
  );
}

const SOCIALS = [
  { key: "x" as const, label: "X (Twitter)", icon: XIcon, prefix: "@" },
  { key: "github" as const, label: "GitHub", icon: GithubIcon, prefix: "@" },
  { key: "website" as const, label: "Website", icon: Globe, prefix: "" },
  { key: "discord" as const, label: "Discord", icon: MessageCircle, prefix: "" },
];

export function ProfileSettings() {
  const [bio, setBio] = React.useState(USER.bio);
  const [socials, setSocials] = React.useState(USER.socials);
  const [saved, setSaved] = React.useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="rounded-2xl glass p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] text-dac-cyan">
          <UserCog className="size-4" />
        </span>
        <h2 className="text-h4 text-foreground">Profile Settings</h2>
      </div>

      {/* Avatar */}
      <div className="mb-5 flex items-center gap-4">
        <Avatar
          initials={USER.initials}
          gradient={USER.avatarGradient}
          className="size-16"
          textClassName="text-2xl"
        />
        <div>
          <p className="text-sm font-medium text-foreground">Avatar</p>
          <p className="text-caption mt-0.5 mb-2">PNG or SVG, up to 2MB</p>
          <Button variant="glass" size="sm" className="rounded-lg">
            Upload new
          </Button>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-5">
        <label className="text-label mb-2 block text-foreground">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          maxLength={200}
          className="glass w-full resize-none rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
          placeholder="Tell the DAC community about yourself"
        />
        <p className="text-caption mt-1.5 text-right">{bio.length}/200</p>
      </div>

      {/* Social links */}
      <div className="space-y-3">
        <label className="text-label block text-foreground">Social links</label>
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <Input
              key={s.key}
              variant="glass"
              value={socials[s.key]}
              onChange={(e) =>
                setSocials((prev) => ({ ...prev, [s.key]: e.target.value }))
              }
              leftIcon={<Icon className="size-4" />}
              placeholder={s.label}
              className="rounded-xl"
            />
          );
        })}
      </div>

      <Button
        variant={saved ? "success" : "gradient"}
        className="mt-5 w-full rounded-xl"
        onClick={handleSave}
      >
        {saved ? (
          <>
            <Check className="size-4" />
            Saved
          </>
        ) : (
          "Save changes"
        )}
      </Button>
    </div>
  );
}
