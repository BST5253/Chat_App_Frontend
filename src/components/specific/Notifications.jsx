import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material';
import React, { memo } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc';
import { useErrors } from '../../hooks/hook';

const Notifications = () => {

    const dispatch = useDispatch();
    const { isNotification } = useSelector((state) => state.misc);
    const { isLoading, isError, error, data } = useGetNotificationsQuery();
    const [acceptRequest] = useAcceptFriendRequestMutation();

    const friendRequestHandler = async ({ _id, accept }) => {
        dispatch(setIsNotification(false));
        try {
            const res = await acceptRequest({ requestId: _id, accept });
            if (res.data?.success) {
                toast.success(res.data?.message);
            } else {
                toast.error(res.data?.message || "Something went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const closeHandler = () => dispatch(setIsNotification(false));

    useErrors([{
        isError,
        error,
    }]);

    return (
        <Dialog open={isNotification} onClose={closeHandler}>
            <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
                <DialogTitle>Notifications</DialogTitle>
                {isLoading ?
                    (<Skeleton />)
                    :
                    <>
                        {data?.requests?.length > 0 ?
                            (
                                data?.requests?.map(({ sender, _id }) => (
                                    <NotificationItem
                                        key={_id}
                                        sender={sender}
                                        _id={_id}
                                        handler={friendRequestHandler}
                                    />
                                ))
                            )
                            :
                            <Typography textAlign={"center"}>
                                No Notifications
                            </Typography>
                        }
                    </>
                }
            </Stack>
        </Dialog>
    );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
    const { name, avatar } = sender;
    return (
        <ListItem>
            <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"1rem"}
                width={"100%"}
            >
                <Avatar src={avatar} />

                <Typography
                    variant="body1"
                    sx={{
                        flexGlow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        width: "100%",
                    }}
                >
                    {`${name} sent you a friend request.`}
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                >
                    <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
                    <Button color="error" onClick={() => handler({ _id, accept: false })}>
                        Reject
                    </Button>
                </Stack>
            </Stack>
        </ListItem>
    );
});

export default Notifications;