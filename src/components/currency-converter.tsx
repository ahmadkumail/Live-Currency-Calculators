"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
    })
    .min(0.01, { message: "Amount must be greater than 0" }),
  from: z.string().min(1, { message: "Please select a currency" }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

const chartData = [
  { month: "January", rate: 1.08 },
  { month: "February", rate: 1.07 },
  { month: "March", rate: 1.09 },
  { month: "April", rate: 1.08 },
  { month: "May", rate: 1.09 },
  { month: "June", rate: 1.1 },
];
const chartConfig = {
  rate: {
    label: "Exchange Rate",
    color: "hsl(var(--primary))",
  },
};

const commonAmounts = [1, 5, 10, 25, 50, 100, 500, 1000];

export function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<string[]>(defaultCurrencies);
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      from: "USD",
    },
  });

  const { amount: fromAmount, from: fromCurrency } = form.watch();

  const convert = async (
    amount: number,
    from: string,
    to: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${from}`
      );
      if (!response.ok) throw new Error("Failed to fetch exchange rates.");
      const data = await response.json();
      const exchangeRate = data.rates[to];
      if (!exchangeRate) throw new Error("Exchange rate not available.");
      setRate(exchangeRate);
      setResult(amount * exchangeRate);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        if (!response.ok) throw new Error("Failed to fetch currency list.");
        const data = await response.json();
        setCurrencies(Object.keys(data.rates));
      } catch (e) {
        console.warn(
          "Failed to fetch currencies from API, using default list.",
          e
        );
      }
    }
    fetchCurrencies();
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency && fromAmount > 0) {
      const debounce = setTimeout(() => {
        convert(fromAmount, fromCurrency, toCurrency);
      }, 500);
      return () => clearTimeout(debounce);
    }
  }, [fromAmount, fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    const currentFrom = form.getValues("from");
    form.setValue("from", toCurrency);
    setToCurrency(currentFrom);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full text-left shadow-2xl shadow-primary/10">
        <CardContent className="p-6">
          <Form {...form}>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-2">
                {/* From Column */}
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencies.map((currency) => (
                              <SelectItem key={currency} value={currency}>
                                {currency}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                         <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="100"
                            {...field}
                            className="text-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Swap Button */}
                <div className="flex h-full items-center justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="self-center md:self-end"
                    onClick={handleSwapCurrencies}
                    aria-label="Swap currencies"
                  >
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </Button>
                </div>

                {/* To Column */}
                <div className="space-y-2">
                   <FormItem>
                     <FormLabel>To</FormLabel>
                     <Select
                      onValueChange={setToCurrency}
                      value={toCurrency}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                   </FormItem>
                  <FormItem>
                    <FormLabel>Converted Amount</FormLabel>
                    <div className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background">
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      ) : (
                        result?.toFixed(2) ?? "..."
                      )}
                    </div>
                  </FormItem>
                </div>
              </div>
               {rate && !error && (
                <div className="mt-4 text-center text-muted-foreground">
                  <p className="font-semibold text-lg text-primary">
                    1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}
                  </p>
                  <p className="text-xs">Last updated seconds ago</p>
                </div>
              )}
              {error && (
                <div className="mt-4 text-center text-sm font-medium text-destructive">
                  <p>Error: {error}</p>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card className="w-full text-left shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {fromCurrency} to {toCurrency} chart
            </h3>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  domain={['dataMin - 0.02', 'dataMax + 0.02']}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="w-full text-left shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              {fromCurrency} to {toCurrency} conversion table
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{fromCurrency}</TableHead>
                  <TableHead className="text-right">{toCurrency}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rate && commonAmounts.map(amount => (
                  <TableRow key={amount}>
                    <TableCell>{amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{(amount * rate).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
