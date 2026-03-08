import type { ShipsResponse } from "../types/ship.ts";

type GetShipsParams = {
  page: number;
  search: string;
};

export const getShips = async ({
  page,
  search,
}: GetShipsParams): Promise<ShipsResponse> => {
  const query: Record<string, unknown> = {};

  if (search.trim()) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  const response = await fetch("https://api.spacexdata.com/v4/ships/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      options: {
        page,
        limit: 10,
        sort: {
          name: "asc",
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch ships");
  }

  return response.json();
};