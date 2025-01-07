import { JSX } from "react";

export function MessageSubmissionLoader(): JSX.Element {
  return (
    <div className="loader flex justify-center items-center w-fit h-fit">
      <div className="animate-spin rounded-full h-5 w-5 border-green-900 border-e-2"></div>
    </div>
  );
}

export function FetchNewsLoader(): JSX.Element {
  return (
    <div className="loader flex justify-center items-center w-fit h-fit">
      <div className="animate-spin rounded-full h-10 w-10 border-pink-800 border-e-2"></div>
    </div>
  );
}
