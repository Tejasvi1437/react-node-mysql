const sequelize = require('sequelize');
const sequelize = new sequelize("socialnetwork",'root','',{host:'127.0.0.1',dialect:'mysql',operatorsAliases:false});

module.exports=sequelize;
golbal.sequelize=sequelize;