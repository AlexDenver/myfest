if(Meteor.isClient){
Template.registrations.onCreated(function(){
});
Template.registrations.onRendered(function(){
  Meteor.call('isAllowedTo',Meteor.userId(),'Team',function(err,res) {
    if(!err){
      if(res){
          Meteor.subscribe('findAllReg');
      }
    }
  })
});
Template.registrations.helpers({
  'teamInTeams': function(){
    return entry.find();
  },
  'verifiedMsg': function(test){
    if(test)
      return "Verified";
    else
      return "Not-verified";
  },
  'canActivate': function(isActive){
    if(!isActive){
      return true;
    }else
    return true;
  }
})
Template.registrations.events({
  'click .delTeam': function(event) {
      var teamUID = this._id;
      // Dialogs.confirm("Are you sure you want to Delete?", function (res) {
      //   if (res === 1) {
      //     //console.log("Yes");
      //     Meteor.call('disableTeam',teamUID);
      //     Materialize.toast('Team Deleted!', 4000)
      //   } else {
      //     //console.log("No");
      //   }
      // }, "Delete Team", ["Yes", "No"]);
      MaterializeModal.confirm({
        title: "Delete Team",
        message: "Are you sure you want to Delete?",
        callback: function(err,rtn){
          if(rtn.submit){
            Meteor.call('disableTeam',teamUID);
            Materialize.toast('Team Deleted!', 4000)
          }
        }
      });
      event.preventDefault();
  },
  'click .activateTeam': function(event){
      event.preventDefault();
      var teamUID = this._id;
      Meteor.call('enableTeam', teamUID);
      Materialize.toast('Team Enabled!', 4000)
  }

})
}
Template.detailedTeam.onRendered(function() {
  //console.log(this);
  // $('select').material_select();
  Meteor.subscribe('getCodes');
  setTimeout(function () {
    $('select').material_select();
  }, 200);
})
Template.detailedTeam.events({
  'submit #updateName': function(event){
    event.preventDefault();
    var id = this._id;
    var pEvent = event.target.pevent.value;
    var pName = event.target.pname.value;
    var pAB = event.target.pab.value;
    Meteor.call('updateTeamMember',id,pEvent,pName,pAB);
  },
  'click .editName': function(event){
    event.preventDefault();
    var idx = Router.current().params._id;
    var pAB = event.target.dataset.ab;
    var pEvent = event.target.dataset.tevent;
    MaterializeModal.prompt({
      title: 'Update Name',
      message: 'Enter New Name.',
      callback: function(err,rtn){
        if(rtn.submit){
          var newName = rtn.value;
          Meteor.call('updateTeamMember',idx,pEvent,newName,pAB);
        }
      }
    });
  },
  'click .aditChk': function(){
    var idx = Router.current().params._id;
    var pAB = event.target.dataset.ab;
    var pEvent = this.key;
    var count = Template.instance().data.team.aditCount;
    var flag = !($('#adit'+this.value.p[pAB]).is(":checked"));
    if(count>=6 && flag){    //returns when user tries to 'check' when count is 6, breaks when user is 'unchecking'
      return;
    }
    Meteor.call('updateAdit',idx,pEvent,pAB,flag);
  },
  'click .checkIn': function() {
    code = $('select[name="teamCode"]').val();
    cid = $('select[name="teamCode"] option:selected').data('id');
    var l = entry.update({_id: Router.current().params._id}, {$set: {checkin: true, teamCode: code}});
    var teamData = entry.find({_id: Router.current().params._id}).fetch()[0];
    var teamAr = new Array();
    codex.update({_id: cid}, {$set: {used: true, college: teamData.info.college}});
    $.each(teamData.team,function(key,val) {
      //console.log("key");
      //console.log(key);
      //console.log("value");
      //console.log(val);
      if(key!='adit' && key!='aditCount'){
        partObj = {
          names: [val.p.a],
          score: 0,
          status: true,
          teamId: teamData._id,
          team: teamData.teamCode,
          event: key,
          judged: []
        };
        if(val.p.b){
          partObj.names.push(val.p.b);
        }
        partDB.insert(partObj);
      }
    });
    Materialize.toast("<i class='tSpace fa fa-check'></i>Team Check-in Successful", 2500, 'blue');
    Router.go('/');
  }
});

Template.detailedTeam.helpers({
  'isNotAdit': function(val){
    return (this.key != val && this.key != "aditCount");
  },
  'printVerified': function(test) {
    if(test){
      return "Yes";
    }else{
      return "No";
    }
  },
  'isAditx': function(ab){
    valx = false;
    if(this.value.adit!=undefined) {
      myVal = this.value.adit[ab];
      if(myVal)
        return true;
      else
        return false;
    }
  },
  'teamx': function() {
    return entry.find().fetch()[0];
  },
  'aditDisable': function(){
    //console.log();
    var count = Template.instance().data.team.aditCount;
    if(count>=6){
    return "disabled"
    }
    // var count = $('input[type="checkbox"]:checked').length;
    // //console.log(count);
    // count = this
    // if(count>=6)
    //   return "disabled";
  },
  'codes': function() {
    return codex.find().fetch();
  }
});
Template.addTeam.created = function() {
  aditCount = 0;
  evList = [
    {
      "name": "TechiMania",
      "friendly": "Mysterious Event",
      "count": 2,
      "inPage": false
    },
    {
      "name": "Collosseum",
      "friendly": "Gaming",
      "count": 2,
      "inPage": false
    },
    {
      "name": "TechiPedia",
      "friendly": "IT Quiz",
      "count": 2,
      "inPage": false
    },
    {
      "name": "CodeIT",
      "friendly": "Coding & Debugging",
      "count": 2,
      "inPage": false
    },
    {
      "name": "TechRun",
      "friendly": "Treasure Hunt",
      "count": 1,
      "inPage": false
    },
    {
      "name": "Ultimatum",
      "friendly": "IT Manager",
      "count": 1,
      "inPage": false
    },
    {
      "name": "TechTalk",
      "friendly": "Paper Presentation",
      "count": 1,
      "inPage": false
    },
    {
      "name": "PORT80",
      "friendly": "Web Designing",
      "count": 1,
      "inPage": false
    },
    {
      "name": "InMotion",
      "friendly": "Video Editing",
      "count": 1,
      "inPage": false
    }
  ];
  this.aditCount = new ReactiveVar(0);
}
Template.addTeam.helpers({
  'eventsList': function(){
    return evList;
  },
  "arrayOf": function(count) {
    var ar = new Array(count);
    var ar = Array.apply(null,ar).map(function(discard,n){return n+1;});
    return ar;
  },
  "aditDisable": function(ele){
    if(Template.instance().aditCount.get()>=6 && !$('#'+ele+this+'ad').is(":checked")){
      return "disabled"
    }
  }
});

Template.addTeam.events({
  'click .adit': function(event,template) {
    if(event.target.checked){
      // if(aditCount>=6){
      //   return;
      // }
      var incr = template.aditCount.get() + 1;
      template.aditCount.set(incr);
      //console.log(template.aditCount.get());
    }else{
      var decr = template.aditCount.get() - 1;
      template.aditCount.set(decr);
      //console.log(template.aditCount.get());
      // aditCount--;
    }
  },
  'submit #regTeam': function(event, template){
    var data = {};
    $("#regTeam").serializeArray().map(
      function(x){
        //console.log(x.name);
        data[x.name] = x.value=="on"?true:x.value;
      }
    );
    var team = {};
    var info = {};
    $.each(evList,function(i,thisEvent){
      var temp = {};
      eventKey = thisEvent.name.toLowerCase();
      temp={};
      temp = {
          adit: {a: data[thisEvent.name+'[1][adit]']?true:false},
          p:{a: data[thisEvent.name+'[1]']}
      };
      if(thisEvent.count==2){
        temp['adit']['b']= data[thisEvent.name+'[2][adit]']?true:false;
        temp['p']['b'] = data[thisEvent.name+'[2]'];
      }
      team[eventKey] = temp;
    });
    info['prime'] = data.prime;
    info['college'] = data.college;
    info['email'] = data.email;
    info['phone'] = data.contact;
    var ixd = "";
    $.each(info, function(val, key){
      //console.log(key);
      ixd += key.toString().slice(0,2);
    });
    info['reg_date'] = new Date();
    info['stay'] = data.stay;
    regID = ixd.slice(0,8).toUpperCase();
    team['aditCount']=template.aditCount.get();
    var reg = {
      reg_id: regID,
      team: team,
      info: info
    };
    Meteor.call('registerTeam',reg);

    MaterializeModal.message({
      title: "Registration Successful",
      message: "Registration ID:<h1>"+regID+"</h1>",
      dismissible: false,
      fullScreen: true
    });
    return false;
  }
});
Template.teamCode.created = function () {


}
Template.teamCode.onRendered(function() {
  Meteor.subscribe('getCodes');
  setTimeout(function () {
    $('select').material_select();
  }, 200);
});
Template.teamCode.helpers({
  'codes': function() {
    return codex.find().fetch();
  }
});

Template.teamCodes.helpers({
  'codes': function(){
    return codex.find().fetch();
  }
});
Template.teamCodes.events({
  'click .addCode': function() {
    MaterializeModal.prompt({
      title: "Add Team Codes",
      message: "Use comma(,) to sepeaate two codes",
      callback: function(err,rtn) {
        if(rtn.submit){
          codesList = rtn.value;
          codesAr = codesList.split(',');
          $.each(codesAr,function(key,val) {
            codex.insert({
              code: val,
              used: false,
              college: ''
            })
          })
        }
      },
      fullScreen: true
    });
  }
});
Template.teamList.onCreated(function() {
  this.teamCode = new ReactiveVar(false);
  this.eventN = new ReactiveVar(false);
});
Template.teamList.events({
  'change #tcode': function(ev,template) {
    template.eventN.set(false);
    var tCode = (ev.target.value);
    template.teamCode.set(tCode);
  },
  'change #ecode': function(ev,template) {
    template.teamCode.set(false);
    var ecode = (ev.target.value).toLowerCase();
    template.eventN.set(ecode);
  }
})
Template.teamList.helpers({
  'partiByCode': function () {
    var list = partDB.find({team: Template.instance().teamCode.get()});
    return list;
  },
  'initSelect': function() {
    setTimeout(function () {
      $('select').material_select();
    }, 150);
  },
  'allcodes': function() {
    return codex.find({used:true}).fetch();
  },
  'getName': function(i) {
    //console.log(this);
    return this.names[i];
  },
  'getCollege':function() {
    return codex.find({code: Template.instance().teamCode.get()}).fetch()[0].college;
  },
  'partiByEvent': function() {
    list = partDB.find({event: Template.instance().eventN.get()});
    return list;
  },
  'allEvents': function() {
    return events.find().fetch();
  },
  'getEvent': function() {
    return Template.instance().eventN.get();
  },
  'listByCode': function() {
    if(Template.instance().teamCode.get())
    return true;
  }
})
