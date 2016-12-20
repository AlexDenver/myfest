Template.addVenue.events({
  'submit #addVenue': function(event) {
    event.preventDefault();
    var venue = {};
    //console.log(event);
    //console.log(event.target.projector.value);
    venue['name'] = event.target.vname.value;
    venue['roomno'] = event.target.roomno.value;
    venue['type'] = event.target.type.value;
    venue['capacity'] = event.target.capacity.value;
    venue['projector'] = event.target.projector.value;
    if(venue['name']!=''|| venue['roomno']!=''||
      venue['type']!=null|| venue['capacity']!=''||
      venue['projector']!=null){
      // Meteor.call('addEvent', venue);
      var id = venues.insert(venue);
      //console.log(id);
    }
    return false;
  }
});
Template.venuesList.events({
  'click .delVenue': function(ev){
    venues.update({_id: this._id}, {$set:{deleted: true}});
    //console.log("deleted");
  }
});
Template.venuesList.helpers({
  'venueInVenues': function(){
    return venues.find();
  },
  'getColor': function() {
    var colors = ['red','pink','purple','deep-purple','indigo','blue',
    'light-blue','cyan','teal','green','light-green',
    'lime','amber','orange','deep-orange',
    'brown','grey','blue-grey'];
    color = colors[Math.floor(Math.random()*colors.length)];
    //console.log(color);
    return color;
  },
  'isDeleted': function(delFlag) {
    if(delFlag==null){
      return true;
    }else
      return !delFlag;
  }
});
Template.venuesList.onRendered(function(){
  Meteor.subscribe('getAllVenues');
});
Template.manageVenue.onRendered(function(){
  Meteor.subscribe('getAllVenues');
  //console.log(this);
  $('#'+this.data.type).prop('checked',"checked");
  $('#'+(this.data.projector?'proYes':'proNo')).prop('selected',"selected");
  Materialize.updateTextFields();
  $('select').material_select();
});
Template.addVenue.onRendered(function() {
  Meteor.subscribe('getAllVenues');
  $('select').material_select();

});
Template.manageVenue.events({
  'submit #manageEvent': function(){
    var eventx = {};
    eventx['name'] = event.target.ename.value;

    Meteor.call('updateEvent', eventx, this._id);
    return false;
  }
});
