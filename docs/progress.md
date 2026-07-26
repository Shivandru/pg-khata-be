# PG Management System - Project Progress

## Property Module
- [x] Initialize Module Development
- [x] Implement Auth Middleware (`src/middlewares/auth.ts`)
- [x] Export Response Schema (`src/schemas/property.ts`)
- [x] Create Repository (`src/repository/property.repository.ts`)
- [x] Create Service (`src/services/property.service.ts`)
- [x] Create Controller (`src/controllers/property.controller.ts`)
- [x] Create Routes (`src/routes/property.routes.ts`)
- [x] Centralize Routing (added `src/routes/index.ts` to export single router)
- [x] Refactor Status Codes (replaced manual status codes with `HttpStatusCodes` enum)
- [x] Mount central router in `src/index.ts`

## Room & Bed Module
- [x] Create Room and Bed Repositories (`src/repository/room.repository.ts`, `src/repository/bed.repository.ts`)
- [x] Create Room and Bed Services with validations & deletion checks (`src/services/room.service.ts`, `src/services/bed.service.ts`)
- [x] Create Room and Bed Controllers (`src/controllers/room.controller.ts`, `src/controllers/bed.controller.ts`)
- [x] Create Room and Bed Routes (`src/routes/room.routes.ts`, `src/routes/bed.routes.ts`)
- [x] Register Room and Bed routes in `src/routes/index.ts`


