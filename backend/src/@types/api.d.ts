declare namespace Api{
 interface Response<T>{
  status: number,
  message: string,
  data: T,
  success:boolean

 }
 
}