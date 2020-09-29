## Vue

### 1.Vue 常用的指令
* #### v-once
	-  默认情况下 Vue 事件是可以重复触发的，有的时候只想触发一次
* #### v-cloak
	- 在网络不好或加载数据过大的情况下，页面在渲染的过程会闪烁 *Mustache* 标签；在与 ***css:[v-cloak] { display: none }*** 的配合下，可以隐藏未编译 *Mustache* 的标签直到实例准备完毕，v-cloak 属性才会被自动去除，对应的标签也才可见了。
* #### v-text , v-html 
	- v-html 
		- 用于输出 html ，<font color=red>v-text</font> 输出的是纯文本，浏览器不会对其进行 html 解析，但 v-html 会将其当作html标签解析后输出
	- v-text 
		- 是用于操作纯文本，它会替代显示对应的数据对象上的值。当绑定的数据对象上的值发生改变，插值处的内容也会随之更新。**注意：此处为<font color=pink>单向绑定</font>，数据对象上的值改变，插值也会变；但是插值变不会影响到数据对象的值。** v-text 可以简写为 **{{}}** ,并且支持逻辑运算。可以与 v-once 结合，实现仅执行一次的插值。
* #### v-if、v-else、v-else-if 和 v-show
	- v-if
		- 若希望某区块在特定条件下才出现，可以使用 v-if、v-else、v-else-if 依照运算结果决定出现的时机。
	- v-show
		- 用法与 </font>v-if</font> 大致相同
	- 差异
		- 使用上：
		> 差异在于是否有 else 的情况。若有其他状况，则 <font color=red>v-if</font>；否则 <font color=red>v-if</font> 和 <font color=red>v-show</font> 效果相同
		- HTML 渲染上:
		> <font color=red>v-if</font> 在首次渲染的时候，如果条件为假，什么也不操作，页面当作没有这些元素。当条件为真的时候，开始局部编译，动态的向 DOM 元素里面添加元素。当条件从真变为假的时候，开始局部编译，卸载这些元素，也就是删除；<font color=red>v-show</font> 不管条件是真还是假，第一次渲染的时候都会编译出来，也就是标签都会添加到 DOM 中。之后切换的时候，通过 display: none;样式来显示隐藏元素。可以说只是改变css的样式，几乎不会影响什么性能。
		- \<template\> 可用 v-if 决定是否出现，但无法使用 <font color=red>v-show</font>
* #### v-for
	- 可以遍历普通数组，对象数组，遍历对象，遍历数字
	- 一定要加 key  [--->csdn](https://blog.csdn.net/qq_42072086/article/details/107997149)
		> vue 中列表循环需加 :key ="唯一标识" 唯一标识尽量是 item 里的 id 等，因为 vue 组件高度复用增加 Key 可以标识组件的唯一性，为了更好地区别各个组件 key 的作用主要是为了高效的更新虚拟 DOM。
	- v-for 与 v-if 的比较
		1. v-for优先于v-if被解析，这意味着 v-if 将分别重复运行于每个 v-for 循环中所以，不推荐 v-if 和 v-for 同时使用
		2. 如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能
		3. 要避免出现这种情况，则在外层嵌套 template，在这一层进行 v-if 判断，然后在内部进行 v-for 循环
		4. 如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项
* #### v-bind , v-on , v-model
	- <font color=red>v-bind</font>
		1. <font color=red>v-bind</font> 指令，**用于绑定 html 属性,只能实现数据的单向绑定**。v-bind:href 缩写为:href 。html 属性不能使用双大括号形式绑定，只能使用 <font color=red>v-bind</font> 指令 
			>  ```<p v-bind="msg"></p>```  
			> ```<p>{{msg}}</p>```  
			> - 绑定属性  [--->go](https://segmentfault.com/a/1190000014813168)  
					> ```<p :src='xxxxxxxx'><p>```  
					> ```<p :class='xxxxxx'></p>```  
					> ```<p :style='zzzzzzzz'> </p>```
			> - 绑定表达式
					> ```{{ number + 1 }}```  
					> ```{{ ok ? 'y':'n'}}```  
					> ```{{ msg.split('').reverse().join('') }}```
		2. 指令预期值 
			> vue 指令的预期值（如 v-bind:class="classProperty" 中，<font color=red>v-bind</font> 是指令，: 后面的 class 是参数，而 classProperty 则在官方文档中被称为"预期值"），除了像上面那样绑定一个字符串类型变量，其实它是支持一个**单一 JavaScript 表达式** （<font color=red>v-for</font> 除外)
				> - 执行运算
				> - 执行函数等 
		3. 支持的数据类型
			> 略……  [--->点击详情](https://www.jianshu.com/p/98dfa4c6389c)
	- <font color=red>v-on</font>
		- <font color=red>v-on</font> **指令用于绑定HTML事件** ；v-on:click 缩写为 @click
	- <font color=red>v-model</font>   
		- 通常用于表单组件的绑定。与 <font color=red>v-text</font> 的区别在于它实现的表单组件的__双向绑定__，如果用于表单控件以外标签是没有用的。
			1. 绑定text
				> ```<input type='text' v-model="val" />```  
				> ```<p>{{val}}<p>```
			2. 绑定radio
				> ```<input type="radio" value='one' v-model='radioVal'>```  
				> ```<input type="radio" value='two' v-model='radioVal'>```  
				> ```<label for v-bind="radioVal" />```  
				> radio val 的值随着选择单选框的值，会变成 one 或者 two
			3. 绑定checkBox
				- 1.单个勾选框，最终的值为逻辑值true和false  
					> ```<input type="checkbox" v-model='checkVal'>```  
					> ```<label for="checkBox">{{checkVal}}</label>```  
				- 2.多个勾选框时，将值绑定到一个数组  
					> ```<input type="checkbox" value='apple' v-model='checkArr'>```  
					> ```<label for="checkBox">{{apple}}</label>```  
					>   
					> ```<input type="checkbox" value='banana' v-model='checkArr'>```  
					> ```<label for="checkBox">{{banana}}</label>```  
					>   
					> ```<input type="checkbox" value='pear' v-model='checkArr'>```  
					> ```<label for="checkBox">{{pear}}</label>```  
					>   
					>   ```<span>{{checkArr | json}}</span>```
			4. 绑定select
				> 1.绑定到单个select  
				> 2.绑定多个select时，同样适用数组
			5. 增加参数
				> 1. lazy
					- 将输入框的input事件改为change事件，使得输入框在change事件中更新而不是input
					- 关于change事件和input事件的区别，简单说来是：  
					 change事件必须是在输入框失去焦点之后才会触发，而input事件可以实时监测。
				> 2. number
					- 将文本框输入的值都变为数字，如果是变为数字之后是NAN，则返回原始值
				> 3. debounce 
					- 给输入框加一个很小的延迟，设置一个最小的延时，在每次敲击之后延时同步输入框的值与数据。如果每次更新都要进行高耗操作（例如在输入提示中 Ajax 请求），它较为有用。
					- 注意 debounce 参数不会延迟 input 事件：**它延迟“写入”底层数据**。因此在使用 debounce 时应当用 <font color=red>vm.$watch()</font> 响应数据的变化。若想延迟 DOM 事件，应当使用 debounce 过滤器。

	- v-bind 和 v-model 的区别
		- ***v-model绑定的数据,页面数据的改变,vue对象中的数据也会跟着改变***

---    
### 2.Vue Vue守卫用法
### 3.Vuex有几个参数，分别有什么作用
### 4.Vue-router 传参方式（3种）
* #### 
---
### 5. 谈谈你对v-if和v-show的认知，  
### 6.key有什么用
* 见1
---
### 7.计算属性和监听属性的区别
### 8.父传子，子传父，兄弟之间的传值
* #### 父传子 
	- props  
* #### 子传父
	- $emit
* #### 兄弟之间
	- eventBus
---
### 9.如何解决跨域问题
### 10.Vue 的生命周期
### 11.Vue全家桶有哪些
* #### vue ,Vuex(状态管理) , Vue-router (路由), axios(处理向后端的http资源请求) ,ui库,vue-cli
	> 具体来说包括：Vue 作为整体框架，通过 Vue CLI 构建项目；Vuex 即 Vue 的中心化管理方案来集中存储、管理应用的所有组件状态；Vue Router 即 Vue 的路由管理器来管理组件路由；axios 作为基于 Promise 的 HTTP 库负责浏览器端即服务器端的数据传输；ElementUI、Bootstrap 等 UI 组件库作为 UI 框架库。
---
### 12.Vue-router 的钩子函数
* #### 全局的钩子
	- <font color='red'>beforeEach（to，from，next）</font>  全局前置守卫  
		- 
		- next()：一切正常调用这个方法进入下一个钩子；
		- next(false)：取消路由导航，这时的url显示的是正要离开的路由地址；
		- next('/login')：当前路由被终止，进入一个新的路由导航（路由地址可以自由指定）
		- next(error)：路由导航终止并且错误会被传递到router.onError()注册过的回调中；  

		> 我们一般是用全局钩子来控制权限，像什么进页面没有登录就跳登录页，需要用户达到什么级别才能访问当前页面都是属于页面权限控制，都是可以通过 <font color='red'>beforeEach</font> 钩子函数来实现
	- <font color='red'>beforeResolve</font> 在 beforeRouteEnter 调用之后调用 全局解析守卫  
		- 
		> 在 2.5.0+ 你可以用 router.beforeResolve 注册一个全局守卫。这和 router.beforeEach 类似，区别是在导航被确认之前，***同时在所有组件内守卫和异步路由组件被解析之后***，解析守卫就被调用。
	- <font color='red'>afterEach(to,from)</font>  全局后置钩子  
		- 
		> <font color='red'>AfterEach</font> 和 <font color='red'>beforeEach</font> 一样都是属于全局守卫钩子，都是在 <font color='blue'>main.js</font> 中进行调用；其中 <font color='red'>AfterEach</font> 比 <font color='red'>beforeEach</font> 少一个 next 参数；
		- <font color='red'>AfterEach()</font>我们一般用来重置页面滚动条位置：
			> 假如我们有一个页面很长，滚动后其中的某个位置后跳转，这时新的页面的滚动条位置就会在上一个页面停留的位置；这个时候我们就可以利用 <font color='red'>AfterEach</font> 进行重置
* #### 组件内的导航钩子
	- <font color='red'>beforeRouterEnter(to,from,next)</font>  
		-   
		> **在路由进入前调用**，因为此时的 <font color='green'>vue</font> 实例还没有创建，所以 <font color='red'>beforeRouterEnter</font> 是唯一一个不能使用 <font color='blue'>this</font> 的钩子函数；  
		- 
	- <font color=red>beforeRouterUpdate(to,from,next)</font>  
		-   
		> **在路由发生修改的时候进行调用**，比如我们上一篇文章讲到的动态路由传参，这种情况我们的 beforeRouteUpdate 也是会被调用的；  [---> Vue-router的钩子函数 <---](https://juejin.im/post/6844903967462260750)
	- <font color='red'>beforeRouterLeave(to,from,next)</font>
		-   
		> **在路由离开该组件时调用**；  
		- 这个离开守卫通常用来**禁止用户在还未保存修改前突然离开**。该导航可以通过 next(false) 来取消。
	- 注意：beforeRouteEnter 因为触发的时候 vue 实例还没有创建，所以这个钩子函数中不能使用 this ，而 beforeRouteUpdate 和 beforeRouteLeave 都是可以访问到实例的，因为当这两个函数触发的时候实例都已经被创建了；
	- 不过，你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
	- 注意 <font color=red>beforeRouteEnter</font> 是支持给 next 传递回调的***唯一守卫***。
* #### 路由独享的钩子函数
	- <font color='red'>beforeEnter(to,from,next)</font>  
		- 
		> 路由独享顾名思义就是指定的路由才有这些钩子函数，通常这类路由独享的钩子函数我们是在路由配置文件中进行配置，只能设置改变前的钩子，不能设置改变后的钩子
	
* #### 完整的导航解析流程  
	* 1. 航被触发。  
	* 2. 在失活的组件里调用 beforeRouteLeave 守卫。  
	* 3. 调用全局的 beforeEach 守卫。  
	* 4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。  
	* 5. 在路由配置里调用 beforeEnter。  
	* 6. 解析异步路由组件。  
	* 7. 在被激活的组件里调用 beforeRouteEnter。  
	* 8. 调用全局的 beforeResolve 守卫 (2.5+)。  
	* 9. 导航被确认。  
	* 10. 调用全局的 afterEach 钩子。  
	* 11. 触发 DOM 更新。  
	* 12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。


- - -





