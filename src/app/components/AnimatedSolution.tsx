// Models
import { useEffect, useState } from "react";
import { CheckResponseType } from "shared/models/CheckResponseType";

// Styles
import "./AnimatedSolution.css";
import LoadingSpinner from "./LoadingSpinner";

type AnimatedSolutionType = {
  solution: CheckResponseType;
  isLoading: boolean | undefined;
};

const AnimatedSolution = ({
  solution: { numberOverlapping, charactersOverlapping },
  isLoading,
}: AnimatedSolutionType) => {
  const [animationStart, setStartAnimation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setStartAnimation(true);
    } else {
      setStartAnimation(false)
    }
  }, [isLoading]);

  return (
    <div className="container">
      {isLoading ? (
        <div className="first">
          <LoadingSpinner />
        </div>
      ) : isLoading === false ? (
        <>
          <div className="animation-container">
            <p style={{ textAlign: "left" }}>Overlapping characters</p>
            <section className={animationStart ? "animation" : ""}>
              <div className="charsOverlapping">
                <textarea className="charsoverlapping-textarea" value={charactersOverlapping} />
              </div>
            </section>
          </div>
          <div className="animation-container">
            <p style={{ textAlign: "left" }}>Length</p>
            <section className={animationStart ? "animation" : ""}>
              <div className="lengthOverlapping">
                <b>{numberOverlapping}</b>
              </div>
            </section>
          </div>
        </>
      ) : (
        <h2>Start searching for longest common matching subsequence</h2>
      )}
    </div>
  );
};

export default AnimatedSolution;
