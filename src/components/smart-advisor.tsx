"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getSmartAdvice } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { countries } from "@/lib/data";
import { Loader2, Sparkles } from "lucide-react";
import type { SmartDeductionAdvisorOutput } from "@/ai/flows/smart-deduction-advisor";

const formSchema = z.object({
  amountToSend: z.coerce.number().min(1, "Amount must be greater than 0."),
  recipientLocation: z.string().min(1, "Please select a location."),
});

export function SmartAdvisor() {
  const [advice, setAdvice] = useState<SmartDeductionAdvisorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountToSend: 1000,
      recipientLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setAdvice(null);
    const result = await getSmartAdvice(values);
    if (result.success) {
      setAdvice(result.data);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Smart Advisor</CardTitle>
        <CardDescription>Get AI-powered advice for the best transfer options.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amountToSend"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount to Send (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipientLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Location</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Get AI Advice
            </Button>
          </form>
        </Form>

        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {advice && (
          <Card className="mt-6 bg-secondary animate-in fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Sparkles className="h-5 w-5" /> AI Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">Best Bank</h3>
                <p className="text-muted-foreground">{advice.bankRecommendation}</p>
              </div>
              <div>
                <h3 className="font-semibold">Deduction Details</h3>
                <p className="text-muted-foreground">{advice.deductionDetails}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
