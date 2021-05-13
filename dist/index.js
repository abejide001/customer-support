"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("./src/config/databaseConfig");
const port = process.env.PORT || 9000;
const server = app_1.default.listen(port, () => {
    console.log(`App listening on ${port}`);
});
process.on("unhandledRejection", (_) => {
    server.close(() => {
        process.exit(1);
    });
});
process.on("SIGTERM", () => {
    console.log("SIGTERM received, Shutting down gracefully");
    server.close(() => {
        console.log("Process terminated");
    });
});
//# sourceMappingURL=index.js.map