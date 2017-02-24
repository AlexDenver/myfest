Router.map(function(){
  this.route('manageQuiz',{
    path: '/quiz/manage/:_id',
    waitOn: function(){
      Meteor.subscribe('getQuiz',this.params._id);
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Quiz";
      templateData['pageSubtitle'] = "Manage Quizzes";
      return templateData;
    },
    template: 'manageQuiz',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('panelQuiz',{
    path: '/quiz/manage/',
    waitOn: function(){
      uid = Meteor.userId();
      var user = Meteor.users.find({_id: uid}).fetch()[0];
      Meteor.subscribe('getQuiz');
      Meteor.subscribe('getAllEvents',user.eventname);
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Quiz";
      templateData['pageSubtitle'] = "Quiz Panel";
      return templateData;
    },
    template: 'quizPanel',
    layoutTemplate: 'userLayout',
  });
});
Router.map(function(){
  this.route('startQuiz',{
    path: '/quiz/start/:_id',
    waitOn: function(){
      uid = Meteor.userId();
      if(uid){
        var user = Meteor.users.find({_id: uid}).fetch()[0];
        if(user.userType=='Event Head')
          Meteor.subscribe('getQuiz',this.params._id);
      }else{
          Meteor.subscribe('getQuizParti',this.params._id);
          Meteor.subscribe('getCodes','used');
      }
      // Meteor.subscribe('getQuiz');
      // Meteor.subscribe('getAllEvents',user.eventname);
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Quiz";
      templateData['pageSubtitle'] = '';
      return templateData;
    },
    template: 'quiz',
    layoutTemplate: 'quizLayout',
  });
});

Router.map(function(){
  this.route('scoreQuiz',{
    path: '/quiz/results',
    waitOn: function(){
      // uid = Meteor.userId();
      Meteor.subscribe('allAnsxx');
      Meteor.subscribe('activepart');
      // Meteor.subscribe('getAllEvents',user.eventname);
    },
    data: function(){
      templateData= {};
      templateData['pageTitle'] = "Quiz";
      templateData['pageSubtitle'] = 'Results';
      return templateData;
    },
    template: 'viewAns',
    layoutTemplate: 'userLayout',
  });
});
