import type { ITag } from '../types'

export const ENTITY = {
    ROLE: "Role",
    USER: "User",
    EVENT: "Event",
    PROJECT: "Project",
    CATEGORY: "Category",
    BOARD: "Board",
    CARD: "Card",
    TAG: "Tag",
    STATUS: "Status",

    COLOR: "Color",
    // TODO: "Todo",
    // NOTE: "Note",
};

export const ROLE: Array<string> = ["admin", "user"];

export const CATEGORY: Array<string> = ["kanban", "todo", "note"];

export const STATUS: Array<string> = [
    "todo",
    "doing",
    "done",
    "cancelled",
    "archived",
    "in-progress",
    "completed",
    "pending",
    "rejected",
    "failed",
    "success",
]

export const TAG: Array<ITag> = [
    {
        name: "family",
        color: "#DDDDDA"
    },
    {
        name: "work",
        color: "#FFDCA2"
    },
    {
        name: "study",
        color: "#E4C7B7"
    },
    {
        name: "hobby",
        color: "#BCE6FF"

    },
    {
        name: "friend",
        color: "#F9E2AE"
    },
    {
        name: "secret",
        color: "#E8B7D4"
    }
];

export const COLOR: Array<string> = [
    "#DDDDDA",
    "#FFDCA2",
    "#E4C7B7",
    "#BCE6FF",
    "#F9E2AE",
    "#E8B7D4",
    "#E0ECDE",
    "#FFCAD4",
    "#CFF4D2",
    "#F5CEC7",
];

export const REFRESH_TOKEN = "refreshToken";