import { Wear } from "../models/WearModel.js";

const getWears = async (req, res) => {
  try {
    const userLogged = req.userLogged
    const filterWears = await Wear.find({ userId: userLogged.id }, { userId: 0 })
    res.json({
      success: true,
      data: filterWears,
      message: "Wears fetched successfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching wears" })
  }
}

const getWear = async (req, res) => {
  try {
    const id = req.params.id
    const foundWear = await Wear.findById(id, { userId: 0 })
    if (!foundWear) res.status(404).json({ error: "Not found" })
    res.json(foundWear)
  } catch (error) {
    res.status(400).json({ error: "Invalid ID format" })
  }
}

const createWear = async (req, res) => {
  try {
    const body = req.body
    const userLogged = req.userLogged

    const newWear = await Wear.create({
      name: body.name,
      price: body.price,
      size : body.size,
      stock: body.stock,
      available: body.stock > 0,
      userId: userLogged.id
    })

    newWear.save()

    // destructuring para eliminar el userId del objeto wearo y quedarnos con el resto de la data
    const { userId, ...publicDataWear } = newWear.toObject()

    res.json({
      success: true,
      data: publicDataWear,
      message: "Wear created successfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "Error creating wear" })
  }
}

const updateWear = async (req, res) => {
  try {
    const id = req.params.id
    const body = req.body

    const updatedWear = await Wear.findByIdAndUpdate(id, { ...body, available: body.stock > 0 }, { new: true, projection: { userId: 0 } })

    if (!updatedWear) {
      return res.status(404).json({ success: false, error: "Wear not found" })
    }

    res.json({
      success: true,
      data: updatedWear,
      message: "Wear updated successfully"
    })
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid ID format" })
  }
}

const deleteWear = async (req, res) => {
  try {
    const { id } = req.params

    const deletedWear = await Wear.findByIdAndDelete(id)

    if (!deletedWear) {
      return res.status(404).json({ success: false, error: "Wear not found" })
    }

    const wear = deletedWear.toObject()
    delete wear.userId

    const publicDataWear = { ...deletedWear }

    res.json({ success: true, data: wear, message: "Wear deleted successfully" })
  } catch (error) {
    res.status(400).json({ success: false, error: "Invalid ID format" })
  }
}

export { getWears, getWear, createWear, updateWear, deleteWear }
