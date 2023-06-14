import { ipcRenderer } from "electron";
import ElectronEvent from "./ElectronEvent";

class FiringEvent extends ElectronEvent {
  constructor(name: string) {
    super(name);
  }

  fire() {
    ipcRenderer.send(this.name);
  }
}

export default FiringEvent;
