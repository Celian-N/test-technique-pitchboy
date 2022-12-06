const express = require("express");
const router = express.Router();
const citiesController = require("../controllers/cities.controller");

router.get("/", (req, res) => {
  const allCities = citiesController.getAllCities();

  if (!allCities || allCities.length == 0) {
    res.status(404).send("Not found.");
  } else {
    res.send({ cities: allCities });
  }
});

router.get("/:postalCode", (req, res) => {
  const { postalCode } = req.params;
  const city = citiesController.getCityByPostalCode(postalCode);
  if (!city) {
    res.status(404).send("City not found.");
  } else {
    res.send({ city });
  }
});

router.put("/:postalCode", function (req, res) {
  const { postalCode } = req.params;
  const updatedCity = citiesController.updateCityByPostalCode(postalCode, req.body.updatedCity);
  if (!updatedCity) {
    res.status(404).send("City not found.");
  } else {
    res.send({ updatedCity });
  }
});

router.delete("/:postalCode", function (req, res) {
  const { postalCode } = req.params;
  const deletedCity = citiesController.deleteCityByPostalCode(postalCode);
  if (!deletedCity) {
    res.status(404).send("City not found.");
  } else {
    res.send({ deletedCity });
  }
});

module.exports = router;
