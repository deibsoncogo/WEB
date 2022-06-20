import { FormCreateRoom } from "../../../../layout/components/forms/room/create/create";
import { makeRemoteGetCategories } from "../../usecases/categories/remote-getCategories-factory";

import { makeRemoteGetAllUsers } from "../../usecases/remote-getAllUsers-factory";
import { makeRemoteCreateRoom } from "../../usecases/room/remote-createRoom-factory";
import { makeRemoteGetZoomUsers } from "../../usecases/zoom/remote-getZoomUsers-factory";


export const MakeFormCreateRoom = () => {
    return (<FormCreateRoom
     createRoom = {makeRemoteCreateRoom()}
     getCategories = {makeRemoteGetCategories()}
     getUsers = {makeRemoteGetAllUsers()}
     getZoomUsers={makeRemoteGetZoomUsers()}/> );
  };
  