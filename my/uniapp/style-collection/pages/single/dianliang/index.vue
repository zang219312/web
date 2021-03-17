<template>
	<view style="padding: 50rpx;">
		<view class="complex">
			<view data-charge='0' class="battery"></view>
			<view data-charge='1' class="battery"></view>
			<view data-charge='2' class="battery"></view>
			<view data-charge='3' class="battery"></view>
			<view data-charge='4' class="battery"></view>
			<view data-charge='5' class="battery"></view>
			<view data-charge='6' class="battery"></view>
			<view data-charge='7' class="battery"></view>
			<view data-charge='8' class="battery"></view>
			<view data-charge='9' class="battery"></view>
			<view data-charge='10' class="battery"></view>
		</view>
		<view class="complex">
			<view data-charge='0' class="battery1"></view>
			<view data-charge='1' class="battery1"></view>
			<view data-charge='2' class="battery1"></view>
			<view data-charge='3' class="battery1"></view>
			<view data-charge='4' class="battery1"></view>
			<view data-charge='5' class="battery1"></view>
			<view data-charge='6' class="battery1"></view>
			<view data-charge='7' class="battery1"></view>
			<view data-charge='8' class="battery1"></view>
			<view data-charge='9' class="battery1"></view>
			<view data-charge='10' class="battery1"></view>
		</view>
		<soure :url="url"></soure>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'https://www.baidu.com/link?url=3BV8lkH_m03FOMwSCLFzrESSwWXwaI88Kk8YPBypfXWFAYFZtaJVKEAH6UblUjlw8R90NndrwTqfttl1IZ57HcjLcSbpU3Ab-JehR4RGWdy&wd=&eqid=b2b4092600008533000000065fd6260f'
			};
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style lang="scss">
	.battery {
		color: #34495e;

		border: 1px solid currentColor;

		display: inline-block;

		width: 50px;

		height: 20px;

		position: relative;

		border-radius: 2px;

		display: border-box;

		margin: 5px;

	}

	.battery::before,

	.battery::after {
		content: "";

		position: absolute;

	}

	.battery::before {
		top: 2px;

		bottom: 2px;

		right: -3px;

		width: 1px;

		display: border-box;

		border: 1px solid currentColor;

		border-left: 0;

	}

	.battery::after {
		top: 0;

		bottom: 0;

		left: 0;

		right: 0;

		margin: 1px;

		border-radius: 1px;

		background-color: currentColor;

		transition: right 500ms;

	}

	.battery.low {
		color: #c0392b;

	}

	.battery.low::after {
		right: 80%;

		border-top-right-radius: 0;

		border-bottom-right-radius: 0;

	}

	.battery.med {
		color: #f39c12;

	}

	.battery.med::after {
		right: 40%;

		border-top-right-radius: 0;

		border-bottom-right-radius: 0;

	}

	.battery.full {
		color: #27ae60;

	}

	.battery[data-charge='0'],

	.battery[data-charge='1'],

	.battery[data-charge='2'],

	.battery[data-charge='3'] {
		color: #c0392b;

	}

	.battery[data-charge='4'],

	.battery[data-charge='5'],

	.battery[data-charge='6'] {
		color: #f39c12;

	}

	.battery[data-charge='7'],

	.battery[data-charge='8'],

	.battery[data-charge='9'],

	.battery[data-charge='10'] {
		color: #27ae60;

	}

	.battery[data-charge='0']::after {
		right: 100%;

	}

	.battery[data-charge='1']::after {
		right: 85%;

	}

	.battery[data-charge='2']::after {
		right: 80%;

	}

	.battery[data-charge='3']::after {
		right: 70%;

	}

	.battery[data-charge='4']::after {
		right: 60%;

	}

	.battery[data-charge='5']::after {
		right: 50%;

	}

	.battery[data-charge='6']::after {
		right: 40%;

	}

	.battery[data-charge='7']::after {
		right: 30%;

	}

	.battery[data-charge='8']::after {
		right: 20%;

	}

	.battery[data-charge='9']::after {
		right: 10%;

	}

	.battery[data-charge='10']::after {
		right: 0%;

	}



	/*纵向*/

	.battery1 {
		color: #34495e;

		border: 1px solid currentColor;

		display: inline-block;

		width: 50px;

		height: 20px;

		position: relative;

		border-radius: 2px;

		display: border-box;

		margin: 30px;

		transform: rotate(-90deg);

		/*   transition: color 500ms; */

	}

	.battery1::before,

	.battery1::after {
		content: "";

		position: absolute;

	}

	.battery1::before {
		top: 2px;

		bottom: 2px;

		right: -3px;

		width: 1px;

		display: border-box;

		border: 1px solid currentColor;

		border-left: 0;

	}

	.battery1::after {
		top: 0;

		bottom: 0;

		left: 0;

		right: 0;

		margin: 1px;

		border-radius: 1px;

		background-color: currentColor;

		transition: right 500ms;

	}

	.battery1.low {
		color: #c0392b;

	}

	.battery1.low::after {
		right: 80%;

		border-top-right-radius: 0;

		border-bottom-right-radius: 0;

	}

	.battery1.med {
		color: #f39c12;

	}

	.battery1.med::after {
		right: 40%;

		border-top-right-radius: 0;

		border-bottom-right-radius: 0;

	}

	.battery1.full {
		color: #27ae60;

	}

	.battery1[data-charge='0'],

	.battery1[data-charge='1'],

	.battery1[data-charge='2'],

	.battery1[data-charge='3'] {
		color: #c0392b;

	}

	.battery1[data-charge='4'],

	.battery1[data-charge='5'],

	.battery1[data-charge='6'] {
		color: #f39c12;

	}

	.battery1[data-charge='7'],

	.battery1[data-charge='8'],

	.battery1[data-charge='9'],

	.battery1[data-charge='10'] {
		color: #27ae60;

	}

	.battery1[data-charge='0']::after {
		right: 100%;

	}

	.battery1[data-charge='1']::after {
		right: 85%;

	}

	.battery1[data-charge='2']::after {
		right: 80%;

	}

	.battery1[data-charge='3']::after {
		right: 70%;

	}

	.battery1[data-charge='4']::after {
		right: 60%;

	}

	.battery1[data-charge='5']::after {
		right: 50%;

	}

	.battery1[data-charge='6']::after {
		right: 40%;

	}

	.battery1[data-charge='7']::after {
		right: 30%;

	}

	.battery1[data-charge='8']::after {
		right: 20%;

	}

	.battery1[data-charge='9']::after {
		right: 10%;

	}

	.battery1[data-charge='10']::after {
		right: 0%;

	}
</style>
