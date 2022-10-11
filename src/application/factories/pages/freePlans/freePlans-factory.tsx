import { ListFreePlansTemplate } from '../../../../layout/templates/freePlans/list'
import { makeRemoteDeletePlan } from '../../usecases/plans/remote-deletePlan-factory'
import { makeRemoteGetPlans } from '../../usecases/plans/remote-getPlans-factory'
import { makeRemoteTogglePlanStatus } from '../../usecases/plans/remote-togglePlanStatus-factory'

export const MakeListFreePlansPage = () => {
  return (
    <ListFreePlansTemplate
      remoteGetFreePlans={makeRemoteGetPlans()}
      remoteToggleFreePlanStatus={makeRemoteTogglePlanStatus()}
      remoteDeleteFreePlan={makeRemoteDeletePlan()}
    />
  )
}
