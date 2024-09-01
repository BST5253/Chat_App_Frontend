/* eslint-disable react-hooks/rules-of-hooks */
import Title from '../shared/Title';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import Header from './Header';
import { Drawer, Grid, Skeleton } from '@mui/material';
import Chatlist from '../specific/Chatlist';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getSocket } from '../../socket';
import { incrementNotificationCount, setNewMessagesAlert } from '../../redux/reducers/chat';
import { ALERT, NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events';
import { getOrSaveFromLocalStorage } from '../../lib/features';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';

const AppLayout = () => (WrappedComponent) => {
    return (props) => {
        const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const socket = getSocket();

        const chatId = params.chatId;
        const deleteAnchorMenu = useRef(null);

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);
        const [onlineUsers, setOnlineUsers] = useState([]);

        const { data, isLoading, isError, error, refetch } = useMyChatsQuery("");

        useErrors([{ isError, error }]);

        useEffect(() => {
            getOrSaveFromLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
        }, [newMessagesAlert]);



        const handleDeleteChat = (e, chatId, groupChat) => {
            e.preventDefault();
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }));
            deleteAnchorMenu.current = e.currentTarget;
        };

        const handleMobileClose = () => dispatch(setIsMobile(false));

        const newMessageAlert = useCallback((data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [dispatch, chatId]);

        const newRequestListener = useCallback(() => {
            dispatch(incrementNotificationCount());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]);

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, []);

        const eventHandler = {
            [REFETCH_CHATS]: refetchListener,
            [NEW_REQUEST]: newRequestListener,
            [NEW_MESSAGE_ALERT]: newMessageAlert,
            [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandler);

        return (
            <>
                <Title />
                <Header />

                <DeleteChatMenu
                    dispatch={dispatch}
                    deleteAnchorMenu={deleteAnchorMenu}
                />

                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose} >
                        <Chatlist
                            w='70vw'
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                            onlineUsers={onlineUsers}
                            newMessagesAlert={newMessagesAlert}
                        />
                    </Drawer>
                )}
                <Grid container height={"calc(100dvh - 4rem)"}>
                    <Grid
                        item
                        sm={4}
                        md={3}
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                        }}
                        height="100%"
                    >
                        {
                            isLoading ? (<Skeleton />) :
                                (<Chatlist
                                    chats={data?.chats}
                                    chatId={chatId}
                                    handleDeleteChat={handleDeleteChat}
                                    onlineUsers={onlineUsers}
                                    newMessagesAlert={newMessagesAlert}
                                />)
                        }
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        height="100%"
                        sm={8}
                        md={5}
                        lg={6}
                    >
                        <WrappedComponent {...props} chatId={chatId} user={user} />
                    </Grid>
                    <Grid
                        item
                        md={4}
                        lg={3}
                        height="100%"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)",
                        }}
                    >
                        <Profile user={user} />
                    </Grid>
                </Grid>
            </>
        );
    };
};

export default AppLayout;