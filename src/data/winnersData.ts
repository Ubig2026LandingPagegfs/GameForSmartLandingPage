export interface Winner {
    id: number;
    name: string;
    game: string;
    img?: string;
    time: string;
}

export const winnersData: Winner[] = [
    {
        id: 1,
        name: "Cristofer Dorwart",
        game: "Crazy Race",
        img: "msg-sender1.png",
        time: "2 minutes ago"
    },
    {
        id: 2,
        name: "Sajin Tamang",
        game: "Quiz Rush",
        img: "msg-sender2.png",
        time: "5 minutes ago"
    },
    {
        id: 3,
        name: "Junaid Khan",
        game: "Memory Quiz",
        img: "msg-sender3.png",
        time: "12 minutes ago"
    },
    {
        id: 4,
        name: "Alex Thompson",
        game: "Space Quiz",
        img: "msg-sender4.png",
        time: "20 minutes ago"
    },
    {
        id: 5,
        name: "Sarah Wilson",
        game: "Crazy Race",
        img: "msg-sender2.png",
        time: "45 minutes ago"
    },
    {
        id: 6,
        name: "Mike Johnson",
        game: "Quiz Rush",
        img: "msg-sender3.png",
        time: "1 hour ago"
    },
    {
        id: 7,
        name: "Emily Davis",
        game: "Space Quiz",
        img: "msg-sender1.png",
        time: "3 hours ago"
    },
    {
        id: 8,
        name: "David Chen",
        game: "Memory Quiz",
        img: "msg-sender4.png",
        time: "5 hours ago"
    }
];
