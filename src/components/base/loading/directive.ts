import Loading from './loading.vue'

import createLoadingLikeDirective from '~/asstes/js/create-loading-like-directive'
type LoadingType = InstanceType<typeof Loading>
const loadingDirective = createLoadingLikeDirective<LoadingType>(Loading)

export default loadingDirective
