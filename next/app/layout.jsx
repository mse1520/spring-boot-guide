import PropTypes from 'prop-types';

const RootLayout = ({ children }) => {
  return (
    <html lang='ko'>
      <head>
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <title>spring-react-guide</title>
      </head>

      <body>{children}</body>
    </html>
  );
};

RootLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RootLayout;
