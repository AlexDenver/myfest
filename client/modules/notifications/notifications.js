Template.notifications.created = function(){
  this.privs = new ReactiveVar(false);
  this.updateMin = new ReactiveVar(0);
  actualThis = this;
  Meteor.setInterval(function() {
    temp = actualThis.updateMin.get() + 1;
    actualThis.updateMin.set(temp);
  }, 30000)
  //console.log(this);
  //console.log("this");
};
Template.notifications.onRendered(function(){
  Meteor.subscribe('getAllMods',Meteor.userId());
  Meteor.subscribe('getAllNotif',Meteor.user().userType);
});
Template.notifications.helpers({
  'userCan': function(){
    mod = userRole.find({userId: Meteor.userId()}).fetch();
    var returnVal;
    setTimeout(function () {
      var index = mod[0].modules.indexOf('Notification');
      //console.log(index+" ->2");
      if(index!=-1){
        //console.log(index+" ->3");
        returnVal = true;
      }else
      returnVal = false;
      // return Template.instance().privs.get();;
    }, 200);
    //console.log(returnVal);
    return returnVal;
  },
  'notifInNotif': function(){
    var temp = Template.instance().updateMin.get();
    return notif.find({user:Meteor.user().username, active: true}).fetch();
  },
  'notOld': function(){
    //console.log(this);
    var temp = Template.instance().updateMin.get();
    lapsed= (new Date) - this.createdOn;
    if(lapsed>1200000 && (this.autoDelete))
      return false;
    else
      return true;
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
  }
});
Template.notifications.events({
  'click .createNotif': function(){
    MaterializeModal.form({
      bodyTemplate: 'addNotif',
      title:'Create Notification',
      callback: function(err,rtn){
        if(rtn.submit){
          //console.log("create");
          notif.insert({
            message: rtn.form.message,
            user: Meteor.user().username,
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
  'click .message': function(){
      actualThis = this;
      MaterializeModal.prompt({
        title: "Update Notification Message",
        callback: function(err,rtn){
          if(rtn.submit){
            //console.log(rtn);
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
    MaterializeModal.form({
      title: "Update Notification Priority",
      bodyTemplate:'changePriori',
      callback: function(err,rtn){
        if(rtn.submit){
          //console.log(rtn);
          notif.update({_id:actualThis._id},{$set:{priority: rtn.form.priority}});
        }
      },
      submitLabel: 'Update',
      closeLabel: 'Cancel',
      message: 'Select New Priority',
    })
  },
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
  }
})
Template.notificationsPub.helpers({
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
    return false
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
