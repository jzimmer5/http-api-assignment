const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getSuccess = (request, response) => {
  const responseJSON = {
    message: 'Success!',
    id: 'success',
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getSuccessMeta = (request, response) => respondJSONMeta(request, response, 200);

const getUnauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You have been authorized!',
    id: 'success',
  };

  if (!params || params !== 'loggedIn=yes') {
    responseJSON.message = 'missing valid query parameter set to "yes"';
    responseJSON.id = 'unauthorized';

    return respondJSON(request, response, 401, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};


const getBadRequest = (request, response, params) => {
  const responseJSON = {
    message: 'Request was successfully bad?',
    id: 'success',
  };

  if (!params || params !== 'valid=true') {
    responseJSON.message = 'missing valid query parameter set to "true"';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }

  return respondJSON(request, response, 200, responseJSON);
};


const getForbidden = (request, response) => {
  const responseJSON = {
    message: 'This is ~forbidden~',
    id: 'forbidden',
  };

  return respondJSON(request, response, 403, responseJSON);
};

const getForbiddenMeta = (request, response) => respondJSONMeta(request, response, 403);

const getInternal = (request, response) => {
  const responseJSON = {
    message: 'Internal server error',
    id: 'internal',
  };

  return respondJSON(request, response, 500, responseJSON);
};

const getInternalMeta = (request, response) => respondJSONMeta(request, response, 500);

const getNotImplemented = (request, response) => {
  const responseJSON = {
    message: 'Not implemented, come back later',
    id: 'notImplemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

const getNotImplementedMeta = (request, response) => respondJSONMeta(request, response, 501);


const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  notFound,
  notFoundMeta,
  getSuccess,
  getSuccessMeta,
  getUnauthorized,
  getBadRequest,
  getForbidden,
  getForbiddenMeta,
  getInternal,
  getInternalMeta,
  getNotImplemented,
  getNotImplementedMeta,
};
