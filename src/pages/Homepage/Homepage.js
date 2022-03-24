import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectState } from "../../store/calculator/selector";
import { selectToken } from "../../store/user/selectors";

import {
  postNewTranspoFootprint,
  postNewElecFootprint,
  postNewPlantOffset,
} from "../../store/user/actions";

import {
  calculateTranspoEmissionGasoline,
  calculateTranspoTrain,
  calculateTranspoPlane,
  calculatePlantOffset,
  calculateTranspoFoot,
  calculateElectricity,
} from "../../functions";

import Carousel from "../../components/Carousel";

import "./styles.css";

export default function Homepage() {
  const dispatch = useDispatch();

  const [transpoTitle, setTranspoTitle] = useState("Home - Office");
  const [footMiles, setFootMiles] = useState(0);
  const [trainMiles, setTrainMiles] = useState(0);
  const [carMiles, setCarMiles] = useState(0);
  const [planeMiles, setPlaneMiles] = useState(0);

  const [footDays, setFootDays] = useState(0);
  const [trainDays, setTrainDays] = useState(0);
  const [carDays, setCarDays] = useState(0);
  const [planeDays, setPlaneDays] = useState(0);

  const [totalTranspoEmisssion, setTotalTranspoEmisssion] = useState(0);

  const [plantQuantity, setPlantQuantity] = useState(0);
  const [plantOffset, setPlantOffset] = useState(0);

  const [electricityConsumption, setElectricityConsumption] = useState(0);
  const [electricityEmission, setElectricityEmission] = useState(0);

  const [showCalculationTranspo, setShowCalculationTranspo] = useState(false);
  const [showCalculationPlant, setShowCalculationPlant] = useState(false);
  const [showCalculationElec, setShowCalculationElec] = useState(false);

  const state = useSelector(selectState);
  console.log("state", state);

  useEffect(() => {}, []);

  const token = useSelector(selectToken);

  const onClickSubmitTranspo = (event) => {
    event.preventDefault();

    dispatch(
      postNewTranspoFootprint({
        title: transpoTitle,
        footBikeDistance: footMiles,
        trainDistance: trainMiles,
        carDistance: carMiles,
        planeDistance: planeMiles,
        footBikeDays: footDays,
        trainDays: trainDays,
        carDays: carDays,
        planeDays: planeDays,
      })
    );
    console.log("dispatch postnewtranspo clicked");
    console.log("title", transpoTitle);
  };

  const onClickSubmitElec = (event) => {
    event.preventDefault();

    dispatch(
      postNewElecFootprint({
        consumption: electricityConsumption,
      })
    );
  };

  const onClickSubmitPlant = () => {
    dispatch(
      postNewPlantOffset({
        plants: plantQuantity,
      })
    );
  };

  return (
    <div>
      <Carousel />

      <h4 className="intro">Carbon Footprint Calculator</h4>

      <div className="homepageCal">
        <p>Transportation Footprint</p>
        <form>
          {token && (
            <p>
              {" "}
              <label> Title: </label>
              <input
                type="string"
                value={transpoTitle}
                onChange={(e) => {
                  setTranspoTitle(e.target.value);
                }}
              />
            </p>
          )}
          <ul className="transpoWrap">
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
          </ul>
          <ul className="transpoWrap">
            <p>
              <label> Foot / bike Days: </label>
              <input
                type="number"
                value={footDays}
                onChange={(e) => {
                  setFootDays(e.target.value);
                }}
              />
            </p>
            <p>
              <label> Train Days: </label>
              <input
                type="number"
                value={trainDays}
                onChange={(e) => {
                  setTrainDays(e.target.value);
                }}
              />
            </p>
            <p>
              <label> Car Days: </label>
              <input
                type="number"
                value={carDays}
                onChange={(e) => {
                  setCarDays(e.target.value);
                }}
              />
            </p>
            <p>
              <label> Plane Days:</label>
              <input
                type="number"
                value={planeDays}
                onChange={(e) => {
                  setPlaneDays(e.target.value);
                }}
              />
            </p>
          </ul>
          <p>
            <button
              style={{ margin: "5px" }}
              onClick={() => {
                setTotalTranspoEmisssion(
                  calculateTranspoFoot(parseInt(footMiles)) * footDays +
                    calculateTranspoEmissionGasoline(parseInt(carMiles)) *
                      carDays +
                    calculateTranspoTrain(parseInt(trainMiles)) * trainDays +
                    calculateTranspoPlane(parseInt(planeMiles)) * planeDays
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
                <strong>{totalTranspoEmisssion.toFixed(4)}</strong> kgs <br />
                {token && (
                  <button onClick={(event) => onClickSubmitTranspo(event)}>
                    Submit
                  </button>
                )}
              </p>
            </div>
          )}
        </form>
      </div>

      <div className="homepageCal">
        <p>Electricity Footprint</p>
        <form>
          <ul>
            <p>
              <label> Monthly Consumption:</label>
              <input
                type="number"
                value={electricityConsumption}
                onChange={(e) => {
                  setElectricityConsumption(e.target.value);
                }}
              />
            </p>
            <p>
              <button
                style={{ margin: "5px" }}
                onClick={() => {
                  setShowCalculationElec(!showCalculationElec);

                  setElectricityEmission(
                    calculateElectricity(parseInt(electricityConsumption))
                  );
                }}
                type="button"
              >
                Calculate
              </button>
            </p>
            {showCalculationElec && (
              <div>
                <p>
                  {" "}
                  Your monthly electricity consumption is{" "}
                  <strong>{electricityEmission.toFixed(4)}</strong> kgs
                  <br />
                  {token && (
                    <button onClick={(event) => onClickSubmitElec(event)}>
                      Submit
                    </button>
                  )}
                </p>
              </div>
            )}
          </ul>
        </form>
      </div>

      <div className="homepageCal">
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
                  Your plants offset your carbon footprint by{" "}
                  <strong>{plantOffset.toFixed(4)}</strong> kgs every 24 hours
                  <br />
                  {token && (
                    <button onClick={(event) => onClickSubmitPlant(event)}>
                      Submit
                    </button>
                  )}
                </p>
              </div>
            )}
          </ul>
        </form>
      </div>
    </div>
  );
}
