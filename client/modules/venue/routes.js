Router.map(function(){
  this.route('addVenue',{
    path: '/venues/add',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Venues";
      templateData['pageSubtitle'] = "Add an Venue";
      return templateData;
    },
    template: 'addVenue',
    layoutTemplate: 'userLayout',

  });
});
Router.map(function(){
  this.route('viewVenue',{
    path: '/venues',
    waitOn: function(){
      // return Meteor.subscribe('specificTeam', this.params._id);
    },
    data: function(){
      templateData = {};
      templateData['pageTitle'] = "Venues";
      templateData['pageSubtitle'] = "Manage Venues";
      return templateData;
    },
    template: 'venuesList',
    layoutTemplate: 'userLayout',

  });
});

Router.map(function(){
  this.route('manageVenue',{
    path: '/venues/:_id',
    waitOn: function(){
      return Meteor.subscribe('getAllVenues');
    },
    data: function(){
      Meteor.subscribe('getAllVenues');
      templateData = {};
      //console.log(this.params._id);
      templateData = venues.findOne({_id: this.params._id});
      //console.log(templateData);
      templateData['pageTitle'] = "Update Venue";
      templateData['pageSubtitle'] = "Manage Venues";
      return templateData;
    },
    template: 'manageVenue',
    layoutTemplate: 'userLayout',
  });
});
