import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyConverter } from "./currency-converter";
import { RemittanceCalculator } from "./remittance-calculator";

export function MainCard() {
  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="converter" className="w-full">
        <TabsList className="grid w-full grid-cols-3 rounded-lg bg-gray-200/75 p-1">
          <TabsTrigger
            value="converter"
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
          >
            Currency Converter
          </TabsTrigger>
          <TabsTrigger
            value="remittance"
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
          >
            Remittance
          </TabsTrigger>
          <TabsTrigger
            value="alerts"
            className="data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-md"
          >
            Rate Alerts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="converter" className="mt-6">
          <CurrencyConverter />
        </TabsContent>
        <TabsContent value="remittance" className="mt-6">
          <RemittanceCalculator />
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
