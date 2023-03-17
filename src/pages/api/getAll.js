import AllTours from "../../models/AllTours";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const tours = await AllTours.find({});
    res.json(tours);
  } else {
    res.json({ error: "Bad request" });
  }
};
export default connectDB(handler);
