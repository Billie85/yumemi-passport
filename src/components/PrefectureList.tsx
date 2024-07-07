import React, { useEffect, useState } from 'react';
import { getPrefectures } from '@/services/getPrefectures';
import { PrefectureTypes, PopulationDataType } from '@/types';
import styles from '@/styles/Home.module.css';
import 'boxicons/css/boxicons.min.css';

export const PrefectureList: React.FC<PopulationDataType> = ({
  PopulationData,
}) => {
  const [prefectures, setPrefectures] = useState<PrefectureTypes[]>([]);
  const [selectedPrefecture, setSelectedPrefecture] = useState<number | null>(
    null
  );
  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);

  const handleMenuIconClick = () => {
    setIsSelectBoxOpen(true);
  };

  const handleCloseButtonClick = () => {
    setIsSelectBoxOpen(false);
  };

  useEffect(() => {
    const menuIcon = document.getElementById(styles.menu_icon);
    const closeButton = document.getElementById(styles.close_button);

    if (menuIcon && closeButton) {
      menuIcon.addEventListener('click', handleMenuIconClick);
      closeButton.addEventListener('click', handleCloseButtonClick);
    }

    return () => {
      if (menuIcon && closeButton) {
        menuIcon.removeEventListener('click', handleMenuIconClick);
        closeButton.removeEventListener('click', handleCloseButtonClick);
      }
    };
  }, []);

  useEffect(() => {
    const fetchPrefectures = async () => {
      const result = await getPrefectures();
      setPrefectures(result);
    };
    fetchPrefectures();
  }, []);

  const onChange = (prefCode: number) => {
    setSelectedPrefecture((prev) => (prev === prefCode ? null : prefCode));
    PopulationData(prefCode);
  };

  return (
    <>
      <div
        className={`${styles.selectBox} ${isSelectBoxOpen ? styles.active : ''}`}
      >
        <div className={styles.TextContainer}>
          <h1>都道府県一覧</h1>
          <p>都道府県を選択してください</p>
          <div className="bx bx-x" id={styles.close_button}></div>
        </div>
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
                {prefecture.prefName}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
