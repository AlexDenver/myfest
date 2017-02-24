if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'AlexDenver',
        email: 'dnvr.dsz@gmail.com',
        password: 'letmeapplebox',
        profile: {
            first_name: 'Denver',
            last_name: 'Dsouza',
        }
    });
    var user = Meteor.users.find({username: 'AlexDenver'}).fetch()[0];
    userRole.insert({
      userId : user._id,
      modules : ['Notification','User','Team','Scheduler','Event','Venue','Feedback','Score', 'Master'],
      userType: 'admin'
    });
}

Accounts.setPassword('APX2buHLudr5RP9kZ', 'applebox');
