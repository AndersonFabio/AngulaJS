'use strict';

angular.module('lr.upload', ['lr.upload.formdata', 'lr.upload.iframe', 'lr.upload.directives']);
angular.module('lr.upload.directives', []);

'use strict';

angular.module('lr.upload.directives').directive('uploadButton', function(upload) {
  return {
    restrict: 'EA',
    scope: {
      options: '=?uploadButton',
      multiple: '=?',
      forceIFrameUpload: '=?forceIframeUpload',
      url: '@',
      method: '@',
      onSuccess: '&',
      onError: '&'
    },
    link: function(scope, element) {

      var el = angular.element(element);
      var button = el.children()[0];

      el.css({
        position: 'relative',
        overflow: 'hidden',
        width: button.offsetWidth,
        height: button.offsetHeight,
        cursor: 'pointer'
      });

      var fileInput = angular.element('<input type="file" />');
      fileInput.on('change', function () {
        if (!scope.options) {
          scope.options = {};
        }

        var options = {
          url: scope.url,
          method: scope.method || scope.options.method || 'POST',
          forceIFrameUpload: scope.forceIFrameUpload || scope.options.forceIFrameUpload || false,
          data: scope.options.data || {}
        };

        options.data[scope.options.paramName || 'file'] = fileInput;

        upload(options).then(
          function (response) {
            scope.onSuccess({response: response});
          },
          function (response) {
            scope.onError({response: response});
          }
        );
      });

      el.append(fileInput);

      if (upload.support.formData) {
        scope.$watch('multiple + forceIFrameUpload', function (value) {
          fileInput.attr('multiple', !!(value && !scope.forceIFrameUpload));
        });
      }
    }
  };
});

'use strict';

angular.module('lr.upload.formdata', [])

  // Convert all data properties to FormData,
  // if they are a jqLite element, extract the files from the input
  .factory('formDataTransform', function () {
    return function formDataTransform(data) {
      var formData = new FormData();
      angular.forEach(data, function (value, key) {
        if (angular.isElement(value)) {
          var files = [];
          angular.forEach(value, function (el) {
            angular.forEach(el.files, function (file) {
              files.push(file);
            });
          });
          if (files.length > 1) {
            angular.forEach(files, function (file, index) {
              formData.append(key + '[' + index + ']', file);
            });
          } else {
            formData.append(key, files[0]);
          }
        } else {
          formData.append(key, value);
        }
      });
      return formData;
    };
  })

  .factory('formDataUpload', function ($http, formDataTransform) {
    return function formDataUpload(config) {
      return $http(angular.extend(config, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: formDataTransform
      }));
    };
  });

'use strict';

angular.module('lr.upload.iframe', []).factory('iFrameUpload', function ($q, $http, $document, $rootScope) {

  function indexOf(array, obj) {
    if (array.indexOf) {
      return array.indexOf(obj);
    }

    for ( var i = 0; i < array.length; i++) {
      if (obj === array[i]) {
        return i;
      }
    }
    return -1;
  }

  function iFrameUpload(config) {
    var files = [];
    var fileClones = [];

    var deferred = $q.defer(),
    promise = deferred.promise;

    // Extract file elements from the within config.data
    angular.forEach(config.data || {}, function (value, key) {
      if (angular.isElement(value)) {
        delete config.data[key];
        value.attr('name', key);
        files.push(value);
      }
    });

    // If the method is something else than POST append the _method parameter
    var addParamChar = /\?/.test(config.url) ? '&' : '?';
    // XDomainRequest only supports GET and POST:
    if (config.method === 'DELETE') {
      config.url = config.url + addParamChar + '_method=DELETE';
      config.method = 'POST';
    } else if (config.method === 'PUT') {
      config.url = config.url + addParamChar + '_method=PUT';
      config.method = 'POST';
    } else if (config.method === 'PATCH') {
      config.url = config.url + addParamChar + '_method=PATCH';
      config.method = 'POST';
    }

    var body = angular.element($document[0].body);
    var uniqueName = 'iframe-transport-' + $rootScope.$new().$id;

    var form = angular.element('<form></form>');
    form.attr('target', uniqueName);
    form.attr('action', config.url);
    form.attr('method', config.method || 'POST');
    form.css('display', 'none');

    if (files.length) {
      form.attr('enctype', 'multipart/form-data');
      // enctype must be set as encoding for IE:
      form.attr('encoding', 'multipart/form-data');
    }

    // Add iframe that we will post to
    var iframe = angular.element('<iframe name="' + uniqueName + '" src="javascript:false;"></iframe>');

    // The first load is called when the javascript:false is loaded,
    // that means we can continue with adding the hidden form and posting it to the iframe;
    iframe.on('load', function () {
      iframe
        .off('load')
        .on('load', function () {
          // The upload is complete and we not need to parse the contents and resolve the deferred

          var response;
          // Wrap in a try/catch block to catch exceptions thrown
          // when trying to access cross-domain iframe contents:
          try {
            var doc = this.contentWindow ? this.contentWindow.document : this.contentDocument;
            response = angular.element(doc.body).text();
            // Google Chrome and Firefox do not throw an
            // exception when calling iframe.contents() on
            // cross-domain requests, so we unify the response:
            if (!response.length) {
              throw new Error();
            }
          } catch (e) {}

          // Fix for IE endless progress bar activity bug
          // (happens on form submits to iframe targets):
          form.append(angular.element('<iframe src="javascript:false;"></iframe>'));

          // Convert response into JSON
          try {
            response = transformData(response, $http.defaults.transformResponse);
          } catch (e) {}

          deferred.resolve({
            data: response,
            status: 200,
            headers: [],
            config: config
          });
        });

      // Move file inputs to hidden form
      angular.forEach(files, function (input) {
        // Clone input with it's events
        var clone = input.clone(true);

        // Save clones so that we can put them back later
        fileClones.push(clone);

        // Insert clone directly after input
        input.after(clone);

        // Move original input to hidden form
        form.append(input);
      });

      // Add all existing data as hidden variables
      angular.forEach(config.data, function (value, name) {
        var input = angular.element('<input type="hidden" />');
        input.attr('name', name);
        input.val(value);
        form.append(input);
      });

      config.$iframeTransportForm = form;

      // Add the config to the $http pending requests to indicate that we are doing a request via the iframe
      $http.pendingRequests.push(config);

      // Transform data using $http.defaults.response
      function transformData(data, fns) {
        // An iframe doesn't support headers :(
        var headers = [];
        if (angular.isFunction(fns)) {
          return fns(data, headers);
        }

        angular.forEach(fns, function(fn) {
          data = fn(data, headers);
        });

        return data;
      }

      // Remove everything when we are done
      function removePendingReq() {
        var idx = indexOf($http.pendingRequests, config);
        if (idx !== -1) {
          $http.pendingRequests.splice(idx, 1);
          config.$iframeTransportForm.remove();
          delete config.$iframeTransportForm;
        }
      }

      console.log(form);

      // submit the form and wait for a response
      form[0].submit();

      // Put original inputs back
      if (fileClones && fileClones.length) {
        angular.forEach(files, function (input, index) {
          var clone = fileClones[index];
          clone.replaceWith(input);
        });
      }

      promise.then(removePendingReq, removePendingReq);
    });

    form.append(iframe);
    body.append(form);

    return promise;
  }

  return iFrameUpload;
});

'use strict';

angular.module('lr.upload').factory('upload', function ($window, formDataUpload, iFrameUpload) {
  var support = {
    // Detect file input support, based on
    // http://viljamis.com/blog/2012/file-upload-support-on-mobile/
    // Handle devices which give false positives for the feature detection:
    fileInput: !(
      new RegExp(
        '(Android (1\\.[0156]|2\\.[01]))' +
        '|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)' +
        '|(w(eb)?OSBrowser)|(webOS)' +
        '|(Kindle/(1\\.0|2\\.[05]|3\\.0))'
      ).test($window.navigator.userAgent) || angular.element('<input type="file">').prop('disabled')
    ),

    // The FileReader API is not actually used, but works as feature detection,
    // as e.g. Safari supports XHR file uploads via the FormData API,
    // but not non-multipart XHR file uploads:
    fileUpload: !!($window.XMLHttpRequestUpload && $window.FileReader),
    formData: !!$window.FormData
  };

  function upload(config) {
    if (support.formData && !config.forceIFrameUpload) {
      return formDataUpload(config);
    }
    return iFrameUpload(config);
  }

  upload.support = support;

  return upload;
});
