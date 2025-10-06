import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrencyConverter } from "./currency-converter";
import { RemittanceCalculator } from "./remittance-calculator";
import { SmartAdvisor } from "./smart-advisor";
import { Bell, ArrowRightLeft, CandlestickChart } from "lucide-react";

export function MainCard() {
  return (
    <div className="w-full max-w-4xl">
        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white border rounded-lg p-1">
            <TabsTrigger value="converter" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Converter
            </TabsTrigger>
            <TabsTrigger value="remittance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md flex items-center gap-2">
              <CandlestickChart className="h-4 w-4" />
              Remittance
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-md flex items-center gap-2">
              <Bell className="h-4 w-4" />
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
            <div className="flex items-center justify-center p-8">
              <p className="text-muted-foreground">Rate Alerts feature coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
    </div>
  );
}
