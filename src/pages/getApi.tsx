import axios from "axios";

export const getApi = async () => {
    try{
        const response = await axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures/", {
            headers: {
                "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY,
            }
        });
        // console.log(response.data.result);
        return(response.data.result);
    }
    catch(error){
        console.error("Error fetching data:", error);
        return [];
    }
};