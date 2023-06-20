import { Router } from "express";

import {
    getFragsUrls,
} from "./middlewares";

const disney = Router();

disney.post("/", getFragsUrls);

export { disney };
