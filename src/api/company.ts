export const getCompanySummary = async (): Promise<string> => {
    const response = await fetch('https://api.spacexdata.com/v4/company');

    if(!response.ok){
        throw new Error('Failed to fetch company summary');
    }

    const data = await response.json();
    return data.summary;
}