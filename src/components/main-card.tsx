import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyConverter } from "./currency-converter";
import { RemittanceCalculator } from "./remittance-calculator";
import { SmartAdvisor } from "./smart-advisor";

export function MainCard() {
  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="converter" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-lg bg-gray-200/75 p-1">
          <TabsTrigger value="converter" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Currency Converter
          </TabsTrigger>
          <TabsTrigger value="remittance" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Remittance
          </TabsTrigger>
           <TabsTrigger value="smart-advisor" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Smart Advisor
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
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
          <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
            <p className="text-muted-foreground">
              Rate Alerts feature coming soon!
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
