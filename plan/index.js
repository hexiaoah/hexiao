class aa {
    constructor(){
        this.name = 'aa'
    }
    myFn(...res) {
        console.log(this.name)
        console.log(...res)
    }
}

class bb {
    constructor(){
        this.name = 'bb'
    }
    myFn(...res) {
        console.log(this.name)
        console.log(...res)
    }
}

const a = new aa()
// a.myFn.call(bb)

Function.prototype.MyCall = function(obj,...res){
    console.log(res)
    obj.fn = this
    obj.fn(...res)
    delete obj.fn
}

Function.prototype.MyBind = function(obj,...res){
    return (...arg)=>{
        obj.fn = this
        obj.fn(res.concat(arg))
        delete obj.fn
    }
}

// a.myFn.MyCall(bb,1,2,3,4)
// a.myFn.bind(bb,1,2,3)(4,5,6)

//Promise
const p = new Promise((res,rej)=>{
    if(true){
        res(1)
    }else{
        rej(2)
    }
})

// p.then((res,err)=>{
//     console.log(res)
// })


// function myPromise (callback){
//     var status = 'padding'
//     let value;
//     try{
//         callback(_resolve(res),_reject(res))
//     }catch(err){
//         _reject(err)
//     }
//     return this
// }

// myPromise.prototype._resolve = function(res){
//     this.status = 'resolve'
//     this.value = res
// }

// myPromise.prototype._reject = function(err){
//     this.status = 'reject'
//     this.value = err
// }

// myPromise.prototype.then = function(onFn,onErrFn){

// }

class myPromise {

    constructor(callback){
        this.status = 'padding'
        this.value = ''
        this.errvalue = ''
        this.list = []
        callback(this.resolve.bind(this),this.reject.bind(this))
    }
    resolve(res){
        this.status = this.status === 'padding' ? 'resolve' : this.status
        this.value = res
    }
    reject(res){
        this.status =  this.status === 'padding' ? 'reject' : this.status
        this.errvalue = res
    }
    then(onresolve,onreject){
        if(this.status === 'resolve'){
            onresolve(this.value)
        }else if(this.status === 'reject'){
            onreject(this.errvalue)
        }
    }
}


var aaaaa = new myPromise((resolve,reject)=>{
    setTimeout(() => {
        resolve(1)
    }, 1000);
})

aaaaa.then(res=>{
    console.log('ok',res)
},err=>{
    console.log(err)
})