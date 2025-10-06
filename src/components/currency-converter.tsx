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
import { ArrowDownUp, ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Currency Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
                      <div className="flex items-center gap-2">{c.code}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center pt-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSwapCurrencies}
                aria-label="Swap currencies"
                className="h-9 w-9"
              >
                <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
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
                      <div className="flex items-center gap-2">{c.code}</div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <ArrowUp className="h-4 w-4" />
              Official (Interbank)
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {interbankResult}{" "}
              <span className="text-xl font-medium text-muted-foreground">
                {toCurrency}
              </span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              1 {fromCurrency} = {interbankRate.toFixed(4)} {toCurrency}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-orange-500">
              <ArrowUp className="h-4 w-4" />
              Open Market (Est.)
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {openMarketResult}{" "}
              <span className="text-xl font-medium text-muted-foreground">
                {toCurrency}
              </span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              1 {fromCurrency} = {openMarketRate.toFixed(4)} {toCurrency}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
