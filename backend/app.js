import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {Item, Rank} from "./models/itemModel.js";

import dotenv from "dotenv";

dotenv.config({path: './config/config.env'});

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
  })
  .catch(err => {
    console.error('เกิดข้อผิดพลาดในการเชื่อมต่อกับ MongoDB:', err);
  });
  
const app = express();
const router = express.Router();

app.use(cors());
app.set("view engine", "html");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/easy", async (req, res) => {
  const items = await Item.aggregate([
    { $match: { diff : "easy"} },
    { $sample: { size: 1 } }
  ]);
  res.status(200).json(items);
});

router.get("/medium", async (req, res) => {
  const items = await Item.aggregate([
    { $match: { diff : "medium"} },
    { $sample: { size: 1 } }
  ]);
  res.status(200).json(items);
});

router.get("/hard", async (req, res) => {
  const items = await Item.aggregate([
    { $match: { diff : "hard"} },
    { $sample: { size: 1 } }
  ]);
  res.status(200).json(items);
});

router.get("/rank", async(req, res) => {
  const rank = await Rank.find().sort({"score" : -1})
  res.status(200).json(rank);
});

router.post("/rank", async(req, res) => {
  try {
    const newRank = new Rank(req.body);
    console.log(req.body);

    const items = await Rank.find({student_id : req.body.student_id}).maxTimeMS(1000 * 1000 * 1000);
    console.log(items);
    console.log(newRank);
    if(items.length == 0){
        console.log('save');
        await newRank.save();
    }
    if(items[0]?.student_id == newRank.student_id) {
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

app.use("/api", router);

export default app;
