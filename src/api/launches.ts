import type { LaunchesResponse } from "../types/launch";
type GetLaunchesParams = {
  page: number;
  search: string;
};

export const getLaunches = async ({ page, search }: GetLaunchesParams): Promise<LaunchesResponse> => {

    const query: Record<string, unknown> = {};    
    if (search.trim()) {
        query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const response = await fetch('https://api.spacexdata.com/v4/launches/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            options: {
                page,
                limit: 10,
                sort: {
                    date_utc: 'desc'
                },
            },
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fetch launches');
    }

    return response.json();
};