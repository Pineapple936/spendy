import { ChartData, ChartOptions } from 'chart.js';

export interface PurchaseHistoryItem {
    date: string;
    time: string;
    money: number;
    category: keyof CategoryPattern;
    description: string;
}

export interface CategoryPattern {
    [key: string]: `#${string}`;
}

export const Category: CategoryPattern = {
    "Shopping": "#fceed4",
    "Food": "#fdd4d7",
    "Salary": "#cffaea",
    "Transportation": "#bddcff",
    "Subscription": "#eee5ff",
    "Passive Income": "#e3e4e5",
};

export const CategoryIcon: CategoryPattern = {
    "Shopping": "#fcac12",
    "Food": "#fd3c4a",
    "Salary": "#00a86b",
    "Transportation": "#0077ff",
    "Subscription": "#7f3dff",
    "Passive Income": "#0d0e0f"
}

export interface ChartConfig {
    type: 'doughnut';
    data: ChartData;
    options: ChartOptions;
}
