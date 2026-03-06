import type { LaunchesResponse } from "../types/launch";

export const getLaunches = async (page: number): Promise<LaunchesResponse> => {
    const response = await fetch('https://api.spacexdata.com/v4/launches/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: {},
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