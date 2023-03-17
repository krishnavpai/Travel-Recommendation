import AllTours from "../../models/AllTours";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let destination = req.body.destination;
    const tours = await AllTours.find({ $text: { $search: destination } });
    res.json(tours);
  } else {
    res.json({ error: "Bad request" });
  }
};
export default connectDB(handler);
