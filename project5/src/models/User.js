const sequelize=require('sequelize');

module.exports=sequelize.define("Tweet",{
    id:{
        type:sequelize.INTEGER(11),
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:sequelize.STRING(50),
        allowNull:false,
        unique:true
    },
    passed:{
        type:sequelize.STRING(20),
        allowNull:false
    }
});