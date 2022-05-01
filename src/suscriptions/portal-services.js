import axios from "axios"

export function updateSuscriptionPortal(url, formData) {
  const request = axios({
    url: url,
    method: "post",
    data: formData,
  })
  
  return request.then(res => res.data)
}