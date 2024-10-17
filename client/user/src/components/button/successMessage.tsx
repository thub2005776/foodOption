import React from 'react';
import { Button, Result } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export default function SuccessMesage() {
    const location = useLocation();
    const id = location.pathname.split('/')[3];
    return (
        <Result
            status="success"
            title="Thanh toán thành công!"
            subTitle={`Order number: ${id}.`}
            extra={[
                <Button type="primary" key="console">
                    <Link to={`/ordered/${id}`}>
                        Đến đơn hàng
                    </Link>
                </Button>,
                <Button key="buy">
                    <Link to={'/trend'}>
                        Tiếp tục đặt món
                    </Link>
                </Button>,
            ]}
        />
    );
};