import { ListPlansTemplate } from '../../../../layout/templates/plans/list'
import { makeRemoteGetPlans } from '../../usecases/plans/remote-getPlans-factory'
import { makeRemoteTogglePlanStatus } from '../../usecases/plans/remote-togglePlanStatus-factory'

export const MakeListPlansPage = () => {
  return (
    <ListPlansTemplate
      remoteGetPlans={makeRemoteGetPlans()}
      remoteTogglePlanStatus={makeRemoteTogglePlanStatus()}
    />
  )
}
