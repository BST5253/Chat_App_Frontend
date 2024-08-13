import { useInputValidation } from '6pp';
import { Search as SearchIcon } from '@mui/icons-material';
import {
    Dialog,
    DialogTitle,
    InputAdornment,
    List,
    Stack,
    TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/hook';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { setIsSearch } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';


const Search = () => {
    const dispatch = useDispatch();
    const { isSearch } = useSelector(state => state.misc);

    const [searchUser] = useLazySearchUserQuery();
    const [sendFriendRequest, isLoading] = useAsyncMutation(useSendFriendRequestMutation);
    const search = useInputValidation("");
    const [users, setUsers] = useState([]);

    const searchCloseHandler = () => dispatch(setIsSearch(false));

    const addFriendHandler = async (id) => {
        await sendFriendRequest("Sending friend request...", { userId: id });
        searchCloseHandler();
    };

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            try {
                const { data } = await searchUser(search.value);
                setUsers(data?.users);
            } catch (err) {
                console.log(err);
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [search.value]);

    return (
        <Dialog open={isSearch} onClose={searchCloseHandler}
            sx={{
                width: "100%",
            }}

        >
            <Stack p={"2rem"} direction={"column"} width={{ xs: "100%", md: "25rem" }} >
                <DialogTitle textAlign={"center"}>Find People</DialogTitle>
                <TextField
                    label=""
                    value={search.value}
                    onChange={search.changeHandler}
                    variant='outlined'
                    size="small"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <List>
                    {users.map(user => (
                        <UserItem
                            key={user?._id}
                            user={user}
                            handler={addFriendHandler}
                            handlerIsLoading={isLoading}
                        />
                    ))}
                </List>
            </Stack>
        </Dialog>
    );
};

export default Search;