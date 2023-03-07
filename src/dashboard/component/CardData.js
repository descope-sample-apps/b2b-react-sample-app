import { theme, Typography } from "antd";

const CardData = ({ icon, name, value }) => {
  const { useToken } = theme;
  const { token } = useToken();

  return (
    <section
      className="card-section"
      style={{ background: token.colorBgContainer }}
    >
      <div className="card-container">
        <div className="card-icon">{icon}</div>
        <div>
          <Typography className="card-name">{name}</Typography>
          <Typography className="card-value">{value}</Typography>
        </div>
      </div>
    </section>
  );
};

export default CardData;
