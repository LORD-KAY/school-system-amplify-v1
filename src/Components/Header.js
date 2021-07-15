
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Link } from 'react-router-dom'
import './Style.css'
function Header({currentUser, color}) {


    return (
        <div>
            <div className="navigationBar">
                <div className="container flex">
                    <div className="brandName">
                        <img src="./logo192.png" alt="userImge" width="50px" style={{ borderRadius: '50%', boxShadow: '1px 3px 15px rgba(0, 0, 0, 0.199)' }} />
                       <h3><Link to="/">AWS Demo App</Link></h3> 
                    </div>
                    <div className="userAuth_and_userProfile">
                        <div className="user">
                            <div className="userShort" style={{borderRadius: '50%', background:`${color}`, boxShadow: '1px 3px 15px rgba(0, 0, 0, 0.199)', height:'40px',width:'40px'}}>
                               {`${currentUser ? localStorage.getItem('userLetter') : ''}`}
                            </div>
                            <p style={{ margin: '0px 20px' }}>Hi! @{currentUser?.email ?? currentUser.phone}</p>
                            <AmplifySignOut />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header