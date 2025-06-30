import UISettings from "../schema/ui-settings";

export const setUISettings = async (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      res.status(401).send("You do not have permission to resolve a report");
      return;
    }

    await UISettings.findOneAndUpdate(
      { key: req.body.key },
      { $set: { value: req.body.value } }
    );

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

export const getUISettings = async (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      res.status(401).send("You do not have permission to resolve a report");
      return;
    }

    const settings = await UISettings.find({});

    res.json(settings);
  } catch (e) {
    next(e);
  }
};
