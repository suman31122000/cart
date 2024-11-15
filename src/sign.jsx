import './sign.css'
import { Link } from 'react-router-dom';
const Sign=()=>{
return(
<>
<div id='sign'>
    <div id='heading'>
        <h1>Sign in</h1>
    </div>
    <div className='form-box'>
        <form>
        <div className='input-box'>
                <label>Username</label>
                <input type="text"></input>
            </div>
            <div className='input-box'>
                <label>email</label>
                <input type="email"></input>
            </div>
            <div className='input-box'>
                <label>password</label>
                <input type="password"></input>
            </div>
            <div className='input-box'>
                <button type="submit">sign in</button>
                <h1>doesn't have an account?</h1>
                <Link to="/"> <a>Register </a></Link >
            </div>
        </form>
    </div>
</div>
</>
)
}
export default Sign;