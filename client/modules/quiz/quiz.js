Template.manageQuiz.created = function(){
  this.quizCount = new ReactiveVar(1);
  ar = [1];
  scopeThis = this;
  quizId = false;
      res = quiz.find({_id: Router.current().params._id}).fetch()[0];
      // Template.quizCount.set(3);
      //console.log(res);
      if(res.quiz){
        ar = [];
        //console.log(res);
        scopeThis.quizCount.set(res.quiz.length);
        var i = 1;
        while(i<=res.quiz.length){
          //console.log(i);
          ar.push(i++);
        }
        quizId = res._id;
        i = 1;
        //console.log("res quiz");
        //console.log(res.quiz);
        setTimeout(function () {
          $.each(res.quiz,function(k,val){
            $('input[name="question['+i+']"]').val(val.question);
            $('input[name="opa['+i+']"]').val(val.opa);
            $('input[name="opb['+i+']"]').val(val.opb);
            $('input[name="opc['+i+']"]').val(val.opc);
            $('input[name="opd['+i+']"]').val(val.opd);
            if(val.ans)
            $('input[name="ans'+i+'"][value="'+val.ans+'"]').prop('checked',true);
            i++;
          });
          Materialize.updateTextFields();
        }, 100);
      }
};

Template.manageQuiz.helpers({
  'question': function(){
    var qCount = Template.instance().quizCount.get();

    return ar;
    //Array.apply(null, {length: qCount}).map(Number.call, Number)
  },
  'setQuiz': function(){

  }
});

Template.manageQuiz.events({
  'click .addQuest': function(event,template){
    var temp = template.quizCount.get() + 1;
    ar.push(temp);
    template.quizCount.set(temp);
  },
  'submit #quizForm': function(event, template){
    var qCount = template.quizCount.get();
    var quest = [];
    var i = 1;

    while(i<=qCount){
      q = $('input[name="question['+i+']"]').val();
      opa = $('input[name="opa['+i+']"]').val();
      opb = $('input[name="opb['+i+']"]').val();
      opc = $('input[name="opc['+i+']"]').val();
      opd = $('input[name="opd['+i+']"]').val();
      ans = $('input[name="ans'+i+'"]:checked').val();
      var question = {
        question: q,
        opa: opa,
        opb: opb,
        opc: opc,
        opd: opd,
        ans: ans
      };
      quest.push(question);
      i++;
    }
    quizze = {
      quiz: quest,
      count: qCount,
      event: Meteor.user().eventname
    }

    Meteor.call('addQuizze',quizze, Router.current().params._id);
    return false;
  },
  'click .delQuest': function(event, template){
    var temp = template.quizCount.get() - 1;
    var no =parseInt(event.target.dataset.no);
    var index = ar.indexOf(no);
    if (index > -1) {
      ar.splice(index, 1);
    }
    template.quizCount.set(temp);
  }
});

Template.quizPanel.helpers({
  'thisQuiz':function() {
    return events.find().fetch()[0];
  },
  'quizr': function() {
    var thisEvent = events.find().fetch()[0];
    return thisEvent.details;
  },
  'isLive': function () {
    quizx = quiz.find({_id: this.quizId}).fetch()[0];
    if(quizx.live){
      return 'checked';
    }else{
      return '';
    }
  }
});
Template.quizPanel.events({
  'click #isLive':function(ev){
    var live = ev.target.checked;
    quiz.update({_id: this.quizId}, {$set: {live: live}});
  }
})
Template.quiz.onCreated(function() {
  this.teamCode = new ReactiveVar(false);
  this.ans = [];
});
Template.quiz.onRendered(function() {

})
Template.quiz.helpers({
  'getQuest': function() {
    var thisQuiz = quiz.find().fetch()[0];
    if(thisQuiz)
    return thisQuiz.quiz;
  },
  'eventName': function() {
    var thisQuiz = quiz.find().fetch()[0];
    if(thisQuiz)
    return thisQuiz.eventname;
  },
  'isLive': function() {
    var thisQuiz = quiz.find().fetch()[0];
    if(thisQuiz)
    return thisQuiz.live;
  },
  'teamcodeSet': function() {
    var tcode = Template.instance().teamCode.get();
    if(tcode){
      return true
    }
  },
  'teamCodes': function() {
    code = codex.find().fetch();
    arr = [];
    $.each(code,function(k,val){
      arr.push(val.code);
    });
    return arr;
  },
  'initSelect': function() {
    setTimeout(function () {
      $('select').material_select();
    }, 150);
  },
  'getTeamCode': function() {
    return Template.instance().teamCode.get();
  }
});
Template.quiz.events({
  'submit #quizForm': function(ev,template) {
    ev.preventDefault();
    var tCode = (ev.target.teamCode.value);
    template.teamCode.set(tCode);
  },
  'change .iopt': function(ev,template) {
    val = $(ev.target).attr('id');
    intVal = parseInt(val.replace(/\D/g,''));
    template.ans.push({
      ans: val[2],
      cans: this.ans,
      question: intVal,
      time: new Date()
    });
    if(this.ans==val[2]){
      var thisQuiz = quiz.find().fetch()[0];
      Meteor.call('quizIncr', template.teamCode.get(), thisQuiz.eventname, 10);
    }
    setTimeout(function () {
      $('input[type="radio"][name="quest'+intVal+'"]').attr('disabled',true);
      $('.question'+intVal).addClass('grey-text').addClass('answered');
      $('.answered .option').removeClass('option');
    }, 200);
    //console.log(intVal);
    //console.log(val);
    //console.log(this);
  },
  'submit #quizzie':function(ev,template){
    var thisQuiz = quiz.find().fetch()[0];
    $('button.submit').attr('disabled',true);
    Meteor.call('teamQuizAns',template.ans,template.teamCode.get(),Router.current().params._id,thisQuiz.quiz);
    Materialize.toast("<i class='tSpace fa fa-check'></i> Submitted", 2500, 'blue');
    return false;
  }
});
Template.viewAns.onCreated(function() {
  Meteor.subscribe('allAnsxx',true);
  Meteor.subscribe('quiz');
  Meteor.subscribe('activepart');

});
Template.viewAns.onRendered(function() {
})
Template.viewAns.helpers({
  'answers': function() {
    var list = partDB.find({event: Meteor.user().eventname.toLowerCase()}).fetch();
    console.log(list);
    return list;
  },

})
