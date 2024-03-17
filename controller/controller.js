require("dotenv").config();
require("../db").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authentication");
const User = require("../model/users");
const Books = require("../model/books");
const app = express();

    exports.getBooks =  async (req, res) => {
        try {
            const books = await Books.find()
            res.json(books);
            
        } catch (error) {
            console.error(error)
            res.status(500).json({error:'Internal Server Error'});
        }
    }
