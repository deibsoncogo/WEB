import { FormUpdateRoom } from "../../../../layout/components/forms/room/edit/edit";
import { makeRemoteGetCategoriesNoPagination } from "../../usecases/categories/remote-getCategoriesNoPagination-factory";
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
     getCategoriesNoPagination = {makeRemoteGetCategoriesNoPagination()}
     getUsers = {makeRemoteGetAllUsers()}
     getZoomUsers={makeRemoteGetZoomUsers()}
     /> );
  };
  