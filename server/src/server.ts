import { app } from "./index";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running at port ${port}`));
