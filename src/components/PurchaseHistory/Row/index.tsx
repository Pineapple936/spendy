import Link from "next/link";
import style from "./index.module.css";
import { PurchaseHistoryItem } from "@/interface";
import { Category } from "@/interface";

export default function Row({ item, index }: { item: PurchaseHistoryItem, index: number }) {
    const renderTime: string = item.date + " " + item.time;

    return (
        <Link href={`/${item.money < 0? "expense": "income"}/${index}`} className={style.block}>
            <img style={{background: Category[item.category]}} src={`/categories/${String(item.category).toLowerCase()}.svg`} alt="category" />
            <div className={style.info}>
                <p>{item.category} <span className={item.money < 0? style.expense: style.income}>{item.money > 0? "+": ""}{item.money}</span></p>
                <p><span className={`opacity ${style.description}`}>{item.description}</span> <span className="opacity">{renderTime}</span></p>
            </div>
        </Link>
    );
}
