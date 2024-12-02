import { Button, Checkbox, Form, Input, Drawer, message } from 'antd';
import React, { Component } from 'react'
import { SignUpForm } from '../Components';
import { Navigate } from 'react-router-dom';

//Using mongodb with authentication system to build a login system with email password or social media.

class Login extends Component {

    state = {
        email: null,
        password: null,
        open: false,
        isAuth: false,
        token: null,
        userID: null,
        error: null,
    };

    componentDidMount() {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            this.logoutHandler();
            return;
        }
        const userID = localStorage.getItem('userID');
        const remainingMilliseconds =
            new Date(expiryDate).getTime() - new Date().getTime();
        this.setState({ isAuth: true, token: token, userID: userID });
        this.setAutoLogout(remainingMilliseconds);
    }
    userLogin = () => {
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
            .then(res => {
                if (res.status === 422) {
                    throw new Error("Validation failed");
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('error!');
                    message.error("Wrong email or password!");
                    throw new Error("Could not authenticate user!");
                }
                return res.json();
            })
            .then((resData) => {
                console.log(resData);
                this.setState({
                    isAuth: true,
                    token: resData.token,
                    userID: resData.userID,
                });
                localStorage.setItem('token', resData.token);
                localStorage.setItem('userID', resData.userID);
                const remainingMilliseconds = 60 * 60 * 1000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                message.success("User login successfully!");
                this.setAutoLogout(remainingMilliseconds);
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    isAuth: false,
                    error: err,
                });
            });
    };

    showDrawer = () => {
        this.setState({ open: true });
    }

    closeDrawer = () => {
        this.setState({ open: false });
    }

    logoutHandler = () => {
        this.setState({ isAuth: false, token: null });
        localStorage.removeItem('token');
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('userID');
    };

    setAutoLogout = milliseconds => {
        setTimeout(() => {
            this.logoutHandler();
        }, milliseconds);
    };

    onFinish = (values) => {
        console.log('Success:', values);
        this.userLogin();
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        if (this.state.isAuth) {
            // Redirect to another page if authenticated
            return <Navigate to="/profile" />;
        }
        return (
            <div className={`w-full h-[800px] overflow-hidden flex flex-col justify-center items-center font-inter text-highblack`}>
                <Form
                    name="login"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 800,
                        width: 500,
                        justifyItems: 'center',
                        alignItems: 'center',
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email!',
                            },
                        ]}
                    >
                        <Input
                            value={this.state.email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            value={this.state.password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="unchecked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType='submit' className='mx-3 text-lowblack' >
                            Login
                        </Button>
                        <Button className='bg-secondary text-primary' onClick={this.showDrawer}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
                <Drawer
                    title="Sign Up"
                    closable={false}
                    onClose={this.closeDrawer}
                    open={this.state.open}
                    size={'large'}
                >
                    <SignUpForm onClose={this.closeDrawer} />
                </Drawer>
            </div >
        )
    }
}


export default Login