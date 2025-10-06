"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { currencies, exchangeRates } from "@/lib/data";
import { ArrowDownUp, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | string>(1);
  const [interbankRate, setInterbankRate] = useState(0);
  const [openMarketRate, setOpenMarketRate] = useState(0);
  const [interbankResult, setInterbankResult] = useState<string>("");
  const [openMarketResult, setOpenMarketResult] = useState<string>("");

  useEffect(() => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    const currentInterbankRate = toRate / fromRate;
    setInterbankRate(currentInterbankRate);
    
    const currentOpenMarketRate = currentInterbankRate * 1.007; // Assuming 0.7% higher
    setOpenMarketRate(currentOpenMarketRate);

    if (typeof amount === 'number') {
      setInterbankResult((amount * currentInterbankRate).toFixed(2));
      setOpenMarketResult((amount * currentOpenMarketRate).toFixed(2));
    } else {
      setInterbankResult("");
      setOpenMarketResult("");
    }
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value === "" ? "" : parseFloat(value));
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  
  return (
    <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Currency Converter</h2>
        <p className="text-muted-foreground -mt-5">Get live exchange rates.</p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_1fr] md:items-end gap-4">
            <div className="grid gap-2">
                <Label htmlFor="from-amount">Amount</Label>
                <Input
                    id="from-amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="from-currency">From</Label>
                 <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                    {currencies.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                        <div className="flex items-center gap-2">
                            <c.icon className="h-4 w-4" /> {c.code}
                        </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>

            <Button variant="ghost" size="icon" onClick={handleSwapCurrencies} aria-label="Swap currencies" className="self-end hidden md:flex">
                <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
            </Button>

            <div className="grid gap-2">
                <Label htmlFor="to-currency">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                    <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                    {currencies.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                        <div className="flex items-center gap-2">
                            <c.icon className="h-4 w-4" /> {c.code}
                        </div>
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        Official (Interbank)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{interbankResult} <span className="text-lg text-muted-foreground">{toCurrency}</span></p>
                    <p className="text-xs text-muted-foreground">1 {fromCurrency} = {interbankRate.toFixed(4)} {toCurrency}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-yellow-600">
                        <TrendingUp className="h-4 w-4" />
                        Open Market (Est.)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{openMarketResult} <span className="text-lg text-muted-foreground">{toCurrency}</span></p>
                     <p className="text-xs text-muted-foreground">1 {fromCurrency} = {openMarketRate.toFixed(4)} {toCurrency}</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
