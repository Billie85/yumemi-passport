import axios from 'axios';
import { PrefectureTypes } from '@/types';

export const getPrefectures = async (): Promise<PrefectureTypes[]> => {
  try {
    const response = await axios.get(
      'https://opendata.resas-portal.go.jp/api/v1/prefectures/',
      {
        headers: {
          'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY,
        },
      }
    );
    return response.data.result;
  } catch {
    console.error('Error fetching data:');
    return [];
  }
};
