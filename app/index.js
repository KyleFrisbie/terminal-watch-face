import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { defaultText, zeroPad } from "../common/utils";
import { me } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { HeartRateSensor } from "heart-rate";
import { defaultText } from "../common/utils";
import { today } from "user-activity";
import { units } from "user-settings";

// Day names
const days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

// Month names
const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

const timeLabel = document.getElementById('timeLabel');
const timeValue = document.getElementById('timeValue');

const dateLabel = document.getElementById('dateLabel');
const dateValue = document.getElementById('dateValue');

const stepCountLabel = document.getElementById('stepCountLabel');
const stepCountValue = document.getElementById('stepCountValue');

const floorCountLabel = document.getElementById('floorCountLabel');
const floorCountValue = document.getElementById('floorCountValue');

const caloriesBurnedLabel = document.getElementById('caloriesBurnedLabel');
const caloriesBurnedValue = document.getElementById('caloriesBurnedValue');

const distanceUnit = (units.distance === 'metric') ? 'm' : 'mi';
const distanceLabel = document.getElementById('distanceLabel');
const distanceValue = document.getElementById('distanceValue');

const heartRateLabel = document.getElementById('heartRateLabel');
const heartRateValue = document.getElementById('heartRateValue');

timeLabel.text = `$ time:`;
timeValue.text = `${defaultText}`;

dateLabel.text = `$ date:`;
dateValue.text = `${defaultText}-${defaultText}-${defaultText}`;

clock.granularity = "seconds";
clock.ontick = (evt) => {
  let todaysDate = evt.date;
  let hours = todaysDate.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(todaysDate.getMinutes());
  let secs = zeroPad(todaysDate.getSeconds());

  timeValue.text = `${hours}:${mins}:${secs}`;
  dateValue.text = `${days[todaysDate.getDay()]} ${months[todaysDate.getMonth()]} ${zeroPad(todaysDate.getDate())}`;

  activityProgress();
}


const activityProgress = () => {
  stepCountLabel.text = `$ steps:`;
  stepCountValue.text = `${today.adjusted.steps.toLocaleString() || 0}`;

  floorCountLabel.text = `$ floors:`;
  floorCountValue.text = `${today.adjusted.elevationGain.toLocaleString() || 0}`;

  caloriesBurnedLabel.text = `$ kcal:`;
  caloriesBurnedValue.text = `${today.adjusted.calories.toLocaleString() || 0}`;

  distanceLabel.text = `$ dist:`;
  distanceValue.text = `${today.adjusted.distance.toLocaleString() || 0} ${distanceUnit}`;
}

heartRateLabel.text = `$ hr:`;
heartRateValue.text = `${defaultText} bpm`;

/* Heart Rate */
if (me.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor();
  const body = new BodyPresenceSensor();
  body.onreading = () => {
    if (!body.present) {
      hrm.stop();
    } else {
      hrm.start();
    }
  };
  body.start();

  hrm.onreading = () => {
    heartRateValue.text = `${hrm.heartRate} bpm`;
  }
  hrm.start();
}
