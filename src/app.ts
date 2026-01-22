import express from "express";
import cors from "cors";

import userRoutes from "./modules/user/user.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "OK" });
});

app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

export default app;
