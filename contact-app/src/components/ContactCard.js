import user from '../images/user.png'
import { Link} from "react-router-dom";

const style1 = {color:'red'};
const style2 = {float:'right'}

const ContactCard = (props) => {
    const {id,name,email} = props.contact;
    //console.log(props)
    return (
        <>
            <div className="list-group-item">
                <img style={{width:'30px'}} src={user} alt="user" />
                <div>
                    <Link to={`/contact/${id}`} state={{name:name,email:email}}>
                    <div>{name}</div>
                    <div>{email}</div>
                    </Link>
                    <i style={{...style1,...style2,marginLeft:'10px'}} onClick={()=>{props.clickHandler(id)}} className="trash alternate outline icon"></i>
                    <Link to={`/edit`} state={{id:id,name:name,email:email}}>
                        <i style={{color:'blue',...style2}} className="edit alternate outline icon"></i>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ContactCard