import { validateBarFreeShipping } from "../currency/country-select";
import { geoIP } from "../services/fetchGEO";

const ShippingAPP = {
  
  alternativeBrowserGEO: function() {
    geoIP().then(response => {
      localStorage.setItem("country", response.country_code)
      ShippingAPP.renderOptionsShipping(response)
    })
  },

  renderOptionsShipping: function (location) {
    if (Object.keys(countryObject).length === 0) return;

    let country = countryObject[location.country_code];
    
    if(country) {
      /* document.querySelector(`.input-currency[value="${location.country_code}"]`).checked = true; */
      validateBarFreeShipping(country);
    } else {
      console.log('We dont have shipping price setting!');
      validateBarFreeShipping(Object.values(countryObject)[0]);
    }
    
  },
}

// Excerpt from https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
export function geoFindMe() {
  ShippingAPP.alternativeBrowserGEO();
  
  /* ---------

  **Validation find localization in browser**
  
  if (!navigator.geolocation){
   console.log("Geolocation is not supported by your browser");
    return;
  }
  function success(position) {
    ShippingAPP.alternativeBrowserGEO();
  }
  function error() {
    console.log("Unable to retrieve your location");
  }
  navigator.geolocation.getCurrentPosition(success, error);

  --------- */
}
