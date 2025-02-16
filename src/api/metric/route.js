const express = require("express");
const router = express.Router();
const prisma = require("../../utilities/database");
const authentication = require("../../middleware/authentication");

router.get("/", authentication, async (req, res, next) => {
  try {
    const now = new Date();

    // Start of today
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    // Define the start date for our 30-day window.
    // (This will include today, so we go back 29 days.)
    const startOf30DaysAgo = new Date(now);
    startOf30DaysAgo.setDate(now.getDate() - 29);

    // --- Today's Metrics ---

    // Total requests today
    const totalRequestsToday = await prisma.visit.count({
      where: { createdAt: { gte: startOfToday } },
    });

    // Unique visitors today (group by IP)
    const uniqueVisitorsTodayQuery = await prisma.visit.groupBy({
      by: ["ip"],
      where: { createdAt: { gte: startOfToday } },
    });
    const totalUniqueVisitorsToday = uniqueVisitorsTodayQuery.length;

    // --- Daily Breakdown for Last 30 Days ---

    // Fetch all visits in the 30-day window
    const visits30Days = await prisma.visit.findMany({
      where: { createdAt: { gte: startOf30DaysAgo } },
      orderBy: { createdAt: "asc" },
    });

    // Prepare an object to hold data for each day in the window.
    // We initialize each day so that even days with no visits appear.
    const dailyData = {};
    let currentDate = new Date(startOf30DaysAgo);
    while (currentDate <= now) {
      const dateStr = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
      dailyData[dateStr] = {
        date: dateStr,
        totalRequests: 0,
        uniqueVisitorsSet: new Set(), // Temporary set to collect unique IPs
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Aggregate the visits into the corresponding day
    visits30Days.forEach((visit) => {
      const dateStr = visit.createdAt.toISOString().split("T")[0];
      if (dailyData[dateStr]) {
        dailyData[dateStr].totalRequests += 1;
        dailyData[dateStr].uniqueVisitorsSet.add(visit.ip);
      }
    });

    // Transform the dailyData into an array with the computed unique visitor counts
    const dailyMetrics30Days = Object.values(dailyData).map((dayData) => ({
      date: dayData.date,
      totalRequests: dayData.totalRequests,
      totalUniqueVisitors: dayData.uniqueVisitorsSet.size,
    }));

    // Return the metrics
    res.json({
      totalUniqueVisitorsToday,
      totalRequestsToday,
      dailyMetrics30Days,
    });
  } catch (error) {
    next(error);
  }
});

// API to log visits from the frontend
router.post("/visit", async (req, res, next) => {
  try {
    const ip = req.body.ip || "unknown";
    console.log(req.body);
    console.log(req.body.ip);

    await prisma.visit.create({ data: { ip } });

    res.status(201).json({ message: "Visit logged successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
