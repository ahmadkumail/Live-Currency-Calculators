import { DollarSign, Euro, PoundSterling, JapaneseYen, CircleDollarSign } from 'lucide-react';

export const currencies = [
  { code: 'USD', name: 'US Dollar', icon: DollarSign },
  { code: 'EUR', name: 'Euro', icon: Euro },
  { code: 'GBP', name: 'British Pound', icon: PoundSterling },
  { code: 'JPY', name: 'Japanese Yen', icon: JapaneseYen },
  { code: 'CAD', name: 'Canadian Dollar', icon: CircleDollarSign },
  { code: 'AUD', name: 'Australian Dollar', icon: CircleDollarSign },
  { code: 'INR', name: 'Indian Rupee', icon: CircleDollarSign },
  { code: 'PKR', name: 'Pakistani Rupee', icon: CircleDollarSign },
];

export const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 157.34,
  CAD: 1.37,
  AUD: 1.51,
  INR: 83.54,
  PKR: 278.47,
};

export const banks = [
  {
    id: 'global-bank',
    name: 'Global Bank',
    fee: 5,
    feeType: 'fixed',
    rateModifier: 0.99, // 1% worse than market rate
  },
  {
    id: 'swift-transfer',
    name: 'Swift Transfer',
    fee: 0.01, // 1%
    feeType: 'percentage',
    rateModifier: 0.995, // 0.5% worse than market rate
  },
  {
    id: 'peoples-bank',
    name: 'People\'s Bank',
    fee: 10,
    feeType: 'fixed',
    rateModifier: 1, // Market rate
  },
];

export const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "India", "Pakistan", "United Arab Emirates"
];
