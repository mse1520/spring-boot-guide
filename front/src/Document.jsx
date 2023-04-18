import React from 'react';
import App from './App';

const Document = ({ data }) => <>
  <html>
    <head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <title>Guide</title>
    </head>
    <body>
      <input id='server-data' defaultValue={JSON.stringify(data)} hidden />
      <div id='root'><App data={data} /></div>
    </body>
  </html>
</>;

export default Document;