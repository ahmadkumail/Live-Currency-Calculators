
"use client";

import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { banks, currencies } from "@/lib/data";
import { Loader2 } from "lucide-react";

export function RemittanceCalculator() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState<number | string>(1000);
  const [exchangeRates, setExchangeRates] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY;
    if (!apiKey) {
      console.error("ExchangeRate-API key is missing.");
      setIsLoading(false);
      return;
    }

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then(res => res.json())
      .then(data => {
        if (data.result === 'success') {
          setExchangeRates(data.conversion_rates);
        } else {
          console.error("Failed to fetch exchange rates:", data['error-type']);
        }
        setIsLoading(false);
      }).catch(error => {
        console.error("Error fetching exchange rates:", error);
        setIsLoading(false);
      });
  }, []);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value === "" ? "" : parseFloat(value));
    }
  };

  const calculationResults = useMemo(() => {
    if (typeof amount !== 'number' || amount <= 0 || !exchangeRates) return [];

    const marketRate = (exchangeRates[toCurrency] || 0) / (exchangeRates[fromCurrency] || 1);
    if (marketRate === 0) return [];

    const results = banks.map(bank => {
      const bankRate = marketRate * bank.rateModifier;
      let fee = 0;
      if (bank.feeType === 'fixed') {
        fee = bank.fee;
      } else {
        fee = amount * bank.fee;
      }
      
      const recipientGets = (amount - fee) * bankRate;

      return {
        ...bank,
        bankRate,
        fee,
        recipientGets
      };
    });
    
    return results.sort((a,b) => b.recipientGets - a.recipientGets);

  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Remittance Calculator</CardTitle>
        <CardDescription>Compare banks to find the best rate for your transfer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
       <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="remit-amount">Amount to Send</Label>
          <Input
            id="remit-amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="from-currency-remit">From</Label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger id="from-currency-remit"><SelectValue /></SelectTrigger>
            <SelectContent>
              {currencies.map((c) => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="to-currency-remit">To</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger id="to-currency-remit"><SelectValue /></SelectTrigger>
            <SelectContent>
              {currencies.map((c) => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <h3 className="mb-2 text-lg font-medium">Bank Comparison</h3>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead className="text-right">Fee ({fromCurrency})</TableHead>
                <TableHead className="text-right">Recipient Gets ({toCurrency})</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                 <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                       <div className="flex justify-center items-center">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <p className="ml-2">Loading live rates...</p>
                       </div>
                    </TableCell>
                </TableRow>
              ) : calculationResults.length > 0 ? calculationResults.map((result, index) => (
                <TableRow key={result.id} className={index === 0 ? 'bg-green-50 dark:bg-green-900/20' : ''}>
                  <TableCell className="font-medium whitespace-nowrap">{result.name}</TableCell>
                  <TableCell className="text-right">{result.fee.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold whitespace-nowrap">{result.recipientGets.toFixed(2)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                    Enter an amount to see comparison or check API key.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      </CardContent>
    </Card>
  );
}
