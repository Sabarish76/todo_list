export const INSERT_TASK = `
   mutation insert_tasks($input: [tasks_insert_input]!) {
     insert_tasks(objects: $input){
       returning{
         id
       }
     }
   }
`;

export const GET_TASKS = `
  query getTasks{
    tasks{
     id
     task_name
     priority
     description
    }
  }
`;

export const UPDATE_TASK = `
 mutation update_tasks($id: Int, $set:tasks_set_input){
  update_tasks(where: {id : {_eq:$id}}, _set: $set){
    returning{
      id
    }
  }
 }
`;

export const DELETE_TASK = `
  mutation delete_tasks($id: Int){
   delete_tasks(where: {id: {_eq: $id}}){
    returning{
      id
    }
   }
  }
`;
