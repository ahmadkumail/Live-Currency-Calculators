
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
import { currencies } from "@/lib/data";
import { ArrowDownUp, ArrowUp, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [amount, setAmount] = useState<number | string>(1);
  const [interbankResult, setInterbankResult] = useState<string>("");
  const [openMarketResult, setOpenMarketResult] = useState<string>("");
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

  const interbankRate = exchangeRates ? (exchangeRates[toCurrency] || 0) / (exchangeRates[fromCurrency] || 1) : 0;
  const openMarketRate = interbankRate * 1.02; // 2% higher for open market

  useEffect(() => {
    if (typeof amount === "number" && exchangeRates) {
      setInterbankResult((amount * interbankRate).toFixed(2));
      setOpenMarketResult((amount * openMarketRate).toFixed(2));
    } else {
      setInterbankResult("");
      setOpenMarketResult("");
    }
  }, [amount, fromCurrency, toCurrency, interbankRate, openMarketRate, exchangeRates]);

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
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-[2fr_1fr_auto_1fr] md:gap-2">
            <div className="grid gap-2">
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
      {isLoading ? (
        <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="ml-2 text-muted-foreground">Loading live rates...</p>
        </div>
      ) : exchangeRates ? (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-green-600" />
              Official (Interbank)
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold md:text-3xl">
              {interbankResult}{" "}
              <span className="text-lg font-medium text-muted-foreground md:text-xl">
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
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ArrowUp className="h-4 w-4 text-orange-500" />
              Open Market (Est.)
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold md:text-3xl">
              {openMarketResult}{" "}
              <span className="text-lg font-medium text-muted-foreground md:text-xl">
                {toCurrency}
              </span>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              1 {fromCurrency} = {openMarketRate.toFixed(4)} {toCurrency}
            </div>
          </CardContent>
        </Card>
      </div>
      ) : (
         <Card className="text-center p-8">
            <CardTitle className="text-destructive">Failed to load rates</CardTitle>
            <CardDescription>
                Could not fetch live currency data. Please ensure your API key is correct in the .env file.
            </CardDescription>
        </Card>
      )}
    </div>
  );
}
