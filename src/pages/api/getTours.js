import DetailedTour from "../../models/DetailedTour";
import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    let filter = req.body.filter;
    if(filter != "") {
    const tours = await DetailedTour.find({ $text: { $search: filter } });
      return res.json(tours);
  }
    else {
      const tours = await DetailedTour.find();
    
    res.json(tours);
    }
  } else {
    res.json({ error: "Bad request" });
  }
};
export default connectDB(handler);
