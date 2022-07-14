import { UpdateFreeContentForm } from "../../../../layout/components/forms/freeContent/edit";
import { makeRemoteGetFreeContent } from "../../usecases/freeContent/remote-getFreeContent-factory";
import { makeRemoteUpdateFreeContent } from "../../usecases/freeContent/remote-updateFreeContent-factory";

type paramId = {
    id: string
}

export const MakeFormUpdateFreeContent = ({id}: paramId) => {
    return (<UpdateFreeContentForm
     id = {id}
     getFreeContent = {makeRemoteGetFreeContent()}
     updateFreeContent = {makeRemoteUpdateFreeContent()}  
     /> );
  };
  