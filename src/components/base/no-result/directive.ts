import NoResult from './no-result.vue'
import createLoadingLikeDirective from '~/asstes/js/create-loading-like-directive'

type NoResultType = InstanceType<typeof NoResult>
const loadingDirective = createLoadingLikeDirective<NoResultType>(NoResult)

export default loadingDirective
