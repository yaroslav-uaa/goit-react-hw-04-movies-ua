import { css } from '@emotion/core';
import PropagateLoader from 'react-spinners/PropagateLoader';

const spiner = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => {
  return (
    <div className="loading">
      <PropagateLoader css={spiner} size={30} color={'black'} />
    </div>
  );
};
export default Loader;
