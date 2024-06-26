import { defineStore } from 'pinia'

export const useAuthUserStore = defineStore(/* id */'AuthUserStore', /* options */{
	state: () => {
		return {
			username: "danielkelly_io"
		}
	},

	/*getters: {
		username:() => "danielkelly_io",
	},
	*/
	actions: {
		visitTwitterProfile(){
			window.open(`https://twitter.com${this.username}`, "_blank")
		}
	}
});