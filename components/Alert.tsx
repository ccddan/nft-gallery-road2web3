interface AlertProps {
  message: string;
  onClose: () => void;
}

export const Alert = (props: AlertProps) => {
  const { message, onClose } = props;
  return (
    <div
      className="absolute flex w-screen items-center justify-between gap-4 rounded border border-red-900/10 bg-red-50 p-4 text-red-700"
      role="alert"
    >
      <div className="container m-auto flex max-w-[30%] justify-between">
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-red-600 p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
              />
            </svg>
          </span>

          <p>
            <strong className="text-sm font-medium"> Uh-oh! </strong>

            <span className="block text-xs opacity-90">{message}</span>
          </p>
        </div>

        <button className="opacity-90" type="button" onClick={onClose}>
          <span className="sr-only"> Close </span>

          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Alert;
