Router.map(function(){
  this.route('Notification',{
    path: '/notifications',
    waitOn: function(){
      Meteor.subscribe('getAllMods', Meteor.userId());
      mod = userRole.find({userId: Meteor.userId()}).fetch();
      templateData = {};
      //console.log(mod);
      mod = mod[0].modules;
      if(mod.indexOf('Notification')>-1){
        templateData['createNotif'] = true;
      }else {
        templateData['createNotif'] = false;
      }
      templateData['pageTitle'] = "Notifications";
      templateData['pageSubtitle'] = "Active Notifications";
      //console.log(templateData);
    },
    data: function(){
      //console.log(templateData);
      return templateData;
    },
    template: 'notifications',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('viewNotification',{
    path: '/announcements',
    waitOn: function(){
      templateData = {};
      Meteor.subscribe('getAllNotif', 'Participant')
      templateData['pageTitle'] = "Notifications";
      templateData['pageSubtitle'] = "Active Notifications";
    },
    data: function(){
      return templateData;
    },
    template: 'notificationsPub',
    layoutTemplate: 'publicLayout',
  });
});
