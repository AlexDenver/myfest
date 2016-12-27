
Router.map(function(){
  this.route('manageSheet',{
    path: '/sheets/manage/:_id',
    waitOn: function(){
      return Meteor.subscribe('getThisSheet',this.params._id);
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Judges Sheet";
      templateData['pageSubtitle'] = "Manage Sheets";
      return templateData;
    },
    template: 'manageSheet',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('viewSheet',{
    path: '/sheets/',
    waitOn: function(){
      // return Meteor.subscribe('getAllEvents');
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Judges Sheet";
      templateData['pageSubtitle'] = "Sheets Collections";
      return templateData;
    },
    template: 'viewSheets',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('viewJudge',{
    path: '/judge/:_id',
    waitOn: function(){
      Meteor.subscribe('getAllEvents');
      Meteor.subscribe('getThisSheet',this.params._id);
      Meteor.subscribe('activepartevent');
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Judges Event";
      templateData['pageSubtitle'] = "";
      return templateData;
    },
    template: 'judge',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('scoreTeam',{
    path: '/scores/',
    waitOn: function(){
      Meteor.subscribe('getAllEvents');
      Meteor.subscribe('activepart');
      Meteor.subscribe('getCodes');
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Team Scores";
      templateData['pageSubtitle'] = "";
      return templateData;
    },
    template: 'scores',
    layoutTemplate: 'userLayout',
  });
});
