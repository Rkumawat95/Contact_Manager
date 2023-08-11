import { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const inputEl = useRef("");
    const deleteCardHandler = (id) => {
        props.getContactId(id);
    }

    const renderContactList = props.Contacts.map((contact) => {
        return (
            <ContactCard contact={contact} clickHandler={deleteCardHandler} key={contact.id} />
        );
    })

    const getSearchTerm = () =>{
        props.searchkeyword(inputEl.current.value);
    }

    //const style1 = { color: 'red' };
    const style2 = { float: 'right' }
    return (
        <>
            <div className="container mt-3">
                <h2>Contact List
                    <Link to="/add" style={{ ...style2 }}>
                        <button type="button" className="btn btn-primary">Add Contact</button>
                    </Link></h2>
                <div className="ui search">
                    <div className="ui icon input">
                        <input ref={inputEl} type="text" placeholder="Search contact" className="prompt mb-3"
                        value={props.term} onChange={getSearchTerm}/>
                        <i className="search icon"></i>
                    </div>
                </div>
                <div className="list-group">{renderContactList.length>0 ? renderContactList : "No Contact Available"}</div>
            </div>
        </>
    )
}

export default ContactList;