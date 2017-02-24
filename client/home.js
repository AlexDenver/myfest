Template.userHome.onRendered(function() {
  user = Meteor.user();
  Meteor.subscribe('getAllNotif',Meteor.user().userType);
});
Template.notifWidget.onRendered(function() {
  user = Meteor.user();
  Meteor.subscribe('getAllNotif',Meteor.user().userType);
});

Template.userHome.helpers({
  'userType': function(type) {
    if(user.userType==type)
      return true;
  },
});
Template.quickLinks.helpers({
  'isDefault': function(){
    if(user.default)
      return true
  },
  'isEventHead': function() {
    if(Meteor.user().userType=='Event Head')
      return true;
  },
  'isAlpha': function() {
    if(Meteor.user().userType=='Alpha')
      return true;
  },
  'getEventId': function() {
    return Meteor.user().controls.eventId;
  },
  'getQuizId': function() {
    return Meteor.user().controls.quizId;
  },
  'isReception': function(){
    if(Meteor.user().userType=='Reception Committee')
      return true;
  }
})
Template.quickLinks.events({
  'click .defaultUser': function(){
    MaterializeModal.form({
      bodyTemplate: 'defaultPass',
      title:'Welcome to myFest',
      callback: function(err,rtn){
        if(rtn.submit){
          if(rtn.form.password==rtn.form.password2){
            Accounts.changePassword(rtn.form.current, rtn.form.password2, function (err) {
              if(err){
                Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i>"+err.message+"  try again.", 2500, 'deep-orange');
              }else{
                Meteor.call('notDefault',user.userId);
                Materialize.toast("<i class='tSpace fa fa-check'></i>Welcome home...", 2500, 'blue');
              }
            })
          }else{
            Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i> Passwords do not match, try again.", 2500, 'deep-orange');
          }
        }
      },
      submitLabel: 'Update',
      closeLabel: '',
      dismissible: false
    });
  },
  'click .createNotif': function(){
    MaterializeModal.form({
      bodyTemplate: 'addNotif',
      title:'Create Notification',
      callback: function(err,rtn){
        if(rtn.submit){
          notif.insert({
            message: rtn.form.message,
            user: Meteor.user().username,
            eventname: Meteor.user().eventname,
            createdOn: new Date(),
            priority: rtn.form.priority,
            isPublic: rtn.form.isPublic,
            autoDelete: rtn.form.autoDelete,
            active: true
          });
        }
      },
      submitLabel: 'Submit <i class=" spacel fa fa-bell-o"></i>',
      closeLabel: 'Cancel'
    });
  },
  'click .checkinTeam': function(){
    MaterializeModal.prompt({
      title: "Check-in Team",
      callback: function(err,rtn){
        if(rtn.submit){
          thisTeam = entry.find({reg_id: rtn.value}).fetch()[0];
          if(thisTeam){
              Materialize.toast("<i class='tSpace fa fa-check'></i>Entry Found, Redirecting", 2500, 'blue');
              Router.go('/team/'+thisTeam._id)
          }else{
            Materialize.toast("<i class='tSpace fa fa-check'></i>Entry Not Found, Please Register", 2500, 'bottom deep-orange');
          }

        }
      },
      submitLabel: 'Update',
      closeLabel: 'Cancel',
      message: 'Enter new Message',
      placeholder: actualThis.message
    })
  },
})
Template.notifWidget.helpers({
  'isHighPriority': function(pri) {
    return (pri == 'high' || pri=='disq') ;
  },
  'isNotHighPriority': function(pri) {
    return (pri != 'high' || pri=='disq');
  },
  'notifications': function() {
    return notif.find({active: true}).fetch();
  },
  'classFor': function(pri){
    if(pri=='high'){
      return ' deep-orange white-text';
    }else if(pri=='medium'){
      return ' amber black-text';
    }else if(pri=='low'){
      return ' blue white-text';
    }else if(pri=='disq'){
      return ' indigo white-text'
    }
  },
  'creator': function(user){
    if(Meteor.user().username==user || (Meteor.user().userType == 'Reception Committee')|| (Meteor.user().userType == 'Alpha'))
      return true
  },
  'isEvent': function(){
    if(this.eventname=="")
    return false;
    if(this.eventname!=null){
      return true
    }
  },
  'testUser':function(isPub) {
    if(Meteor.user().userType=="Participant")
      if(isPub)
        return false;

      return true
  },
  'notOld': function(){
    lapsed= (new Date) - this.createdOn;
    if(lapsed>1200000 && (this.autoDelete))
      return false;
    else
      return true;
  },
});
Template.notifWidget.events({
  'click .delNotif': function(){
    actualThis = this;
    MaterializeModal.confirm({
      title: "Confirm Delete",
      message: 'Are you sure you want to delete?',
      callback: function(err,rtn){
        if(rtn.submit){
          notif.update({_id:actualThis._id},{$set:{active: false}});
        }
      }
    });
  },
  'click .message': function(){
      actualThis = this;
      if(this.user!=Meteor.user().username)
        return false;
      MaterializeModal.prompt({
        title: "Update Notification Message",
        callback: function(err,rtn){
          if(rtn.submit){
            notif.update({_id:actualThis._id},{$set:{message: rtn.value}});
          }
        },
        submitLabel: 'Update',
        closeLabel: 'Cancel',
        message: 'Enter new Message',
        placeholder: actualThis.message
      })
  },
  'click .priorityCh': function(){
    actualThis = this;
    if(this.user!=Meteor.user().username)
      return false;
    MaterializeModal.form({
      title: "Update Notification Priority",
      bodyTemplate:'changePriori',
      callback: function(err,rtn){
        if(rtn.submit){
          notif.update({_id:actualThis._id},{$set:{priority: rtn.form.priority}});
        }
      },
      submitLabel: 'Update',
      closeLabel: 'Cancel',
      message: 'Select New Priority',
    })
  },
});

Template.utility.helpers({
  'totalCount' : function() {
    var reg = entry.find().fetch();
    return reg.length;
  },
  'totalCheckIn': function() {
    var reg = entry.find({checkin:true}).fetch();
    return reg.length;
  },
  'totalParticipants': function() {
    var total = 0;
    // var reg = entry.find({checkin:true}).fetch();
    var parti = partDB.find().fetch();
    $.each(parti,function(k,val){
      $.each(val.names,function(ikey,ival) {
        total++;
      });
    });

    return total;
  }
})
Template.participants.helpers({
  'participantList': function() {
    var a = entry.find({}, {sort: {checkin: -1}}).fetch();
    var eventN = Meteor.user().eventname.toLowerCase();
    var eventData = events.find().fetch()[0];
    var participant = [];
    $.each(a,function(key,val) {
      if(val.team!=null && val.team[eventN]!=null){
        var pObj = {
          code: val.teamCode,
          present: val.checkin?true:false,
          name: val.team[eventN].p.a,
        };
        if(parseInt(eventData['pcount'])>1){
          pObj['name2'] = val.team[eventN].p.b;
        }
        participant.push(pObj);
      }
    });
    return participant;
  },
  'getNames': function(){
    if(this.name2){
      return this.name + " & " + this.name2;
    }else {
      return this.name
    }
  },
  'getColor': function(pre) {
    if(pre)
      return 'blue';
    else
      return 'deep-orange';
  },

})

Template.eventUtil.helpers({
  'eventDetails':function() {
    var eventsCol = events.find().fetch()[0];
    if(eventsCol && eventsCol.details)
    return eventsCol.details;
  },
  'participants': function() {
    return partDB.find({}, {sort: {score: -1}}).fetch();
  }
})
