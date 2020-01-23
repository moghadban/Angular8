'use strict';

module.exports = function(Edit) {
 Edit.handleChangeError = function(err) {
    console.warn('Cannot Edit due to: ', err);
  };
  
  Edit.observe('before save', function(ctx, next) {
    ctx.instance.type = 'edit-entry';
    next();
  });
};
