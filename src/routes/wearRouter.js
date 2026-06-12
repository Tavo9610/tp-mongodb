import { Router } from "express";
import { getWears, getWear, createWear, updateWear, deleteWear } from "../controllers/wearControllers.js";

const WearRouter = Router()

WearRouter.get("/", getWears)
WearRouter.get("/:id", getWear)
WearRouter.post("/", createWear)
WearRouter.put("/:id", updateWear)
WearRouter.delete("/:id", deleteWear)

export { WearRouter }




