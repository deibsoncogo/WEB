import { FormUpdateRoom } from "../../../../layout/components/forms/room/edit/edit";
import { makeRemoteGetCategories } from "../../usecases/categories/remote-getCategories-factory";
import { makeRemoteGetAllUsers } from "../../usecases/remote-getAllUsers-factory";
import { makeRemoteGetRoom } from "../../usecases/room/remote-getRoom-factory";
import { makeRemoteUpdateRoom } from "../../usecases/room/remote-updateRoom-factory";
import { makeRemoteGetZoomUsers } from "../../usecases/zoom/remote-getZoomUsers-factory";

interface param {
    id: string| string[] | undefined
}

export const MakeFormUpdateRoom = (query: param) => {
    return (<FormUpdateRoom
     id = {query.id}
     getRoom = {makeRemoteGetRoom()}
     updateRoom = {makeRemoteUpdateRoom()}
     getCategories = {makeRemoteGetCategories()}
     getUsers = {makeRemoteGetAllUsers()}
     getZoomUsers={makeRemoteGetZoomUsers()}
     /> );
  };
  