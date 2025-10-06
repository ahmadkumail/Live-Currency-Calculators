import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyConverter } from "./currency-converter";
import { RemittanceCalculator } from "./remittance-calculator";
import { SmartAdvisor } from "./smart-advisor";

export function MainCard() {
  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="converter" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-lg bg-muted p-1">
          <TabsTrigger value="converter">
            Currency Converter
          </TabsTrigger>
          <TabsTrigger value="remittance">
            Remittance
          </TabsTrigger>
           <TabsTrigger value="smart-advisor">
            Smart Advisor
          </TabsTrigger>
          <TabsTrigger value="alerts">
            Rate Alerts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="converter" className="mt-6">
          <CurrencyConverter />
        </TabsContent>
        <TabsContent value="remittance" className="mt-6">
          <RemittanceCalculator />
        </TabsContent>
        <TabsContent value="smart-advisor" className="mt-6">
          <SmartAdvisor />
        </TabsContent>
        <TabsContent value="alerts" className="mt-6">
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
