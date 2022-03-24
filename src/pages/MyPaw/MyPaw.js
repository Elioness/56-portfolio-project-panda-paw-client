import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Loading from "../../components/Loading";
import fetchUserEmissions from "../../store/user/actions";
import {
  selectUserEmissions,
  selectElectricityFootprints,
  selectTranspoFootprints,
  selectPlantOffsets,
} from "../../store/user/selectors";
import {
  calculateTranspoFoot,
  calculateTranspoEmissionGasoline,
  calculateTranspoTrain,
  calculateTranspoPlane,
  calculateElectricity,
  calculatePlantOffset,
} from "../../../src/functions";

export default function MyPaw() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserEmissions());
  }, []);

  const userEmissions = useSelector(selectUserEmissions);
  const transpo = useSelector(selectTranspoFootprints);
  const electricity = useSelector(selectElectricityFootprints);
  const plant = useSelector(selectPlantOffsets);
  console.log("emission of any sort", userEmissions);

  if (!userEmissions || !transpo) {
    return <Loading />;
  }

  let totalEmission = 0;
  return (
    <div>
      <h4>{userEmissions.name}'s CO2 Monthly Allocation </h4>
      <p>
        Your <strong>Goal</strong>: {userEmissions.goal} CO2 Kgs is attainable.
        You can do it!
      </p>

      <div></div>
      <div>
        {transpo.map((transpo) => {
          const totalTranspoEmission =
            calculateTranspoFoot(transpo.footBikeDistance) *
              transpo.footBikeDays +
            calculateTranspoEmissionGasoline(transpo.carDistance) *
              transpo.carDays +
            calculateTranspoTrain(transpo.trainDistance) * transpo.trainDays +
            calculateTranspoPlane(transpo.planeDistance) * transpo.planeDays;
          totalEmission += totalTranspoEmission;
          return (
            <div>
              <p>
                {transpo.title} has emitted: <br />
                {totalTranspoEmission} CO2 Kgs
              </p>
            </div>
          );
        })}
      </div>
      <div>
        {electricity.map((c) => {
          const totalElectricityEmission = calculateElectricity(c.consumption);
          totalEmission += totalElectricityEmission;
          return (
            <div>
              <p>Electricit Emission: {totalElectricityEmission} CO2 Kgs</p>
            </div>
          );
        })}
      </div>
      <div>
        {plant.map((p) => {
          const totalPlantOffset = calculatePlantOffset(p.plants);
          totalEmission -= totalPlantOffset;
          return (
            <div>
              <p>Plant Offset: {totalPlantOffset}</p>
            </div>
          );
        })}
      </div>
      <h4>Monthly Carbon Emission: {totalEmission}</h4>
      <h4>Daily Average Emission:{totalEmission / 30}</h4>
    </div>
  );
}
