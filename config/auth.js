module.exports = {
   ensureAuthenticated: function(req, res, next) {
      if(req.isAuthenticated()) {
         return next();
      }
      req.flash('error_message', 'Connect to be able to have access to resources');
      res.redirect('/users/login');
   }
}