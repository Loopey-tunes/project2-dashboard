const { mongoose, Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    fullName: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      enum: [
        "Production",
        "Human Resources",
        "Financial",
        "Executive Management",
        "Information and Technology",
        "Quality Assurance",
        "Sales",
        "Marketing",
      ],
      required: true,
    },
    role: {
      type: String,
      enum: ["Manager", "Administrator", "Member"],
      required: true,
    },
    telephone: {
      type: String,
    },
    location: {
      type: String,
      enum: ["London", "Lisbon", "Berlin"],
    },
   /*  directLeader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, */
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
