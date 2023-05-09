import { getApiKey } from "../storage/requests";

export const SEARCH_URL = "/api/search";

export const RANDOM_URL = `${SEARCH_URL}/random`;

export const THUMBNAIL_URL = "/api/archives/:id/thumbnail";

export const FILES_URL = "/api/archives/:id/files";

export const METADATA_URL = "/api/archives/:id/metadata";

export const CATEGORIES_URL = "/api/categories";

export const UPDATE_CATEGORY_URL = `${CATEGORIES_URL}/:id/:archive`;

export const ARCHIVE_CATEGORY_URL = `/api/archives/:id/categories`;

export const HEADERS = {
  Authorization: `Bearer ${getApiKey()}`,
};
