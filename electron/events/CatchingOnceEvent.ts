import { IpcRendererEvent, ipcRenderer } from "electron";
import ElectronEvent from "./ElectronEvent";
import { EventCallback } from "../../src/types/Event";

class CatchingOnceEvent extends ElectronEvent {
  constructor(name: string) {
    super(name);
  }

  listener(action: EventCallback) {
   ipcRenderer.once(this.name, (_:IpcRendererEvent, ...args) => {
      console.log(`Event ${this.name} has been caught`);
      console.log(...args);
      action(...args);
    });
  }
}

export default CatchingOnceEvent;
