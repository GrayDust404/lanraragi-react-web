import axios from "axios";
import { throttle } from "lodash";
import { HEADERS, RANDOM_URL } from "./constants";
import { getBaseUrl } from "../storage/requests";

const data = "";

const config = {
  method: "get",
  headers: HEADERS,
  data,
};

export const getRandomArchives = throttle(
  async (count = 10) =>
    axios({
      ...config,
      url: `http://${getBaseUrl()}${RANDOM_URL}?count=${count}`,
    })
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      }),
  2000
);

export default getRandomArchives;
