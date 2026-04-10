import express from "express";
const router = express.Router();
import noteSchema from "../models/Note.model.js";
import protect from "../middleware/protect.middleware.js";

// all routes below are protected
router.use(protect);

// GET all notes for logged in user
router.get("/", async (req, res) => {
  try {
    const notes = await noteSchema.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single note
router.get("/:id", async (req, res) => {
  try {
    const note = await noteSchema.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await noteSchema.create({
      title,
      content,
      user: req.user._id
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  try {
    const note = await noteSchema.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await noteSchema.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    const note = await noteSchema.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await noteSchema.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export {router as noteRoutes}