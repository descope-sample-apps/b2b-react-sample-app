import { Card, Typography } from "antd";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
        prevLabel={<IoIosArrowBack style={{ fontSize: "22px" }} />}
        nextLabel={<IoIosArrowForward style={{ fontSize: "22px" }} />}
      />
    </Card>
  );
};

export default MiniCalendar;
