import { useInputValidation } from '6pp';
import {
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { bgGradient } from '../../constants/color';
import { adminLogin, getAdmin } from '../../redux/thunk/admin';



const AdminLogin = () => {
    const dispatch = useDispatch();
    const { isAdmin } = useSelector(state => state.auth);
    const secretKey = useInputValidation("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    };

    useEffect(() => {
        dispatch(getAdmin());
    }, [dispatch]);

    if (isAdmin) return <Navigate to="/admin/dashboard" />;

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                background: bgGradient
            }}
        >
            <Container
                component={"main"}
                maxWidth={"xs"}
                sx={{
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Paper
                    elevation={3}
                    sx={{
                        height: "auto",
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >


                    <Typography variant="h5">Admin Login</Typography>
                    <form
                        style={{
                            width: "100%",

                        }}
                        onSubmit={submitHandler}
                    >
                        <TextField
                            required
                            fullWidth
                            label="Secret Key"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                        />
                        <Button
                            sx={{
                                marginTop: "1rem",
                            }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit">
                            Login
                        </Button>
                    </form>

                </Paper>
            </Container>
        </div>

    );
};

export default AdminLogin;