import { Rate } from "antd";

import React, { useEffect, useState } from "react";

const Rating = () => {
    // console.log(props);
    // const [rating, setRating] = useState(props.rating)
    // useEffect(() => {
    //     setRating(props.rating)
    // }, [props.rating])
  return <Rate allowHalf defaultValue={4} />;
};

export default Rating;
