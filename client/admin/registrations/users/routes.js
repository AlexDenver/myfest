Router.map(function(){
  this.route('viewUser',{
    path: '/users',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Users";
      templateData['pageSubtitle'] = "Manage Users";
      return templateData;
    },
    // waitOn: function(){
    // },
    // data: function(){
    // },
    template: 'users',
    layoutTemplate: 'userLayout',

  });
});
Router.map(function(){
  this.route('addUser',{
    path: '/users/add',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
        Meteor.subscribe('getAllEvents');
    },

    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Users";
      templateData['pageSubtitle'] = "Add New User";
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
    template: 'addUser',
    layoutTemplate: 'userLayout',

  });
});
Router.map(function(){
  this.route('manageUser',{
    path: '/users/manage',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Users";
      templateData['pageSubtitle'] = "Add New User";
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
    template: 'addUser',
    layoutTemplate: 'userLayout',

  });
});
Router.map(function(){
  this.route('profile',{
    path: '/users/profile',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "";
      templateData['pageSubtitle'] = "Manage your Profile";
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
    template: 'profile',
    layoutTemplate: 'userLayout',

  });
});
