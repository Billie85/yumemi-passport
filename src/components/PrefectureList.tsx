import { getPrefectures } from '@/services/getPrefectures';
import React, { useEffect, useState } from 'react';
import { PrefectureTypes, PopulationDataType } from '@/types';
import styles from "@/styles/Home.module.css";

export const PrefectureList: React.FC<PopulationDataType> = ({PopulationData}) => {
  const [prefectures, setprefectures] = useState<PrefectureTypes[]>([]);
  const [checkbox, setCheckBox] = useState<number[]>([]);

  useEffect(() => {
    const PrefectureData = async () => {
      const result = await getPrefectures();
      setprefectures(result);
    };
    PrefectureData();
  }, []);

  const OnChange = (prefCode: number) => {
    setCheckBox((v) => {
      if (v.includes(prefCode)) {
        return v.filter((code) => code !== prefCode);
      } else {
        return [...v, prefCode];
      }
    });
    PopulationData(prefCode);
  };

  return (
    <>
      <div className={styles.selectBox}>
        <h1>都道府県一覧</h1>
        <ul>
          {prefectures.map((v) => (
            <li key={v.prefCode}>
              <label>
                <input
                  type="checkbox"
                  value={v.prefCode}
                  checked={checkbox.includes(v.prefCode)}
                  onChange={() => OnChange(v.prefCode)}
                />
              </label>
              {v.prefName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
