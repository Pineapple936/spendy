import { PurchaseHistoryItem } from "@/interface";

export function getBalance(array: PurchaseHistoryItem[]): number {
    let s: number = 0;

    for(const item of array) {
        s += item.money;
    }
    return s;
}
