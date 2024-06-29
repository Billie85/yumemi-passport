import styles from "@/styles/Home.module.css";
import { use, useEffect, useState } from "react";
import { getApi } from "../services/getApi";
import { getPopulationInfo } from "../services/getPopulationInfo";
import { LabelData } from "../components/PopulationComposition";
import Highcharts, { Axis } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Charts {
  title: {
    text: string;
  };
  xAxis: {
    title: {
      text: string;
    };
    type: string;
  };
  yAxis: {
    title: {
      text: string;
    };
  };
  series: {
    name: string;
    data: [number, number][];
  }[];
}

interface PrefectureTypes {
  prefCode: number;
  prefName: string;
}

export default function Home() {  
  const [prefectures, setPrefectures] = useState<PrefectureTypes[]>([]);
  const [populationData, setPoputationData] = useState<LabelData[]>([]);
  const [checkPrefecture, setcheckPrefecture] = useState<number[]>([]);
  const [chartOptions, setchartOptions] = useState<Charts | null>(null);

    // Apiの取得
    useEffect(() => {
        const PrefectureData = async () => {
            const data = await getApi();
            setPrefectures(data);
        }
        PrefectureData();
    }, [])


    const generateChartOptions = (populationData: LabelData[]) => {
      const data = populationData.map((value) => ({
        name: value.label,
        data: value.data.map((v): [number, number] => [
          v.year,
          v.value
        ])
      }));
  
      return {
        title: {
          text: 'Population Composition',
        },
        xAxis: {
          title: {
            text: 'Year',
          },
          type: 'category',
        },
        yAxis: {
          title: {
            text: 'Population',
          },
        },
        series: data,
      };
    };

    // 人口構成API
    const PopulationData = async (prefCode: number) => {
      const data = await getPopulationInfo(prefCode);
      if (data && data.result && data.result.data)
        {
          setPoputationData(data.result.data);
          setchartOptions(generateChartOptions(data.result.data));
        }
    }

    // チェックボックス
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
        <div>
          {chartOptions && 
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />}        
        </div>
      </div>
    </div>
    }
    </>
  );
}