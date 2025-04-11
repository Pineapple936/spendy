import style from "./index.module.css";
import Card from "./card";

export default function IncomeExpenses({ income, expense }: { income: number, expense:number }) {
    return (
        <div className={style.block}>
            <Card name="Income" value={income} />
            <Card name="Expense" value={expense} />
        </div>
    );
};
