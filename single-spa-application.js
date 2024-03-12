System.register([], function (_export) {
    return {
      execute: function () {
        _export(
          window.singleSpaAngularjs.default({
            angular: angular,
            mainAngularModule: "app",
            uiRouter: true,
            preserveGlobal: false,
            template: "<greet-user />",
          }),
        );
      },
    };
  });