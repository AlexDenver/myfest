

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd,
  {
      _id: 'mobile',
      type: 'text',
      displayName: "mobile"
  },
  {
      _id: 'userType',
      type: 'text',
      displayName: 'userType'
  }
]);
