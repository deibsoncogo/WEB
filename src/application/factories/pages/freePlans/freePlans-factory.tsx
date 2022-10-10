import { ListFreePlansTemplate } from '../../../../layout/templates/freePlans/list'
import { makeRemoteDeleteFreePlan } from '../../usecases/freePlan/remote-deleteFreePlan-factory'
import { makeRemoteGetFreePlans } from '../../usecases/freePlan/remote-getFreePlans-factory'
import { makeRemoteToggleFreePlanStatus } from '../../usecases/freePlan/remote-toggleFreePlanStatus-factory'

export const MakeListFreePlansPage = () => {
  return (
    <ListFreePlansTemplate
      remoteGetFreePlans={makeRemoteGetFreePlans()}
      remoteToggleFreePlanStatus={makeRemoteToggleFreePlanStatus()}
      remoteDeleteFreePlan={makeRemoteDeleteFreePlan()}
    />
  )
}
