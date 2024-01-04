import React from 'react';
import { Rate } from 'antd';
const Rating = (props) => <Rate disabled defaultValue={props.rating} />;
export default Rating;