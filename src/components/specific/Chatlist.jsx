import { Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../shared/ChatItem';

const Chatlist = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [{
        chatId: "",
        count: 0,
    }],
    handleDeleteChat
}) => {
    return (
        <Stack
            width={w}
            direction={"column"}
            sx={{
                overflow: "auto",
                height: "100%",
            }}
        >
            {
                chats?.map((chat, index) => {
                    const { avatar, _id, name, groupChat, members } = chat;
                    const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);
                    const isOnline = members?.some((member) => onlineUsers?.includes(member));
                    return <ChatItem
                        index={index}
                        avatar={avatar}
                        name={name}
                        _id={_id}
                        groupChat={groupChat}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        sameSender={_id === chatId}
                        handleDeleteChat={handleDeleteChat}
                        key={_id}
                    />;
                })
            }
        </Stack>
    );
};

export default Chatlist;