<template>
	<view>
		<view class="test">
			<view class="dot"></view>
			<view class="dot"></view>
			<view class="dot"></view>
			<view class="dot"></view>
			<view class="dot"></view>
		</view>
		<view class="test">
			<view class="dot2"></view>
			<view class="dot2"></view>
			<view class="dot2"></view>
			<view class="dot2"></view>
			<view class="dot2"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
	}
</script>

<style lang="scss">
	.test {
		padding: 50rpx;
		$colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
		display: flex;
		animation-delay: 1s;

		.dot {
			position: relative;
			width: 2em;
			height: 2em;
			margin: 0.8em;
			border-radius: 50%;

			&::before {
				position: absolute;
				content: "";
				width: 100%;
				height: 100%;
				background: inherit;
				border-radius: inherit;
				animation: wave 2s ease-out infinite;
			}

			@for $i from 1 through 5 {
				&:nth-child(#{$i}) {
					background: nth($colors, $i);

					&::before {
						animation-delay: $i * 0.2s;
					}
				}
			}
		}


		.dot2 {
			position: relative;
			width: 2em;
			height: 2em;
			margin: 0.8em;
			border-radius: 50%;

			&::before {
				position: absolute;
				content: "";
				width: 100%;
				height: 100%;
				background: inherit;
				border-radius: inherit;
				animation: wave 2s ease-out infinite;
			}

			@for $i from 1 through 5 {
				&:nth-child(#{$i}) {
					background: nth($colors, $i);
				}
			}
		}
	}

	@keyframes wave {

		50%,
		75% {
			transform: scale(2.5);
		}

		80%,
		100% {
			opacity: 0;
		}
	}
</style>



​
