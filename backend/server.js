import mongoose from "mongoose";
import app from "./app.js";
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
  


process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  console.log(err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(`${err}`);
  server.close(() => {
    process.exit(1);
  });
});

const PORT = 3222;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server ready at http://localhost:${PORT}`);
});
