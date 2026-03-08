export type Ship = {
    id: string;
    name: string;
    type: string | null;
    active: boolean;
    image: string | null;
};

export type ShipsResponse = {
    docs: Ship[];
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type ShipDetail = {
    id: string;
    name: string;
    type: string | null;
    active: boolean;
    image: string | null;
    year_built: number | null;
    home_port: string | null;
    roles: string[];
    mass_kg: number | null;
    launches: string[];
    model: string | null;
    status: string | null;
    url: string | null;
};