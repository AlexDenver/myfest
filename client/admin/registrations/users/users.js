Template.addUser.created = function() {
  // this.hType = new ReactiveVar(false);
  // this.hType.set(false);

};
Template.addUser.onRendered(function() {
  $(document).ready(function() {
    $('select').material_select();
  });
  $('.evSelector').hide();
  $('.userType input').on('change',function() {
    var utype = $(this).val();
    if($(this).val()=='Event Head')
      $('.evSelector').show();
    else
    $('.evSelector').hide();
  })
})
Template.addUser.events({
  'submit #addUser': function(ev) {
    ev.preventDefault();
    var usn = event.target.username.value;
    var pwd = event.target.password.value;
    var cnf_pwd = event.target.password2.value;
    var eventName = event.target.eventName.value
    var type = $('.userType input[type="radio"]:checked').val();
    var privs = [];
    $('div.privs input[type="checkbox"]:checked').each(function(){
      privs.push(this.name);
    });
    if(usn==""){
      Materialize.toast("<i class='tSpace fa fa-info-circle'></i>Username is a required field.", 2500, 'red');
      // return false;
    }else if(pwd!=cnf_pwd){
      Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i>Passwords do not match.", 2500, 'red');
      // return false;
    }else{
      Meteor.call('createUserAccount',usn, pwd, privs,type,eventName, function(err){
            if(err){
              Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i>"+err.message, 2500, 'deep-orange');
            }else{
              Materialize.toast("<i class='tSpace fa fa-check'></i>Account Created", 2500, 'blue');
              $('#addUser')[0].reset();
              Materialize.updateTextFields();
            }
      });
      // Accounts.createUser({
      //   username: usn,
      //   password: pwd,
      //   profile: {
      //     createdAt: new Date(),
      //     name: null
      //   },
      //   modules: privs,
      //   userType: 'admin'
      // }, function(err){
      //     if(err){
      //       Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i>"+err.message, 2500, 'deep-orange');
      //     }else{
      //       Materialize.toast("<i class='tSpace fa fa-check'></i>Account Created", 2500, 'blue');
      //     }
      // });
    }
    return false;
  },
  'click .userType': function(event) {
    $('.privs input[type="checkbox"]').prop('checked',false);
    var selUsr = $('.userType input[type="radio"]:checked').val();
    if(selUsr=="Custom")
    return;
    var truMod = jQuery.grep(usersSchema, function(obj){
      return obj.value === selUsr;
    });
    jQuery.each(truMod[0]['modules'],function(i,val){
      $('#'+val).prop('checked',true);
    });
  }
});

Template.addUser.helpers({
  'userTypes': function(cat){
      usersSchema = [
        {"value":'Event Head',"modules":["Notification","Event"]},
        {"value":'Certificate Committee',"modules":["Notification","Score"]},
        {"value":'Reception Committee',"modules":["Notification","Team"]},
        {"value":'Arrangement',"modules":["Notification"]},
        {"value":'Program Drafting',"modules":["Scheduler","Notification","Score","Event"]},
        {"value":'Alpha', "modules":['Scheduler','Notification','Score','Event','Team']}
      ];
      return usersSchema;
  },
  'eventInEvents': function(){
    ev = events.find().fetch();
    return ev;
  }
});
Template.users.onRendered(function() {
  Meteor.subscribe('allUsers');
})
Template.users.helpers({
  'user': function(){
    return Meteor.users.find().fetch();
  }
});
