import { CreateFreeContentForm } from "../../../../layout/components/forms/freeContent/create/create";
import { makeRemoteCreateFreeContent } from "../../usecases/freeContent/remote-createFreeContent-factory";



export const MakeFormCreateFreeContent = () => {
    return (<CreateFreeContentForm
     createFreeContent = {makeRemoteCreateFreeContent()}/>);
  }
  