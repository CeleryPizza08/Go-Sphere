import { React, useEffect } from 'react'
import styles from '../style'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, Space, TimePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

function Edit() {

    const { postID } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const day = location.state && location.state.day;
    const format = 'HH:mm';
    const [form] = Form.useForm();

    const redirecting = () => {
        const queryParams = new URLSearchParams(location.search);
        const editable = true;
        queryParams.set('editable', editable.toString());
        navigate(`/Create/Plan/${postID}?${queryParams.toString()}`);
    }

    const handleInput = async (values) => {
        try {
            const response = await axios.put(`http://localhost:3000/updatedPostInCreate/${postID}/${day}`,
                values.plan,
            );
            if (response) {
                fetchData();
                redirecting();
            }
        } catch (error) {
            throw error
        }
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/getPost/${postID}`);
            const data = await response.json();
            const arrayOfObjects = Object.entries(data.plan);
            const strToArray = arrayOfObjects[day - 1][1].split('""');
            const jsonToObjData = JSON.parse(strToArray);
            const formatData = jsonToObjData.map(item => ({
                Location: item.Location,
                Time: moment(item.Time),
            }))
            form.setFieldsValue({ plan: formatData });
            console.log(jsonToObjData);

        }
        catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        fetchData();
    }, [form]);

    return (
        <div className={`w-full min-h-[800px] flex flex-col`}>
            <div className={`${styles.heading2} flex flex-row align-center justify-center mt-10`}>
                <p>{'Day' + ' ' + day} </p>
            </div>
            <div className='flex flex-row mt-10 align-center justify-center'>
                <Form
                    form={form}
                    name="plan"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 600,
                        maxWidth: 1000,
                    }}
                    onFinish={handleInput}
                    autoComplete="off"
                    initialValues={{ plan: [] }}
                >
                    <Form.List name="plan" >
                        {(fields, { add, remove }) => (
                            <div className='flex flex-col justify-center items-center '>
                                {
                                    fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                marginBottom: 8,
                                            }}
                                            align="baseline"
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'Location']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Your Location',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Location" className='w-[220px]' />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'Time']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Time Entered',
                                                    },
                                                ]}
                                            >
                                                <TimePicker placeholder="Time" format={format} />
                                            </Form.Item>
                                            <MinusCircleOutlined style={{ color: '#1976d2' }} onClick={() => remove(name)} />
                                        </Space>
                                    ))
                                }
                                <Form.Item >
                                    <Button type="dashed" className="bg-white text-secondary border-glassblue" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Place
                                    </Button>
                                </Form.Item>
                            </div>
                        )}
                    </Form.List>
                    <Form.Item className='flex flex-row items-center justify-center'>
                        <Button id='submit' htmlType='submit' className='bg-white text-secondary border-glassblue' >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </div >
    )
}


export default Edit