# DID-Educational-Toolkit

## QuickStart (Minimal End-to-End Demo)

### 1. Start All Services

In the project root directory, run:

```bash
npm install
npm run dev
```

This will start Issuer (5100), Holder (5001), and Verifier (5002) services concurrently.

---

### 2. End-to-End Flow Example

#### Step 1: Issuer issues a VC

```bash
curl -X POST http://localhost:5100/issue-vc \
	-H 'Content-Type: application/json' \
	-d '{"subjectDid": "did:example:holder1", "claim": {"age": 20, "name": "Alice"}}'
```
Response:
```json
{"vc": {"issuer": "did:ethr:0x1234", "subject": "did:example:holder1", "claim": {"age": 20, "name": "Alice"}, "issuedAt": "..."}}
```

#### Step 2: Holder stores the VC

```bash
curl -X POST http://localhost:5001/store-vc \
	-H 'Content-Type: application/json' \
	-d '{"vc": { ...the vc from previous step... }}'
```

#### Step 3: Holder generates a VP

```bash
curl http://localhost:5001/present-vp
```
Response:
```json
{"vp": { ... }, "proof": "fake-proof"}
```

#### Step 4: Verifier verifies the VP

```bash
curl -X POST http://localhost:5002/verify-vp \
	-H 'Content-Type: application/json' \
	-d '{"vp": { ...the vp from previous step... }}'
```
Response:
```json
{"success": true, "message": "Verification passed ✅"}
```

---

## Notes
- This is the minimal runnable DID three-party demo flow, to help understand VC issuance, storage, and verification.
- DIDComm v2.1 messaging will be integrated in future versions.

---

## FAQ

**Q: npm run dev fails or some services do not start?**

A: Make sure no other processes are using ports 5100, 5001, or 5002. You can kill processes using these ports with:

```bash
# Example for port 5100
lsof -i :5100
# Then kill the process by PID
kill -9 <PID>
```

**Q: Dependency installation fails?**

A: Make sure you are using Node.js v16 or above. Try deleting node_modules and reinstalling:

```bash
rm -rf node_modules package-lock.json
npm install
```

**Q: How to stop all services?**

A: Press Ctrl+C in the terminal where you ran `npm run dev`.

**Q: How to change service ports?**

A: Edit the port numbers in `issuer/server.js`, `holder/server.js`, and `verifier/server.js` as needed.