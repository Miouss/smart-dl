import { ipcRenderer } from "electron";

class ElectronEvent {
  static channelsList: string[] = [];

  name: string;

  constructor(name: string) {
    this.name = name;
    ElectronEvent.channelsList.push(name);
  }

  cleanUpAllEventsListeners() {
    console.log(ElectronEvent.channelsList);
    for (const channel in ElectronEvent.channelsList) {
      ipcRenderer.removeAllListeners(ElectronEvent.channelsList[channel]);
    }
  }

  removeAllListeners() {
    ipcRenderer.removeAllListeners(this.name);
  }
}

export default ElectronEvent;
