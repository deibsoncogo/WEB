import { ListPlansTemplate } from '../../../../layout/templates/plans/list'
import { makeRemoteGetPlans } from '../../usecases/plans/remote-getPlans-factory'

export const MakeListPlansPage = () => {
  return <ListPlansTemplate remoteGetPlans={makeRemoteGetPlans()} />
}
