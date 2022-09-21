<template>
	<view>
		<web-view :src="href"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			href: ''
		};
	},
	onLoad(e) {
		this.href = e.url;
	}
};
</script>

<style></style>
