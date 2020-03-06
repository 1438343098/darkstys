<template>
	<view class="comments">
		评论
	</view>
</template>

<script>
	import { mapGetters,mapActions,mapMutations } from 'vuex'
	export default{
		components: {},
		data() {
			return {
				
			}
		},
		methods: {

		},
		computed:{
			...mapGetters(['comments']),
		}
	} 
</script>

<style scoped lang="scss">
	.comments{
		width: 100%;
		height: 100%;
	}
</style>
