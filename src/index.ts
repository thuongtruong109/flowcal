import App from "./configs/app.config";

import ColorsRouter from "./routes/admin/colors.router";
import StatisticalRouter from "./routes/admin/statistical.router";
import TagsRouter from "./routes/admin/tags.router";
import UsersRouter from "./routes/admin/users.router";

import AuthRouter from "./routes/user/auth.router";
import BoardRouter from "./routes/user/board.router";
import CardRouter from "./routes/user/card.router";
import EventRouter from "./routes/user/event.router";
import ProjectRouter from "./routes/user/project.router";
import SettingRouter from "./routes/user/setting.router";

const app = new App(
  [
    new AuthRouter(),
    new SettingRouter(),
    new ProjectRouter(),
    new BoardRouter(),
    new CardRouter(),
    new EventRouter(),
  ],
  [
    new StatisticalRouter(),
    new UsersRouter(),
    new TagsRouter(),
    new ColorsRouter(),
  ]
);

app.listen();

process.on("SIGINT", app.onCloseSignal);
process.on("SIGTERM", app.onCloseSignal);
