import type { LaunchesResponse } from "../types/launch";

export const getLaunches = async (): Promise<LaunchesResponse> => {
    const response = await fetch('https://api.spacexdata.com/v4/launches/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: {},
            options: {
                page: 1,
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