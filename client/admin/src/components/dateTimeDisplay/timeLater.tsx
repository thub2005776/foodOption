import React from 'react';
import { DateTimeDisplay } from '../../components';

export default function TimeLater({ dateTime, minutes }: { dateTime: string, minutes: number }) {
    const originalTime = new Date(dateTime);
    const timeLater = new Date(originalTime.getTime() + minutes * 60000);
    return (
        <DateTimeDisplay datetime={timeLater.toString()} />
    );
};