import './Loading.css';

export default function Loading() {
    return (
      <div className="Loading">
         <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          r="7.146"
          fill="none"
          stroke="#FD4100"
          strokeWidth="3"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            values="0;40"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
            begin="-0.5s"
          />
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
            begin="-0.5s"
          />
        </circle>
        <circle
          cx="50"
          cy="50"
          r="29.011"
          fill="none"
          stroke="#ff5d00"
          strokeWidth="3"
        >
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="1s"
            values="0;40"
            keyTimes="0;1"
            keySplines="0 0.2 0.8 1"
            calcMode="spline"
          />
          <animate
            attributeName="opacity"
            repeatCount="indefinite"
            dur="1s"
            values="1;0"
            keyTimes="0;1"
            keySplines="0.2 0 0.8 1"
            calcMode="spline"
          />
        </circle>
      </svg>{" "}
      </div>
    );
  }
  
  