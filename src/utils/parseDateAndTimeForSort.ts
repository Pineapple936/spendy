import { PurchaseHistoryItem } from "@/interface";

export const parseEventDateTime = (event: PurchaseHistoryItem): number => {
    const [day, month, year] = event.date.split('.').map(Number);
    const [hours, minutes] = event.time.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes).getTime();
};
