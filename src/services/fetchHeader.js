import axios from "axios"

export const saveHeader = async () => {
  const header = await axios(`/?section_id=header-panda`);
  return await header.data;
}
