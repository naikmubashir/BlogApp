import express from 'express';
import protectRoute from '../middlewares/protectRoute.js'; // authentication middleware

const router = express.Router();

// Check if the user is logged in
router.get('/', protectRoute, async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({ loggedIn: false });
        }

        res.status(200).json({ loggedIn: true }); // Return true if user is logged in
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
