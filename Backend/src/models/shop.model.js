"use strict";
const { Schema, model } = require("mongoose");
// Erase if already required
const DOCUMENT_NAME = "Shop";
const COLLECTION_NAME = "Shops";
const shopSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 150,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);

// Erase if already required
