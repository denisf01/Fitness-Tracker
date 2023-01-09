import classes from "./ProfileCard.module.css"
import BasicMenu from "./BasicMenu";

const ProfileCard = props => {
  return (<div className={classes.box}>
    <header className={classes.header}><BasicMenu/></header>
    <div className={classes.context}>{props.children}</div>
  </div> )

}

export default  ProfileCard;