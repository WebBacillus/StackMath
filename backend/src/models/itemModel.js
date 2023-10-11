import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  diff: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },

});

const rankSchema = new mongoose.Schema({
  student_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});


const Item = mongoose.model("quiz", itemSchema);
const Rank = mongoose.model("rank", rankSchema);

export {Item, Rank};
