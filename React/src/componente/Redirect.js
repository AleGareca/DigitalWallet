class Redirect extends React.Component {
    constructor(props) {

        let history = useHistory();
        history.push("/");
    }
}

export default Redirect;

/*const Redirect = () => {
    let history = useHistory();
    history.push("/");
  }*/