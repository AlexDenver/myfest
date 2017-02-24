
Template.profile.helpers({
  'name': function(){
    setTimeout(function () {
      Materialize.updateTextFields();
    }, 500);
    return Meteor.user().profile.name;
  },
  'mobile': function() {
    return Meteor.user().mobile;
  }
});
Template.profile.events({
  'submit .profile': function(event){
    event.preventDefault();
    var name = event.target.name.value;
    var mob = event.target.mobile.value;
    var pass = event.target.password.value;
    var pass2 = event.target.password2.value;
    opt = {};
    if(name!='' && name!=Meteor.user().name){
      opt['name'] = name;
    }
    if(mob!='' && mob!=Meteor.user().mobile){
      opt['mobile'] = mob;
    }
    if(pass!='' || pass2!= ''){
      if(pass!=pass2){
        Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i> Passwords do not match", 2500, 'deep-orange');
      }else {
        opt['password'] = pass;
      }
    }
    Meteor.call('updateUser', opt, Meteor.userId());
    return false;
  }
})
