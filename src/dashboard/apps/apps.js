import './apps.scss';
import { ApplicationsPortal } from '@descope/react-sdk';

const Apps = () => {

  return (
    <div className="data-table-wrapper">
        <div className="apps">
        {<ApplicationsPortal
          widgetId="applications-portal-widget"
        />}
        </div>
      </div>
  );
};

export default Apps;
