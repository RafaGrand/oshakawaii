import axios from "axios";

/* --------- 

**Use only with API google to localization**

export function reverseGeocodingWithGoogle(latitude, longitude) {
  let urlGEO = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDesxUnAbqCoDFz2DhpqllsQgcbvHJoeW8`;
  let resquest = axios(urlGEO); 
  return resquest
    .then(res => res.data)
    .catch(status => console.error('Request failed.  Returned status of', status))
}

--------  */

export function geoIP() {
  let request = axios('https://freegeoip.app/json/')
  return request
    .then(res => res.data)
    .catch(err => console.log('Request failed :' + err))
}