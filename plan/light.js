const lightList = {
    red: 6,
    green: 6,
    yellow: 3
}

// function a(value){
//     let timer = null
//     return new Promise((resolve)=>{
//         timer = setInterval(() => {
//             value--
//             console.log(value)
//             if(!value){
//                 clearInterval(timer)
//                 resolve()
//             }
//         }, 1000);
//     })

// }

// async function b(res){
//     let arr = Object.keys(res)
//     let values = Object.values(res)
//     let len = arr.length - 1
//     let index = 0
//     while(true){
//         console.log(arr[index])
//         await a(values[index])
//         index++
//         if(index>len) index = 0
//     }
// }

// b(lightList)

function a(value){
    let timer = null
    return new Promise((resolve,reject)=>{
        timer = setInterval(() => {
            value--
            console.log(value)
            if(!value){
                clearInterval(timer)
                resolve('ok')
            }
        }, 1000);
    })
    

}

async function b(obj){
    const arr = Object.keys(obj)
    const len = arr.length
    const values = Object.values(obj)
    let index = 0
    while(true){
        let i = index % len
        console.log(arr[i])
        await a(values[i])
        index++

    }
}

b(lightList)
