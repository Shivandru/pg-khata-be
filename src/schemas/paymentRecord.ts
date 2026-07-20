import { z } from 'zod';

const paymentStatusEnum = z.enum(['pending', 'paid']);
const MONTH = z.templateLiteral(["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]);

const paymentRecordSchema = z.object({
  paymentId: z.string(),
  tenancyId: z.string().min(2),
  month: MONTH,
  amountDue: z.number().nonnegative(),
  amountPaid: z.number().nonnegative().default(0),
  status: paymentStatusEnum.default('pending'),
  paidOn: z.date(),
});

// POST /properties/:propertyId/payments/generate
const generatePaymentsSchema = z.object({
  month: MONTH,
});

// PUT /payments/:id — this is the manual-entry seam today.
// Later, the Rails payment service (or a webhook handler you add) can
// call this exact same shape, so nothing else in the app needs to change.
const updatePaymentSchema = z
  .object({
    amountPaid: z.number().nonnegative(),
    status: paymentStatusEnum,
    paidOn: z.date(),
  })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided'
  );

module.exports = {
  paymentRecordSchema,
  paymentStatusEnum,
  generatePaymentsSchema,
  updatePaymentSchema,
};