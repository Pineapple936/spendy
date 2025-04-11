import { PurchaseHistoryItem } from "@/interface";

export function getIncomeAndExpense(array: PurchaseHistoryItem[]): { income: number, expense: number } {
    let income: number = 0;
    let expense: number = 0;

    for(const item of array) {
        if(item.money < 0) {
            expense -= item.money;
        } else {
            income += item.money;
        }
    }

    return {income, expense};
}
