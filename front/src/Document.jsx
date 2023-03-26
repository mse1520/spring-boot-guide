import React from 'react';
import App from './App';

const Document = () => <>
  <html>
    <head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Guide</title>
    </head>
    <body>
      <div id='root'><App /></div>
    </body>
  </html>
</>;

export default Document;