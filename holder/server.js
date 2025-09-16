import express from "express";
const app = express();
app.use(express.json());

let myVC = null;

app.post("/store-vc", (req, res) => {
  myVC = req.body.vc;
  res.json({ success: true, stored: myVC });
});

app.get("/present-vp", (req, res) => {
  if (!myVC) return res.status(400).json({ error: "No VC stored" });
  const vp = { vp: myVC, proof: "fake-proof" };
  res.json(vp);
});

app.listen(5001, () => console.log("✅ Holder 运行在 http://localhost:5001"));
