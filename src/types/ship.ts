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