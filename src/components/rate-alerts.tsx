"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { currencies } from "@/lib/data";
import { BellRing, CheckCircle, Loader2 } from "lucide-react";

const formSchema = z.object({
  fromCurrency: z.string().min(1, "Please select a currency."),
  toCurrency: z.string().min(1, "Please select a currency."),
  targetRate: z.coerce.number().min(0.0001, "Target rate must be positive."),
  email: z.string().email("Please enter a valid email address."),
});

export function RateAlerts() {
  const [isAlertSet, setIsAlertSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromCurrency: "USD",
      toCurrency: "PKR",
      targetRate: 280,
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsAlertSet(true);
  }
  
  if (isAlertSet) {
    return (
        <Card className="w-full max-w-lg mx-auto animate-in fade-in">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Alert Set Successfully!
                </CardTitle>
                <CardDescription>
                    We will notify you at {form.getValues("email")} when 1 {form.getValues("fromCurrency")} reaches {form.getValues("targetRate")} {form.getValues("toCurrency")}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => {
                    setIsAlertSet(false);
                    form.reset();
                }} className="w-full">
                    Set Another Alert
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
            <CardTitle>Set a Rate Alert</CardTitle>
            <CardDescription>Get notified when your target exchange rate is met.</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fromCurrency"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>From</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Currency" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {currencies.map((c) => (
                                    <SelectItem key={c.code} value={c.code}>
                                        {c.code}
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
                            name="toCurrency"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>To</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                    <SelectValue placeholder="Currency" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {currencies.map((c) => (
                                    <SelectItem key={c.code} value={c.code}>
                                        {c.code}
                                    </SelectItem>
                                    ))}
                                </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                     <FormField
                        control={form.control}
                        name="targetRate"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Target Rate</FormLabel>
                            <FormControl>
                            <Input type="number" step="0.01" placeholder="e.g., 280.50" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email for Notification</FormLabel>
                            <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <BellRing className="mr-2 h-4 w-4" />
                        )}
                        Set Alert
                    </Button>
                </form>
            </Form>
      </CardContent>
    </Card>
  );
}
