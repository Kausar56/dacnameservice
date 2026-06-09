import { Container } from "@/components/ui/container";
import { Footer } from "@/components/home";
import { NetworkGuard } from "@/components/wallet";

import { ActivityHistory } from "./activity-history";
import { DashboardHeader } from "./dashboard-header";
import { ExpiringSoon } from "./expiring-soon";
import { MyDomains } from "./my-domains";
import { Notifications } from "./notifications";
import { ProfileSettings } from "./profile-settings";
import { QEPoints } from "./qe-points";
import { ResolverSettings } from "./resolver-settings";

export function Dashboard() {
  return (
    <>
      <DashboardHeader />

      <Container className="relative z-10 space-y-6 pb-16">
        {/* Wallet / network status */}
        <NetworkGuard
          mode="banner"
          connectTitle="Connect your wallet"
          connectDescription="Connect on DAC Inception Testnet to manage your domains and identity."
        />

        {/* Renewal notifications */}
        <Notifications />

        {/* QE points overview */}
        <QEPoints />

        {/* Domains + activity (main) and settings (side) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <MyDomains />
            <ExpiringSoon />
            <ActivityHistory />
          </div>

          <div className="space-y-6">
            <ResolverSettings />
            <ProfileSettings />
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}
