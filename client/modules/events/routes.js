Router.map(function(){
  this.route('addEvent',{
    path: '/events/add',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Events";
      templateData['pageSubtitle'] = "Add an Event";
      return templateData;
    },
    template: 'addEvent',
    layoutTemplate: 'userLayout',

  });
});
Router.map(function(){
  this.route('viewEvent',{
    path: '/events',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Events";
      templateData['pageSubtitle'] = "Manage Events";
      return templateData;
    },
    template: 'eventsList',
    layoutTemplate: 'userLayout',

  });
});

Router.map(function(){
  this.route('manageEvent',{
    path: '/events/:_id',
    waitOn: function(){
      return Meteor.subscribe('getAllEvents');
    },
    data: function(){
      Meteor.subscribe('getAllEvents');
      templateData = {};
      //console.log(this.params._id);
      templateData = events.findOne({_id: this.params._id});
      //console.log(templateData);
      templateData['pageTitle'] = "Update Event";
      templateData['pageSubtitle'] = "Manage Events";
      return templateData;
    },
    template: 'manageEvent',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('eheadEvent',{
    path: '/event/:_id',
    waitOn: function(){
      Meteor.subscribe('manageEvent',Router.current().params._id);
      Meteor.subscribe('getThisEventSheets',Router.current().params._id);
      Meteor.subscribe('getQuiz',Router.current().params._id);
      Meteor.user();
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = 'Manage Event';
      templateData['pageSubtitle'] = "";
      return templateData;
    },
    template: 'ehManageEvent',
    layoutTemplate: 'userLayout',
  });
});
