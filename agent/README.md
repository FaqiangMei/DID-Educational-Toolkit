# DIDComm Agent Module

This directory is reserved for the implementation of DIDComm v2.1 messaging and agent logic.

## Goals
- Replace HTTP API calls between Issuer, Holder, and Verifier with secure DIDComm v2.1 messages.
- Implement minimal Out-of-Band (OOB) invitation, session establishment, VP request, and VP presentation flows.
- Provide a reusable agent wrapper (e.g., @edu/agent) for DIDComm messaging.

## Next Steps
- Research and select a DIDComm v2.1 library for Node.js (e.g., didcomm-js, Veramo DIDComm plugin).
- Design the minimal message flow and agent API.
- Implement and test DIDComm-based communication between services.
