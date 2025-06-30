import mongoose from "mongoose";

const UISettings = new mongoose.Schema({
    key: String,
    value: {
        type: mongoose.Schema.Types.Mixed,
        default: ""
    }
});

export default mongoose.model("uisettings", UISettings);
