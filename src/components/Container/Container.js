import PropTypes from 'prop-types';
import с from './Container.module.css';

const Container = ({ children }) => (
  <div className={с.Container}>{children}</div>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
