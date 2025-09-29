
// DIDComm inbox: receive messages from Holder
import { handleDIDCommMessage } from '../agent/didcomm.js';

// In-memory message queue
const didcommMessages = [];

app.post('/didcomm-inbox', async (req, res) => {
  try {
    const result = await handleDIDCommMessage(req.body);
    didcommMessages.push({ receivedAt: new Date().toISOString(), ...req.body });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// List all received DIDComm messages
app.get('/didcomm-messages', (_req, res) => {
  res.json(didcommMessages);
});

import express from "express";
import axios from "axios";
const app = express();
app.use(express.json());

// Import OOB invitation generator
import { createOOBInvitation } from '../agent/didcomm.js';
// OOB Invitation API
app.get('/oob-invitation', async (_req, res) => {
  try {
    const invitation = await createOOBInvitation();
    res.json(invitation);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Serve static files from web directory
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, '../web')));

let lastChallenge = null;

app.get("/generate-challenge", (req, res) => {
  lastChallenge = Math.random().toString(36).slice(2, 12);
  res.json({ challenge: lastChallenge });
});

app.post("/verify-vp", (req, res) => {
  const { vp } = req.body;
  if (!vp) return res.status(400).json({ error: "No VP provided" });

  if (vp.claim && vp.claim.age >= 18) {
    return res.json({ success: true, message: "Verification passed ✅" });
  }
  res.json({ success: false, message: "Verification failed ❌" });
});

// Root health/info endpoint
app.get('/', (_req, res) => {
  res.json({
    service: 'verifier',
    lastChallenge: lastChallenge ? 'generated' : 'none',
    endpoints: {
      generateChallenge: 'GET /generate-challenge',
      verifyVp: 'POST /verify-vp'
    },
    description: 'DID Educational Toolkit - Verifier service'
  });
});

app.listen(5002, () => console.log("✅ Verifier running at http://localhost:5002"));
