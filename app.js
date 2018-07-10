var Ping = require('./ping'),
websites = [
    {
        url: 'http://saulbot.herokuapp.com',
        timeout: 5
    }
],
monitors = [];

websites.forEach(function (website) {
var monitor = new Ping ({
    website: website.url,
    timeout: website.timeout
});

monitors.push(monitor);
});