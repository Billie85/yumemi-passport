import axios from "axios";
import { promises } from "dns";
import { headers } from "next/headers";
import { PopulationCompositionResponse } from "./PopulationComposition";

export const getPopulationInfo = async (prefCode: number):Promise<PopulationCompositionResponse | null> => {
    
    try {
        const response = await axios.get("https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear", {
            params: {
                prefCode: prefCode,
                cityCode: '-'
            },
            headers: {
                "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
            }
        })
        console.log("response result->" ,response.data);
        return(response.data);
    }
    catch {
        console.error(`Failed to fetch population composition for prefCode ${prefCode}.`);
        return null;
    }
}