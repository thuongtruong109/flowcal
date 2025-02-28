import type { Server } from "node:http";
import path from "node:path";
import { envConf } from "./env.config";
import ErrorHandler from "../middlewares/error.middleware";
import { rateLimiterMiddleware } from "../middlewares/rate.middleware";
import type { IRouter } from "../types";
import { capitializeString } from "../utils";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Request, type Response, type Express } from "express";
import fs from "fs-extra";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import pino, { type Logger } from "pino";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import ConnectDB from "./db.config";

class App {
  public app: Express;
  public logger: Logger;
  private _signal = {} as Server;

  constructor(userRoutes: IRouter[], adminRoutes: IRouter[]) {
    this.app = express();
    this.logger = pino({ name: "Logger" });
    this._initMiddlewares();
    this._initRoutes(userRoutes, adminRoutes);
    this._initSwagger();
    ConnectDB();
  }

  private _writeLogs(fileName: string) {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, `../../logs/${fileName}.log`),
      { flags: "a" }
    );
    return accessLogStream;
  }

  private _initMiddlewares() {
    this.app.disable("x-powered-by");
    this.app.disable("etag");
    this.app.set("trust proxy", true);
    this.app.use(
      cors<Request>({
        origin: envConf.corsOrigin,
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "X-Access-Token",
          "Authorization",
        ],
        credentials: true,
        methods: "GET,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 200,
      })
    );
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(helmet.noSniff());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.xssFilter());
    this.app.use(
      compression({
        level: 6,
        threshold: 50 * 1024,
        filter: (req, res) => {
          if (req.headers["x-no-compression"]) {
            return false;
          }
          return compression.filter(req, res);
        },
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(rateLimiterMiddleware);
    this.app.use(morgan("combined", { stream: this._writeLogs("access") }));
    this.app.use(express.static(path.join(__dirname, "../../public")));

    this.app.use(ErrorHandler);
  }

  private _initRoutes(userRoutes: IRouter[], adminRoutes: IRouter[]) {
    userRoutes.forEach((route: IRouter) => {
      this.app.use("/api", route.router);
    });
    adminRoutes.forEach((route: IRouter) => {
      this.app.use("/api/admin", route.router);
    });
  }

  private _initSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: capitializeString(envConf.dbName),
          version: "1.0.0",
          description: `The API documentation for ${envConf.dbName} server`,
          termsOfService: "http://example.com/terms/",
          contact: {
            name: "API Support",
            url: "http://www.example.com/support",
            email: "thuongtruong@proton.me",
          },
          license: {
            name: "Apache 2.0",
            url: "https://www.apache.org/licenses/LICENSE-2.0.html",
          },
          schemes: envConf.nodeEnv === "development" ? ["http"] : ["https"],
          server: [
            {
              url: "{protocol}://api.example.com",
              variables: {
                protocol: {
                  enum: ["http", "https"],
                  default: "https",
                },
              },
            },
          ],
        },
      },
      apis: ["swagger.yaml"],
    };
    const swaggerSpec = swaggerJSDoc(options);
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  public listen() {
    try {
      this._signal = this.app.listen(envConf.port, () => {
        console.log(
          `• Server (${envConf.nodeEnv}) listening on the port ${envConf.port}`
        );
      });
    } catch (error) {
      console.log("• Cannot connect to the server");
    }
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });
  }

  public getApp() {
    return this.app;
  }

  public onCloseSignal() {
    this.logger.info("sigint received, shutting down");
    this._signal.close(() => {
      this.logger.info("server closed");
      process.exit();
    });

    setTimeout(() => process.exit(1), 10000).unref();
  }
}

export default App;
