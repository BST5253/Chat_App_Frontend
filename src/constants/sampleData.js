export const sampleChats = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
        _id: "1",
        groupChat: false,
        members: ["1", "2"],
    },

    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "2",
        groupChat: true,
        members: ["1", "2"],
    },
];

export const sampleUsers = [
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Doe",
        _id: "1",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "2",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "3",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "4",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "5",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "6",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "7",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "8",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "9",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "10",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "11",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "12",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "John Boi",
        _id: "13",
    }
];

export const sampleNotifications = [
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Doe",
        },
        _id: "1",
    },
    {
        sender: {
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            name: "John Boi",
        },
        _id: "2",
    },
];

export const sampleMessage = [
    {
        attachments: [],
        content: "L*uda ka Message hai",
        _id: "sfnsdjkfsdnfkjsbnd",
        sender: {
            _id: "user._id",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
        attachments: [
            {
                public_id: "asdsad 2",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "",
        _id: "sfnsdjkfsdnfkdddjsbnd123",
        sender: {
            _id: "sdfsdfsdf",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments: [
            {
                public_id: "asdsad 2",
                url: "https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content: "Hello 123",
        _id: "sfnsdjkfsdnfkdddjsbnd",
        sender: {
            _id: "12345",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
];


export const dashBoardData = {
    users: [
        {
            name: "John Doe",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "1",
            username: "john_doe",
            friends: 50,
            groups: 5,
        },
        {
            name: "John Boi",
            avatar: "https://www.w3schools.com/howto/img_avatar.png",
            _id: "2",
            username: "john_boi",
            friends: 50,
            groups: 5,
        }
    ],
    chats: [
        {
            name: "LabadBass Group",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "1",
            groupChat: false,
            members: [
                { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
                { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Smith",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
            },
        },
        {
            name: "L*Da Luston Group",
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            _id: "2",
            groupChat: true,
            members: [
                { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
                { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
            ],
            totalMembers: 2,
            totalMessages: 20,
            creator: {
                name: "John Boi",
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
            },
        },
    ],

    messages: [
        {
            attachments: [],
            content: "L*uda ka Message hai",
            _id: "sfnsdjkfsdnfkjsbnd",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Chaman ",
            },
            chat: "chatId",
            groupChat: false,
            createdAt: "2024-02-12T10:41:30.630Z",
        },

        {
            attachments: [
                {
                    public_id: "asdsad 2",
                    url: "https://www.w3schools.com/howto/img_avatar.png",
                }
            ],
            content: "",
            _id: "sfnsdjkfsdnfkdddjsbnd",
            sender: {
                avatar: "https://www.w3schools.com/howto/img_avatar.png",
                name: "Chaman  2",
            },
            chat: "chatId",
            groupChat: true,
            createdAt: "2024-02-12T10:41:30.630Z",
        },
    ],
};