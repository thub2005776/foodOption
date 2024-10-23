import React, { useState } from 'react';
import { Button, Modal, Rate } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useMutation } from 'react-query';
import { updateOrderApi } from '../../api/orderApi';
import { useNavigate } from 'react-router-dom';
import { ReviewFood } from '../../components';

export default function ReviewModal({ check }: { check: Object }) {
    const user = useSelector(selectUser);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [value, setValue] = useState(0);
    const desc = ['Rất tệ', 'Không hài lòng', 'OK', 'Hài lòng', 'Tuyệt vời'];
    const showModal = () => {
        setOpen(true);
    };


    const updatedCheck = useMutation(
        updateOrderApi, {
        onSuccess(data, variables, context) {
            if (data === 'successfull') {
                console.log(data);
                
            }
        }, onError(error, variables, context) {
            console.log(error);
        },
    })


    const handleOk = () => {
        const reviewCheck = {
            id: check['_id'].$oid,
            review: true,
            rating: value,
            updatedAt: Date(),
        }
        
        updatedCheck.mutate(reviewCheck)

        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="dashed" onClick={showModal}>
                Đánh giá
            </Button>
            <Modal
                title="Hãy để lại đánh giá của bạn"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <div>
                    <p className='text-gray-600'>Bạn có hài lòng với đơn hàng này không?</p>
                    <div className='flex justify-center gap-4 p-2 mb-6'>
                        <Rate tooltips={desc} onChange={setValue} value={value} />
                        {value ? <span> {desc[value - 1]}</span> : null}
                    </div>
                    {Array.isArray(check['detail']) && check['detail'].map((item, i) => (
                        <ReviewFood key={i} foodList={item} checkID={check['_id'].$oid} />
                    ))}
                </div>
            </Modal>
        </>
    );
};