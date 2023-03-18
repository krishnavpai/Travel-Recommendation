import DetailedTour from "../../models/DetailedTour";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const tours = await DetailedTour.find({});
    res.json(tours);
  } else {
    res.json({ error: "Bad request" });
  }
};
export default connectDB(handler);
