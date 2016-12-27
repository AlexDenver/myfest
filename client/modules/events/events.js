Template.addEvent.events({
  'submit #addEvent': function(event) {
    var eventx = {};
    //console.log(event);
    eventx['name'] = event.target.ename.value;
    eventx['friendly'] = event.target.efriendly.value;
    eventx['pcount'] = event.target.pcount.value;
    eventx['rounds'] = event.target.rcount.value;
    if(eventx['name']!=''|| eventx['friendly']!=''||
      eventx['pcount']!=''|| eventx['rounds']!=''){
      Meteor.call('addEvent', eventx,function (err) {
        if(!err){
          Materialize.toast("<i class='tSpace fa fa-check'></i>Event Added!", 2500, 'blue');
          $('#addEvent')[0].reset();
          Materialize.updateTextFields();
        }
      });
    }
    return false;
  }
});
Template.eventsList.helpers({
  'eventInEvents': function(){
    Meteor.subscribe('getAllEvents');
    return events.find();
  },
  'getColor': function() {
    var colors = ['red','pink','purple','deep-purple','indigo','blue',
    'light-blue','cyan','teal','green','light-green',
    'lime','yellow','amber','orange','deep-orange',
    'brown','grey','blue-grey','black','white','transparent'];
    color = colors[Math.floor(Math.random()*colors.length)];
    //console.log(color);
    return color;
  }
});
Template.manageEvent.onRendered(function(){
  Meteor.subscribe('manageEvent',Router.current().params._id);
  Materialize.updateTextFields();
});
Template.manageEvent.events({
  'submit #manageEvent': function(){
    var eventx = {};
    eventx['friendly'] = event.target.efriendly.value;
    eventx['name'] = event.target.ename.value;
    eventx['pcount'] = event.target.pcount.value;
    eventx['rounds'] = event.target.rcount.value;
    eventx['usn'] = event.target.usn.value;
    Meteor.call('updateEvent', eventx, this._id, function(err) {
      Materialize.toast("<i class='tSpace fa fa-check white-text'></i>Update Successful!", 2500, 'blue');
    });

    return false;
  }
});
Template.ehManageEvent.onRendered(function(){
  Materialize.updateTextFields();
  this.roundIncr=0;
});
Template.ehManageEvent.helpers({
  'roundsInEvent': function() {
    eventData = events.find().fetch();
    return eventData[0].details;
  },
  'getSheet': function(round) {
    return '1';
  },
  'getIncr': function(){
    return true;
  },
  'getQuiz': function(round) {
    return true
  },
  'getTotal': function(round) {
    var thisSheet = jsheet.find({name: this.name}).fetch();
    //console.log(thisSheet);
    //console.log("this sheet_^");


    var total = 0;
    if(thisSheet[0]['sheet']){
      if(thisSheet[0]['sheet'].length>=0)
      thisSheet[0]['sheet'].forEach(function(val) {
        questVal = val.upbound - val.lbound;
        //console.log("QuestVal:"+questVal);
        total += questVal;
        //console.log("total:"+total);
      })
    }
    return total;
  },
  'test': function(a) {
    //console.log("this");
    //console.log(a);
  }
});
Template.ehManageEvent.events({
  'click .addRound': function(ev) {
    MaterializeModal.form({
      bodyTemplate: 'addEventModal',
      title:'Add Round',
      callback: function(err,rtn){
        if(rtn.submit){
          //console.log("create");
          qid = false;
          if(rtn.form.useQuiz){
            qid = quiz.insert({
              eventId: Router.current().params._id,
              eventname: Meteor.user().eventname,
              round: rtn.form.name});
          }
          var jsid=jsheet.insert({
            name: rtn.form.name,
            user: Meteor.user().username,
            evid: Router.current().params._id,
            event: Meteor.user().eventname
          });
          events.update({_id: Router.current().params._id},{$push:{details:{
            user: Meteor.user().username,
            createdOn: new Date(),
            active: true,
            name: rtn.form.name,
            qualify: rtn.form.qualifying,
            venue: rtn.form.venue,
            judges: rtn.form.judge,
            roundStart: rtn.form.stime,
            roundEnd: rtn.form.etime,
            judgeSheet: jsid,
            quizId: qid
          }}});
        }
      },
      submitLabel: 'Submit <i class=" spacel fa fa-paper-plane white-text "></i>',
      closeLabel: 'Cancel'
    })
  },
  'click .delRound': function(ev) {
    actualThis = this;
    //console.log(this);
    MaterializeModal.alert({
      title: 'Delete Round',
      message: 'Are you sure you want to delete round?',
      callback: function(err,rtn){
        if(rtn.submit){
          var id = actualThis._id;

          //console.log(id);
          //console.log(actualThis.name);
          var count = ev.target.dataset.count;
          var updateArrDoc = {};
          var rounds = events.find().fetch();
          rounds[0].details[count].active = false;
          //console.log(rounds);
          events.update({'_id': Router.current().params._id}, {$set:{'details':rounds[0].details}} );
        }
      },
      icon: ' '
    })
  }
})
Template.addEventModal.onRendered(function(){
  $('.datepicker').pickadate({
    selectMonths: false, // Creates a dropdown to control month
    selectYears: false, // Creates a dropdown of 15 years to control year
    selectTime: true
  });
})
