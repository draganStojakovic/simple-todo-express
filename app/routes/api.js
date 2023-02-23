import { Router } from "express";
import { ToDo } from "../database/schemas/ToDo.js";

export const router = Router();

router.get("/todo", async (req, res) => {
    const id = req.query.id;
    if (id) {
        try {
            const singleTodo = await ToDo.findById(id);
            return res.json(singleTodo);
        } catch (e) {
            return res.json({ error: e.message });
        }
    }
    try {
        const todos = await ToDo.find();
        return res.json(todos);
    } catch (e) {
        return res.json({ error: e.message });
    }
});

router.post("/todo", async (req, res) => {
    const todo = req.body;
    if (!todo.title) {
        return res.json({
            error: "The request body is missing 'title' param.",
        });
    }
    try {
        const newToDo = await ToDo.create({
            title: todo.title,
            desc: todo.desc || null,
        });
        return res.json(newToDo);
    } catch (e) {
        return res.json({ error: e.message });
    }
});

router.put("/todo/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        ToDo.findByIdAndUpdate(id, data, (err) => {
            if (err) {
                return res.json({
                    data,
                    success: false,
                    message: "Faild to update a task",
                });
            }
            return res.json({
                data,
                success: true,
                message: "Updated a task.",
            });
        });
    } catch (e) {
        return res.json({ error: e.message });
    }
});

router.put("/todo-status", async (req, res) => {
    const id = req.query.id;
    const todo = await ToDo.findById(id);
    if (todo.done) {
        try {
            await todo.update({ done: 0 });
            return res.json({ message: "Succefully set a task to false." });
        } catch (e) {
            return res.json({ error: e.message });
        }
    } else {
        try {
            await todo.update({ done: 1 });
            return res.json({ message: "Succefully set a task to true." });
        } catch (e) {
            return res.json({ error: e.message });
        }
    }
});

router.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    try {
        ToDo.findByIdAndDelete(id, (err) => {
            if (err) {
                return res.json({
                    id,
                    success: false,
                    message: "Faild to delete a task",
                });
            }
            return res.json({
                id,
                success: true,
                message: "Deleted a task.",
            });
        });
    } catch (e) {
        return res.json({ error: e.message });
    }
});
