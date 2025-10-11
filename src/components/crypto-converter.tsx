
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
import { ArrowDownUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const cryptoCodes = ["BTC", "ETH", "SOL"];
const fiatCodes = currencies.filter(c => !cryptoCodes.includes(c.code)).map(c => c.code);

export function CryptoConverter() {
  const [fromCurrency, setFromCurrency] = useState("BTC");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState<number | string>(1);
  const [result, setResult] = useState<string>("");

  const conversionRate =
    (exchangeRates[toCurrency as keyof typeof exchangeRates] || 0) / (exchangeRates[fromCurrency as keyof typeof exchangeRates] || 1);

  useEffect(() => {
    if (typeof amount === "number") {
      setResult((amount * conversionRate).toFixed(cryptoCodes.includes(toCurrency) ? 6 : 2));
    } else {
      setResult("");
    }
  }, [amount, fromCurrency, toCurrency, conversionRate]);

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
  
  const getSelectCurrencies = (type: 'from' | 'to') => {
      const isFromCrypto = cryptoCodes.includes(fromCurrency);
      if (type === 'from') {
          return currencies;
      }
      if (type === 'to') {
          return isFromCrypto ? currencies.filter(c => !cryptoCodes.includes(c.code)) : currencies.filter(c => cryptoCodes.includes(c.code));
      }
      return currencies;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Crypto Converter</CardTitle>
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
              <Select value={fromCurrency} onValueChange={(value) => {
                  const isSwitchingToFiat = fiatCodes.includes(value);
                  const isToFiat = fiatCodes.includes(toCurrency);
                  if (isSwitchingToFiat && isToFiat) {
                      setToCurrency(cryptoCodes[0]);
                  } else if (!isSwitchingToFiat && !isToFiat){
                      setToCurrency(fiatCodes[0]);
                  }
                  setFromCurrency(value);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  {getSelectCurrencies('from').map((c) => (
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
                  {getSelectCurrencies('to').map((c) => (
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
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            Conversion Result
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold md:text-3xl">
            {result}{" "}
            <span className="text-lg font-medium text-muted-foreground md:text-xl">
              {toCurrency}
            </span>
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            1 {fromCurrency} = {conversionRate.toFixed(cryptoCodes.includes(toCurrency) ? 6 : 4)} {toCurrency}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
