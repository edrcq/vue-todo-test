<template>
	<div>
		<TestCodeInput
			v-for="(i) in arr.length"
			:key="i"
			@key:down="keyPressEvent(i-1, $event)"
            @key:up="keyUpEvent(i -1, $event)"
			@input:code="addCode(i-1, $event)"
			:inputValue="arr[i-1]"
			:ref="el => elements[i-1] = el"
		/>
		<h2>Your code is: {{ arr.join('') }}</h2>
		<h3>{{ arr.join('').length }} / {{  arr.length }}</h3>
	</div>
</template>

<script>
import { nextTick, ref } from 'vue';
import TestCodeInput from './TestCodeInput.vue';

export default {
    setup() {
        // array is preset because we use it as config. But it works empty if you replace "arr.value.length" at the right places. (check template too)
        const arr = ref(["", "", "", "", "", ""]);

        const elements = ref([]);
        
        // manage paste
        const isControlPressed = ref(false)
        const isVPressed = ref(false)

        const addCode = (i, ev) => {
            console.log(i, ev.target.value);
            // right place
            if (ev.target.value.length > 1) {
                console.log('TEST ?', ev.target.value)
            }
            else if (i >= 0 && i <= (arr.value.length - 1) && ev.target.value !== "") {
                arr.value[i] = ev.target.value;
                // right place
                if (i < (arr.value.length - 1))
                    nextTick(() => elements.value[i + 1].setFocus());
                console.log(arr.value.join(","));
            }
            else if (ev.target.value === "") {
                arr.value[i] = "";
            }
        };

        const keyPressEvent = (i, ev) => {
            console.log(ev.key, i);
            // right place
            if (ev.key === "Backspace" && i >= 0 && i <= (arr.value.length - 1)) {
                ev.preventDefault();
                arr.value.splice(i, 1, "");
                if (i > 0)
                    nextTick(() => elements.value[i - 1].setFocus());
            }
            else if (ev.key === "Control") {
                isControlPressed.value = true
            }
            else if (ev.key === "v") {
                isVPressed.value = true
            }
            if (isControlPressed.value && isVPressed.value) {
                nextTick(() => {
                    navigator.clipboard.readText().then((content) => {
                        arr.value.splice(0, arr.value.length, ...content)
                    })
                })
            }
        };
        
        const keyUpEvent = (i, ev) => {
            if (ev.key === "Control") {
                isControlPressed.value = false
            }
            else if (ev.key === "v") {
                isVPressed.value = false
            }
        }

        return {
            arr,
            addCode,
            keyPressEvent,
            keyUpEvent,
            elements,
        };
    },
    components: { TestCodeInput }
}
</script>

<style lang="scss" scoped>

</style>
