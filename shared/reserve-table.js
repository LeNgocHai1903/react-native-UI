import Constants from "expo-constants";

const { manifest } = Constants;

export const reserUrl = `http://${manifest.debuggerHost.split(':').shift()}:5009/api/bill/`;