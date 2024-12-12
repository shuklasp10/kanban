export interface ItemType {
    id: number;
    text: string;
    checked: boolean;
}

var counter: number = 0

export interface BoardType {
    id: number;
    name: string;
    items: ItemType[];
}

export function getId(): number {
    return counter++
}

export const board: BoardType[] = [
    {
        id: getId(),
        name: "Pending",
        items: [
            { id: getId(), text: "Add heading", checked: false },
            { id: getId(), text: "Add paragraph", checked: false },
        ],
    },
    {
        id: getId(),
        name: "In Progress",
        items: [
            { id: getId(), text: "Add link", checked: false },
            { id: getId(), text: "Add image", checked: false },
        ],
    },
    {
        id: getId(),
        name: "Completed",
        items: [
            { id: getId(), text: "start kanban", checked: true },
            { id: getId(), text: "Set workspace", checked: true },
        ],
    },
];
