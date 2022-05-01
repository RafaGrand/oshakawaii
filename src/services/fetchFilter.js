import axios from "axios";

export const filterFetch = (url) => {
  const request = axios(`${url}?section_id=${section_id}`);
  return request.then(res => res.data);

}