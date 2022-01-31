const LoginForm = (props) => {
    return (
        <div id="loginForm">
            <form onSubmit={props.usernameSubmitted}>
                <input type="text" onChange={props.usernameChange} placeholder="What's your name?" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm;