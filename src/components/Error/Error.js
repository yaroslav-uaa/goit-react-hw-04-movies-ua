import PropTypes from 'prop-types';
import e from './Error.module.css';

import img404 from '../../images/img404.jpg';

const Error = ({ msg }) => {
  return (
    <div role="alert" className={e.alert}>
      <img src={img404} width="650" alt="404 not found" className={e.img} />
      <p text={msg} className={e.msg}>
        {msg}
      </p>
    </div>
  );
};

Error.propTypes = {
  msg: PropTypes.string,
};

export default Error;
