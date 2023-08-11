import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddContact = (props) => {

    const navigate = useNavigate();
    const [state, setState] = useState({ name: "", email: "" })

    const add = (e) => {
        e.preventDefault();
        if (state.name === "" || state.email === "") {
            alert("All the field are mandatory !");
            return;
        }
        props.addContactHandler(state)
        setState({ name: "", email: "" })
        navigate("/")
    }

    return (
        <div className='container mt-3 mb-3'>
            <h2>Add Contact</h2>
            <form onSubmit={add}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  placeholder="Name"
                        onChange={(e) => setState({...state, name: e.target.value })} value={state.value} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" value={state.value} className="form-control"
                        onChange={(e) => setState({...state, email: e.target.value })} placeholder="Email" />
                </div>
                <button type='submit' className="btn btn-primary">Add</button>
            </form>
        </div >
    )
}


export default AddContact;