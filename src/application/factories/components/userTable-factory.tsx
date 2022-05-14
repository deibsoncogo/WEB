import UsersTable from '../../../layout/components/tables/users-list';
import {makeRemoteGetAllUsers} from '../usecases/remote-getAllUsers-factory';

export const MakeUserTable = () => {
    return (<UsersTable getAllUsers={makeRemoteGetAllUsers()}/> );
  };
  