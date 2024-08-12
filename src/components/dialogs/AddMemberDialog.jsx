import { Button, Dialog, DialogTitle, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { setIsAddMember } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ({ chatId }) => {
    const dispatch = useDispatch();
    const { isAddMember } = useSelector(state => state.misc);


    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);

    const { isError, isLoading, error, data } = useAvailableFriendsQuery(chatId);

    const [selectedMembers, setSelectedMembers] = useState([]);


    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) => {
            if (prev.includes(id)) {
                return prev.filter((i) => i !== id);
            } else {
                return [...prev, id];
            }
        });
    };
    const closeHandler = () => {
        dispatch(setIsAddMember(false));
        setSelectedMembers([]);
    };

    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", { chatId, members: selectedMembers });
        closeHandler();
    };


    useErrors([{ isError, error }]);

    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack p="2rem" width={"20rem"} spacing={"2rem"}>
                <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
                <Stack>
                    {data?.friends?.length > 0 ? (
                        data?.friends?.map((user) => (
                            <UserItem
                                key={user._id}
                                user={user}
                                handler={selectMemberHandler}
                                isAdded={selectedMembers?.includes(user._id)}
                            />
                        ))
                    )
                        :
                        (
                            <Typography textAlign="center">
                                No Friends
                            </Typography>
                        )
                    }
                </Stack>
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-evenly"}
                >
                    <Button color="error" onClick={closeHandler}>Cancel</Button>
                    <Button
                        variant="contained"
                        disabled={isLoadingAddMembers}
                        onClick={addMemberSubmitHandler}
                    >
                        Submit Changes
                    </Button>
                </Stack>
            </Stack>

        </Dialog>
    );
};

export default AddMemberDialog;