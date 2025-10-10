export default function DashboardCard({ title, value, change, description }) {
  let arrowBg = "color-bg-mini-card"; 
  if (change > 0) arrowBg = "bg-green-600";
  if (change < 0) arrowBg = "bg-red-600";

  return (
    <div className="color-bg-nav p-3 rounded-2xl shadow-md">
      <div className="text-white text-lg font-medium mb-2">{title}</div>
      <div className="text-white font-bold text-[40px] leading-[1] mb-4">{value}</div>

      <div className="flex flex-row space-x-2 items-center">
        <div className={`flex items-center text-xs space-x-2 rounded-xl px-3 py-1 ${arrowBg}`}>
          <div className="flex items-center space-x-0.5">
            {(change <= 0) && (
              // стрелкаи боло
              <svg width="6" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.61511 11.6316L1.61511 0.315789C1.61511 0.157895 1.80498 0 1.99486 0C2.21638 0 2.40625 0.157895 2.40625 0.342105L2.40625 11.6579C2.40625 11.8421 2.21637 12 1.99485 12C1.80498 11.9737 1.61511 11.8158 1.61511 11.6316Z" fill="white"/>
                <path d="M6.15378e-07 9.65786C6.47597e-07 9.55259 0.0632918 9.44733 0.158228 9.3947C0.348102 9.28944 0.569621 9.34207 0.696203 9.47365L1.99367 11.0526L3.29114 9.47365C3.41772 9.31575 3.67089 9.28944 3.82911 9.3947C4.01899 9.49996 4.05063 9.71049 3.92405 9.84207L2.34177 11.8421C2.27848 11.921 2.1519 11.9736 2.02532 11.9736C1.89873 11.9736 1.77215 11.921 1.70886 11.8421L0.0949372 9.86838C0.0316461 9.78944 5.91215e-07 9.73681 6.15378e-07 9.65786Z" fill="white"/>
              </svg>
            )}
            {(change >= 0) && (
              // стрелкаи поён
              <svg width="6" height="12" viewBox="0 0 4 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.38489 0.368421L2.38489 11.6842C2.38489 11.8421 2.19502 12 2.00514 12C1.78362 12 1.59375 11.8421 1.59375 11.6579L1.59375 0.342105C1.59375 0.157894 1.78363 0 2.00515 0C2.19502 0.0263158 2.38489 0.18421 2.38489 0.368421Z" fill="white"/>
                <path d="M4 2.34214C4 2.4474 3.93671 2.55267 3.84177 2.6053C3.6519 2.71056 3.43038 2.65793 3.3038 2.52635L2.00633 0.947405L0.708861 2.52635C0.582278 2.68425 0.329114 2.71056 0.170886 2.6053C-0.0189873 2.50004 -0.0506328 2.28951 0.0759495 2.15793L1.65823 0.157931C1.72152 0.0789836 1.8481 0.026352 1.97468 0.026352C2.10127 0.026352 2.22785 0.0789837 2.29114 0.157931L3.90506 2.13162C3.96835 2.21056 4 2.26319 4 2.34214Z" fill="white"/>
              </svg>
            )}
          </div>
          <div className="text-white">{change}%</div>
        </div>

        <div className="color-text-muted text-xs flex items-center">{description}</div>
      </div>
    </div>
  );
}
