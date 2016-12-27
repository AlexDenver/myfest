Template.manageSheet.onRendered(function(){
  jsheetId = Router.current().params._id;
  //console.log(jsheetId);
  Meteor.subscribe('getThisSheet',jsheetId);
  data = Meteor.call('getSheet', jsheetId, function(err,res){
    //console.log(err);
    if(!err){
      //console.log("INSIDE");
      // Template.quizCount.set(3);
      //console.log(res);
      if(res.sheet){
        scopeThis.jsheetCount.set(res.sheet.length);
        var i = 1;
        while(i<=parseInt(res.sheet.length)){
          ar.push(i++);
        }
        setTimeout(function () {
          //console.log("res");
          //console.log(res);
          i = 1;
          $.each(res.sheet,function(k,val){
            //console.log(val);
            $('input[name="question['+i+']"]').val(val.question);
            $('input[name="lbound['+i+']"]').val(val.lbound);
            $('input[name="upbound['+i+']"]').val(val.upbound);
            $('input[name="steps['+i+']"]').val(val.steps);
            i++;
          });
          Materialize.updateTextFields();
        }, 100);
      }
    }
  });
});
Template.manageSheet.created = function(){
  this.jsheetCount = new ReactiveVar(0);
  ar = [];
  scopeThis = this;
};

Template.manageSheet.helpers({
  'sheetQuest': function(){
    var sheetCount = Template.instance().jsheetCount.get();
    return ar;
    //Array.apply(null, {length: qCount}).map(Number.call, Number)
  },
  'thisSheet': function(){
    var sheet = jsheet.findOne({_id: Router.current().params._id});
    //console.log(sheet);
    return sheet;
  }
});
Template.manageSheet.onCreated = function(){

}
Template.manageSheet.events({
  'click .addQuest': function(event,template){
    var temp = template.jsheetCount.get() + 1;
    //console.log("val: "+temp);
    ar.push(temp);
    template.jsheetCount.set(temp);
  },
  'submit #jsheetAdd': function(event, template){
    var jCount = template.jsheetCount.get();
    //console.log("COUNT: "+jCount);
    var sheet = [];
    var i = 1;

    while(i<=jCount){
      var q = $('input[name="question['+i+']"]').val();
      var lb = $('input[name="lbound['+i+']"]').val();
      var ub = $('input[name="upbound['+i+']"]').val();
      var stp = $('input[name="steps['+i+']"]').val();
      var quest = {
        question: q,
        lbound: parseInt(lb),
        upbound: parseInt(ub),
        steps: parseInt(stp),
      };
      sheet.push(quest);
      i++;
    }
    var round = $('input[name="round"]').val();

    Meteor.call('saveSheet',sheet, jsheetId,function(err) {
      if(!err){
        Materialize.toast("<i class='tSpace fa fa-check white-text'></i>Sheet Saved!", 2500, 'blue');
      }
    });
    return false;
  },
  'click .delQuest': function(event, template){
    var temp = template.jsheetCount.get() - 1;
    //console.log(temp);
    var no =parseInt(event.target.dataset.no);
    var index = ar.indexOf(no);
    if (index > -1) {
      ar.splice(index, 1);
    }
    template.jsheetCount.set(temp);
  }
});
Template.viewSheets.onRendered(function(){
  Meteor.subscribe('allEventSheets', 'PORT80');
});


Template.viewSheets.helpers({
  'sheets': function(){
    return jsheet.find().fetch();
  },
});
Template.viewSheets.events({
  'click .createSheet': function(event){
    MaterializeModal.prompt({
      title: 'Add Sheet',
      message: 'Enter Applicable Round',
      callback: function(err,rtn){
        if(rtn.submit){
          var eventData = {
            event: 'PORT80',
            round: rtn.value,
            count: 0,
            creadteAt: new Date(),
            active: true
          }
          Meteor.call('createSheet', eventData);
        }
      }
    });
  },
  'click .delSheet': function(event){
    MaterializeModal.alert({
      title: 'Delete Sheet',
      message: 'Are you sure you want to delete sheet?',
      callback: function(err,rtn){
        if(rtn.submit){
          var id = event.target.dataset.id;
          Meteor.call('deleteSheet', id);
        }
      },
      icon: ' '
    })
  }
})

Template.judge.onRendered(function() {
  slider = [];
  Meteor.subscribe('getThisSheet',Router.current().params._id);
})
Template.judge.helpers({
  'sheetQuest': function() {
    var thisSheet = jsheet.find().fetch()[0];
    //console.log(thisSheet.sheet);
    return thisSheet.sheet;
  },
  'initSheet': function() {
    setTimeout(function () {
      sliders = $('div.sliders');
      for(i=0;i<sliders.length;i++){
        //console.log(sliders[i]);
        noUiSlider.create(sliders[i], {
          start: 0,
          tooltips: true,
          step: parseInt(sliders[i].dataset['stp']),
          range: {
            'min': parseInt(sliders[i].dataset['lw']),
            'max': parseInt(sliders[i].dataset['ub'])
          },
          format: wNumb({
            decimals: 0
          })
        });
      }

    }, 100);
  },
  'activeTeam': function() {
    return partDB.find({status: true, 'judged': {$not:  Router.current().params._id}}).fetch();
  },
  'initUpdate': function() {
    var usrx = Meteor.user();
    var thisEve = usrx.eventname;
      var eveDetails = events.find({name: thisEve}).fetch()[0].details;
      $.each(eveDetails,function (k,v) {
        //console.log(v);
        if(v.judgeSheet==Router.current().params._id){
          //console.log("inside");
          toQualify = parseInt(v.qualify);
          totParti = partDB.find({event: thisEve.toLowerCase()}).fetch();
          totParti.sort(function(a,b){return   b.score - a.score});
          for(i=toQualify;i<totParti.length;i++){
            //console.log('for'+totParti.length+" "+i);
            //console.log(totParti[i]._id);
            partDB.update({_id: totParti[i]._id}, {$set: {status: false}});
            notifi = {};
            notifi['autoDelete'] = true;
            notifi['createdOn'] = new Date;
            notifi['eventname'] = thisEve;
            notifi['isPublic'] = false;
            notifi['message'] = "Team "+totParti[i].team+" has been eliminated from "+thisEve;
            notifi['priority'] = "disq";
            notifi['user'] = 'system';
            notifi['isPublic'] = true;
            Meteor.call('sysNotif', notifi)
          }
        }
      })
      //console.log(eveDetails);
  }
});
Template.judge.events({
'submit .jpage': function(ev) {
  ev.preventDefault();
  var tcode = ev.target.team.value;
  var judgeInf = [];
  roundTotal = 0;
  sid = Router.current().params._id;
  var q = [];
  $.each(sliders,function(key,val) {
    score = parseInt(val.noUiSlider.get());
    roundTotal += score;
    q.push(score);
  });
  judgeInf.push(q, sid);
  partDB.update({_id: tcode}, {$inc: {score: roundTotal}, $push:{'judged': {$each: [q, sid]}}});
  Materialize.toast("<i class='tSpace fa fa-check white-text'></i>Scores Saved!", 2500, 'blue');
}
})

Template.scores.helpers({
  'qtypeis': function() {
    if(Template.instance().qtype.get()=='team'){
      return true;
    }
  },
  'allEvents': function() {
    var evnts = events.find().fetch();
    var rtn = [];
    $.each(evnts, function(key,val) {
      var data = {}
      //console.log(val);
      data['event'] = val.name.toLowerCase();
      var list = partDB.find({event: data.event}, {$orderby:{score: -1}}).fetch();
      data['list'] = list;
      rtn.push(data);
    });
    //console.log(rtn);
    return rtn;
  },
  'allTeams': function() {
    var teamsx = codex.find({used: true}).fetch();
    data = [];
    $.each(teamsx, function (key,val) {
      tmp = {};
      var list = partDB.find({team: val.code}).fetch();
      tmp['team']= val.code;
      total = 0;
      //console.log('list');
      //console.log(list);
      $.each(list, function(k,v) {
        //console.log(k);
        //console.log(v);
        total += v.score;
      })
      tmp['score'] = total;
      data.push(tmp);
    })
    data.sort(function(a,b){return   b.score - a.score});
    return data;
  }
})
Template.scores.events({
  'change .qtype': function(ev, template) {
    template.qtype.set(ev.target.value);
  }
})
Template.scores.onCreated(function() {
  this.qtype = new ReactiveVar(false);
});
