import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import sequelize from "./config/db.config.js";



import categoryRoutes from "./routes/category.route.js";
import contactRoutes from "./routes/contact.route.js";
import jobPostRoutes from "./routes/jobPost.route.js";
import reviewRoutes from "./routes/review.route.js";


const app = express();
const PORT = process.env.PORT || 8000;




// Middleware
app.use(express.json({ limit: "150mb" }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Connect database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

// Table creation
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables created");
  })
  .catch((error) => {
    console.error("Unable to create tables: ", error);
  });





// Main Routes
app.use("/contact", contactRoutes);
app.use("/review", reviewRoutes);
app.use("/category", categoryRoutes);
app.use("/jobpost", jobPostRoutes);


// Run server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});