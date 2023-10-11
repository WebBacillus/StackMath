import express from "express";

const app = express();    
                     
app.use(express.static("public"));

const PORT = 3221;

// app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});
