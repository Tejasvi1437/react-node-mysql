const sequelize=require('sequelize');

module.exports=sequelize.define("Tweet",{
    id:{
        type:sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    content: sequelize.STRING(300)
});