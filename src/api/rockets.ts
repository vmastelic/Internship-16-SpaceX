export const getRocketById = async (id: string) => {
    const response = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch rocket details");
    }
    
    return response.json();
};