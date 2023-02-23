import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    done: { type: Boolean, default: 0 },
    title: { type: String, required: true },
    desc: { type: String, default: null },
    createdAt: { type: Date, default: () => Date.now(), immutable: true },
    updatedAt: { type: Date, default: () => Date.now() },
});

todoSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

export const ToDo = mongoose.model("ToDo", todoSchema);
