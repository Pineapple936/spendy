import style from "./index.module.css";
import { PurchaseHistoryItem } from "@/interface";
import Row from "./Row";

export default function PurchaseHistory({ purchaseHistory }: { purchaseHistory: PurchaseHistoryItem[] }) {
    return (
        <div className={style.block}>
            {[...purchaseHistory].map((value, index) => <Row item={value} index={index} key={`PurchaseHistory${index}`} />)}
        </div>
    );
}
