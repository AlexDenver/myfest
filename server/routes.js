if(Meteor.isServer) {
  Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: {'mobile': 1,'userType': 1,'default':1,'controls':1,'eventname':1}});
  });
  Accounts.onCreateUser((options, user) => {
    // add your extra fields here; don't forget to validate the options, if needed
    console.log("Logging Create User options");
    console.log(options);
    _.extend(user, {
      mobile: options.mobile,
      userType: options.userType,
      default: true,
      controls: {},
      eventname: options.eventname
      // createdAt: new Date()
    });

    return user;
  });


Meteor.publish('specificTeam', function(currentLetter){
  return entry.find({_id:currentLetter});
});
Meteor.publish('getAllMods', function(uid){
  console.log(uid);
  return userRole.find({userId: uid});
});
Meteor.publish('findAllReg', function(){
  return entry.find();
});
Meteor.publish('schedulesList', function(){
  return schedb.find();
});
Meteor.publish('getAllEvents', function(evn){
  if(evn)
    return events.find({name: evn});
  else
    return events.find();
});
Meteor.publish('getAllVenues', function(){
  return venues.find();
});
venues.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Venue')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Venue')>-1)
    return true;
  }
});
schedb.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Scheduler')>-1)
    return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Scheduler')>-1)
    return true;
  },
  remove: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Scheduler')>-1)
    return true;
  }
})
entry.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Team')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Team')>-1)
    return true;
  }
});
Meteor.publish('allAnsxx', function(){
  return Meteor.qansx.find();
});
qansx.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
    return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
    return true;
  }
})
events.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
    return true;
  }
});
estatus.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
    return true;
  }
});
jsheet.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
    return true;
  }
});
codex.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Team')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Team')>-1)
    return true;
  }
});
quiz.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1)
    return true;
  }
});
Meteor.publish('getQuiz',function(quizId){
  if(quizId){
    return quiz.find({_id: quizId});
  }
  var usr = Meteor.users.find({_id: this.userId}).fetch();
  console.log(usr);
  return quiz.find({event: usr.eventname});
});
Meteor.publish('getQuizParti',function(quizId){
  return quiz.find({_id: quizId,live: true});
});
Meteor.publish('allstatus',function(quizId){
  return estatus.find();
});
Meteor.publish('getCodes',function(usedFlag){
  if(usedFlag)
    return codex.find({used: true});
  return codex.find();
});
Meteor.publish('getAllNotif', function(userType){
  if(userType=='Participant'){
    return notif.find({isPublic: true});
  }else{
    return notif.find();
  }
});
notif.allow({
  insert: function(user, doc){
    console.log("creating");
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Notification')>-1)
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Notification')>-1 && doc.username==mod[0].username);
    return true;
  }
});
partDB.allow({
  insert: function(user, doc){
    var mod = userRole.find({userId: user}).fetch();
    var fetch = partDB.find({event: doc.event, teamId: doc.teamId}).fetch().length;
    if(fetch>0)
    return false
    if(mod[0].modules.indexOf('Event')>-1 || mod[0].modules.indexOf('Team')>-1 )
      return true;
  },
  update: function(user,doc) {
    var mod = userRole.find({userId: user}).fetch();
    if(mod[0].modules.indexOf('Event')>-1 || mod[0].modules.indexOf('Team')>-1 );
    return true;
  }
});
Meteor.publish('manageEvent', function(eventId){
  return events.find({_id: eventId});
});
Meteor.publish('activepart',function () {
  return partDB.find();
})
Meteor.publish('activepartevent',function () {
  user = this.userId;
  user = Meteor.users.find({_id: user}).fetch()[0];
  return partDB.find({event: user.eventname.toLowerCase()});
})
Meteor.publish('allEventSheets', function(eventId){
  return jsheet.find({'event': eventId});
});
Meteor.publish('getThisSheet', function(sheetId){
  return jsheet.find({_id: sheetId});
});
Meteor.publish('getThisEventSheets', function(evid){
  return jsheet.find({evid: evid});
});
Meteor.publish('allUsers', function(){
  return Meteor.users.find();
});

Meteor.methods({
  hasRight: function(user){
    return true;
  },
  'sysNotif': function(noti) {
    notif.insert(noti);
  },
  disableTeam: function (id){
    console.log(id);
    entry.update({_id: id}, {$set: {active: false}});
    return true;
  },
  enableTeam: function(id){
    entry.update({_id: id}, {$set: {active: true}});
  },
  verifyTeam: function(id){
    entry.update({_id: id}, {$set: {verified: true}});
  },
  updateTeamMember: function(id,eName, nNew, nAB){
    rawData = '{"team.'+eName+'.p.'+nAB+'":"'+nNew+'"}';
    jsonData = JSON.parse(rawData);
    console.log(jsonData);
    entry.update({_id: id}, {$set: jsonData});
  },
  updateAdit: function(id,eName, nAB, flag){
    if(flag)
      incr = 1;
    else
      incr = -1;
    entry.update({_id:id},{$inc: {"team.aditCount": incr}});
    rawData = '{"team.'+eName+'.adit.'+nAB+'":'+flag+'}';
    jsonData = JSON.parse(rawData);
    console.log(jsonData);
    entry.update({_id: id}, {$set: jsonData});
  },
  doesUserExist: function(usn){
    console.log(Accounts.findUserByUsername(usn));
    console.log(usn);
    console.log(Accounts.findUserByUsername(usn) == null);
    return Accounts.findUserByUsername(usn) != null;
  },
  quizIncr: function(tCode,ename,pts) {
      partDB.update({event: ename, team: tCode}, {$inc: {score: pts}});
  },
  teamQuizAns:function(tans, tcode, quid,eventx) {
    qansx.insert({
      answers: tans,
      teamCode: tcode,
      quizId: quid,
      event: eventx
    });
  },
  createUserAccount: function(usn,pwd,privs,type, evn){
    if(evn==null){
      evn = 'other'
    }
    if (!usn)
       throw new Meteor.Error(422, 'Please Username.');

    if (!pwd)
      throw new Meteor.Error(422, 'Please Password.');
    console.log(privs);
    var userId = Accounts.createUser({
      username: usn,
      password: pwd,
      profile: {
        createdAt: new Date(),
        name: null,
      },
      modules: privs,
      mobile: '',
      userType: type,
      eventname: evn
    });
    userRole.insert({
      userId: userId,
      modules: privs,
      userType: type
    })

  },
  'notDefault':function (user) {
    Meteor.users.update({_id: Meteor.userId()}, {$set:{default:false}});
  },
  'updateUser': function(opt, user){
    formatted = {};
    if(opt.name){
      console.log('yes');
      formatted['profile'] = {name:  opt.name};
    }
    if(opt.mobile){
      console.log('yes mobile');
      formatted['mobile'] = opt.mobile;
    }
    if(formatted.profile || formatted.mobile){
      Meteor.users.update({_id: user}, {$set:
        formatted
      });
    }
      console.log(opt);
      if(opt.password){
        // console.log(password);
        Accounts.setPassword(user, opt.password);
    }
  },
  'registerTeam': function(team) {
    console.log(team);
    var id = entry.insert(team);
    return team.reg_id;
  },
  'addEvent': function(newEvent){
    newEvent['details'] = [];
    var eid = events.insert(newEvent);
    // Meteor.update()
  },
  // 'addVenue': function(venue){
  //   venues.insert(venue);
  // },
  'updateEvent':function(eventDetails, eid){
    if(eventDetails['usn']!=null){
      var usr = Accounts.findUserByUsername(eventDetails['usn']);
      Meteor.users.update({_id: usr._id}, {$set: {controls: {eventId: eid}}});
    }
    // console.log(id);
    events.update({_id: eid}, eventDetails)
  },
  'addQuizze': function(quizzes, quizId){
    console.log(quizzes);
    if (quizId) {
      quiz.update({_id: quizId},{$set:{'quiz': quizzes.quiz}});
    }
  },
  'getQuizData': function(id){
    data = quiz.findOne({_id: id});
    console.log(data);
    return data;
  },
  'createSheet':function(eventDetails){
    jsheet.insert(eventDetails);
  },
  'saveSheet': function(sheet, sheetId){
    console.log(sheet);
    console.log(sheetId);
    jsheet.update({_id: sheetId}, {$set:{sheet}});
  },
  'getSheet': function(sheetId){
    data = jsheet.findOne({_id: sheetId});
    return data;
  },
  'deleteSheet': function(sheetId){
    jsheet.update({_id: sheetId},{$set: {active: false}});
  },
  'getModules': function(user){
    var thisRole = userRole.findOne({userId:user});
    // console.log(thisRole);
    if(thisRole)
      return thisRole.modules;
    else
      return [];
  },
  'isAllowedTo': function(user,mod) {
    if(mod!=null){
      // console.log(mod);
      mod = mod.replace('add','');
      mod = mod.replace('view','');
      mod = mod.replace('manage','');
      mod = mod.replace('ehead','');
      mod = mod.replace('panel','');
      mod = mod.replace('start','');
      mod = mod.replace('list','');
      mod = mod.replace('score','');
      console.log("thisMod is: "+mod);
      if(mod=='Sheet' || mod == 'Quiz' || mod == 'Judge'){
        mod = 'Event';
      }
      console.log("thisMod after: "+mod);
      var thisRole = userRole.findOne({userId:user});
      // console.log(thisRole.modules);
      console.log("thisMod: '"+mod+"'");
      var allowed = thisRole.modules.indexOf(mod);
      if(allowed>-1){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
    // var user = Meteor.users.find({_id: user}).fetch();
  },
  createLog: function(message, opt){
    // logTime = new Date();
    // user = Meteor
    //eLogs.insert({});
  }
});
}
// Lists.deny({
//   insert() {return true;},
//   update() {return true;},
//   remove() {return true;},
// });

  WebApp.rawConnectHandlers.use("/get", function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
  WebApp.rawConnectHandlers.use("/reg", function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
  WebApp.rawConnectHandlers.use("/contact", function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });
  Router.route("/reg",
  function() {
    var json = this.request.body;
    var url = this.request.headers['origin'];
    if(url === 'http://127.0.0.1:4000'
    || url === 'http://www.compositefest.com'
    || url === 'http://compositefest.com'){
      SSR.compileTemplate('regSuccessTemplate', Assets.getText('html-email.html'));
      SSR.compileTemplate('regSuccessTemplateAdmin', Assets.getText('admin-email.html'));
      var jsobj = {};
      //cross-service issue
      for(key in json){
        jsobj = key;
      }
      var mongoJson = JSON.parse(jsobj);

      if(mongoJson._id==null){
        mongoJson['date'] = new Date();
        var id = entry.insert(mongoJson);
        var targetEmail = mongoJson.info.email;
        var emailData = {
          name: mongoJson.info.prime,
          reg_id: mongoJson.reg_id,
          _id:  id,
          mob: mongoJson.info.phone,
          email: targetEmail,
          college: mongoJson.info.college
        };
        console.log(targetEmail);
        Email.send({
          to: targetEmail,
          from: "Composite Registration info@compositefest.com",
          subject:"Registration Successful - " + mongoJson.reg_id,
          html: SSR.render('regSuccessTemplate', emailData)
        });
        Email.send({
          to: "compositefest@gmail.com",
          from: "Composite Registration info@compositefest.com",
          subject:"Registration Successful - " + mongoJson.reg_id,
          html: SSR.render('regSuccessTemplateAdmin', emailData)
        });
      }else {
        var id = entry.update({_id:mongoJson._id},mongoJson);
        id = mongoJson._id;
      }
      this.response.statusCode = 217;
      this.response.end(id.toString());
    }else{
      this.response.statusCode = 455;
      this.response.end();
    }
  }, {where: "server"});
  Router.route("/contact",
  function() {
    var json = this.request.body;
    var url = this.request.headers['origin'];
    if(url === 'http://127.0.0.1:4000'
    || url === 'http://www.compositefest.com'
    || url === 'http://compositefest.com'){
      var jsobj = {};
      //cross-service issue
      console.log(json);
      for(key in json){
        jsobj = key;
      }
      var mongoJson = JSON.parse(jsobj);
      console.log(mongoJson);
      if(mongoJson.message!=undefined && mongoJson.email!=undefined && mongoJson.college!=undefined){
        SSR.compileTemplate('queryEmail', Assets.getText('query-contact.html'));
        var emailData = {
          name: mongoJson.name,
          mob: (mongoJson.phone)?mongoJson.phone:'No Number Provided',
          email: mongoJson.email,
          message: mongoJson.message
        };
        Email.send({
          to: "compositefest@gmail.com",
          from: "info@compositefest.com",
          subject: "COMPOSTE - CONTACT FORM QUERY",
          html: SSR.render('queryEmail', emailData)
        });
        var id = msgs.insert(mongoJson);
        this.response.statusCode = 217;
        this.response.end(id.toString());
      }else{
        console.log("ERR");
        this.response.statusCode = 220;
        this.response.end();
      }
    }else{
      this.response.statusCode = 455;
      this.response.end();
    }
  }, {where: "server"});

  Router.route("/get",
  function() {
    var json = this.request.body;
    var url = this.request.headers['origin'];
    if(url === 'http://127.0.0.1:4000'
    || url === 'http://www.compositefest.com'
    || url === 'http://compositefest.com'){
      var jsobj = {};
      // //cross-service issue
      for(key in json){
        jsobj = key;
      }
      var team_data = JSON.stringify(entry.findOne(JSON.parse(jsobj)));
      if(team_data=="" || team_data==undefined || team_data==null)
        respCode = 218;
      else
        respCode = 217;
      this.response.statusCode = respCode;
      this.response.end(team_data);
    }else{
      console.log("invalid source");
      this.response.statusCode = 455;
      this.response.end();
    }
  }, {where: "server"});
