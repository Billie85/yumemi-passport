import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { getPopulationInfo } from '../services/getPopulationInfo';
import { PrefectureList } from './PrefectureList';
import { LabelData } from '@/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export const Charts = () => {
  const [chart, setChart] = useState<Highcharts.Options | null>(null);
  const [selectedIndex, setSelectedIndex] = useState('0');
  const [watchChart, setWatchChart] = useState<number | null>(null);
  const categories = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

  const updateChart = async (prefCode: number) => {
    const populationResult = await getPopulationInfo(prefCode);
    if (
      populationResult &&
      populationResult.result &&
      populationResult.result.data
    ) {
      setChart(
        populationChart(populationResult.result.data[parseInt(selectedIndex)])
      );
    }
  };

  useEffect(() => {
    if (watchChart != null) {
      updateChart(watchChart);
    }
  }, [watchChart, selectedIndex]);

  // TODO predCodeの中身は都道府県それぞれの番号
  const monitoringMenu = (prefCode: number) => {
    setWatchChart(prefCode);
    updateChart(prefCode);
  };

  const populationChart: (_: LabelData) => Highcharts.Options = (
    populationData
  ) => {
    return {
      title: {
        text: `${categories[parseInt(selectedIndex)]}`,
      },
      xAxis: {
        title: {
          text: '',
        },
        type: 'category',
      },
      yAxis: {
        title: {
          text: '',
        },
        labels: {
          formatter: function (
            this: Highcharts.AxisLabelsFormatterContextObject
          ): string {
            return this.value.toLocaleString() + '人';
          },
        },
      },
      series: [
        {
          name: populationData.label,
          data: populationData.data.map(
            (v) => [v.year, v.value] as [number, number]
          ),
          type: 'line',
        },
      ],
    };
  };
  return (
    <>
      <div className={styles.Container}>
        <PrefectureList PopulationData={monitoringMenu} />

        <div className={styles.chartsBox}>
          <div className={styles.box1}>
            <select
              className={styles.select}
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={category} value={index.toString()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.box2}>
            <HighchartsReact
              highcharts={Highcharts}
              options={chart}
              containerProps={{ style: { height: '100%', width: '100%' } }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
