odule.exports = function(client) {
  var LocalList = client.models.LocalList;
  var RemoteList = client.models.RemoteList;

  var since = { push: -1, pull: -1 };

  function sync() {
    // It is important to push local changes first,
    // that way any conflicts are resolved at the client
    LocalList.replicate(
      RemoteList,
      since.push,
      function pushed(err, conflicts, cps) {
        // TODO: handle err
        if (conflicts.length) 
          handleConflicts(conflicts);

        since.push = cps;

        RemoteList.replicate(
          LocalList,
          since.pull,
          function pulled(err, conflicts, cps) {
            // TODO: handle err
            if (conflicts)
              handleConflicts(conflicts.map(function(c) { return c.swapParties(); }));
            since.pull = cps;
          });
      });
  }

  LocalList.observe('after save', function(ctx, next) {
    next();
    sync(); // in background
  });

  LocalList.observe('after delete', function(ctx, next) {
    next();
    sync(); // in background
  });

  function handleConflicts(conflicts) {
    // TODO notify user about the conflicts
  }
};