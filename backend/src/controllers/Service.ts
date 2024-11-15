import { NextFunction, Request, Response } from "express";
import { Service } from "../modals/Service";
import { Provider } from "../modals/Provider";

export const newServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { name, photo, description } = req.body;
    const { id } = req.query;
    let newService = await Service.create({ name, photo, description });
    let provider = await Provider.findOne({ distributorId: id });
    if (!provider) {
      provider = await Provider.create({
        distributorId: id,
        serviceIds: [newService._id],
      });
    } else {
      provider.serviceIds.push(newService._id);
      await provider.save();
    }

    return res.status(201).json({
      success: true,
      message: "Service created and linked to provider successfully.",
      service: newService,
    });
  } catch (error) {
    console.log(error);
  }
};
