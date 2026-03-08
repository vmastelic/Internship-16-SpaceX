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

export type LaunchDetail = {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean | null;
  failures: {
    time: number;
    altitude: number | null;
    reason: string;
  }[];
  links: {
    patch: {
      small: string | null;
      large: string | null;
    };
    webcast: string | null;
  };
};