import app from "./app";
import { connectDb } from "./Database/ConnectDb";
import { PORT } from "./configs/env.config";


app.listen(PORT, async() => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDb();
});