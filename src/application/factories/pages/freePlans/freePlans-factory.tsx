import { ListFreePlansTemplate } from '../../../../layout/templates/freePlans/list'
import { makeRemoteGetFreePlans } from '../../usecases/freePlan/remote-getPlans-factory'
import { makeRemoteTogglePlanStatus } from '../../usecases/plans/remote-togglePlanStatus-factory'

export const MakeListFreePlansPage = () => {
  return (
    <ListFreePlansTemplate
      remoteGetPlans={makeRemoteGetFreePlans()}
      remoteTogglePlanStatus={makeRemoteTogglePlanStatus()}
    />
  )
}
