var remote = require('remote')

var Menu = remote.require('menu')

var menu = Menu.buildFromTemplate([
 {
  label: 'Rumble Royale',
  submenu: [
  {
    label: 'Help',
    click: function() {
      alert('Nope')
    }
  }]
 }
])
Menu.setApplicationMenu(menu)