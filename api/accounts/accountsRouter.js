const express = require("express");

const db = require("../../data/dbConfig");

const router = express.Router();

// GET accounts
router.get("/", (req, res) => {
    db.select("*").from("accounts")
    .then(accounts => res.status(200).json({ data: accounts }))
    .catch(error => res.status(500).json({ error: error.message }))
});

// GET account by ID
router.get("/:id", (req, res) => {
    db.select("*").from("accounts").where("id", req.params.id)
    .then(account => res.status(200).json({ data: account }))
    .catch(error => res.status(500).json({ error: error.message }))
});

// POST account
router.post("/", (req, res) => {
    const accountData = req.body;
    db.select("*").from("accounts").insert(accountData, "id")
    .then(ids => {
        const id = ids[0];
        db.select("*").from("accounts").where({ id }).first()
        .then(post => res.status(200).json({ data: post}))
        .catch(error => res.status(500).json({ error: error.message }))
    })});

// DELETE account
router.delete("/:id", (req, res) => {
    db.select("*").from("accounts").where("id", req.params.id).del()
    .then(num => res.status(200).json(num))
    .catch(error => res.status(500).json({ error: error.message }))
});

// PUT account
router.put("/:id", (req, res) => {
    const updatedAccount = req.body;
    db.select("*").from("accounts").where("id", req.params.id).update(updatedAccount)
    .then(count => count > 0 ? res.status(200).json({ message: "Account update successful"}) : res.status(500).json({ message: "No account with that ID found"})
    )});

module.exports = router;