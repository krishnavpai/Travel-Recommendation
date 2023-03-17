import Tour from "../../models/AllTours";
import dbConnect from "../../middleware/mongoose";

const handler = async (req, res) => {
    if(req.method == 'POST'){
        for(let i = 0; i < req.body.length; i++){
            let tdays = parseInt(req.body[i].days);
            let tnights = parseInt(req.body[i].nights);
            const tour = new Tour({
                titleText: req.body[i].titleText,
                price: req.body[i].price,
                destinations: req.body[i].destinations,
                nights: tnights,
                days:   tdays,
                titleLink: req.body[i].titleLink,
                imageLink: req.body[i].imageLink,
            });
            await tour.save();
        }
        res.status(200).json({message: 'success'});
    }

    else{
        res.status(400).json({message: 'error'});
    }
    
}
export default dbConnect(handler);

