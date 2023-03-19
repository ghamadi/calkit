export default function GlobalError(props: { message?: string }) {
  return <div>There was an error in the app {props.message ?? ''}</div>;
}
