const RootLayout = ({ children }) => {
  return (
    <>
      <html lang='ko'>
        <head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <title>spring-react-guide</title>
        </head>

        <body>{children}</body>
      </html>
    </>
  );
};

export default RootLayout;
