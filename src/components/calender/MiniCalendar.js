import { Card, Typography } from "antd";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import "../calender/miniCalendar.scss";

const MiniCalendar = (props) => {
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState(new Date());
  return (
    <Card {...rest}>
      <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Typography color="brand.500" />}
        prevLabel={<LeftOutlined />}
        nextLabel={<RightOutlined />}
      />
    </Card>
  );
};

export default MiniCalendar;
