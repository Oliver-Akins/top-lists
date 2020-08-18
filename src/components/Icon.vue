<template>
	<div id="icon" :style="div_styles">
		<span v-if="type === 'notes'" :style="span_styles">
			<svg
				:width="inner_size"
				:height="inner_size"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					:width="inner_size"
					:height="inner_size"
					fill="none"
					rx="0"
					ry="0"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M17.4911 2.11667L21.4511 4.09667C21.9411 4.34667 22.1411 4.93667 21.8911 5.43667C21.6411 5.93667 21.0411 6.13667 20.5511 5.88667L18.0011 4.61667L17.9911 16.4367C17.9911 16.4467 17.9936 16.4567 17.9961 16.4667C17.9986 16.4767 18.0011 16.4867 18.0011 16.4967C18.0011 18.4267 16.4311 19.9967 14.5011 19.9967C12.5711 19.9967 11.0011 18.4267 11.0011 16.4967C11.0011 14.5667 12.5711 12.9967 14.5011 12.9967C15.0411 12.9967 15.5411 13.1267 16.0011 13.3467L16.0111 3.10667C15.9911 2.99667 16.0011 2.87667 16.0311 2.75667C16.1711 2.14667 16.9411 1.80667 17.4911 2.11667ZM12.8911 5.43664C12.6511 5.93664 12.0511 6.13664 11.5511 5.88664L9.0011 4.61664L8.9911 18.4366C8.9911 18.4466 8.9936 18.4566 8.9961 18.4666C8.9986 18.4766 9.0011 18.4866 9.0011 18.4966C9.0011 20.4266 7.4311 21.9966 5.5011 21.9966C3.5711 21.9966 2.0011 20.4266 2.0011 18.4966C2.0011 16.5666 3.5711 14.9966 5.5011 14.9966C6.0411 14.9966 6.5411 15.1266 7.0011 15.3466L7.0111 3.10664C6.9911 2.99664 7.0011 2.87664 7.0311 2.76664C7.1711 2.14664 7.9411 1.81664 8.4911 2.12664L12.4411 4.09664C12.9411 4.34664 13.1411 4.94664 12.8911 5.43664Z"
					:fill="primary"
				/>
			</svg>
		</span>
		<span v-else-if="type === 'note_filled'" :style="span_styles">
			<svg
				:width="inner_size"
				:height="inner_size"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					:width="inner_size"
					:height="inner_size"
					fill="none"
					rx="0"
					ry="0"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12.6192 6.20784L15.2201 7.68004C15.5101 7.84004 15.6101 8.21004 15.4401 8.50004C15.3301 8.69004 15.1301 8.80005 14.9201 8.80005C14.8201 8.80005 14.7201 8.77004 14.6301 8.72004L12.8699 7.72372V15.6585C12.8701 15.6723 12.8701 15.6861 12.87 15.7C12.87 16.91 11.88 17.9 10.67 17.9C9.45997 17.9 8.46997 16.91 8.46997 15.7C8.46997 14.49 9.45997 13.5 10.67 13.5C11.0299 13.5 11.3698 13.5862 11.6699 13.7387V6.69998C11.6699 6.60119 11.6941 6.50777 11.7369 6.42537C11.7411 6.41687 11.7455 6.40842 11.7501 6.40004C11.7561 6.39019 11.7623 6.38054 11.7687 6.37111C11.8639 6.22688 12.0195 6.12563 12.1988 6.1042C12.2802 6.09357 12.3641 6.09981 12.4457 6.12505C12.5086 6.14354 12.5671 6.17174 12.6192 6.20784Z"
					:fill="primary"
				/>
			</svg>
		</span>
		<span v-else-if="type === 'close'" :style="span_styles"></span>
	</div>
</template>

<script>
export default {
	name: `Icon`,
	props: {
		type: {
			type: String,
			required: true,
		},
		primary: {
			type: String,
			default: `#FFFFFF`,
			required: false,
		},
		secondary: {
			type: String,
			default: `#FFFFFF`,
			required: false,
		},
		size: {
			type: Number,
			default: 25,
			required: false,
		},
		inner_size: {
			type: Number,
			default: null,
			required: false,
		},
		background: {
			type: String,
			default: null,
			required: false,
		},
		border: {
			type: Number,
			default: 0,
			required: false,
		}
	},
	data() { return {
		div_styles: {
			"background-color": this.background,
			"border-radius": `${this.border}px`,
			"width": `${this.size}px`,
			"height": `${this.size}px`,
		},
	}},
	computed: {
		span_styles() {
			if (this.inner_size) {
				return {
					"width": `${this.inner_size}px`,
					"height": `${this.inner_size}px`,
				}
			}
			let x = Math.floor(this.size * 0.6);
			return {
				width: `${x}px`,
				height: `${x}px`,
			}
		}
	}
}
</script>

<style>
#icon {
	justify-content: center;
	vertical-align: middle;
	display: inline-flex;
	align-items: center;
}
</style>