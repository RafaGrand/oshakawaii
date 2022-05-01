import { saveHeader } from "../services/fetchHeader";

export function SaveLocalLanguage () {
  
  this.local = Shopify.locale;
  
  this.save = async function () {
    if (window.location.href.indexOf("tools") !== -1) return null;
    localStorage.setItem('local', this.local);
    localStorage.setItem('header', await saveHeader());
  }
}
