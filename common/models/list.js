'use strict';

module.exports = function(List) {

  List.handleChangeError = function(err) {
    console.warn('Cannot show List due to: ', err);
  };
  List.observe('before save', function(ctx, next) {
    ctx.instance.type = 'list';
    next();
  });
  
    List.entries = function(msg, cb) {
      cb(null, 'Greetings... ' + msg);
    }
    // method to return if the gift is free
  List.remoteMethod('entries',{
  accepts: {arg: 'msg', type: 'string'},
  returns: {arg: 'getting', type: 'string'},
  http: {path: '/list', verb: 'get'}
}); 


};
