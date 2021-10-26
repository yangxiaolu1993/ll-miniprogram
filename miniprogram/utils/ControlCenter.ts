class Observer {
    _stores: any
    constructor() {
        this._stores = {}
    }
    // on方法把订阅者们想要订阅的事件，对应的回调函数和当前的 page 对象收集在 Observer 类中的 stores 属性中。为了让每个回调函数被调用时的 this 都指向对应的 Page 对象，必须在订阅时对回调函数绑定当前的上下文对象。

    /**
     * 
     * @param event 注册事件名称
     * @param cb 事件触发后的回调函数
     * @param ctx 当前的上下文对象，即 this
     */
    on(event: any, cb: any, ctx: any): void {
        if (typeof cb != "function") {
            console.error('callback must be a function')
            return
        }

        this._stores = this._stores || {}
        this._stores[event] = this._stores[event] || []
        this._stores[event].push({ cb: cb, ctx: ctx })
    }

    // emit 方法接受一个事件名称参数，在 Observer 对象的 _stores 属性中取出对应的数组，并逐个执行里面的回调函数
    emit(event: any) {
        this._stores = this._stores || {}
        let store = this._stores[event]
        let args = null
        if (store) {
            store = store.slice(0)
            args = [].slice.call(arguments, 1)
            for (let i = 0, len = store.length; i < len; i++) {
                store[i].cb.apply(store[i].ctx, args)
            }
        }
    }

    // off方法在注销事件时有三种情况，分别是注销全部的事件，注销指定事件的全部全部回调，注销指定事件的指定回调。off方法接受事件名称和回调函数作为参数，在 Event 对象的 _stores 属性中删除对应的回调函数。
    off(event: any, fn: any) {
        this._stores = this._stores || {}
        // 注销全部的事件
        if (!arguments.length) {
            this._stores = {}
            return
        }
        var store = this._stores[event]
        if (!store) return
        // 注销指定事件的全部全部回调
        if (arguments.length === 1) {
            delete this._stores[event]
            return
        }

        // 注销指定事件的指定回调
        var cb
        for (var i = 0, len = store.length; i < len; i++) {
            cb = store[i].cb
            if (cb === fn) {
                store.splice(i, 1)
                break
            }
        }
        return
    }
}


export const observer = new Observer