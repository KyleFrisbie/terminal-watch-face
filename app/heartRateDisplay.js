import { me } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { defaultText } from "../common/utils";

export const heartRateDisplay = () => {
  const heartRateLabel = document.getElementById('heartRateLabel');
  const heartRateValue = document.getElementById('heartRateValue');

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
}