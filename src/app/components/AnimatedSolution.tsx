// Models
import { useEffect, useState } from "react";
import { CheckResponseType } from "shared/models/CheckResponseType";

// Styles
import "./AnimatedSolution.css";
import LoadingSpinner from './LoadingSpinner';

type AnimatedSolutionType = {
  solution: CheckResponseType;
  isLoading: boolean | undefined;
};

const AnimatedSolution = ({
  solution: { numberOverlapping, charactersOverlapping },
  isLoading,
}: AnimatedSolutionType) => {
  const [numberAnimation, setNumberAnimation] = useState(false);
  const [charactersAnimation, setCharactersAnimation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setCharactersAnimation(true);
      setTimeout(() => {
        setNumberAnimation(true);
      }, 700);
    } else {
      setCharactersAnimation(false);
      setNumberAnimation(false);
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
              <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
        <p style={{textAlign: 'start'}}>Overlapping characters</p>
          <section className={charactersAnimation ? "animation" : ""}>
            <div className="charsOverlapping">
                <b>{charactersOverlapping}</b>
            </div>
          </section>
          </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
            }}>
          <p>Length of overlapping</p>
          <section className={numberAnimation ? "animation" : ""}>
            <div className="lengthOverlapping">
                <b>{numberOverlapping}</b>
            </div>
          </section>
        </div>
        </>
      ) : <h2>Start searching for longest common matching subsequence</h2>
    }
    </div>
  );
};

export default AnimatedSolution;
