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
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState<number | string>(100);
  const [convertedAmount, setConvertedAmount] = useState<number | string>("");
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const currentRate = toRate / fromRate;
    setRate(currentRate);

    if (typeof amount === 'number') {
      const result = amount * currentRate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount("");
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
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="from-amount">You send</Label>
        <div className="flex gap-2">
          <Input
            id="from-amount"
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="text-lg"
          />
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger className="w-[120px]">
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

      <div className="flex items-center justify-center">
        <Button variant="ghost" size="icon" onClick={handleSwapCurrencies} aria-label="Swap currencies">
          <ArrowDownUp className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="to-amount">They receive (market rate)</Label>
        <div className="flex gap-2">
          <Input id="to-amount" value={convertedAmount} readOnly className="text-lg font-semibold bg-muted" />
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger className="w-[120px]">
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
      
      {rate > 0 && (
        <p className="text-sm text-center text-muted-foreground pt-2">
          1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
        </p>
      )}
    </div>
  );
}
