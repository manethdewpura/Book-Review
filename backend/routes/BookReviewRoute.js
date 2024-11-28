import express from 'express';
import { BookReview } from '../models/BookReviewModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const reviews = await BookReview.find({});

        return res.status(200).json(reviews);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }
);

router.post('/', async (req, res) => {
    const review = req.body;
    const newReview = new BookReview(review);
    try {
        await newReview.save();

        return res.status(200).json(newReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await BookReview.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const review = req.body;
    try {
        await BookReview.findByIdAndUpdate(id, review);

        return res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
);


export default router;