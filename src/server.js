const http = require('http');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/success': jsonHandler.getSuccess,
    '/badRequest': jsonHandler.getBadRequest,
    '/unauthorized': jsonHandler.getUnauthorized,
    '/forbidden': jsonHandler.getForbidden,
    '/internal': jsonHandler.getInternal,
    '/notImplemented': jsonHandler.getNotImplemented,
    notFound: jsonHandler.notFound,
  },
  HEAD: {
    '/success': jsonHandler.getSuccessMeta,
    '/forbidden': jsonHandler.getForbiddenMeta,
    '/internal': jsonHandler.getInternalMeta,
    '/notImplemented': jsonHandler.getNotImplementedMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedUrl = url.parse(request.url);

  if (urlStruct[request.method][parsedUrl.pathname]) {
    if (parsedUrl.query) {
      urlStruct[request.method][parsedUrl.pathname](request, response, parsedUrl.query);
    } else {
      urlStruct[request.method][parsedUrl.pathname](request, response);
    }
  } else {
    urlStruct[request.method].notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`listening on 127.0.0.1: ${port}`);
