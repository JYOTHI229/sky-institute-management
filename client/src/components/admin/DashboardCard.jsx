import "./DashboardCard.css";

function DashboardCard({
  title,
  value,
  icon,
  color = "blue",
  change,
}) {
  return (
    <div className="dashboard-card">

      <div className={`icon-box ${color}`}>
        {icon}
      </div>

      <div className="card-content">

        <h6>{title}</h6>

        <h2>{value}</h2>

        {change && (
          <span className="change-text">
            {change}
          </span>
        )}

      </div>

    </div>
  );
}

export default DashboardCard;