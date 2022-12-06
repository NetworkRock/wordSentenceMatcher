// Models
import { BackendErrorType } from 'shared/models/BackendErrorType';

// Styles
import "./BackendError.css";

const BackendError = ({ message }: BackendErrorType) => {
  return <div className="BackendError">
    <h1 style={{
      color: 'white'
    }}>OOOOPPPPPS...</h1>
    {message}
    </div>;
};

export default BackendError;
