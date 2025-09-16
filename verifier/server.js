import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

let lastChallenge = null;

app.get("/generate-challenge", (req, res) => {
  lastChallenge = Math.random().toString(36).slice(2, 12);
  res.json({ challenge: lastChallenge });
});

app.post("/verify-vp", (req, res) => {
  const { vp } = req.body;
  if (!vp) return res.status(400).json({ error: "No VP provided" });

  if (vp.claim && vp.claim.age >= 18) {
    return res.json({ success: true, message: "验证通过 ✅" });
  }
  res.json({ success: false, message: "验证失败 ❌" });
});

app.listen(5002, () => console.log("✅ Verifier 运行在 http://localhost:5002"));
