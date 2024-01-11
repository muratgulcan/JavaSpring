import { Spinner } from "./Spinner";

export function Button({ apiProgress, disabled, children }) {
  return (
    <button className="btn btn-primary mb-3" disabled={apiProgress || disabled}>
      {apiProgress && <Spinner sm />}
      {children}
    </button>
  );
}
