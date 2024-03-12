System.import("single-spa").then(({ registerApplication, start }) => {
    registerApplication(
        "@Bruno/react-migration",
        () => System.import("@Bruno/react-migration"),
        () => true
    );
    
    start({
      urlRerouteOnly: true,
    });
  });