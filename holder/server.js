import express from "express";
const app = express();
app.use(express.json());

// Serve static files from web directory
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../web')));

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

// Root health/info endpoint
app.get('/', (_req, res) => {
  res.json({
    service: 'holder',
    hasVC: !!myVC,
    endpoints: {
      storeVc: 'POST /store-vc',
      presentVp: 'GET /present-vp'
    },
    description: 'DID Educational Toolkit - Holder service'
  });
});

app.listen(5001, () => console.log("✅ Holder running at http://localhost:5001"));
