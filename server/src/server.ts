import app from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
  });
};

startServer();
