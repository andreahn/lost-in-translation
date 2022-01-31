import { useUserContext } from "../context/UserContext";

const Header = () => {
    const [user, setUser] = useUserContext()

    if (user.username !== '') {
        // display username in header
        return (
            <div id="header">
                <img src={require("../assets/Logo-Hello.png")} alt="Logo" />
                <span id="headerTitle">Lost in Translation</span>
                <span id="headerUsername">{user.username}</span>
            </div>
        )
    }
    else {
        // don't display username because it is not stored to state
        return (
            <div id="header">
                <img src={require("../assets/Logo-Hello.png")} alt="Logo" />
                <span id="headerTitle">Lost in Translation</span>
            </div>
        )
    }
}

export default Header;