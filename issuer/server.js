import express from "express";
const app = express();
app.use(express.json());

app.post("/issue-vc", (req, res) => {
  const { subjectDid, claim } = req.body;
  const vc = {
    issuer: "did:ethr:0x1234",
    subject: subjectDid,
    claim,
    issuedAt: new Date().toISOString(),
  };
  res.json({ vc });
});

app.listen(5100, () => console.log("✅ Issuer 运行在 http://localhost:5000"));
