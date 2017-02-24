Template.loginForm.onRendered(function() {
  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });
  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
  	$(this).removeClass('is-active');
  });
});
Template.loginForm.events({
  'submit .login': function(event) {
    event.preventDefault();
    var myEmail = event.target.username.value;
    var myPassword = event.target.password.value;
    Meteor.loginWithPassword(myEmail, myPassword, function(error){
           Materialize.toast("ERROR: " + error.reason,2000,'red');
     });
     return false;
  }
});
