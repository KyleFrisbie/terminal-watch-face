import { me } from "appbit";
import { peerSocket } from "messaging";
import * as fs from "fs";

const SETTINGS_TYPE = "cbor";
const SETTINGS_FILE = "settings.cbor";

let settings = {};
let onSettingsChanged;

export function initialize(callback) {
  settings = loadSettings();
  onSettingsChanged = callback;
  onSettingsChanged(settings);
}

peerSocket.onmessage = (event) => {
  settings[event.data.key] = event.data.value;
  onSettingsChanged(settings);
}

me.addEventListener("unload", saveSettings);

function saveSettings() {
  fs.writeFileSync(SETTINGS_FILE, settings, SETTINGS_TYPE);
}

function loadSettings() {
  try {
    return fs.readFileSync(SETTINGS_FILE, SETTINGS_TYPE);
  } catch (e) {
    return {};
  }
}
