export type Launch = {
  id: string;
  name: string;
  date_utc: string;
};

export type LaunchesResponse = {
  docs: Launch[];
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};