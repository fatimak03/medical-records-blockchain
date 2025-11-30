# Medical Records Blockchain (FINAL PROJECT INFR-4900U)

A lightweight blockchain system for managing basic medical records.

This is a simple educational project that explores how blockchain concepts like hashing and immutability can be applied to healthcare data.

## Project Overview

Built by:
- **Frontend**: Fatima Khan (100812028)
- **Backend**: Zuhaib Shafi (100820952)

### Frontend Files

- `index.html` – landing page
- `addRecord.html` – form to submit new patient records
- `viewChain.html` – shows the current blockchain state
- `validate.html` – lets you verify the chain
- `styles.css` – basic styling
- `ui.js` – connects the UI to backend logic

### Backend File

- `blockchain.js`  
  Contains:
  - Block and Blockchain classes
  - Hashing logic (basic implementation)
  - Genesis block setup
  - Block linking & validation

## Getting Started

You don't need to install anything.

1. Clone or download the repo
2. Open `index.html` in your browser
3. Use the top nav to add/view/validate records

## Features

- Basic append-only blockchain structure
- Simple record integrity check via hash links
- Client-side validation
- Editable UI with working forms
- You can break the chain manually to see validation fail
