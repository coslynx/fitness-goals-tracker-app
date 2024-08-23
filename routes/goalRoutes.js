import express from 'express';
import Goal from '../models/Goal';
import { validateGoalInput } from '../utils/helpers';

const router = express.Router();

// Create a new goal
router.post('/', async (req, res) => {
    const { userId, activityType, target } = req.body;

    const errors = validateGoalInput(activityType, target);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const newGoal = new Goal({
            userId,
            activityType,
            target,
            progress: [],
        });
        const savedGoal = await newGoal.save();
        return res.status(201).json(savedGoal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

// Get goals for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.params.userId });
        return res.status(200).json(goals);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

// Update an existing goal
router.put('/:goalId', async (req, res) => {
    const { activityType, target } = req.body;

    const errors = validateGoalInput(activityType, target);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const updatedGoal = await Goal.findByIdAndUpdate(
            req.params.goalId,
            { activityType, target },
            { new: true }
        );

        if (!updatedGoal) {
            return res.status(404).json({ message: 'Goal not found.' });
        }

        return res.status(200).json(updatedGoal);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

// Delete an existing goal
router.delete('/:goalId', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.goalId);

        if (!deletedGoal) {
            return res.status(404).json({ message: 'Goal not found.' });
        }

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error, please try again later.' });
    }
});

export default router;