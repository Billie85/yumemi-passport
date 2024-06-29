// valueの値を変えると人口が表示されなくなってしまう。

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