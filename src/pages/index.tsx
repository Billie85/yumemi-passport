import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import { useEffect, useState } from "react";
import { getApi } from "./getApi";

interface PrefectureTypes{
    prefCode: number;
    prefName: string;
}

export default function Home() {
  const [prefectures, setPrefectures] = useState<PrefectureTypes[]>([]);
    useEffect(() => {
        const PrefectureData = async () => {
            const data = await getApi();
            setPrefectures(data);
        }
        PrefectureData();
    }, [])

  return (
    <>
    <header>都道府県一覧</header>
    <div>
      <ul>{prefectures.map(pre => (
        <li key={pre.prefCode}>{pre.prefName}</li>
      ))}</ul>
    </div>
    </>
  );
}
