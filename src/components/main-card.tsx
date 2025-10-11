import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyConverter } from "./currency-converter";
import { RemittanceCalculator } from "./remittance-calculator";
import { SmartAdvisor } from "./smart-advisor";
import { RateAlerts } from "./rate-alerts";

export function MainCard() {
  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="converter" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 rounded-lg bg-muted p-1 sm:grid-cols-4">
          <TabsTrigger value="converter" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Converter
          </TabsTrigger>
          <TabsTrigger value="remittance" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Remittance
          </TabsTrigger>
           <TabsTrigger value="smart-advisor" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            AI Smart Advisor
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-background data-[state=active]:shadow-sm">
            Rate Alerts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="converter" className="mt-4">
          <CurrencyConverter />
        </TabsContent>
        <TabsContent value="remittance" className="mt-4">
          <RemittanceCalculator />
        </TabsContent>
        <TabsContent value="smart-advisor" className="mt-4">
          <SmartAdvisor />
        </TabsContent>
        <TabsContent value="alerts" className="mt-4">
          <RateAlerts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
