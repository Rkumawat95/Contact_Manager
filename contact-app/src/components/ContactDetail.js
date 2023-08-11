import user1 from '../images/user1.avif'
import { Link, useLocation } from 'react-router-dom';

const ContactDetail = (props) => {
    const style1 = { width: '18rem' };
    const style2 = { margin: 'auto' };
    let loction = useLocation();
    //console.log(loction);
    return (
        <>
            <div className="card mb-3" style={{ ...style2, ...style1 }}>
                <img src={user1} className="card-img-top" alt="user1" />
                <div className="card-body">
                    <h1>{loction.state.name}</h1>
                    <h3>{loction.state.email}</h3>
                </div>
            </div>
            <div style={{ width: '10rem', ...style2 }}>
                <Link to="/">
                    <button type="button" className='btn btn-primary'>
                        Back to ContactList
                    </button>
                </Link>
            </div>
        </>
    )
}

export default ContactDetail
