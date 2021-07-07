// module.exports = handler =>{
//     return  (req,res,next)=>{
//         try{
//              handler(req,res,next);
//         }catch(next){
//             next(ex);
//         };
//     }
// }
module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
  