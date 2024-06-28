import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
const inter = Inter({ subsets: ["latin"] });
import { use, useEffect, useState } from "react";
import { getApi } from "./getApi";
import { getPopulationInfo } from "./getPopulationInfo";
import {PopulationLabelData } from "./PopulationComposition";

interface PrefectureTypes {
  prefCode: number;
  prefName: string;
}

export default function Home() {  
  const [prefectures, setPrefectures] = useState<PrefectureTypes[]>([]);
  const [populationData, setPoputationData] = useState<PopulationLabelData[]>([]);
  const [checkPrefecture, setcheckPrefecture] = useState<number[]>([]);

    useEffect(() => {
        const PrefectureData = async () => {
            const data = await getApi();
            setPrefectures(data);
        }
        PrefectureData();
    }, [])

    const PopulationData = async (prefCode: number) => {
      const data = await getPopulationInfo(prefCode);
      if (data && data.result && data.result.data)
        {
          console.log("this is the data what you want->" ,data.result.data);
          setPoputationData(data.result.data);
        }
    }

    const CheckBoxChange = (prefCode: number) => {
      setcheckPrefecture(value => {

        if (value.includes(prefCode)){
          setPoputationData([]);
          return value.filter(code => code !== prefCode)
        }
        else
        {
          PopulationData(prefCode);
          return [...value, prefCode];
        }
      });
    };


  return (
    <>
    {<div className={styles.Container}>
      <div className={styles.selectBox}>
        <h1>都道府県一覧</h1>
        <ul>
          {prefectures.map(pre => (
          <li key={pre.prefCode}>
            <label>
              <input
                type="checkbox"
                value={pre.prefCode}
                checked={checkPrefecture.includes(pre.prefCode)}
                onChange={() => CheckBoxChange(pre.prefCode)}
              />
            </label>
            {pre.prefName}</li>
        ))}
        </ul>
      </div>

      <div className={styles.chartsBox}>
        <h1>Population Composition</h1>
        <div className={styles.PoputationData}>
          {populationData.map(labelData => (
            <div key={labelData.label}>
              <h2>{labelData.label}</h2>
              <ul>
                {labelData.data.map(data => (
                  <li key={data.year}>
                    Year: {data.year}, Population: {data.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
    }
    </>
  );
}