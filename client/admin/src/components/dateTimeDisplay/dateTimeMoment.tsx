import React, { useEffect, useState } from 'react';
import moment from 'moment';

const TimeAgo = ({ dateTimeString }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const currentTime = moment();
      const pastTime = moment(dateTimeString);
      const diffMinutes = currentTime.diff(pastTime, 'minutes');
      const diffHours = currentTime.diff(pastTime, 'hours');
      const diffDays = currentTime.diff(pastTime, 'days');
      const diffWeeks = currentTime.diff(pastTime, 'weeks');

      if (diffMinutes < 1) {
        setTimeAgo('bây giờ');
      } else if (diffMinutes < 60) {
        setTimeAgo(`${diffMinutes} phút trước`);
      } else if (diffHours < 24) {
        setTimeAgo(`${diffHours} giờ trước`);
      } else if (diffDays < 7) {
        setTimeAgo(`${diffDays} ngày trước`);
      } else {
        setTimeAgo(`${diffWeeks} tuần trước`);
      }
    };

    updateTimeAgo();
  }, [dateTimeString]);

  return <div>{timeAgo}</div>;
};

export default TimeAgo;