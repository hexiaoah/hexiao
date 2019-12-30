/**
 * 单例模式
 */

// function manager(name){
//     this.name = name
    
// }
// const fn = function(){
//     intrance = null
//     return (name)=>{
//         if(!intrance){
//             intrance = new manager(name)
//         }
//         return intrance
//     }

// }()

// const aa = fn(123)
// const bb = fn(1)
// const cc = fn(3)

// console.log(aa)
// console.log(bb)
// console.log(cc)

/**
 * 策略模式
 */

//  const errMessageList = {
//      default: '输入格式不对',
//      maxLength: '不能超过最大长度',
//      minlen:'长度不足',
//      isRequired:'不能为空',
//      isNumber:'只能输入数字'
//  }

//  const resultList = {
//     maxLength:function(value,errMes,maxLen){
//         if(value.length>maxLen){
//             return errMes || errMessageList['maxLength']
//         }
//     },
//     minlen: function(value,errMes,minlen){
//         if(value.length < minlen ){
//             return errMes || errMessageList['minlen']
//         }
//     },
//     isNumber: function(value,errMes){
//         if(typeof value !== 'number'){
//             return errMes || errMessageList['isNumber']
//         }
//     },
//     isRequired: function(value,errMes){
//         if(value === ''){
//             return errMes || errMessageList['isRequired']
//         }
//     }
//  }

// function fn(value,rule,errMes=''){
//     return resultList[rule](value,errMes)
// }

// const aa = fn('123','isNumber')
// console.log(aa)

var arr = [2,5,1,2,3,4,6,8,6,7,9]

function maopao(arr){
   const len = arr.length
   for(let i = 0;i<len;i++){
       for(let j =i+1;j<len;i++){
           if(arr[i]>arr[j]){
               let a = arr[i]
               arr[i] = arr[j]
               arr[j] = a
           }
       }
   }
   return arr
}
maopao(arr)
console.log(arr)