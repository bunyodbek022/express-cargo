import { adminRouter } from "./admin.route.js";
import { authRouter } from "./auth.route.js";
import { clientRouter } from "./client.route.js";
import { currencyTypeRouter } from "./currencyTye.route.js";
import { operationRouter } from "./operation.route.js";
import { orderRouter } from "./order.route.js";
import { orderProductRouter } from "./orderProduct.route.js";
import { productRouter } from "./product.route.js";
import { Router } from "express";

const mainRouter = Router()

mainRouter.use("/admin", adminRouter);
mainRouter.use("/client", clientRouter);
mainRouter.use("/currency", currencyTypeRouter);
mainRouter.use("/operation", operationRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/order-product", orderProductRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/auth", authRouter)
export {mainRouter}