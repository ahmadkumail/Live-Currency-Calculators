import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CurrencyConverter } from "./currency-converter";
import { RemittanceCalculator } from "./remittance-calculator";
import { SmartAdvisor } from "./smart-advisor";
import { Coins, Bot, Send } from "lucide-react";

export function MainCard() {
  return (
    <Card className="w-full max-w-lg shadow-xl border-t-4 border-primary">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Global Transfers Made Easy</CardTitle>
        <CardDescription>Convert, compare, and get smart advice instantly.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="converter"><Coins className="mr-2 h-4 w-4" />Converter</TabsTrigger>
            <TabsTrigger value="remittance"><Send className="mr-2 h-4 w-4" />Remittance</TabsTrigger>
            <TabsTrigger value="advisor"><Bot className="mr-2 h-4 w-4" />Advisor</TabsTrigger>
          </TabsList>
          <TabsContent value="converter" className="mt-6">
            <CurrencyConverter />
          </TabsContent>
          <TabsContent value="remittance" className="mt-6">
            <RemittanceCalculator />
          </TabsContent>
          <TabsContent value="advisor" className="mt-6">
            <SmartAdvisor />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
