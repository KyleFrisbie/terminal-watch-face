import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { defaultText, zeroPad } from "../common/utils";

export const dateTimeDisplay = () => {

  // Day names
  const days = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
  ];

  // Month names
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const timeLabel = document.getElementById('timeLabel');
  const timeValue = document.getElementById('timeValue');

  const dateLabel = document.getElementById('dateLabel');
  const dateValue = document.getElementById('dateValue');
  
  timeLabel.text = `$ time:`;
  timeValue.text = `${defaultText}`;

  dateLabel.text = `$ date:`;
  dateValue.text = `${defaultText}-${defaultText}-${defaultText}`;

  clock.granularity = "seconds";
  clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;
    } else {
      // 24h format
      hours = zeroPad(hours);
    }
    let mins = zeroPad(today.getMinutes());
    let secs = zeroPad(today.getSeconds());
    timeValue.text = `${hours}:${mins}:${secs}`;
    dateValue.text = `${days[today.getDay()]} ${months[today.getMonth()]} ${zeroPad(today.getDate())}`;
  }
}