/**
 * 冒泡排序
 */

 var arr = [2,5,1,2,3,4,6,8,6,7,9,11,23,11,55,33]

 function maopao(arr){
    const len = arr.length
    for(let i = 0;i<len;i++){
        for(let j =i+1;j<len;j++){
            if(arr[i]>arr[j]){
                let a = arr[i]
                arr[i] = arr[j]
                arr[j] = a
            }
        }
    }
    console.log(arr)
    return arr
 }
 maopao(arr)

/**
 * 选择排序
 */

 function xuanze(arr){
    const len = arr.length
    for(let i = 0;i<len;i++){
        let index = i
        for(let j = i+1;j<len;j++){
            if(arr[j] < arr[index]){
                index = j
            }
        }
        if(index !== i){
            let a = arr[i]
            arr[i] = arr[index]
            arr[index] = a
        }
    }
    console.log(arr)
    return arr
 }

xuanze(arr)

/**
 * 插入排序
 */

 function charu(arr){
    const len = arr.length
    for(let i = 1; i<len; i++){
        for(let j = 1; j < i; j++ ){
            if(arr[i] < arr[i-j] ){
                let a = arr[i]
                arr[i] = arr[i-j]
                arr[i-j] = a
            }
        }
    }
    console.log(arr)
    return arr
 }
 charu(arr)

function fn(...arg){
    let args =[...arg]
    function next(...res){
        args = args.concat(res)
        return next
    }
    next.toString = function(){
        return args.reduce((a,b)=>a+b)
    }
    return next
}
console.log(fn(1)(2,4,5,6))

//
function sort(arr){
    let len = arr.length
    for(let i;i< len;i++){
        for(let j=i+1; j<len; j++){
            if(arr[i]>arr[j]){
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}
