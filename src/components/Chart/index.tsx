"use client"
import { useEffect, useRef } from 'react';
import { Chart as ChartJS, DoughnutController, ArcElement, Tooltip, ChartData, Title } from 'chart.js';
import style from "./index.module.css";
import { PurchaseHistoryItem, ChartConfig } from "@/interface";
import { dataForChart } from '@/utils';

ChartJS.register(DoughnutController, ArcElement, Tooltip, Title);
const createChartConfig = (action: string, data: ChartData): ChartConfig => {
    return {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
              title: {
                display: true,
                text: `Your ${action} by category`,
                color: "#000000",
                font: {
                    family: "'Inter', sans-serif",
                    size: 20
                },
                padding: {
                  bottom: 15
                }
              }
            }
          }
    };
};

export default function PurchaseChart({ data }: { data: PurchaseHistoryItem[] }) {
    const chartRefIncome = useRef<HTMLCanvasElement>(null);
    const chartRefExpense = useRef<HTMLCanvasElement>(null);
    const chartInstanceIncome = useRef<ChartJS | null>(null);
    const chartInstanceExpense = useRef<ChartJS | null>(null);

    const {income: income, expense: expense}: {income: ChartData; expense: ChartData} = dataForChart(data);
    const hasIncome = income.labels?.length !== 0;
    const hasExpense = expense.labels?.length !== 0;

    useEffect(() => {
        if(chartRefIncome.current && hasIncome) {
            chartInstanceIncome.current = new ChartJS(chartRefIncome.current, createChartConfig("income", income));
        }

        if(chartRefExpense.current && hasExpense) {
            chartInstanceExpense.current = new ChartJS(chartRefExpense.current, createChartConfig("expense", expense));
        }

        return () => {
            chartInstanceIncome.current?.destroy();
            chartInstanceExpense.current?.destroy();
        }
    }, [data]);

    return (
        <div className={`${style.block} padding-block`}>
            {hasIncome && <canvas ref={chartRefIncome} />}
            {hasExpense && <canvas ref={chartRefExpense} />}
        </div>
  );
}
