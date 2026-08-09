import { z } from 'zod';
export declare const paymentStatusEnum: z.ZodEnum<{
    pending: "pending";
    paid: "paid";
}>;
export declare const paymentRecordSchema: z.ZodObject<{
    paymentId: z.ZodString;
    tenancyId: z.ZodString;
    month: z.ZodString;
    amountDue: z.ZodNumber;
    amountPaid: z.ZodDefault<z.ZodNumber>;
    status: z.ZodDefault<z.ZodEnum<{
        pending: "pending";
        paid: "paid";
    }>>;
    paidOn: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const generatePaymentsSchema: z.ZodObject<{
    month: z.ZodString;
}, z.core.$strip>;
export declare const updatePaymentSchema: z.ZodObject<{
    amountPaid: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        paid: "paid";
    }>>;
    paidOn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=paymentRecord.d.ts.map