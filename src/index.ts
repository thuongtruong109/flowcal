import App from "./configs/app.config";

import AdminColorsRouter from "./modules/admin/color/route.colors";
import AdminStatsRouter from "./modules/admin/stat/route.stats";
import AdminTagsRouter from "./modules/admin/tag/route.tag";
import AdminStatusRouter from "./modules/admin/status/route.status";
import AdminUsersRouter from "./modules/admin/user/route.user";

import AuthRouter from "./modules/user/auth/auth.route";
import KanbanRouter from "./modules/user/kanban/kanban.route";
import EventRouter from "./modules/user/event/route.event";
import CardRouter from "./modules/user/card/card.route";
import ProjectRouter from "./modules/user/project/project.route";
import ResourceRouter from "./modules/user/resource/route.resource";
import TagsRouter from "./modules/user/tag/route.tag";
import StatusRouter from "./modules/user/status/route.status";
import ProfileRouter from "./modules/user/profile/route.profile";
import NoteRouter from "./modules/user/note/note.route";

const app = new App(
  [
    new AdminStatsRouter(),
    new AdminUsersRouter(),
    new AdminTagsRouter(),
    new AdminColorsRouter(),
    new AdminStatusRouter(),
  ],
  [
    new AuthRouter(),
    new ResourceRouter(),
    new ProjectRouter(),
    new KanbanRouter(),
    new CardRouter(),
    new EventRouter(),
    new StatusRouter(),
    new TagsRouter(),
    new ProfileRouter(),
    new NoteRouter(),
  ],
);

app.listen();

process.on("SIGINT", app.onCloseSignal);
process.on("SIGTERM", app.onCloseSignal);
