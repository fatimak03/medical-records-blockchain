# medical-records-blockchain

Blockchain-Based Medical Records System

This project implements a simplified blockchain-based medical records system designed for educational purposes. The system demonstrates how patient records can be secured, validated, and shared across healthcare providers using blockchain principles such as immutability, decentralization, and cryptographic hashing.

The project consists of:

Frontend (Fatima Khan)

    index.html — homepage

    addRecord.html — form to add new medical records

    viewChain.html — display the blockchain

    validate.html — validate integrity of the chain

    styles.css — basic styling

    ui.js — handles user interaction & connects UI to backend functions

Backend (Zuhaib Shafi)

    blockchain.js — full blockchain implementation including:

    Block class

    Blockchain class

    SHA-256 hashing

    Genesis block creation

    Adding new blocks

    Chain validation

How to Run

    No installation is required. Simply:

        Download or clone the repository

        Open index.html in any browser

    Use the navigation menu to:

        Add medical records

        View the blockchain

        Validate the chain’s integrity

    Features Implemented

        Append-only blockchain structure

        Tamper-evident record storage

        Hash-based linking between blocks

        Data validation logic

        Simple UI for demonstration

        Ability to intentionally break the chain to show detection