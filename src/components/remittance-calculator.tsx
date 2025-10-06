"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { banks, currencies, exchangeRates } from "@/lib/data";

export function RemittanceCalculator() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState<number | string>(1000);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value === "" ? "" : parseFloat(value));
    }
  };

  const calculationResults = useMemo(() => {
    if (typeof amount !== 'number' || amount <= 0) return [];

    const marketRate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];

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

  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="space-y-4 rounded-lg bg-card p-6">
       <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-5">
        <div className="grid gap-2 md:col-span-2">
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
        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="to-currency-remit">To</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger id="to-currency-remit"><SelectValue /></SelectTrigger>
            <SelectContent>
              {currencies.map((c) => <SelectItem key={c.code} value={c.code}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Bank Comparison</CardTitle>
          <CardDescription>Estimated fees and what your recipient will get.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bank</TableHead>
                <TableHead className="text-right">Fee ({fromCurrency})</TableHead>
                <TableHead className="text-right">Recipient Gets ({toCurrency})</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculationResults.length > 0 ? calculationResults.map((result, index) => (
                <TableRow key={result.id} className={index === 0 ? 'bg-green-50' : ''}>
                  <TableCell className="font-medium">{result.name}</TableCell>
                  <TableCell className="text-right">{result.fee.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-semibold">{result.recipientGets.toFixed(2)}</TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">
                    Enter an amount to see comparison.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
