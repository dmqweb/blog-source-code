/**
 * 手写Promsise
 */
const PENDING = Symbol.for('pending');
const FULFILLED = Symbol.for('fulfilled');
const REJECTED = Symbol.for('rejected');

class myPromise{
    constructor(executor){
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallback = [];
        this.onRejectedCallback = [];
        //写resolve函数
        const resolve = (resolveValue) => {
            if(resolveValue instanceof myPromise){
                return resolveValue.then(resolve,reject);
            }
            if(this.status === PENDING){
                this.value = resolveValue;
                this.status = FULFILLED;
                this.onResolvedCallback.forEach(fn=>fn());
            }
        }
        //写reject函数
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallback.forEach(fn=>fn());
            }
        }
        try {
            executor(resolve,reject);
        } catch (error) {
            reject(error);
        }
    }
    //写then方法
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v)=>v;
        onRejected = typeof onRejected === "function" ? onRejected : (err)=>{throw err};
        
    }
    //catch方法

    //finally方法

    //静态resolve方法

    //静态reject方法

    //静态all方法

    //静态race方法
}
