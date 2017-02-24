Router.map(function(){
  this.route('viewTeam',{
    path: '/registrations',
    waitOn: function(){
    //   return Meteor.subscribe('findAllReg');
        Meteor.subscribe('getCodes');
    },

    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Registrations";
      templateData['pageSubtitle'] = "Manage Team";
      return templateData;
    },
    template: 'registrations',
    layoutTemplate: 'userLayout',
  });
});


  Router.map(function(){
    this.route('manageTeam',{
      path: '/registrations/:_id',
      waitOn: function(){
        Meteor.subscribe('specificTeam', this.params._id);
        Meteor.subscribe('activepart');
        Meteor.subscribe('getCodes');
      },
      data: function(){
        var regx = this.params._id;
        //console.log(regx);
        var templateData = {};
        // templateData = entry.find({_id: regx}).fetch()[0];
        // //console.log(templateData);
        templateData['pageTitle'] = "Manage Registrations";
        if(templateData.reg_id)
          // templateData['pageSubtitle'] = templateData.info.college;
          templateData['pageSubtitle'] = 'College';

        else
          templateData['pageSubtitle'] = "Team";
        return templateData;
      },
      // waitOn: function(){
      //   return Meteor.subscribe('findAllReg');
      // },
      // data: function(){
      //   var regx = this.params._id;
      //   templateData = entry.find().fetch();
      //   return templateData;
      // },
      template: 'detailedTeam',
      layoutTemplate: 'userLayout',

    });
  });

  Router.map(function(){
    this.route('addTeam',{
      path: '/registrations/register',
      waitOn: function(){
        // return Meteor.subscribe('specificTeam', this.params._id);
        Meteor.subscribe('getCodes');
      },
      data: function(){
        templateData = {};
        templateData['pageTitle'] = "Registrations";
        templateData['pageSubtitle'] = "Register Team";
        return templateData;
      },
      // waitOn: function(){
      //   return Meteor.subscribe('findAllReg');
      // },
      // data: function(){
      //   var regx = this.params._id;
      //   templateData = entry.find().fetch();
      //   return templateData;
      // },
      template: 'addTeam',
      layoutTemplate: 'userLayout',

    });
  });
  Router.map(function(){
    this.route('Team',{
      path: '/registrations/codes',
      waitOn: function(){
        Meteor.subscribe('getCodes');
      },
      data: function(){
        templateData = {};
        templateData['pageTitle'] = "Manage";
        templateData['pageSubtitle'] = "Team Codes";
        return templateData;
      },
      // waitOn: function(){
      //   return Meteor.subscribe('findAllReg');
      // },
      // data: function(){
      //   var regx = this.params._id;
      //   templateData = entry.find().fetch();
      //   return templateData;
      // },
      template: 'teamCodes',
      layoutTemplate: 'userLayout',

    });
  });
  Router.map(function(){
    this.route('listTeam',{
      path: '/registrations/list',
      waitOn: function(){
        Meteor.subscribe('activepart');
        Meteor.subscribe('getCodes');
        Meteor.subscribe('getAllEvents');
      },
      data: function(){
        templateData = {};
        templateData['pageTitle'] = "Participant List";
        templateData['pageSubtitle'] = "";
        return templateData;
      },
      // waitOn: function(){
      //   return Meteor.subscribe('findAllReg');
      // },
      // data: function(){
      //   var regx = this.params._id;
      //   templateData = entry.find().fetch();
      //   return templateData;
      // },
      template: 'teamList',
      layoutTemplate: 'userLayout',

    });
  });
