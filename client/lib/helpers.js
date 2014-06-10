Handlebars.registerHelper('setTitle', function (title) {
  if (title) {
    document.title = title + ' | CollarWar';
  } else {
    document.title = 'CollarWar';
  }
});
