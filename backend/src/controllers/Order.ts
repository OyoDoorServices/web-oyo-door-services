import { NextFunction, Request, Response } from "express";
import { Order } from "../modals/Order";
import { User } from "../modals/User";

export const newOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.params.id;
    const {
      serviceIds,
      address,
      city,
      state,
      pincode: orderPincode,
    } = req.body;

    const distributor = await User.findOne({
      role: { $in: ["admin", "distributor"] },
      pincode: orderPincode,
    });

    if (!distributor) {
      return res.status(404).json({
        success: false,
        message: "No distributor found with the given pincode",
      });
    }

    const distributorId = distributor._id;

    const newOrder = new Order({
      userId,
      distributorId,
      serviceIds,
      address,
      city,
      state,
      pincode: orderPincode,
    });

    await newOrder.save();

    return res.status(201).json({
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Order not Found",
      });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Order deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDistributorOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id, status, page = 1 } = req.query;
    const limit = 12;
    const skip = (Number(page) - 1) * limit;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Spam detected",
      });
    }

    const filter: any = { distributorId: id };
    if (status) {
      filter.status = status;
    }

    const totalOrders = await Order.countDocuments(filter);
    const distributorOrders = await Order.find(filter)
      .populate<{ userId: { name: string; phoneNumber: number; photo: string } }>(
        "userId",
        "name phoneNumber photo"
      )
      .populate<{ serviceIds: { name: string }[] }>("serviceIds", "name")
      .limit(limit)
      .skip(skip);

    if (distributorOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this Distributor",
      });
    }

    const formattedOrders = distributorOrders.map((order) => ({
      orderDate: order.orderDate,
      status: order.status,
      orderId:order._id,
      user: {
        name: order.userId?.name,
        phoneNumber: order.userId?.phoneNumber,
        photo: order.userId?.photo,
      },
      services: order.serviceIds.map((service) => service.name),
      address: order.address,
      city: order.city,
      state: order.state,
      pincode: order.pincode,
    }));

    return res.status(200).json({
      success: true,
      distributorOrders: formattedOrders,
      currentPage: Number(page),
      totalPages: Math.ceil(totalOrders / limit),
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(404).json({
        success: false,
        message: "Spam detected",
      });
    }

    const filter: {
      userId: string;
    } = { userId: id as string };


    const totalOrders = await Order.countDocuments(filter);

    const userOrders = await Order.find(filter)
      .populate<{ serviceIds: { name: string; photo: string }[] }>(
        "serviceIds",
        "name photo"
      )

    if (userOrders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found for the user",
      });
    }

    const formattedOrders = userOrders.map((order) => ({
      orderDate: order.orderDate,
      status: order.status,
      services: order.serviceIds.map((service) => ({
        name: service.name,
        photo: service.photo,
      })),
    }));

    return res.status(200).json({
      success: true,
      orders: formattedOrders,
    });
  } catch (error) {
    console.log(error);
  }
};

export const changeOrderStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const validStatuses = ["processing", "processed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Allowed statuses are 'processing' or 'processed'",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    console.log(error);
  }
};
