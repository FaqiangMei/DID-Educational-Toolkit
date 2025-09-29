import express from "express";
const app = express();
app.use(express.json());

// Serve static files from web directory
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../web')));

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

// Root health/info endpoint
app.get('/', (_req, res) => {
  res.json({
    service: 'issuer',
    endpoints: {
      issueVc: 'POST /issue-vc'
    },
    description: 'DID Educational Toolkit - Issuer service'
  });
});

app.listen(5100, () => console.log("✅ Issuer running at http://localhost:5100"));
