import { me } from "appbit";
import { me as device } from 'device';
import { peerSocket } from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings;
let onSettingsChanged;

export function initialize(callback) {
  settings = loadSettings();
  onSettingsChanged = callback;
  onSettingsChanged(callback);
}

peerSocket.onmessage = (event) => {
  settings[event.data.key] = event.data.value;
  onSettingsChanged(settings);
}

// peerSocket.addEventListener("message", function (evt) {
// onsettingschange(settings);
// })

me.onunload = saveSettings();

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (e) {
    return {
      [backgroundColor]: {},
      [textColor]: {}
    };
  }
}
