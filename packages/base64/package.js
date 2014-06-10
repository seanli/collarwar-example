Package.describe({
  summary: "A package to use the Base64 library."
});

Package.on_use(function (api) {
  api.add_files(['base64.js'], ['client', 'server']);
  if (api.export) {
    api.export('Base64');
  }
});
