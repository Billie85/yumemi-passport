// PopulationData: 各年の人口データ
export interface PopulationData {
    year: number;
    value: number;
  }
  
  // PopulationLabelData: ラベルとそれに対応するデータ
  export interface PopulationLabelData {
    label: string;
    data: PopulationData[];
  }
  
  // PopulationCompositionResponse: APIレスポンスの型
  export interface PopulationCompositionResponse {
    message: string | null;
    result: {
      boundaryYear: number;
      data: PopulationLabelData[];
    };
  }
  