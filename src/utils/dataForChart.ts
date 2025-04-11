import { ChartData } from 'chart.js';
import { PurchaseHistoryItem } from "@/interface";
import { CategoryIcon } from "@/interface";

export function dataForChart(data: PurchaseHistoryItem[]): {income: ChartData; expense: ChartData} {
    const income: Record<PurchaseHistoryItem["category"], number> = {};
    const expense: Record<PurchaseHistoryItem["category"], number> = {};

    for(const transaction of data) {
        if(transaction.money > 0) {
            income[transaction.category] = (income[transaction.category] || 0) + transaction.money;
        } else {
            expense[transaction.category] = Math.abs((expense[transaction.category] || 0) + transaction.money);
        }
    }

    return {income: createChartData(income), expense: createChartData(expense)};
}

function createChartData(data: object): ChartData {
    const chartData: ChartData = {
        labels: Object.keys(data),
        datasets: [{
          label: 'Purchase amounts',
          data: Object.values(data),
          backgroundColor: Object.keys(data).map(key => CategoryIcon[key]),
          borderWidth: 1
        }]
      };
    return chartData;
}
