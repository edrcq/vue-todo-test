<template>
	<div>
		<input
			type="text"
			maxlength="1"
			:value="inputValue"
			ref="elem"
			@input="$event => $emit('input:code', $event)"
			@keydown="$event => $emit('key:down', $event)"
			@keyup="$event => $emit('key:up', $event)"
		>
	</div>
</template>

<script>
import { ref } from 'vue';
export default {
	props: {
		inputValue: String,
	},
	setup () {

		const elem = ref()

		const setFocus = () => {
			elem.value.focus()
		}

		return {
			elem,
			setFocus,
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
