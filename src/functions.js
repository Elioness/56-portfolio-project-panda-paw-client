//All is in kgs CO2

export const calculateTranspoFoot = (mi) => {
  return mi * 0;
};

export const calculateTranspoEmissionGasoline = (mi) => {
  const gallon = mi / 36;
  const emission = gallon * 8.78;
  return emission;
};

export const calculateTranspoEmissionDiesel = (mi) => {
  const gallon = mi / 43;
  const emission = gallon * 10.21;
  return emission;
};

export const calculateTranspoTrain = (mi) => {
  const emission = mi * 0.114;
  return emission;
};

export const calculateTranspoPlane = (mi) => {
  const emission = mi * 0.2;
  return emission;
};

export const calculatePlantOffset = (plant) => {
  return plant * 0.000232;
};

export const calculateElectricity = (consumption) => {
  return consumption * 0.429;
};
