let sharedScpope = []; //If there is  a scope that needs to be shared between the apps so is not initialized multiple times.
System.import("single-spa").then((singleSpa) => {
    const { registerApplication, start, getAppStatus, NOT_REGISTERED } = singleSpa;
    console.log('app status', getAppStatus('rootComponent'));
    const observer = new MutationObserver((mutations, obs) => {
        if (document.querySelector('#reactRootComponent') && getAppStatus('rootComponent') == null) {
            registerApplication(
                "rootComponent",
                () => System.import('reactMigration').then((reactMigration) => {
                    console.log(reactMigration);
                    reactMigration.init(sharedScpope);
                    return reactMigration.get('RootComponent').then(module => {
                        return module();
                    });
                }),
                location => location.pathname.startsWith('/')
            );
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    registerApplication(
        "someOtherComponent",
        () => System.import('reactMigration').then((reactMigration) => {
            console.log(reactMigration);
            reactMigration.init(sharedScpope);
            return reactMigration.get('SomeOtherComponent').then(module => {
                return module();
            });
        }),
        location => location.pathname.startsWith('/'),
        {
            rootVariables: getRootScope()
        }
    );

    start({
        urlRerouteOnly: true,
    });
});


function getRootScope() {
    var appElement = document.querySelector('[ng-app=AngularDrumMachine]');
        var injector = angular.element(appElement).injector();
        var $rootScope = injector.get('$rootScope');
        return $rootScope;
}

//   System.import('reactMigration').then((reactMigration) => {
//     console.log(reactMigration);
//     reactMigration.init(sharedScpope);
//     return reactMigration.get('RootComponent').then(module => {
//         return module();
//     });
//   })