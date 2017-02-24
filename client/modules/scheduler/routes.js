Router.map(function(){
  this.route('manageScheduler',{
    path: '/scheduler',
    waitOn: function(){
      Meteor.subscribe('schedulesList');
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Scheduler";
      templateData['pageSubtitle'] = "Schedules";
      return templateData;
    },
    template: 'schedulerHome',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('viewScheduler',{
    path: '/scheduler/:_id',
    waitOn: function(){
      Meteor.subscribe('schedulesList');
      Meteor.subscribe('getAllEvents');
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Scheduler";
      templateData['pageSubtitle'] = "Generate Schedule";
      return templateData;
    },
    template: 'schedulerTable',
    layoutTemplate: 'userLayout',
  });
});
