import { FormCreateRoom } from "../../../../layout/components/forms/room/create/create";
import { makeRemoteGetAllUsers } from "../../usecases/remote-getAllUsers-factory";
import { makeRemoteCreateRoom } from "../../usecases/room/remote-createRoom-factory";
import { makeRemoteGetZoomUsers } from "../../usecases/zoom/remote-getZoomUsers-factory";


export const MakeFormCreateRoom = () => {
    return (<FormCreateRoom
     createRoom = {makeRemoteCreateRoom()}
     getUsers = {makeRemoteGetAllUsers()}
     getZoomUsers={makeRemoteGetZoomUsers()}/> );
  };
  