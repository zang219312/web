## 特别说明
本组件使用了BaseCloud框架样式库文件，[BaseCloud框架 << ](https://ext.dcloud.net.cn/plugin?id=2481)
如未使用BaseCloud框架开发，可只引入样式库文件（轻量），或自行对样式进行改造（样式很少）

## 属性说明

|属性	|类型	|说明	|
|--	|--	|--	|
|percentage	|Number	|刮开百分之多少的时候开奖	，默认45|
|touchSize	|Number	|刮痕的宽度，默认20	|
|fillColor	|String	|未刮开图层时的填充色	|
|watermark	|String	|水印文字，默认“刮一刮”	|
|watermarkColor	|String	|水印文字颜色	|
|watermarkSize	|Number	|水印文字大小，默认14	|
|title	|String	|标题，默认：刮一刮开奖	|
|titleColor	|String	|标题颜色	|
|titleSize	|Number	|标题文字大小，默认24	|
|disabled	|boolean	|是否禁止刮卡	|
|@complete	|function	|刮卡完成回调事件	|
|v-slot	|默认插槽	|刮卡显示的内容，本内容将被刮刮卡覆盖遮挡，刮刮后显示	|

## 使用示例
```html

<scratch-card @complete="seatShow" :disabled="data.status == 1" title="开赛后刮开钓位" watermark="刮一刮开号">
	
	<!-- 刮刮后将显示的内容 -->							
	<view>
		<view class="flex ct">
			<view class="bold red fz50">
				45号
			</view>
		</view>
		
		<view class="flex ct">
			<view class="rds25 plr15 ptb5 bold gray" style="background-color: #f0f0f0;border: 1px solid #ddd; ">
				<text class="bIcon-locationPointFill"></text>
				钓场
			</view>
		</view>
	</view>
	
</scratch-card>
```

## 使用过程中有问题，欢迎加QQ群交流：649807152