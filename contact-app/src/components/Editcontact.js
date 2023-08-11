import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const EditContact = (props) => {

    let loction = useLocation();
    // console.log(loction);

    const navigate = useNavigate();
    const [state, setState] = useState({id:loction.state.id, name: loction.state.name, email: loction.state.email })
    
    const update = (e) => {
        e.preventDefault();
        if (state.name === "" || state.email === "") {
            alert("All the field are mandatory !");
            return;
        }
        //console.log(state);
        props.updateContactHandler(state)
        setState({ name: "", email: "" })
        navigate("/")
    }

    return (
        <div className='container mt-3 mb-3'>
            <h2>Edit Contact</h2>
            <form onSubmit={update}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={state.name}  placeholder="Name"
                        onChange={(e) => setState({...state, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" value={state.email} className="form-control"
                        onChange={(e) => setState({...state, email: e.target.value })} placeholder="Email" />
                </div>
                <button type='submit' className="btn btn-primary">Update</button>
            </form>
        </div >
    )
}


export default EditContact;