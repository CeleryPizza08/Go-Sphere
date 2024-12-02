import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';

function SignUpForm({ onClose }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (image) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const beforeUpload = async (file) => {
        file.preview = await getBase64(file); // Convert the file to base64 format
        return false; // Return false to prevent default upload behavior
    };

    const handleCancel = () => setPreviewOpen(false);
    const handleChange = ({ fileList }) => setFileList(fileList);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            try {
                const base64 = await getBase64(file.originFileObj);
                file.preview = base64;
            } catch (err) {
                console.error('Error getting base64 preview:', err);
            }
        }
        setPreviewImage(file.url || file.preview || '');
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/ ') + 1));
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const userSignUp = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('country', country);
        if (fileList.length > 0) {
            console.log(fileList[0].originFileObj)
            formData.append('image', fileList[0].originFileObj);
        }

        try {
            const response = await fetch('http://localhost:3000/user/signup', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                message.success("User created successfully!");
                onClose();
            } else if (response.status === 422) {
                throw new Error("Validation Failed. Please try again!");
            } else {
                throw new Error("Something went wrong. Please try again!");
            }
        } catch (err) {
            console.error(err);
            message.error(err.message);
        }
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        userSignUp();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your full name!',
                        },
                    ]}
                >
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your Phone number!',
                        },
                    ]}
                >
                    <Input
                        prefix="+"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Country"
                    name="country"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your country born!',
                        },
                    ]}
                >
                    <Input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Profile Image"
                    valuePropName='fileList'
                    getValueFromEvent={handleChange}>

                    <Upload

                        listType="picture-circle"
                        beforeUpload={beforeUpload}
                        onPreview={handlePreview}
                        fileList={fileList}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img
                            style={{
                                width: '100%',
                            }}
                            src={previewImage}
                        />
                    </Modal>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type='primary' htmlType='submit' className=' mx-3 bg-secondary text-primary'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SignUpForm