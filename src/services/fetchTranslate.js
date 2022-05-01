import axios from "axios";

export const translateGoogle =  async (body) => {
  let url = "https://google-translate1.p.rapidapi.com/language/translate/v2";
  let dataUrlEncode = new URLSearchParams({
    "q": body,
    "target": "en",
    "source": "fr"
  })

  let req = {
    method: 'post',
    url: url,
    data: dataUrlEncode,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "accept-encoding": "application/gzip",
      "x-rapidapi-host": "google-translate1.p.rapidapi.com",
      "x-rapidapi-key": "5b69034940msh926aaf3904c1ea0p1bc2e9jsn337e16f29ca4"
    }
  }

  let response = await axios(req)
  return response.data;
}