"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { currencies, exchangeRates } from "@/lib/data";
import { ArrowDownUp } from "lucide-react";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | string>(1);
  const [result, setResult] = useState<string>("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    const currentRate = toRate / fromRate;
    setRate(currentRate);

    if (typeof amount === 'number') {
      setResult((amount * currentRate).toFixed(2));
    } else {
      setResult("");
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
    <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Currency Converter</h2>
        <p className="text-sm text-gray-500">
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <c.icon className="h-4 w-4" /> {c.code} - {c.name}
                    </div>
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2">
            <Label htmlFor="from-amount">Amount</Label>
            <Input
                id="from-amount"
                type="text"
                value={amount}
                onChange={handleAmountChange}
                className="text-right"
            />
        </div>
      </div>
      
      <div className="flex justify-center items-center">
        <Button variant="ghost" size="icon" onClick={handleSwapCurrencies} aria-label="Swap currencies">
            <ArrowDownUp className="h-6 w-6 text-gray-500" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <c.icon className="h-4 w-4" /> {c.code} - {c.name}
                    </div>
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="to-amount">Converted Amount</Label>
          <Input
            id="to-amount"
            type="text"
            value={result}
            readOnly
            className="text-right bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
