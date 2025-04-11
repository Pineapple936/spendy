"use client"
import { ReactElement, useState, useEffect } from "react";
import styles from "./page.module.css";
import { PurchaseHistoryItem } from "@/interface";
import LoadingPage from "@/components/LoadingPage";
import AccountBalance from "@/components/AccountBalance";
import PurchaseHistory from "@/components/PurchaseHistory";
import Chart from "@/components/Chart";
import Navbar from "@/components/Navbar";
import { renderBackgroud } from "@/utils";

export default function Home(): ReactElement {
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistoryItem[] | null>(null);

    useEffect(() => {
        const savedHistory = localStorage.getItem("history");
        if (!savedHistory) {
            localStorage.setItem("history", JSON.stringify([]));
        }
        setPurchaseHistory(savedHistory? JSON.parse(savedHistory): []);
    }, [])

    if(!purchaseHistory) {
        return <LoadingPage />
    }

    return (
        <div className={renderBackgroud("/")}>
            <div className={`${styles.block} spawn-page padding-block`}>
                <p className={`${styles.logo} center`}>Spendy</p>
                <AccountBalance purchaseHistory={purchaseHistory}/>
                <Chart data={purchaseHistory} />
                <PurchaseHistory purchaseHistory={purchaseHistory}/>
                <Navbar />
            </div>
        </div>
    );
}
