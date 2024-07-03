export interface CheckBoxType {
  checkedPrefectures: number[];
  onChange: (prefCode: number) => void;
}

export interface PopulationDataType {
  PopulationData: (prefCode: number) => void;
}

export interface PrefectureTypes {
  prefCode: number;
  prefName: string;
}

export interface YearValue {
  year: number;
  value: number;
}

export interface LabelData {
  label: string;
  data: YearValue[];
}

export interface ApiResponse {
  message: string | null;
  result: {
    boundaryYear: number;
    data: LabelData[];
  };
}

export interface ChartsType {
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
    labels: {
      formatter: (this: Highcharts.AxisLabelsFormatterContextObject) => string;
    }
  };
  series: {
    name: string;
    data: [number, number][];
  }[];
}
