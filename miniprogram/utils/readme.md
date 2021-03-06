### 场景

微信小程序是由一个个 Page 组成，在小程序中，每一个Page都是一个模块，有着自己独立的作用域，假设有这样一种业务场景，从一个问诊单列表进入到详情页面，在详情页面进行一系列操作后该问诊单的状态发生了变化，需要对列表页面的问诊单状态进行相应的改变。如果多个页面都依赖该状态，则需要通知这些页面对其内部状态进行更新。

### 解决方案

方案一：在详情页面改变状态后的回调里把一些数据存在 localStorage 或挂在全局 App 对象下，在依赖该状态的页面onShow生命周期里根据这些数据来判断是否进行更新或者进行什么操作。这种方案在业务逻辑比较简单且页面耦合度比较小的情况下可以

方案二：小程序提供了一个 getCurrentPages方法，可以获取到当前的页面栈的实例，再通过页面进栈的顺序拿到某个Page页面的对象，就可以调用他的方法去做你想做的操作。这不过该方案耦合度大，比较依赖页面进栈顺序，如果后续的迭代中页面顺序发生了改变，将会很难维护。

方案三：利用发布/订阅模式实现一个页面通信策略（最优方案），本文将重点介绍。

在发布/订阅模式中，发布者和订阅者不需要关注对方的状态，订阅者只需要订阅事件并注册相应的回调，发布者只需要发布事件，其余的交给调度中心来调度，从而实现解耦。

首先实现一个简单的Event类，它含有一个收集事件回调函数的对象和on（订阅）、emit（发布）、off（注销）这三个基础方法。下面直接上代码。