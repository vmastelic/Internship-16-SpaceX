import type { LaunchesResponse } from "../types/launch";

export type LaunchFilter = "all" | "success" | "failed" | "upcoming";

type GetLaunchesParams = {
    page: number;
    search: string;
    filter: LaunchFilter;
};

export const getLaunches = async ({ page, search, filter }: GetLaunchesParams): Promise<LaunchesResponse> => {

    const query: Record<string, unknown> = {};    
    if (search.trim()) {
        query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (filter === "success") {
        query.success = true;
    }

    if (filter === "failed") {
        query.success = false;
    }

    if (filter === "upcoming") {
        query.upcoming = true;
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

export const getLaunchById = async (id: string) => {
    const response = await fetch(`https://api.spacexdata.com/v4/launches/${id}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch launch details");
    }
    
    return response.json();
};

export type NextLaunch = {
    name: string;
    date_utc: string;
};

export const getNextLaunch = async (): Promise<NextLaunch> => {
    const response = await fetch("https://api.spacexdata.com/v4/launches/next");
    
    if (!response.ok) {
        throw new Error("Failed to fetch next launch");
    }
    
    return response.json();
};