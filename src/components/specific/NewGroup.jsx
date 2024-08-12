import { useInputValidation } from '6pp';
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import UserItem from '../shared/UserItem';
import { useAvailableFriendsQuery, useChatDetailsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewGroup } from '../../redux/reducers/misc';
import toast from 'react-hot-toast';

const NewGroup = () => {
    const dispatch = useDispatch();

    const { isNewGroup } = useSelector((state) => state.misc);

    const { isError, isLoading, error, data } = useAvailableFriendsQuery();
    const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

    const errors = [{ isError, error }];

    useErrors(errors);

    const groupName = useInputValidation("");

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

    const submitHandler = () => {
        if (!groupName.value) return toast.error("Group name is required");

        if (selectedMembers.length < 2) return toast.error("Select at least 3 members");

        newGroup("Creating New Group...",
            { name: groupName.value, members: selectedMembers }
        );
        closeHandler();
    };


    const closeHandler = () => dispatch(setIsNewGroup(false));

    return (
        <Dialog open={isNewGroup} onClose={closeHandler} >
            <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"} spacing={"2rem"}>
                <DialogTitle
                    textAlign={"center"}
                    variant='h4'
                >
                    New Group
                </DialogTitle>
                <TextField
                    label={"Group Name"}
                    value={groupName.value}
                    onChange={groupName.changeHandler}
                />

                <Typography>Members</Typography>

                <Stack>
                    {isLoading ? <Skeleton /> :
                        data?.friends?.map((i) => (
                            <UserItem
                                isAdded={selectedMembers?.includes(i._id)}
                                key={i._id}
                                user={i}
                                handler={selectMemberHandler}
                            />
                        ))
                    }
                </Stack>
                <Stack direction={"row"} justifyContent={"space-evenly"}>
                    <Button
                        variant={"text"}
                        color='error'
                        size='large'
                        onClick={closeHandler}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={"contained"}
                        size='large'
                        onClick={submitHandler}
                        disabled={isLoadingNewGroup}
                    >
                        Create
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default NewGroup;