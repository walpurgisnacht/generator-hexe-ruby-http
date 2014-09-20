'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var sys = require('sys')
var spawn = require('child_process').spawn;

var HttpRubyHexeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../../package.json');
/*
    this.on('end', function () {
      if (!this.options['skip-install']) {
        var bundle = spawn("bundle", ["install"]);

        bundle.stdout.on('data', function (data) {
          console.log(data.toString());
        });

        bundle.stderr.on('data', function (data) {
          console.log('stderr: ' + data);
        });
      }
    });
*/
  },

  structure: function () {
    this.mkdir('adapters/http');
    this.mkdir('adapters/http/public');
    this.mkdir('spec/adapters/http');
  },

  createFiles: function () {
    //TODO remove context
    var context = {
      service: 'this.service',
      Service: 'this.Service'
    }

    //contracts
    this.template('_contracts/_http.rb', 'contracts/http.rb', context);

    //specs
    this.template(
      '_spec/_contracts/_http_spec.rb',
      '_spec/_contracts/_http_spec.rb', context);
    this.template(
      '_spec/_tasks/_http_spec.rb',
      'spec/tasks/http_spec.rb', context);

    //tasks
    this.template('_tasks/_http.rb', 'tasks/http.rb', context);

  }


});

module.exports = HttpRubyHexeGenerator;
