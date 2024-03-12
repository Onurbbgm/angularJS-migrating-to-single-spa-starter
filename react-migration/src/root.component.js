export default function Root(props) {
  const name = props.customProps?.name || props.name;
  return <section style={{backgroundColor: "red"}}>Hello, I am a react component {name} in angularjs!</section>;
}
