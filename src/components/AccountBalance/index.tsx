import style from "./index.module.css";
import { PurchaseHistoryItem } from "@/interface";
import IncomeExpenses from "../IncomeExpenses";
import { getBalance, getIncomeAndExpense } from "@/utils";

export default function AccountBalance({ purchaseHistory }: { purchaseHistory: PurchaseHistoryItem[] }) {
    return (
        <div className={style.block}>
            <div className={`${style.block} center`}>
                <p className="opacity">Account balance</p>
                <p className={style.balance}>${getBalance(purchaseHistory)}</p>
            </div>
            <IncomeExpenses { ...getIncomeAndExpense(purchaseHistory) } />
        </div>
    );
}
