import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../../components/Loading";
import fetchUserEmissions from "../../store/user/actions";
import {
  selectUserEmissions,
  selectElectricityFootprints,
  selectTranspoFootprints,
  selectPlantOffsets,
  selectGoal,
} from "../../store/user/selectors";
import {
  calculateTranspoFoot,
  calculateTranspoEmissionGasoline,
  calculateTranspoTrain,
  calculateTranspoPlane,
  calculateElectricity,
  calculatePlantOffset,
} from "../../../src/functions";
import Button from "react-bootstrap/Button";

import PolarChart from "../../components/myPawPolarChart/PolarChart";
import Goal from "../../components/Goal/Goal";
import "./styles.css";

export default function MyPaw() {
  const dispatch = useDispatch();

  const goal = useSelector(selectGoal);

  useEffect(() => {
    dispatch(fetchUserEmissions());
  }, []);

  const userEmissions = useSelector(selectUserEmissions);
  const transpo = useSelector(selectTranspoFootprints);
  const electricity = useSelector(selectElectricityFootprints);
  const plant = useSelector(selectPlantOffsets);
  console.log("emission of any sort", userEmissions);

  const [showForm, setShowForm] = useState(false);

  if (!userEmissions || !transpo) {
    return <Loading />;
  }

  let totalEmission = 0;
  let totalTranspoEmission = 0;
  let totalElectricityEmission = 0;
  let totalPlantOffset = 0;

  transpo.map((transpo) => {
    const currentTranspoEmission =
      calculateTranspoFoot(transpo.footBikeDistance) * transpo.footBikeDays +
      calculateTranspoEmissionGasoline(transpo.carDistance) * transpo.carDays +
      calculateTranspoTrain(transpo.trainDistance) * transpo.trainDays +
      calculateTranspoPlane(transpo.planeDistance) * transpo.planeDays;
    totalEmission += currentTranspoEmission;
    totalTranspoEmission += currentTranspoEmission;
  });

  electricity.map((c) => {
    const currentElectricityEmission = calculateElectricity(c.consumption);
    totalEmission += currentElectricityEmission;
    totalElectricityEmission += currentElectricityEmission;
  });

  plant.map((p) => {
    const currentPlantOffset = calculatePlantOffset(p.plants);
    totalEmission -= currentPlantOffset;
    totalPlantOffset += currentPlantOffset;
  });

  return (
    <div className="myPaw">
      <h4>{userEmissions.name}'s CO2 Monthly Allocation </h4>
      <p>
        Your <strong>Goal</strong>: {goal} CO2 Kgs is attainable. You can do it!
      </p>
      <div>
        <Button
          style={{ margin: "5px" }}
          onClick={() => setShowForm(!showForm)}
        >
          Change my goal
        </Button>
        {showForm && <Goal />}
      </div>

      <div>
        <PolarChart
          emissionLabels={[
            "Transportation Footprint",
            "Electricity Footprint",
            "PlantOffset",
          ]}
          emission={[
            totalTranspoEmission,
            totalElectricityEmission,
            totalPlantOffset,
          ]}
        />
      </div>

      <div>
        <h4>Monthly Carbon Emission: {totalEmission.toFixed(3)}</h4>
        <h4>Daily Average Emission:{(totalEmission / 30).toFixed(3)}</h4>
      </div>

      <div>
        {transpo.map((transpo) => {
          const currentTranspoEmission =
            calculateTranspoFoot(transpo.footBikeDistance) *
              transpo.footBikeDays +
            calculateTranspoEmissionGasoline(transpo.carDistance) *
              transpo.carDays +
            calculateTranspoTrain(transpo.trainDistance) * transpo.trainDays +
            calculateTranspoPlane(transpo.planeDistance) * transpo.planeDays;
          console.log(transpo);
          return (
            <div>
              <p>
                {transpo.title} has emitted: <br />
                {currentTranspoEmission.toFixed(3)} CO2 Kgs
              </p>
            </div>
          );
        })}
      </div>
      <div>
        {electricity.map((c) => {
          const totalElectricityEmission = calculateElectricity(c.consumption);
          return (
            <div>
              <p>
                Electricity Emission: {totalElectricityEmission.toFixed(3)} CO2
                Kgs
              </p>
            </div>
          );
        })}
      </div>
      <div>
        {plant.map((p) => {
          const totalPlantOffset = calculatePlantOffset(p.plants);

          return (
            <div>
              <p>Plant Offset: {totalPlantOffset.toFixed(3)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
