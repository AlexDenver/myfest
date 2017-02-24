Template.topNav.onRendered(function() {
  $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 35, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false
    }
  );
  $(".button-collapse").sideNav();
});
Template.topNav.helpers({
  'getUsn': function() {
    return (Meteor.user().username)
  }
});
Template.topNav.events({
  'click .logout': function(event){
    Meteor.logout(function(error) {
        if(error) {

        }else{
          Router.go('login');
        }
     });
  },
  'click #back': function() {
    history.back();
  }
});

Template.navigation.created = function() {
  this.ModulesList = new ReactiveVar();
  scopeNavThis = this;
  Meteor.call('getModules', Meteor.userId(),function(err,res){
    if(!err){
      scopeNavThis.ModulesList.set(res);
    }
  });
};
Template.navigation.onRendered(function() {
  setTimeout(function () {
    new mlPushMenu( document.getElementById( 'mp-menu' ), document.getElementById( 'trigger' ) );
  }, 1000);
})
Template.navigation.helpers({
  'availableModules': function(){
    return Template.instance().ModulesList.get();
  },
  'getEventId':function(){
    return Meteor.user().controls.eventId;
  },
  'mergedRoute': function(str){
    var exists = Router.path(str+this);
    if(exists)
      return exists;
    else
      return false;
  },
  'scheduler': function(mod){
    if(mod=='Scheduler'){
      return true;
    }
  },
  'isNotification': function(mod){
    if(mod=='Notification')
    return true;
  },
  'isEventAndEh':function(mod) {
    if(mod=='Event' && Meteor.user().userType == 'Event Head')
      return true;
  },
  'isReception':function(mod) {
    if(mod=='Team' && (Meteor.user().userType == 'Reception Committee' || Meteor.user().userType == 'Alpha') )
      return true;
  }

});
