Template.initSchedule.created = function(){
  this.daysObj = new ReactiveVar([{day: 1}]);
}
Template.initSchedule.onRendered(function () {

})
Template.initSchedule.helpers({
  'days': function(){
    var days = Template.instance().daysObj.get();
    return days;
  },
  'daysString': function() {
    var days = Template.instance().daysObj.get();
    return JSON.stringify(days,null, 2);
  }
});
Template.initSchedule.events({
  'click .addDay': function(ev,template) {
    var temp = template.daysObj.get();
    temp.push({day: temp.length+1});
    template.daysObj.set(temp);
  },
  'click .remDay': function(ev,template) {
    var temp = template.daysObj.get();
    if(temp.length==1){
      Materialize.toast("<i class='fa fa-frown-o bold'></i> &nbsp;<span class='bold'>Let the fest be for atleast a day!</span>",2000,'red');
      return;
    }
    temp.pop();
    template.daysObj.set(temp);
  },
  'change .start':function(ev,template) {
    var temp = template.daysObj.get();
    var i = parseInt(ev.target.dataset.index) - 1;
    temp[i]['start'] = parseInt(ev.target.value);
    template.daysObj.set(temp);
  },
  'change .end': function(ev,template) {
    var temp = template.daysObj.get();
    var i = parseInt(ev.target.dataset.index) - 1;
    var endTime = parseInt(ev.target.value);
    endTime = endTime<12?endTime+12:endTime;
    ev.target.value = endTime;
    temp[i]['end'] = endTime;
    template.daysObj.set(temp);
  },
  'change .eclose': function(ev,template) {
    var temp = template.daysObj.get();
    temp[0]['eclose'] = parseInt(ev.target.value);
    template.daysObj.set(temp);
  },
  'change .interval': function(ev,template) {
    var temp = template.daysObj.get();
    temp[0]['interval'] = parseInt(ev.target.value);
    template.daysObj.set(temp);
  },
  'change .festinit': function(ev,template) {
    var temp = template.daysObj.get();
    temp[0]['open'] = parseInt(ev.target.value);
    template.daysObj.set(temp);
  },
  'change .valedict': function(ev,template) {
    var temp = template.daysObj.get();
    temp[0]['close'] = parseInt(ev.target.value);
    template.daysObj.set(temp);
  },
  'submit .scheduleinit': function(ev,template) {
    ev.preventDefault();
    var name = ev.target.nick.value;
    var temp = template.daysObj.get();
    var sch = {
      name: name,
      days: temp.length,
      event_close: temp[0].eclose,
      interval: temp[0].interval | 1,
      innagural: temp[0].open,
      valedictory: temp[0].close,
      schedule: []
    };
    $.each(temp,function (k,v) {
      var tempAr = [];
      var hrs = parseInt(v.end) - parseInt(v.start);
      var slots = hrs*2;
      var toggle = true;
      var timeInc = parseInt(v.start);
      for(i=1;i<=slots;i++){
        // timeInc = timeInc>12?timeInc-12:timeInc;
        var stime = timeInc + ':' + (toggle?'00':'30');
        timeInc = i%2==0?timeInc+1:timeInc;
        var etime = timeInc + ':' + (toggle?'30':'00');
        toggle = !toggle;
        tempAr.push({
          stime: stime,
          etime: etime,
          free: true,
          event: 'WebDesign',
          round: 1,
        });
      }
      sch.schedule.push(tempAr);
    });
    console.log(sch);
    var inId = schedb.insert(sch);
    if(inId){
      $('#materializeModal').closeModal();
      Materialize.toast("<i class='tSpace fa fa-check'></i>Schedule Initialized", 2500, 'blue');
    }

    return false;
  }
});

Template.schedulerHome.events({
  'click .addSchedule': function(){
    MaterializeModal.form({
      bodyTemplate: 'initSchedule',
      title:'Schedule Initialization',
      callback: function(err,rtn){
        if(rtn.submit){
          //console.log("create");
        }
      },
      submitLabel: 'Submit <i class=" spacel fa fa-clock-o"></i>',
      closeLabel: 'Cancel'
    });
  }
});
Template.schedulerHome.helpers({
  'schedule': function() {
    return schedb.find().fetch();
  }
});







Template.schedulerTable.helpers({
  
})
