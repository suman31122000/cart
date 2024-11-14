import './Register.css'
const Register=()=>{
return(
<>
<div id='Register'>
    <div id='heading'>
        <h1>Register</h1>
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
                <label>Phone Number</label>
                <input type="number"></input>
            </div>
            <div className='input-box'>
                <label>password</label>
                <input type="password"></input>
            </div>
            <div className='input-box'>
                <label>Confirm password</label>
                <input type="password"></input>
            </div>
            <div className='input-box'>
                <button type="submit">Register</button>
                <h1>I have an account</h1>
                <a >Sign</a>
            </div>
        </form>
    </div>
</div>
</>
)
}
export default Register;