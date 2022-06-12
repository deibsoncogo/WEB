import { FormCreateRoom } from "../../../../layout/components/forms/room/create/create";
import { makeRemoteGetCategories } from "../../usecases/categories/remote-getCategories-factory";

import { makeRemoteGetAllUsers } from "../../usecases/remote-getAllUsers-factory";


export const MakeFormCreateRoom = () => {
    return (<FormCreateRoom 
     getCategories = {makeRemoteGetCategories()}
     getUsers = {makeRemoteGetAllUsers()}/> );
  };
  