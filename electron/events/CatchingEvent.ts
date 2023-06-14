import { IpcRendererEvent, ipcRenderer } from "electron";
import ElectronEvent from "./ElectronEvent";
import { EventCallback } from "../../src/types/Event";


class CatchingEvent extends ElectronEvent {
  constructor(name: string) {
    super(name);
  }

  listener(action: EventCallback) {
    ipcRenderer.on(this.name, (_: IpcRendererEvent, ...args) => {
      console.log(`Event ${this.name} has been caught`);
      action(...args);
    });
  }
}

export default CatchingEvent;
