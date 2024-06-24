import axios from "axios";

export const getApi = async () => {
    try{
        const response = await axios.get("https://opendata.resas-portal.go.jp/api/v1/prefectures/", {
            headers: {
                "X-API-KEY": "scLC3NvRgfv9XvTuCQDhVaAWOhDCJLZNsrBjzgmL"
            }
        });
        return(response.data.result);
    }
    catch(error){
        console.error("Error fetching data:", error);
        return [];
    }
};