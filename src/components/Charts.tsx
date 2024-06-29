import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { getPopulationInfo } from "../services/getPopulationInfo";
import { PrefectureList } from "./PrefectureList";
import { LabelData } from "@/types";
import Highcharts, { Axis } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { ChartsType } from "@/types";

export const Charts: React.FC = () => {

  const [chartOptions, setchartOptions] = useState<ChartsType | null>(null);

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
        text: '人口一覧',
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
        if (data && data.result && data.result.data){
            setchartOptions(generateChartOptions(data.result.data));
          }
        }

        return (
          <>
          <div className={styles.Container}>
            <PrefectureList PopulationData={PopulationData} />
            <div className={styles.chartsBox}>
              <div>
                {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}        
              </div>
            </div>
          </div>
          </>
        )
}
