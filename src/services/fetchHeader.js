import axios from "axios"

export const saveHeader = async () => {
  const header = await axios(`/?section_id=header-soru`);
  return await header.data;
}
