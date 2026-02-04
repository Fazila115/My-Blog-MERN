import * as dashboardService from '../services/dashboard.service.js';

// GET - Platform Overview
const overviewPlatform = async (req, res) => {
    try {
        const data = await dashboardService.overviewPlatformService();

        return res.status(200).json({
            ok: true,
            message: 'Get overview successfully!',
            ...data
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

export default overviewPlatform;