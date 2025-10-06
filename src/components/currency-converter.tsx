"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { currencies, exchangeRates } from "@/lib/data";
import { ArrowDownUp, ArrowUp, ArrowDown } from "lucide-react";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("AED");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState<number | string>(1);
  const [interbankResult, setInterbankResult] = useState<string>("");
  const [openMarketResult, setOpenMarketResult] = useState<string>("");

  const interbankRate =
    exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  const openMarketRate = interbankRate * 1.02; // 2% higher for open market

  useEffect(() => {
    if (typeof amount === "number") {
      setInterbankResult((amount * interbankRate).toFixed(2));
      setOpenMarketResult((amount * openMarketRate).toFixed(2));
    } else {
      setInterbankResult("");
      setOpenMarketResult("");
    }
  }, [amount, fromCurrency, toCurrency, interbankRate, openMarketRate]);

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
    <div className="space-y-6">
      <div className="space-y-6 rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Currency Converter</h2>
          <p className="text-sm text-gray-500">Get live exchange rates.</p>
        </div>
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-5">
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
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
                      {c.code}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapCurrencies}
              aria-label="Swap currencies"
              className="h-9 w-9"
            >
              <ArrowDownUp className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
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
                      {c.code}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-green-600">
            <ArrowUp className="h-4 w-4" />
            Official (Interbank)
          </div>
          <div className="text-3xl font-bold">
            {interbankResult}{" "}
            <span className="text-xl font-medium text-gray-500">
              {toCurrency}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            1 {fromCurrency} = {interbankRate.toFixed(4)} {toCurrency}
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-yellow-600">
            <ArrowUp className="h-4 w-4" />
            Open Market (Est.)
          </div>
          <div className="text-3xl font-bold">
            {openMarketResult}{" "}
            <span className="text-xl font-medium text-gray-500">
              {toCurrency}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            1 {fromCurrency} = {openMarketRate.toFixed(4)} {toCurrency}
          </div>
        </div>
      </div>
    </div>
  );
}
