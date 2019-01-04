import document from "document";
import { today } from "user-activity";
import { units } from "user-settings";

export const userActivityDisplay = () => {
  const stepCountLabel = document.getElementById('stepCountLabel');
  const stepCountValue = document.getElementById('stepCountValue');

  const floorCountLabel = document.getElementById('floorCountLabel');
  const floorCountValue = document.getElementById('floorCountValue');

  const caloriesBurnedLabel = document.getElementById('caloriesBurnedLabel');
  const caloriesBurnedValue = document.getElementById('caloriesBurnedValue');

  const distanceUnit = (units.distance === 'metric')? 'm' : 'mi';
  const distanceLabel = document.getElementById('distanceLabel');
  const distanceValue = document.getElementById('distanceValue');

  stepCountLabel.text = `$ steps:`;
  stepCountValue.text = `${today.adjusted.steps.toLocaleString() || 0}`;
  
  floorCountLabel.text = `$ floors:`;
  floorCountValue.text = `${today.adjusted.elevationGain.toLocaleString() || 0}`;

  caloriesBurnedLabel.text = `$ kcal:`;
  caloriesBurnedValue.text = `${today.adjusted.calories.toLocaleString() || 0}`;

  distanceLabel.text = `$ dist:`;
  distanceValue.text = `${today.adjusted.distance.toLocaleString() || 0} ${distanceUnit}`;
}