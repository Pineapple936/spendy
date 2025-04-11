"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from "react";
import style from "./index.module.css";
import { PurchaseHistoryItem } from "@/interface";
import LoadingPage from '@/components/LoadingPage';
import ButtonBack from '@/components/ButtonBack';
import Successful from '@/components/Successful';
import { renderBackgroud } from '@/utils';

export default function TransactionPage({ params }: { params: Promise<{ type: "income" | "expense", id: number }> }) {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [history, setHistory] = useState<PurchaseHistoryItem[]>([]);
    const [item, setItem] = useState<PurchaseHistoryItem | null>(null);
    const [timer, setTimer] = useState<number | null>(null);
    const { id: id, type: action } = use(params);

    useEffect(() => {
        const storedHistory = localStorage.getItem("history");
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory) as PurchaseHistoryItem[];
            setHistory(parsedHistory);
            if (parsedHistory.length > id) {
                setItem(parsedHistory[id]);
            }
        }
    }, [id]);

    useEffect(() => {
        return () => {
            if(timer) {
                clearTimeout(timer);
            }
        }
    }, [timer]);

    const handleRemove = () => {
        history.splice(id, 1)
        setShowSuccess(true);
        setTimer(
                window.setTimeout(() => {
                localStorage.setItem("history", JSON.stringify(history));
                router.push("/");
        }, 1500));
    };

    if(!item) {
        return <LoadingPage />
    }

    return (
        <div className={renderBackgroud("/" + action)}>
            <div className={`${style.container} spawn-page padding-block`}>
                <div className={style.header}>
                    <ButtonBack />
                    <p>Detail Transaction</p>
                    <button className={`${style.removeTransaction} click`} onClick={handleRemove} aria-label="delete a transaction">
                        <i className='bx bx-trash' />
                    </button>
                </div>
                <div className={style.block}>
                    <p className={style.money}>$ {Math.abs(item.money)}</p>
                    <div className={style.info}>
                        <div>
                            <p className='opacity'>Type</p>
                            <p>{action[0].toUpperCase() + action.slice(1)}</p>
                        </div>
                        <div>
                            <p className='opacity'>Category</p>
                            <p>{item.category}</p>
                        </div>
                    </div>
                </div>
                {showSuccess && <Successful text={"removed"} />}
            </div>
        </div>
    );
}
