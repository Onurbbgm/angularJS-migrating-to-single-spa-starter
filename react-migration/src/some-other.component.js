export default function SomeOther(props) {
    return <div>
        <h1>I am another react component</h1>
        <span>Who called me was: {props.customProps.caller}</span>
    </div>;
  }
  