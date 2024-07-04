import { getPrefectures } from '@/services/getPrefectures';
import React, { useEffect, useState } from 'react';
import { PrefectureTypes, PopulationDataType } from '@/types';
import styles from '@/styles/Home.module.css';

export const PrefectureList: React.FC<PopulationDataType> = ({PopulationData,}) => {
  const [prefectures, setPrefectures] = useState<PrefectureTypes[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<number | null>(
    null
  );

  useEffect(() => {
    const PrefectureData = async () => {
      const result = await getPrefectures();
      setPrefectures(result);
    };
    PrefectureData();
  }, []);

  const onChange = (prefCode: number) => {
    setSelectedPrefecture((prev) => (prev === prefCode ? null : prefCode));
    PopulationData(prefCode);
  };

  return (
    <>
      <div className={styles.selectBox}>
        <h1>都道府県一覧</h1>
        <ul>
          {prefectures.map((prefecture) => (
            <li key={prefecture.prefCode}>
              <label>
                <input
                  type="checkbox"
                  value={prefecture.prefCode}
                  checked={selectedPrefecture === prefecture.prefCode}
                  onChange={() => onChange(prefecture.prefCode)}
                />
              </label>
              {prefecture.prefName}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
