'use strict';

module.exports = function(Add) {
 Add.handleChangeError = function(err) {
    console.warn('Cannot add due to: ', err);
  };
  Add.observe('before save', function(ctx, next) {
    ctx.instance.type = 'add-entry';
    next();
  });
   
  Add.entry = async function(msg) {
        return 'Adding Etnry... ' + msg;
    }

    Add.remoteMethod('entry', {
          accepts: {arg: 'msg', type: 'string'},
          returns: {arg: 'adding', type: 'string'},
		  http: {path: '/add-entry', verb: 'post'}
    });
   
  
};
