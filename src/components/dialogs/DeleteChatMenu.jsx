import { Menu, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const DeleteChatMenu = ({ dispatch, deleteAnchorMenu }) => {
    const navigate = useNavigate();
    const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc);
    const [deleteChat, , deleteChatData] = useAsyncMutation(useDeleteChatMutation);
    const [leaveGroup, , leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);
    const isGroup = selectedDeleteChat.groupChat;

    const closeHamdler = () => {
        dispatch(setIsDeleteMenu(false));
        deleteAnchorMenu.current = null;
    };

    const leaveGroupHandler = () => {
        closeHamdler();
        leaveGroup("Leaving Group...", selectedDeleteChat.chatId);
    };
    const deleteChatHandler = () => {
        closeHamdler();
        deleteChat("Deleting Chat...", selectedDeleteChat.chatId);
    };

    useEffect(() => {
        if (deleteChatData || leaveGroupData) navigate("/");
    }, [deleteChatData, leaveGroupData]);

    return (
        <Menu
            open={isDeleteMenu}
            onClose={closeHamdler}
            anchorEl={deleteAnchorMenu.current}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
        >
            <Stack
                sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer",
                }}
                direction={"row"}
                alignItems={"center"}
                spacing={"0.5rem"}
                onClick={isGroup ? leaveGroupHandler : deleteChatHandler}
            >
                {isGroup ? (
                    <>
                        <ExitToAppIcon />
                        <Typography>Leave Group</Typography>
                    </>)
                    :
                    (<>
                        <DeleteIcon />
                        <Typography fontSize={"12px"}>Delete Chat and Unfriend</Typography>
                    </>)
                }

            </Stack>


        </Menu>
    );
};

export default DeleteChatMenu;