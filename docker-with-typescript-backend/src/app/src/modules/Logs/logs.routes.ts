import express from "express";
import {logsController} from "./logs.controller";

const router = express.Router();

// All Errors
router.get("/errors", logsController.getAllErrorLogs);

// All Successes
router.get("/successes", logsController.getAllSuccessLogs);

// Specific Error
router.get("/errors/:logFile", logsController.getSpecificErrorLog);

// Specific Success
router.get("/successes/:logFile", logsController.getSpecificSuccessLog);

export const LogsRoutes = router;
