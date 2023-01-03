import Header from "./Header";
import Background from "./Background";
import classes from "./MainPage.module.css"

const MainPage = props => {
    return <div className={classes}>
        <Header/>
        <Background/>
    </div>

}

export default MainPage;