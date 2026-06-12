import { Schema, model } from "mongoose"

const wearSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  size: { type: String, default: "Sin Talles especificados" },
  stock: { type: Number, default: 0 },
  available: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  versionKey: false,
  timestamps: true
})

const Wear = model("Wears", wearSchema)

export { Wear }


