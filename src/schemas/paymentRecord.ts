import { z } from 'zod';
import { id, ID_PREFIXES, dateOnly, monthOnly } from '../utils/common.ts';

export const paymentStatusEnum = z.enum(['pending', 'paid']);

export const paymentRecordSchema = z.object({
  paymentId: id(ID_PREFIXES.payment),
  tenancyId: id(ID_PREFIXES.tenancy),
  month: monthOnly,
  amountDue: z.number().nonnegative(),
  amountPaid: z.number().nonnegative().default(0),
  status: paymentStatusEnum.default('pending'),
  paidOn: dateOnly.nullable().default(null),
});

// POST /properties/:propertyId/payments/generate
export const generatePaymentsSchema = z.object({
  month: monthOnly,
});

// PUT /payments/:id — this is the manual-entry seam today.
// Later, the Rails payment service (or a webhook handler you add) can
// call this exact same shape, so nothing else in the app needs to change.
export const updatePaymentSchema = z
  .object({
    amountPaid: z.number().nonnegative(),
    status: paymentStatusEnum,
    paidOn: dateOnly.nullable(),
  })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field must be provided'
  );