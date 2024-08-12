import { useFileHandler, useInputValidation } from '6pp';
import { CameraAlt as CameraAltIcon } from '@mui/icons-material';
import {
    Avatar,
    Button,
    Container,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { bgGradient } from '../constants/color';
import { server } from '../constants/config';
import { userExists } from '../redux/reducers/auth';
import { validateUsername } from '../utils/validators';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const toggleLogin = () => {
        setIsLogin(!isLogin);
    };

    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", validateUsername);
    const password = useInputValidation("");

    const avatar = useFileHandler("single");

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const toastId = toast.loading("Logging in...");
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            };
            const { data } = await axios.post(`${server}/user/login`,
                {
                    username: username.value,
                    password: password.value
                },
                config
            );
            dispatch(userExists(data?.user));
            toast.success(data?.message, { id: toastId });
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const toastId = toast.loading("Signing up...");

        const formdata = new FormData();
        formdata.append("name", name.value);
        formdata.append("bio", bio.value);
        formdata.append("username", username.value);
        formdata.append("password", password.value);
        formdata.append("avatar", avatar.file);

        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };
        try {
            const { data } = await axios.post(
                `${server}/user/new`,
                formdata,
                config
            );
            dispatch(userExists(data.user));
            toast.success(data?.message, { id: toastId });
        } catch (e) {
            if (e?.response?.data?.success === false) {
                toast.error(e?.response?.data?.message, { id: toastId });
            } else {
                toast.error(e?.response?.data?.errors?.[0]?.msg || "Something went wrong", { id: toastId });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: isLogin ? "100vh" : "auto",
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
                    {isLogin ? (
                        <>
                            <Typography variant="h5">Login</Typography>
                            <form
                                style={{
                                    width: "100%",

                                }}
                                onSubmit={handleLogin}
                            >
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    variant="outlined"
                                    value={username.value}
                                    onChange={username.changeHandler}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type='password'
                                    margin="normal"
                                    variant="outlined"
                                    value={password.value}
                                    onChange={password.changeHandler}
                                />
                                <Button
                                    sx={{
                                        marginTop: "1rem",
                                    }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isLoading}>
                                    Login
                                </Button>

                                <Typography textAlign="center" m={"1rem"}>
                                    OR
                                </Typography>

                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={toggleLogin}
                                    disabled={isLoading}
                                >
                                    Sign Up Instead
                                </Button>

                            </form>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" mb={"1rem"}>Sign Up</Typography>
                            <form
                                style={{
                                    width: "100%",
                                }}
                                onSubmit={handleSignUp}
                            >
                                <Stack
                                    position={"relative"}
                                    width={"10rem"}
                                    margin={"auto"}>
                                    <Avatar
                                        sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            objectFit: "cover"
                                        }}
                                        src={avatar.preview}
                                    />

                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            right: "0",
                                            bottom: "0",
                                            color: "white",
                                            bgcolor: "rgba(0,0,0,0.5)",
                                            ":hover": {
                                                bgcolor: "rgba(0,0,0,0.7)"
                                            }
                                        }}
                                        component="label"
                                    >
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                    </IconButton>
                                </Stack>
                                {avatar.error && (
                                    <Typography
                                        m={"1rem auto"}
                                        width={"fit-content"}
                                        display={"block"}
                                        color="error"
                                        variant="caption"
                                        sx={{
                                            textAlign: "left"
                                        }}>
                                        {avatar.error}
                                    </Typography>
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    label="Name"
                                    margin="normal"
                                    variant="outlined"
                                    name={name.value}
                                    onChange={name.changeHandler}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Bio"
                                    margin="normal"
                                    variant="outlined"
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    variant="outlined"
                                    value={username.value}
                                    onChange={username.changeHandler}
                                />
                                {username.error && (
                                    <Typography
                                        color="error"
                                        variant="caption"
                                        sx={{
                                            textAlign: "left"
                                        }}
                                    >
                                        {username.error}
                                    </Typography>
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type='password'
                                    margin="normal"
                                    variant="outlined"
                                    value={password.value}
                                    onChange={password.changeHandler}
                                />
                                <Button
                                    sx={{
                                        marginTop: "1rem",
                                    }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isLoading}>
                                    Sign Up
                                </Button>

                                <Typography textAlign="center" m={"1rem"}>
                                    OR
                                </Typography>

                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={toggleLogin}
                                    disabled={isLoading}
                                >
                                    Login Instead
                                </Button>

                            </form>
                        </>
                    )}

                </Paper>
            </Container>
        </div>

    );
};

export default Login;