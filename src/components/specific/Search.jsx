import { useInputValidation } from '6pp';
import {
    Dialog,
    DialogTitle,
    InputAdornment,
    List,
    ListItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import UserItem from '../shared/UserItem';
import { sampleUsers } from '../../constants/sampleData';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import toast from 'react-hot-toast';
import { useAsyncMutation } from '../../hooks/hook';


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
        <Dialog open={isSearch} onClose={searchCloseHandler}>
            <Stack p={"2rem"} direction={"column"} width={"25rem"}>
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