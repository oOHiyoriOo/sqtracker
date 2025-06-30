import express from "express";
import { getStats } from "../controllers/moderation";
import { setUISettings, getUISettings } from "../controllers/ui-settings";

const router = express.Router();

export default (tracker) => {
  router.get("/stats", getStats(tracker));

  router.post("/settings", setUISettings);
  router.get("/settings", getUISettings);
  return router;
};
