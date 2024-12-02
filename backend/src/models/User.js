const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendedor: { type: Boolean, required: true },
  ratings: {
    type: [
      {
        buyer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, maxlength: 500 },
        date: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
});

// Campo virtual para calcular a média das avaliações
userSchema.virtual("averageRating").get(function () {
  if (!this.ratings || this.ratings.length === 0) return 0;
  return (
    this.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
    this.ratings.length
  );
});

userSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("User", userSchema);
