import React, { useState, useEffect } from 'react'
import { MessageFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Image, Tag, Modal, Input, Upload, DatePicker } from 'antd'
import styles from '../style';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const PInfo = ({ userData }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedUserData, setEditedUserData] = useState(userData);
    const [birthDate, setBirthDate] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [imageURL, setImageURL] = useState(userData.imageURL);

    useEffect(() => {
        setImageURL(userData.imageURL);
        setEditedUserData(userData);
        const formattedDate = moment(userData.birthDate).format("YYYY-MM-DD");
        setBirthDate(formattedDate);
    }, [userData]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setImageURL(userData.imageURL);
        setFileList([]); // Clear fileList
    };

    const handleDateChange = (date, dateString) => {
        setBirthDate(dateString);
    }

    const handleChange = (info) => {
        setFileList(info.fileList.slice(-1));
        if (info.fileList.length > 0) {
            const newImage = info.fileList[0];
            const reader = new FileReader();
            reader.readAsDataURL(newImage.originFileObj);
            reader.onload = () => {
                setImageURL(reader.result);
            };
        }
        if (info.fileList.length === 0) {
            setImageURL(userData.imageURL);
        }
    };

    const handleSave = () => {
        setIsModalVisible(false);
        console.log("Updated user data:", editedUserData);
        updateProfile();
    };

    const updateProfile = async () => {
        const formData = new FormData();
        formData.append('name', editedUserData.name);
        formData.append('country', editedUserData.country);
        formData.append('phone', editedUserData.phone);
        formData.append('birthDate', birthDate);
        formData.append('gender', editedUserData.gender);
        formData.append('vehicle', editedUserData.vehicle);
        formData.append('language', editedUserData.language);
        if (fileList.length > 0) {
            formData.append('image', fileList[0].originFileObj);
        }
        try {
            const response = await fetch(`http://localhost:3000/user/updateUser/?email=${userData.email}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                console.log('Data updated successfully');
            } else {
                console.error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    return (
        <div className='h-full ml-16 mt-14 font-inter text-highblack flex flex-row'>
            <div className='flex flex-col items-start justify-start'>
                <span className='row-span-1 text-[24px] font-trip font-semibold mb-5'>Profile Info</span>
                <Image src={userData.imageURL} width={200} alt='profile' className='rounded-[5px] border-2 border-bgblue' />
                <div className='w-full flex justify-center items-centers'>
                    <Button className='row-start-1 mt-8 px-10 flex items-center justify-center text-[20px] bg-secondary border-2 border-secondary rounded-[5px] text-primary' onClick={showModal}>Edit</Button>
                </div>
                <Modal
                    title="Edit Profile"
                    open={isModalVisible}
                    onOk={handleSave}
                    onCancel={handleCancel}
                    okText={'Save'}
                    okButtonProps={{ className: styles.saveBtn }}
                >
                    <div className='w-[20vw] h-[40vh] gap-2 flex flex-col items-start justify-start overflow-auto mt-5'>
                        <span className='text-[14px] font-trip '>Profile Picture</span>
                        <Upload
                            listType="picture-circle"
                            beforeUpload={() => false}
                            fileList={fileList}
                            onChange={handleChange}
                        >
                            {fileList.length === 0 && <Image src={imageURL} preview={false} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '100px' }} />}
                        </Upload>
                        <span className='col-span-1'>Name</span>
                        <Input value={editedUserData.name} onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })} className='' />
                        <span className='col-span-1'>Country</span>
                        <Input value={editedUserData.country} onChange={(e) => setEditedUserData({ ...editedUserData, country: e.target.value })} className='' /><span className='col-span-1'>Phone</span>
                        <Input value={editedUserData.phone} onChange={(e) => setEditedUserData({ ...editedUserData, phone: e.target.value })} className='' /><span className='col-span-1'>Date of Birth</span>
                        <DatePicker value={birthDate ? moment(birthDate) : null} onChange={handleDateChange} className='' />
                        <span className='col-span-1'>Gender</span>
                        <Input value={editedUserData.gender} onChange={(e) => setEditedUserData({ ...editedUserData, gender: e.target.value })} className='' />
                        <span className='col-span-1'>Vehicle</span>
                        <Input value={editedUserData.vehicle} onChange={(e) => setEditedUserData({ ...editedUserData, vehicle: e.target.value })} className='' />
                        <span className='col-span-1'>Language</span>
                        <Input value={editedUserData.language} onChange={(e) => setEditedUserData({ ...editedUserData, language: e.target.value })} className='' />
                    </div>
                </Modal>
            </div>
            <div className='h-[20vh] ml-20 grid grid-cols-4 items-center justify-center mt-8'>
                <span className='w-fit mr-10 py-4 text-[22px] col-span-1 font-semibold'>{userData.name}</span>
                <Tag color={'#2679F5'} className='w-fit p-1 rounded-full text-secondary text-[16px]'>{userData.country}</Tag>
                <Button icon={<MessageFilled />} className='text-[20px] px-10 py-4 mt-4 text-primary bg-secondary border-2 border-secondary flex items-center justify-center align-center col-start-1 col-end-2'>Message</Button>
                <span className='col-span-4 mt-10 text-infoblack text-[14px] h-[4vh] flex items-start justify-start'>Contact information</span>
                <div className='col-span-4 mt-2'>
                    <span className='me-[2vw]'>Phone: </span>
                    <span className=''>{'+' + userData.phone}</span>
                </div>
                <div className='col-span-4 mt-2'>
                    <span className='me-[2.7vw]'>Email:</span>
                    <span className=''>{userData.email}</span>
                </div>

                <span className='col-span-4 mt-14 text-infoblack text-[14px]'>Basic information</span>
                <div className='col-span-4 mt-2'>
                    <span className='me-[3vw]'>Nationality:</span>
                    <span className=''>{userData.country}</span>
                </div>
                <div className='col-span-2 mt-2'>
                    <span className='me-8'>Date of Birth:</span>
                    <span className=''>{moment(editedUserData.birthDate).format("YYYY-MM-DD")}</span>
                </div>
                <div className='col-span-4 mt-2'>
                    <span className='me-[4.3vw]'>Gender:</span>
                    <span className=''>{userData.gender}</span>
                </div>
                <div className='col-span-4 mt-2'>
                    <span className='me-[4.4vw]'>Vehicle:</span>
                    <span className=''>{userData.vehicle}</span>
                </div>
                <div className='col-span-4 mt-2'>
                    <span className='me-[3.2vw]'>Language:</span>
                    <span className=''>{userData.language}</span>
                </div>
            </div>
        </div >
    )
}


export default PInfo