import { z } from "zod";
import AppRouter from "./AppRouter.ts";
import { authMiddleware } from "../middlewares/auth.ts";
import RequestLogger from "../middlewares/RequestLogger.ts";
import { createValidator } from "../middlewares/validator.ts";
import { createTenancySchema, tenancySchema, vacateTenancySchema } from "../schemas/tenancy.ts";
import type { TenancyRegistrationController } from "../controllers/tenancyRegistration.controller.ts";
import { id, ID_PREFIXES } from "../utils/common.ts";
import type { VacateTenancyController } from "../controllers/vacateTenancy.controller.ts";

export default function createTenancyRegistrationRouter(
  controller: TenancyRegistrationController,
  vacateController: VacateTenancyController
) {
  const router = new AppRouter();
  const validate = createValidator();

  const tenancyIdParamSchema = z.object({
  tenancyId: id(ID_PREFIXES.tenancy),
});

  router.use("/", RequestLogger.getMiddleware("Tenancy Registration"));
  router.use("/", authMiddleware);

  router.post(
    "/register",
    validate.body(createTenancySchema),
    validate.response(tenancySchema),
    controller.register,
  );

  router.patch(
  "/:tenancyId/vacate",
  validate.params(tenancyIdParamSchema),
  validate.body(vacateTenancySchema),
  validate.response(tenancySchema),
  vacateController.vacate,
);

  return router;
}