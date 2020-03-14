export function fetch(url, successHandler, errorHandler) {
  $.ajax({
    type: 'GET',
    url,
    dataType: 'json',
    crossOrigin: true,
    success(result) {
      successHandler(result);
    },
    error(error) {
      errorHandler(error.responseJSON);
    },
  });
}

export function save(url, data) {
  return new Promise((resolve, reject) => {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url,
      data: JSON.stringify(data),
      async: true,
      crossDomain: true,
      success(result) {
        successHandler(result);
      },
      error(error) {
        errorHandler(error.responseJSON);
      },
    });
  });
}
