const laposteData = require("../../../resources/laposte_hexasmal.json");

getAllCities = () => {
  return laposteData;
};

getCityByPostalCode = (postalCode) => {
  return laposteData.find((city) => city.fields.code_postal == postalCode);
};

updateCityByPostalCode = (postalCode, newCity) => {
  const city = laposteData.find(
    (city) => city.fields.code_postal == postalCode
  );

  if (!city) return;
  const updatedCity = { ...city, ...newCity };
  return updatedCity;
};

deleteCityByPostalCode = (postalCode) => {
  const cityToDelete = laposteData.find(
    (city) => city.fields.code_postal == postalCode
  );

  if (!cityToDelete) return;
  const newCities = laposteData.filter(
    (city) => city.fields.code_postal !== postalCode
  );

  return cityToDelete;
};
module.exports = {
  getAllCities,
  getCityByPostalCode,
  updateCityByPostalCode,
  deleteCityByPostalCode,
};
