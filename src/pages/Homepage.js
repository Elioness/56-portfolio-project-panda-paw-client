import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectState } from "../store/calculator/selector";

import {
  calculateTranspoEmissionDiesel,
  calculateTranspoEmissionGasoline,
  calculateTranspoTrain,
  calculateTranspoPlane,
  calculatePlantOffset,
  calculateTranspoFoot,
} from "../functions";

export default function Homepage() {
  const [footMiles, setFootMiles] = useState(0);
  const [trainMiles, setTrainMiles] = useState(0);
  const [carMiles, setCarMiles] = useState(0);
  const [planeMiles, setPlaneMiles] = useState(0);
  //console.log("foot", footMiles);
  const [totalTranspoEMilesssion, setTotalTranspoEMilesssion] = useState(0);

  const [plantQuantity, setPlantQuantity] = useState(0);
  const [plantOffset, setPlantOffset] = useState(0);

  const [showCalculationTranspo, setShowCalculationTranspo] = useState(false);
  const [showCalculationPlant, setShowCalculationPlant] = useState(false);

  const state = useSelector(selectState);
  console.log("state", state);
  useEffect(() => {}, []);

  return (
    <div>
      <p>
        TODO ADD A PHOTO here with an onclick that leads to an about page or
        link to a website that has more info about carbon footprint
      </p>
      <h4>Carbon Footprint Calculator</h4>

      <div>
        <p>Transportation Footprint</p>
        <form>
          <ul>
            <p>
              <label> Foot / bike Miles: </label>
              <input
                type="number"
                value={footMiles}
                onChange={(e) => {
                  setFootMiles(e.target.value);
                }}
              />
            </p>
            <p>
              <label> Train Miles: </label>
              <input
                type="number"
                value={trainMiles}
                onChange={(e) => {
                  setTrainMiles(e.target.value);
                }}
              />
            </p>
            <p>
              <label> Car Miles: </label>
              <input
                type="number"
                value={carMiles}
                onChange={(e) => {
                  setCarMiles(e.target.value);
                }}
              />
            </p>
            <p>
              <label> Plane Miles:</label>
              <input
                type="number"
                value={planeMiles}
                onChange={(e) => {
                  setPlaneMiles(e.target.value);
                }}
              />
            </p>
            <p>
              <button
                style={{ margin: "5px" }}
                onClick={() => {
                  setTotalTranspoEMilesssion(
                    calculateTranspoFoot(parseInt(footMiles)) +
                      calculateTranspoEmissionGasoline(parseInt(carMiles)) +
                      calculateTranspoTrain(parseInt(trainMiles)) +
                      calculateTranspoPlane(parseInt(planeMiles))
                  );
                  setShowCalculationTranspo(!showCalculationTranspo);
                }}
                type="button"
              >
                Calculate
              </button>
            </p>
            {showCalculationTranspo && (
              <div>
                <p>
                  Your transportation total Carbon Emission is:{" "}
                  {totalTranspoEMilesssion}
                </p>
              </div>
            )}
          </ul>
        </form>
      </div>

      <div>
        <p>Plant Offset</p>
        <form>
          <ul>
            <p>
              <label> Indoor plants at home:</label>
              <input
                type="number"
                value={plantQuantity}
                onChange={(e) => {
                  setPlantQuantity(e.target.value);
                }}
              />
            </p>
            <p>
              <button
                style={{ margin: "5px" }}
                onClick={() => {
                  setShowCalculationPlant(!showCalculationPlant);

                  setPlantOffset(calculatePlantOffset(parseInt(plantQuantity)));
                }}
                type="button"
              >
                Calculate
              </button>
            </p>
            {showCalculationPlant && (
              <div>
                <p>
                  {" "}
                  Your plants offset you carbon footprint by{" "}
                  <strong>{plantOffset}</strong> kgs every 24 hours
                </p>
              </div>
            )}
          </ul>
        </form>
      </div>
    </div>
  );
}
