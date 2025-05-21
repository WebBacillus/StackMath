import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {Item, Rank} from "./models/itemModel.js";

const app = express();

app.use(cors());
app.set("view engine", "html");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/easy", async (req, res) => {
  const items = await Item.aggregate([
    { $match: { diff : "easy"} },
    { $sample: { size: 1 } }
  ]);
  // console.log(items);
  // const items = await Item.find().sort({"Score" : -1}).limit(10);
  res.status(200).json(items);
});

app.get("/medium", async (req, res) => {
  const items = await Item.aggregate([
    { $match: { diff : "medium"} },
    { $sample: { size: 1 } }
  ]);
  // const items = await Item.find().sort({"Score" : -1}).limit(10);
  res.status(200).json(items);
});

app.get("/hard", async (req, res) => {
  const items = await Item.aggregate([
    { $match: { diff : "hard"} },
    { $sample: { size: 1 } }
  ]);
  // const items = await Item.find().sort({"Score" : -1}).limit(10);
  res.status(200).json(items);
});

app.get("/rank", async(req, res) => {
  const rank = await Rank.find().sort({"score" : -1})
  // console.log(rank);
  res.status(200).json(rank);
});

app.post("/rank", async(req, res) => {
  try {
    const newRank = new Rank(req.body);
    console.log(req.body);

    const items = await Rank.find({student_id : req.body.student_id}).maxTimeMS(1000 * 1000 * 1000);;
    console.log(items);
    console.log(newRank);
    if(items.length == 0){
        console.log('save');
        await newRank.save();
    }
    if(items[0].student_id == newRank.student_id) {
        console.log("matched");
        if(req.body.score > items[0].score){
            console.log('update');
            await Rank.findByIdAndUpdate(items[0]._id, req.body);
        }
    } 

    res.status(200).json({ message: "OK" });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).json({ error: "Bad Request" });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
});

//TODO ทำ req ranking

// app.post("/rank_update", async(req, res) => {
//     try {
//       const newItem = new Item(req.body);
//       console.log(newItem);
//       await newItem.save();

//       res.status(200).json({ message: "OK" });
//     } catch (err) {
//       if (err.name === "ValidationError") {
//         res.status(400).json({ error: "Bad Request" });
//       } else {
//         res.status(500).json({ error: "Internal server error." });
//       }
//     }
// })

export default app;
