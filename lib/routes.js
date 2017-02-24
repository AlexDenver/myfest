count={};
count['insuf']=0;
var authBefore = function () {
    user = Meteor.user();
    actualThis = this;
    mod = Router.current().route.getName();
    if((!user) && mod!='letter' && mod!='startQuiz' && mod!='viewNotification') {
      // render the login template but keep the url in the browser the same
      // isAllowedTo(Meteor.user(), 'all');
      this.layout("loginLayout");
      // this.render("loading");
      this.render('loginForm');
      // pause the rest of the before hooks and the action function
    }else{
      if(mod=='letter'){
        this.layout("letter");
      }else if(mod=='home'){
        this.layout('userHome');
        this.render('home');
      }else if(mod=='startQuiz'){
        this.layout('quizLayout');
        this.render('startQuiz');
      } else if(mod=='viewNotification'){
        this.layout('publicLayout');
        this.render('viewNotification');
      }else if(!(mod=='profile')){
        this.layout("loadingLayout");
        // this.next();
        Meteor.call('isAllowedTo',user._id,mod, function(err,res) {
          if(!err){
            actualThis.layout("userLayout");
              if(!res){
                Materialize.toast("<i class='tSpace fa fa-exclamation-circle'></i> No Sufficient Rights", 2500, 'deep-orange');
                Router.go('/');
                actualThis.next();
              }
          }
        });
      }
      this.next();
      //Here we have to change the layoutTemplate back to the default
    }
  };

if(Meteor.isClient){
  Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',

  });
  Router.onBeforeAction(authBefore,
    {except: ['lettter','login', 'loading']}
  );

  Router.map(function(){
    this.route('home',{
      path: '/',
      template: 'home',
      layoutTemplate: 'userLayout',
      onBeforeAction: function() {
        if(!Meteor.userId()){
          Router.go('/login');
        }
        this.next();
      },
      waitOn: function() {
        var user = Meteor.user();
        if(user && (user.userType=='Reception Committee' || user.userType=='Event Head'|| user.userType=='Alpha')){
          Meteor.subscribe('findAllReg');
          if (user.userType=='Reception Committee' || user.userType=='Alpha') {
            Meteor.subscribe('activepart');
          }
          if(user.userType=='Event Head' || user.userType=='Alpha'){
            Meteor.subscribe('getAllEvents',user.eventname);
            Meteor.subscribe('activepartevent');
            Meteor.subscribe('allstatus');
          }
        }
      },
      data: function () {
        templateData = {};
        templateData['pageTitle'] = 'Welcome';
        // templateData['pageSubtitle'] = usn;
        // console.log(user);
        return templateData;
      }
    })
  });
  // Router.onBeforeAction('loading');
  // Router.onBeforeAction(function (pause) {
  //   // all properties available in the route function
  //   // are also available here such as this.params
  //
  //   this.router.layout("loginLayout");
  //   if (!Meteor.user() &&(Router.current().route.getName()!='letter')) {
  //     // console.log("apple is user");
  //     console.log(Meteor.user());
  //     // if the user is not logged in, render the Login template
  //     Router.go('/coming_soon');
  //     this.next();
  //
  //   } else {
  //     // console.log("well not user");
  //     // otherwise don't hold up the rest of hooks or our route/action function
  //     // from running
  //     this.next();
  //   }
  // });
  Router.map(function(){
    this.route('letter',{
      path: '/letter/:_id',
      template: 'letter',
      layoutTemplate: 'letter_layout',
      waitOn: function(){
        return Meteor.subscribe('specificTeam', this.params._id);
      },
      data: function(){
        var regx = this.params._id;
        templateData = entry.findOne({_id: regx});
        response = {};
        if(templateData){
          if(templateData.verified==undefined||templateData.verified==false){
            Meteor.call('verifyTeam', regx);
          }
          myIndex = 0;
          response = {
            names: [],
            reg_id: templateData.reg_id,
            college: templateData.info.college
          };
          _.forEach(templateData.team,function(data){
            _.forEach(data.p,function(datax){
                // console.log("participant: "+datax);
                response.names.push({name:datax});
            })
          });
        }
        console.log(response);
        return response;
      }
    })
  });

  Router.map(function(){
    this.route('login',{
      onBeforeAction: function(){
        if(Meteor.user()){
          Router.go('/');
        }
        this.next();
      },
      path: '/login',
      template: 'loginForm',
      layoutTemplate: 'loginLayout'
    })
  });
  Router.map(function(){
    this.route('loading',{
      path: '/loading',
      layoutTemplate: 'loading'
    })
  });

}
