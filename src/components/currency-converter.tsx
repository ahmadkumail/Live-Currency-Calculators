"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2, RefreshCw } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ThemeToggle } from "./theme-toggle";

const formSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: "Amount must be a number",
    })
    .min(0.01, { message: "Amount must be greater than 0" }),
  from: z.string().min(1, { message: "Please select a currency" }),
  to: z.string().min(1, { message: "Please select a currency" }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultCurrencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

export function CurrencyConverter() {
  const [currencies, setCurrencies] = useState<string[]>(defaultCurrencies);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 1,
      from: "USD",
      to: "EUR",
    },
  });

  const { from: fromCurrency, to: toCurrency } = form.watch();

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

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${values.from}`
      );
      if (!response.ok) throw new Error("Failed to fetch exchange rates.");
      const data = await response.json();
      const rate = data.rates[values.to];
      if (!rate) throw new Error("Exchange rate not available.");
      setResult(values.amount * rate);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleSwapCurrencies() {
    form.setValue("from", toCurrency);
    form.setValue("to", fromCurrency);
    // Re-submit the form with swapped values
    onSubmit({
      amount: form.getValues("amount"),
      from: toCurrency,
      to: fromCurrency,
    });
  }

  return (
    <Card className="w-full text-left shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Currency Converter</CardTitle>
            <CardDescription>
              Get the latest exchange rates.
            </CardDescription>
          </div>
          <ThemeToggle />
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1.00"
                        {...field}
                        step="0.01"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
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

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="self-end"
                onClick={handleSwapCurrencies}
                aria-label="Swap currencies"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>

              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
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
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  Convert <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {result !== null && (
          <div className="text-xl font-semibold">
            <p>
              {form.getValues("amount")} {fromCurrency} ={" "}
              <span className="text-primary">
                {result.toFixed(4)} {toCurrency}
              </span>
            </p>
          </div>
        )}
        {error && (
          <div className="mt-2 text-sm font-medium text-destructive">
            <p>Error: {error}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
