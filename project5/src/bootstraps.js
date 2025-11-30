const { where } = require('sequelize');

module.exports=async()=>{

const Tweet=require('./models/User');
const User=require('./models/User');

User.hasMany(Tweet,{as:"tweets",foreignKey:'userId'});
Tweet.belongsTo(User,{as:'user',foreignKey:'userId'});

const errHandler=err=>{
    console.log("Error: "+err);
}

const user = await User.create({username: 'test1', passed: 'password123'}).catch(errHandler);
const tweet= await Tweet.create({content: 'Hello World!', userId: user.id}).catch(errHandler);

const users=await User.findAll({ where : { username: 'test1' }, include: [{ model: Tweet, as: 'tweets' }] }).catch(errHandler);
console.log("Test1:",users);

}