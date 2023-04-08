import {
    useGetUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation
} from "./redux/users";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
function App() {
    const [gender, setGender] = useState('all')

  const {data = [],isLoading, isError} = useGetUsersQuery({gender})

    const [addUser] = useAddUserMutation()

    const [removeUser] = useRemoveUserMutation()


    const handleSubmit = async (e) => {
        e.preventDefault()
        let person = {
            name: e.target[0].value,
            gender: e.target[2].checked ? 'men' : 'women'
        }
        await  addUser(person)
        e.target[0].value = ''
        e.target[1].checked = false
        e.target[2].checked = false

    }
    const handleDelete = async (id) => {
        await removeUser(id)

    }

  if (isLoading){
    return  <h2>Loading...</h2>
  }
  return (
    <div className="App">
        <h1>{gender}</h1>
        <div className="">
            <button className='btn ' style={{background: gender === 'men' ? 'red' : 'buttonface'}} onClick={() => setGender('men')}>Men</button>

            <button className=' btn' style={{background: gender === 'women' ? 'red' : 'buttonface'}} onClick={() => setGender('women')}>Women</button>

            <button className=' btn' style={{background: gender === 'all' ? 'red' : 'buttonface'}} onClick={() => setGender('all')}>All</button>

        </div>

        <br/>
        <br/>

        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='ваше имя' className='input'/>
            <div className="">
                <label>
                    <input required name='gender' value='women' type="radio"/>
                    women
                </label>
                <label >
                    <input required name='gender' value='men' type="radio"/>
                    men
                </label>

            </div>
            <br/>
            <button className='btn btn-primary'>Добавить</button>
        </form>
        <br/>
        <br/>
      <ul className='list-group '>
        {data.map((item) => (
            <li className='list-group-item' key={item.id}>{item.name}
                <button className=' handleDelete btn  btn-danger' onClick={() => handleDelete(item.id)}>delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
